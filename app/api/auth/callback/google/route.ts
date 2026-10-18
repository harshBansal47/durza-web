import { NextResponse } from "next/server";
import { setSessionCookies } from "@/lib/session";

/**
 * Google OAuth callback. Google redirects here with `?code=...`. We exchange
 * the code for tokens (server-side, using the client secret), verify the ID
 * token, then call the backend to create/link the account and issue our own
 * session tokens.
 *
 * Backend contract (implement on api.durza.in):
 *   POST /auth/google  { id_token: string }
 *     -> { access_token, refresh_token }  (same shape as /auth/login)
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const next = url.searchParams.get("state") ?? "/account";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  if (error || !code) {
    return NextResponse.redirect(new URL(`/account/login?error=google`, request.url));
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? `${new URL(request.url).origin}/api/auth/callback/google`;

  // Exchange the code for tokens.
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId ?? "",
      client_secret: clientSecret ?? "",
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }).toString(),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL(`/account/login?error=google`, request.url));
  }

  const tokens = (await tokenRes.json()) as { id_token?: string };
  const idToken = tokens.id_token;
  if (!idToken) {
    return NextResponse.redirect(new URL(`/account/login?error=google`, request.url));
  }

  // Ask the backend to create/link the account and issue our session tokens.
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.durza.in/api/v1";
  const backendRes = await fetch(`${apiUrl}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });

  if (!backendRes.ok) {
    return NextResponse.redirect(new URL(`/account/login?error=google`, request.url));
  }

  const session = (await backendRes.json()) as { access_token?: string; refresh_token?: string };
  if (!session.access_token || !session.refresh_token) {
    return NextResponse.redirect(new URL(`/account/login?error=google`, request.url));
  }

  await setSessionCookies(session.access_token, session.refresh_token);
  return NextResponse.redirect(new URL(safeNext, request.url));
}
