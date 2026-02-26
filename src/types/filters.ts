export type SortDirection = "asc" | "desc";

export type MetricField =
  | "spend"
  | "impressions"
  | "clicks"
  | "ctr"
  | "cpc"
  | "cpm"
  | "roas"
  | "purchases"
  | "purchase_value"
  | "cost_per_purchase"
  | "reach"
  | "frequency";

export interface MetricFilter {
  field: MetricField;
  min?: number;
  max?: number;
}

export interface AdFilters {
  view: "creative" | "copy";
  sortBy: MetricField;
  sortDir: SortDirection;
  status?: string;
  creativeType?: string;
  metrics: MetricFilter[];
  limit: number;
  offset: number;
  search?: string;
}

export const METRIC_LABELS: Record<MetricField, string> = {
  spend: "Amount Spent",
  impressions: "Impressions",
  clicks: "Clicks",
  ctr: "CTR (%)",
  cpc: "CPC",
  cpm: "CPM",
  roas: "ROAS",
  purchases: "Purchases",
  purchase_value: "Purchase Value",
  cost_per_purchase: "Cost per Purchase",
  reach: "Reach",
  frequency: "Frequency",
};

export const METRIC_FORMATS: Record<MetricField, "currency" | "number" | "percentage" | "decimal"> = {
  spend: "currency",
  impressions: "number",
  clicks: "number",
  ctr: "percentage",
  cpc: "currency",
  cpm: "currency",
  roas: "decimal",
  purchases: "number",
  purchase_value: "currency",
  cost_per_purchase: "currency",
  reach: "number",
  frequency: "decimal",
};

export const DEFAULT_FILTERS: AdFilters = {
  view: "creative",
  sortBy: "spend",
  sortDir: "desc",
  metrics: [],
  limit: 50,
  offset: 0,
};
