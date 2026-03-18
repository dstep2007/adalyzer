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

  const { data: target, error: fetchError } = await adminClient
    .from("organization_members")
    .select("id, user_id, role, is_active")
    .eq("id", memberId)
    .eq("organization_id", orgId)
    .single();

  if (fetchError || !target) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  if (target.is_active) {
    return NextResponse.json(
      { error: "Member is already active" },
      { status: 400 }
    );
  }

  const { error: updateError } = await adminClient
    .from("organization_members")
    .update({ is_active: true, deactivated_at: null })
    .eq("id", memberId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Member reactivated" });
}
