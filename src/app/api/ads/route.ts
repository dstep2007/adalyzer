import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
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

  const sortBy = (params.get("sortBy") as MetricField) || "spend";
  const sortDir = params.get("sortDir") === "asc" ? true : false;
  const limit = Math.min(parseInt(params.get("limit") || "50"), 500);
  const offset = parseInt(params.get("offset") || "0");
  const status = params.get("status");
  const creativeType = params.get("creativeType");
  const search = params.get("search");

  // Validate sort field
  if (!VALID_SORT_FIELDS.includes(sortBy)) {
    return NextResponse.json({ error: "Invalid sort field" }, { status: 400 });
  }

  // Build query
  let query = supabase
    .from("ads")
    .select("*", { count: "exact" })
    .eq("organization_id", orgId);

  // Apply status filter
  if (status) {
    query = query.eq("status", status);
  }

  // Apply creative type filter
  if (creativeType) {
    query = query.eq("creative_type", creativeType);
  }

  // Apply search
  if (search) {
    query = query.or(`name.ilike.%${search}%,primary_text.ilike.%${search}%,headline.ilike.%${search}%`);
  }

  // Apply metric range filters
  for (const field of VALID_SORT_FIELDS) {
    const min = params.get(`min_${field}`);
    const max = params.get(`max_${field}`);
    if (min) query = query.gte(field, parseFloat(min));
    if (max) query = query.lte(field, parseFloat(max));
  }

  // Apply sort and pagination
  query = query
    .order(sortBy, { ascending: sortDir })
    .range(offset, offset + limit - 1);

  const { data: ads, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ads: ads || [],
    total: count || 0,
    limit,
    offset,
  });
}
