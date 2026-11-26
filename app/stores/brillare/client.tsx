"use client";

import LiveOffersSection from "@/components/store/LiveOffersSection";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
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

type Tab = "fall" | "dandruff" | "dry" | "face";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  fall: {
    label: "Hard-Water Hair Fall",
    name: "Hair Fall Control Oil Shots & Root Strengthening Shampoo",
    detail: "Onion, coffee, and basil concentrates formulated to reduce breakage.",
    cta: "Shop Hair Fall Control",
    src: "matcher-hair-fall",
  },
  dandruff: {
    label: "Flaky & Itchy Scalp",
    name: "Dandruff Control Oil Shots & Tea Tree Scalp Cleanser",
    detail: "Targets scalp buildup without harsh sulfate stripping.",
    cta: "Shop Dandruff Control",
    src: "matcher-dandruff",
  },
  dry: {
    label: "Dry, Frizzy & Heat-Styled Hair",
    name: "Heavy Moisturizing Oil Shots & Argan Hair Serum",
    detail: "Deep lipid replenishment for coarse or chemically treated strands.",
    cta: "Shop Moisture & Repair",
    src: "matcher-dry-frizz",
  },
  face: {
    label: "Water-Free Face Concentrates",
    name: "10% Vitamin C, Hyaluronic & Rose Face Drops",
    detail: "Pure active booster drops designed to mix into moisturizer or apply direct.",
    cta: "Shop Face Concentrates",
    src: "matcher-face-drops",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function DropperIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M40 10 54 24l-6 6-8-2-10 10-8-8 10-10-2-8 10-2Z" />
      <path d="M22 38l-8 8" />
      <rect x="14" y="38" width="14" height="18" rx="4" />
      <path d="M18 44h6" />
      <path d="M44 30l6 6" />
    </svg>
  );
}

export default function BrillareClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("fall");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.brillare.co.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "brillare.co.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Brillare"
        subtitle="Water-free, preservative-free plant actives formulated for Indian hard-water hair fall, flaky scalps, and barrier-compromised skin."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/brillare.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("brillare", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="brillare-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="brillare-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Brillare — 100% Zero-Dilution Botanical Oil Shots &amp; Scalp Concentrates
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Water-free, preservative-free plant actives formulated for Indian hard-water hair fall, flaky scalps, and
          barrier-compromised skin.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Conventional hair oils dilute botanical extracts in cheap mineral
          oil; zero-dilution oil shots pack undiluted cold-pressed actives into single-dose vials so every drop hits the scalp.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="brillare-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Scalp &amp; Skin Matcher</p>
        <h2 id="brillare-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Brillare routine
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right concentrate. Every CTA opens the official Brillare store via a tracked link.
        </p>

        <div role="tablist" aria-label="Brillare matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`brillare-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`brillare-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-emerald-700 bg-emerald-700 text-white" : "border-ledger-line bg-white text-ink hover:border-emerald-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`brillare-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`brillare-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-emerald-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
              <DropperIcon />
              <span className="sr-only">100% Zero-Dilution · Water-Free Actives</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">100% Zero-Dilution · Water-Free Actives</p>
              <a
                href={storeGoHref("brillare", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
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
          <StoreGuideLink slug="brillare" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/guides/indian-skincare-actives-haircare-guide" className="font-medium text-durza-deep hover:underline">Indian skincare actives &amp; haircare guide</Link></li>
          <li><Link href="/stores/indus-valley" className="font-medium text-durza-deep hover:underline">Indus Valley store guide</Link></li>
          <li><Link href="/stores/kama-ayurveda" className="font-medium text-durza-deep hover:underline">Kama Ayurveda store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      <LiveOffersSection offers={offers} storeSlug="brillare" domain="brillare" />

      <ExploreStoreCta
        storeName="Brillare"
        href={storeGoHref("brillare", "store-page-bottom")}
        description="Browse the full Brillare range and check live availability, routines, and terms directly on the official store."
      />

      <FaqSection eyebrow="Brillare FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
