import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { generateCSV } from "@/lib/export/csv";
import { MetricField } from "@/types/filters";

const VALID_SORT_FIELDS: MetricField[] = [
  "spend", "impressions", "clicks", "ctr", "cpc", "cpm",
  "roas", "purchases", "purchase_value", "cost_per_purchase", "reach", "frequency",
];

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user, supabase } = auth;
  const orgId = user.organization.id;
  const params = request.nextUrl.searchParams;

  const view = (params.get("view") as "creative" | "copy") || "creative";
  const sortBy = (params.get("sortBy") as MetricField) || "spend";
  const sortDir = params.get("sortDir") === "asc" ? true : false;
  const exportLimit = Math.min(parseInt(params.get("exportLimit") || "500"), 2000);
  const status = params.get("status");
  const creativeType = params.get("creativeType");

  let query = supabase
    .from("ads")
    .select("*")
    .eq("organization_id", orgId);

  if (status) query = query.eq("status", status);
  if (creativeType) query = query.eq("creative_type", creativeType);

  for (const field of VALID_SORT_FIELDS) {
    const min = params.get(`min_${field}`);
    const max = params.get(`max_${field}`);
    if (min) query = query.gte(field, parseFloat(min));
    if (max) query = query.lte(field, parseFloat(max));
  }

  query = query.order(sortBy, { ascending: sortDir }).limit(exportLimit);

  const { data: ads, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const csv = generateCSV(ads || [], view);
  const date = new Date().toISOString().split("T")[0];

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="adalyzer-${view}-export-${date}.csv"`,
    },
  });
}
