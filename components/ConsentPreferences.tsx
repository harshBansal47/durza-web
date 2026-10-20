"use client";

import { useSyncExternalStore } from "react";
import {
  getConsent,
  onConsentChange,
  setConsent,
  type ConsentState,
} from "@/lib/consent";

const SERVER_SNAPSHOT: ConsentState = null;

export default function ConsentPreferences() {
  const consent = useSyncExternalStore(
    (onChange) => onConsentChange(onChange),
    getConsent,
    () => SERVER_SNAPSHOT,
  );

  const status =
    consent === "accepted"
      ? "Analytics are enabled."
      : consent === "declined"
        ? "Analytics are disabled."
        : "You have not chosen whether to enable analytics.";

  return (
    <section
      aria-labelledby="consent-preferences-heading"
      className="section-panel mt-8 p-5 sm:p-6"
    >
      <h2
        id="consent-preferences-heading"
        className="font-serif text-xl font-bold text-ink"
      >
        Analytics preferences
      </h2>
      <p className="mt-2 text-sm text-ink-soft" role="status">
        {status} Optional analytics events are sent only when enabled. AdSense ads are
        non-personalized and are shown regardless of this choice. Session, attribution, and deal
        functionality may still process first-party data as described above.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={consent === "accepted"}
          onClick={() => setConsent("accepted")}
          className="btn-primary"
        >
          Allow analytics
        </button>
        <button
          type="button"
          aria-pressed={consent === "declined"}
          onClick={() => setConsent("declined")}
          className="btn-outline"
        >
          Disable analytics
        </button>
      </div>
    </section>
  );
}
