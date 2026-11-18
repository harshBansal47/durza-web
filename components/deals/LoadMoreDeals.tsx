"use client";

import { useState } from "react";
import ViewMoreFooter from "@/components/pagination/ViewMoreFooter";
import DealFeed from "@/components/deals/DealFeed";
import type { DealCardStore } from "@/components/DealCard";
import { api } from "@/lib/api";
import { toDealQuery, type DealFilters } from "@/lib/deal-discovery";
import { dedupeCoupons, sanitizeCouponForDisplay } from "@/lib/feed-sanitize";
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
  storeIds,
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
  /** When set and the visitor picked no store, restrict the feed to these stores. */
  storeIds?: string[];
}) {
  const [items, setItems] = useState<CouponPublic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exhausted, setExhausted] = useState(false);

  const loadedCount = baseSkip + serverCount + items.length;

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const query = toDealQuery(filters, facets, { skip: loadedCount, limit }, storeIds);
      if (keyword) query.search = keyword;
      const page = await api.listCoupons(query);
      const sanitized = dedupeCoupons(page.items.map((coupon) => sanitizeCouponForDisplay(coupon)));
      const seen = new Set([...serverIds, ...items.map((coupon) => coupon.id)]);
      const fresh = sanitized.filter((coupon) => !seen.has(coupon.id));
      if (fresh.length === 0) {
        setExhausted(true);
        return;
      }
      setItems((previous) => dedupeCoupons([...previous, ...fresh]));
    } catch {
      setError("Couldn't load more deals. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // `contents` keeps the appended cards direct grid items.
    <div className="contents">
      {items.length > 0 && (
        <DealFeed
          coupons={items}
          startIndex={baseSkip + serverCount}
          stores={stores}
          categoryNames={categoryNames}
        />
      )}
      <div className="col-span-full py-2">
        <ViewMoreFooter
          loaded={exhausted ? total : loadedCount}
          total={total}
          loading={loading}
          error={Boolean(error)}
          onLoadMore={() => void loadMore()}
          noun="deals"
          href={nextHref}
          suppressAction={facets.unresolved}
          errorMessage="Couldn't load more deals. Check your connection and try again."
        />
      </div>
    </div>
  );
}
