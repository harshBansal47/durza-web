"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import StoreGuideLink from "@/components/stores/StoreGuideLink";
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

type Tab = "early" | "active" | "teen" | "plant";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  early: {
    label: "Ages 4–7 Years (Early Growth)",
    name: "Gritzo SuperMilk 4–7y (Double Chocolate & Mango)",
    detail: "Gentle daily protein with colostrum, DHA, and bone-supporting calcium/D3.",
    cta: "Shop SuperMilk 4–7y",
    src: "matcher-4-7",
  },
  active: {
    label: "Ages 8–12 Years (Active Schoolers)",
    name: "Gritzo SuperMilk Height+ & Active (8–12y Boys/Girls)",
    detail: "Tailored micronutrients (iron for girls, zinc/magnesium for active schoolers) plus 100% RDA vitamins.",
    cta: "Shop SuperMilk 8–12y",
    src: "matcher-8-12",
  },
  teen: {
    label: "Ages 13+ Years (Teen & Sports)",
    name: "Gritzo SuperMilk Teen & Sports (13y+ Boys/Girls)",
    detail: "Higher protein per scoop paired with electrolytes and B-vitamins for teenage growth spurts.",
    cta: "Shop SuperMilk Teen & Sports",
    src: "matcher-13-plus",
  },
  plant: {
    label: "Lactose-Free & Dairy-Sensitive",
    name: "Gritzo Plant-Based SuperMilk Range",
    detail: "Pea-and-brown-rice protein sweetened naturally without dairy whey.",
    cta: "Shop Plant-Based SuperMilk",
    src: "matcher-plant-based",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function GrowthIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 48h10v-10H14v10Z" />
      <path d="M27 48h10V30H27v18Z" />
      <path d="M40 48h10V20H40v28Z" />
      <path d="M19 34V24c0-4 3-7 7-7h6" />
      <path d="M32 17c4 0 8 2 10 6" />
      <path d="M46 18c2 2 3 4 3 6" />
    </svg>
  );
}

export default function GritzoClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("early");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://gritzo.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "gritzo.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Gritzo"
        subtitle="Whey and plant protein blends formulated specifically for 4–7y, 8–12y, and 13+ growth stages—with zero refined sugar, artificial flavors, or preservatives."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/gritzo.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("gritzo", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="gritzo-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="gritzo-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Gritzo — Age- &amp; Gender-Personalized SuperMilk Protein for Kids &amp; Teens
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Whey and plant protein blends formulated specifically for 4–7y, 8–12y, and 13+ growth stages—with zero refined sugar,
          artificial flavors, or preservatives.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> A 13-year-old teen athlete needs roughly double the daily protein
          per scoop of a 5-year-old—splitting formulas by age and gender avoids under-dosing teens or overloading younger kids.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="gritzo-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Nutrition Matcher</p>
        <h2 id="gritzo-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose the right Gritzo stage
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to match age and dietary needs. Every CTA opens the official Gritzo store via a tracked link.
        </p>

        <div role="tablist" aria-label="Gritzo matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`gritzo-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`gritzo-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-amber-700 bg-amber-700 text-white" : "border-ledger-line bg-white text-ink hover:border-amber-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`gritzo-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`gritzo-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-700">
              <GrowthIcon />
              <span className="sr-only">4–7y · 8–12y · 13+ Personalized · Zero Refined Sugar</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">4–7y · 8–12y · 13+ Personalized · Zero Refined Sugar</p>
              <a
                href={storeGoHref("gritzo", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related guides and stores</h2>
        <div className="mt-4">
          <StoreGuideLink slug="gritzo" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/healthkart" className="font-medium text-durza-deep hover:underline">HealthKart store guide</Link></li>
          <li><Link href="/stores/alpino" className="font-medium text-durza-deep hover:underline">Alpino store guide</Link></li>
          <li><Link href="/categories/baby-kids" className="font-medium text-durza-deep hover:underline">Baby &amp; Kids category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on gritzo.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("gritzo", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Gritzo"
        href={storeGoHref("gritzo", "store-page-bottom")}
        description="Browse the full Gritzo range and check live availability, ingredient labels, and terms directly on the official store."
      />

      <FaqSection eyebrow="Gritzo FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to Gritzo (gritzo.com). Product availability and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
