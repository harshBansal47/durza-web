import { clientAppUrl, clientHttp, clientRequestConfig } from "@/lib/client-http";

export interface SessionSnapshot {
  signedIn?: boolean;
  user?: { name: string; avatarUrl?: string | null; maskedEmail?: string | null } | null;
}

/** Reads the public session snapshot; the HttpOnly token never leaves the server. */
export const sessionApi = {
  get(signal?: AbortSignal): Promise<SessionSnapshot> {
    return clientHttp
      .get<SessionSnapshot>(
        clientAppUrl("/api/session"),
        // The session route reads the HttpOnly auth cookies server-side.
        // clientHttp omits credentials by default, so this same-origin call
        // must opt in or the navbar will always appear signed out.
        clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
      )
      .then(({ data }) => data);
  },
};
