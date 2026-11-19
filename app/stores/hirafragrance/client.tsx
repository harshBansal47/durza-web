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

type Tab = "office" | "woody" | "floral" | "gift";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  office: {
    label: "Subtle Office & Daily Wear",
    name: "Fresh Aqua, White Musk & Citrus Roll-Ons",
    detail: "Clean, non-intrusive skin scents suited for air-conditioned offices and commutes.",
    cta: "Shop Fresh Roll-Ons",
    src: "matcher-office",
  },
  woody: {
    label: "Rich Woody, Oud & Amber",
    name: "Traditional Oud, Sandalwood & Saffron Attars",
    detail: "Deep resinous base notes built for evenings and cooler weather.",
    cta: "Shop Oud & Amber Attars",
    src: "matcher-woody-oud",
  },
  floral: {
    label: "Floral & Sweet Everyday",
    name: "Damask Rose, Jasmine & Vanilla Oil Blends",
    detail: "Soft botanical heart notes that layer well under spray perfumes.",
    cta: "Shop Floral Blends",
    src: "matcher-floral",
  },
  gift: {
    label: "Discovery & Gift Packs",
    name: "Multi-Vial Assorted Attar Gift Boxes",
    detail: "Travel-friendly roll-on sets for sampling multiple scent families.",
    cta: "Shop Gift Packs",
    src: "matcher-gift-packs",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function AttarIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 18h16l-2 8H26l-2-8Z" />
      <path d="M26 26h12v24a6 6 0 0 1-12 0V26Z" />
      <circle cx="32" cy="14" r="4" />
      <path d="M32 38v6" />
      <path d="M44 16c4 2 6 5 6 8M48 12c5 2 8 6 8 11" />
    </svg>
  );
}

export default function HiraFragranceClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("office");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://hirafragrance.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "hirafragrance.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Hira Fragrance"
        subtitle="Pocket-sized, 100% alcohol-free concentrated perfume oils that sit close to the skin without harsh ethanol evaporation in Indian heat."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/hirafragrance.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("hirafragrance", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="hira-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="hira-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Hira Fragrance — Alcohol-Free Roll-On Attars &amp; Long-Lasting Perfume Oils
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Pocket-sized, 100% alcohol-free concentrated perfume oils that sit close to the skin without harsh ethanol
          evaporation in Indian heat.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Because attars use a carrier oil base instead of volatile alcohol,
          they don&apos;t flash off in 35°C heat—warming slowly on pulse points for steady, intimate sillage.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="hira-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Scent Matcher</p>
        <h2 id="hira-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Find your Hira attar profile
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to explore scent families. Every CTA opens the official Hira Fragrance store via a tracked link.
        </p>

        <div role="tablist" aria-label="Hira Fragrance matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`hira-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`hira-panel-${tab.id}`}
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
          id={`hira-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`hira-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-700">
              <AttarIcon />
              <span className="sr-only">100% Alcohol-Free · Concentrated Roll-On Oils</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">100% Alcohol-Free · Concentrated Roll-On Oils</p>
              <a
                href={storeGoHref("hirafragrance", match.src)}
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
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related collections and stores</h2>
        <div className="mt-4">
          <StoreGuideLink slug="hirafragrance" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="font-medium text-durza-deep hover:underline">Wedding &amp; festive luxury gifting edit (India)</Link></li>
          <li><Link href="/stores/neesh-perfumes" className="font-medium text-durza-deep hover:underline">Neesh Perfumes store guide</Link></li>
          <li><Link href="/stores/the-man-company" className="font-medium text-durza-deep hover:underline">The Man Company store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on hirafragrance.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("hirafragrance", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Hira Fragrance"
        href={storeGoHref("hirafragrance", "store-page-bottom")}
        description="Browse the full Hira Fragrance range and check live availability, scent notes, and terms directly on the official store."
      />

      <FaqSection eyebrow="Hira Fragrance FAQs" items={faqs} />

      
      <AffiliateDisclosure />
    </div>
  );
}
