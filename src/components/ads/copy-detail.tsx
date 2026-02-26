"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Ad } from "@/types/database";
import { MetricsDisplay } from "./metrics-display";
import { MetricField } from "@/types/filters";

interface CopyDetailProps {
  ad: Ad | null;
  open: boolean;
  onClose: () => void;
}

const ALL_METRICS: MetricField[] = [
  "spend", "impressions", "clicks", "ctr", "cpc", "cpm",
  "roas", "purchases", "purchase_value", "cost_per_purchase", "reach", "frequency",
];

export function CopyDetail({ ad, open, onClose }: CopyDetailProps) {
  if (!ad) return null;

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {ad.name || "Untitled Ad"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={ad.status === "ACTIVE" ? "default" : "secondary"}>
              {ad.status}
            </Badge>
            {ad.call_to_action && (
              <Badge variant="outline">CTA: {ad.call_to_action}</Badge>
            )}
          </div>

          <Separator />

          {/* Full copy */}
          <div className="space-y-4">
            {ad.headline && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Headline
                </span>
                <p className="text-base font-semibold">{ad.headline}</p>
              </div>
            )}

            {ad.primary_text && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Primary Text
                </span>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {ad.primary_text}
                  </p>
                </div>
              </div>
            )}

            {ad.description && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </span>
                <p className="text-sm">{ad.description}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* All metrics */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Performance Metrics</h4>
            <MetricsDisplay
              metrics={Object.fromEntries(
                ALL_METRICS.map((field) => [field, ad[field] as number])
              )}
              fields={ALL_METRICS}
            />
          </div>

          {ad.link_url && (
            <>
              <Separator />
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Destination URL:</span>
                <p className="text-sm text-primary break-all">{ad.link_url}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
