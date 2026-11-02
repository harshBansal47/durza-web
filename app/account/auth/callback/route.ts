import { NextResponse } from "next/server";

/**
 * Retired callback for the former token-in-query OAuth contract.
 * The active callback exchanges Google's authorization code server-side at
 * /api/auth/callback/google so session tokens never appear in a URL.
 */
export async function GET(request: Request) {
  // Session tokens must never be accepted from a URL: URLs are retained in
  // browser history and can leak through referrer headers, access logs, and
  // analytics. The active Google flow exchanges its code server-side in
  // /api/auth/callback/google and sets HttpOnly cookies there.
  const response = NextResponse.redirect(
    new URL("/account/login?error=google&reason=unsupported_callback", request.url),
  );
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
