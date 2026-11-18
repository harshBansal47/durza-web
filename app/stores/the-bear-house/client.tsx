"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
import ProductDealRouter from "@/components/store/ProductDealRouter";
const link = (url: string, sub: string): string => getAffiliateLink("the-bear-house", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function TheBearHouseClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [qty, setQty] = useState({ shirt: true, chino: true });
  const selectedCount = [qty.shirt, qty.chino].filter(Boolean).length;
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="The Bear House"
        subtitle="Premium shirts, chinos, and menswear essentials with live offers and direct links to the official store."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Build a 2-piece outfit</h2>
        <p className="mt-1 text-sm text-ink-soft">Select items to plan a bundle, then apply any eligible promo code and review payment offers shown at checkout on The Bear House.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setQty((q) => ({ ...q, shirt: !q.shirt }))} className={`rounded-full px-4 py-2 text-sm font-medium ${qty.shirt ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Oxford Shirt</button>
          <button type="button" onClick={() => setQty((q) => ({ ...q, chino: !q.chino }))} className={`rounded-full px-4 py-2 text-sm font-medium ${qty.chino ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Stretch Chino</button>
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm text-ink-soft">
          <p><span className="font-semibold text-ink">Selected items:</span> {selectedCount}</p>
          <p className="mt-2">Final price, shipping, promo eligibility, and any payment offers are shown on the official checkout page.</p>
        </div>
        <a href={link("https://thebearhouse.com/collections/best-sellers", "wardrobe_multiplier")} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Explore best sellers on The Bear House</a>
      </div>

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <OfferCard
              key={o.code}
              bookmarkId={o.id}
              code={o.code}
              badge={o.badge}
              title={o.title}
              description={o.description}
              ctaHref={link(o.targetUrl, o.subId)}
              expiresAt={o.expiresAt}
            />
          ))}
        </div>
      ) : (
        <ExploreStoreCta storeName="The Bear House" href={ctaHref} />
      )}

      <StackingExample
        title="How to check savings on The Bear House"
        lead="Review bundle value and checkout terms before placing an order:"
        lines={[
          { label: "Add eligible items to your cart", value: "Build bundle" },
          { label: "Apply any eligible promo code", value: "If available" },
          { label: "Review shipping and payment offers at checkout", value: "As shown" }
        ]}
        total={{ label: "Final amount", value: "Shown at checkout" }}
        saving="Confirm the final payable amount and offer eligibility on the official checkout page"
        note="Prices, promo eligibility, and payment offers vary by product and time. Always verify details at checkout."
      />

            <ProductDealRouter
        title="Menswear Fabric &amp; Occasion Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="the-bear-house"
        columns={2}
        getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
      />

            <FaqSection eyebrow="The Bear House FAQs" items={faqs} />


      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={topOffer ? link(topOffer.targetUrl, topOffer.subId) : ctaHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
        >
          <span className="min-w-0">
            {topOffer?.code ? (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Code {topOffer.code}
              </span>
            ) : (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Official store
              </span>
            )}
            <span className="block truncate text-xs font-semibold">
              {topOffer ? topOffer.title : `Check live range & offers on The Bear House`}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
            Shop
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </a>
      </div>
    </div>
  );
}
