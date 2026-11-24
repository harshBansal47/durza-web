"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import type { StoreOfferCard } from "@/lib/store-offers";

const REL = "nofollow sponsored noopener noreferrer";

type Tab = "ai" | "studio";
const TABS: Record<Tab, { label: string; title: string; bullets: string[]; cta: string }> = {
  ai: {
    label: "InVideo AI",
    title: "Prompt-to-video for YouTube & Reels",
    bullets: [
      "Generate scripts, voiceovers, and stock-footage sequences from a prompt.",
      "Useful for faceless YouTube videos, Shorts, and Reels workflows.",
      "Review export limits, voice options, and plan terms on the live InVideo page.",
    ],
    cta: "/go/invideo?src=matcher-invideo-ai",
  },
  studio: {
    label: "InVideo Studio",
    title: "Manual timeline & template editing",
    bullets: [
      "Edit templates, scenes, captions, and media on a visual timeline.",
      "Good for brand videos, ads, and precise creative control.",
      "Check current template access and plan features on the live InVideo page.",
    ],
    cta: "/go/invideo?src=matcher-invideo-studio",
  },
};

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
  forcedStoreHref?: string | null;
}

export default function InVideoClient({ offers, faqs, stats, heroImageUrl, offerCount, forcedStoreHref }: Props) {
  const [tab, setTab] = useState<Tab>("ai");
  const active = TABS[tab];
  const topOffer = offers[0] ?? null;
  const storeHref = forcedStoreHref ?? "/go/invideo?src=store-page";

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 md:pb-8">
      <StoreHero
        name="InVideo"
        subtitle="AI video creation and template-based editing for creators — compare InVideo AI and InVideo Studio before you subscribe."
        domain="invideo.io"
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={storeHref}
        ctaLabel="Visit InVideo →"
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section aria-labelledby="invideo-matcher" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Creator workflow matcher</p>
        <h2 id="invideo-matcher" className="mt-1 text-xl font-bold text-ink">Choose the right InVideo workflow</h2>
        <p className="mt-2 text-sm text-ink-soft">Switch between InVideo AI and InVideo Studio to see which tool fits your video creation flow.</p>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="InVideo workflow matcher">
          {(Object.keys(TABS) as Tab[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls="invideo-matcher-panel"
              onClick={() => setTab(id)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${tab === id ? "border-ink bg-ink text-white" : "border-ledger-line bg-white text-ink-soft hover:border-inkblue hover:text-ink"}`}
            >
              {TABS[id].label}
            </button>
          ))}
        </div>
        <div id="invideo-matcher-panel" role="tabpanel" className="mt-4 rounded-xl border border-ledger-line bg-paper-raised p-4 sm:p-5">
          <h3 className="text-lg font-bold text-ink">{active.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {active.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-verified" strokeWidth={2} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a href={forcedStoreHref ?? active.cta} target="_blank" rel={REL} className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Explore {TABS[tab].label} on InVideo <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 className="text-lg font-bold text-ink">International checkout and billing</h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          InVideo subscriptions are sold internationally and plan pricing may be shown in USD or other currencies depending on region and checkout. Review the live plan total, billing currency, taxes, and renewal terms on the official checkout page before subscribing.
        </p>
      </section>

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o, idx) => (
            <OfferCard
              key={o.id || idx}
              bookmarkId={o.id}
              code={o.code}
              badge={o.badge}
              title={o.title}
              description={o.description}
              ctaHref={forcedStoreHref ?? (o.targetUrl.startsWith("/go/") ? `${o.targetUrl}${o.targetUrl.includes("?") ? "&" : "?"}src=offer-card` : `/go/invideo?src=offer-card`)}
              expiresAt={o.expiresAt}
            />
          ))}
        </div>
      ) : (
        <ExploreStoreCta storeName="InVideo" href={storeHref} />
      )}

      <section aria-labelledby="invideo-related" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
        <h2 id="invideo-related" className="text-lg font-bold text-ink">Related learning & software picks</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/stores/guvi" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">GUVI</p>
            <p className="mt-1 text-sm text-ink-soft">Tech upskilling and career-focused learning in India</p>
          </Link>
          <Link href="/categories/software" className="rounded-2xl border border-ledger-line bg-paper-raised p-4 transition hover:border-inkblue/30 hover:shadow-sm">
            <p className="font-semibold text-ink">Software category</p>
            <p className="mt-1 text-sm text-ink-soft">Browse software tools, subscriptions, and digital services</p>
          </Link>
        </div>
      </section>

      <FaqSection eyebrow="InVideo FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={forcedStoreHref ?? (topOffer ? (topOffer.targetUrl.startsWith("/go/") ? topOffer.targetUrl : storeHref) : storeHref)} target="_blank" rel={REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">{topOffer?.code ? `Code ${topOffer.code}` : "Official store"}</span>
            <span className="block truncate text-xs font-semibold">{topOffer ? topOffer.title : "Check current InVideo plans & offers"}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Open <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
