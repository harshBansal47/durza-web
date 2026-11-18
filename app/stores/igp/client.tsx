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
        name="IGP (Indian Gifts Portal)"
        subtitle="Same-day delivery in major Indian metros for cakes and flowers, personalized hampers, and international gift delivery for NRIs sending gifts to India."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Delivery & Gifting Guide</h2>
        <p className="mt-2 text-sm text-ink-soft">IGP (Indian Gifts Portal) offers same-day delivery in major Indian metros for cakes and flowers, plus personalized hampers and international gift delivery options for NRIs sending gifts to India. Check live slot availability and eligibility at checkout.</p>
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
        <ExploreStoreCta storeName="IGP (Indian Gifts Portal)" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on IGP"
        lead="A custom photo cake and candles for a birthday:"
        lines={[
          { label: "Add eligible items to cart", value: "Build cart" },
          { label: "Apply any eligible promo code", value: "If available" },
          { label: "Review shipping and payment offers at checkout", value: "As shown" }
        ]}
        total={{ label: "Final amount", value: "Shown at checkout" }}
        saving="Confirm the final payable amount and offer eligibility on the official checkout page"
        note="Prices, promo eligibility, shipping thresholds, and payment offers vary by product and time. Always verify details at checkout."
      />
            <ProductDealRouter
        title="Occasion & Gift Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="igp"
        storeDisplayName="IGP (Indian Gifts Portal)"
        columns={2}
        getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
      />
      <section aria-labelledby="igp-related-links" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 id="igp-related-links" className="text-lg font-bold text-ink">Related gifting picks on Durza</h2>
        <p className="mt-1 text-sm text-ink-soft">Explore curated festive gifting, fragrance, and wellness options.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Wedding & Festive Luxury Gifting Edit</p>
            <p className="mt-1 text-sm text-ink-soft">Curated gifting ideas for celebrations in India</p>
          </a>
          <a href="/stores/bath-and-body-works" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Bath & Body Works</p>
            <p className="mt-1 text-sm text-ink-soft">Fragrance mists, candles, and gift-ready body care</p>
          </a>
          <a href="/stores/kama-ayurveda" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Kama Ayurveda</p>
            <p className="mt-1 text-sm text-ink-soft">Ayurvedic skincare and wellness gifting staples</p>
          </a>
        </div>
      </section>

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
              {topOffer ? topOffer.title : `Check live range & offers on IGP`}
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
