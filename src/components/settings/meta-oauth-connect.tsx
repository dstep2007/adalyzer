"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertTriangle, XCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface MetaAccount {
  id: string;
  name: string;
  accountId: string;
}

interface ExistingConnection {
  ad_account_id: string;
  account_name: string | null;
  last_synced_at: string | null;
  token_expires_at: string | null;
}

interface MetaOAuthConnectProps {
  existingConnection?: ExistingConnection | null;
  onConnectionChanged?: () => void;
}

function getTokenExpiryStatus(expiresAt: string | null): "valid" | "expiring" | "expired" | null {
  if (!expiresAt) return null;
  const expiry = new Date(expiresAt);
  const now = new Date();
  if (expiry <= now) return "expired";
  const daysLeft = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (daysLeft <= 7) return "expiring";
  return "valid";
}

function formatDaysUntil(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Expired";
  if (days === 1) return "Expires tomorrow";
  return `Expires in ${days} days`;
}

export function MetaOAuthConnect({ existingConnection, onConnectionChanged }: MetaOAuthConnectProps) {
  const searchParams = useSearchParams();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSelectingAccount, setIsSelectingAccount] = useState(false);
  const [accounts, setAccounts] = useState<MetaAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);

  const tokenStatus = existingConnection
    ? getTokenExpiryStatus(existingConnection.token_expires_at)
    : null;

  // Handle OAuth redirect results from URL params
  useEffect(() => {
    const connected = searchParams.get("connected");
    const selectAccount = searchParams.get("select_account");
    const oauthError = searchParams.get("oauth_error");

    if (connected === "true") {
      toast.success("Meta account connected successfully!");
      onConnectionChanged?.();
      // Clean up URL params
      const url = new URL(window.location.href);
      url.searchParams.delete("connected");
      window.history.replaceState({}, "", url.toString());
    }

    if (oauthError) {
      toast.error(decodeURIComponent(oauthError));
      const url = new URL(window.location.href);
      url.searchParams.delete("oauth_error");
      window.history.replaceState({}, "", url.toString());
    }

    if (selectAccount === "true") {
      setIsSelectingAccount(true);
      loadAccounts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAccounts = async () => {
    setIsLoadingAccounts(true);
    try {
      const res = await fetch("/api/meta/accounts?from_cookie=true");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAccounts(data.accounts);
      if (data.accounts.length === 1) {
        setSelectedAccount(data.accounts[0].id);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load accounts";
      toast.error(message);
      setIsSelectingAccount(false);
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const res = await fetch("/api/meta/oauth/authorize");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start OAuth");
      window.location.href = data.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to connect";
      toast.error(message);
      setIsConnecting(false);
    }
  };

  const handleSaveAccount = async () => {
    if (!selectedAccount) {
      toast.error("Please select an ad account");
      return;
    }

    setIsSaving(true);
    try {
      const account = accounts.find((a) => a.id === selectedAccount);
      const res = await fetch("/api/meta/oauth/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adAccountId: selectedAccount,
          accountName: account?.name || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      toast.success("Meta account connected successfully!");
      setIsSelectingAccount(false);
      onConnectionChanged?.();

      // Clean up URL params
      const url = new URL(window.location.href);
      url.searchParams.delete("select_account");
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meta API Connection</CardTitle>
        <CardDescription>
          Connect your Meta (Facebook) Ads account to start analyzing your ad performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connected state */}
        {existingConnection && (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">
                  {existingConnection.account_name || existingConnection.ad_account_id}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="default">Connected</Badge>
                  {tokenStatus && existingConnection.token_expires_at && (
                    <span className={`text-xs ${
                      tokenStatus === "expired"
                        ? "text-destructive"
                        : tokenStatus === "expiring"
                          ? "text-amber-600"
                          : "text-muted-foreground"
                    }`}>
                      {formatDaysUntil(existingConnection.token_expires_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Reconnect
            </Button>
          </div>
        )}

        {/* Token expiry warnings */}
        {tokenStatus === "expired" && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Token expired</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Your Meta access token has expired. Reconnect to continue syncing data.
              </p>
            </div>
          </div>
        )}

        {tokenStatus === "expiring" && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-800">Token expiring soon</p>
              <p className="mt-0.5 text-xs text-amber-600">
                Your Meta access token is expiring soon. Reconnect to refresh it.
              </p>
            </div>
          </div>
        )}

        {/* Account selection (after OAuth with multiple accounts) */}
        {isSelectingAccount && (
          <div className="space-y-3 rounded-lg border p-4">
            <p className="text-sm font-medium">Select an ad account</p>
            {isLoadingAccounts ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading ad accounts...
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Ad Account</Label>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an ad account..." />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} ({account.accountId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveAccount} disabled={isSaving || !selectedAccount}>
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save Connection
                </Button>
              </>
            )}
          </div>
        )}

        {/* Connect button (shown when not connected or not selecting) */}
        {!existingConnection && !isSelectingAccount && (
          <Button onClick={handleConnect} disabled={isConnecting} className="w-full">
            {isConnecting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            Connect with Meta
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
