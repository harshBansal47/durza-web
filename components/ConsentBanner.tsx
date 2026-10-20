"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsent, setConsent, onConsentChange, type ConsentState } from "@/lib/consent";

const SERVER_SNAPSHOT = "server" as const;

export default function ConsentBanner() {
  const stored = useSyncExternalStore<ConsentState | typeof SERVER_SNAPSHOT>(
    (onChange) => onConsentChange(onChange),
    () => getConsent(),
    () => SERVER_SNAPSHOT,
  );

  if (stored === SERVER_SNAPSHOT || stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and data consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-[20px] border border-ledger-line bg-paper-raised px-5 py-4 shadow-[var(--shadow-raised)] sm:flex-row sm:items-center"
    >
      <p className="flex-1 text-sm text-ink-soft">
        Durza uses a pseudonymous visitor ID for attribution. Optional analytics events use
        that ID and a hashed IP and are sent only if you accept. Editorial pages show
        non-personalized Google AdSense ads regardless of this choice. You can review or
        withdraw this analytics choice in the{" "}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setConsent("accepted")}
          className="btn-primary rounded-full px-4 py-2 text-sm"
        >
          Accept analytics
        </button>
      </div>
    </div>
  );
}
