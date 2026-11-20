"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ExternalLink, Filter, Sparkles, X } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  AMAZON_BEAUTY_STAGES,
  BEAUTY_FAQS,
  type BeautyCategory,
  type BudgetTier,
  type OccasionTag,
} from "@/data/amazon-beauty-toolkit";

type StepFilter = "all" | (typeof AMAZON_BEAUTY_STAGES)[number]["id"];
type BudgetFilter = "All Budgets" | BudgetTier;
type OccasionFilter = "All Occasions" | OccasionTag;

const STEP_OPTIONS: { id: StepFilter; label: string }[] = [
  { id: "all", label: "All Steps" },
  ...AMAZON_BEAUTY_STAGES.map((s) => ({ id: s.id as StepFilter, label: `${s.step}. ${s.title}` })),
];

const BUDGET_OPTIONS: BudgetFilter[] = ["All Budgets", "Everyday Value", "Mid-Range Cult", "Luxe Splurge"];
const OCCASION_OPTIONS: OccasionFilter[] = ["All Occasions", "5-Min Everyday", "Humidity-Proof", "Wedding & Party Glam"];

const STARTER_CHECKLIST = [
  "Hydrating toner or mist",
  "Primer (pore-blurring/gripping)",
  "Foundation or skin tint",
  "Concealer",
  "Compact/setting powder",
  "Blush",
  "Eyebrow pencil/definer",
  "Mascara",
  "Lipstick or lip tint",
  "Setting spray or compact for touch-ups",
  "Makeup remover (micellar water/balm)",
];

function tierClasses(tier: BudgetTier) {
  if (tier === "Everyday Value") return "border-emerald-200 bg-emerald-50/70 text-emerald-900";
  if (tier === "Mid-Range Cult") return "border-amber-200 bg-amber-50/70 text-amber-900";
  return "border-fuchsia-200 bg-fuchsia-50/70 text-fuchsia-900";
}

function tierAccent(tier: BudgetTier) {
  if (tier === "Everyday Value") return "from-emerald-50 to-white";
  if (tier === "Mid-Range Cult") return "from-amber-50 to-white";
  return "from-rose-50 to-white";
}

export default function BeautyToolkitClient() {
  const [step, setStep] = useState<StepFilter>("all");
  const [budget, setBudget] = useState<BudgetFilter>("All Budgets");
  const [occasion, setOccasion] = useState<OccasionFilter>("All Occasions");
  const [showChecklist, setShowChecklist] = useState(false);
  const [owned, setOwned] = useState<Record<string, boolean>>({});

  const filteredStages = useMemo(() => {
    return AMAZON_BEAUTY_STAGES.map((stage) => {
      if (step !== "all" && stage.id !== step) return null;
      const categories = stage.categories.filter((category) => {
        const occasionOk = occasion === "All Occasions" || category.occasionTag === occasion;
        return occasionOk;
      });
      if (categories.length === 0) return null;
      return { ...stage, categories };
    }).filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, [step, occasion]);

  const totalVisibleCategories = filteredStages.reduce((acc, s) => acc + s.categories.length, 0);
  const ownedCount = STARTER_CHECKLIST.filter((item) => owned[item]).length;

  const visibleTiers = (category: BeautyCategory) =>
    category.tiers.filter((t) => budget === "All Budgets" || t.tier === budget);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-[2rem] border border-rose-200/70 bg-white shadow-[0_20px_60px_rgba(31,25,24,0.06)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-[#FFF7F4] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8A4B5A]">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> Premium Amazon Beauty Edit
            </div>
            <h1 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-[#1F1918] sm:text-5xl">
              Complete Makeup Toolkit for Amazon India
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#4A433F] sm:text-lg">
              Build your kit in application order—from prep to setting spray. Compare <strong>Everyday Value</strong>, <strong>Mid-Range Cult</strong>, and <strong>Luxe Splurge</strong> picks with clear, occasion-led guidance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
              {[
                "Step-by-step routine flow",
                "Budget-tier comparisons",
                "Occasion-based picks",
                "Tracked Amazon links",
              ].map((chip) => (
                <span key={chip} className="rounded-full border border-[#1F1918]/10 bg-[#FAF7F5] px-3 py-1.5 font-medium text-[#3F3935]">
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#toolkit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F1918] px-6 text-sm font-semibold text-white transition hover:bg-[#342b29]">
                Explore the Toolkit
              </a>
              <button
                type="button"
                onClick={() => setShowChecklist((v) => !v)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1F1918]/15 bg-white px-6 text-sm font-semibold text-[#1F1918] transition hover:border-[#1F1918]/30 hover:bg-[#FAF7F5]"
              >
                <Filter className="h-4 w-4" aria-hidden="true" /> Beginner Starter Vanity Checklist
              </button>
            </div>
          </div>
          <div className="relative min-h-[280px] bg-[#F6EFEA] lg:min-h-full">
            <Image
              src="/collections/amazon-beauty-toolkit/hero-vanity.webp"
              alt="Luxury vanity flatlay with makeup palettes, lipsticks, brushes, and beauty products"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1F1918]/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Checklist drawer/toggle */}
      {showChecklist && (
        <section className="mt-6 rounded-3xl border border-rose-200/70 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A4B5A]">Beginner starter vanity checklist</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#1F1918]">Check what you already own</h2>
              <p className="mt-2 text-sm leading-7 text-[#4A433F]">Tick off basics you have and spot what’s missing from a simple, complete starter kit. (Saved in this page session only.)</p>
            </div>
            <button type="button" onClick={() => setShowChecklist(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1F1918]/10 text-[#4A433F] hover:bg-[#FAF7F5]" aria-label="Close checklist">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-[#1F1918]/10 bg-[#FAF7F5] p-4">
            <p className="text-sm font-semibold text-[#1F1918]">Progress: {ownedCount}/{STARTER_CHECKLIST.length} basics checked</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {STARTER_CHECKLIST.map((item) => {
                const checked = !!owned[item];
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOwned((prev) => ({ ...prev, [item]: !checked }))}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${checked ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-[#1F1918]/10 bg-white text-[#3F3935] hover:border-[#1F1918]/20"}`}
                  >
                    <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? "border-emerald-500 bg-emerald-500 text-white" : "border-[#1F1918]/20 bg-white"}`}>
                      {checked ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Controls */}
      <section id="toolkit" className="sticky top-2 z-20 mt-8 rounded-3xl border border-rose-200/70 bg-white/95 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85 sm:p-5">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B5E58]">Routine steps</p>
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Routine steps">
              {STEP_OPTIONS.map((opt) => {
                const active = step === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStep(opt.id)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-[#1F1918] bg-[#1F1918] text-white" : "border-[#1F1918]/12 bg-[#FAF7F5] text-[#2F2A27] hover:border-[#1F1918]/25 hover:bg-white"}`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B5E58]">Budget tier</p>
              <div className="flex flex-wrap gap-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBudget(opt)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${budget === opt ? "border-[#1F1918] bg-[#1F1918] text-white" : "border-[#1F1918]/12 bg-white text-[#2F2A27] hover:border-[#1F1918]/25"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B5E58]">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {OCCASION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setOccasion(opt)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${occasion === opt ? "border-[#8A4B5A] bg-[#8A4B5A] text-white" : "border-[#1F1918]/12 bg-white text-[#2F2A27] hover:border-[#8A4B5A]/35"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-[#5A524D]">Showing <strong className="text-[#1F1918]">{totalVisibleCategories}</strong> categories. Product cards display tracked Amazon links; check live price, shade, and availability on Amazon before buying.</p>
        </div>
      </section>

      {/* Stages */}
      <div className="mt-8 space-y-8">
        {filteredStages.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#1F1918]/15 bg-white p-10 text-center text-[#5A524D]">
            No categories match the selected filters. Try changing the step or occasion filter.
          </div>
        )}
        {filteredStages.map((stage) => (
          <section key={stage.id} className="scroll-mt-40 rounded-[2rem] border border-rose-200/60 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[260px_1fr] lg:items-start">
              <div>
                <div className="relative overflow-hidden rounded-2xl border border-[#1F1918]/10 bg-[#FAF7F5]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={stage.image} alt={stage.imageAlt} fill sizes="(max-width: 1024px) 100vw, 260px" className="object-cover" />
                  </div>
                </div>
                <p className="mt-4 inline-flex rounded-full bg-[#1F1918] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">Step {stage.step}</p>
                <h2 className="mt-2 font-serif text-2xl font-extrabold text-[#1F1918] sm:text-3xl">{stage.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#4A433F]">{stage.description}</p>
              </div>

              <div className="space-y-5">
                {stage.categories.map((category) => {
                  const tiers = visibleTiers(category);
                  return (
                    <article key={category.id} className="rounded-2xl border border-[#1F1918]/10 bg-[#FFFCFA] p-4 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-[#1F1918]/10 bg-white px-2.5 py-1 text-xs font-semibold text-[#1F1918]">Stage {stage.step}</span>
                            <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-900">{category.occasionTag}</span>
                          </div>
                          <h3 className="mt-2 text-lg font-bold text-[#1F1918] sm:text-xl">{category.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 rounded-xl border border-amber-200/70 bg-amber-50/50 px-4 py-3 text-sm leading-7 text-[#3F3935]">
                        <strong className="text-[#1F1918]">What it does & when to use:</strong> {category.oneLineFact}
                      </p>

                      {tiers.length === 0 ? (
                        <p className="mt-4 rounded-xl border border-dashed border-[#1F1918]/15 bg-white p-4 text-sm text-[#5A524D]">
                          No tiers shown for this budget filter. Select <strong>All Budgets</strong> to compare Everyday, Mid-Range, and Luxe picks.
                        </p>
                      ) : (
                        <div className={`mt-4 grid gap-3 ${tiers.length === 3 ? "lg:grid-cols-3" : tiers.length === 2 ? "md:grid-cols-2" : ""}`}>
                          {tiers.map((t) => (
                            <div key={`${category.id}-${t.tier}-${t.name}`} className={`rounded-xl border p-4 bg-gradient-to-b ${tierAccent(t.tier)} border-[#1F1918]/10`}>
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tierClasses(t.tier)}`}>{t.tier}</span>
                                <span className="text-xs font-medium text-[#6B5E58]">{t.brand}</span>
                              </div>
                              <h4 className="mt-3 text-sm font-semibold leading-6 text-[#1F1918] sm:text-base">{t.name}</h4>
                              <p className="mt-1 text-sm leading-6 text-[#4A433F]">{t.whyPick}</p>
                              <a
                                href={t.affiliateUrl}
                                target="_blank"
                                rel={GO_REL}
                                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#1F1918] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#342b29]"
                                aria-label={`Check live price on Amazon for ${t.name}`}
                              >
                                Check Live Price on Amazon <ExternalLink aria-hidden="true" className="h-4 w-4" />
                              </a>
                              <p className="mt-2 text-[11px] leading-5 text-[#6B5E58]">Search cue: {t.amazonSearchQuery}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* FAQs */}
      <section aria-labelledby="beauty-faqs" className="mt-12 rounded-[2rem] border border-rose-200/60 bg-white p-5 shadow-sm sm:p-7">
        <h2 id="beauty-faqs" className="font-serif text-2xl font-extrabold text-[#1F1918] sm:text-3xl">Makeup toolkit FAQs</h2>
        <p className="mt-2 text-sm leading-7 text-[#4A433F]">Quick answers for common beginner questions. Always check product details, shades, and ingredients on Amazon before purchase.</p>
        <div className="mt-5 space-y-3">
          {BEAUTY_FAQS.map((faq, idx) => (
            <details key={faq.question} open={idx === 0} className="group rounded-2xl border border-[#1F1918]/10 bg-[#FFFCFA] p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-[#1F1918] marker:content-none">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[#6B5E58] transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#4A433F] sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-8 border-t border-[#1F1918]/10 pt-5 text-xs leading-6 text-[#5A524D]">
        Live prices, shades, availability, and offers are set by Amazon and sellers and can change. Verify final details on Amazon before ordering. This page uses tracked outbound links and does not show hardcoded prices or invented discounts.
      </p>
    </div>
  );
}
