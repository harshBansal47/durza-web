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
const link = (url: string, sub: string): string => getAffiliateLink("igp", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function IgpPage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [slot, setSlot] = useState("midnight");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="IGP.com"
        subtitle="Cakes, flowers, personalised gifts and hampers — delivered with same-day options in most cities."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Delivery Slot & Timing Advisor</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setSlot("midnight")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "midnight" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Tonight at 12:00 AM</button>
          <button type="button" onClick={() => setSlot("sameday")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "sameday" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Today in 2-3 Hours</button>
          <button type="button" onClick={() => setSlot("custom")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "custom" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>In 2 to 4 Days</button>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {slot === "midnight" && "Recommended: Fresh Cakes & Floral Bouquets with Midnight Slot guidance."}
          {slot === "sameday" && "Recommended: Express local dispatch items available today."}
          {slot === "custom" && "Recommended: Personalized Photo Crystals & Caricatures."}
        </p>
        <a href={link("https://www.igp.com", "delivery_advisor")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Check Delivery Slots on IGP</a>
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
        <ExploreStoreCta storeName="IGP.com" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on IGP"
        lead="A custom photo cake and candles for a birthday:"
        lines={[
          { label: "Custom photo cake + candles", value: "₹999" },
          { label: "Apply CAKE15 (15% off)", value: "− ₹150*" },
          { label: "Free standard delivery", value: "non-perishable gifts" }
        ]}
        total={{ label: "You pay", value: "≈ ₹849" }}
        saving="You could save ₹150+ on the celebration"
        note="*Illustrative — fresh cakes are perishable and may follow separate delivery/eligibility rules."
      />
            <ProductDealRouter
        title="Occasion & Gift Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="igp"
        columns={2}
      />
            <FaqSection eyebrow="IGP.com FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on IGP.com`}
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
