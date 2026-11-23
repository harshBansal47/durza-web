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

type Concern = "oily" | "dry" | "dull" | "acne";

type Product = {
  id: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Concern, { label: string; sublabel: string; product: Product }> = {
  oily: {
    label: "Oily & Humid-Weather SPF",
    sublabel: "Lightweight daily UV protection for humid Indian weather",
    product: {
      id: "watermelon-sunscreen",
      name: "Watermelon Cooling Hyaluronic Sunscreen (SPF 50 PA++++)",
      detail: "Water-light gel texture that cools skin on contact with zero white cast.",
      cta: "Shop Watermelon Cooling Sunscreen",
      src: "matcher-sunscreen",
    },
  },
  dry: {
    label: "Dry & Over-Exfoliated Skin",
    sublabel: "Barrier-first cleanse and moisture support",
    product: {
      id: "barrier-repair",
      name: "Barrier Repair + Hydrating Gentle Face Wash & Ceramide Cream",
      detail: "Five essential ceramides plus Japanese rice water to calm redness.",
      cta: "Shop Barrier Repair Routine",
      src: "matcher-barrier",
    },
  },
  dull: {
    label: "Dullness & Dark Spots",
    sublabel: "Brightening serum for uneven tone",
    product: {
      id: "vitc-serum",
      name: "10% Vitamin C + E Super Bright Serum",
      detail: "Triple-vitamin blend paired with Sicilian blood orange for uneven skin tone.",
      cta: "Shop Vitamin C Serum",
      src: "matcher-vitc",
    },
  },
  acne: {
    label: "Acne & Clogged Pores",
    sublabel: "Clarifying care without stripping moisture",
    product: {
      id: "cica-salicylic",
      name: "Cica + 2% Salicylic Acid Gel Range",
      detail: "Centella asiatica calms active breakouts without stripping moisture.",
      cta: "Shop Cica Salicylic Range",
      src: "matcher-acne",
    },
  },
};

const TABS = (Object.keys(MATCHES) as Concern[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function MatcherIcon({ concern }: { concern: Concern }) {
  if (concern === "oily") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="32" cy="26" r="10" />
        <path d="M32 8v6M32 38v6M14 26h6M44 26h6M19 13l4 4M41 35l4 4M45 13l-4 4M23 35l-4 4" />
        <path d="M32 42c6 4 10 8 10 12a10 10 0 1 1-20 0c0-4 4-8 10-12Z" />
      </svg>
    );
  }
  if (concern === "dry") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 40V22a14 14 0 0 1 28 0v18" />
        <path d="M14 40h36v6a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8v-6Z" />
        <path d="M26 18c0 6 3 8 6 8s6-2 6-8" />
        <path d="M24 48h16" />
      </svg>
    );
  }
  if (concern === "dull") {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="32" cy="32" r="10" />
        <path d="M32 10v8M32 46v8M10 32h8M46 32h8M16 16l6 6M42 42l6 6M48 16l-6 6M22 42l-6 6" />
        <path d="M28 32h8M32 28v8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 10c10 8 16 16 16 26a16 16 0 1 1-32 0c0-10 6-18 16-26Z" />
      <path d="M32 24v10" />
      <circle cx="32" cy="40" r="1.5" fill="currentColor" stroke="none" />
      <path d="M22 30c2 2 4 3 6 3M42 30c-2 2-4 3-6 3" />
    </svg>
  );
}

export default function DotAndKeyClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Concern>("oily");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.dotandkey.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "dotandkey.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Dot & Key"
        subtitle="Lightweight SPF 50 PA++++ sunscreens and ceramide moisturizers that sink in fast without leaving a chalky white cast in 38°C humidity."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/dot-and-key.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("dot-and-key", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="dotkey-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="dotkey-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Dot &amp; Key — Gel Sunscreens &amp; Barrier Actives Built for Indian Weather
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Lightweight SPF 50 PA++++ sunscreens and ceramide moisturizers that sink in fast without leaving a chalky white
          cast in 38°C humidity.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> PA++++ measures UVA protection—the rays that cause tanning and
          dark spots through window glass even on cloudy monsoon afternoons.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="dotkey-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Concern Matcher</p>
        <h2 id="dotkey-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Pick your skin concern
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Choose a concern tab to see a best-fit Dot &amp; Key routine. Every CTA opens the official store via a tracked link.
        </p>

        <div role="tablist" aria-label="Dot & Key concern matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`dotkey-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`dotkey-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-[#0f766e] bg-[#0f766e] text-white" : "border-ledger-line bg-white text-ink hover:border-[#0f766e]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`dotkey-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`dotkey-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-[#f7fffc] p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
              <MatcherIcon concern={active} />
              <span className="sr-only">SPF 50 · PA++++ · Zero White Cast</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{match.sublabel}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.product.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.product.detail}</p>
              {active === "oily" && (
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">SPF 50 · PA++++ · Zero White Cast</p>
              )}
              <a
                href={storeGoHref("dot-and-key", match.product.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#0f766e] px-5 text-sm font-semibold text-white transition hover:bg-[#115e59]"
              >
                {match.product.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Keep researching before you buy</h2>
        <div className="mt-4">
          <StoreGuideLink slug="dot-and-key" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/indian-humidity-and-monsoon-skincare-kit" className="font-medium text-durza-deep hover:underline">Indian humidity &amp; monsoon skincare kit</Link></li>
          <li><Link href="/guides/indian-skincare-actives-haircare-guide" className="font-medium text-durza-deep hover:underline">Indian skincare actives &amp; haircare guide</Link></li>
          <li><Link href="/stores/kama-ayurveda" className="font-medium text-durza-deep hover:underline">Kama Ayurveda store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on dotandkey.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("dot-and-key", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Dot & Key"
        href={storeGoHref("dot-and-key", "store-page-bottom")}
        description="Browse the full Dot & Key range and check live availability, current combos, and terms directly on the official store."
      />

      <FaqSection eyebrow="Dot & Key FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
