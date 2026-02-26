import { MetaApiClient } from "./client";
import { MetaInsight } from "./types";

const INSIGHT_FIELDS = [
  "ad_id",
  "spend",
  "impressions",
  "clicks",
  "ctr",
  "cpc",
  "cpm",
  "reach",
  "frequency",
  "actions",
  "action_values",
  "date_start",
  "date_stop",
].join(",");

export async function fetchInsights(
  client: MetaApiClient,
  adAccountId: string,
  datePreset: string = "last_year"
): Promise<MetaInsight[]> {
  return client.getAllPages<MetaInsight>(`/${adAccountId}/insights`, {
    level: "ad",
    fields: INSIGHT_FIELDS,
    date_preset: datePreset,
    limit: "100",
  });
}
