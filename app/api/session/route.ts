import { NextResponse } from "next/server";
import { displayName, getSessionUser } from "@/lib/session";

/**
 * The signed-in visitor, for the client-side session chip.
 *
 * The shell can only be static (and therefore CDN-cacheable) if no Server
 * Component reads the session cookie, so this route is where the cookie is
 * read on the client's behalf. Callers that only need a yes/no answer read
 * `signedIn`; the header chip also reads `user`.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json(
    {
      signedIn: Boolean(user),
      user: user ? { name: displayName(user), avatarUrl: user.avatar_url ?? null } : null,
    },
    // Per-visitor data behind a shared cache is how one account's name leaks to
    // another. Nothing downstream may store this.
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
