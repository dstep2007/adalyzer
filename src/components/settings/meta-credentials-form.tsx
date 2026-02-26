"use client";

import { useState } from "react";
import { Save, TestTube, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface MetaAccount {
  id: string;
  name: string;
  accountId: string;
}

interface MetaCredentialsFormProps {
  existingConnection?: {
    ad_account_id: string;
    account_name: string | null;
    last_synced_at: string | null;
  } | null;
}

export function MetaCredentialsForm({ existingConnection }: MetaCredentialsFormProps) {
  const [accessToken, setAccessToken] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(existingConnection?.ad_account_id || "");
  const [accounts, setAccounts] = useState<MetaAccount[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  const handleTest = async () => {
    if (!accessToken.trim()) {
      toast.error("Please enter an access token");
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch(`/api/meta/accounts?token=${encodeURIComponent(accessToken)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setAccounts(data.accounts);
      setTestResult("success");
      toast.success(`Found ${data.accounts.length} ad account(s)`);

      if (data.accounts.length === 1) {
        setSelectedAccount(data.accounts[0].id);
      }
    } catch (error) {
      setTestResult("error");
      const message = error instanceof Error ? error.message : "Connection failed";
      toast.error(message);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    if (!accessToken.trim() || !selectedAccount) {
      toast.error("Please test your connection and select an account first");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/meta/connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          adAccountId: selectedAccount,
          accountName: accounts.find((a) => a.id === selectedAccount)?.name || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      toast.success("Meta connection saved successfully");
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
          Connect your Meta (Facebook) Ads account to start analyzing your ad
          performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {existingConnection && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm">
            <p className="font-medium text-emerald-800">
              Connected to: {existingConnection.account_name || existingConnection.ad_account_id}
            </p>
            {existingConnection.last_synced_at && (
              <p className="text-emerald-600 text-xs mt-1">
                Last synced: {new Date(existingConnection.last_synced_at).toLocaleString()}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label>Meta Access Token</Label>
          <Input
            type="password"
            placeholder="Enter your Meta access token..."
            value={accessToken}
            onChange={(e) => {
              setAccessToken(e.target.value);
              setTestResult(null);
              setAccounts([]);
            }}
          />
          <p className="text-xs text-muted-foreground">
            Generate a token from the{" "}
            <a
              href="https://developers.facebook.com/tools/explorer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Meta Graph API Explorer
            </a>
            . You need ads_read and ads_management permissions.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleTest}
            disabled={isTesting || !accessToken.trim()}
          >
            {isTesting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : testResult === "success" ? (
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
            ) : testResult === "error" ? (
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
            ) : (
              <TestTube className="mr-2 h-4 w-4" />
            )}
            Test Connection
          </Button>
        </div>

        {accounts.length > 0 && (
          <div className="space-y-2">
            <Label>Select Ad Account</Label>
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
        )}

        {selectedAccount && testResult === "success" && (
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Connection
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
