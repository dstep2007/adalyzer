import { createAdminClient } from "@/lib/supabase/admin";
import { MetaApiClient } from "./client";
import { fetchAds, fetchCampaigns, fetchAdSets } from "./ads";
import { fetchInsights } from "./insights";
import { MetaAd, MetaInsight } from "./types";

interface SyncResult {
  success: boolean;
  adsSynced: number;
  error?: string;
}

function extractCreativeFields(ad: MetaAd) {
  const creative = ad.creative;
  if (!creative) {
    return {
      creative_type: null,
      thumbnail_url: null,
      image_url: null,
      video_url: null,
      creative_meta: null,
      primary_text: null,
      headline: null,
      description: null,
      call_to_action: null,
      link_url: null,
    };
  }

  const storySpec = creative.object_story_spec;
  const linkData = storySpec?.link_data;
  const videoData = storySpec?.video_data;

  // Determine creative type
  let creative_type = "image";
  if (creative.video_id || videoData?.video_id) creative_type = "video";

  // Extract text fields, preferring object_story_spec data
  const primary_text = linkData?.message || videoData?.message || creative.body || null;
  const headline = linkData?.name || videoData?.title || creative.title || null;
  const description = linkData?.description || null;
  const call_to_action =
    linkData?.call_to_action?.type ||
    videoData?.call_to_action?.type ||
    creative.call_to_action_type ||
    null;
  const link_url = linkData?.link || creative.link_url || null;

  // Extract image/video URLs
  const thumbnail_url = creative.thumbnail_url || linkData?.picture || videoData?.image_url || null;
  const image_url = creative.image_url || linkData?.picture || null;
  const video_url = null; // Video URLs need a separate API call; thumbnail is used for now

  return {
    creative_type,
    thumbnail_url,
    image_url,
    video_url,
    creative_meta: creative.object_story_spec ? JSON.parse(JSON.stringify(creative.object_story_spec)) : null,
    primary_text,
    headline,
    description,
    call_to_action,
    link_url,
  };
}

function parseInsightMetrics(insight: MetaInsight) {
  const spend = parseFloat(insight.spend || "0");
  const impressions = parseInt(insight.impressions || "0");
  const clicks = parseInt(insight.clicks || "0");
  const ctr = parseFloat(insight.ctr || "0");
  const cpc = parseFloat(insight.cpc || "0");
  const cpm = parseFloat(insight.cpm || "0");
  const reach = parseInt(insight.reach || "0");
  const frequency = parseFloat(insight.frequency || "0");

  // Extract purchases from actions array
  let purchases = 0;
  let purchase_value = 0;

  if (insight.actions) {
    const purchaseAction = insight.actions.find(
      (a) => a.action_type === "purchase" || a.action_type === "offsite_conversion.fb_pixel_purchase"
    );
    if (purchaseAction) {
      purchases = parseInt(purchaseAction.value);
    }
  }

  if (insight.action_values) {
    const purchaseValueAction = insight.action_values.find(
      (a) => a.action_type === "purchase" || a.action_type === "offsite_conversion.fb_pixel_purchase"
    );
    if (purchaseValueAction) {
      purchase_value = parseFloat(purchaseValueAction.value);
    }
  }

  const roas = spend > 0 ? purchase_value / spend : 0;
  const cost_per_purchase = purchases > 0 ? spend / purchases : 0;

  return {
    spend,
    impressions,
    clicks,
    ctr,
    cpc,
    cpm,
    roas,
    purchases,
    purchase_value,
    cost_per_purchase,
    reach,
    frequency,
    metrics_start_date: insight.date_start,
    metrics_end_date: insight.date_stop,
  };
}

export async function syncAdAccount(
  organizationId: string,
  adAccountId: string,
  accessToken: string
): Promise<SyncResult> {
  const supabase = createAdminClient();
  const client = new MetaApiClient(accessToken);

  // Create sync log entry
  const { data: syncLog } = await supabase
    .from("sync_log")
    .insert({
      organization_id: organizationId,
      ad_account_id: adAccountId,
      status: "running",
    })
    .select()
    .single();

  try {
    // 1. Fetch campaigns
    const campaigns = await fetchCampaigns(client, adAccountId);
    if (campaigns.length > 0) {
      await supabase.from("campaigns").upsert(
        campaigns.map((c) => ({
          organization_id: organizationId,
          meta_campaign_id: c.id,
          ad_account_id: adAccountId,
          name: c.name,
          status: c.status,
          objective: c.objective || null,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "organization_id,meta_campaign_id" }
      );
    }

    // 2. Fetch ad sets
    const adSets = await fetchAdSets(client, adAccountId);
    if (adSets.length > 0) {
      await supabase.from("ad_sets").upsert(
        adSets.map((as) => ({
          organization_id: organizationId,
          meta_adset_id: as.id,
          meta_campaign_id: as.campaign_id,
          name: as.name,
          status: as.status,
          targeting_summary: as.targeting || null,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "organization_id,meta_adset_id" }
      );
    }

    // 3. Fetch ads with creative details
    const ads = await fetchAds(client, adAccountId);

    // 4. Fetch insights
    const insights = await fetchInsights(client, adAccountId);
    const insightsByAdId = new Map<string, MetaInsight>();
    for (const insight of insights) {
      insightsByAdId.set(insight.ad_id, insight);
    }

    // 5. Merge and upsert ads
    const adRecords = ads.map((ad) => {
      const creativeFields = extractCreativeFields(ad);
      const insight = insightsByAdId.get(ad.id);
      const metrics = insight
        ? parseInsightMetrics(insight)
        : {
            spend: 0,
            impressions: 0,
            clicks: 0,
            ctr: 0,
            cpc: 0,
            cpm: 0,
            roas: 0,
            purchases: 0,
            purchase_value: 0,
            cost_per_purchase: 0,
            reach: 0,
            frequency: 0,
            metrics_start_date: null,
            metrics_end_date: null,
          };

      return {
        organization_id: organizationId,
        meta_ad_id: ad.id,
        meta_adset_id: ad.adset_id || null,
        meta_campaign_id: ad.campaign_id || null,
        ad_account_id: adAccountId,
        name: ad.name,
        status: ad.status,
        ...creativeFields,
        ...metrics,
        meta_created_at: ad.created_time || null,
        synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    // Batch upsert in chunks of 100
    const chunkSize = 100;
    for (let i = 0; i < adRecords.length; i += chunkSize) {
      const chunk = adRecords.slice(i, i + chunkSize);
      const { error } = await supabase
        .from("ads")
        .upsert(chunk, { onConflict: "organization_id,meta_ad_id" });

      if (error) {
        throw new Error(`Failed to upsert ads batch ${i}: ${error.message}`);
      }
    }

    // 6. Update sync log
    await supabase
      .from("sync_log")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        ads_synced: adRecords.length,
      })
      .eq("id", syncLog?.id);

    // 7. Update meta_connections last_synced_at
    await supabase
      .from("meta_connections")
      .update({
        last_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("organization_id", organizationId)
      .eq("ad_account_id", adAccountId);

    return { success: true, adsSynced: adRecords.length };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown sync error";

    await supabase
      .from("sync_log")
      .update({
        status: "failed",
        completed_at: new Date().toISOString(),
        error_message: errorMessage,
      })
      .eq("id", syncLog?.id);

    return { success: false, adsSynced: 0, error: errorMessage };
  }
}
