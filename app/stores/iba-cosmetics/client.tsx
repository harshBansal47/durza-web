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
const link = (url: string, sub: string): string => getAffiliateLink("iba-cosmetics", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function IbaCosmeticsPage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Iba Cosmetics"
        subtitle="PETA-certified vegan, cruelty-free & Halal-certified beauty — breathable liquid lipsticks, alcohol-free attars/perfumes, and everyday skin tints"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Clean, Halal-Certified Beauty Guide</h2>
        <p className="mt-2 text-sm text-ink-soft">Iba Cosmetics highlights PETA-certified vegan, cruelty-free and Halal-certified formulations. Explore breathable transfer-proof liquid lipsticks, alcohol-free attars/perfumes, and everyday skin tints designed for comfortable wear. Always check the live product page for current ingredients, certifications, and offer terms.</p>
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
        <ExploreStoreCta storeName="Iba Cosmetics" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on IBA Cosmetics"
        lead="A clean-beauty face trio (cleanser + serum + sunscreen):"
        lines={[
          { label: "Clean-beauty face trio", value: "₹1,299" },
          { label: "Apply IBA15 (15% off)", value: "− ₹195*" },
          { label: "Free shipping above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,104" }}
        saving="You could save ₹195+ on one order"
        note="*Illustrative — IBA15 applies to marked clean-beauty ranges; check the card for exclusions."
      />
            <ProductDealRouter
        title="Clean Certification & Makeup Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="iba-cosmetics"
        storeDisplayName="Iba Cosmetics"
        columns={2}
        getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
      />
      <section aria-labelledby="iba-related-guides" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 id="iba-related-guides" className="text-lg font-bold text-ink">Related clean beauty guides & stores</h2>
        <p className="mt-1 text-sm text-ink-soft">Keep exploring vegan, skincare, and Ayurvedic beauty picks on Durza.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a href="/stores/dot-and-key" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Dot & Key</p>
            <p className="mt-1 text-sm text-ink-soft">Sunscreens and skincare actives for Indian routines</p>
          </a>
          <a href="/stores/kama-ayurveda" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Kama Ayurveda</p>
            <p className="mt-1 text-sm text-ink-soft">Classical Ayurvedic skincare and haircare essentials</p>
          </a>
          <a href="/guides/indian-skincare-actives-haircare-guide" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Indian skincare actives & haircare guide</p>
            <p className="mt-1 text-sm text-ink-soft">Educational picks for actives, routines, and tracked shopping</p>
          </a>
        </div>
      </section>

      <FaqSection eyebrow="Iba Cosmetics FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Iba Cosmetics`}
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
