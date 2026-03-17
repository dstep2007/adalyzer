import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  // Get connection info
  const { data: connection } = await supabase
    .from("meta_connections")
    .select("last_synced_at, ad_account_id, token_expires_at")
    .eq("organization_id", orgId)
    .eq("is_active", true)
    .single();

  // Get the most recent sync log entry
  const { data: lastSync } = await supabase
    .from("sync_log")
    .select("id, status, error_message, ads_synced, started_at, completed_at")
    .eq("organization_id", orgId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Count ads
  const { count } = await supabase
    .from("ads")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", orgId);

  return NextResponse.json({
    lastSyncedAt: connection?.last_synced_at || null,
    isSyncing: lastSync?.status === "running",
    adCount: count || 0,
    connectionConfigured: !!connection,
    lastSyncStatus: lastSync?.status || null,
    lastSyncError: lastSync?.error_message || null,
    lastSyncAdsSynced: lastSync?.ads_synced || null,
    lastSyncStartedAt: lastSync?.started_at || null,
    lastSyncCompletedAt: lastSync?.completed_at || null,
    tokenExpiresAt: connection?.token_expires_at || null,
  });
}
