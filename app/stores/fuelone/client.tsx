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

type Tab = "whey" | "lean" | "creatine" | "mass";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  whey: {
    label: "Daily Post-Workout Protein",
    name: "Fuel One Whey Max (24g+ Protein Per Scoop)",
    detail: "Balanced whey concentrate-isolate blend for daily muscle recovery.",
    cta: "Shop Whey Max",
    src: "matcher-whey-max",
  },
  lean: {
    label: "Lean Cut & Low-Carb Macros",
    name: "Fuel One Iso-Max Whey Isolate",
    detail: "Higher protein-to-calorie ratio with minimal lactose and fats.",
    cta: "Shop Iso-Max",
    src: "matcher-iso-max",
  },
  creatine: {
    label: "Strength & Rep Power",
    name: "Fuel One Micronized Creatine Monohydrate",
    detail: "Unflavored, fast-dissolving creatine to stack into your post-workout shake.",
    cta: "Shop Creatine",
    src: "matcher-creatine",
  },
  mass: {
    label: "High-Calorie Hardgainer",
    name: "Fuel One Mass Gainer & 2 kg Value Buckets",
    detail: "Clean complex-carb and protein ratios for calorie-surplus phases.",
    cta: "Shop Mass Gainer",
    src: "matcher-mass-gainer",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function LabScoopIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 18h20l-4 10H26l-4-10Z" />
      <path d="M26 28v18a6 6 0 0 0 12 0V28" />
      <path d="M18 46h28" />
      <path d="M42 14l8 8" />
      <path d="M46 12l6 6" />
      <path d="M20 36l-4 4 4 4 4-4-4-4Z" />
    </svg>
  );
}

export default function FuelOneClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("whey");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://fuelone.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "fuelone.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Fuel One"
        subtitle="No-frills, lab-tested whey protein and micronized creatine engineered by MuscleBlaze for serious daily lifters who care about protein-per-scoop value."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/fuelone.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("fuelone", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="fuelone-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="fuelone-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Fuel One — High-Protein Whey Max &amp; Creatine Backed by MuscleBlaze Labs
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          No-frills, lab-tested whey protein and micronized creatine engineered by MuscleBlaze for serious daily lifters who
          care about protein-per-scoop value.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Each Fuel One tub carries a unique scratch-code authenticity seal
          and batch lab report—so you can verify exact protein percentage before opening the inner foil.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="fuelone-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Stack Matcher</p>
        <h2 id="fuelone-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Fuel One goal
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right supplement format. Every CTA opens the official Fuel One store via a tracked link.
        </p>

        <div role="tablist" aria-label="Fuel One matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`fuelone-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`fuelone-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-slate-900 bg-slate-900 text-white" : "border-ledger-line bg-white text-ink hover:border-slate-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`fuelone-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`fuelone-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-slate-50 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800">
              <LabScoopIcon />
              <span className="sr-only">MuscleBlaze Lab-Tested · Scratch-Code Seal</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">MuscleBlaze Lab-Tested · Scratch-Code Seal</p>
              <a
                href={storeGoHref("fuelone", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
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
          <StoreGuideLink slug="fuelone" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/indian-home-gym-and-running-starter-kit" className="font-medium text-durza-deep hover:underline">Indian home gym &amp; running starter kit</Link></li>
          <li><Link href="/stores/healthkart" className="font-medium text-durza-deep hover:underline">HealthKart store guide</Link></li>
          <li><Link href="/stores/beast-life" className="font-medium text-durza-deep hover:underline">BeastLife store guide</Link></li>
          <li><Link href="/categories/supplements" className="font-medium text-durza-deep hover:underline">Supplements category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on fuelone.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("fuelone", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Fuel One"
        href={storeGoHref("fuelone", "store-page-bottom")}
        description="Browse the full Fuel One range and check live availability, authenticity details, and terms directly on the official store."
      />

      <FaqSection eyebrow="Fuel One FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
