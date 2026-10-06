"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

const KEY = "BachatBase.saved_coupons";

function read(): string[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Anonymous save: localStorage today, account sync later. No login wall. */
export function CardSaveButton({ couponId }: { couponId: string }) {
  const [saved, setSaved] = useState<boolean>(() =>
    typeof window === "undefined" ? false : read().includes(couponId),
  );

  function toggle() {
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

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved deals" : "Save this deal"}
      title={saved ? "Saved" : "Save for later"}
      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
        saved ? "border-rust bg-rust text-white" : "border-ledger-line bg-white text-ink-soft hover:border-rust hover:text-rust"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
