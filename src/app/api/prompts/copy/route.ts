import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { generatePrompt, computeAverageMetrics } from "@/lib/prompts/generator";
import { PromptType } from "@/types/prompts";

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;

  const body = await request.json();
  const { adIds, promptType, options } = body as {
    adIds?: string[];
    promptType: PromptType;
    options?: Record<string, string>;
  };

  let ads;
  if (adIds && adIds.length > 0) {
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .eq("organization_id", orgId)
      .in("id", adIds);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    ads = data || [];
  } else {
    // Auto-select top 10 ads with copy, sorted by ROAS
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .eq("organization_id", orgId)
      .gt("spend", 10)
      .not("primary_text", "is", null)
      .order("roas", { ascending: false })
      .limit(10);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    ads = data || [];
  }

  if (ads.length === 0) {
    return NextResponse.json(
      { error: "No ads with copy found. Sync your ad data first." },
      { status: 404 }
    );
  }

  const prompt = generatePrompt(ads, promptType || "copy_prompt", options || {});
  const averageMetrics = computeAverageMetrics(ads);

  return NextResponse.json({
    prompt,
    sourceAdCount: ads.length,
    averageMetrics,
  });
}
