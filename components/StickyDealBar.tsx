"use client";

import { useEffect, useState } from "react";
import OutboundLink from "./OutboundLink";
import type { CouponPublic } from "@/lib/types";

/**
 * Mobile-only bottom action bar on the coupon page. Codes jump to the reveal
 * panel (so the shopper actually sees the code first); code-less deals go
 * straight to the store through the normal /go redirect.
 *
 * It slides away once the site footer is on screen. A fixed bar always covers
 * the last ~70px of the page, which is where the footer's copyright line sits;
 * padding the page to clear it left a dead gap above the footer instead (the
 * footer is outside the page's own container), so the bar steps aside rather
 * than the layout making room for it.
 */
export default function StickyDealBar({ coupon, storeName }: { coupon: CouponPublic; storeName?: string }) {
  const hasCode = Boolean(coupon.code);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={footerVisible}
      inert={footerVisible}
      className={`pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-ledger-line bg-white/95 px-4 pt-3 shadow-[0_-6px_18px_rgba(20,20,20,0.08)] backdrop-blur-md transition-transform duration-200 md:hidden no-print ${
        footerVisible ? "translate-y-full" : ""
      }`}
    >
      <div className="flex items-center gap-3 pb-3">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{coupon.title}</p>
        {hasCode ? (
          <a href="#code-panel" className="btn btn-cta shrink-0 px-5">
            View code
          </a>
        ) : (
          <OutboundLink
            coupon={coupon}
            storeName={storeName ?? ""}
            src="sticky-bar"
            className="btn btn-cta shrink-0 px-5"
          >
            {storeName ? `Go to ${storeName}` : "Get deal"}
          </OutboundLink>
        )}
      </div>
    </div>
  );
}
