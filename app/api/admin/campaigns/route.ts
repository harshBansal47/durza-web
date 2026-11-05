import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

/** The only query parameters the campaigns API understands; anything else is dropped. */
const FILTERS = ["search", "category", "country", "skip", "limit"] as const;

export async function GET(request: NextRequest) {
  const query = new URLSearchParams();
  for (const key of FILTERS) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) query.set(key, value);
  }
  return forwardToAdminApi("/vcommission/campaigns", { query });
}
