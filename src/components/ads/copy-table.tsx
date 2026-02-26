"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ad } from "@/types/database";
import { formatMetric } from "@/lib/utils";
import { CopyDetail } from "./copy-detail";

interface CopyTableProps {
  ads: Ad[];
}

export function CopyTable({ ads }: CopyTableProps) {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Ad Copy</TableHead>
              <TableHead className="w-[150px]">Headline</TableHead>
              <TableHead className="text-right">Spend</TableHead>
              <TableHead className="text-right">ROAS</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">CPC</TableHead>
              <TableHead className="text-right">Purchases</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map((ad) => (
              <TableRow
                key={ad.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => setSelectedAd(ad)}
              >
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium line-clamp-2">
                      {ad.primary_text || "No copy available"}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {ad.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm line-clamp-1">
                    {ad.headline || "-"}
                  </p>
                </TableCell>
                <TableCell className="text-right text-sm">
                  {formatMetric(ad.spend, "spend")}
                </TableCell>
                <TableCell className="text-right text-sm">
                  <span
                    className={
                      ad.roas >= 3
                        ? "text-emerald-600 font-medium"
                        : ad.roas >= 1.5
                          ? "text-yellow-600"
                          : "text-red-500"
                    }
                  >
                    {ad.roas.toFixed(2)}x
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm">
                  <span
                    className={
                      ad.ctr >= 2
                        ? "text-emerald-600"
                        : ad.ctr >= 1
                          ? "text-yellow-600"
                          : "text-red-500"
                    }
                  >
                    {ad.ctr.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm">
                  {formatMetric(ad.cpc, "cpc")}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {ad.purchases}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {formatMetric(ad.impressions, "impressions")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CopyDetail
        ad={selectedAd}
        open={!!selectedAd}
        onClose={() => setSelectedAd(null)}
      />
    </>
  );
}
