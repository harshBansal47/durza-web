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

const ADV_ICONS = { shield: Shield, truck: Truck, wrench: Wrench, card: CreditCard, zap: Zap, home: Home, check: BadgeCheck, spark: Sparkles };

const ADVANTAGES = [{"title": "Full range & combos", "desc": "Browse complete grooming ranges, combos and curated sets directly on the official store."}, {"title": "Fragrances & discovery sets", "desc": "Explore signature fragrances and discovery/gift formats as available on themancompany.com."}, {"title": "Gifting-ready options", "desc": "Find curated gift boxes and sets suited for occasions \u2014 check contents and availability on the listing."}, {"title": "Checkout benefits as available", "desc": "Prepaid/cart benefits or bundles may be offered from time to time \u2014 see live terms at checkout."}] as const;
const MATCHERS = [{"id": "fragrance", "label": "Fragrances", "headline": "Signature scents for day and evening", "bullets": ["Choose fragrance notes/profiles that fit your preference and occasion", "Consider discovery sets if trying a new scent", "Check size, concentration and ingredients on the listing"], "cta": "Explore fragrances \u2192", "src": "matcher-fragrance"}, {"id": "beard", "label": "Beard Care", "headline": "Clean, soften and style your beard", "bullets": ["Use a gentle beard wash and follow with oil/balm as needed", "Patch-test new products if you have sensitive skin", "Check ingredients and usage directions on the product page"], "cta": "Explore beard care \u2192", "src": "matcher-beard"}, {"id": "skincare", "label": "Face & Body Care", "headline": "Everyday cleansing and grooming essentials", "bullets": ["Pick cleansers/moisturizers suited to your skin type", "Use sunscreen as part of daytime routines where appropriate", "Review ingredients and instructions before use"], "cta": "Explore face & body care \u2192", "src": "matcher-skincare"}, {"id": "gifting", "label": "Gifting", "headline": "Ready-to-gift grooming sets", "bullets": ["Choose curated hampers or discovery sets for easy gifting", "Check what\u2019s included and packaging details on the listing", "Confirm delivery timelines and availability on the store"], "cta": "Explore gift sets \u2192", "src": "matcher-gifting"}] as const;
const LINEUP = [{"title": "Eau de Parfums", "badge": "Fragrance", "copy": "Signature scents and sizes \u2014 compare notes and formats.", "src": "lineup-perfumes"}, {"title": "Beard Care", "badge": "Beard", "copy": "Oils, washes and balms \u2014 check ingredients and routine fit.", "src": "lineup-beard"}, {"title": "Face Care", "badge": "Skin", "copy": "Cleansers, scrubs and daily care \u2014 review suitability for your skin.", "src": "lineup-face"}, {"title": "Gift Sets & Combos", "badge": "Gifting", "copy": "Curated boxes and combos \u2014 see contents and presentation.", "src": "lineup-gifting"}, {"title": "Hair & Body", "badge": "Essentials", "copy": "Styling and body care essentials \u2014 check usage and ingredients.", "src": "lineup-hair-body"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("the-man-company", "store-page");
  const mobileHref = storeGoHref("the-man-company", "mobile-sticky");

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">The Man Company Official Store — Grooming, Fragrances & Gift Sets</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Build your grooming routine or find a gift set, compare ranges, and check live availability on the official The Man Company store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop The Man Company → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#the-man-company-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop The Man Company direct</h2>
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

      <section id="the-man-company-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Find your routine or gift</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Choose your need for a quick checklist, then explore the matching range on the official store.</p>
        <div role="tablist" aria-label="The Man Company matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official The Man Company store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("the-man-company", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Grooming ranges</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse grooming, fragrance and gifting categories and confirm live availability on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("the-man-company", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Patch-test new grooming products if you have sensitive skin. Check ingredients, usage directions and current store policies on the official site.</p>
        <FaqSection eyebrow="The Man Company FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on The Man Company</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </main>
  );
}
