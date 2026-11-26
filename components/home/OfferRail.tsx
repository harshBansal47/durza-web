"use client";

import OfferCard from "@/components/OfferCard";
import type { OfferBrand } from "@/components/OfferBrandMark";
import { api } from "@/lib/api";
import { lastCheckedLine, offerType, offerTypeLabel } from "@/lib/offer-presentation";
import type { CouponPublic } from "@/lib/types";

/**
 * A small, honest rail of live offers. `placement` becomes `content_ref` on the
 * tracked redirect so homepage sections can be compared before/after (T1/T7).
 */
export default function OfferRail({
  offers,
  storesById,
  placement,
}: {
  offers: CouponPublic[];
  storesById: Record<string, OfferBrand>;
  placement: string;
}) {
  return (
    <div className=" justify-center grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {offers.map((coupon) => {
        const brand: OfferBrand | undefined = storesById[coupon.store_id];
        const type = offerType(coupon);
        return (
          <OfferCard
            key={coupon.id}
            bookmarkId={coupon.id}
            code={coupon.code}
            badge={null}
            badgeTone={coupon.code ? "amber" : "emerald"}
            title={coupon.title}
            description={coupon.description}
            ctaHref={api.goUrl(coupon.id, "homepage", placement)}
            ctaLabel={coupon.code ? "View code" : "View offer"}
            expiresAt={coupon.expires_at}
            brand={brand}
            typeLabelOverride={offerTypeLabel(type)}
            lastChecked={lastCheckedLine(coupon)}
          />
        );
      })}
    </div>
  );
}
