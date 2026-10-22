"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CouponTicket, { type CouponTicketStore } from "@/components/coupons/CouponTicket";
import { groupCouponsForRow } from "@/lib/couponGroups";
import type { ImpressionPageType } from "@/lib/analytics";
import type { CouponPublic } from "@/lib/types";

/**
 * A row of coupon tickets.
 *
 * Two rules are applied before anything is rendered, both in the pure helper
 * `groupCouponsForRow`:
 *
 *   * offers from the same store with the same offer type collapse into one
 *     ticket with a "+N more codes" expander, so a row of near-identical
 *     Myntra offers does not read as a row of the same card;
 *   * no store fills more than two cards in the same row.
 */
export default function CouponTicketRow({
  coupons,
  stores,
  label,
  pageType = "coupon_card",
  variant = "grid",
}: {
  coupons: CouponPublic[];
  stores: CouponTicketStore[];
  label: string;
  pageType?: ImpressionPageType;
  /** "grid" for the page grid, "scroll" for a horizontal snap row. */
  variant?: "grid" | "scroll";
}) {
  const groups = groupCouponsForRow(coupons);
  const storeById = new Map(stores.map((s) => [s.id, s]));
  if (groups.length === 0) return null;

  if (variant === "scroll") {
    return (
      <CouponTicketScroller
        groups={groups}
        storeById={storeById}
        label={label}
        pageType={pageType}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, index) => (
        <CouponTicket
          key={group.primary.id}
          coupon={group.primary}
          store={storeById.get(group.storeId)}
          extra={group.extra}
          position={index + 1}
          pageType={pageType}
        />
      ))}
    </div>
  );
}

function CouponTicketScroller({
  groups,
  storeById,
  label,
  pageType,
}: {
  groups: ReturnType<typeof groupCouponsForRow>;
  storeById: Map<string, CouponTicketStore>;
  label: string;
  pageType: ImpressionPageType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  }

  return (
    <div className="relative" role="region" aria-label={label}>
      <div
        ref={ref}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 pt-1 sm:mx-0 sm:px-0"
      >
        {groups.map((group, index) => (
          <div key={group.primary.id} className="w-[290px] shrink-0 snap-start sm:w-[310px]">
            <CouponTicket
              coupon={group.primary}
              store={storeById.get(group.storeId)}
              extra={group.extra}
              position={index + 1}
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
