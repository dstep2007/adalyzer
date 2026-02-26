"use client";

import { useState } from "react";
import { Ad } from "@/types/database";
import { CreativeCard } from "./creative-card";
import { CreativeDetail } from "./creative-detail";

interface CreativeGalleryProps {
  ads: Ad[];
}

export function CreativeGallery({ ads }: CreativeGalleryProps) {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ads.map((ad) => (
          <CreativeCard
            key={ad.id}
            ad={ad}
            onClick={() => setSelectedAd(ad)}
          />
        ))}
      </div>

      <CreativeDetail
        ad={selectedAd}
        open={!!selectedAd}
        onClose={() => setSelectedAd(null)}
      />
    </>
  );
}
