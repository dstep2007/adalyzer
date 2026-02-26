"use client";

import { useState } from "react";
import { AdFilters } from "@/types/filters";

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportAds = async (filters: AdFilters, exportLimit?: number) => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      params.set("view", filters.view);
      params.set("sortBy", filters.sortBy);
      params.set("sortDir", filters.sortDir);
      if (exportLimit) params.set("exportLimit", String(exportLimit));
      else params.set("exportLimit", String(filters.limit));

      if (filters.status) params.set("status", filters.status);
      if (filters.creativeType) params.set("creativeType", filters.creativeType);

      for (const metric of filters.metrics) {
        if (metric.min !== undefined) params.set(`min_${metric.field}`, String(metric.min));
        if (metric.max !== undefined) params.set(`max_${metric.field}`, String(metric.max));
      }

      const res = await fetch(`/api/ads/export?${params.toString()}`);
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `adalyzer-export-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return { exportAds, isExporting };
}
