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

const STORAGE_KEY = "bachatbase_consent_v1";
const CHANGE_EVENT = "bachatbase:consent-changed";

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
  window.dispatchEvent(new Event(CHANGE_EVENT));
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
