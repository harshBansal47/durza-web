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

type Tab = "career" | "marriage" | "vastu" | "gems";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  career: {
    label: "Career, Business & Finance",
    name: "1-on-1 Career & Dasha Period Consultation",
    detail: "Focused birth-chart session for job transitions, partnerships, and timing decisions.",
    cta: "Book Career Consultation",
    src: "matcher-career",
  },
  marriage: {
    label: "Marriage & Kundli Matching",
    name: "Ashtakoota Compatibility & Relationship Analysis",
    detail: "Detailed partner chart comparison with clear remedies and guidance.",
    cta: "Book Kundli Matching",
    src: "matcher-marriage",
  },
  vastu: {
    label: "Home & Office Vastu",
    name: "Floor-Plan Vastu Review & Practical Adjustments",
    detail: "Non-demolition directional guidance for workspaces and residences.",
    cta: "Book Vastu Review",
    src: "matcher-vastu",
  },
  gems: {
    label: "Lab-Certified Rudraksha & Gems",
    name: "Authenticated Rudraksha Beads & Natural Gemstones",
    detail: "Accompanied by gemological lab certificates on eligible items.",
    cta: "Shop Certified Gems",
    src: "matcher-gems",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function KundliIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="14" y="14" width="36" height="36" transform="rotate(45 32 32)" />
      <path d="M32 14v36M14 32h36M20 20l24 24M44 20L20 44" />
      <circle cx="32" cy="32" r="5" />
    </svg>
  );
}

export default function LifeChangingAstroClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("career");
  const match = useMemo(() => MATCHES[active], [active]);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://lifechangingastro.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "lifechangingastro.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Life Changing Astro"
        subtitle="Book one-on-one Vedic astrology consultations, detailed birth-chart reports, and lab-certified rudraksha or gemstones with transparent service details."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/life-changing-astro.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("life-changing-astro", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="lca-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="lca-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Life Changing Astro — Personalized Vedic Kundli, Vastu &amp; Gem Guidance
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Book one-on-one Vedic astrology consultations, detailed birth-chart reports, and lab-certified rudraksha or gemstones with transparent service details.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Accurate Vedic Kundli calculations depend on exact birth date, time (to the minute), and birthplace coordinates—confirming your birth time first ensures accurate Lagna and Dasha charts.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="lca-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Consultation Matcher</p>
        <h2 id="lca-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your guidance focus</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to find the right consultation or certified item. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="Life Changing Astro matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`lca-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`lca-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-amber-700 bg-amber-700 text-white" : "border-ledger-line bg-white text-ink hover:border-amber-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`lca-panel-${active}`} role="tabpanel" aria-labelledby={`lca-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-700">
              <KundliIcon />
              <span className="sr-only">Exact Birth-Time Kundli · Lab-Certified Gems</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Exact Birth-Time Kundli · Lab-Certified Gems</p>
              <a href={storeGoHref("life-changing-astro", match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800">
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related categories</h2>
        <div className="mt-4"><StoreGuideLink slug="life-changing-astro" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/categories/other" className="font-medium text-durza-deep hover:underline">Other category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, booking, and certification details on lifechangingastro.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={offer.targetUrl || storeGoHref("life-changing-astro", "offer-card")} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="Life Changing Astro" href={storeGoHref("life-changing-astro", "store-page-bottom")} description="Browse consultations and certified items and check live booking, certification, and terms directly on the official store." />
      <FaqSection eyebrow="Life Changing Astro FAQs" items={faqs} />
      <AffiliateDisclosure />
    </div>
  );
}
