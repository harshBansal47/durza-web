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

type Tab = "omega" | "stress" | "eye" | "multi";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  omega: {
    label: "Heart, Brain & Joint Support",
    name: "TrueBasics Ultra Omega-3 (High EPA & DHA)",
    detail: "Molecularly distilled, enteric-coated softgels designed for clean absorption without fishy aftertaste.",
    cta: "Shop Ultra Omega-3",
    src: "matcher-omega3",
  },
  stress: {
    label: "Stress, Sleep & Cortisol Balance",
    name: "TrueBasics Ashwagandha with KSM-66® Root Extract",
    detail: "Standardized full-spectrum root extract rather than unstandardized leaf powder.",
    cta: "Shop KSM-66 Ashwagandha",
    src: "matcher-ashwagandha",
  },
  eye: {
    label: "Screen Fatigue & Eye Protection",
    name: "TrueBasics Eye Shield with Lutemax 2020®",
    detail: "Lutein and zeaxanthin carotenoids tailored for 8+ hour screen workers.",
    cta: "Shop Eye Shield",
    src: "matcher-eye-shield",
  },
  multi: {
    label: "Age- & Gender-Specific Multis",
    name: "TrueBasics Multivitamin Men, Women & 50+ Formulations",
    detail: "Separate micronutrient ratios for metabolism, bone density, and immunity.",
    cta: "Shop Multivitamins",
    src: "matcher-multivitamins",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function ClinicalCapsuleIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="14" y="22" width="36" height="20" rx="10" />
      <path d="M32 22v20" />
      <circle cx="20" cy="14" r="3" />
      <circle cx="44" cy="14" r="3" />
      <path d="M20 17v5M44 17v5" />
      <path d="M32 46v6M26 52h12" />
    </svg>
  );
}

export default function TrueBasicsClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("omega");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.truebasics.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "truebasics.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="TrueBasics"
        subtitle="Targeted daily supplements built around clinically studied, trademarked ingredients—including Lutemax 2020®, KSM-66® Ashwagandha, and high-EPA/DHA Omega-3."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/truebasics.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("truebasics", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="tb-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="tb-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          TrueBasics — Patented Clinical Nutraceuticals, Omega-3 &amp; KSM-66®
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Targeted daily supplements built around clinically studied, trademarked ingredients—including Lutemax 2020®,
          KSM-66® Ashwagandha, and high-EPA/DHA Omega-3.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> On an Omega-3 label, total fish oil weight (1000 mg) matters far
          less than combined EPA + DHA concentration—higher EPA/DHA delivers clinical support in a single capsule instead of
          three.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="tb-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Clinical Matcher</p>
        <h2 id="tb-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your TrueBasics focus
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right formulation. Every CTA opens the official TrueBasics store via a tracked link.
        </p>

        <div role="tablist" aria-label="TrueBasics matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`tb-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`tb-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-sky-700 bg-sky-700 text-white" : "border-ledger-line bg-white text-ink hover:border-sky-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`tb-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tb-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-sky-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-700">
              <ClinicalCapsuleIcon />
              <span className="sr-only">Patented Actives · High EPA/DHA · FSSAI Compliant</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Patented Actives · High EPA/DHA · FSSAI Compliant</p>
              <a
                href={storeGoHref("truebasics", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-sky-700 px-5 text-sm font-semibold text-white transition hover:bg-sky-800"
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
          <StoreGuideLink slug="truebasics" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/daily-longevity-and-desk-worker-wellness-stack" className="font-medium text-durza-deep hover:underline">Daily longevity &amp; desk-worker wellness stack</Link></li>
          <li><Link href="/stores/hkvitals" className="font-medium text-durza-deep hover:underline">HK Vitals store guide</Link></li>
          <li><Link href="/stores/healthkart" className="font-medium text-durza-deep hover:underline">HealthKart store guide</Link></li>
          <li><Link href="/categories/supplements" className="font-medium text-durza-deep hover:underline">Supplements category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on truebasics.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("truebasics", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="TrueBasics"
        href={storeGoHref("truebasics", "store-page-bottom")}
        description="Browse the full TrueBasics range and check live availability, ingredient details, and terms directly on the official store."
      />

      <FaqSection eyebrow="TrueBasics FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to TrueBasics (truebasics.com). Product availability and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
