export type PromptType = "creative_prompt" | "copy_prompt" | "creative_guidelines" | "copy_guidelines";

export interface PromptGenerationRequest {
  adIds: string[];
  promptType: PromptType;
  options?: {
    brandName?: string;
    productType?: string;
    targetAudience?: string;
    tone?: string;
    platform?: string;
    additionalContext?: string;
  };
}

export interface PromptGenerationResponse {
  prompt: string;
  sourceAdCount: number;
  averageMetrics: {
    spend: number;
    roas: number;
    ctr: number;
    cpc: number;
  };
}
