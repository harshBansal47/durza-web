import type { NextRequest } from "next/server";
import { forwardToAdminApi } from "@/lib/admin-proxy";

export const dynamic = "force-dynamic";

/** Only the management actions exposed by the Admitad dashboard are forwarded. */
const STATIC_PATHS = new Set([
  "summary",
  "sync",
  "sync/history",
  "ingestion/health",
  "ingestion/run",
  "health-check/bulk",
  "aliases",
]);
const PROGRAM_ACTIONS = new Set(["approve", "health-check", "deactivate-store", "reactivate"]);
const ALIAS_ACTIONS = new Set(["confirm", "reject"]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function resolve(segments: string[]): string | null {
  const path = segments.join("/");
  if (STATIC_PATHS.has(path)) return `/admin/admitad/${path}`;
  if (segments.length === 1 && UUID_RE.test(segments[0])) return `/admin/admitad/${segments[0]}`;
  if (segments.length === 2 && UUID_RE.test(segments[0]) && PROGRAM_ACTIONS.has(segments[1])) {
    return `/admin/admitad/${segments[0]}/${segments[1]}`;
  }
  if (
    segments.length === 3 &&
    segments[0] === "aliases" &&
    UUID_RE.test(segments[1]) &&
    ALIAS_ACTIONS.has(segments[2])
  ) {
    return `/admin/admitad/aliases/${segments[1]}/${segments[2]}`;
  }
  return null;
}

async function handle(request: NextRequest, segments: string[]) {
  const path = resolve(segments);
  if (!path) return new Response("Not Found", { status: 404 });
  const method = request.method === "POST" ? "POST" : "GET";
  const query = new URLSearchParams();
  for (const key of ["limit", "status", "store_id"]) {
    const value = request.nextUrl.searchParams.get(key);
    if (value && (key !== "store_id" || UUID_RE.test(value))) query.set(key, value);
  }
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
