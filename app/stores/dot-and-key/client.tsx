"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import type { StoreOfferCard } from "@/lib/store-offers";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Concern = "all" | "watermelon" | "cica" | "vitc" | "barrier";

type Product = {
  id: string;
  name: string;
  specs: string;
  cta: string;
  src: string;
  concern: Exclude<Concern, "all">;
};

const PRODUCTS: Product[] = [
  {
    id: "watermelon-sunscreen",
    name: "Watermelon Hyaluronic Cooling Sunscreen SPF 50+",
    specs: "50g · Zero white cast, oil-free gel",
    cta: "Shop Watermelon Sun & Hydration ↗",
    src: "matcher_watermelon",
    concern: "watermelon",
  },
  {
    id: "watermelon-gel",
    name: "72HR Hydrating Gel Moisturizer",
    specs: "60ml · Hyaluronic + Watermelon, non-comedogenic",
    cta: "Shop Watermelon Hydration ↗",
    src: "matcher_watermelon",
    concern: "watermelon",
  },
  {
    id: "cica-moisturizer",
    name: "Cica & 2% Salicylic Oil-Free Moisturizer",
    specs: "60ml · Calms active breakouts",
    cta: "Shop Cica Anti-Acne Range ↗",
    src: "matcher_cica",
    concern: "cica",
  },
  {
    id: "cica-serum",
    name: "10% Niacinamide + Cica Dark Spot Serum",
    specs: "30ml · Fades post-acne marks",
    cta: "Shop Cica & Niacinamide Serums ↗",
    src: "matcher_cica",
    concern: "cica",
  },
  {
    id: "vitc-moisturizer",
    name: "Vitamin C + E Super Bright Moisturizer",
    specs: "60ml · Sicilian Blood Orange + 3-O-Ethyl Ascorbic Acid",
    cta: "Shop Vitamin C Glow Range ↗",
    src: "matcher_vitc",
    concern: "vitc",
  },
  {
    id: "barrier-cream",
    name: "Barrier Repair Ceramide & Hyaluronic Cream",
    specs: "100g · 5 essential ceramides, fragrance-free",
    cta: "Shop Barrier Repair Range ↗",
    src: "matcher_barrier",
    concern: "barrier",
  },
  {
    id: "lip-balm",
    name: "Gloss Boss Tinted Lip Balm SPF 30",
    specs: "12g · Shea butter + Vitamin E sun protection",
    cta: "Shop Lip Care Essentials ↗",
    src: "matcher_barrier",
    concern: "barrier",
  },
];

const TABS: { id: Concern; label: string }[] = [
  { id: "all", label: "All Best-Sellers" },
  { id: "watermelon", label: "Sun & Hydration (Watermelon)" },
  { id: "cica", label: "Acne & Spots (Cica + Niacinamide)" },
  { id: "vitc", label: "Glow & Brightening (Vitamin C)" },
  { id: "barrier", label: "Barrier Repair (Ceramides)" },
];

export default function DotAndKeyStorePage({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [concern, setConcern] = useState<Concern>("all");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "dotandkey.com";
  const hubHref = storeGoHref("dot-and-key", "store_hub");

  const visible = useMemo(
    () => (concern === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.concern === concern)),
    [concern],
  );

  const mobileHref = topOffer
    ? storeGoHref("dot-and-key", topOffer.code ? `offer_${topOffer.code.toLowerCase().replace(/[^a-z0-9]+/g, "_")}` : "offer")
    : storeGoHref("dot-and-key", "mobile_sticky");

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="Dot & Key Skincare"
        subtitle="Fruit-Infused Active Skincare & Dermatologist-Tested Formulations"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={hubHref}
        ctaLabel="Shop Dot & Key"
        offers={offers}
        perks={[
          { label: "Top Code", value: topOffer?.code ?? "Check live offers" },
          { label: "Shipping", value: "Free above live cart threshold" },
          { label: "Prepaid Checkout", value: "Extra UPI/Card Perks" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <OfferCard
              key={o.id || o.code}
              bookmarkId={o.id}
              code={o.code}
              badge={o.badge}
              title={o.title}
              description={o.description}
              ctaHref={storeGoHref(
                "dot-and-key",
                o.code ? `offer_${o.code.toLowerCase().replace(/[^a-z0-9]+/g, "_")}` : "offer_card",
              )}
              expiresAt={o.expiresAt}
            />
          ))}
        </div>
      ) : (
        <ExploreStoreCta storeName="Dot & Key Skincare" href={hubHref} />
      )}

      <section
        aria-labelledby="checkout-checklist"
        className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6"
      >
        <h2 id="checkout-checklist" className="text-lg font-bold text-ink">
          Smart Checkout Checklist on DotAndKey.com
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Dot & Key promotions, bundle pricing and payment perks can change — use this quick checklist on the
          official site before you pay.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-ink">
          <li className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>
              <span className="font-semibold">Compare cart value:</span> check whether a sitewide B2G2 (4 items) or a
              pre-bundled 2-step routine combo gives you the better final price.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>
              <span className="font-semibold">Choose UPI/Prepaid at checkout:</span> prepaid orders are typically eligible
              for faster (7 working day) refund processing and may unlock extra prepaid perks shown at checkout.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
            <span>
              <span className="font-semibold">Confirm code applicability:</span> verify which single promo code (if any)
              applies to your cart and that the discount reflects correctly before placing the order.
            </span>
          </li>
        </ul>
        <p className="mt-3 text-[11px] leading-4 text-ink-soft">
          Tip: free-shipping thresholds and offer eligibility can vary during sales — confirm the cart progress bar and
          final total on dotandkey.com.
        </p>
      </section>

      <section
        id="tool"
        aria-labelledby="fruit-active-matcher"
        className="scroll-mt-24 rounded-2xl border border-ledger-line bg-white p-5 sm:p-6"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-inkblue">Shop by skin concern</p>
        <h2 id="fruit-active-matcher" className="mt-1 text-lg font-bold text-ink">
          Fruit-Active Ingredient Matcher
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Pick a concern to filter best-sellers, then shop the matching range on the official Dot & Key store.
        </p>

        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Shop by need">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={concern === t.id}
              onClick={() => setConcern(t.id)}
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                concern === t.id
                  ? "bg-ink text-white"
                  : "bg-white text-ink-soft ring-1 ring-ledger-line hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {visible.map((p) => (
            <article
              key={p.id}
              className="flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-inkblue hover:shadow-sm"
            >
              <h3 className="text-sm font-semibold leading-snug text-ink">{p.name}</h3>
              <p className="mt-1 text-xs leading-5 text-ink-soft">{p.specs}</p>
              <a
                href={storeGoHref("dot-and-key", p.src)}
                target="_blank"
                rel={GO_REL}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {p.cta}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-ink-soft">
          Product availability, formulations and pricing are shown on dotandkey.com — confirm live details before purchase.
        </p>
      </section>

      <FaqSection eyebrow="Dot & Key Skincare FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={mobileHref}
          target="_blank"
          rel={GO_REL}
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
              {topOffer ? topOffer.title : "Check live range & offers on Dot & Key"}
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
