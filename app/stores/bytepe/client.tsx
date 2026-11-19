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

type Tab = "annual" | "extended" | "care" | "endterm";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  annual: {
    label: "Annual Flagship Upgraders",
    name: "12-Month Upgrade-Ready Smartphone Plans",
    detail: "Built for users who switch to the newest flagship every year without resale hassle.",
    cta: "Explore Annual Upgrade Plans",
    src: "matcher-annual-upgrade",
  },
  extended: {
    label: "24-Month Lower Monthly Outflow",
    name: "Extended Tenure Subscription Plans",
    detail: "Spreads device usage over two years with buyout or return options at term end.",
    cta: "Explore Extended Plans",
    src: "matcher-extended-tenure",
  },
  care: {
    label: "Accidental & Screen Protection",
    name: "Plans with Bundled Device Care",
    detail: "Covers eligible accidental/liquid damage terms specified in the subscriber agreement.",
    cta: "View Device Care Plans",
    src: "matcher-device-care",
  },
  endterm: {
    label: "Compare Keep vs. Return at End",
    name: "End-of-Term Buyout, Return & Upgrade Guide",
    detail: "Review exact condition checklists and buyout terms before subscribing.",
    cta: "Compare End-of-Term Options",
    src: "matcher-end-term",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function UpgradeCycleIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="22" y="10" width="20" height="36" rx="4" />
      <path d="M28 40h8" />
      <path d="M14 22a18 18 0 0 1 8-8" />
      <path d="M14 22h6M14 22v-6" />
      <path d="M50 34a18 18 0 0 1-8 8" />
      <path d="M50 34h-6M50 34v6" />
      <path d="M32 26l4 4-4 4-4-4 4-4Z" />
    </svg>
  );
}

export default function BytePeClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("annual");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://bytepe.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "bytepe.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="BytePe"
        subtitle="Access flagship iPhones and Android devices on structured subscription plans with bundled protection and upgrade paths—without locking up full upfront capital."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/bytepe.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("bytepe", "store-page")}
        ctaLabel="Visit Official Site"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="bytepe-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Guide</p>
        <h1 id="bytepe-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          BytePe — Flexible Flagship Smartphone Subscriptions &amp; Annual Upgrades
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Access flagship iPhones and Android devices on structured subscription plans with bundled protection and upgrade
          paths—without locking up full upfront capital.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Instead of eating 35–40% first-year depreciation when reselling a
          flagship phone every 12 months, a structured upgrade subscription lets you swap to the next generation at cycle end.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="bytepe-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Subscription Matcher</p>
        <h2 id="bytepe-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Compare BytePe subscription paths
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to understand plan types and terms. Every CTA opens the official BytePe site via a tracked link.
        </p>

        <div role="tablist" aria-label="BytePe matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`bytepe-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`bytepe-panel-${tab.id}`}
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
          id={`bytepe-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`bytepe-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-sky-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-700">
              <UpgradeCycleIcon />
              <span className="sr-only">Flexible Tenure · Upgrade-Ready · Device Care</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Flexible Tenure · Upgrade-Ready · Device Care</p>
              <a
                href={storeGoHref("bytepe", match.src)}
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
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related comparisons and guides</h2>
        <div className="mt-4">
          <StoreGuideLink slug="bytepe" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/compare/best-smartphone-deals-india-amazon-vs-flipkart" className="font-medium text-durza-deep hover:underline">Best smartphone deals in India: Amazon vs Flipkart</Link></li>
          <li><Link href="/stores/amazon-in" className="font-medium text-durza-deep hover:underline">Amazon India store guide</Link></li>
          <li><Link href="/categories/electronics" className="font-medium text-durza-deep hover:underline">Electronics category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on bytepe.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("bytepe", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="BytePe"
        href={storeGoHref("bytepe", "store-page-bottom")}
        description="Review live subscription plans, eligibility, and terms directly on the official BytePe site."
      />

      <FaqSection eyebrow="BytePe FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
