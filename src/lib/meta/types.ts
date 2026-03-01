// Meta Marketing API response types

export interface MetaAdAccount {
  id: string;
  name: string;
  account_id: string;
  account_status: number;
  currency: string;
}

export interface MetaAdCreative {
  id: string;
  thumbnail_url?: string;
  image_url?: string;
  effective_image_url?: string;
  video_id?: string;
  body?: string;
  title?: string;
  link_url?: string;
  call_to_action_type?: string;
  object_story_spec?: {
    link_data?: {
      message?: string;
      name?: string;
      description?: string;
      link?: string;
      image_hash?: string;
      call_to_action?: { type: string };
      picture?: string;
    };
    video_data?: {
      message?: string;
      title?: string;
      image_url?: string;
      video_id?: string;
      call_to_action?: { type: string };
    };
  };
}

export interface MetaAd {
  id: string;
  name: string;
  status: string;
  adset_id?: string;
  campaign_id?: string;
  creative?: MetaAdCreative;
  created_time?: string;
}

export interface MetaInsightAction {
  action_type: string;
  value: string;
}

export interface MetaInsight {
  ad_id: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  cpc: string;
  cpm: string;
  reach: string;
  frequency: string;
  actions?: MetaInsightAction[];
  action_values?: MetaInsightAction[];
  date_start: string;
  date_stop: string;
}

export interface MetaPagingCursors {
  before: string;
  after: string;
}

export interface MetaPaging {
  cursors: MetaPagingCursors;
  next?: string;
  previous?: string;
}

export interface MetaApiResponse<T> {
  data: T[];
  paging?: MetaPaging;
}

export interface MetaCampaign {
  id: string;
  name: string;
  status: string;
  objective?: string;
}

export interface MetaAdSet {
  id: string;
  name: string;
  status: string;
  campaign_id: string;
  targeting?: Record<string, unknown>;
}
