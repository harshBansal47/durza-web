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

type Tab = "apparel" | "sneakers" | "accessories" | "buyer";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  apparel: {
    label: "Streetwear & Oversized Apparel",
    name: "Hoodies, Graphic Tees & Relaxed Cargos",
    detail: "Compare chest and shoulder measurements in centimeters before selecting a size.",
    cta: "Shop Streetwear",
    src: "matcher-streetwear",
  },
  sneakers: {
    label: "Sneakers & Everyday Footwear",
    name: "Retro Court Trainers & Chunky Runners",
    detail: "Check EU/UK foot-length conversion tables on each listing.",
    cta: "Shop Sneakers",
    src: "matcher-sneakers",
  },
  accessories: {
    label: "Bags, Caps & Daily Accessories",
    name: "Crossbody Bags, Eyewear & Travel Organizers",
    detail: "Browse community photo reviews for material texture and hardware details.",
    cta: "Shop Accessories",
    src: "matcher-accessories",
  },
  buyer: {
    label: "Buyer Protection & Shipping Check",
    name: "Delivery Windows, Currency & Return Terms",
    detail: "Verify shipping destination eligibility and refund windows before checkout.",
    cta: "Check Buyer Terms",
    src: "matcher-buyer-check",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function LookbookIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="10" y="12" width="18" height="18" rx="3" />
      <rect x="36" y="12" width="18" height="18" rx="3" />
      <rect x="10" y="36" width="18" height="18" rx="3" />
      <path d="M36 40h18M36 46h14M36 52h10" />
      <path d="M45 34v-4" />
    </svg>
  );
}

export default function HacooClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("apparel");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.hacoo.app/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "hacoo.app";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Hacoo"
        subtitle="Browse visual community lookbooks, buyer photo reviews, and trending streetwear drops—with clear checklist tips before ordering."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/hacoo.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("hacoo", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="hacoo-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="hacoo-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Hacoo — Community-Curated Streetwear, Sneakers &amp; Lifestyle Finds
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Browse visual community lookbooks, buyer photo reviews, and trending streetwear drops—with clear checklist tips before ordering.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-violet-100 bg-violet-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> On visual social-commerce marketplaces, real buyer-uploaded photos and size-chart measurements in centimeters are far more reliable than generic S/M/L labels.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="hacoo-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Finds Matcher</p>
        <h2 id="hacoo-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your Hacoo category</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to browse the right category or checklist. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="Hacoo matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`hacoo-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`hacoo-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-violet-700 bg-violet-700 text-white" : "border-ledger-line bg-white text-ink hover:border-violet-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`hacoo-panel-${active}`} role="tabpanel" aria-labelledby={`hacoo-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-violet-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-white text-violet-700">
              <LookbookIcon />
              <span className="sr-only">CM Size Guide · Community Reviews · Buyer Check</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">CM Size Guide · Community Reviews · Buyer Check</p>
              <a href={storeGoHref("hacoo", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800">
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
        <div className="mt-4"><StoreGuideLink slug="hacoo" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/bewakoof" className="font-medium text-durza-deep hover:underline">Bewakoof store guide</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      <LiveOffersSection offers={offers} storeSlug="hacoo" domain="Hacoo" />

      <ExploreStoreCta storeName="Hacoo" href={storeGoHref("hacoo", "store-page-bottom")} description="Browse Hacoo listings and check live availability, shipping eligibility, and buyer terms directly on the official platform." />
      <FaqSection eyebrow="Hacoo FAQs" items={faqs} />

      <AffiliateDisclosure />
    </div>
  );
}
