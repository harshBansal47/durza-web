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

type Tab = "protein" | "beauty" | "wellness" | "packs";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  protein: {
    label: "Dairy-Free Muscle & Recovery",
    name: "Fitspire Vegan Plant Protein (Pea + Brown Rice)",
    detail: "Smooth-mixing, lactose-free daily protein in chocolate and coffee flavors.",
    cta: "Shop Plant Protein",
    src: "matcher-plant-protein",
  },
  beauty: {
    label: "Hair, Skin & Nail Support",
    name: "Plant-Based Biotin & Multivitamin Pectin Gummies",
    detail: "Fruit-pectin chewables made without animal gelatin.",
    cta: "Shop Biotin Gummies",
    src: "matcher-biotin-gummies",
  },
  wellness: {
    label: "Sleep, Focus & Stress Balance",
    name: "Melatonin, Ashwagandha & Apple Cider Vinegar Gummies",
    detail: "Convenient single-serving formats for busy schedules.",
    cta: "Shop Wellness Gummies",
    src: "matcher-wellness-gummies",
  },
  packs: {
    label: "Family & Value Routine Packs",
    name: "Multi-Jar & Gummy + Protein Starter Combos",
    detail: "Bundled stacks available directly on fitspire.online.",
    cta: "Shop Routine Packs",
    src: "matcher-routine-packs",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function VeganIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 46c4-10 10-16 18-18 0 10-4 18-18 18Z" />
      <path d="M34 28c4-10 10-14 16-14-2 10-8 14-16 14Z" />
      <ellipse cx="26" cy="20" rx="6" ry="10" />
      <path d="M40 36c8 0 12 4 12 8s-4 8-12 8-10-4-10-8 2-8 10-8Z" />
      <path d="M36 44h8M40 40v8" />
    </svg>
  );
}

export default function FitspireClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("protein");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://fitspire.online/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "fitspire.online";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Fitspire"
        subtitle="Dairy-free pea-and-brown-rice proteins, gelatin-free pectin gummies, and herbal wellness blends crafted for vegetarian Indian households."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/fitspire.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("fitspire", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="fitspire-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="fitspire-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Fitspire — Vegan Plant Proteins, Pectin Gummies &amp; Everyday Nutrition
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Dairy-free pea-and-brown-rice proteins, gelatin-free pectin gummies, and herbal wellness blends crafted for
          vegetarian Indian households.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-green-100 bg-green-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Combining pea protein (high in lysine) with brown rice protein
          (rich in methionine) creates a complete amino-acid profile comparable to dairy whey—without bloating or lactose.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="fitspire-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Wellness Matcher</p>
        <h2 id="fitspire-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Pick your Fitspire routine
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right plant-based nutrition option. Every CTA opens the official Fitspire store via a tracked link.
        </p>

        <div role="tablist" aria-label="Fitspire matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`fitspire-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`fitspire-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-green-700 bg-green-700 text-white" : "border-ledger-line bg-white text-ink hover:border-green-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`fitspire-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`fitspire-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-green-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-green-200 bg-white text-green-700">
              <VeganIcon />
              <span className="sr-only">100% Vegan · Gelatin-Free · Lactose-Free</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">100% Vegan · Gelatin-Free · Lactose-Free</p>
              <a
                href={storeGoHref("fitspire", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800"
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
          <StoreGuideLink slug="fitspire" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/daily-longevity-and-desk-worker-wellness-stack" className="font-medium text-durza-deep hover:underline">Daily longevity &amp; desk-worker wellness stack</Link></li>
          <li><Link href="/stores/alpino" className="font-medium text-durza-deep hover:underline">Alpino store guide</Link></li>
          <li><Link href="/stores/healthkart" className="font-medium text-durza-deep hover:underline">HealthKart store guide</Link></li>
          <li><Link href="/categories/supplements" className="font-medium text-durza-deep hover:underline">Supplements category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on fitspire.online.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("fitspire", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Fitspire"
        href={storeGoHref("fitspire", "store-page-bottom")}
        description="Browse the full Fitspire range and check live availability, ingredient details, and terms directly on the official store."
      />

      <FaqSection eyebrow="Fitspire FAQs" items={faqs} />

 
      <AffiliateDisclosure />
    </div>
  );
}
