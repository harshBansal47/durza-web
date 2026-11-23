"use client";

import { useState } from "react";
import { Flame, TicketPercent, Zap, Clock4 } from "lucide-react";
import OfferCard from "@/components/OfferCard";
import type { CouponPublic } from "@/lib/types";
import { formatDiscountHeading } from "@/lib/format";
import { formatStoreDisplayName } from "@/lib/store-display";
import { api } from "@/lib/api";

/**
 * Unified tabbed deals explorer. One pool per tab, each already deduplicated
 * server-side, so no offer appears twice in the same grid and every tab renders
 * a balanced 6-card grid (backfilled server-side).
 */
export type DealsExplorerTab = "top" | "codes" | "deals" | "newest";

const TABS: { id: DealsExplorerTab; label: string; icon: typeof Flame }[] = [
  { id: "codes", label: "Coupon codes", icon: TicketPercent },
  { id: "deals", label: "No code listed", icon: Zap },
];

export default function VerifiedDealsExplorer({
  tabs,
  storesById,
  goSrc = "homepage",
}: {
  tabs: Record<DealsExplorerTab, CouponPublic[]>;
  /** id → minimal store identity, so cross-store grids can name who the deal is from. */
  storesById?: Record<
    string,
    { name: string; slug: string; logo_url?: string | null; website_url?: string | null }
  >;
  goSrc?: string;
}) {
  const [active, setActive] = useState<DealsExplorerTab>("top");
  const deals = tabs[active] ?? [];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Deal views"
        className="flex flex-wrap gap-2"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`verified-deals-panel-${tab.id}`}
              id={`verified-deals-tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:text-slate-900 hover:ring-slate-300"
              }`}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {deals.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-ledger-line bg-white p-6 text-sm text-ink-soft">
          No deals in this view right now — check another tab.
        </p>
      ) : (
        <div
          role="tabpanel"
          id={`verified-deals-panel-${active}`}
          aria-labelledby={`verified-deals-tab-${active}`}
          className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {deals.map((coupon) => {
            const store = storesById?.[coupon.store_id];
            return (
              <OfferCard
                key={coupon.id}
                bookmarkId={coupon.id}
                brand={
                  store
                    ? {
                        id: coupon.store_id,
                        name: formatStoreDisplayName({ slug: store.slug, name: store.name }),
                        slug: store.slug,
                        logo_url: store.logo_url ?? null,
                        website_url: store.website_url ?? null,
                      }
                    : undefined
                }
                code={coupon.code}
                badge={formatDiscountHeading(coupon)}
                title={coupon.title}
                description={coupon.description}
                ctaHref={api.goUrl(coupon.id, goSrc)}
                expiresAt={coupon.expires_at}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
