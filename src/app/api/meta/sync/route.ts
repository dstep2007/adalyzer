import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { syncAdAccount } from "@/lib/meta/sync";

export async function POST() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  // Get active meta connection
  const { data: connection, error: connError } = await supabase
    .from("meta_connections")
    .select("*")
    .eq("organization_id", orgId)
    .eq("is_active", true)
    .single();

  if (connError || !connection) {
    return NextResponse.json(
      { error: "No active Meta connection found. Please configure in Settings." },
      { status: 400 }
    );
  }

  // Check if already syncing
  const { data: activeSync } = await supabase
    .from("sync_log")
    .select("id")
    .eq("organization_id", orgId)
    .eq("status", "running")
    .single();

  if (activeSync) {
    return NextResponse.json(
      { error: "A sync is already in progress" },
      { status: 409 }
    );
  }

  // Run sync (non-blocking - returns immediately)
  // Note: sync uses admin client internally for background writes
  syncAdAccount(orgId, connection.ad_account_id, connection.access_token)
    .catch((err) => console.error("Sync failed:", err));

  return NextResponse.json({ message: "Sync started", adAccountId: connection.ad_account_id });
}
