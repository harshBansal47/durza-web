import { NextResponse } from "next/server";
import { setSessionCookies } from "@/lib/session";

/**
 * Receives the tokens the backend issues after a successful Google OAuth
 * callback. The backend redirects here with `?access_token=...&refresh_token=...`
 * (and optionally `?next=...`); we set the httpOnly session cookies and send
 * the visitor on to the app.
 *
 * Backend contract (implement on api.durza.in):
 *   GET /auth/google?redirect=<frontend-path>
 *     -> 302 to Google's consent screen
 *   GET /auth/google/callback?code=...&state=...
 *     -> verify code with Google, create/link account, then 302 to
 *        ${SITE_URL}/account/auth/callback?access_token=...&refresh_token=...&next=...
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("access_token");
  const refreshToken = url.searchParams.get("refresh_token");
  const next = url.searchParams.get("next") ?? "/account";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL(`/account/login?error=google`, request.url));
  }

  await setSessionCookies(accessToken, refreshToken);
  return NextResponse.redirect(new URL(safeNext, request.url));
}
