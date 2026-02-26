import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncAdAccount } from "@/lib/meta/sync";
import { DEFAULT_ORG_ID } from "@/lib/utils";

export async function POST() {
  const supabase = createAdminClient();
  const orgId = DEFAULT_ORG_ID;

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
  syncAdAccount(orgId, connection.ad_account_id, connection.access_token)
    .catch((err) => console.error("Sync failed:", err));

  return NextResponse.json({ message: "Sync started", adAccountId: connection.ad_account_id });
}
