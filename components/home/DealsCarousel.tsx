"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CouponCard, { type CouponCardStore } from "@/components/CouponCard";
import type { ImpressionPageType } from "@/lib/analytics";
import type { CouponPublic } from "@/lib/types";

/** Horizontal snap-scroll row of coupon cards, with arrows on larger screens. */
export default function DealsCarousel({
  coupons,
  stores,
  label,
  pageType = "coupon_card",
}: {
  coupons: CouponPublic[];
  stores: CouponCardStore[];
  label: string;
  /** Where this row sits, for impression reporting. */
  pageType?: ImpressionPageType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const storeById = new Map(stores.map((s) => [s.id, s]));

  function scrollBy(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  }

  if (coupons.length === 0) return null;

  return (
    <div className="relative" role="region" aria-label={label}>
      <div
        ref={ref}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 pt-1 sm:mx-0 sm:px-0"
      >
        {coupons.map((coupon, i) => (
          <div key={coupon.id} className="w-[270px] shrink-0 snap-start sm:w-[290px]">
            <CouponCard
              coupon={coupon}
              store={storeById.get(coupon.store_id)}
              variant="coupon"
              position={i + 1}
              pageType={pageType}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll deals left"
        className="absolute -left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ledger-line bg-white text-accent shadow-[var(--shadow-raised)] transition-transform hover:scale-110 lg:flex"
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll deals right"
        className="absolute -right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ledger-line bg-white text-accent shadow-[var(--shadow-raised)] transition-transform hover:scale-110 lg:flex"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}
