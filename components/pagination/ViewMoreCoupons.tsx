"use client";

import { useRef, useState } from "react";
import { CouponCard, type CouponCardStore } from "@/components/CouponCard";
import ViewMoreFooter from "@/components/pagination/ViewMoreFooter";
import { api } from "@/lib/api";
import type { CouponListParams } from "@/lib/api";
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
  stores?: CouponCardStore[];
  initialSkip?: number;
  limit?: number;
  gridClassName?: string;
}) {
  const [items, setItems] = useState<CouponPublic[]>(initialCoupons);
  const [nextSkip, setNextSkip] = useState(initialSkip + initialCoupons.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const seen = useRef(new Set(initialCoupons.map((coupon) => coupon.id)));

  const hasMore = items.length < total;
  const storeById = new Map(stores.map((store) => [store.id, store]));

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(false);
    try {
      const result = await api.listCoupons({ ...query, skip: nextSkip, limit });
      const fresh = result.items.filter((coupon) => !seen.current.has(coupon.id));
      for (const coupon of fresh) seen.current.add(coupon.id);
      setItems((previous) => [...previous, ...fresh]);
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
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            store={storeById.get(coupon.store_id)}
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
