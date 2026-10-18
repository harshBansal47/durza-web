"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "durza.banner.price-alert.dismissed";
const DISMISS_EVENT = "durza:banner-dismissed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DISMISS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DISMISS_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

/**
 * Price-alert CTA that used to sit inside the footer and could not be closed.
 * It now lives above the footer, is dismissible, and remembers the choice on
 * this device (localStorage only — nothing is sent to the server).
 */
export default function PriceAlertBanner({ signedIn = false }: { signedIn?: boolean }) {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage blocked (private mode) — the event below still hides it now.
    }
    window.dispatchEvent(new CustomEvent(DISMISS_EVENT));
  }

  if (dismissed || signedIn) return null;

  return (
    <div className="mt-16 no-print">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-paper-alt relative overflow-hidden rounded-[20px] border border-ledger-line px-6 py-10 shadow-[var(--shadow-hairline)] sm:px-12">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent-soft/30"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent-soft/15"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss this banner"
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <p className="font-sans text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Stop checking back. Let the price come to you.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Follow a product and we email you when its price drops or its
                store gets a new tracked offer. Free, no spam.
              </p>
            </div>
            <Link
              href="/account/register"
              className="btn btn-primary shrink-0 px-6 py-3 text-base"
            >
              Create a free account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
