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


const ADVANTAGES = [{"title": "Wide home-fitness range", "desc": "Find yoga, strength, hydration and gym accessories in one place with specs and options listed on boldfit.in."}, {"title": "Combos & kits", "desc": "Multi-item kits and combos can offer convenient setups for home workouts \u2014 compare contents and value on the store."}, {"title": "Options, colours & sizes", "desc": "Access available thickness levels, resistance options and colourways directly on the official listings."}, {"title": "Delivery & support per policy", "desc": "Shipping, returns and support follow Boldfit\u2019s policies \u2014 review current terms on the official site and product pages."}] as const;
const MATCHERS = [{"id": "yoga", "label": "Yoga & Mobility", "headline": "Mats and accessories for floor workouts", "bullets": ["Choose mat thickness/material for your practice and comfort", "Look for grip/texture suited to sweat and floor type", "Check size, care instructions and included accessories"], "cta": "Explore yoga & mobility \u2192", "src": "matcher-yoga"}, {"id": "strength", "label": "Home Strength", "headline": "Compact gear for strength and resistance training", "bullets": ["Pick resistance levels or weights suited to your current ability", "Check build quality, grip and storage footprint", "Review safety guidance and product specs before use"], "cta": "Explore strength gear \u2192", "src": "matcher-strength"}, {"id": "hydration", "label": "Hydration & Shakers", "headline": "Bottles and shakers for gym and daily use", "bullets": ["Choose capacity and material (e.g. BPA-free/insulated) for your needs", "Check leak-proof design and ease of cleaning", "Compare lids, markings and portability"], "cta": "Explore hydration \u2192", "src": "matcher-hydration"}, {"id": "gym-bag", "label": "Gym Essentials", "headline": "Gloves, supports and everyday training accessories", "bullets": ["Pick the right size and support level for your activity", "Check materials, padding and durability details", "Review care instructions and return eligibility"], "cta": "Explore gym essentials \u2192", "src": "matcher-gym-essentials"}] as const;
const LINEUP = [{"title": "Yoga & Exercise Mats", "badge": "Yoga", "copy": "Mats in different materials and thicknesses \u2014 compare grip and comfort.", "src": "lineup-yoga-mats"}, {"title": "Resistance Bands & Tubes", "badge": "Strength", "copy": "Bands for home and travel workouts \u2014 check resistance levels and kits.", "src": "lineup-bands"}, {"title": "Bottles & Shakers", "badge": "Hydration", "copy": "Hydration and shaker options \u2014 compare capacity, material and lids.", "src": "lineup-hydration"}, {"title": "Gym Gloves & Supports", "badge": "Training", "copy": "Training accessories for grip and support \u2014 check sizing and padding.", "src": "lineup-gym-gear"}, {"title": "Home Workout Equipment", "badge": "Home gym", "copy": "Compact strength tools \u2014 review build, weight options and use guidance.", "src": "lineup-home-gym"}, {"title": "Activewear & Socks", "badge": "Apparel", "copy": "Training apparel essentials \u2014 check fabric, fit and care details.", "src": "lineup-apparel"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("boldfit", "store-page");
  const mobileHref = storeGoHref("boldfit", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">Boldfit Official Store — Home Gym, Yoga & Fitness Accessories</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Build your workout setup by goal, compare materials and specs, and check live options and availability on the official Boldfit store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop Boldfit → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#boldfit-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop Boldfit direct</h2>
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

      <section id="boldfit-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Build your workout setup</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Pick your workout style for a quick checklist, then browse matching gear on the official store.</p>
        <div role="tablist" aria-label="Boldfit matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official Boldfit store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("boldfit", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Fitness gear</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop Boldfit by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse popular Boldfit categories and confirm specs, options and live availability on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("boldfit", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Choose gear suited to your fitness level and use it safely. Check product specs and Boldfit’s current policies on the official store.</p>
        <FaqSection eyebrow="Boldfit FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on Boldfit</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
