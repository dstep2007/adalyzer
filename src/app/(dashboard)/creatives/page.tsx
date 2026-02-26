"use client";

import { Suspense } from "react";
import { Image } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { FilterBar } from "@/components/ads/filter-bar";
import { CreativeGallery } from "@/components/ads/creative-gallery";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingCards } from "@/components/shared/loading-state";
import { useFilters } from "@/hooks/use-filters";
import { useAds } from "@/hooks/use-ads";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

function CreativesContent() {
  const { filters, setFilters, resetFilters } = useFilters();
  const { ads, total, isLoading } = useAds({ ...filters, view: "creative" });
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
        title="Creative Analyzer"
        description={`${total} ads found`}
        lastSynced={lastSyncedAt}
        onSync={handleSync}
        isSyncing={isSyncing}
      />

      <div className="p-6 space-y-4">
        <FilterBar
          filters={{ ...filters, view: "creative" }}
          onFilterChange={setFilters}
          onReset={resetFilters}
        />

        {isLoading ? (
          <LoadingCards />
        ) : ads.length === 0 ? (
          <EmptyState
            icon={Image}
            title="No creatives found"
            description="Try adjusting your filters or sync your Meta ad data to get started."
            action={
              <Button asChild variant="outline">
                <Link href="/settings">Go to Settings</Link>
              </Button>
            }
          />
        ) : (
          <>
            <CreativeGallery ads={ads} />

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

export default function CreativesPage() {
  return (
    <Suspense fallback={<div className="p-6"><LoadingCards /></div>}>
      <CreativesContent />
    </Suspense>
  );
}
