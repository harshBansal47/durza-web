"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import OutboundLink from "./OutboundLink";
import { api } from "@/lib/api";
import { track } from "@/lib/analytics";
import { markRevealed } from "@/lib/deviceState";
import { rememberGo } from "@/lib/lastGo";
import { cardRequirementLine } from "@/lib/requirements";
import type { CouponPublic } from "@/lib/types";

export default function CouponCodePanel({
  coupon,
  storeName = "",
  storeSlug,
}: {
  coupon: CouponPublic;
  storeName?: string;
  /** Enables the "More deals from this store" link shown after a copy. */
  storeSlug?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const requirement = cardRequirementLine(coupon);

  async function reveal() {
    setRevealed(true);
    markRevealed(coupon.id);
    track("coupon_reveal", { coupon_id: coupon.id });
    // Reveal means "take me to the deal": open the store in a NEW tab through
    // the tracked /go link so the click is attributable, AND copy the code so
    // the shopper can paste it at checkout. The code stays visible for a
    // re-copy, and it only ever happens as the direct result of the shopper's
    // own click.
    rememberGo({
      couponId: coupon.id,
      title: coupon.title,
      storeName,
      hadCode: true,
    });
    let copyPromise: Promise<void> | null = null;
    try {
      if (coupon.code && navigator.clipboard?.writeText) {
        copyPromise = navigator.clipboard.writeText(coupon.code);
      }
    } catch {
      /* clipboard unavailable — the code remains visible on the page */
    }
    window.open(api.goUrl(coupon.id, "reveal"), "_blank", "noopener");
    if (copyPromise) {
      try {
        await copyPromise;
        track("copy_code", { coupon_id: coupon.id, via: "reveal" });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* clipboard unavailable — the code is visible on the page */
      }
    }
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
      <div className="relative bg-brand px-5 py-2 text-xs font-semibold text-white">
        <span className="relative">{coupon.code ? "Your code" : "No code needed"}</span>
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
                <span aria-hidden className="select-none">
                  {coupon.code.slice(0, Math.min(3, coupon.code.length))}••••
                </span>
                <span className="sr-only">Code hidden until revealed</span>
              </>
            )
          ) : (
            <span className="text-sm font-medium tracking-normal text-ink-soft">
              {requirement ?? "The offer applies at checkout"}
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
                  <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
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
          <Check aria-hidden="true" className="inline h-3.5 w-3.5 align-[-2px]" strokeWidth={2.5} />
          {" "}Copied — paste it at {storeName || "the store"} checkout.
        </p>
      )}
      {copied && storeSlug && (
        <p className="px-5 pt-1 text-center text-sm">
          <Link href={`/stores/${storeSlug}`} className="font-semibold text-inkblue hover:underline">
            More {storeName || "store"} deals
            <ArrowRight aria-hidden="true" className="inline h-3.5 w-3.5 align-[-2px]" strokeWidth={2} />
          </Link>
        </p>
      )}

      <div className="px-5 pb-5 pt-1">
        <OutboundLink
          coupon={coupon}
          storeName={storeName}
          src="coupon-page"
          className="btn btn-cta w-full py-3 text-base"
        >
          {revealed ? (
            <>
              Take me to {storeName || "the store"}
            </>
          ) : (
            "Get this deal at the store"
          )}
        </OutboundLink>
        <p className="mt-2 text-center text-xs text-ink-soft">
          {coupon.code
            ? revealed
              ? `${storeName || "The store"} opened in a new tab. Copy your code here, paste it at checkout, then tell us if it worked.`
              : `Revealing the code opens ${storeName || "the store"} in a new tab. We may earn a commission if you buy.`
            : `Opens ${storeName || "the store"} in a new tab. Come back and tell us if it worked.`}
        </p>
        {requirement && coupon.code && (
          <p className="mt-1 text-center text-xs text-ink-soft">{requirement}</p>
        )}
      </div>
    </div>
  );
}
