import { NextRequest, NextResponse } from "next/server";
import { MetaApiClient } from "@/lib/meta/client";
import { MetaAdAccount } from "@/lib/meta/types";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Access token required" }, { status: 400 });
  }

  try {
    const client = new MetaApiClient(token);
    const response = await client.get<MetaAdAccount>("/me/adaccounts", {
      fields: "id,name,account_id,account_status,currency",
      limit: "100",
    });

    return NextResponse.json({
      accounts: response.data.map((account) => ({
        id: account.id,
        name: account.name,
        accountId: account.account_id,
        status: account.account_status,
        currency: account.currency,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch accounts";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
