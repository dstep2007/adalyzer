"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { MetaCredentialsForm } from "@/components/settings/meta-credentials-form";
import { SyncControls } from "@/components/settings/sync-controls";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExistingConnection {
  ad_account_id: string;
  account_name: string | null;
  last_synced_at: string | null;
}

export default function SettingsPage() {
  const [existingConnection, setExistingConnection] = useState<ExistingConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/meta/connection")
      .then((res) => res.json())
      .then((data) => {
        setExistingConnection(data.connection);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
      <Topbar title="Settings" />

      <div className="p-6 space-y-6 max-w-3xl">
        <PageHeader
          title="Settings"
          description="Configure your Meta Ads connection and manage data sync."
        />

        {!isLoading && (
          <>
            <MetaCredentialsForm existingConnection={existingConnection} />
            <SyncControls />
          </>
        )}

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Meta API Setup Guide</CardTitle>
            <CardDescription>
              Follow these steps to get your Meta access token.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Step 1: Create a Meta App</h4>
              <p className="text-muted-foreground">
                Go to{" "}
                <a
                  href="https://developers.facebook.com/apps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Meta for Developers
                </a>{" "}
                and create a new app. Select &quot;Business&quot; as the app type.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Step 2: Add Marketing API</h4>
              <p className="text-muted-foreground">
                In your app dashboard, add the &quot;Marketing API&quot; product.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Step 3: Generate Access Token</h4>
              <p className="text-muted-foreground">
                Go to the{" "}
                <a
                  href="https://developers.facebook.com/tools/explorer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Graph API Explorer
                </a>
                , select your app, and generate a token with these permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                <li><code className="text-xs bg-muted px-1 rounded">ads_read</code> - Read ad data</li>
                <li><code className="text-xs bg-muted px-1 rounded">ads_management</code> - Access ad accounts</li>
                <li><code className="text-xs bg-muted px-1 rounded">read_insights</code> - Read performance metrics</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Step 4: Paste Token & Connect</h4>
              <p className="text-muted-foreground">
                Paste the generated token above, test the connection, select your ad account, and save.
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-800">
              <p className="font-medium text-sm">Important: Token Expiration</p>
              <p className="text-xs mt-1">
                Short-lived tokens expire in ~1 hour. For production use, exchange for a
                long-lived token (60 days) or set up a System User with a permanent token.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
