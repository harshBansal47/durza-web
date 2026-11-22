import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

/**
 * Proxy for campaign detail, lifecycle actions and health checks.
 *
 * Only the paths the admin dashboard actually uses are forwarded, so a caller
 * cannot use this route to reach unrelated API endpoints. UUID segments are
 * validated before forwarding.
 */
const ACTIONS = new Set([
  "summary",
  "sync",
  "sync/latest",
  "health-check/bulk",
]);
const SUFFIXES = new Set([
  "approve",
  "health-check",
  "deactivate-store",
  "reactivate",
]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function resolve(segments: string[]): Promise<string | null> {
  const path = segments.join("/");
  if (ACTIONS.has(path)) return `/admin/campaigns/${path}`;
  if (segments.length === 1 && UUID_RE.test(segments[0])) {
    return `/admin/campaigns/${segments[0]}`;
  }
  if (segments.length === 2 && UUID_RE.test(segments[0]) && SUFFIXES.has(segments[1])) {
    return `/admin/campaigns/${segments[0]}/${segments[1]}`;
  }
  return null;
}

async function handle(request: NextRequest, segments: string[]) {
  const path = await resolve(segments);
  if (!path) return new Response("Not Found", { status: 404 });
  const method = request.method === "POST" ? "POST" : "GET";
  let body: string | undefined;
  if (method === "POST") {
    const raw = await request.text();
    body = raw || "{}";
  }
  const query = new URLSearchParams();
  const limit = request.nextUrl.searchParams.get("limit");
  if (limit && /^\d+$/.test(limit)) query.set("limit", limit);
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
