import { Ad } from "@/types/database";

export function generateCreativePrompt(
  ads: Ad[],
  options: {
    brandName?: string;
    productType?: string;
    targetAudience?: string;
    platform?: string;
    additionalContext?: string;
  } = {}
): string {
  const topAds = ads.slice(0, 10);
  const avgRoas = topAds.reduce((sum, ad) => sum + ad.roas, 0) / topAds.length;
  const avgCtr = topAds.reduce((sum, ad) => sum + ad.ctr, 0) / topAds.length;
  const totalSpend = topAds.reduce((sum, ad) => sum + ad.spend, 0);

  const creativeTypes = [...new Set(topAds.map((ad) => ad.creative_type).filter(Boolean))];
  const ctaTypes = [...new Set(topAds.map((ad) => ad.call_to_action).filter(Boolean))];

  const adDescriptions = topAds
    .map((ad, i) => {
      const lines = [`Ad ${i + 1}: "${ad.name || "Untitled"}"`, `  - Type: ${ad.creative_type || "Unknown"}`];
      if (ad.headline) lines.push(`  - Headline: "${ad.headline}"`);
      if (ad.primary_text) lines.push(`  - Copy snippet: "${ad.primary_text.slice(0, 150)}..."`);
      if (ad.call_to_action) lines.push(`  - CTA: ${ad.call_to_action}`);
      lines.push(`  - Performance: ROAS ${ad.roas.toFixed(2)}, CTR ${ad.ctr.toFixed(2)}%, $${ad.spend.toFixed(2)} spend`);
      return lines.join("\n");
    })
    .join("\n\n");

  return `# AI Creative Generation Prompt

## Context
You are creating ad creative for ${options.brandName || "[Brand Name]"}${options.productType ? `, which sells ${options.productType}` : ""}. The following are the top-performing ad creatives based on real campaign data.${options.targetAudience ? ` Target audience: ${options.targetAudience}.` : ""}${options.platform ? ` Platform: ${options.platform}.` : ""}

## Performance Summary
- Analyzed ${topAds.length} top-performing ads
- Average ROAS: ${avgRoas.toFixed(2)}x
- Average CTR: ${avgCtr.toFixed(2)}%
- Total spend across analyzed ads: $${totalSpend.toFixed(2)}
- Winning creative formats: ${creativeTypes.join(", ") || "Various"}
- Effective CTAs: ${ctaTypes.join(", ") || "Various"}

## Top-Performing Ads Analysis
${adDescriptions}

## Your Task
Based on the analysis of these winning ad creatives, generate new ad creative concepts that:

1. **Follow the winning patterns** observed in the top performers above
2. **Use similar creative formats** (${creativeTypes.join(", ") || "image/video"})
3. **Maintain the visual style** and compositional elements that drive engagement
4. **Include compelling CTAs** similar to the effective ones identified (${ctaTypes.join(", ") || "SHOP_NOW"})
5. **Target the same audience** with fresh, non-repetitive creative angles

## Creative Brief
Please provide:
- 3-5 new creative concepts with detailed visual descriptions
- For each concept: image/video direction, composition notes, color palette suggestions
- Suggested headline and primary text for each creative
- Recommended CTA for each variant
- Rationale for why each concept should perform well based on the winning patterns

${options.additionalContext ? `## Additional Context\n${options.additionalContext}\n` : ""}
## Important
- Do NOT copy existing ads directly; create original concepts inspired by winning patterns
- Focus on what makes the top performers work (visual elements, messaging, emotional triggers)
- Consider creative fatigue - suggest variations that feel fresh while maintaining proven elements`;
}
