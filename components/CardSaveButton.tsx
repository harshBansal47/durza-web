"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const KEY = "durza.saved_coupons";

let sessionPromise: Promise<boolean> | null = null;
function signedIn(): Promise<boolean> {
  if (!sessionPromise) {
    sessionPromise = fetch("/api/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => Boolean(d?.signedIn))
      .catch(() => false);
  }
  return sessionPromise;
}

function read(): string[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Save requires a signed-in account: anonymous saves can't sync to a profile. */
export function CardSaveButton({ couponId }: { couponId: string }) {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [saved, setSaved] = useState<boolean>(() =>
    typeof window === "undefined" ? false : read().includes(couponId),
  );

  useEffect(() => {
    let cancelled = false;
    signedIn().then((v) => {
      if (!cancelled) setIsSignedIn(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function toggle() {
    if (isSignedIn === false) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.assign(`/account/login?next=${next}`);
      return;
    }
    const next = !saved;
    setSaved(next);
    try {
      const list = read().filter((id) => id !== couponId);
      if (next) list.unshift(couponId);
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, 200)));
    } catch {
      /* private mode — best effort */
    }
    track(next ? "save_coupon" : "unsave_coupon", { coupon_id: couponId });
  }

  // While auth state is unknown, render the button inert to avoid a flash.
  const disabled = isSignedIn === null;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved deals" : "Save this deal"}
      title={isSignedIn === false ? "Sign in to save" : saved ? "Saved" : "Save for later"}
      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
        disabled
          ? "border-ledger-line bg-white text-ink-soft opacity-50"
          : saved
            ? "border-rust bg-rust text-white"
            : "border-ledger-line bg-white text-ink-soft hover:border-rust hover:text-rust"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

