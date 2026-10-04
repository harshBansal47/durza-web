"use client";

import { useState } from "react";
import OutboundLink from "./OutboundLink";
import { track } from "@/lib/analytics";
import type { CouponPublic } from "@/lib/types";

export default function CouponCodePanel({
  coupon,
  storeName = "",
}: {
  coupon: CouponPublic;
  storeName?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  function reveal() {
    setRevealed(true);
    track("coupon_reveal", { coupon_id: coupon.id });
  }

  async function handleCopy() {
    if (!coupon.code) return;
    try {
      await navigator.clipboard.writeText(coupon.code);
    } catch {
      /* clipboard unavailable — code stays visible, still usable */
    }
    setCopied(true);
    track("copy_code", { coupon_id: coupon.id });
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-ledger-line bg-white shadow-[var(--shadow-raised)]">
      <div className="relative bg-[#1b1836] px-5 py-2 text-xs font-semibold text-white">
        <span className="relative">{coupon.code ? "Your code" : "Auto-applied deal"}</span>
      </div>

      <div className="relative flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div
          className={`min-w-0 flex-1 rounded-xl border-2 border-dashed px-4 py-3 text-center font-mono text-xl font-semibold tracking-widest transition-colors ${
            revealed ? "border-ink/40 bg-paper text-ink" : "border-ledger-line bg-paper text-ink"
          }`}
          role="status"
          aria-live="polite"
        >
          {coupon.code ? (
            revealed ? (
              <span key="code" className="animate-pop inline-block break-all">
                {coupon.code}
              </span>
            ) : (
              <>
                <span aria-hidden className="select-none blur-sm">
                  {"• • • • • •"}
                </span>
                <span className="sr-only">Code hidden until revealed</span>
              </>
            )
          ) : (
            <span className="text-sm font-medium tracking-normal text-ink-soft">
              No code needed — discount applies at checkout
            </span>
          )}
        </div>

        {coupon.code && (
          <button
            type="button"
            onClick={() => (revealed ? handleCopy() : reveal())}
            className={`btn min-w-[7.5rem] shrink-0 ${copied ? "btn-verified" : revealed ? "btn-cta" : "btn-primary"}`}
          >
            {revealed ? (
              copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied
                </>
              ) : (
                "Copy code"
              )
            ) : (
              "Reveal code"
            )}
          </button>
        )}
      </div>

      {copied && (
        <p className="animate-fade-in px-5 text-center text-sm font-medium text-verified" role="status">
          ✓ Copied — paste it at {storeName || "the store"} checkout.
        </p>
      )}

      <div className="px-5 pb-5 pt-1">
        <OutboundLink
          coupon={coupon}
          storeName={storeName}
          src="coupon-page"
          className="btn btn-cta w-full py-3 text-base"
        >
          {revealed ? `Take me to ${storeName || "the store"} →` : "Get this deal at the store"}
        </OutboundLink>
        <p className="mt-2 text-center text-xs text-ink-soft">
          {coupon.code
            ? "Copy the code first — it auto-fills on most stores. Come back and tell us if it worked."
            : "Opens the store with the discount applied. Come back and tell us if it worked."}
        </p>
      </div>
    </div>
  );
}
