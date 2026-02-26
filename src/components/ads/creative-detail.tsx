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
import { Image as ImageIcon } from "lucide-react";
import { MetricField } from "@/types/filters";

interface CreativeDetailProps {
  ad: Ad | null;
  open: boolean;
  onClose: () => void;
}

const ALL_METRICS: MetricField[] = [
  "spend", "impressions", "clicks", "ctr", "cpc", "cpm",
  "roas", "purchases", "purchase_value", "cost_per_purchase", "reach", "frequency",
];

export function CreativeDetail({ ad, open, onClose }: CreativeDetailProps) {
  if (!ad) return null;

  const hasImage = ad.thumbnail_url || ad.image_url;

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {ad.name || "Untitled Ad"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Creative preview */}
          <div className="relative aspect-video rounded-lg bg-muted overflow-hidden">
            {hasImage ? (
              <img
                src={ad.image_url || ad.thumbnail_url || ""}
                alt={ad.name || "Ad creative"}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={ad.status === "ACTIVE" ? "default" : "secondary"}>
              {ad.status}
            </Badge>
            {ad.creative_type && (
              <Badge variant="secondary" className="capitalize">
                {ad.creative_type}
              </Badge>
            )}
            {ad.call_to_action && (
              <Badge variant="outline">CTA: {ad.call_to_action}</Badge>
            )}
          </div>

          <Separator />

          {/* Copy */}
          {(ad.headline || ad.primary_text || ad.description) && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Ad Copy</h4>
              {ad.headline && (
                <div>
                  <span className="text-xs text-muted-foreground">Headline:</span>
                  <p className="text-sm font-medium">{ad.headline}</p>
                </div>
              )}
              {ad.primary_text && (
                <div>
                  <span className="text-xs text-muted-foreground">Primary Text:</span>
                  <p className="text-sm whitespace-pre-wrap">{ad.primary_text}</p>
                </div>
              )}
              {ad.description && (
                <div>
                  <span className="text-xs text-muted-foreground">Description:</span>
                  <p className="text-sm">{ad.description}</p>
                </div>
              )}
            </div>
          )}

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
