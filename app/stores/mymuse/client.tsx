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

type Tab = "solo" | "couples" | "care" | "kits";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  solo: {
    label: "Beginner & Solo Wellness",
    name: "Compact USB-Rechargeable Silicone Massagers",
    detail: "Whisper-quiet motors with intuitive single-button controls and travel locks.",
    cta: "Shop Solo Wellness",
    src: "matcher-solo",
  },
  couples: {
    label: "Couples & Shared Experiences",
    name: "Dual-Stimulation & Remote-App Paired Devices",
    detail: "Ergonomic silhouettes crafted for comfort and versatility.",
    cta: "Shop Couples Devices",
    src: "matcher-couples",
  },
  care: {
    label: "Water-Based Lubricants & Oils",
    name: "pH-Balanced Aloe & Hyaluronic Lubricants + Massage Candles",
    detail: "Glycerin-free, paraben-free formulas safe for silicone and latex.",
    cta: "Shop Lubricants & Oils",
    src: "matcher-care",
  },
  kits: {
    label: "Curated Gift & Starter Kits",
    name: "Bundled Wellness Kits with Storage Pouches & Cleaners",
    detail: "Complete sets with antibacterial device mist and satin storage bags.",
    cta: "Shop Kits",
    src: "matcher-kits",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function PrivacyBoxIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="12" y="20" width="40" height="28" rx="4" />
      <path d="M20 20v-4a12 12 0 0 1 24 0v4" />
      <path d="M32 30v8" />
      <circle cx="32" cy="42" r="2" />
      <path d="M40 14c4 2 6 5 6 8" />
    </svg>
  );
}

export default function MyMuseClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("solo");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://mymuse.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "mymuse.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="MyMuse"
        subtitle="Doctor-recommended, medical-grade silicone devices, quiet USB-rechargeable motors, and pH-balanced lubricants delivered in plain, unbranded boxes."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/mymuse.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("mymuse", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="mymuse-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="mymuse-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          MyMuse — Body-Safe Intimate Wellness Devices &amp; Water-Based Care
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Doctor-recommended, medical-grade silicone devices, quiet USB-rechargeable motors, and pH-balanced lubricants
          delivered in plain, unbranded boxes.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-violet-100 bg-violet-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Always pair medical-grade silicone devices exclusively with
          water-based lubricants—silicone-based lubricants can bond with and degrade smooth silicone surfaces over time.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="mymuse-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Wellness Matcher</p>
        <h2 id="mymuse-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your MyMuse option
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to explore body-safe options. Every CTA opens the official MyMuse store via a tracked link.
        </p>

        <div role="tablist" aria-label="MyMuse matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`mymuse-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`mymuse-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-violet-700 bg-violet-700 text-white" : "border-ledger-line bg-white text-ink hover:border-violet-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`mymuse-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`mymuse-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-violet-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-white text-violet-700">
              <PrivacyBoxIcon />
              <span className="sr-only">100% Discreet Packaging · Body-Safe Silicone</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">100% Discreet Packaging · Body-Safe Silicone</p>
              <a
                href={storeGoHref("mymuse", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-violet-700 px-5 text-sm font-semibold text-white transition hover:bg-violet-800"
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
          <StoreGuideLink slug="mymuse" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/sirona" className="font-medium text-durza-deep hover:underline">Sirona store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on mymuse.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("mymuse", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="MyMuse"
        href={storeGoHref("mymuse", "store-page-bottom")}
        description="Browse the full MyMuse range and check live availability, care details, and terms directly on the official store."
      />

      <FaqSection eyebrow="MyMuse FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
