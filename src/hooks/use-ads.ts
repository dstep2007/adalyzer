"use client";

import useSWR from "swr";
import { AdFilters } from "@/types/filters";
import { AdsResponse } from "@/types/ads";

function buildQueryString(filters: AdFilters): string {
  const params = new URLSearchParams();

  params.set("view", filters.view);
  params.set("sortBy", filters.sortBy);
  params.set("sortDir", filters.sortDir);
  params.set("limit", String(filters.limit));
  params.set("offset", String(filters.offset));

  if (filters.status) params.set("status", filters.status);
  if (filters.creativeType) params.set("creativeType", filters.creativeType);
  if (filters.search) params.set("search", filters.search);

  for (const metric of filters.metrics) {
    if (metric.min !== undefined) params.set(`min_${metric.field}`, String(metric.min));
    if (metric.max !== undefined) params.set(`max_${metric.field}`, String(metric.max));
  }

  return params.toString();
}

const fetcher = async (url: string): Promise<AdsResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch ads");
  return res.json();
};

export function useAds(filters: AdFilters) {
  const queryString = buildQueryString(filters);
  const { data, error, isLoading, mutate } = useSWR<AdsResponse>(
    `/api/ads?${queryString}`,
    fetcher,
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  return {
    ads: data?.ads ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
