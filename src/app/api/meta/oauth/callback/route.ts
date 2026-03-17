import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/require-auth";
import { exchangeCodeForToken, exchangeForLongLivedToken, computeTokenExpiry } from "@/lib/meta/oauth";
import { MetaApiClient } from "@/lib/meta/client";
import { MetaAdAccount } from "@/lib/meta/types";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const errorDescription = request.nextUrl.searchParams.get("error_description");

  // User denied permission or Meta returned an error
  if (error) {
    const message = errorDescription || error;
    return NextResponse.redirect(`${APP_URL}/settings?oauth_error=${encodeURIComponent(message)}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${APP_URL}/settings?oauth_error=${encodeURIComponent("Missing authorization code")}`);
  }

  // Validate CSRF state
  const cookieStore = await cookies();
  const savedState = cookieStore.get("meta_oauth_state")?.value;
  cookieStore.delete("meta_oauth_state");

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(`${APP_URL}/settings?oauth_error=${encodeURIComponent("Invalid state parameter. Please try again.")}`);
  }

  try {
    // Exchange code for short-lived token
    const { accessToken: shortLivedToken } = await exchangeCodeForToken(code);

    // Exchange for long-lived token (~60 days)
    const { accessToken: longLivedToken, expiresIn } = await exchangeForLongLivedToken(shortLivedToken);
    const tokenExpiresAt = computeTokenExpiry(expiresIn);

    // Fetch ad accounts
    const client = new MetaApiClient(longLivedToken);
    const response = await client.get<MetaAdAccount>("/me/adaccounts", {
      fields: "id,name,account_id,account_status,currency",
      limit: "100",
    });
    const accounts = response.data;

    if (accounts.length === 0) {
      return NextResponse.redirect(`${APP_URL}/settings?oauth_error=${encodeURIComponent("No ad accounts found for this Meta account.")}`);
    }

    // Single account — save immediately
    if (accounts.length === 1) {
      const account = accounts[0];

      // Deactivate existing connections
      await supabase
        .from("meta_connections")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("organization_id", orgId);

      // Upsert the new connection
      const { error: dbError } = await supabase.from("meta_connections").upsert(
        {
          organization_id: orgId,
          ad_account_id: account.id,
          access_token: longLivedToken,
          account_name: account.name,
          is_active: true,
          token_expires_at: tokenExpiresAt,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "organization_id,ad_account_id" }
      );

      if (dbError) {
        return NextResponse.redirect(`${APP_URL}/settings?oauth_error=${encodeURIComponent("Failed to save connection: " + dbError.message)}`);
      }

      return NextResponse.redirect(`${APP_URL}/settings?connected=true`);
    }

    // Multiple accounts — store token in cookie for account selection
    cookieStore.set("meta_oauth_token", longLivedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600, // 10 minutes
    });

    cookieStore.set("meta_oauth_token_expires_at", tokenExpiresAt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });

    return NextResponse.redirect(`${APP_URL}/settings?select_account=true`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "OAuth failed";
    return NextResponse.redirect(`${APP_URL}/settings?oauth_error=${encodeURIComponent(message)}`);
  }
}
