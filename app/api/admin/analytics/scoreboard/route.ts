import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = new URLSearchParams();
  for (const key of ["start_date", "end_date"]) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) query.set(key, value);
  }
  return forwardToAdminApi("/admin/analytics/scoreboard", { query });
}
