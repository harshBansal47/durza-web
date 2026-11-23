import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function handle(request: NextRequest, segments: string[]) {
  const method = request.method === "POST" ? "POST" : "GET";
  let path: string | null = null;
  const query = new URLSearchParams();
  if (segments.length === 1 && segments[0] === "queue") {
    path = "/admin/evidence/queue";
    for (const key of ["store_slug", "tier", "evidence_tier", "limit"]) {
      const value = request.nextUrl.searchParams.get(key);
      if (value) query.set(key, value);
    }
  } else if (segments.length === 1 && UUID_RE.test(segments[0])) {
    path = `/admin/evidence/${segments[0]}`;
  } else if (segments.length === 2 && UUID_RE.test(segments[0]) && segments[1] === "deactivate") {
    path = `/admin/evidence/${segments[0]}/deactivate`;
  }
  if (!path) return new Response("Not Found", { status: 404 });
  const body = method === "POST" ? (await request.text()) || "{}" : undefined;
  return forwardToAdminApi(path, { method, body, query });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handle(request, (await params).path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handle(request, (await params).path);
}
