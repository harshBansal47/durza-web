"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ensureConsentCookie,
  getConsent,
  setConsent,
  onConsentChange,
  type ConsentState,
} from "@/lib/consent";

const SERVER_SNAPSHOT = "server" as const;

export default function ConsentBanner() {
  const stored = useSyncExternalStore<ConsentState | typeof SERVER_SNAPSHOT>(
    (onChange) => onConsentChange(onChange),
    () => getConsent(),
    () => SERVER_SNAPSHOT,
  );

  // A visitor who accepted before — in an earlier visit, in another browser,
  // or before the consent cookie existed — has the choice in localStorage and
  // no cookie, and the server stores nothing for them. The banner is hidden
  // once a choice exists, so nobody would ever ask again. This asks for the
  // cookie to be re-issued, without the visitor clicking anything.
  useEffect(() => {
    ensureConsentCookie();
  }, []);

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
        <Link href="/privacy" className="text-durza-deep underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setConsent("declined")}
          className="rounded-full border border-ledger-line px-4 py-2 text-sm text-ink-soft"
        >
          Decline
        </button>
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
