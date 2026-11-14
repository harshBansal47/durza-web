import { NextResponse, type NextRequest } from "next/server";
import { getServerApiUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Never cache or index a redirect: each hit is a click that must reach the API. */
const HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

const REDIRECTS = new Set([301, 302, 303, 307, 308]);

function redirect(url: string | URL): NextResponse {
  return NextResponse.redirect(url, { status: 302, headers: HEADERS });
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

function validParam(value: string | null, pattern: RegExp): value is string {
  return value !== null && pattern.test(value);
}

const PROGRAM = /^\d{1,12}$/;
const ULP = /^https?:\/\/[^\s"'<>]{3,2048}$/;
const SRC = /^[a-z0-9][a-z0-9_-]{0,39}$/;
const CONTENT_REF = /^[a-z0-9:_-]{1,80}$/;

/**
 * `/out?program=<admitad program id>&ulp=<destination>&src=<placement>&content_ref=<id>`
 *
 * Relay to the API's tracked affiliate redirect: the API resolves the tracked
 * Admitad destination for the program, records the click, and 302s. This adds
 * nothing the API doesn't already decide — no program, destination or policy
 * logic lives on the edge.
 */
export async function GET(request: NextRequest) {
  const program = request.nextUrl.searchParams.get("program");
  const ulp = request.nextUrl.searchParams.get("ulp");
  const src = request.nextUrl.searchParams.get("src");
  const contentRef = request.nextUrl.searchParams.get("content_ref");

  if (!validParam(program, PROGRAM) || !validParam(ulp, ULP) || !isHttp(ulp)) {
    // A malformed link lands on the storefront rather than an error page.
    return redirect(new URL("/stores", request.url));
  }

  const query = new URLSearchParams({ program, ulp });
  if (src && SRC.test(src)) query.set("src", src);
  if (contentRef && CONTENT_REF.test(contentRef)) query.set("content_ref", contentRef);

  const headers: Record<string, string> = {};
  const userAgent = request.headers.get("user-agent");
  if (userAgent) headers["user-agent"] = userAgent;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) headers["x-forwarded-for"] = forwarded.split(",")[0].trim();

  try {
    const response = await fetch(
      `${getServerApiUrl()}/affiliate/out?${query}`,
      { headers, redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(4000) },
    );
    const location = response.headers.get("location");
    if (REDIRECTS.has(response.status) && isHttp(location)) return redirect(location);
  } catch {
    // Network error or timeout: land on our own directory rather than a page
    // that looks broken — like /go, we never drop a shopper mid-hop.
  }
  return redirect(new URL("/stores", request.url));
}

export function HEAD() {
  return new NextResponse(null, { status: 204, headers: HEADERS });
}
