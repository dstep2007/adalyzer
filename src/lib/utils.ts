import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MetricField, METRIC_FORMATS } from "@/types/filters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMetric(value: number, field: MetricField): string {
  const format = METRIC_FORMATS[field];

  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    case "percentage":
      return `${value.toFixed(2)}%`;
    case "decimal":
      return value.toFixed(2);
    case "number":
      return new Intl.NumberFormat("en-US").format(Math.round(value));
    default:
      return String(value);
  }
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(Math.round(value));
}

export function getMetricColor(field: MetricField, value: number): string {
  const costMetrics: MetricField[] = ["spend", "cpc", "cpm", "cost_per_purchase"];
  const isCostMetric = costMetrics.includes(field);

  if (field === "roas") {
    if (value >= 3) return "text-emerald-600";
    if (value >= 1.5) return "text-yellow-600";
    return "text-red-500";
  }

  if (field === "ctr") {
    if (value >= 2) return "text-emerald-600";
    if (value >= 1) return "text-yellow-600";
    return "text-red-500";
  }

  if (isCostMetric) return "text-muted-foreground";
  return "text-foreground";
}

// For MVP: hardcoded org ID. Will be replaced with auth-based org resolution.
export const DEFAULT_ORG_ID = "00000000-0000-0000-0000-000000000001";
