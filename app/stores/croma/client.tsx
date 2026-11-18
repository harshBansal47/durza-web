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

type Tab = "cooling" | "mobile" | "tv" | "appliances";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  cooling: {
    label: "Summer Cooling & Split ACs",
    name: "3-Star & 5-Star Inverter Split ACs (1 Ton – 2 Ton)",
    detail: "Compare ISEER ratings, copper condensers, and standard installation terms.",
    cta: "Shop Split ACs",
    src: "matcher-ac-cooling",
  },
  mobile: {
    label: "Smartphones, Laptops & Tablets",
    name: "iPhones, Galaxy Flagships, MacBooks & Windows Laptops",
    detail: "Pair instant bank card offers with old-device exchange valuation.",
    cta: "Shop Mobiles & Laptops",
    src: "matcher-mobiles-laptops",
  },
  tv: {
    label: "4K OLED / QLED TVs & Soundbars",
    name: "Large-Screen Smart TVs & Dolby Atmos Audio",
    detail: "Wall-mount installation and ZipCare extended protection options.",
    cta: "Shop TVs & Audio",
    src: "matcher-tvs-audio",
  },
  appliances: {
    label: "Refrigerators, Washers & Kitchen",
    name: "Frost-Free Fridges, Front-Load Washers & Microwaves",
    detail: "Check PIN-code doorstep delivery and old-appliance exchange.",
    cta: "Shop Large Appliances",
    src: "matcher-appliances",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function CromaIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="10" y="14" width="20" height="28" rx="3" />
      <path d="M14 20h12M14 26h8" />
      <rect x="34" y="18" width="20" height="14" rx="2" />
      <path d="M38 38h12M44 32v6" />
      <path d="M20 48h24" />
      <path d="M32 42v6" />
      <path d="M40 48l6 6M48 48l-6 6" />
    </svg>
  );
}

export default function CromaClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("cooling");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.croma.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "croma.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Croma"
        subtitle="Compare inverter split ACs, 4K OLED TVs, MacBooks, and kitchen appliances on Croma.com—with same-day express delivery or local Croma store pickup."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/croma.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("croma", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="croma-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="croma-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Croma — Tata Electronics, Home Appliances &amp; ZipCare Protection
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Compare inverter split ACs, 4K OLED TVs, MacBooks, and kitchen appliances on Croma.com—with same-day express delivery or local Croma store pickup.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-teal-100 bg-teal-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> A 5-star inverter AC&apos;s ISEER rating measures seasonal cooling efficiency across varying outdoor temperatures—paying off most in bedrooms running 8+ hours every night from March to October.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="croma-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Electronics Matcher</p>
        <h2 id="croma-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your Croma category</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to find the right device or appliance. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="Croma matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`croma-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`croma-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-teal-700 bg-teal-700 text-white" : "border-ledger-line bg-white text-ink hover:border-teal-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`croma-panel-${active}`} role="tabpanel" aria-labelledby={`croma-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-teal-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-teal-200 bg-white text-teal-700">
              <CromaIcon />
              <span className="sr-only">Inverter Cooling · Exchange + Bank Offers · ZipCare</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Inverter Cooling · Exchange + Bank Offers · ZipCare</p>
              <a href={storeGoHref("croma", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800">
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
        <div className="mt-4"><StoreGuideLink slug="croma" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/compare/best-laptop-deals-india-amazon-vs-flipkart" className="font-medium text-durza-deep hover:underline">Best laptop deals: Amazon vs Flipkart</Link></li>
          <li><Link href="/compare/best-smartphone-deals-india-amazon-vs-flipkart" className="font-medium text-durza-deep hover:underline">Best smartphone deals: Amazon vs Flipkart</Link></li>
          <li><Link href="/stores/reliance-digital" className="font-medium text-durza-deep hover:underline">Reliance Digital store guide</Link></li>
          <li><Link href="/categories/electronics" className="font-medium text-durza-deep hover:underline">Electronics category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, eligibility, and terms on croma.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={offer.targetUrl || storeGoHref("croma", "offer-card")} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="Croma" href={storeGoHref("croma", "store-page-bottom")} description="Browse the full Croma range and check live availability, exchange values, and terms directly on the official store." />
      <FaqSection eyebrow="Croma FAQs" items={faqs} />
      <p className="mt-8 text-xs leading-6 text-ink-faint">Durza may earn a commission from purchases made via our affiliate links to Croma (croma.com). Availability and terms are subject to change on the official store.</p>
      <AffiliateDisclosure />
    </div>
  );
}
