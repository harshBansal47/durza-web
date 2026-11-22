import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

/** Allow-listed dashboard filters — anything else is dropped before forwarding. */
const FILTERS = ["status", "search", "skip", "limit"] as const;

export async function GET(request: NextRequest) {
  const query = new URLSearchParams();
  for (const key of FILTERS) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) query.set(key, value);
  }
  return forwardToAdminApi("/admin/campaigns", { query });
}
