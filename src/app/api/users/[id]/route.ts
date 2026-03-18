import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole(["owner", "admin"]);
  if (auth.error) return auth.error;
  const { user } = auth;
  const orgId = user.organization.id;
  const { id: memberId } = await params;

  const body = await request.json();
  const { role: newRole } = body;

  if (!["owner", "admin", "member"].includes(newRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const adminClient = createAdminClient();

  // Fetch the target member
  const { data: target, error: fetchError } = await adminClient
    .from("organization_members")
    .select("id, user_id, role, is_active")
    .eq("id", memberId)
    .eq("organization_id", orgId)
    .single();

  if (fetchError || !target) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  // Cannot modify yourself
  if (target.user_id === user.id) {
    return NextResponse.json(
      { error: "Cannot change your own role" },
      { status: 400 }
    );
  }

  // Admin cannot change an owner's role
  if (user.role === "admin" && target.role === "owner") {
    return NextResponse.json(
      { error: "Admins cannot modify an owner" },
      { status: 403 }
    );
  }

  // Only owners can assign owner or admin roles
  if ((newRole === "owner" || newRole === "admin") && user.role !== "owner") {
    return NextResponse.json(
      { error: "Only owners can assign owner or admin roles" },
      { status: 403 }
    );
  }

  const { error: updateError } = await adminClient
    .from("organization_members")
    .update({ role: newRole })
    .eq("id", memberId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Role updated" });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole(["owner", "admin"]);
  if (auth.error) return auth.error;
  const { user } = auth;
  const orgId = user.organization.id;
  const { id: memberId } = await params;

  const adminClient = createAdminClient();

  // Fetch the target member
  const { data: target, error: fetchError } = await adminClient
    .from("organization_members")
    .select("id, user_id, role, is_active")
    .eq("id", memberId)
    .eq("organization_id", orgId)
    .single();

  if (fetchError || !target) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  if (!target.is_active) {
    return NextResponse.json(
      { error: "Member is already deactivated" },
      { status: 400 }
    );
  }

  // Cannot deactivate yourself
  if (target.user_id === user.id) {
    return NextResponse.json(
      { error: "Cannot deactivate yourself" },
      { status: 400 }
    );
  }

  // Admin cannot deactivate an owner
  if (user.role === "admin" && target.role === "owner") {
    return NextResponse.json(
      { error: "Admins cannot deactivate an owner" },
      { status: 403 }
    );
  }

  // Cannot deactivate the last owner
  if (target.role === "owner") {
    const { count } = await adminClient
      .from("organization_members")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", orgId)
      .eq("role", "owner")
      .eq("is_active", true);

    if ((count ?? 0) <= 1) {
      return NextResponse.json(
        { error: "Cannot deactivate the last owner" },
        { status: 400 }
      );
    }
  }

  // Soft delete
  const { error: updateError } = await adminClient
    .from("organization_members")
    .update({ is_active: false, deactivated_at: new Date().toISOString() })
    .eq("id", memberId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Member deactivated" });
}
