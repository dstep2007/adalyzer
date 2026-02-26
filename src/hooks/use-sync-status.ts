"use client";

import useSWR from "swr";

interface SyncStatus {
  lastSyncedAt: string | null;
  isSyncing: boolean;
  adCount: number;
  connectionConfigured: boolean;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch sync status");
  return res.json();
};

export function useSyncStatus() {
  const { data, error, isLoading, mutate } = useSWR<SyncStatus>(
    "/api/meta/status",
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  const triggerSync = async () => {
    const res = await fetch("/api/meta/sync", { method: "POST" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Sync failed");
    }
    mutate();
    return res.json();
  };

  return {
    lastSyncedAt: data?.lastSyncedAt ?? null,
    isSyncing: data?.isSyncing ?? false,
    adCount: data?.adCount ?? 0,
    connectionConfigured: data?.connectionConfigured ?? false,
    isLoading,
    isError: !!error,
    triggerSync,
    mutate,
  };
}
