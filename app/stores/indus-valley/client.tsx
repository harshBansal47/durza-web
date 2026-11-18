"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import type { StoreOfferCard } from "@/lib/store-offers";

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Concern = "all" | "colour" | "scalp" | "glow";

type Product = {
  id: string;
  name: string;
  specs: string;
  cta: string;
  src: string;
  targetUrl: string;
  concern: Exclude<Concern, "all">;
};

const REL = "nofollow sponsored noopener noreferrer";

const vcomLink = (targetUrl: string, p1: string): string =>
  `https://track.vcommission.com/click?campaign_id=12859&pub_id=133499&url=${encodeURIComponent(targetUrl)}&p1=${encodeURIComponent(p1)}`;

const PRODUCTS: Product[] = [
  {
    id: "gel-colour",
    name: "Indus Valley Damage-Free Gel Hair Colour",
    specs: "Ammonia-free, hydrogen peroxide-free & bleach-free gel colour with aloe vera and organic herb base",
    cta: "Shop Damage-Free Gel Hair Colour ↗",
    src: "matcher_gel_colour",
    targetUrl: "https://www.buyindusvalley.in/products/gel-hair-colour",
    concern: "colour",
  },
  {
    id: "henna-indigo",
    name: "Indus Valley Bio-Organic Henna & Indigo Powder Combo",
    specs: "100% botanical, completely PPD-free henna & indigo powders for natural hair colouring",
    cta: "Shop 100% Botanical Henna & Indigo ↗",
    src: "matcher_henna_indigo",
    targetUrl: "https://www.buyindusvalley.in/products/bio-organic-henna-indigo-powder-combo",
    concern: "colour",
  },
  {
    id: "aqua-colour",
    name: "Indus Valley 100% Botanical Aqua Hair Colour",
    specs: "Completely PPD-free botanical aqua colour for strict PPD-sensitive users (patch test recommended)",
    cta: "Shop PPD-Free Aqua Hair Colour ↗",
    src: "matcher_aqua_colour",
    targetUrl: "https://www.buyindusvalley.in/products/aqua-hair-colour",
    concern: "colour",
  },
  {
    id: "growout-combo",
    name: "Indus Valley Growout Hairfall Control Oil & Shampoo Combo",
    specs: "Hairfall control oil and shampoo regimen for scalp care and stronger-feeling hair",
    cta: "Shop Hairfall Control Regimen ↗",
    src: "matcher_growout",
    targetUrl: "https://www.buyindusvalley.in/products/growout-hair-oil-shampoo-combo",
    concern: "scalp",
  },
  {
    id: "depigmentation-gel",
    name: "Indus Valley Brightening Depigmentation Gel",
    specs: "Targeted depigmentation and pigmentation-care gel for brighter-looking skin",
    cta: "Shop Depigmentation & Pigmentation Care ↗",
    src: "matcher_depigmentation",
    targetUrl: "https://www.buyindusvalley.in/products/brightening-depigmentation-gel",
    concern: "glow",
  },
  {
    id: "pigmentation-regime",
    name: "Indus Valley AM to PM Complete Pigmentation Removal Regime",
    specs: "4-step AM to PM pigmentation care regimen kit for a complete routine",
    cta: "Shop 4-Step Pigmentation Kit ↗",
    src: "matcher_depigmentation",
    targetUrl: "https://www.buyindusvalley.in/products/pigmentation-regime",
    concern: "glow",
  },
  {
    id: "hair-spa-mask",
    name: "Indus Valley Deep Nourishing Hair Ultima Spa Mask",
    specs: "Deep nourishing hair spa mask for repair, softness and scalp pampering",
    cta: "Shop Hair Spa & Repair Masks ↗",
    src: "matcher_hair_spa",
    targetUrl: "https://www.buyindusvalley.in/products/hair-ultima-spa-mask",
    concern: "scalp",
  },
];

const TABS: { id: Concern; label: string }[] = [
  { id: "all", label: "All Best-Sellers" },
  { id: "colour", label: "Ammonia-Free Hair Color" },
  { id: "scalp", label: "Hairfall & Scalp Spa" },
  { id: "glow", label: "Depigmentation & Glow" },
];

export default function IndusValleyStorePage({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [concern, setConcern] = useState<Concern>("all");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "buyindusvalley.in";
  const hubHref = vcomLink(storeUrl ?? "https://www.buyindusvalley.in", "store_hub");

  const visible = useMemo(
    () => (concern === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.concern === concern)),
    [concern],
  );

  const mobileHref = vcomLink(
    topOffer?.targetUrl ?? storeUrl ?? "https://www.buyindusvalley.in",
    "mobile_sticky",
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="Indus Valley Bio-Organic"
        subtitle="Ammonia-Free Gel Hair Colors, 100% Botanical Henna & Indigo, and Organic Skin Care"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={hubHref}
        ctaLabel="Shop Indus Valley"
        offers={offers}
        perks={[
          { label: "Top Code", value: topOffer?.code ?? "Check live offers" },
          { label: "Shipping", value: "Free above live cart threshold" },
          { label: "Checkout", value: "Single code per order" },
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
              ctaHref={vcomLink(o.targetUrl, o.code ? `offer_${o.code.toLowerCase().replace(/[^a-z0-9]+/g, "_")}` : "offer_card")}
              expiresAt={o.expiresAt}
            />
          ))}
        </div>
      ) : (
        <ExploreStoreCta storeName="Indus Valley Bio-Organic" href={hubHref} />
      )}

      <section
        aria-labelledby="shipping-coupon-guidance"
        className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6"
      >
        <h2 id="shipping-coupon-guidance" className="text-lg font-bold text-ink">
          Shipping & Coupon Guidance on buyindusvalley.in
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          <li>
            <span className="font-semibold text-ink">Free shipping:</span> Free standard shipping across India on
            orders meeting the live cart threshold shown on buyindusvalley.in (verify in cart drawer
            before checkout).
          </li>
          <li>
            <span className="font-semibold text-ink">Coupon stacking:</span> Only one promo code applies per Shopify
            checkout. FIRST10 is designed for first-time shoppers, while AC10 targets combos and regimens—test which
            code yields the lowest final total alongside any automatic prepaid UPI discount shown at checkout.
          </li>
        </ul>
      </section>

      <section
        id="tool"
        aria-labelledby="hair-skin-matcher"
        className="scroll-mt-24 rounded-2xl border border-ledger-line bg-white p-5 sm:p-6"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-inkblue">Shop by need</p>
        <h2 id="hair-skin-matcher" className="mt-1 text-lg font-bold text-ink">
          Hair &amp; Skin Solution Matcher
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Choose a concern to filter Indus Valley best-sellers, then shop the matching range on the official store.
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
                href={vcomLink(p.targetUrl, p.src)}
                target="_blank"
                rel={REL}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {p.cta}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-ink-soft">
          Product availability, formulations and pricing are shown on buyindusvalley.in — confirm live details and
          perform a 48-hour patch test before applying any hair colour.
        </p>
      </section>

      <FaqSection eyebrow="Indus Valley Bio-Organic FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={mobileHref}
          target="_blank"
          rel={REL}
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
              {topOffer ? topOffer.title : "Check live range & offers on Indus Valley"}
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
