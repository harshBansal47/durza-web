import { type NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = new URLSearchParams();
  const limit = request.nextUrl.searchParams.get("limit");
  if (limit) query.set("limit", limit);
  return forwardToAdminApi("/admin/ingestion/runs", { query });
}
