import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_ORG_ID } from "@/lib/utils";

export async function GET() {
  const supabase = createAdminClient();
  const orgId = DEFAULT_ORG_ID;

  // Get connection info
  const { data: connection } = await supabase
    .from("meta_connections")
    .select("last_synced_at, ad_account_id")
    .eq("organization_id", orgId)
    .eq("is_active", true)
    .single();

  // Check for running sync
  const { data: runningSync } = await supabase
    .from("sync_log")
    .select("id")
    .eq("organization_id", orgId)
    .eq("status", "running")
    .single();

  // Count ads
  const { count } = await supabase
    .from("ads")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", orgId);

  return NextResponse.json({
    lastSyncedAt: connection?.last_synced_at || null,
    isSyncing: !!runningSync,
    adCount: count || 0,
    connectionConfigured: !!connection,
  });
}
