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

type Tab = "phones" | "laptops" | "home" | "tv";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  phones: {
    label: "Smartphones & Wearables",
    name: "5G Flagships, iPhones & Smartwatches",
    detail: "Check eligible bank card instant discounts and exchange bonuses at checkout.",
    cta: "Shop Smartphones",
    src: "matcher-smartphones",
  },
  laptops: {
    label: "Work & Gaming Laptops",
    name: "Thin-and-Light Ultrabooks, MacBooks & RTX Gaming Rigs",
    detail: "Compare core specs and student/bank payment slabs.",
    cta: "Shop Laptops",
    src: "matcher-laptops",
  },
  home: {
    label: "Home Cooling & Laundry",
    name: "Inverter ACs, Front-Load Washing Machines & Dryers",
    detail: "Coordinated doorstep delivery and resQ technician installation.",
    cta: "Shop Home Appliances",
    src: "matcher-home-appliances",
  },
  tv: {
    label: "TVs, Audio & Kitchen Tech",
    name: "4K Google TVs, Soundbars, Dishwashers & Water Purifiers",
    detail: "Full manufacturer warranty with optional resQ Care Plans.",
    cta: "Shop TVs & Tech",
    src: "matcher-tvs-tech",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function ResqIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="14" y="14" width="18" height="28" rx="3" />
      <path d="M18 20h10M18 26h6" />
      <circle cx="44" cy="40" r="10" />
      <path d="M40 40h8M44 36v8" />
      <path d="M36 20l6 6M42 20l-6 6" />
    </svg>
  );
}

export default function RelianceDigitalClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("phones");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.reliancedigital.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "reliancedigital.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Reliance Digital"
        subtitle="Order smartphones, laptops, refrigerators, and washing machines on reliancedigital.in with multi-bank instant discounts and resQ technician setup."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/reliance-digital.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("reliance-digital", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="rd-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="rd-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Reliance Digital — Electronics, Large Appliances &amp; resQ Installation
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Order smartphones, laptops, refrigerators, and washing machines on reliancedigital.in with multi-bank instant discounts and resQ technician setup.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Buying a split AC or front-load washing machine from a retailer with its own service network (resQ) means delivery and wall-mount/plumbing installation stay coordinated under one order.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="rd-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Electronics Matcher</p>
        <h2 id="rd-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your Reliance Digital category</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to find the right device or appliance. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="Reliance Digital matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`rd-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`rd-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-ledger-line bg-white text-ink hover:border-blue-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`rd-panel-${active}`} role="tabpanel" aria-labelledby={`rd-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-blue-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-white text-blue-700">
              <ResqIcon />
              <span className="sr-only">resQ Service Network · Multi-Bank Offers · Official Warranty</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">resQ Service Network · Multi-Bank Offers · Official Warranty</p>
              <a href={storeGoHref("reliance-digital", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800">
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
        <div className="mt-4"><StoreGuideLink slug="reliance-digital" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/croma" className="font-medium text-durza-deep hover:underline">Croma store guide</Link></li>
          <li><Link href="/bank-offers" className="font-medium text-durza-deep hover:underline">Bank offers</Link></li>
          <li><Link href="/categories/electronics" className="font-medium text-durza-deep hover:underline">Electronics category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, eligibility, and terms on reliancedigital.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={offer.targetUrl || storeGoHref("reliance-digital", "offer-card")} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="Reliance Digital" href={storeGoHref("reliance-digital", "store-page-bottom")} description="Browse the full Reliance Digital range and check live availability, bank offers, and service terms directly on the official store." />
      <FaqSection eyebrow="Reliance Digital FAQs" items={faqs} />
      <p className="mt-8 text-xs leading-6 text-ink-faint">Durza may earn a commission from purchases made via our affiliate links to Reliance Digital (reliancedigital.in). Availability and terms are subject to change on the official store.</p>
      <AffiliateDisclosure />
    </div>
  );
}
