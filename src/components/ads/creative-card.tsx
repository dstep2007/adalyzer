"use client";

import { Image as ImageIcon, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ad } from "@/types/database";
import { formatMetric } from "@/lib/utils";

interface CreativeCardProps {
  ad: Ad;
  onClick: () => void;
}

export function CreativeCard({ ad, onClick }: CreativeCardProps) {
  const hasImage = ad.thumbnail_url || ad.image_url;
  const isVideo = ad.creative_type === "video";

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:border-primary/30"
      onClick={onClick}
    >
      {/* Creative thumbnail */}
      <div className="relative aspect-video bg-muted">
        {hasImage ? (
          <img
            src={ad.image_url || ad.thumbnail_url || ""}
            alt={ad.name || "Ad creative"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
              <Play className="h-5 w-5 text-foreground" />
            </div>
          </div>
        )}

        {/* Status badge */}
        <Badge
          className="absolute top-2 right-2 text-xs"
          variant={ad.status === "ACTIVE" ? "default" : "secondary"}
        >
          {ad.status}
        </Badge>

        {/* Creative type badge */}
        {ad.creative_type && (
          <Badge variant="secondary" className="absolute top-2 left-2 text-xs capitalize">
            {ad.creative_type}
          </Badge>
        )}
      </div>

      {/* Card content */}
      <div className="p-3 space-y-2">
        <p className="text-sm font-medium line-clamp-1">
          {ad.name || "Untitled Ad"}
        </p>

        {ad.headline && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {ad.headline}
          </p>
        )}

        {/* Key metrics */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="secondary" className="text-xs">
            ${formatMetric(ad.spend, "spend").replace("$", "")}
          </Badge>
          <Badge
            variant="secondary"
            className={`text-xs ${ad.roas >= 3 ? "text-emerald-600" : ad.roas >= 1.5 ? "text-yellow-600" : "text-red-500"}`}
          >
            {ad.roas.toFixed(2)}x ROAS
          </Badge>
          <Badge
            variant="secondary"
            className={`text-xs ${ad.ctr >= 2 ? "text-emerald-600" : ad.ctr >= 1 ? "text-yellow-600" : "text-red-500"}`}
          >
            {ad.ctr.toFixed(2)}% CTR
          </Badge>
          {ad.purchases > 0 && (
            <Badge variant="secondary" className="text-xs">
              {ad.purchases} sales
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
