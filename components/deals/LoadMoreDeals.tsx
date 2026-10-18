"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import DealFeed from "@/components/deals/DealFeed";
import type { DealCardStore } from "@/components/DealCard";
import { api } from "@/lib/api";
import { toDealQuery, type DealFilters } from "@/lib/deal-discovery";
import type { CouponPublic } from "@/lib/types";

/**
 * "Load more deals…" for the phone feed.
 *
 * Progressive enhancement: the control is a real link to the next server page
 * (`?skip=`), so it still works without JavaScript and crawlers can follow it;
 * with JavaScript the next page is fetched from the catalogue API and appended
 * in place. Either way the cards are the exact list the server would have
 * shown next — same filters, keyword and paging.
 *
 * The page remounts this with key={nextHref}, so a filter change never leaves
 * stale pages behind.
 */
export default function LoadMoreDeals({
  filters,
  facets,
  keyword,
  baseSkip,
  serverCount,
  serverIds,
  total,
  limit,
  stores,
  categoryNames,
  nextHref,
}: {
  filters: DealFilters;
  facets: { store_ids: string[]; category_ids: string[]; unresolved: boolean };
  keyword: string;
  baseSkip: number;
  serverCount: number;
  serverIds: string[];
  total: number;
  limit: number;
  stores: DealCardStore[];
  categoryNames: Record<string, string>;
  nextHref: string;
}) {
  const [items, setItems] = useState<CouponPublic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const loadedCount = baseSkip + serverCount + items.length;
  const hasMore = !facets.unresolved && !done && loadedCount < total;

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const query = toDealQuery(filters, facets, { skip: loadedCount, limit });
      if (keyword) query.search = keyword;
      const page = await api.listCoupons(query);
      const seen = new Set([...serverIds, ...items.map((coupon) => coupon.id)]);
      const fresh = page.items.filter((coupon) => !seen.has(coupon.id));
      if (fresh.length === 0) {
        setDone(true);
        return;
      }
      setItems((previous) => [...previous, ...fresh]);
    } catch {
      setError("Couldn't load more deals. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // `contents` keeps the appended cards direct grid items; md:hidden keeps
    // the whole in-place pager off desktop, which keeps the numbered footer.
    <div className="contents md:hidden">
      {items.length > 0 && (
        <DealFeed
          coupons={items}
          startIndex={baseSkip + serverCount}
          stores={stores}
          categoryNames={categoryNames}
        />
      )}
      <div className="col-span-full py-2">
        {!hasMore ? (
          total > 0 ? (
            <p className="py-4 text-center text-xs text-ink-soft">
              That&apos;s all {total} deal{total === 1 ? "" : "s"} for this view.
            </p>
          ) : null
        ) : (
          <a
            href={nextHref}
            aria-busy={loading}
            onClick={(event) => {
              event.preventDefault();
              void loadMore();
            }}
            className="btn btn-outline mx-auto flex w-full max-w-sm items-center justify-center gap-2"
          >
            {loading && (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
            )}
            {loading ? "Loading more deals…" : "Load more deals…"}
          </a>
        )}
        {error ? (
          <p role="alert" className="mt-2 text-center text-xs text-rust">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
