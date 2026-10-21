"use client";

import { useSyncExternalStore } from "react";
import {
  getConsent,
  getPersonalizationConsent,
  onConsentChange,
  onPersonalizationChange,
  resetPersonalization,
  setConsent,
  setPersonalizationConsent,
  withdrawPersonalization,
  type ConsentState,
  type PersonalizationState,
} from "@/lib/consent";

const SERVER_SNAPSHOT: ConsentState = null;
const PERSONALIZATION_SNAPSHOT: PersonalizationState = null;

export default function ConsentPreferences() {
  const consent = useSyncExternalStore(
    (onChange) => onConsentChange(onChange),
    getConsent,
    () => SERVER_SNAPSHOT,
  );
  const personalization = useSyncExternalStore(
    (onChange) => onPersonalizationChange(onChange),
    getPersonalizationConsent,
    () => PERSONALIZATION_SNAPSHOT,
  );

  const status =
    consent === "accepted"
      ? "Analytics are enabled."
      : consent === "declined"
        ? "Analytics are disabled."
        : "You have not chosen whether to enable analytics.";
  const personalizationStatus =
    personalization === "accepted"
      ? "Personalization is on."
      : personalization === "declined"
        ? "Personalization is off and stored interests have been cleared."
        : "Personalization is off until you choose it.";

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

      <h3 className="mt-6 font-serif text-lg font-bold text-ink">Personalization</h3>
      <p className="mt-2 text-sm text-ink-soft" role="status">
        {personalizationStatus} This is separate from analytics. It only changes how eligible deals
        are ordered; it never hides deals or changes the public page for other visitors.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={personalization === "accepted"}
          onClick={() => setPersonalizationConsent("accepted")}
          className="btn-primary"
        >
          Personalize my experience
        </button>
        <button
          type="button"
          aria-pressed={personalization === "declined"}
          onClick={() => void withdrawPersonalization()}
          className="btn-outline"
        >
          Turn off personalization
        </button>
        <button
          type="button"
          onClick={() => void resetPersonalization()}
          className="btn-outline"
        >
          Reset my interests
        </button>
      </div>
    </section>
  );
}
