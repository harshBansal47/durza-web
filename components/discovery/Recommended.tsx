"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wand2 } from "lucide-react";
import { api } from "@/lib/api";
import { getSignals } from "@/lib/personalization";
import SectionTitle from "@/components/SectionTitle";
import DealsCarousel from "@/components/home/DealsCarousel";
import type { CouponPublic } from "@/lib/types";

interface Row {
  storeName: string;
  storeSlug: string;
  coupons: CouponPublic[];
  stores: { id: string; name: string; slug: string; logo_url?: string | null; currency?: string | null }[];
}

/**
 * "For you" (§22). Renders one row per store the visitor has shown taste for
 * (followed stores first, then recently viewed), in that priority order. Each
 * store + its current coupons come from the API. Renders nothing when there is
 * no signal — never a fabricated recommendation.
 */
export function RecommendedRow() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const signals = getSignals();
    // Priority: explicitly followed stores outrank passive views.
    const slugs = [...new Set([...signals.followed, ...signals.stores])].slice(0, 3);
    if (slugs.length === 0) return;

    let cancelled = false;
    (async () => {
      const built: Row[] = [];
      for (const slug of slugs) {
        if (cancelled) break;
        try {
          const store = await api.getStoreBySlug(slug).catch(() => null);
          if (!store || cancelled) continue;
          const page = await api
            .listCoupons({ store_id: store.id, active_only: true, limit: 8 })
            .catch(() => null);
          const items = (page?.items ?? []).slice(0, 8);
          if (items.length === 0) continue;
          built.push({
            storeName: store.name,
            storeSlug: store.slug,
            coupons: items,
            stores: [
              { id: store.id, name: store.name, slug: store.slug, logo_url: store.logo_url, currency: store.currency },
            ],
          });
        } catch {
          /* offline — skip this store, keep the others */
        }
      }
      if (!cancelled && built.length > 0) setRows(built);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="for-you">
      <SectionTitle hint="based on stores you follow and view" icon={Wand2}>
        <span id="for-you">For you</span>
      </SectionTitle>
      {rows.map((row) => (
        <div key={row.storeSlug} className="mb-6 last:mb-0">
          <p className="mb-2 text-sm font-medium text-ink-soft">
            More from{" "}
            <Link href={`/stores/${row.storeSlug}`} className="font-semibold text-inkblue hover:underline">
              {row.storeName}
            </Link>
          </p>
          <DealsCarousel coupons={row.coupons} stores={row.stores} label={`Deals from ${row.storeName}`} />
        </div>
      ))}
    </section>
  );
}
