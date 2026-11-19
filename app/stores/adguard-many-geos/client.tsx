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
  forcedStoreHref?: string | null;
}

type Tab = "personal" | "family" | "dns" | "vpn";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  personal: {
    label: "3 Devices (Personal License)",
    name: "AdGuard Personal (Annual or Lifetime License)",
    detail: "Covers up to 3 laptops or phones across Windows, macOS, Android, and iOS.",
    cta: "Explore Personal Plan",
    src: "matcher-personal",
  },
  family: {
    label: "9 Devices (Household Pack)",
    name: "AdGuard Family Plan (9-Device Coverage)",
    detail: "Protects every family phone, tablet, and desktop under one license key.",
    cta: "Explore Family Plan",
    src: "matcher-family",
  },
  dns: {
    label: "Network-Wide & Router DNS",
    name: "AdGuard DNS (Encrypted DNS-over-HTTPS / QUIC)",
    detail: "Blocks trackers and phishing domains on smart TVs and consoles where apps can't be installed.",
    cta: "Explore AdGuard DNS",
    src: "matcher-dns",
  },
  vpn: {
    label: "Public Wi-Fi Encryption",
    name: "AdGuard VPN (Proprietary obfuscated protocol)",
    detail: "Pairs encrypted tunneling alongside AdGuard's system-wide tracker blocker.",
    cta: "Explore AdGuard VPN",
    src: "matcher-vpn",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 10l18 7v14c0 11-8 19-18 23C22 50 14 42 14 31V17l18-7Z" />
      <rect x="24" y="26" width="16" height="12" rx="2" />
      <path d="M24 32h16M32 26v12" />
      <circle cx="46" cy="46" r="6" />
      <path d="M43 43l6 6M49 43l-6 6" />
    </svg>
  );
}

export default function AdGuardClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl, forcedStoreHref }: Props) {
  const [active, setActive] = useState<Tab>("personal");
  const match = useMemo(() => MATCHES[active], [active]);
  const outHref = (src: string, fallback?: string) => forcedStoreHref ?? fallback ?? storeGoHref("adguard-many-geos", src);
  const domain = (() => {
    try {
      return (storeUrl ?? "https://adguard.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "adguard.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="AdGuard"
        subtitle="Blocks intrusive banners, pop-ups, and analytics trackers across browsers and mobile apps—without needing root access or browser-by-browser extensions."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/adguard.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={outHref("store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />
      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ag-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="ag-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          AdGuard — System-Wide Ad Blocking, Tracker Filtering &amp; Encrypted DNS
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Blocks intrusive banners, pop-ups, and analytics trackers across browsers and mobile apps—without needing root access or browser-by-browser extensions.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Unlike standard browser extensions that only filter Chrome or Safari tabs, AdGuard&apos;s local VPN filtering blocks ad requests inside Android and iOS apps before the payload ever downloads.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Global multi-currency checkout: licensing and billing are processed in international currencies (such as USD/EUR/INR depending on payment method). No local UPI assumptions apply.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ag-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Plan Matcher</p>
        <h2 id="ag-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Choose your AdGuard setup</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to compare plans and protection options. Every CTA opens the official store via a tracked link.</p>
        <div role="tablist" aria-label="AdGuard matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`ag-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`ag-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-emerald-700 bg-emerald-700 text-white" : "border-ledger-line bg-white text-ink hover:border-emerald-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`ag-panel-${active}`} role="tabpanel" aria-labelledby={`ag-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-emerald-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
              <ShieldIcon />
              <span className="sr-only">System-Wide Filtering · 3 or 9 Devices · Multi-Currency</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">System-Wide Filtering · 3 or 9 Devices · Multi-Currency</p>
              <a href={outHref(match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800">
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
        <div className="mt-4"><StoreGuideLink slug="adguard-many-geos" /></div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/nordpass" className="font-medium text-durza-deep hover:underline">NordPass store guide</Link></li>
          <li><Link href="/categories/vpn-security" className="font-medium text-durza-deep hover:underline">VPN &amp; Security category</Link></li>
          <li><Link href="/categories/software" className="font-medium text-durza-deep hover:underline">Software category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing, currency, and terms on adguard.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={outHref("offer-card", offer.targetUrl || storeGoHref("adguard-many-geos", "offer-card"))} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta storeName="AdGuard" href={outHref("store-page-bottom")} description="Browse AdGuard plans and check live pricing, multi-currency checkout, and terms directly on the official store." />
      <FaqSection eyebrow="AdGuard FAQs" items={faqs} />

      <AffiliateDisclosure />
    </div>
  );
}
