import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

async function handle(request: NextRequest, segments: string[]) {
  if (segments.length === 1 && segments[0] === "import") {
    const body = request.method === "POST" ? (await request.text()) || "{}" : undefined;
    return forwardToAdminApi("/admin/conversions/import", { method: "POST", body });
  }
  if (segments.length === 1 && segments[0] === "imports") {
    return forwardToAdminApi("/admin/conversions/imports");
  }
  if (segments.length === 3 && segments[0] === "imports" && segments[2] === "void") {
    return forwardToAdminApi(`/admin/conversions/imports/${encodeURIComponent(segments[1])}/void`, { method: "POST", body: "{}" });
  }
  return new Response("Not Found", { status: 404 });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handle(request, (await params).path);
}
export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handle(request, (await params).path);
}
