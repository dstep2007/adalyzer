import { Ad } from "@/types/database";

function escapeCSV(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function generateCSV(ads: Ad[], view: "creative" | "copy"): string {
  const commonHeaders = [
    "Ad Name",
    "Status",
    "Spend",
    "Impressions",
    "Clicks",
    "CTR",
    "CPC",
    "CPM",
    "ROAS",
    "Purchases",
    "Purchase Value",
    "Cost per Purchase",
    "Reach",
    "Frequency",
  ];

  const creativeHeaders = ["Creative Type", "Image URL", "Thumbnail URL"];
  const copyHeaders = ["Primary Text", "Headline", "Description", "CTA", "Link URL"];

  const headers =
    view === "creative"
      ? [...commonHeaders, ...creativeHeaders]
      : [...commonHeaders, ...copyHeaders];

  const rows = ads.map((ad) => {
    const commonValues = [
      escapeCSV(ad.name),
      escapeCSV(ad.status),
      ad.spend.toFixed(2),
      String(ad.impressions),
      String(ad.clicks),
      ad.ctr.toFixed(2),
      ad.cpc.toFixed(2),
      ad.cpm.toFixed(2),
      ad.roas.toFixed(2),
      String(ad.purchases),
      ad.purchase_value.toFixed(2),
      ad.cost_per_purchase.toFixed(2),
      String(ad.reach),
      ad.frequency.toFixed(2),
    ];

    if (view === "creative") {
      return [
        ...commonValues,
        escapeCSV(ad.creative_type),
        escapeCSV(ad.image_url),
        escapeCSV(ad.thumbnail_url),
      ];
    }

    return [
      ...commonValues,
      escapeCSV(ad.primary_text),
      escapeCSV(ad.headline),
      escapeCSV(ad.description),
      escapeCSV(ad.call_to_action),
      escapeCSV(ad.link_url),
    ];
  });

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}
