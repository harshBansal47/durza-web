"use client";

import { useEffect, useRef } from "react";
import { track, type ImpressionPageType } from "@/lib/analytics";
import { isAnalyticsAllowed } from "@/lib/consent";

/**
 * Reports a coupon impression when the card is actually on screen, not when it is
 * merely rendered: an off-screen carousel card has not been seen, and counting it
 * would inflate the denominator of every click-through rate. It observes the card
 * it sits in (its parent), fires once at 50% visibility, then stops watching.
 */
export function ImpressionTracker({
  couponId,
  merchantId,
  pageType,
  position,
  pageId,
  sponsored,
}: {
  couponId: string;
  merchantId: string;
  pageType: ImpressionPageType;
  /** 1-based position within its list. */
  position: number;
  pageId?: string;
  sponsored?: boolean;
}) {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = marker.current?.parentElement;
    if (!card) return;
    const report = () => {
      // Consent gate: don't fire impressions until the visitor accepts
      if (!isAnalyticsAllowed()) return;
      track("coupon_impression", {
        coupon_id: couponId,
        merchant_id: merchantId,
        page_type: pageType,
        position,
        page_id: pageId,
        sponsored: sponsored ?? false,
      });
    };
    // Without IntersectionObserver (very old browsers) fall back to reporting on mount.
    if (typeof IntersectionObserver === "undefined") {
      report();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          report();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(card);
    return () => io.disconnect();
  }, [couponId, merchantId, pageType, position, pageId, sponsored]);

  return <span ref={marker} aria-hidden="true" className="hidden" />;
}
