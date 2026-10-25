"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import OutboundLink from "./OutboundLink";
import CodeRevealButton from "./CodeRevealButton";
import { copy } from "@/lib/copy";
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

  function handleReveal() {
    markRevealed(coupon.id);
    track("coupon_reveal", { coupon_id: coupon.id });
    rememberGo({
      couponId: coupon.id,
      title: coupon.title,
      storeName,
      hadCode: true,
    });
  }

  function handleStateChange(state: { revealed: boolean; copied: boolean }) {
    setRevealed(state.revealed);
    setCopied(state.copied);
  }

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-ledger-line bg-white shadow-[var(--shadow-raised)]">
      <div className="relative bg-brand px-5 py-2 text-xs font-semibold text-white">
        <span className="relative">{coupon.code ? "Your code" : "No code needed"}</span>
      </div>

      {/* A code to show, or a real requirement to state. Without either, a box that only says
          "applies at checkout" repeats the bar above and the text below. */}
      {(coupon.code || requirement) && (
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
                {requirement}
              </span>
            )}
          </div>

          {coupon.code && (
            <CodeRevealButton
              code={coupon.code}
              url={api.goUrl(coupon.id, "reveal")}
              label={copy.actions.copyCodeAndOpen}
              successMessage="✅ Code copied! You're ready to save."
              showCode={false}
              className="min-w-[7.5rem] shrink-0"
              onReveal={handleReveal}
              onStateChange={handleStateChange}
            />
          )}
        </div>
      )}

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

      <div className={`px-5 pb-5 ${coupon.code || requirement ? "pt-1" : "pt-5"}`}>
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
        <p className="mt-2 text-center text-[13px] text-ink-soft">
          {coupon.code
            ? revealed
              ? `${storeName || "The store"} opened in a new tab. Paste your code at checkout, then tell us if it worked.`
              : `Copying the code opens ${storeName || "the store"} in a new tab. We may earn a commission if you buy.`
            : `Opens ${storeName || "the store"} in a new tab. We may earn a commission if you buy. Come back and tell us if it worked.`}
        </p>
        {requirement && coupon.code && (
          <p className="mt-1 text-center text-[13px] text-ink-soft">{requirement}</p>
        )}
      </div>
    </div>
  );
}
