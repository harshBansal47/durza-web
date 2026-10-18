import { Fragment } from "react";
import DealCard, { type DealCardStore } from "@/components/DealCard";
import { DEAL_FEED_DIVIDER_EVERY, dealFeedDividerLabel } from "@/lib/deal-feed";
import type { CouponPublic } from "@/lib/types";

/**
 * One stretch of the deals feed: cards in the backend's order, with a quiet
 * divider every seventh card naming the category the next stretch leans into
 * (phones only — desktop keeps spacing only, and dividers are md:hidden).
 *
 * Both the server-rendered first page and the client-appended "load more"
 * pages render through here, so the rhythm continues across the seam —
 * positions are global: `startIndex` is the card's index in the whole
 * filtered list.
 *
 * `hideOnMobileIds` drops a card that is already on screen as the mobile
 * spotlight, without touching the desktop grid where it keeps its place.
 */
export default function DealFeed({
  coupons,
  startIndex,
  stores,
  categoryNames,
  hideOnMobileIds = [],
}: {
  coupons: CouponPublic[];
  startIndex: number;
  stores: DealCardStore[];
  categoryNames: Record<string, string>;
  hideOnMobileIds?: string[];
}) {
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const hidden = new Set(hideOnMobileIds);

  return coupons.map((coupon, index) => {
    const feedIndex = startIndex + index;
    const divider =
      feedIndex > 0 && feedIndex % DEAL_FEED_DIVIDER_EVERY === 0
        ? dealFeedDividerLabel(coupons, index, (id) => categoryNames[id])
        : null;

    return (
      <Fragment key={coupon.id}>
        {divider ? (
          <p className="col-span-full mb-2 mt-6 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-soft/70 md:hidden">
            {divider}
          </p>
        ) : null}
        <div className={hidden.has(coupon.id) ? "hidden h-full md:block" : "h-full"}>
          <DealCard
            coupon={coupon}
            store={storeById.get(coupon.store_id)}
            position={feedIndex + 1}
          />
        </div>
      </Fragment>
    );
  });
}
