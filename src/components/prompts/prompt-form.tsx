"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PromptType } from "@/types/prompts";

interface PromptFormProps {
  promptType: PromptType;
  apiEndpoint: string;
  onResult: (data: {
    prompt: string;
    sourceAdCount: number;
    averageMetrics: { spend: number; roas: number; ctr: number; cpc: number };
  }) => void;
}

export function PromptForm({
  promptType,
  apiEndpoint,
  onResult,
}: PromptFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [options, setOptions] = useState({
    brandName: "",
    productType: "",
    targetAudience: "",
    tone: "",
    platform: "",
    additionalContext: "",
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptType,
          options: Object.fromEntries(
            Object.entries(options).filter(([, v]) => v.trim() !== ""),
          ),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate prompt");
      }

      const data = await res.json();
      onResult(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Generation failed";
      alert(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const isGuidelines = promptType.includes("guidelines");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Brand Name</Label>
          <Input
            placeholder="e.g., Acme Clothing Co"
            value={options.brandName}
            onChange={(e) =>
              setOptions((o) => ({ ...o, brandName: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Product Type</Label>
          <Input
            placeholder="e.g., children's clothing"
            value={options.productType}
            onChange={(e) =>
              setOptions((o) => ({ ...o, productType: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Target Audience</Label>
          <Input
            placeholder="e.g., parents of kids aged 2-10"
            value={options.targetAudience}
            onChange={(e) =>
              setOptions((o) => ({ ...o, targetAudience: e.target.value }))
            }
          />
        </div>

        {promptType.includes("copy") && (
          <div className="space-y-2">
            <Label>Tone / Voice</Label>
            <Select
              value={options.tone}
              onValueChange={(value) =>
                setOptions((o) => ({ ...o, tone: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tone..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual & Friendly</SelectItem>
                <SelectItem value="playful">Playful & Fun</SelectItem>
                <SelectItem value="luxurious">Luxurious & Premium</SelectItem>
                <SelectItem value="urgent">Urgent & Action-Oriented</SelectItem>
                <SelectItem value="educational">
                  Educational & Informative
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {promptType.includes("creative") && (
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select
              value={options.platform}
              onValueChange={(value) =>
                setOptions((o) => ({ ...o, platform: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Facebook Feed">Facebook Feed</SelectItem>
                <SelectItem value="Instagram Feed">Instagram Feed</SelectItem>
                <SelectItem value="Instagram Stories">
                  Instagram Stories
                </SelectItem>
                <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
                <SelectItem value="Facebook Stories">
                  Facebook Stories
                </SelectItem>
                <SelectItem value="All Placements">All Placements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Additional Context (optional)</Label>
        <Textarea
          placeholder="Any additional instructions or context for the AI prompt..."
          value={options.additionalContext}
          onChange={(e) =>
            setOptions((o) => ({ ...o, additionalContext: e.target.value }))
          }
          rows={3}
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="brand-gradient text-white hover:opacity-90"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        {isGenerating
          ? "Generating..."
          : isGuidelines
            ? "Generate Brand Guidelines"
            : "Generate AI Prompt"}
      </Button>
    </div>
  );
}
