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

/** Persist a consent choice and notify all listeners. */
export function setConsent(state: "accepted" | "declined"): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // private mode: choice applies to this visit only
  }
  // Tell the API what the visitor chose. The API answers with a signed,
  // HttpOnly consent cookie, and it only records an analytics event when it
  // can verify that cookie — the flag in localStorage is not evidence of
  // anything, because anything can post to the endpoint. On decline the API
  // deletes the cookie and the visitor/session cookies with it.
  //
  // Taste signals stay in localStorage and are never transmitted.
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
  void fetch(`${base}/analytics/consent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ choice: state }),
    credentials: "include",
  }).catch(() => {});
  window.dispatchEvent(new Event(CHANGE_EVENT));
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
