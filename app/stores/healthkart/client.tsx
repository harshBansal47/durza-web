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

const ADVANTAGES = [{"title": "Authenticity & sourcing focus", "desc": "HealthKart emphasizes sourcing from brands/authorized channels and provides authenticity verification guidance for eligible products \u2014 see details on the site."}, {"title": "Wide supplement & nutrition range", "desc": "Compare whey, creatine, vitamins, health foods and more across brands and formats with detailed product information."}, {"title": "Combos, rewards & value packs", "desc": "Combo bundles and loyalty/reward benefits may be available on HealthKart \u2014 check live offers and terms on the store."}, {"title": "Delivery & returns per policy", "desc": "Pan-India delivery and returns/replacements apply as per HealthKart policies and product eligibility \u2014 review at checkout."}] as const;
const MATCHERS = [{"id": "muscle", "label": "Muscle & Recovery", "headline": "Protein support for training and recovery", "bullets": ["Compare protein per serving, ingredients and suitability (e.g. concentrate/isolate)", "Verify authenticity codes/seals on delivery where applicable", "Choose pack size based on servings and consistency"], "cta": "Explore whey protein \u2192", "src": "matcher-muscle"}, {"id": "strength", "label": "Strength & Performance", "headline": "Creatine and performance nutrition basics", "bullets": ["Check serving size, purity and ingredient transparency", "Follow label directions and hydrate adequately", "Consider combos if you also need protein or accessories"], "cta": "Explore performance nutrition \u2192", "src": "matcher-strength"}, {"id": "gainers", "label": "Weight & Calorie Support", "headline": "Gainers and calorie-dense nutrition options", "bullets": ["Review carb/protein ratio and added sugars per serving", "Align with your overall diet and training plan", "Compare value by servings, not just tub price"], "cta": "Explore gainers \u2192", "src": "matcher-gainers"}, {"id": "daily", "label": "Daily Vitamins & Wellness", "headline": "Micronutrients, omega-3 and everyday health", "bullets": ["Check dosage, ingredient form and dietary markers", "Avoid stacking overlapping supplements without guidance", "Review labels and consult a professional if needed"], "cta": "Explore vitamins & wellness \u2192", "src": "matcher-daily"}] as const;
const LINEUP = [{"title": "Whey Protein", "badge": "Protein", "copy": "Concentrate, isolate and blends \u2014 compare protein per scoop and ingredients.", "src": "lineup-whey"}, {"title": "Creatine", "badge": "Performance", "copy": "Creatine monohydrate and more \u2014 check serving, purity and format.", "src": "lineup-creatine"}, {"title": "Mass Gainers", "badge": "Calories", "copy": "Calorie and carb-protein options \u2014 review macros per serving.", "src": "lineup-gainers"}, {"title": "Pre-Workout & Aminos", "badge": "Training", "copy": "Pre-workout and amino products \u2014 check stimulant and ingredient labels.", "src": "lineup-preworkout"}, {"title": "Health Foods & Snacks", "badge": "Nutrition", "copy": "Protein foods, peanut butter and bars \u2014 compare nutrition per serving.", "src": "lineup-foods"}, {"title": "Vitamins & Omega-3", "badge": "Wellness", "copy": "Multivitamins, fish oil and more \u2014 review dosage and suitability.", "src": "lineup-vitamins"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  const [active, setActive] = useState<string>(MATCHERS[0]?.id ?? "");
  const current = useMemo(() => MATCHERS.find((m) => m.id === active) ?? MATCHERS[0], [active]);
  const heroHref = storeGoHref("healthkart", "store-page");
  const mobileHref = storeGoHref("healthkart", "mobile-sticky");

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-ledger-line bg-gradient-to-br from-white via-slate-50 to-amber-50/40 p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">Official store guide</p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight text-ink sm:text-5xl">HealthKart Official Store — Protein, Creatine & Sports Nutrition</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">Shop supplements by goal, compare protein and ingredient labels, and check live prices, combos and authenticity guidance on the official HealthKart store.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={heroHref} target="_blank" rel={GO_REL} className="btn btn-cta inline-flex items-center gap-2">Shop HealthKart → <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#healthkart-matcher" className="inline-flex items-center rounded-full border border-ledger-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-50">Find what fits</a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">We link you to the official store to check live price, availability and current terms.</p>
        </div>
      </section>

      <TrustStats {...stats} />

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Why shop HealthKart direct</h2>
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

      <section id="healthkart-matcher" className="mt-12 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Pick supplements by your goal</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Choose your fitness goal for a quick checklist, then browse the matching category on HealthKart.</p>
        <div role="tablist" aria-label="HealthKart matcher" className="mt-5 flex flex-wrap gap-2">
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
              <p className="text-sm text-ink-soft">Browse the matching range on the official HealthKart store to compare live options, pricing and availability.</p>
              <a href={storeGoHref("healthkart", current.src)} target="_blank" rel={GO_REL} className="btn btn-cta mt-4 inline-flex items-center justify-center gap-2">{current.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        )}
      </section>

      <section className="mt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Popular categories</p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Shop HealthKart by category</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">Browse key supplement categories and confirm labels, authenticity guidance and live pricing on the official store.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINEUP.map((item) => (
            <a key={item.title} href={storeGoHref("healthkart", item.src)} target="_blank" rel={GO_REL} className="group rounded-2xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
        <p className="mb-2 max-w-3xl text-sm text-ink-soft">Supplements support nutrition and training but are not substitutes for medical advice. Read labels carefully and consult a professional when appropriate.</p>
        <FaqSection eyebrow="HealthKart FAQs" items={faqs} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a href={mobileHref} target="_blank" rel={GO_REL} className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white">
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Official store</span>
            <span className="block truncate text-xs font-semibold">Check live range & offers on HealthKart</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
        </a>
      </div>
    </div>
  );
}
