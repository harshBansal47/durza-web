import { NextRequest, NextResponse } from "next/server";
import { setSessionCookies } from "@/lib/session";
import {
  GOOGLE_OAUTH_STATE_COOKIE,
  verifyGoogleOAuthState,
} from "@/lib/google-oauth-state";

/**
 * Google OAuth callback. Google redirects here with `?code=...`. We exchange
 * the code for tokens (server-side, using the client secret), verify the ID
 * token, then call the backend to create/link the account and issue our own
 * session tokens.
 *
 * Failures come back as `/account/login?error=google&reason=<code>` — the
 * login page turns the code into a sentence the visitor can act on, and the
 * full detail goes to the function logs where an operator can see it. Silent
 * redirects were how "Google sign-in is broken" went undiagnosed: the visitor
 * landed back on a login form that looked like they had never clicked.
 *
 * Backend contract (api.durza.in):
 *   POST /auth/google  { id_token: string }
 *     -> { access_token, refresh_token }  (same shape as /auth/login)
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const stateParam = url.searchParams.get("state");

  const fail = (reason: string, detail?: string) => {
    console.error(`[google-oauth] ${reason}${detail ? `: ${detail}` : ""}`);
    const response = NextResponse.redirect(
      new URL(`/account/login?error=google&reason=${encodeURIComponent(reason)}`, request.url),
    );
    response.cookies.set(GOOGLE_OAUTH_STATE_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/callback/google",
      maxAge: 0,
    });
    return response;
  };

  if (error || !code) {
    return fail("google_denied", error ?? "no code in callback");
  }

  const secret = process.env.GOOGLE_OAUTH_STATE_SECRET;
  if (!secret) {
    return fail("missing_state_secret");
  }
  const verifiedState = await verifyGoogleOAuthState(secret, stateParam);
  const stateCookie = request.cookies.get(GOOGLE_OAUTH_STATE_COOKIE)?.value;
  if (!verifiedState || stateParam !== stateCookie) {
    return fail("invalid_state");
  }
  const safeNext = verifiedState.next;

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? `${new URL(request.url).origin}/api/auth/callback/google`;

  if (!clientId || !clientSecret) {
    // The single most common deployment mistake: the secret is only visible
    // in the Vercel dashboard, so this log line is the only place that says
    // which one is actually missing.
    return fail(
      "missing_config",
      `client_id=${clientId ? "set" : "missing"} client_secret=${clientSecret ? "set" : "missing"}`,
    );
  }

  // Exchange the code for tokens.
  let tokenRes: Response;
  try {
    tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }).toString(),
    });
  } catch (err) {
    return fail("exchange_unreachable", err instanceof Error ? err.message : String(err));
  }

  if (!tokenRes.ok) {
    // Google puts the actual reason here (redirect_uri_mismatch, invalid_client,
    // code already used, ...). It is the entire diagnosis; never drop it.
    const body = await tokenRes.text().catch(() => "");
    return fail("exchange_failed", `http ${tokenRes.status} ${body.slice(0, 300)}`);
  }

  const tokens = (await tokenRes.json()) as { id_token?: string };
  const idToken = tokens.id_token;
  if (!idToken) {
    return fail("no_id_token");
  }

  // Ask the backend to create/link the account and issue our session tokens.
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.durza.in/api/v1";
  let backendRes: Response;
  try {
    backendRes = await fetch(`${apiUrl}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });
  } catch (err) {
    return fail("backend_unreachable", err instanceof Error ? err.message : String(err));
  }

  if (!backendRes.ok) {
    const body = await backendRes.text().catch(() => "");
    return fail("backend_rejected", `http ${backendRes.status} ${body.slice(0, 300)}`);
  }

  const session = (await backendRes.json()) as { access_token?: string; refresh_token?: string };
  if (!session.access_token || !session.refresh_token) {
    return fail("empty_session");
  }

  await setSessionCookies(session.access_token, session.refresh_token);
  const response = NextResponse.redirect(new URL(safeNext, request.url));
  response.cookies.set(GOOGLE_OAUTH_STATE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/callback/google",
    maxAge: 0,
  });
  return response;
}
