"use client";

import { RefreshCw, Database, Clock, AlertCircle, CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { toast } from "sonner";

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function SyncControls() {
  const {
    lastSyncedAt,
    isSyncing,
    adCount,
    connectionConfigured,
    lastSyncStatus,
    lastSyncError,
    lastSyncAdsSynced,
    tokenExpiresAt,
    triggerSync,
  } = useSyncStatus();

  const tokenExpired = tokenExpiresAt ? new Date(tokenExpiresAt) <= new Date() : false;

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
                  ? formatRelativeTime(lastSyncedAt)
                  : "Never"}
              </p>
              <p className="text-xs text-muted-foreground">Last synced</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-3">
            {lastSyncStatus === "running" ? (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            ) : lastSyncStatus === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : lastSyncStatus === "failed" ? (
              <XCircle className="h-5 w-5 text-destructive" />
            ) : (
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <Badge
                variant={
                  lastSyncStatus === "completed"
                    ? "default"
                    : lastSyncStatus === "failed"
                      ? "destructive"
                      : lastSyncStatus === "running"
                        ? "secondary"
                        : "outline"
                }
              >
                {lastSyncStatus === "running"
                  ? "Syncing"
                  : lastSyncStatus === "completed"
                    ? `Synced ${lastSyncAdsSynced ?? ""} ads`
                    : lastSyncStatus === "failed"
                      ? "Failed"
                      : "No syncs yet"}
              </Badge>
            </div>
          </div>
        </div>

        {lastSyncStatus === "failed" && lastSyncError && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-destructive">Sync failed</p>
              <p className="mt-0.5 text-xs text-muted-foreground wrap-break-word">
                {lastSyncError}
              </p>
            </div>
          </div>
        )}

        {tokenExpired && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-800">Token expired</p>
              <p className="mt-0.5 text-xs text-amber-600">
                Your Meta access token has expired. Reconnect in the settings above to continue syncing.
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={handleSync}
          disabled={isSyncing || !connectionConfigured || tokenExpired}
          className="w-full"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : lastSyncStatus === "failed" ? "Retry Sync" : "Sync Now"}
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
