import { MetaApiClient } from "./client";
import { MetaAd, MetaCampaign, MetaAdSet } from "./types";

const AD_FIELDS = [
  "id",
  "name",
  "status",
  "adset_id",
  "campaign_id",
  "created_time",
  "creative{id,thumbnail_url,image_url,effective_image_url,video_id,body,title,link_url,call_to_action_type,object_story_spec}",
].join(",");

const CAMPAIGN_FIELDS = "id,name,status,objective";
const ADSET_FIELDS = "id,name,status,campaign_id,targeting";

export async function fetchAds(client: MetaApiClient, adAccountId: string): Promise<MetaAd[]> {
  return client.getAllPages<MetaAd>(`/${adAccountId}/ads`, {
    fields: AD_FIELDS,
    limit: "50",
  });
}

export async function fetchCampaigns(client: MetaApiClient, adAccountId: string): Promise<MetaCampaign[]> {
  return client.getAllPages<MetaCampaign>(`/${adAccountId}/campaigns`, {
    fields: CAMPAIGN_FIELDS,
    limit: "500",
  });
}

export async function fetchAdSets(client: MetaApiClient, adAccountId: string): Promise<MetaAdSet[]> {
  return client.getAllPages<MetaAdSet>(`/${adAccountId}/adsets`, {
    fields: ADSET_FIELDS,
    limit: "500",
  });
}
