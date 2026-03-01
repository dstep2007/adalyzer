"use client";

import { useState, useMemo } from "react";
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
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type SortKey = "spend" | "roas" | "ctr" | "cpc" | "purchases" | "impressions";
type SortDir = "asc" | "desc";

interface CopyTableProps {
  ads: Ad[];
}

export function CopyTable({ ads }: CopyTableProps) {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sortedAds = useMemo(() => {
    if (!sortKey) return ads;
    return [...ads].sort((a, b) => {
      const av = a[sortKey] ?? 0;
      const bv = b[sortKey] ?? 0;
      return sortDir === "desc" ? bv - av : av - bv;
    });
  }, [ads, sortKey, sortDir]);

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column)
      return <ArrowUpDown className="ml-1 inline h-3 w-3 text-muted-foreground/50" />;
    return sortDir === "desc" ? (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    );
  }

  return (
    <>
      <div className="rounded-lg border max-h-[calc(100vh-280px)] overflow-auto **:data-[slot=table-container]:overflow-visible">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead className="w-[280px] min-w-[280px]">Ad Copy</TableHead>
              <TableHead className="w-[90px]">Headline</TableHead>
              <TableHead
                className="w-[80px] text-right cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort("spend")}
              >
                Spend
                <SortIcon column="spend" />
              </TableHead>
              <TableHead
                className="w-[70px] text-right cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort("roas")}
              >
                ROAS
                <SortIcon column="roas" />
              </TableHead>
              <TableHead
                className="w-[65px] text-right cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort("ctr")}
              >
                CTR
                <SortIcon column="ctr" />
              </TableHead>
              <TableHead
                className="w-[70px] text-right cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort("cpc")}
              >
                CPC
                <SortIcon column="cpc" />
              </TableHead>
              <TableHead
                className="w-[80px] text-right cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort("purchases")}
              >
                Purch.
                <SortIcon column="purchases" />
              </TableHead>
              <TableHead
                className="w-[90px] text-right cursor-pointer select-none hover:text-foreground"
                onClick={() => handleSort("impressions")}
              >
                Impr.
                <SortIcon column="impressions" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAds.map((ad) => (
              <TableRow
                key={ad.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => setSelectedAd(ad)}
              >
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium whitespace-pre-line wrap-break-word">
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
