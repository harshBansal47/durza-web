import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { ApiError, api } from "@/lib/api";
import { clearSessionCookies, getAccessToken, setSessionCookies } from "@/lib/session";

export const dynamic = "force-dynamic";

async function refreshAccessToken(): Promise<string> {
  const refreshToken = (await cookies()).get("durza_refresh")?.value;
  if (!refreshToken) throw new ApiError("Sign in to view analytics.", 401);
  const tokens = await api.refresh(refreshToken);
  await setSessionCookies(tokens.access_token, tokens.refresh_token);
  return tokens.access_token;
}

export async function GET(request: NextRequest) {
  let token = await getAccessToken();
  if (!token) {
    try {
      token = await refreshAccessToken();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await clearSessionCookies();
        return NextResponse.json({ detail: "Your session has expired. Sign in again." }, { status: 401 });
      }
      return NextResponse.json({ detail: "Could not refresh the sign-in session." }, { status: 502 });
    }
  }

  const query = new URLSearchParams();
  for (const key of ["start_date", "end_date"]) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) query.set(key, value);
  }

  const apiBase =
    process.env.API_INTERNAL_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000/api/v1";
  const endpoint =
    request.nextUrl.searchParams.get("format") === "csv" ? "overview.csv" : "overview";
  const fetchOverview = (accessToken: string) =>
    fetch(`${apiBase}/admin/analytics/${endpoint}?${query.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
  let response = await fetchOverview(token);
  if (response.status === 401) {
    try {
      token = await refreshAccessToken();
      response = await fetchOverview(token);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await clearSessionCookies();
        return NextResponse.json(
          { detail: "Your session has expired. Sign in again." },
          { status: 401 },
        );
      }
      return NextResponse.json(
        { detail: "Could not refresh the sign-in session." },
        { status: 502 },
      );
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
