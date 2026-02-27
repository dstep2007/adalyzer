import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  const body = await request.json();
  const { accessToken, adAccountId, accountName } = body;

  if (!accessToken || !adAccountId) {
    return NextResponse.json(
      { error: "Access token and ad account ID are required" },
      { status: 400 }
    );
  }

  // Deactivate any existing connections for this org
  await supabase
    .from("meta_connections")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("organization_id", orgId);

  // Upsert the connection
  const { error } = await supabase.from("meta_connections").upsert(
    {
      organization_id: orgId,
      ad_account_id: adAccountId,
      access_token: accessToken,
      account_name: accountName,
      is_active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "organization_id,ad_account_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  const { data, error } = await supabase
    .from("meta_connections")
    .select("ad_account_id, account_name, last_synced_at, is_active")
    .eq("organization_id", orgId)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return NextResponse.json({ connection: null });
  }

  return NextResponse.json({ connection: data });
}
