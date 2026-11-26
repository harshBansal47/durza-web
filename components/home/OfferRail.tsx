"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OfferCard from "@/components/OfferCard";
import type { OfferBrand } from "@/components/OfferBrandMark";
import { api } from "@/lib/api";
import { lastCheckedLine, offerType, offerTypeLabel } from "@/lib/offer-presentation";
import type { CouponPublic } from "@/lib/types";

/**
 * A small, honest rail of live offers. `placement` becomes `content_ref` on the
 * tracked redirect so homepage sections can be compared before/after (T1/T7).
 *
 * `viewAll` closes the rail with a "View all" link — the homepage "Worth a look"
 * section uses it to keep the visible offers bounded while still giving shoppers
 * a path into the full deals feed.
 */
export default function OfferRail({
  offers,
  storesById,
  placement,
  viewAll,
}: {
  offers: CouponPublic[];
  storesById: Record<string, OfferBrand>;
  placement: string;
  viewAll?: { href: string; label?: string };
}) {
  return (
    <div
      className={
        viewAll
          ? "flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          : undefined
      }
    >
      <div className="justify-center grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
      {viewAll ? (
        <div className="flex justify-center md:justify-end">
          <Link
            href={viewAll.href}
            className="group inline-flex min-h-9 items-center gap-1 whitespace-nowrap text-sm font-semibold text-durza-deep transition-colors hover:text-accent"
          >
            {viewAll.label ?? "View all"}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

