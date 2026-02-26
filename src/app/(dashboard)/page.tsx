"use client";

import { useRouter } from "next/navigation";
import {
  Image,
  FileText,
  Sparkles,
  Wand2,
  TrendingUp,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Topbar } from "@/components/layout/topbar";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const { lastSyncedAt, isSyncing, adCount, connectionConfigured, triggerSync } = useSyncStatus();

  const handleSync = async () => {
    try {
      await triggerSync();
      toast.success("Sync started!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sync failed");
    }
  };

  const tools = [
    {
      title: "Creative Analyzer",
      description: "View and filter ad creatives by performance metrics. Find your best-performing visual assets.",
      icon: Image,
      href: "/creatives",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Ad Copy Analyzer",
      description: "Analyze ad copy performance. Discover which messaging drives the best results.",
      icon: FileText,
      href: "/copy",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Creative Prompt Generator",
      description: "Generate AI prompts from top-performing creatives. Build brand creative guidelines.",
      icon: Sparkles,
      href: "/prompts/creative",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Copy Prompt Generator",
      description: "Generate AI prompts from winning ad copy. Create brand voice guidelines.",
      icon: Wand2,
      href: "/prompts/copy",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="flex flex-col">
      <Topbar
        title="Dashboard"
        description="Welcome to Adalyzer"
        lastSynced={lastSyncedAt}
        onSync={handleSync}
        isSyncing={isSyncing}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adCount}</p>
                <p className="text-sm text-muted-foreground">Total Ads</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <Badge variant={connectionConfigured ? "default" : "secondary"}>
                  {connectionConfigured ? "Connected" : "Not Connected"}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">Meta Status</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Image className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">-</p>
                <p className="text-sm text-muted-foreground">Avg ROAS</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">-</p>
                <p className="text-sm text-muted-foreground">Avg CTR</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting started */}
        {!connectionConfigured && (
          <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center py-8 text-center">
              <Settings className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-lg font-semibold">Get Started</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Connect your Meta Ads account to start analyzing your ad performance.
                You&apos;ll need a Meta access token with ads_read permissions.
              </p>
              <Button className="mt-4" onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tools grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tools</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <Card
                key={tool.href}
                className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
                onClick={() => router.push(tool.href)}
              >
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.bgColor}`}>
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {tool.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
