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
const link = (url: string, sub: string): string => getAffiliateLink("kama-ayurveda", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function KamaAyurvedaPage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Kama Ayurveda"
        subtitle="Authentic Ayurvedic Formulations • 100% Natural, Plant-Based Luxury Care"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Luxury Cart Optimization & Sample Unlocking Guide</h2>
        <ul className="mt-3 space-y-1 text-sm text-ink-soft">
          <li>Level 1 (Any Order): 3 Free Handpicked Luxury Mini Sachets/Vials.</li>
          <li>Level 2 (Above ₹1,499): 100% Free Doorstep Delivery.</li>
          <li>Level 3 (Above ₹2,999): Unlock Complimentary Deluxe Gift (Kumkumadi Mini Scrub/Cream).</li>
        </ul>
        <a href={link("https://www.kamaayurveda.com", "luxury_box")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My Luxury Box</a>
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
        <ExploreStoreCta storeName="Kama Ayurveda" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Kama Ayurveda"
        lead="A Kumkumadi face-care gift set (festive box):"
        lines={[
          { label: "Kumkumadi festive gift set", value: "₹2,499" },
          { label: "Apply RITUAL15 (15% off)", value: "− ₹375*" },
          { label: "Free doorstep delivery above ₹1,499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹2,124" }}
        saving="You could save ₹520+ with free delivery"
        note="*Illustrative — gift boxes qualify above ₹1,499; GLOWGIFT applies above ₹2,999."
      />
            <ProductDealRouter
        title="Ayurvedic Treatment & Ritual Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="kama-ayurveda"
        columns={2}
      />
            <FaqSection eyebrow="Kama Ayurveda FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Kama Ayurveda`}
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
