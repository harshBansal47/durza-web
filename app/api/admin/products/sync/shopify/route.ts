import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  return forwardToAdminApi("/products/sync/shopify");
}

export async function POST() {
  return forwardToAdminApi("/products/sync/shopify", {
    method: "POST",
    body: "{}",
  });
}
