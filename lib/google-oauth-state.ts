import "server-only";

const STATE_TTL_MS = 10 * 60 * 1000;

export const GOOGLE_OAUTH_STATE_COOKIE = "google_oauth_state";

export interface GoogleOAuthState {
  nonce: string;
  next: string;
  issuedAt: number;
}

function isSafeNext(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array | null {
  try {
    const padding = "=".repeat((4 - (value.length % 4)) % 4);
    const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/") + padding);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a[i] ^ b[i];
  return result === 0;
}

async function hmacSha256(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(signature);
}

export async function createGoogleOAuthState(
  secret: string,
  payload: GoogleOAuthState,
): Promise<string> {
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = bytesToBase64Url(await hmacSha256(secret, body));
  return `${body}.${signature}`;
}

export async function verifyGoogleOAuthState(
  secret: string,
  token: string | null,
): Promise<GoogleOAuthState | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;
  const expected = bytesToBase64Url(await hmacSha256(secret, body));
  const signatureBytes = base64UrlToBytes(signature);
  const expectedBytes = base64UrlToBytes(expected);
  if (!signatureBytes || !expectedBytes || !timingSafeEqual(signatureBytes, expectedBytes)) {
    return null;
  }

  const bodyBytes = base64UrlToBytes(body);
  if (!bodyBytes) return null;

  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder().decode(bodyBytes));
  } catch {
    return null;
  }
  if (!payload || typeof payload !== "object") return null;
  const candidate = payload as Partial<GoogleOAuthState>;
  if (typeof candidate.nonce !== "string" || !isSafeNext(candidate.next)) return null;
  if (typeof candidate.issuedAt !== "number" || !Number.isFinite(candidate.issuedAt)) return null;
  if (Date.now() - candidate.issuedAt > STATE_TTL_MS) return null;

  return {
    nonce: candidate.nonce,
    next: candidate.next,
    issuedAt: candidate.issuedAt,
  };
}
