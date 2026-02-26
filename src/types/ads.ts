import { Ad } from "./database";

export type AdCreative = Pick<
  Ad,
  | "id"
  | "meta_ad_id"
  | "name"
  | "status"
  | "creative_type"
  | "thumbnail_url"
  | "image_url"
  | "video_url"
  | "creative_meta"
  | "primary_text"
  | "headline"
  | "call_to_action"
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
  | "frequency"
>;

export type AdCopy = Pick<
  Ad,
  | "id"
  | "meta_ad_id"
  | "name"
  | "status"
  | "primary_text"
  | "headline"
  | "description"
  | "call_to_action"
  | "link_url"
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
  | "frequency"
>;

export interface AdsResponse {
  ads: Ad[];
  total: number;
  limit: number;
  offset: number;
}
