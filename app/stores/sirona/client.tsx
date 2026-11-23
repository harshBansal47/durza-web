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

type Tab = "cups" | "care" | "pads" | "travel";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  cups: {
    label: "First-Time Cup Users",
    name: "Sirona Medical-Grade Silicone Menstrual Cups (S / M / L)",
    detail: "Flexible rim with easy-grip stem for up to 8 hours of leak-free wear.",
    cta: "Shop Menstrual Cups",
    src: "matcher-cups",
  },
  care: {
    label: "Cup Sterilization & Wash",
    name: "Menstrual Cup Sterilizer Containers & Mild Cup Washes",
    detail: "pH-balanced cleansers that preserve medical-grade silicone integrity.",
    cta: "Shop Cup Care",
    src: "matcher-cup-care",
  },
  pads: {
    label: "Rash-Free Pads & Period Panties",
    name: "Organic Cotton Pads & Reusable Leak-Proof Period Panties",
    detail: "Breathable top sheets free from chlorine bleaching and synthetic fragrance.",
    cta: "Shop Pads & Period Panties",
    src: "matcher-pads-panties",
  },
  travel: {
    label: "Public Washroom & Travel Hygiene",
    name: "PeeBuddy Stand-and-Pee Funnels & Intimate Wipes",
    detail: "Compact hygiene essentials for highway trips, flights, and treks.",
    cta: "Shop Travel Hygiene",
    src: "matcher-travel-hygiene",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function CupSizeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 14h20l-4 22a10 10 0 0 1-12 0l-4-22Z" />
      <path d="M32 36v10" />
      <path d="M28 50h8" />
      <path d="M44 18h6M44 24h4M44 30h6" />
      <path d="M14 18h4M14 24h6M14 30h4" />
    </svg>
  );
}

export default function SironaClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("cups");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.thesirona.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "thesirona.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Sirona"
        subtitle="100% medical-grade silicone menstrual cups, rash-free organic cotton pads, and PeeBuddy travel essentials engineered for leak-free comfort."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/sirona.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("sirona", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="sirona-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="sirona-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Sirona — Medical-Grade Menstrual Cups, Period Care &amp; Travel Hygiene
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          100% medical-grade silicone menstrual cups, rash-free organic cotton pads, and PeeBuddy travel essentials engineered
          for leak-free comfort.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Menstrual cup sizing depends on pelvic floor tone and childbirth
          history—not flow volume—so matching Small, Medium, or Large prevents rim pressure and leaks.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="sirona-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Care Matcher</p>
        <h2 id="sirona-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Find the right Sirona essentials
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to match your period care or travel hygiene need. Every CTA opens the official Sirona store via a tracked link.
        </p>

        <div role="tablist" aria-label="Sirona matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`sirona-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`sirona-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-rose-700 bg-rose-700 text-white" : "border-ledger-line bg-white text-ink hover:border-rose-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`sirona-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`sirona-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-rose-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-white text-rose-700">
              <CupSizeIcon />
              <span className="sr-only">Medical-Grade Silicone · S / M / L Fit Guide</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Medical-Grade Silicone · S / M / L Fit Guide</p>
              <a
                href={storeGoHref("sirona", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-rose-700 px-5 text-sm font-semibold text-white transition hover:bg-rose-800"
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
          <StoreGuideLink slug="sirona" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/tools" className="font-medium text-durza-deep hover:underline">Shopping tools</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
          <li><Link href="/stores/nuawoman-com-ecommerce-cps-india" className="font-medium text-durza-deep hover:underline">Nua store guide</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on thesirona.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("sirona", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Sirona"
        href={storeGoHref("sirona", "store-page-bottom")}
        description="Browse the full Sirona range and check live availability, sizing guidance, and terms directly on the official store."
      />

      <FaqSection eyebrow="Sirona FAQs" items={faqs} />

      
      <AffiliateDisclosure />
    </div>
  );
}
