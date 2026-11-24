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


const ADVANTAGES = [{"title": "HealthKart-backed brand", "desc": "HK Vitals is part of the HealthKart ecosystem, offering targeted nutraceutical ranges \u2014 review brand and product details on hkvitals.com."}, {"title": "Targeted formulations", "desc": "Products are organized by concerns like skin, hair, immunity and daily nutrition with clear ingredient information on listings."}, {"title": "Combo & multi-pack options", "desc": "Multi-pack and combo options are commonly available for consistent routines \u2014 compare pack sizes and value on the official store."}, {"title": "Clear labeling & dietary markers", "desc": "Check vegetarian/non-vegetarian markers, ingredients and usage directions on each product page before buying."}] as const;
const MATCHERS = [{"id": "skin", "label": "Skin & Glow", "headline": "Nutrition support for skin routines", "bullets": ["Check key ingredients (e.g. collagen/vitamins) and dietary markers", "Look for pack durations suited to consistent use", "Follow label directions and consult a professional if needed"], "cta": "Explore skin supplements \u2192", "src": "matcher-skin"}, {"id": "hair", "label": "Hair & Nails", "headline": "Support for hair and nail nutrition", "bullets": ["Review biotin/mineral blends and suitability for your diet", "Choose formats (tablet/gummy) that fit your routine", "Check allergens and usage guidance on the listing"], "cta": "Explore hair supplements \u2192", "src": "matcher-hair"}, {"id": "daily", "label": "Daily Multivitamins", "headline": "Everyday micronutrient support", "bullets": ["Pick formulations appropriate for your age/gender and needs", "Check dosage and avoid unnecessary overlap with other supplements", "Review ingredient forms and dietary markers"], "cta": "Explore multivitamins \u2192", "src": "matcher-daily"}, {"id": "joints", "label": "Joints, Heart & Immunity", "headline": "Omega-3 and targeted wellness support", "bullets": ["Check EPA/DHA or active ingredient amounts as listed", "Choose formats and serving sizes you can take consistently", "Confirm suitability and consult a professional when appropriate"], "cta": "Explore wellness supplements \u2192", "src": "matcher-wellness"}] as const;
const LINEUP = [{"title": "Collagen & Skin Care", "badge": "Skin", "copy": "Collagen and skin-nutrition products \u2014 review ingredients and pack sizes.", "src": "lineup-collagen"}, {"title": "Biotin & Hair Care", "badge": "Hair", "copy": "Hair-focused supplements \u2014 check biotin blends and dietary markers.", "src": "lineup-hair"}, {"title": "Skin Radiance", "badge": "Glow", "copy": "Antioxidant and radiance-focused options \u2014 review composition and usage.", "src": "lineup-radiance"}, {"title": "Daily Multivitamins", "badge": "Daily", "copy": "Multivitamins for everyday needs \u2014 compare formulations and dosage.", "src": "lineup-multivitamins"}, {"title": "Omega-3 & Fish Oil", "badge": "Wellness", "copy": "Omega-3 supplements \u2014 check EPA/DHA amounts and format.", "src": "lineup-omega3"}, {"title": "Gut & Metabolism", "badge": "Routine", "copy": "ACV and routine-support products \u2014 review ingredients and directions.", "src": "lineup-gut"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("hkvitals", "store-page");
  const mobileHref = storeGoHref("hkvitals", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">HK Vitals Official Store — Skin, Hair & Daily Wellness Supplements</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Choose HK Vitals supplements by concern, review ingredients and dietary markers, and check live packs and pricing on the official store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop HK Vitals → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#hkvitals-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop HK Vitals direct</h2>
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

      <section id="hkvitals-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Choose by your concern</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Select a concern for a quick checklist, then explore the matching HK Vitals range on the official store.</p>
        <div role="tablist" aria-label="HK Vitals matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official HK Vitals store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("hkvitals", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Supplement ranges</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Explore HK Vitals by concern</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse HK Vitals categories and confirm ingredients, dietary markers and live pricing on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("hkvitals", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Supplements support nutrition but are not medical treatments and results vary. Check labels and consult a healthcare professional when appropriate.</p>
        <FaqSection eyebrow="HK Vitals FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on HK Vitals</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
