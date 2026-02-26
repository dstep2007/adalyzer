"use client";

import { Suspense } from "react";
import { FileText } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { FilterBar } from "@/components/ads/filter-bar";
import { CopyTable } from "@/components/ads/copy-table";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingTable } from "@/components/shared/loading-state";
import { useFilters } from "@/hooks/use-filters";
import { useAds } from "@/hooks/use-ads";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

function CopyContent() {
  const { filters, setFilters, resetFilters } = useFilters();
  const { ads, total, isLoading } = useAds({ ...filters, view: "copy" });
  const { lastSyncedAt, isSyncing, triggerSync } = useSyncStatus();

  const handleSync = async () => {
    try {
      await triggerSync();
      toast.success("Sync started!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sync failed");
    }
  };

  return (
    <div className="flex flex-col">
      <Topbar
        title="Ad Copy Analyzer"
        description={`${total} ads found`}
        lastSynced={lastSyncedAt}
        onSync={handleSync}
        isSyncing={isSyncing}
      />

      <div className="p-6 space-y-4">
        <FilterBar
          filters={{ ...filters, view: "copy" }}
          onFilterChange={setFilters}
          onReset={resetFilters}
        />

        {isLoading ? (
          <LoadingTable />
        ) : ads.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No ad copy found"
            description="Try adjusting your filters or sync your Meta ad data to get started."
            action={
              <Button asChild variant="outline">
                <Link href="/settings">Go to Settings</Link>
              </Button>
            }
          />
        ) : (
          <>
            <CopyTable ads={ads} />

            {/* Pagination */}
            {total > filters.limit && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filters.offset + 1}-{Math.min(filters.offset + filters.limit, total)} of {total}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={filters.offset === 0}
                    onClick={() =>
                      setFilters({ offset: Math.max(0, filters.offset - filters.limit) })
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={filters.offset + filters.limit >= total}
                    onClick={() =>
                      setFilters({ offset: filters.offset + filters.limit })
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function CopyPage() {
  return (
    <Suspense fallback={<div className="p-6"><LoadingTable /></div>}>
      <CopyContent />
    </Suspense>
  );
}
