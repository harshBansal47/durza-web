"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * DPDP-compliant consent notice. India requires a clear, standalone,
 * plain-language notice that says what is collected and why, with a way to
 * withdraw. We keep the choice in localStorage and render it to whoever asks
 * (the banner only appears until a choice is made).
 *
 * State lives here in React — no props, no context — because the banner is a
 * leaf widget with one job.
 */
const STORAGE_KEY = "bachatbase_consent_v1";
const CHANGE_EVENT = "bachatbase:consent-changed";

type ConsentChoice = "accepted" | "declined";

const SERVER_SNAPSHOT = "unset";

export default function ConsentBanner() {
  // useSyncExternalStore keeps this external store (localStorage) hydration-
  // safe: server and hydration pass see the same "unset" snapshot, so the
  // server-rendered HTML never flashes the banner at returning visitors.
  const stored = useSyncExternalStore(
    (onChange) => {
      window.addEventListener(CHANGE_EVENT, onChange);
      return () => window.removeEventListener(CHANGE_EVENT, onChange);
    },
    () => window.localStorage.getItem(STORAGE_KEY) ?? "none",
    () => SERVER_SNAPSHOT,
  );
  const choice: ConsentChoice | null =
    stored === "accepted" || stored === "declined" ? stored : null;

  function save(next: ConsentChoice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: choice applies to this visit only */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  // Nothing to say until the client store has been read ("unset"), and
  // nothing to say once a choice exists.
  if (stored === SERVER_SNAPSHOT || choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and data consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-dashed border-ink-soft/40 bg-paper px-5 py-4 shadow-[var(--shadow-raised)] sm:flex-row sm:items-center"
    >
      <p className="flex-1 text-sm text-ink-soft">
        BachatBase uses a visitor cookie and privacy-safe analytics (hashed IP, no personal
        identifiers) to measure which codes work and which pages need improvement. We never
        sell personal data. You can accept, decline, or{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          change this later in the privacy policy
        </Link>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => save("declined")}
          className="rounded-full border border-ink-soft/30 px-4 py-2 text-sm font-semibold text-ink hover:bg-ink/5"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => save("accepted")}
          className="btn-primary rounded-full px-4 py-2 text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
