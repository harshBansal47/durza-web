"use client";

/**
 * Consent state — the single source of truth for whether analytics tracking
 * is permitted. Every tracking call (track, impressions, pageviews) must
 * check this before sending anything to the backend.
 *
 * Three states:
 * - "accepted" → analytics allowed
 * - "declined" → analytics blocked
 * - null (no choice yet) → analytics blocked (opt-in, not opt-out)
 *
 * State is persisted in localStorage so it survives page reloads and is
 * shared across all components via a custom event.
 */

export type ConsentState = "accepted" | "declined" | null;

const STORAGE_KEY = "durza_consent_v1";
const PERSONALIZATION_KEY = "durza_personalization_v1";
const CHANGE_EVENT = "durza:consent-changed";
const PERSONALIZATION_EVENT = "durza:personalization-changed";
/**
 * Remembers that the server has issued the consent cookie in this browser
 * session, so the storefront asks once per session rather than once per page.
 */
const CONSENT_SYNC_KEY = "durza_consent_synced_v1";
/**
 * Marks a request that is on its way, so two calls in the same tick do not
 * ask twice. It is cleared when the request fails, so the next load retries.
 */
const CONSENT_PENDING_KEY = "durza_consent_pending_v1";

/** Read the current consent state from localStorage. */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
  } catch {
    // localStorage unavailable (private mode) — treat as no choice
  }
  return null;
}

/**
 * Tell the API what the visitor chose.
 *
 * The API answers with a signed, HttpOnly consent cookie, and it only records
 * an analytics event when it can verify that cookie — the flag in localStorage
 * is not evidence of anything, because anything can post to the endpoint. On
 * decline the API deletes the cookie and the visitor/session cookies with it.
 *
 * Taste signals stay in localStorage and are never transmitted.
 */
async function postConsent(choice: "accepted" | "declined"): Promise<boolean> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
  try {
    const response = await fetch(`${base}/analytics/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice }),
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
}

function flag(key: string, value: string | null): void {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, value);
  } catch {
    /* private mode: nothing is remembered, which only costs one extra call */
  }
}

function flagged(key: string): boolean {
  try {
    return window.sessionStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

/** Persist a consent choice and notify all listeners. */
export function setConsent(state: "accepted" | "declined"): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // private mode: choice applies to this visit only
  }
  void postConsent(state).then((ok) => {
    if (ok && state === "accepted") flag(CONSENT_SYNC_KEY, "1");
  });
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Make sure the server holds the consent cookie, for a visitor who already
 * accepted.
 *
 * The cookie is HttpOnly, so JavaScript cannot see whether it is there — the
 * only way to find out is to ask the server. Three kinds of visitor end up
 * with the choice in localStorage and no cookie:
 *
 * * everyone who accepted **before** the cookie existed;
 * * everyone whose cookie expired (it lasts a year) or was cleared;
 * * anyone who switched browsers or devices.
 *
 * The banner only appears while there is no choice, so those visitors would
 * never be asked again — and the server would silently store nothing for them.
 * So on load, a visitor who accepted gets the cookie re-issued without
 * clicking anything.
 *
 * It is asked for once per browser session: the cookie lasts a year, and a
 * successful call is remembered in sessionStorage. A failed call is not
 * remembered, so the next page load tries again.
 */
export function ensureConsentCookie(): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if (flagged(CONSENT_SYNC_KEY)) return; // the cookie is already in place
  if (flagged(CONSENT_PENDING_KEY)) return; // a request is already on its way
  flag(CONSENT_PENDING_KEY, "1");
  void postConsent("accepted").then((ok) => {
    flag(CONSENT_PENDING_KEY, null);
    if (ok) flag(CONSENT_SYNC_KEY, "1");
  });
}

export type PersonalizationState = "accepted" | "declined" | null;

const PERSONALIZATION_KEYS = [
  "durza.taste_v2",
  "durza.recent_stores",
  "durza.recent_coupons",
  "durza.clicked_coupons",
  "durza.saved_coupons",
  "durza.followed_stores",
  "durza.recent",
];

function personalizationApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
}

/** Remove all local taste signals without changing the consent choice. */
export function clearPersonalizationSignals(): void {
  for (const key of PERSONALIZATION_KEYS) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* private mode */
    }
  }
}

export function getPersonalizationConsent(): PersonalizationState {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(PERSONALIZATION_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
  } catch {}
  return null;
}

export function setPersonalizationConsent(state: "accepted" | "declined"): void {
  try {
    window.localStorage.setItem(PERSONALIZATION_KEY, state);
  } catch {}
  if (state === "declined") clearPersonalizationSignals();
  window.dispatchEvent(new Event(PERSONALIZATION_EVENT));
}

/** Withdrawal: clear local signals, persist the decline, delete synced rows. */
export async function withdrawPersonalization(): Promise<void> {
  setPersonalizationConsent("declined");
  try {
    await fetch(`${personalizationApiBase()}/personalization/interests`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch {
    /* the local choice is already off; server cleanup is best effort */
  }
}

/** Reset: clear local and synced interests but keep the current consent choice. */
export async function resetPersonalization(): Promise<void> {
  clearPersonalizationSignals();
  window.dispatchEvent(new Event(PERSONALIZATION_EVENT));
  try {
    await fetch(`${personalizationApiBase()}/personalization/interests`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch {
    /* best effort */
  }
}

export function isPersonalizationAllowed(): boolean {
  return getPersonalizationConsent() === "accepted";
}

export function onPersonalizationChange(callback: (state: PersonalizationState) => void): () => void {
  const handler = () => callback(getPersonalizationConsent());
  window.addEventListener(PERSONALIZATION_EVENT, handler);
  return () => window.removeEventListener(PERSONALIZATION_EVENT, handler);
}

/** Whether analytics tracking is currently permitted. */
export function isAnalyticsAllowed(): boolean {
  return getConsent() === "accepted";
}

/**
 * Subscribe to consent changes. Returns an unsubscribe function.
 * Used by the consent banner and any component that needs to react.
 */
export function onConsentChange(callback: (state: ConsentState) => void): () => void {
  const handler = () => callback(getConsent());
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}
