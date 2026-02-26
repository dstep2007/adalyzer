import { Ad } from "@/types/database";

export function generateCopyPrompt(
  ads: Ad[],
  options: {
    brandName?: string;
    productType?: string;
    targetAudience?: string;
    tone?: string;
    additionalContext?: string;
  } = {}
): string {
  const topAds = ads.slice(0, 10);
  const avgRoas = topAds.reduce((sum, ad) => sum + ad.roas, 0) / topAds.length;
  const avgCtr = topAds.reduce((sum, ad) => sum + ad.ctr, 0) / topAds.length;

  const copyExamples = topAds
    .filter((ad) => ad.primary_text || ad.headline)
    .map((ad, i) => {
      const lines = [`### Ad ${i + 1} (ROAS: ${ad.roas.toFixed(2)}x, CTR: ${ad.ctr.toFixed(2)}%)`];
      if (ad.headline) lines.push(`**Headline:** ${ad.headline}`);
      if (ad.primary_text) lines.push(`**Primary Text:** ${ad.primary_text}`);
      if (ad.description) lines.push(`**Description:** ${ad.description}`);
      if (ad.call_to_action) lines.push(`**CTA:** ${ad.call_to_action}`);
      return lines.join("\n");
    })
    .join("\n\n");

  // Analyze common patterns
  const allText = topAds
    .map((ad) => `${ad.primary_text || ""} ${ad.headline || ""}`)
    .join(" ")
    .toLowerCase();

  const hasEmojis = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/u.test(allText);
  const hasQuestions = allText.includes("?");
  const hasNumbers = /\d+%|\d+x|\$\d+/.test(allText);
  const avgTextLength = Math.round(
    topAds.filter((ad) => ad.primary_text).reduce((sum, ad) => sum + (ad.primary_text?.length || 0), 0) /
      Math.max(topAds.filter((ad) => ad.primary_text).length, 1)
  );

  return `# AI Ad Copy Generation Prompt

## Context
You are writing ad copy for ${options.brandName || "[Brand Name]"}${options.productType ? `, which sells ${options.productType}` : ""}.${options.targetAudience ? ` Target audience: ${options.targetAudience}.` : ""}${options.tone ? ` Brand tone: ${options.tone}.` : ""}

The following are the top-performing ad copy examples based on real campaign performance data.

## Performance Summary
- Analyzed ${topAds.length} top-performing ads by ROAS/CTR
- Average ROAS: ${avgRoas.toFixed(2)}x
- Average CTR: ${avgCtr.toFixed(2)}%

## Copy Pattern Analysis
- Average primary text length: ~${avgTextLength} characters
- Uses emojis: ${hasEmojis ? "Yes" : "No"}
- Uses questions: ${hasQuestions ? "Yes" : "No"}
- Uses specific numbers/stats: ${hasNumbers ? "Yes" : "No"}

## Top-Performing Ad Copy Examples
${copyExamples}

## Your Task
Based on the analysis of these winning ads, write new ad copy that:

1. **Mirrors the tone and style** of the top performers
2. **Uses similar structural patterns** (length, formatting, emoji usage)
3. **Incorporates proven hooks** and engagement techniques from the examples
4. **Maintains brand voice consistency** while offering fresh angles
5. **Includes strong CTAs** aligned with the effective patterns above

## Deliverables
Please provide 5 complete ad copy variations, each including:
- **Primary Text** (main body copy, ~${avgTextLength} characters)
- **Headline** (short, attention-grabbing)
- **Description** (supporting text)
- **CTA suggestion** (SHOP_NOW, LEARN_MORE, etc.)
- **Rationale** (1-2 sentences on why this copy should perform well)

${options.additionalContext ? `## Additional Context\n${options.additionalContext}\n` : ""}
## Important Guidelines
- Do NOT copy existing ads verbatim; create original copy inspired by winning patterns
- Each variation should test a different angle/hook while maintaining brand consistency
- Focus on the emotional triggers and value propositions that drive the best performance`;
}
