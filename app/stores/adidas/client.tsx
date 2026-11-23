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

type Tab = "road" | "race" | "street" | "gym";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  road: {
    label: "Daily Road Running",
    name: "Ultraboost & Supernova Cushioning Series",
    detail: "Plush heel-to-toe energy return built for 5K–21K pavement runs.",
    cta: "Shop Road Running",
    src: "matcher-road-running",
  },
  race: {
    label: "Speed & Race Day",
    name: "Adizero Boston & Adios Pro Lineup",
    detail: "Ultra-light Lightstrike Pro foam with EnergyRods for tempo sessions.",
    cta: "Shop Race Day Shoes",
    src: "matcher-race-day",
  },
  street: {
    label: "Streetwear & Classic Sneakers",
    name: "Samba OG, Gazelle & Stan Smith Originals",
    detail: "Full-grain leather and suede heritage silhouettes.",
    cta: "Shop Originals",
    src: "matcher-streetwear",
  },
  gym: {
    label: "Gym, Football & Cricket",
    name: "Dropset Training Shoes & Official Team Jerseys",
    detail: "Flat, stable heel geometry for heavy squats and deadlifts.",
    cta: "Shop Training & Sport",
    src: "matcher-gym",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function EnergyWaveIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 42c6-10 10-10 16 0s10 10 16 0 10-10 12-6" />
      <path d="M10 32c6-10 10-10 16 0s10 10 16 0 10-10 12-6" />
      <path d="M14 50h36" />
      <path d="M18 22l6 4 8-8 8 6 6-4" />
    </svg>
  );
}

export default function AdidasClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("road");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.adidas.co.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "adidas.co.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Adidas India"
        subtitle="From Lightstrike Pro marathon racers to timeless Samba and Gazelle silhouettes—unlock official adiClub member drops and direct size exchanges."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/adidas.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("adidas", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="adidas-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="adidas-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Adidas India — Performance Running Tech, Originals &amp; adiClub Perks
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          From Lightstrike Pro marathon racers to timeless Samba and Gazelle silhouettes—unlock official adiClub member drops
          and direct size exchanges.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Boost midsole capsules return energy on concrete roads without
          stiffening in winter, while Continental™ rubber outsoles grip wet monsoon asphalt.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="adidas-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Sport Matcher</p>
        <h2 id="adidas-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Adidas use case
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to see a recommended lineup. Every CTA opens the official Adidas India store via a tracked link.
        </p>

        <div role="tablist" aria-label="Adidas matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`adidas-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`adidas-panel-${tab.id}`}
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
          id={`adidas-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`adidas-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-slate-50 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800">
              <EnergyWaveIcon />
              <span className="sr-only">Continental™ Grip · adiClub Member Access</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Continental™ Grip · adiClub Member Access</p>
              <a
                href={storeGoHref("adidas", match.src)}
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
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related guides and categories</h2>
        <div className="mt-4">
          <StoreGuideLink slug="adidas" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/indian-home-gym-and-running-starter-kit" className="font-medium text-durza-deep hover:underline">Indian home gym &amp; running starter kit</Link></li>
          <li><Link href="/stores/boldfit" className="font-medium text-durza-deep hover:underline">Boldfit store guide</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on adidas.co.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("adidas", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Adidas India"
        href={storeGoHref("adidas", "store-page-bottom")}
        description="Browse the full Adidas India range and check live availability, current pricing, and member perks directly on the official store."
      />

      <FaqSection eyebrow="Adidas India FAQs" items={faqs} />

    
      <AffiliateDisclosure />
    </div>
  );
}
