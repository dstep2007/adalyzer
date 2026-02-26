"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptForm } from "@/components/prompts/prompt-form";
import { PromptOutput } from "@/components/prompts/prompt-output";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

interface PromptResult {
  prompt: string;
  sourceAdCount: number;
  averageMetrics: { spend: number; roas: number; ctr: number; cpc: number };
}

export default function CreativePromptPage() {
  const [promptResult, setPromptResult] = useState<PromptResult | null>(null);
  const [guidelinesResult, setGuidelinesResult] = useState<PromptResult | null>(null);

  return (
    <div className="flex flex-col">
      <Topbar title="Creative Prompt Generator" />

      <div className="p-6 space-y-6">
        <PageHeader
          title="Creative Prompt Generator"
          description="Generate AI prompts from your top-performing ad creatives. Use these prompts with ChatGPT, Midjourney, or any AI tool to create new winning creative."
        />

        <Tabs defaultValue="prompt" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prompt">Generate Creative Prompt</TabsTrigger>
            <TabsTrigger value="guidelines">Brand Creative Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-6">
            <PromptForm
              promptType="creative_prompt"
              apiEndpoint="/api/prompts/creative"
              onResult={setPromptResult}
            />

            {promptResult ? (
              <PromptOutput
                prompt={promptResult.prompt}
                sourceAdCount={promptResult.sourceAdCount}
                averageMetrics={promptResult.averageMetrics}
              />
            ) : (
              <EmptyState
                icon={Sparkles}
                title="No prompt generated yet"
                description="Fill in your brand details above and click 'Generate AI Prompt' to create a prompt from your top-performing creatives."
              />
            )}
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <PromptForm
              promptType="creative_guidelines"
              apiEndpoint="/api/prompts/creative"
              onResult={setGuidelinesResult}
            />

            {guidelinesResult ? (
              <PromptOutput
                prompt={guidelinesResult.prompt}
                sourceAdCount={guidelinesResult.sourceAdCount}
                averageMetrics={guidelinesResult.averageMetrics}
              />
            ) : (
              <EmptyState
                icon={Sparkles}
                title="No guidelines generated yet"
                description="Generate comprehensive brand creative guidelines based on your top-performing ads."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
