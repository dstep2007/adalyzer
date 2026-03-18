import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole(["owner", "admin"]);
  if (auth.error) return auth.error;
  const { user } = auth;
  const orgId = user.organization.id;
  const { id: memberId } = await params;

  const adminClient = createAdminClient();

  // Fetch the target member to get their email
  const { data: target, error: fetchError } = await adminClient
    .from("organization_members")
    .select("id, user_id, role, user_profiles (email)")
    .eq("id", memberId)
    .eq("organization_id", orgId)
    .single();

  if (fetchError || !target) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const profile = target.user_profiles as unknown as { email: string } | null;
  if (!profile?.email) {
    return NextResponse.json(
      { error: "Could not find user email" },
      { status: 404 }
    );
  }

  // Admin cannot reset an owner's password
  if (user.role === "admin" && target.role === "owner") {
    return NextResponse.json(
      { error: "Admins cannot reset an owner's password" },
      { status: 403 }
    );
  }

  // Send password reset email via Supabase
  const { error: resetError } = await adminClient.auth.resetPasswordForEmail(
    profile.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/set-password`,
    }
  );

  if (resetError) {
    return NextResponse.json({ error: resetError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Password reset email sent" });
}
