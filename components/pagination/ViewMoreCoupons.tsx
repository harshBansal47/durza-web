"use client";

import { useMemo, useRef, useState } from "react";
import OfferCard from "@/components/OfferCard";
import type { OfferBrand } from "@/components/OfferBrandMark";
import { api } from "@/lib/api";
import { lastCheckedLine, offerType, offerTypeLabel } from "@/lib/offer-presentation";
import ViewMoreFooter from "@/components/pagination/ViewMoreFooter";
import type { CouponListParams } from "@/lib/api";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
import type { CouponPublic } from "@/lib/types";

/**
 * Progressive "View More" list for coupon results.
 *
 * The server renders the first batch; this component appends subsequent pages
 * from the catalogue API without replacing what is already on screen. The
 * query object mirrors exactly what the page used for the first page (filters,
 * sort, keyword…), minus skip/limit.
 */
export default function ViewMoreCoupons({
  initialCoupons,
  total,
  query,
  stores = [],
  initialSkip = 0,
  limit = 20,
  gridClassName = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
}: {
  initialCoupons: CouponPublic[];
  total: number;
  query: Omit<CouponListParams, "skip" | "limit">;
  stores?: Array<{ id: string; name?: string; slug?: string; logo_url?: string | null; website_url?: string | null; currency?: string | null; }>;
  initialSkip?: number;
  limit?: number;
  gridClassName?: string;
}) {
  const initialClean = useMemo(
    () => dedupeCoupons(initialCoupons.map((c) => sanitizeCouponForDisplay(c))),
    [initialCoupons],
  );
  const [items, setItems] = useState<CouponPublic[]>(initialClean);
  const [nextSkip, setNextSkip] = useState(initialSkip + initialCoupons.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const seen = useRef(new Set(initialClean.map((coupon) => coupon.id)));

  const hasMore = items.length < total;
  const storeById = new Map(stores.map((store) => [store.id, store]));
  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(false);
    try {
      const result = await api.listCoupons({ ...query, skip: nextSkip, limit });
      const sanitized = dedupeCoupons(result.items.map((coupon) => sanitizeCouponForDisplay(coupon)));
      const fresh = sanitized.filter((coupon) => !seen.current.has(coupon.id));
      for (const coupon of fresh) seen.current.add(coupon.id);
      setItems((previous) => dedupeCoupons([...previous, ...fresh]));
      setNextSkip(nextSkip + result.items.length);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={gridClassName}>
        {items.map((coupon) => (
          <OfferCard
            key={coupon.id}
            bookmarkId={coupon.id}
            code={coupon.code}
            badge={null}
            badgeTone={coupon.code ? "amber" : "emerald"}
            title={coupon.title}
            description={coupon.description}
            ctaHref={api.goUrl(coupon.id, "coupons")}
            ctaLabel={coupon.code ? "View code" : "View offer"}
            expiresAt={coupon.expires_at}
            brand={storeById.get(coupon.store_id) as OfferBrand | undefined}
            typeLabelOverride={offerTypeLabel(offerType(coupon))}
            lastChecked={lastCheckedLine(coupon)}
            autoSuppressed={coupon.auto_suppressed}
          />
        ))}
      </div>

      <ViewMoreFooter
        loaded={initialSkip + items.length}
        total={total}
        loading={loading}
        error={error}
        onLoadMore={loadMore}
        noun="results"
      />
    </div>
  );
}
