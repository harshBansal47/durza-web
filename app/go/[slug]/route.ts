import { NextResponse, type NextRequest } from "next/server";
import { getServerApiUrl } from "@/lib/api";
import { isValidStoreSlug } from "@/lib/go";

export const dynamic = "force-dynamic";

/** Never cache or index a redirect: each hit is a click that must reach the server. */
const HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

const REDIRECTS = new Set([301, 302, 303, 307, 308]);

function redirect(url: string | URL): NextResponse {
  return NextResponse.redirect(url, { status: 302, headers: HEADERS });
}

/** The visitor's address as the edge saw it; the API records a hash of it, never the address. */
function visitorIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || null;
}

function isHttp(value: string | null): value is string {
  if (!value) return false;
  try {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * `/go/{store-slug}`: the one neutral address behind every "Go to store" link.
 *
 * The API picks the destination and records the click; this route only forwards the visitor's
 * details and relays the redirect, so no network or campaign name ever appears in a URL the
 * browser sees. If anything goes wrong the shopper lands on our own store page instead of an
 * error: a broken link should never cost a visit.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isValidStoreSlug(slug)) return redirect(new URL("/stores", request.url));

  const fallback = new URL(`/stores/${encodeURIComponent(slug)}`, request.url);
  const query = new URLSearchParams();
  for (const key of ["src", "content_ref"]) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) query.set(key, value);
  }

  const headers: Record<string, string> = {};
  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers["user-agent"] = userAgent;
  const ip = visitorIp(request);
  if (ip) headers["x-forwarded-for"] = ip;

  try {
    const response = await fetch(
      `${getServerApiUrl()}/stores/by-slug/${encodeURIComponent(slug)}/go?${query}`,
      { headers, redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(4000) },
    );
    const location = response.headers.get("location");
    // Only ever relay a web address the API produced; anything else is treated as a failure.
    if (REDIRECTS.has(response.status) && isHttp(location)) return redirect(location);
  } catch {
    // network error or timeout: fall through to the store page
  }
  return redirect(fallback);
}

/**
 * Link previews and crawlers probe with HEAD. That must not count as a click, so it never
 * reaches the API.
 */
export function HEAD() {
  return new NextResponse(null, { status: 204, headers: HEADERS });
}
