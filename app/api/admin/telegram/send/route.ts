
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.text()).trim();
  return forwardToAdminApi("/admin/telegram/send", {
    method: "POST",
    body: body || "{}",
  });
}
