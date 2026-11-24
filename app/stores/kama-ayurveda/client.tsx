"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, BadgeCheck, Truck, Shield, Wrench, CreditCard, Zap, Home, Sparkles } from "lucide-react";
import FaqSection from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}


const ADVANTAGES = [{"title": "Authentic Ayurvedic formulations", "desc": "Shop directly for authentic Kama Ayurveda products and ranges as presented on the official store."}, {"title": "Consultation & guidance", "desc": "Kama Ayurveda offers consultation/guidance options on its site to help you choose suitable rituals \u2014 check availability on the official store."}, {"title": "Signature ranges & gifting", "desc": "Access core collections, travel formats and curated gift sets directly from the brand."}, {"title": "Samples & checkout benefits", "desc": "Complimentary samples or checkout benefits may be offered on qualifying orders \u2014 see live terms on kamaayurveda.in."}] as const;
const MATCHERS = [{"id": "glow", "label": "Glow & Radiance", "headline": "Nighttime nourishment and glow-focused rituals", "bullets": ["Cleanse gently and layer hydration before facial oils as suited to your skin", "Patch-test active or essential-oil rich products before regular use", "Check ingredients and usage directions on the product page"], "cta": "Explore radiance rituals \u2192", "src": "matcher-glow"}, {"id": "hair", "label": "Hair & Scalp Care", "headline": "Nourishing oils and cleansers for hair routines", "bullets": ["Choose pre-wash oils and cleansers suited to your scalp/hair needs", "Follow recommended application time and wash routine", "Review ingredients and suitability on the official listing"], "cta": "Explore hair care \u2192", "src": "matcher-hair"}, {"id": "balance", "label": "Balance & Hydration", "headline": "Toning, cleansing and daily skin balance", "bullets": ["Pick gentle cleansers and mists suited to your skin type", "Introduce new products one at a time and patch-test", "Confirm usage guidance and ingredients on Kama Ayurveda"], "cta": "Explore skin care \u2192", "src": "matcher-balance"}, {"id": "gifting", "label": "Gifting & Discovery", "headline": "Curated sets and discovery-friendly picks", "bullets": ["Choose pre-curated gift boxes for ready-to-present options", "Consider discovery/travel sizes when trying a new ritual", "Check contents and availability on the official store"], "cta": "Explore gifting \u2192", "src": "matcher-gifting"}] as const;
const LINEUP = [{"title": "Kumkumadi & Face Oils", "badge": "Face care", "copy": "Signature facial oils and serums \u2014 review ingredients and usage guidance.", "src": "lineup-kumkumadi"}, {"title": "Bringadi & Hair Care", "badge": "Hair care", "copy": "Hair oils and cleansers for scalp and hair rituals \u2014 check suitability.", "src": "lineup-hair"}, {"title": "Floral Waters & Mists", "badge": "Toning", "copy": "Pure mists and toning essentials \u2014 see ingredients and formats.", "src": "lineup-mists"}, {"title": "Cleansers & Ubtans", "badge": "Cleansing", "copy": "Gentle cleansers and masks for daily routines \u2014 review directions.", "src": "lineup-cleansers"}, {"title": "Body Care & Oils", "badge": "Body", "copy": "Body oils and care rituals \u2014 check textures and ingredients.", "src": "lineup-body"}, {"title": "Gift Boxes & Sets", "badge": "Gifting", "copy": "Curated Ayurvedic gift sets \u2014 view contents on the official store.", "src": "lineup-gifting"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("kama-ayurveda", "store-page");
  const mobileHref = storeGoHref("kama-ayurveda", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">Kama Ayurveda Official Store — Ayurvedic Skin, Hair & Gifting</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Discover Kama Ayurveda rituals by concern, explore signature collections, and check live availability and details on the official store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop Kama Ayurveda → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#kama-ayurveda-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop Kama Ayurveda direct</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((a, i) => {
            const Icon = [Shield, Truck, Wrench, CreditCard, Zap, Home, BadgeCheck, Sparkles][i % 8];
            return (
              <div key={a.title} className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink-soft">Benefits, availability and terms are determined by the official store and may vary by product, location or time.</p>
      </section>

      <section id="kama-ayurveda-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Find your Kama Ayurveda ritual</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Choose your concern to get a simple routine checklist, then explore the matching collection on the official store.</p>
        <div role="tablist" aria-label="Kama Ayurveda matcher" className="mt-5 flex flex-wrap gap-2">
          {MATCHERS.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={active === m.id} onClick={() => setActive(m.id)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === m.id ? "bg-ink text-white" : "border border-ledger-line bg-white text-ink hover:bg-slate-50"}`}>
              {m.label}
            </button>
          ))}
        </div>
        {current && (
          <div className="mt-5 grid gap-5 rounded-2xl border border-ledger-line bg-white p-5 shadow-sm lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-xl font-bold text-ink">{current.headline}</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {current.bullets.map((b) => (<li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />{b}</li>))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-ink-soft">Browse the matching range on the official Kama Ayurveda store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("kama-ayurveda", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Signature collections</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Explore Kama Ayurveda collections</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse signature Ayurvedic collections and check live availability and details on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("kama-ayurveda", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{item.badge}</p>
              <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-inkblue">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">View on official store <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-10"><AffiliateDisclosure /></div>

      <section className="mt-10">
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Skincare results and suitability vary by individual. Patch-test new products and refer to official product guidance; this page does not provide medical advice.</p>
        <FaqSection eyebrow="Kama Ayurveda FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on Kama Ayurveda</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
