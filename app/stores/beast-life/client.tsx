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


const ADVANTAGES = [{"title": "Direct-from-brand ordering", "desc": "Order directly from BeastLife to access current products, flavors and pack options as listed on the official store."}, {"title": "Transparency & product information", "desc": "BeastLife highlights ingredient transparency and product/testing information on its site \u2014 review details on each listing."}, {"title": "Stacks & combo value", "desc": "Combo packs and stacks may be available for training routines \u2014 compare servings and value on beastlife.in."}, {"title": "Checkout offers as available", "desc": "Any prepaid, bundle or cart benefits vary over time \u2014 check live terms at checkout on the official store."}] as const;
const MATCHERS = [{"id": "recovery", "label": "Muscle Recovery", "headline": "Protein support for post-training recovery", "bullets": ["Compare protein per serving, flavors and ingredient transparency", "Choose pack size based on your daily servings and consistency", "Verify authenticity/seal and storage guidance on delivery"], "cta": "Explore whey protein \u2192", "src": "matcher-whey"}, {"id": "strength", "label": "Strength & Performance", "headline": "Creatine and performance-focused staples", "bullets": ["Check creatine form, serving size and purity information", "Follow label directions and maintain hydration", "Consider stacks/combos if building a routine"], "cta": "Explore creatine & stacks \u2192", "src": "matcher-strength"}, {"id": "energy", "label": "Training Energy", "headline": "Pre-workout and session focus options", "bullets": ["Review stimulant/ingredient levels and assess your tolerance", "Avoid late-day use if sensitive to caffeine", "Check serving guidance and suitability on the label"], "cta": "Explore pre-workout \u2192", "src": "matcher-energy"}] as const;
const LINEUP = [{"title": "Whey Protein", "badge": "Recovery", "copy": "Protein options for daily training recovery \u2014 compare servings and flavors.", "src": "lineup-whey"}, {"title": "Creatine", "badge": "Strength", "copy": "Creatine products for performance routines \u2014 check form and serving.", "src": "lineup-creatine"}, {"title": "Pre-Workout", "badge": "Energy", "copy": "Pre-training formulas \u2014 review ingredients and stimulant levels.", "src": "lineup-preworkout"}, {"title": "Combos & Stacks", "badge": "Value", "copy": "Bundled routines and packs \u2014 compare value per serving on the store.", "src": "lineup-combos"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("beast-life", "store-page");
  const mobileHref = storeGoHref("beast-life", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">BeastLife Official Store — Whey, Creatine & Performance Nutrition</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Choose BeastLife products by your training goal, review ingredient and product information, and check live availability on the official store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop BeastLife → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#beast-life-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop BeastLife direct</h2>
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

      <section id="beast-life-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Pick by your training goal</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Select your goal for a quick checklist, then explore the matching range on the official BeastLife store.</p>
        <div role="tablist" aria-label="BeastLife matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official BeastLife store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("beast-life", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Performance range</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Explore BeastLife by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse core BeastLife categories and confirm flavors, packs and live availability on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("beast-life", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Sports nutrition supports training and diet but is not a substitute for medical advice. Follow label guidance and consult a professional when appropriate.</p>
        <FaqSection eyebrow="BeastLife FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on BeastLife</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
