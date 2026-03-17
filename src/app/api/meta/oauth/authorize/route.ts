import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { requireAuth } from "@/lib/auth/require-auth";
import { getMetaOAuthUrl } from "@/lib/meta/oauth";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const state = crypto.randomBytes(32).toString("hex");

  const cookieStore = await cookies();
  cookieStore.set("meta_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 300, // 5 minutes
  });

  const url = getMetaOAuthUrl(state);

  return NextResponse.json({ url });
}
