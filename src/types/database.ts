export interface Organization {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface MetaConnection {
  id: string;
  organization_id: string;
  ad_account_id: string;
  access_token: string;
  account_name: string | null;
  is_active: boolean;
  token_expires_at: string | null;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  organization_id: string;
  meta_campaign_id: string;
  ad_account_id: string;
  name: string;
  status: string | null;
  objective: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdSet {
  id: string;
  organization_id: string;
  meta_adset_id: string;
  meta_campaign_id: string;
  name: string;
  status: string | null;
  targeting_summary: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Ad {
  id: string;
  organization_id: string;
  meta_ad_id: string;
  meta_adset_id: string | null;
  meta_campaign_id: string | null;
  ad_account_id: string;
  name: string | null;
  status: string | null;
  creative_type: string | null;
  thumbnail_url: string | null;
  image_url: string | null;
  video_url: string | null;
  creative_meta: Record<string, unknown> | null;
  primary_text: string | null;
  headline: string | null;
  description: string | null;
  call_to_action: string | null;
  link_url: string | null;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  purchases: number;
  purchase_value: number;
  cost_per_purchase: number;
  reach: number;
  frequency: number;
  metrics_start_date: string | null;
  metrics_end_date: string | null;
  meta_created_at: string | null;
  synced_at: string;
  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: string;
  organization_id: string;
  ad_account_id: string;
  status: "pending" | "running" | "completed" | "failed";
  started_at: string;
  completed_at: string | null;
  ads_synced: number;
  error_message: string | null;
  created_at: string;
}

export interface GeneratedPrompt {
  id: string;
  organization_id: string;
  type: "creative_prompt" | "copy_prompt" | "creative_guidelines" | "copy_guidelines";
  name: string | null;
  prompt_text: string;
  source_ad_ids: string[];
  config: Record<string, unknown> | null;
  created_at: string;
}
