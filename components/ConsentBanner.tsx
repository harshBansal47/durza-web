"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsent, setConsent, onConsentChange, type ConsentState } from "@/lib/consent";

const SERVER_SNAPSHOT: ConsentState = null;

export default function ConsentBanner() {
  // useSyncExternalStore keeps this external store (localStorage) hydration-
  // safe: server and hydration pass see the same null snapshot, so the
  // server-rendered HTML never flashes the banner at returning visitors.
  const stored = useSyncExternalStore(
    (onChange) => onConsentChange(onChange),
    () => getConsent(),
    () => SERVER_SNAPSHOT,
  );

  // Nothing to say until the client store has been read, and nothing to say
  // once a choice exists.
  if (stored === SERVER_SNAPSHOT || stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and data consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-dashed border-ink-soft/40 bg-paper px-5 py-4 shadow-[var(--shadow-raised)] sm:flex-row sm:items-center"
    >
      <p className="flex-1 text-sm text-ink-soft">
        BachatBase uses a visitor cookie and privacy-safe analytics (hashed IP, no personal
        identifiers) to measure which codes work and which pages need improvement. If you
        decline, no analytics data is collected. You can change this anytime in the{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setConsent("declined")}
          className="rounded-full border border-ink-soft/30 px-4 py-2 text-sm font-semibold text-ink hover:bg-ink/5"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="btn-primary rounded-full px-4 py-2 text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
