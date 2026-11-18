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
const link = (url: string, sub: string): string => getAffiliateLink("levis", url, sub);
const CARTS = [
  { id: "solo", label: "511™ Jeans", total: "Single item", outcome: "Add more eligible items if needed to meet promo thresholds shown at checkout.", sub: "cart_solo", url: "https://www.levi.in" },
  { id: "plus_tee", label: "Jeans + tee bundle", total: "Bundle", outcome: "Check whether your cart meets the current promo code threshold at checkout.", sub: "cart_plus_tee", url: "https://www.levi.in/sale" },
  { id: "bundle", label: "Jeans + jacket bundle", total: "Bundle", outcome: "Review eligible promo codes and final cart total at checkout.", sub: "cart_bundle", url: "https://www.levi.in/sale" },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function LevisClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [cart, setCart] = useState(CARTS[1]);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Levi's India"
        subtitle="Original Jeans & Authentic Apparel • Engineered Since 1873"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Fit-Number Decoder &amp; Smart Cart Threshold Hack</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded-xl bg-paper p-3"><p className="font-semibold text-ink">501® = Classic Straight</p><p className="mt-1 text-xs text-ink-soft">Button-fly, straight leg, 100% heavyweight cotton.</p></div>
          <div className="rounded-xl bg-paper p-3"><p className="font-semibold text-ink">511™ = Modern Slim</p><p className="mt-1 text-xs text-ink-soft">Slim through thigh and leg with light stretch.</p></div>
          <div className="rounded-xl bg-paper p-3"><p className="font-semibold text-ink">512™ = Slim Taper</p><p className="mt-1 text-xs text-ink-soft">Slim thigh with a tailored narrow ankle opening.</p></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {CARTS.map((c) => (
            <button key={c.id} type="button" onClick={() => setCart(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${cart.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4">
          <p className="text-sm text-ink">Cart total: <span className="font-bold">{cart.total}</span></p>
          <p className="mt-1 text-sm text-ink-soft">{cart.outcome}</p>
        </div>
        <a href={link(cart.url, cart.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Apply Cart Hack on Levi.in</a>
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
        <ExploreStoreCta storeName="Levi's India" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Levi's"
        lead="A pair of 502 jeans and a belt for gifting:"
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
        title="Levi&apos;s Fit &amp; Category Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="levis"
        columns={2}
        getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
      />

            <FaqSection eyebrow="Levi's India FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Levi's India`}
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
