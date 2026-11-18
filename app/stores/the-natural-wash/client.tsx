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
const link = (url: string, sub: string): string => getAffiliateLink("the-natural-wash", url, sub);
const CART_FILLERS = [
  { id: "potato", label: "Potato Wax (₹380)", amount: 380 },
  { id: "beetroot", label: "Beetroot Lip Balm (₹220)", amount: 220 },
  { id: "rose", label: "Rose Water (₹299)", amount: 299 },
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

export default function TheNaturalWashClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [cart, setCart] = useState<string[]>(["potato"]);
  const subtotal = CART_FILLERS.filter((c) => cart.includes(c.id)).reduce((s, c) => s + c.amount, 0);
  const tnw15 = Math.round(subtotal * 0.15);
  const freeShip = subtotal >= 450;
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="The Natural Wash"
        subtitle="Pure Natural Care • Authentic Ayurveda with Potent Natural Kitchen Actives"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Clean Beauty Cart-Filler Assistant</h2>
        <p className="mt-1 text-sm text-ink-soft">Tap items to see when you cross ₹450 for free shipping and qualify for TNW15.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CART_FILLERS.map((c) => (
            <button key={c.id} type="button" onClick={() => setCart((cur) => cur.includes(c.id) ? cur.filter((x) => x !== c.id) : [...cur, c.id])} className={`rounded-full px-4 py-2 text-sm font-medium ${cart.includes(c.id) ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm">
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">Cart subtotal</span><span className="font-semibold text-ink">₹{subtotal}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">TNW15 (15% off)</span><span className="font-semibold text-ink">− ₹{tnw15}</span></div>
          <div className="flex items-center justify-between py-2"><span className="text-ink-soft">Free shipping (₹450+)</span><span className="font-semibold text-ink">{freeShip ? "Unlocked" : `Add ₹${450 - subtotal} more`}</span></div>
        </div>
        <a href={link("https://www.thenaturalwash.com/collections/best-sellers", "cart_filler")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Best Sellers on TNW</a>
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
        <ExploreStoreCta storeName="The Natural Wash" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on The Natural Wash"
        lead="A lip-and-skin essentials trio (vegan, no-paraben):"
        lines={[
          { label: "Lip & skin trio", value: "₹1,199" },
          { label: "Apply TNW15 (15% off)", value: "− ₹180*" },
          { label: "Free shipping above ₹450", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,019" }}
        saving="You could save ₹180+ on one order"
        note="*Illustrative — TNW15 applies to marked natural-care lines; B2G1 selects from lip & skin."
      />

            <ProductDealRouter
        title="Kitchen-Active Ayurvedic Beauty Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="the-natural-wash"
        columns={2}
        getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
      />

            <FaqSection eyebrow="The Natural Wash FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on The Natural Wash`}
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
