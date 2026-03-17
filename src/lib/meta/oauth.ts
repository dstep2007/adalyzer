const META_API_BASE = process.env.META_API_BASE_URL || "https://graph.facebook.com";
const META_API_VERSION = process.env.META_API_VERSION || "v25.0";
const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID!;
const META_APP_SECRET = process.env.META_APP_SECRET!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const OAUTH_REDIRECT_URI = `${APP_URL}/api/meta/oauth/callback`;
const OAUTH_SCOPES = "ads_read,ads_management";

export function getMetaOAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: META_APP_ID,
    redirect_uri: OAUTH_REDIRECT_URI,
    scope: OAUTH_SCOPES,
    state,
    response_type: "code",
  });

  return `https://www.facebook.com/${META_API_VERSION}/dialog/oauth?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string): Promise<{ accessToken: string; expiresIn: number }> {
  const params = new URLSearchParams({
    client_id: META_APP_ID,
    client_secret: META_APP_SECRET,
    redirect_uri: OAUTH_REDIRECT_URI,
    code,
  });

  const res = await fetch(`${META_API_BASE}/${META_API_VERSION}/oauth/access_token?${params.toString()}`);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || "Failed to exchange authorization code");
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

export async function exchangeForLongLivedToken(shortLivedToken: string): Promise<{ accessToken: string; expiresIn: number }> {
  const params = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: META_APP_ID,
    client_secret: META_APP_SECRET,
    fb_exchange_token: shortLivedToken,
  });

  const res = await fetch(`${META_API_BASE}/${META_API_VERSION}/oauth/access_token?${params.toString()}`);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || "Failed to exchange for long-lived token");
  }

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

export function computeTokenExpiry(expiresIn: number): string {
  return new Date(Date.now() + expiresIn * 1000).toISOString();
}
