"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import CouponTicket, { type CouponTicketStore } from "@/components/coupons/CouponTicket";
import { groupCouponsForRow, storesHiddenByDedupe } from "@/lib/couponGroups";
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

  const hiddenStores = storesHiddenByDedupe(coupons);
  return (
    <div className="flex flex-col gap-4">
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
      {hiddenStores.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {hiddenStores.map((h) => {
            const store = stores.find((st) => st.id === h.storeId);
            if (!store) return null;
            return (
              <Link
                key={h.storeId}
                href={`/stores/${store.slug}`}
                className="font-medium text-durza-deep underline-offset-2 hover:underline"
              >
                View all {store.name} offers →
              </Link>
            );
          })}
        </div>
      )}
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
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-paper to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-paper to-transparent"
      />
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
