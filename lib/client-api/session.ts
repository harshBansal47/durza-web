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
        clientRequestConfig(signal, { cache: "no-store" }),
      )
      .then(({ data }) => data);
  },
};
