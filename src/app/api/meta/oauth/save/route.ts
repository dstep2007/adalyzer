import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/require-auth";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("meta_oauth_token")?.value;
  const tokenExpiresAt = cookieStore.get("meta_oauth_token_expires_at")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "OAuth session expired. Please connect with Meta again." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { adAccountId, accountName } = body;

  if (!adAccountId) {
    return NextResponse.json(
      { error: "Ad account ID is required" },
      { status: 400 }
    );
  }

  // Deactivate existing connections
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
      account_name: accountName || null,
      is_active: true,
      token_expires_at: tokenExpiresAt || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "organization_id,ad_account_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Clear the temporary cookies
  cookieStore.delete("meta_oauth_token");
  cookieStore.delete("meta_oauth_token_expires_at");

  return NextResponse.json({ success: true });
}
