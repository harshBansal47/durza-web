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
      ? "Analytics and ads are enabled."
      : consent === "declined"
        ? "Analytics and ads are disabled."
        : "You have not chosen whether to enable analytics and ads.";

  return (
    <section
      aria-labelledby="consent-preferences-heading"
      className="section-panel mt-8 p-5 sm:p-6"
    >
      <h2
        id="consent-preferences-heading"
        className="font-serif text-xl font-bold text-ink"
      >
        Analytics and ads preferences
      </h2>
      <p className="mt-2 text-sm text-ink-soft" role="status">
        {status} Optional analytics events and AdSense ads load only when enabled. Session,
        attribution, and deal functionality may still process first-party data as described above.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={consent === "accepted"}
          onClick={() => setConsent("accepted")}
          className="btn-primary"
        >
          Allow analytics and ads
        </button>
        <button
          type="button"
          aria-pressed={consent === "declined"}
          onClick={() => setConsent("declined")}
          className="btn-outline"
        >
          Disable analytics and ads
        </button>
      </div>
    </section>
  );
}
