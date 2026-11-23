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

type Tab = "joint" | "iron" | "bone" | "liver";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  joint: {
    label: "Joint & Inflammation Recovery",
    name: "Nano Curcumin + Piperine & Boswellia Tablets",
    detail: "Water-dispersible curcuminoids formulated for post-workout and joint comfort.",
    cta: "Shop Nano Curcumin",
    src: "matcher-nano-curcumin",
  },
  iron: {
    label: "Gentle Plant-Based Iron & Energy",
    name: "Plant-Based Iron + Folic Acid + Vitamin C & B12",
    detail: "Curry-leaf derived iron designed to avoid the constipation caused by synthetic ferrous sulfate.",
    cta: "Shop Plant Iron",
    src: "matcher-plant-iron",
  },
  bone: {
    label: "Bone, Heart & Calcium Direction",
    name: "Lichen-Sourced Vegan Vitamin D3 + K2 (MK-7)",
    detail: "Pairs plant D3 with K2 so calcium directs into bones rather than soft tissues.",
    cta: "Shop Vegan D3 + K2",
    src: "matcher-d3-k2",
  },
  liver: {
    label: "Liver, Gut & Metabolic Support",
    name: "Milk Thistle, Berberine & Pre-Probiotic Formulas",
    detail: "Standardized botanical extracts in precision-dose capsules.",
    cta: "Shop Liver & Gut Support",
    src: "matcher-liver-gut",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function NanoLeafIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 46c8-2 14-8 16-18 8 2 14 8 16 18-8 4-24 6-32 0Z" />
      <path d="M34 28c6-8 12-12 18-14-2 8-6 14-14 18" />
      <circle cx="24" cy="22" r="8" />
      <circle cx="24" cy="22" r="3" />
    </svg>
  );
}

export default function ZeroHarmClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("joint");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.zeroharm.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "zeroharm.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="ZeroHarm"
        subtitle="100% plant-derived, aqueous nano-encapsulated supplements designed for gentle stomach absorption without synthetic binders or heavy metals."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/zeroharm.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("zeroharm", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="zh-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="zh-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          ZeroHarm — Nano-Formulated Plant Extracts for Higher Bioavailability
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          100% plant-derived, aqueous nano-encapsulated supplements designed for gentle stomach absorption without synthetic
          binders or heavy metals.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Raw turmeric curcumin has notoriously low gut absorption on its own;
          nano-encapsulation shrinks plant actives into microscopic water-soluble droplets so smaller doses absorb cleanly without
          stomach upset.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="zh-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Nutrition Matcher</p>
        <h2 id="zh-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your ZeroHarm focus
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right nano-formulated supplement. Every CTA opens the official ZeroHarm store via a tracked link.
        </p>

        <div role="tablist" aria-label="ZeroHarm matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`zh-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`zh-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-emerald-700 bg-emerald-700 text-white" : "border-ledger-line bg-white text-ink hover:border-emerald-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`zh-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`zh-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-emerald-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
              <NanoLeafIcon />
              <span className="sr-only">100% Plant-Based · Nano-Bioavailable · Zero Synthetics</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">100% Plant-Based · Nano-Bioavailable · Zero Synthetics</p>
              <a
                href={storeGoHref("zeroharm", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
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
          <StoreGuideLink slug="zeroharm" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/daily-longevity-and-desk-worker-wellness-stack" className="font-medium text-durza-deep hover:underline">Daily longevity &amp; desk-worker wellness stack</Link></li>
          <li><Link href="/stores/truebasics" className="font-medium text-durza-deep hover:underline">TrueBasics store guide</Link></li>
          <li><Link href="/stores/kapiva" className="font-medium text-durza-deep hover:underline">Kapiva store guide</Link></li>
          <li><Link href="/categories/supplements" className="font-medium text-durza-deep hover:underline">Supplements category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on zeroharm.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("zeroharm", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="ZeroHarm"
        href={storeGoHref("zeroharm", "store-page-bottom")}
        description="Browse the full ZeroHarm range and check live availability, ingredient details, and terms directly on the official store."
      />

      <FaqSection eyebrow="ZeroHarm FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
