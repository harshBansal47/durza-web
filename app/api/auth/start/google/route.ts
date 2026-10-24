import { NextResponse } from "next/server";
import { createGoogleOAuthState, GOOGLE_OAUTH_STATE_COOKIE } from "@/lib/google-oauth-state";

const STATE_TTL_SECONDS = 10 * 60;

function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeNext(url.searchParams.get("next"));
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ?? `${url.origin}/api/auth/callback/google`;
  const secret = process.env.GOOGLE_OAUTH_STATE_SECRET;

  if (!clientId || !secret) {
    const reason = !clientId ? "missing_config" : "missing_state_secret";
    return NextResponse.redirect(
      new URL(`/account/login?error=google&reason=${encodeURIComponent(reason)}`, request.url),
    );
  }

  const state = await createGoogleOAuthState(secret, {
    nonce: crypto.randomUUID(),
    next,
    issuedAt: Date.now(),
  });

  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(googleUrl);
  response.cookies.set(GOOGLE_OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/callback/google",
    maxAge: STATE_TTL_SECONDS,
  });
  return response;
}
