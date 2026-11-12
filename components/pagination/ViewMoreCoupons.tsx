"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { CouponCard, type CouponCardStore } from "@/components/CouponCard";
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

      <div className="mt-6 flex flex-col items-center gap-2">
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ledger-line bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:border-inkblue hover:text-inkblue disabled:opacity-60"
          >
            {loading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />}
            {loading ? "Loading…" : "View More"}
          </button>
        ) : (
          total > 0 && (
            <p className="py-2 text-center text-xs text-ink-soft">
              That&apos;s all {total} result{total === 1 ? "" : "s"}.
            </p>
          )
        )}
        {error && (
          <p role="alert" className="text-xs text-rust">
            Couldn&apos;t load more — check your connection and try again.
          </p>
        )}
      </div>
    </div>
  );
}
