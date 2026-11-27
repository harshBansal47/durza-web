import { Fragment } from "react";
import OfferCard from "@/components/OfferCard";
import type { OfferBrand } from "@/components/OfferBrandMark";
import { lastCheckedLine, offerType, offerTypeLabel } from "@/lib/offer-presentation";
import { api } from "@/lib/api";
import { DEAL_FEED_DIVIDER_EVERY, dealFeedDividerLabel } from "@/lib/deal-feed";
import type { CouponPublic } from "@/lib/types";

/**
 * Slim store shape used by the deals feed. A full `Store` is assignable.
 */
export type DealCardStore = {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  website_url?: string | null;
  currency?: string | null;
};

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
          <OfferCard
            bookmarkId={coupon.id}
            code={coupon.code}
            badge={null}
            badgeTone={coupon.code ? "amber" : "emerald"}
            title={coupon.title}
            description={coupon.description}
            ctaHref={api.goUrl(coupon.id, "deals")}
            ctaLabel={coupon.code ? "View code" : "View offer"}
            expiresAt={coupon.expires_at}
            brand={storeById.get(coupon.store_id) as OfferBrand | undefined}
            typeLabelOverride={offerTypeLabel(offerType(coupon))}
            lastChecked={lastCheckedLine(coupon)}
            autoSuppressed={coupon.auto_suppressed}
          />
        </div>
      </Fragment>
    );
  });
}
