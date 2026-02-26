"use client";

import { RefreshCw, Database, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { toast } from "sonner";

export function SyncControls() {
  const { lastSyncedAt, isSyncing, adCount, connectionConfigured, triggerSync } = useSyncStatus();

  const handleSync = async () => {
    try {
      await triggerSync();
      toast.success("Sync started! This may take a few minutes.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sync failed";
      toast.error(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sync</CardTitle>
        <CardDescription>
          Sync your ad data from Meta to Adalyzer for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Database className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{adCount}</p>
              <p className="text-xs text-muted-foreground">Ads synced</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">
                {lastSyncedAt
                  ? new Date(lastSyncedAt).toLocaleDateString()
                  : "Never"}
              </p>
              <p className="text-xs text-muted-foreground">Last synced</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3">
            <AlertCircle className="h-5 w-5 text-primary" />
            <div>
              <Badge variant={connectionConfigured ? "default" : "secondary"}>
                {connectionConfigured ? "Connected" : "Not connected"}
              </Badge>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSync}
          disabled={isSyncing || !connectionConfigured}
          className="w-full"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync Now"}
        </Button>

        {!connectionConfigured && (
          <p className="text-sm text-muted-foreground text-center">
            Configure your Meta connection above before syncing.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
