"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { MetaOAuthConnect } from "@/components/settings/meta-oauth-connect";
import { MetaCredentialsForm } from "@/components/settings/meta-credentials-form";
import { SyncControls } from "@/components/settings/sync-controls";
import { PageHeader } from "@/components/shared/page-header";
import { Separator } from "@/components/ui/separator";

interface ExistingConnection {
  ad_account_id: string;
  account_name: string | null;
  last_synced_at: string | null;
  token_expires_at: string | null;
}

function SettingsContent() {
  const [existingConnection, setExistingConnection] = useState<ExistingConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showManualForm, setShowManualForm] = useState(false);

  const loadConnection = useCallback(() => {
    fetch("/api/meta/connection")
      .then((res) => res.json())
      .then((data) => {
        setExistingConnection(data.connection);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadConnection();
  }, [loadConnection]);

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <PageHeader
        title="Settings"
        description="Configure your Meta Ads connection and manage data sync."
      />

      {!isLoading && (
        <>
          <MetaOAuthConnect
            existingConnection={existingConnection}
            onConnectionChanged={loadConnection}
          />
          <SyncControls />

          <Separator />

          <div>
            <button
              type="button"
              onClick={() => setShowManualForm(!showManualForm)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showManualForm ? "rotate-180" : ""}`}
              />
              Advanced: Manual Token Entry
            </button>
            {showManualForm && (
              <div className="mt-4">
                <MetaCredentialsForm existingConnection={existingConnection} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <Topbar title="Settings" />
      <Suspense>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
