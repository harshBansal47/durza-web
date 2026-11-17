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

const ADVANTAGES = [{"title": "Genuine warranty & brand support", "desc": "Manufacturer-backed warranty and authorized service support on eligible products, as specified on Havells listings."}, {"title": "Installation on eligible appliances", "desc": "Installation/demo support may be available for eligible products (such as water heaters and select appliances) \u2014 confirm by PIN code on the product page."}, {"title": "Energy ratings & current models", "desc": "View BEE star ratings, specifications and current model details directly on official Havells listings."}, {"title": "EMI & payment options at checkout", "desc": "EMI and bank/card payment options may be available on eligible orders \u2014 check live terms at checkout."}] as const;
const MATCHERS = [{"id": "cooling", "label": "Cooling & Fans", "headline": "Efficient airflow for bedrooms and living spaces", "bullets": ["Match fan sweep size to your room and ceiling height", "Consider BLDC motors for lower power use and quieter operation", "Check controls, finish and warranty details on the listing"], "cta": "Explore cooling & fans \u2192", "src": "matcher-cooling"}, {"id": "water-heating", "label": "Water Heating", "headline": "Storage and instant geysers for your home", "bullets": ["Choose capacity based on household size and usage", "Verify pressure rating and safety features for your building type", "Confirm installation availability and warranty on the product page"], "cta": "Explore water heaters \u2192", "src": "matcher-water-heating"}, {"id": "kitchen", "label": "Kitchen Appliances", "headline": "Appliances tuned for everyday Indian cooking", "bullets": ["Pick motor power, capacity and build suited to your cooking needs", "Compare presets, attachments and ease of cleaning", "Review energy use, safety features and service coverage"], "cta": "Explore kitchen appliances \u2192", "src": "matcher-kitchen"}, {"id": "air-light", "label": "Air, Lighting & Grooming", "headline": "Comfort, lighting and personal care essentials", "bullets": ["Match air-care coverage/filtration and lighting output to each space", "Compare grooming runtime, attachments and washability", "Check specifications and availability on the official store"], "cta": "Browse Havells range \u2192", "src": "matcher-air-light"}] as const;
const LINEUP = [{"title": "BLDC & Ceiling Fans", "badge": "Cooling", "copy": "Energy-efficient fans in multiple designs \u2014 compare sweep, motor type and ratings.", "src": "lineup-fans"}, {"title": "Water Heaters (Geysers)", "badge": "Hot water", "copy": "Storage and instant options \u2014 check capacity, pressure rating and safety features.", "src": "lineup-water-heaters"}, {"title": "Kitchen Appliances", "badge": "Kitchen", "copy": "Mixer grinders, air fryers and more \u2014 review power, capacity and warranty.", "src": "lineup-kitchen"}, {"title": "Air Purifiers & Heaters", "badge": "Air care", "copy": "Comfort solutions for your room \u2014 match coverage, filtration and noise levels.", "src": "lineup-air-care"}, {"title": "Personal Grooming", "badge": "Grooming", "copy": "Trimmers and grooming tools \u2014 compare blades, runtime and attachments.", "src": "lineup-grooming"}, {"title": "LED & Home Lighting", "badge": "Lighting", "copy": "Lighting for every space \u2014 check wattage, lumens and colour temperature.", "src": "lineup-lighting"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("havells", "store-page");
  const mobileHref = storeGoHref("havells", "mobile-sticky");

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">Havells Official Store — Fans, Water Heaters & Home Appliances</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Compare Havells appliances by room and need, then check live price, availability and eligible service options on the official store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop Havells official store → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#havells-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop Havells direct</h2>
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

      <section id="havells-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Find the right Havells appliance</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Pick your need to see what to look for, then browse the matching range on the official Havells store.</p>
        <div role="tablist" aria-label="Havells matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official Havells store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("havells", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official range</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop Havells by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse key Havells categories and check live configurations, pricing and availability on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("havells", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Shopping and service details can vary by product and PIN code. Check the official Havells listing and checkout for the latest information.</p>
        <FaqSection eyebrow="Havells FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on Havells</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </main>
  );
}
