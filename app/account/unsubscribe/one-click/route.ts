import { NextResponse } from "next/server";
import { api, ApiError } from "@/lib/api";

/**
 * RFC 8058 one-click unsubscribe.
 *
 * Alert emails carry `List-Unsubscribe: <this URL>` and
 * `List-Unsubscribe-Post: List-Unsubscribe=One-Click`. When someone presses the
 * mailbox provider's own "Unsubscribe" button (Gmail, Apple Mail, Yahoo), the
 * provider POSTs here from its servers: no browser, no session, no page. All
 * it needs back is a 2xx. Gmail and Yahoo expect this from bulk senders.
 *
 * The token is in the query string because that is where the header puts it;
 * the POST body (`List-Unsubscribe=One-Click`) is ignored.
 */
export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return new NextResponse("Missing token", { status: 400 });

  try {
    await api.unsubscribeByToken(token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      return new NextResponse("Invalid unsubscribe link", { status: 400 });
    }
    // Anything else is ours (API down): 5xx tells the provider to retry a
    // valid request rather than give up on it.
    return new NextResponse("Please try again", { status: 503 });
  }
  return new NextResponse("Unsubscribed", { status: 200 });
}

/**
 * A person who opens the one-click URL in a browser gets the confirmation page,
 * not an error, and, deliberately, no unsubscribe from a bare GET.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const target = new URL("/account/unsubscribe", request.url);
  if (token) target.searchParams.set("token", token);
  return NextResponse.redirect(target);
}
