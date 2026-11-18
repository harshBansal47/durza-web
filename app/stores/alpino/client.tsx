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

type Tab = "protein" | "natural" | "oats" | "bulk";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  protein: {
    label: "Extra Protein Per Spoon",
    name: "High-Protein Peanut Butter (Whey & Plant Variants)",
    detail: "Boosted protein density in Dark Chocolate, Classic, and Crunch textures.",
    cta: "Shop High-Protein Peanut Butter",
    src: "matcher-protein",
  },
  natural: {
    label: "Clean Unsweetened Spread",
    name: "100% Natural Organic Peanut & Almond Butters",
    detail: "Single-ingredient roasted nuts with zero added sugar, salt, or emulsifiers.",
    cta: "Shop Natural Nut Butters",
    src: "matcher-natural",
  },
  oats: {
    label: "5-Minute High-Protein Breakfast",
    name: "Alpino Super Rolled Oats (Chocolate & Peanut Butter)",
    detail: "Whole-grain oats fortified with whey/plant protein and chia seeds.",
    cta: "Shop Super Rolled Oats",
    src: "matcher-oats",
  },
  bulk: {
    label: "Monthly Gym & Family Stock-Up",
    name: "2.5 kg Mega Jars & Multi-Pack Combos",
    detail: "Larger jar formats designed for daily smoothie and toast routines.",
    cta: "Shop Mega Jars & Combos",
    src: "matcher-bulk",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function PantryIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="22" cy="24" rx="10" ry="12" />
      <path d="M22 12v24" />
      <path d="M36 44c8 0 14-4 14-10s-6-10-14-10-10 4-10 10 2 10 10 10Z" />
      <path d="M40 28c2-8 8-12 14-10-2 8-8 12-14 10Z" />
      <path d="M44 38v6M40 40v4M48 40v4" />
    </svg>
  );
}

export default function AlpinoClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("protein");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://alpino.store/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "alpino.store";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Alpino"
        subtitle="Slow-roasted peanuts blended with whey or plant protein, high-fiber rolled oats, and zero hydrogenated palm oil—built for effortless daily protein."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/alpino.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("alpino", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="alpino-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="alpino-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Alpino — High-Protein Peanut Butter, Super Oats &amp; Clean Pantry Staples
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Slow-roasted peanuts blended with whey or plant protein, high-fiber rolled oats, and zero hydrogenated palm
          oil—built for effortless daily protein.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Natural peanut butter separates a thin layer of peanut oil on top
          because it skips hydrogenated palm-oil stabilizers—a quick 15-second stir brings back a creamy spread.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="alpino-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Nutrition Matcher</p>
        <h2 id="alpino-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Pick your Alpino pantry goal
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right spread or breakfast staple. Every CTA opens the official Alpino store via a tracked link.
        </p>

        <div role="tablist" aria-label="Alpino matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`alpino-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`alpino-panel-${tab.id}`}
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
          id={`alpino-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`alpino-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-800">
              <PantryIcon />
              <span className="sr-only">Zero Palm Oil · Slow-Roasted · High Protein</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Zero Palm Oil · Slow-Roasted · High Protein</p>
              <a
                href={storeGoHref("alpino", match.src)}
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
          <StoreGuideLink slug="alpino" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/daily-longevity-and-desk-worker-wellness-stack" className="font-medium text-durza-deep hover:underline">Daily longevity &amp; desk-worker wellness stack</Link></li>
          <li><Link href="/stores/healthkart" className="font-medium text-durza-deep hover:underline">HealthKart store guide</Link></li>
          <li><Link href="/stores/beast-life" className="font-medium text-durza-deep hover:underline">BeastLife store guide</Link></li>
          <li><Link href="/categories/grocery" className="font-medium text-durza-deep hover:underline">Grocery category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on alpino.store.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("alpino", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Alpino"
        href={storeGoHref("alpino", "store-page-bottom")}
        description="Browse the full Alpino range and check live availability, combos, and terms directly on the official store."
      />

      <FaqSection eyebrow="Alpino FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to Alpino (alpino.store). Product availability and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
