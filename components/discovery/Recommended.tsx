"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { getSignals } from "@/lib/personalization";
import SectionTitle from "@/components/SectionTitle";
import DealsCarousel from "@/components/home/DealsCarousel";
import type { CouponPublic } from "@/lib/types";

/**
 * "Because you viewed X" (§22). Rendered ONLY when anonymous taste signals
 * exist — otherwise this returns null, never a fabricated recommendation.
 * The store + its current coupons both come from the API.
 */
export function RecommendedRow() {
  const [state, setState] = useState<{
    storeName: string;
    storeSlug: string;
    coupons: CouponPublic[];
    stores: { id: string; name: string; slug: string; logo_url?: string | null; currency?: string | null }[];
  } | null>(null);

  useEffect(() => {
    const signals = getSignals();
    const slug = signals.stores[0] ?? null;
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        const store = await api.getStoreBySlug(slug).catch(() => null);
        if (!store || cancelled) return;
        const page = await api
          .listCoupons({ store_id: store.id, active_only: true, limit: 8 })
          .catch(() => null);
        const items = (page?.items ?? []).slice(0, 8);
        if (!cancelled && items.length > 0) {
          setState({
            storeName: store.name,
            storeSlug: store.slug,
            coupons: items,
            stores: [
              { id: store.id, name: store.name, slug: store.slug, logo_url: store.logo_url, currency: store.currency },
            ],
          });
        }
      } catch {
        /* offline — the row simply stays hidden */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!state) return null;

  return (
    <section aria-labelledby="recommended">
      <SectionTitle hint="based on stores you viewed">
        <span id="recommended">Because you viewed {state.storeName}</span>
      </SectionTitle>
      <DealsCarousel coupons={state.coupons} stores={state.stores} label={`More deals from ${state.storeName}`} />
      <p className="mt-2 text-right text-sm">
        <Link href={`/stores/${state.storeSlug}`} className="font-semibold text-inkblue hover:underline">
          All {state.storeName} deals →
        </Link>
      </p>
    </section>
  );
}
