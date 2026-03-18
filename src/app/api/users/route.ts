import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const auth = await requireRole(["owner", "admin"]);
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  const { data: members, error } = await supabase
    .from("organization_members")
    .select(
      `
      id,
      user_id,
      role,
      is_active,
      deactivated_at,
      created_at,
      user_profiles (
        email,
        full_name,
        avatar_url
      )
    `
    )
    .eq("organization_id", orgId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const teamMembers = (members || []).map((m: Record<string, unknown>) => {
    const profile = m.user_profiles as Record<string, unknown> | null;
    return {
      id: m.id,
      user_id: m.user_id,
      role: m.role,
      is_active: m.is_active,
      deactivated_at: m.deactivated_at,
      created_at: m.created_at,
      email: profile?.email ?? "",
      full_name: profile?.full_name ?? null,
      avatar_url: profile?.avatar_url ?? null,
    };
  });

  return NextResponse.json({ members: teamMembers });
}

export async function POST(request: NextRequest) {
  const auth = await requireRole(["owner", "admin"]);
  if (auth.error) return auth.error;
  const { user } = auth;
  const orgId = user.organization.id;

  const body = await request.json();
  const { email, role } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!["admin", "member"].includes(role)) {
    return NextResponse.json(
      { error: "Role must be 'admin' or 'member'" },
      { status: 400 }
    );
  }

  // Only owners can invite admins
  if (role === "admin" && user.role !== "owner") {
    return NextResponse.json(
      { error: "Only owners can add admins" },
      { status: 403 }
    );
  }

  const adminClient = createAdminClient();

  // Check if user already exists in auth.users
  const { data: existingUsersData } = await adminClient.auth.admin.listUsers();
  const existingUser = existingUsersData?.users?.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;

    // Check if already in this org
    const { data: existingMember } = await adminClient
      .from("organization_members")
      .select("id, is_active")
      .eq("organization_id", orgId)
      .eq("user_id", userId)
      .single();

    if (existingMember) {
      if (existingMember.is_active) {
        return NextResponse.json(
          { error: "User is already a member of this organization" },
          { status: 409 }
        );
      }

      // Reactivate with the specified role
      const { error: reactivateError } = await adminClient
        .from("organization_members")
        .update({ is_active: true, deactivated_at: null, role })
        .eq("id", existingMember.id);

      if (reactivateError) {
        return NextResponse.json(
          { error: reactivateError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "User reactivated",
        reactivated: true,
      });
    }
  } else {
    // Invite new user via Supabase Auth
    const { data: inviteData, error: inviteError } =
      await adminClient.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      });

    if (inviteError) {
      return NextResponse.json(
        { error: inviteError.message },
        { status: 500 }
      );
    }

    userId = inviteData.user.id;
  }

  // Add to organization
  const { error: memberError } = await adminClient
    .from("organization_members")
    .insert({
      organization_id: orgId,
      user_id: userId,
      role,
    });

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "User invited successfully" },
    { status: 201 }
  );
}
