import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiError, api } from "@/lib/api";
import { clearSessionCookies, getAccessToken, setSessionCookies } from "@/lib/session";

/**
 * Forwards an admin request to the API with the signed-in user's bearer token.
 *
 * The same session handling as the analytics route: use the access cookie, fall
 * back to the refresh cookie when it is missing, and retry once on a 401. The
 * browser never sees the token, so the admin pages call these same-origin
 * routes instead of the API directly.
 */

const SESSION_EXPIRED = "Your session has expired. Sign in again.";

async function refreshAccessToken(): Promise<string> {
  const refreshToken = (await cookies()).get("durza_refresh")?.value;
  if (!refreshToken) throw new ApiError("Sign in to use the admin dashboard.", 401);
  const tokens = await api.refresh(refreshToken);
  await setSessionCookies(tokens.access_token, tokens.refresh_token);
  return tokens.access_token;
}

async function sessionFailure(error: unknown): Promise<NextResponse> {
  if (error instanceof ApiError && error.status === 401) {
    await clearSessionCookies();
    return NextResponse.json({ detail: SESSION_EXPIRED }, { status: 401 });
  }
  return NextResponse.json({ detail: "Could not refresh the sign-in session." }, { status: 502 });
}

interface ForwardInit {
  method?: "GET" | "POST";
  query?: URLSearchParams;
  /** A JSON string. Sent as application/json. */
  body?: string;
}

export async function forwardToAdminApi(path: string, init: ForwardInit = {}): Promise<Response> {
  let token = await getAccessToken();
  if (!token) {
    try {
      token = await refreshAccessToken();
    } catch (error) {
      return sessionFailure(error);
    }
  }

  const apiBase =
    process.env.API_INTERNAL_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000/api/v1";
  const query = init.query?.toString();
  const url = `${apiBase}${path}${query ? `?${query}` : ""}`;

  const send = (accessToken: string) =>
    fetch(url, {
      method: init.method ?? "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(init.body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      body: init.body,
      cache: "no-store",
    });

  let response = await send(token);
  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      response = await send(token);
    } catch (error) {
      return sessionFailure(error);
    }
  }

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}
