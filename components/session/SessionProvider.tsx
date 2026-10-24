"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export interface SessionUser {
  name: string;
  /** Google account photo URL; falls back to initials when absent. */
  avatarUrl?: string | null;
}

export type SessionState =
  | { status: "loading"; user: null }
  | { status: "anonymous"; user: null }
  | { status: "authenticated"; user: SessionUser };

const LOADING: SessionState = { status: "loading", user: null };
const ANONYMOUS: SessionState = { status: "anonymous", user: null };

/**
 * Routes the visitor may leave the moment a session is created or replaced.
 *
 * A sign-in redirect is a client-side navigation: the provider mounted on the
 * login page would otherwise hold its pre-login answer for the rest of the
 * visit. Leaving one of these routes is the cue to ask again.
 */
const AUTH_ROUTES = ["/account/login", "/account/register"];

interface SessionContextValue {
  session: SessionState;
  /** Optimistic switch used the moment a sign-out is submitted. */
  markSignedOut: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

/** Stable fallback so a consumer rendered outside the provider still renders. */
const NO_SESSION: SessionContextValue = { session: ANONYMOUS, markSignedOut: () => {} };

/**
 * The signed-in visitor, resolved on the client.
 *
 * The access token lives in an httpOnly cookie, and reading it from a Server
 * Component (the root layout used to) opts every route in the app into dynamic
 * rendering — no ISR, no CDN, a full API round-trip per navigation. So the
 * shell renders signed-out and this provider fills in the real answer after
 * hydration; `/api/session` is the only thing that reads the cookie.
 */
export function SessionProvider({
  children,
  initial,
}: {
  children: ReactNode;
  /** Test seam: pins the state and skips the fetch. */
  initial?: SessionState;
}) {
  const [session, setSession] = useState<SessionState>(initial ?? LOADING);
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  const apply = useCallback((data: { signedIn?: boolean; user?: SessionUser | null } | null) => {
    setSession(
      data?.signedIn && data.user ? { status: "authenticated", user: data.user } : ANONYMOUS,
    );
  }, []);

  /**
   * Ask the server who this is. `setSession` only ever runs from the promise
   * callbacks below, never in the synchronous body of an effect.
   */
  const refresh = useCallback(() => {
    const controller = new AbortController();
    fetch("/api/session", { cache: "no-store", signal: controller.signal })
      .then((response) =>
        response.ok
          ? (response.json() as Promise<{ signedIn?: boolean; user?: SessionUser | null }>)
          : null,
      )
      .then((data) => {
        if (!controller.signal.aborted) apply(data);
      })
      .catch(() => {
        // Unreachable session endpoint reads as "not signed in" in the UI. The
        // pages that need an authoritative answer ask the server, not this.
        if (!controller.signal.aborted) apply(null);
      });
    return () => controller.abort();
  }, [apply]);

  useEffect(() => {
    if (initial) return;
    return refresh();
  }, [initial, refresh]);

  useEffect(() => {
    const from = previousPath.current;
    previousPath.current = pathname;
    if (initial || from === pathname) return;
    // A sign-in redirect is a soft navigation, so the provider mounted on the
    // login page would otherwise hold its pre-login answer for the whole
    // visit. Leaving an auth route is the cue to ask again.
    if (AUTH_ROUTES.some((route) => from.startsWith(route))) void refresh();
  }, [pathname, initial, refresh]);

  const value = useMemo(
    () => ({ session, markSignedOut: () => setSession(ANONYMOUS) }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  return useContext(SessionContext) ?? NO_SESSION;
}
