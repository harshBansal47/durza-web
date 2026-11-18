"use client";

import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";

import { useState } from "react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ProductDealRouter from "@/components/store/ProductDealRouter";
import { ArrowUpRight } from "lucide-react";
import { getAffiliateLink } from "@/lib/affiliate";

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function FuelOneStorePage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [active, setActive] = useState(tabs[0] ?? "");

  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <StoreHero
        name="Fuel One"
        subtitle="100% transparent sports nutrition — whey isolate, creatine & FSSAI-certified supplements"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/fuelone"
        perks={[
          { label: "Whey & Creatine", value: "Flat deals inside" },
          { label: "Authenticity", value: "FSSAI-certified" },
          { label: "Delivery", value: "Pan-India shipping" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      {products.length > 0 && (
        <ProductDealRouter
          title="Fuel One Deal Router"
          offers={offers}
          products={products}
          tabs={tabs}
          concern={active}
          onConcern={setActive}
          storeName="fuelone"
          storeDisplayName="Fuel One"
          columns={3}
          getHref={(p, idx) => getAffiliateLink("fuelone", p.targetUrl, p.subId || `matcher_${idx}`)}
        />
      )}
            <FaqSection eyebrow="Fuel One FAQs" items={faqs} />


      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={topOffer ? "/go/fuelone?src=store-page" : "/go/fuelone?src=store-page"}
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
              {topOffer ? topOffer.title : `Check live range & offers on Fuel One`}
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
