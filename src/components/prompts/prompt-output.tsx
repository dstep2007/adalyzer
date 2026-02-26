"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";

interface PromptOutputProps {
  prompt: string;
  sourceAdCount?: number;
  averageMetrics?: {
    spend: number;
    roas: number;
    ctr: number;
    cpc: number;
  };
}

export function PromptOutput({ prompt, sourceAdCount, averageMetrics }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {sourceAdCount !== undefined && averageMetrics && (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Based on {sourceAdCount} ads</span>
          <span>Avg ROAS: {averageMetrics.roas.toFixed(2)}x</span>
          <span>Avg CTR: {averageMetrics.ctr.toFixed(2)}%</span>
        </div>
      )}

      <Card className="relative">
        <div className="absolute top-3 right-3 z-10">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="p-4 pr-24">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {prompt}
            </pre>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
