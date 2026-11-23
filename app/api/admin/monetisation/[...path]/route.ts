import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function handle(request: NextRequest, segments: string[]) {
  const method = request.method === "POST" ? "POST" : "GET";
  let path: string | null = null;
  if (segments.length === 1 && segments[0] === "queue") path = "/admin/monetisation/queue";
  else if (segments.length === 2 && UUID_RE.test(segments[0]) && segments[1] === "url") path = `/admin/monetisation/${segments[0]}/url`;
  else if (segments.length === 2 && UUID_RE.test(segments[0]) && segments[1] === "restore") path = `/admin/monetisation/${segments[0]}/restore`;
  else if (segments.length === 2 && UUID_RE.test(segments[0]) && segments[1] === "accepted-unmonetised") path = `/admin/monetisation/${segments[0]}/accepted-unmonetised`;
  if (!path) return new Response("Not Found", { status: 404 });
  const query = new URLSearchParams();
  const limit = request.nextUrl.searchParams.get("limit");
  if (limit && /^\d+$/.test(limit)) query.set("limit", limit);
  const body = method === "POST" ? (await request.text()) || "{}" : undefined;
  return forwardToAdminApi(path, { method, body, query });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handle(request, (await params).path);
}
export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handle(request, (await params).path);
}
