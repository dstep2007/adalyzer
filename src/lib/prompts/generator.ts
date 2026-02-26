import { Ad } from "@/types/database";
import { PromptType } from "@/types/prompts";
import { generateCreativePrompt } from "./creative-templates";
import { generateCopyPrompt } from "./copy-templates";
import { generateCreativeGuidelines, generateCopyGuidelines } from "./guidelines-templates";

interface GeneratorOptions {
  brandName?: string;
  productType?: string;
  targetAudience?: string;
  tone?: string;
  platform?: string;
  additionalContext?: string;
}

export function generatePrompt(
  ads: Ad[],
  promptType: PromptType,
  options: GeneratorOptions = {}
): string {
  switch (promptType) {
    case "creative_prompt":
      return generateCreativePrompt(ads, options);
    case "copy_prompt":
      return generateCopyPrompt(ads, options);
    case "creative_guidelines":
      return generateCreativeGuidelines(ads, options);
    case "copy_guidelines":
      return generateCopyGuidelines(ads, options);
    default:
      throw new Error(`Unknown prompt type: ${promptType}`);
  }
}

export function computeAverageMetrics(ads: Ad[]) {
  if (ads.length === 0) {
    return { spend: 0, roas: 0, ctr: 0, cpc: 0 };
  }

  return {
    spend: ads.reduce((s, a) => s + a.spend, 0) / ads.length,
    roas: ads.reduce((s, a) => s + a.roas, 0) / ads.length,
    ctr: ads.reduce((s, a) => s + a.ctr, 0) / ads.length,
    cpc: ads.reduce((s, a) => s + a.cpc, 0) / ads.length,
  };
}
