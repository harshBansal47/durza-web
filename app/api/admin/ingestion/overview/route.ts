import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

export async function GET() {
  return forwardToAdminApi("/admin/ingestion/overview");
}
