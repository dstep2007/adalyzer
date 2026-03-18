import { NextResponse } from "next/server";
import { requireAuth } from "./require-auth";
import type { OrgRole } from "@/types/database";

export async function requireRole(allowedRoles: OrgRole[]) {
  const auth = await requireAuth();
  if (auth.error) return auth;

  if (!allowedRoles.includes(auth.user.role)) {
    return {
      error: NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      ),
    } as const;
  }

  return auth;
}
