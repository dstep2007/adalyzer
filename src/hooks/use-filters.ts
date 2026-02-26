"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AdFilters, DEFAULT_FILTERS, MetricField, MetricFilter, SortDirection } from "@/types/filters";

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: AdFilters = useMemo(() => {
    const view = (searchParams.get("view") as "creative" | "copy") || DEFAULT_FILTERS.view;
    const sortBy = (searchParams.get("sortBy") as MetricField) || DEFAULT_FILTERS.sortBy;
    const sortDir = (searchParams.get("sortDir") as SortDirection) || DEFAULT_FILTERS.sortDir;
    const limit = parseInt(searchParams.get("limit") || String(DEFAULT_FILTERS.limit));
    const offset = parseInt(searchParams.get("offset") || "0");
    const status = searchParams.get("status") || undefined;
    const creativeType = searchParams.get("creativeType") || undefined;
    const search = searchParams.get("search") || undefined;

    const metrics: MetricFilter[] = [];
    const metricFields: MetricField[] = [
      "spend", "impressions", "clicks", "ctr", "cpc", "cpm",
      "roas", "purchases", "purchase_value", "cost_per_purchase", "reach", "frequency",
    ];

    for (const field of metricFields) {
      const min = searchParams.get(`min_${field}`);
      const max = searchParams.get(`max_${field}`);
      if (min || max) {
        metrics.push({
          field,
          min: min ? parseFloat(min) : undefined,
          max: max ? parseFloat(max) : undefined,
        });
      }
    }

    return { view, sortBy, sortDir, limit, offset, status, creativeType, search, metrics };
  }, [searchParams]);

  const setFilters = useCallback(
    (updates: Partial<AdFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.view !== undefined) params.set("view", updates.view);
      if (updates.sortBy !== undefined) params.set("sortBy", updates.sortBy);
      if (updates.sortDir !== undefined) params.set("sortDir", updates.sortDir);
      if (updates.limit !== undefined) params.set("limit", String(updates.limit));
      if (updates.offset !== undefined) params.set("offset", String(updates.offset));
      if (updates.status !== undefined) {
        if (updates.status) params.set("status", updates.status);
        else params.delete("status");
      }
      if (updates.creativeType !== undefined) {
        if (updates.creativeType) params.set("creativeType", updates.creativeType);
        else params.delete("creativeType");
      }
      if (updates.search !== undefined) {
        if (updates.search) params.set("search", updates.search);
        else params.delete("search");
      }

      if (updates.metrics !== undefined) {
        // Clear existing metric params
        const metricFields: MetricField[] = [
          "spend", "impressions", "clicks", "ctr", "cpc", "cpm",
          "roas", "purchases", "purchase_value", "cost_per_purchase", "reach", "frequency",
        ];
        for (const field of metricFields) {
          params.delete(`min_${field}`);
          params.delete(`max_${field}`);
        }
        // Set new ones
        for (const metric of updates.metrics) {
          if (metric.min !== undefined) params.set(`min_${metric.field}`, String(metric.min));
          if (metric.max !== undefined) params.set(`max_${metric.field}`, String(metric.max));
        }
      }

      // Reset offset when filters change (except offset itself)
      if (updates.offset === undefined) {
        params.set("offset", "0");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return { filters, setFilters, resetFilters };
}
