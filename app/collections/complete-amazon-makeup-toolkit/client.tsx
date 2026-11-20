"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  BEAUTY_CHAPTERS,
  BEAUTY_FAQS,
  type BeautyCategory,
  type BudgetTier,
  type OccasionTag,
} from "@/data/amazon-beauty-toolkit";

type BudgetFilter = "all" | BudgetTier;
type OccasionFilter = "all" | OccasionTag;
type LookFilter = "all" | "natural" | "glam";

const BUDGET_OPTIONS: { id: BudgetFilter; label: string; note: string }[] = [
  { id: "all", label: "All Budgets", note: "Compare every tier side by side" },
  { id: "Everyday Value", label: "Everyday Value", note: "Affordable everyday beauty" },
  { id: "Mid-Range Cult", label: "Mid-Range Cult", note: "Beloved, best-balance picks" },
  { id: "Luxe Splurge", label: "Luxe Splurge", note: "Worth-the-investment icons" },
];

const OCCASION_OPTIONS: { id: OccasionFilter; label: string; note: string }[] = [
  { id: "all", label: "Every Occasion", note: "See the full edit" },
  { id: "5-Min Everyday", label: "5-Min Everyday", note: "Effortless, quick routines" },
  { id: "Humidity-Proof", label: "Humidity-Proof", note: "For heat, sweat, and long days" },
  { id: "Wedding & Party Glam", label: "Wedding & Party Glam", note: "Show-stopping, lasting looks" },
];

const LOOK_OPTIONS: { id: LookFilter; label: string }[] = [
  { id: "all", label: "Any look" },
  { id: "natural", label: "Natural & polished" },
  { id: "glam", label: "Glam & defined" },
];

const KIT_PRESETS = [
  {
    id: "everyday-natural",
    title: "The 5-Minute Everyday Kit",
    desc: "Fresh skin, soft definition, effortless color.",
    budget: "Everyday Value" as BudgetTier,
    occasion: "5-Min Everyday" as OccasionTag,
    look: "natural" as LookFilter,
  },
  {
    id: "humidity-office",
    title: "The Humidity-Proof Kit",
    desc: "Grip, set, and stay comfortable through long days.",
    budget: "Mid-Range Cult" as BudgetTier,
    occasion: "Humidity-Proof" as OccasionTag,
    look: "natural" as LookFilter,
  },
  {
    id: "wedding-glam",
    title: "The Wedding & Party Glam Kit",
    desc: "Luminous base, defined eyes, lasting color.",
    budget: "Luxe Splurge" as BudgetTier,
    occasion: "Wedding & Party Glam" as OccasionTag,
    look: "glam" as LookFilter,
  },
];

function tierTone(tier: BudgetTier) {
  if (tier === "Everyday Value") return { badge: "bg-[#E8F1EA] text-[#24543A] border-[#CFE3D5]", panel: "bg-[#FBFDFB] border-[#DCE9E1]" };
  if (tier === "Mid-Range Cult") return { badge: "bg-[#F6EFE3] text-[#6B4A1E] border-[#E7D7BF]", panel: "bg-[#FFFCF7] border-[#EADCC8]" };
  return { badge: "bg-[#F3E8E8] text-[#5A2F3B] border-[#E6D1D6]", panel: "bg-[#FFFBFA] border-[#EBD8DC]" };
}

function accentSurface(accent: "ivory" | "rose" | "champagne" | "cocoa") {
  if (accent === "rose") return "bg-[#F3EAE6]";
  if (accent === "champagne") return "bg-[#EFE7DA]";
  if (accent === "cocoa") return "bg-[#EAE3DC]";
  return "bg-[#F4EFE8]";
}

function matchesDiscovery(cat: BeautyCategory, occasion: OccasionFilter, look: LookFilter) {
  if (occasion !== "all" && cat.occasionTag !== occasion) return false;
  if (look === "natural") return cat.occasionTag !== "Wedding & Party Glam" || /blush|mascara|lip gloss|toner|concealer|brow|compact/i.test(cat.title);
  if (look === "glam") return cat.occasionTag === "Wedding & Party Glam" || /foundation|eyeshadow|highlighter|lipstick|liner|contour|setting powder|fixer/i.test(cat.title);
  return true;
}

export default function BeautyToolkitClient() {
  const [budget, setBudget] = useState<BudgetFilter>("all");
  const [occasion, setOccasion] = useState<OccasionFilter>("all");
  const [look, setLook] = useState<LookFilter>("all");
  const [openTip, setOpenTip] = useState<string | null>(BEAUTY_FAQS[0]?.question ?? null);

  const totalProducts = BEAUTY_CHAPTERS.reduce((acc, ch) => acc + ch.categories.length * 3, 0);

  const curated = useMemo(() => {
    return BEAUTY_CHAPTERS.map((chapter) => {
      const categories = chapter.categories.filter((c) => matchesDiscovery(c, occasion, look));
      return { ...chapter, categories };
    }).filter((c) => c.categories.length > 0);
  }, [occasion, look]);

  const visibleCount = curated.reduce((acc, ch) => acc + ch.categories.length, 0);

  function applyPreset(p: (typeof KIT_PRESETS)[number]) {
    setBudget(p.budget);
    setOccasion(p.occasion);
    setLook(p.look);
    const el = document.getElementById("discovery");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate min-h-[88svh] overflow-hidden bg-[#15110E] text-[#F8F3EC]">
        <div className="absolute inset-0">
          <Image
            src="/collections/amazon-beauty-toolkit/hero-vanity.webp"
            alt="Luxury beauty campaign flatlay with makeup palettes, lipsticks, brushes, and cosmetics"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#120E0B]/85 via-[#1A1411]/55 to-[#1A1411]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E0B]/70 via-transparent to-[#120E0B]/20" />
        </div>

        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:px-10 lg:pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F3E7D8] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Beauty &amp; Makeup Discovery
            </p>
            <h1 className="mt-6 font-serif text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.02em] text-[#FFFBF5] sm:text-6xl lg:text-[5.2rem]">
              Your Beauty.
              <br />
              Your Rules.
              <br />
              <span className="italic text-[#E7D3BF]">Your Perfect Makeup Kit.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#E9DED1] sm:text-lg">
              From everyday essentials to show-stopping glam, discover the products that make every look possible—curated across budgets, occasions, and routines on Amazon.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#discovery" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7F1E8] px-7 text-sm font-semibold text-[#1C1714] transition hover:bg-white">
                Start Your Discovery <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#chapters" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 text-sm font-semibold text-[#F8F3EC] backdrop-blur-sm transition hover:bg-white/10">
                Explore the Toolkit <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/collections" className="inline-flex min-h-12 items-center justify-center gap-2 px-2 text-sm font-medium text-[#E9DED1] underline-offset-4 hover:text-white hover:underline">
                All Collections
              </Link>
            </div>
          </div>

          <div className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: `${BEAUTY_CHAPTERS.reduce((a, c) => a + c.categories.length, 0)} categories`, v: "Face, eyes, lips & finishing" },
              { k: `${totalProducts} curated picks`, v: "Everyday to luxe tiers" },
              { k: "3 occasions", v: "Everyday, humidity-proof, glam" },
              { k: "Amazon only", v: "Genuine products, easy link swaps" },
            ].map((item) => (
              <div key={item.k} className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold text-[#FFFBF5] sm:text-base">{item.k}</p>
                <p className="mt-1 text-xs leading-5 text-[#D9CBB8] sm:text-sm">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5A45]">A curated beauty destination</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-[1.05] tracking-tight text-[#1C1714] sm:text-5xl">
              Makeup is not one routine. <span className="italic text-[#6B4A3A]">It’s a mood, a moment, a way of showing up.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#4A433C] sm:text-lg">
            This toolkit is designed to help you understand what each product does, choose by budget and occasion, and build a kit that feels personal—whether you’re getting ready in five minutes or preparing for a night that deserves extra sparkle.
          </p>
        </div>
      </section>

      {/* Discovery */}
      <section id="discovery" className="scroll-mt-24 border-y border-[#D9CEC1] bg-[#F3EEE7]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5A45]">Interactive discovery</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#1C1714] sm:text-5xl">Discover your kit, your way.</h2>
              <p className="mt-4 max-w-lg text-base leading-8 text-[#4A433C]">
                Explore by occasion, budget, or the kind of look you want. We’ll curate the chapters and categories that fit—so discovery feels intuitive, not overwhelming.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6A5C52]">Occasion</p>
                  <div className="flex flex-wrap gap-2">
                    {OCCASION_OPTIONS.map((o) => (
                      <button key={o.id} type="button" onClick={() => setOccasion(o.id)} className={`rounded-full border px-4 py-2 text-sm transition ${occasion === o.id ? "border-[#1C1714] bg-[#1C1714] text-white" : "border-[#CFC3B6] bg-white/70 text-[#2A2521] hover:border-[#8A7868]"}`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6A5C52]">Budget lens</p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button key={b.id} type="button" onClick={() => setBudget(b.id)} className={`rounded-full border px-4 py-2 text-sm transition ${budget === b.id ? "border-[#6B4A3A] bg-[#6B4A3A] text-white" : "border-[#CFC3B6] bg-white/70 text-[#2A2521] hover:border-[#8A7868]"}`}>
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6A5C52]">Look</p>
                  <div className="flex flex-wrap gap-2">
                    {LOOK_OPTIONS.map((l) => (
                      <button key={l.id} type="button" onClick={() => setLook(l.id)} className={`rounded-full border px-4 py-2 text-sm transition ${look === l.id ? "border-[#1C1714] bg-[#1C1714] text-white" : "border-[#CFC3B6] bg-white/70 text-[#2A2521] hover:border-[#8A7868]"}`}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-[#4A433C]">
                Showing <strong className="text-[#1C1714]">{visibleCount}</strong> curated categories. Budget lens highlights your preferred tier while keeping all Amazon picks easy to compare.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {KIT_PRESETS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`group rounded-3xl border border-[#D8CCBF] bg-white/80 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${i === 1 ? "xl:translate-y-6" : ""}`}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A5A45]">Curated kit</p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-[#1C1714]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A433C]">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B4A3A]">
                    Apply this edit <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <div id="chapters" className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {curated.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#CFC3B6] bg-white p-10 text-center text-[#4A433C]">
            No categories match this combination yet. Try a different occasion or look.
          </div>
        )}

        {curated.map((chapter, chapterIndex) => (
          <section key={chapter.id} className="scroll-mt-24">
            <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${chapterIndex % 2 === 1 ? "" : ""}`}>
              <div className={`lg:col-span-7 ${chapterIndex % 2 === 1 ? "lg:order-2" : ""}`}>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5A45]">{chapter.step}</p>
                <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-[#1C1714] sm:text-6xl">
                  {chapter.title}
                </h2>
                <p className="mt-2 font-serif text-xl italic text-[#6B4A3A] sm:text-2xl">{chapter.subtitle}</p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#4A433C] sm:text-lg">{chapter.intro}</p>
              </div>
              <div className={`lg:col-span-5 ${chapterIndex % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className={`relative overflow-hidden rounded-[2rem] border border-[#D8CCBF] ${accentSurface(chapter.accent)} p-3 shadow-sm`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
                    <Image src={chapter.image} alt={chapter.imageAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              {chapter.categories.map((category, idx) => {
                const tiers = budget === "all" ? category.tiers : category.tiers.filter((t) => t.tier === budget);
                const featured = category.tiers[1] ?? category.tiers[0];
                const isEditorial = idx % 2 === 0;
                return (
                  <article key={category.id} className="rounded-[2rem] border border-[#DDD2C6] bg-[#FFFCF8] p-5 shadow-[0_10px_30px_rgba(28,23,20,0.04)] sm:p-7">
                    <div className={`grid gap-6 ${isEditorial ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"}`}>
                      <div className={`${isEditorial ? "" : "lg:order-2"}`}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#D8CCBF] bg-[#F6F0E8] px-3 py-1 text-xs font-semibold text-[#4A433C]">{chapter.step}</span>
                          <span className="rounded-full border border-[#E3D4D7] bg-[#F8F1F2] px-3 py-1 text-xs font-semibold text-[#6B4A53]">{category.occasionTag}</span>
                        </div>
                        <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#1C1714] sm:text-4xl">{category.title}</h3>
                        <p className="mt-2 font-serif text-lg italic text-[#6B4A3A] sm:text-xl">{category.editorialHeadline}</p>

                        <div className="mt-5 space-y-3">
                          <div className="rounded-2xl border border-[#E4D9CC] bg-[#F8F3EC] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A5A45]">What it is</p>
                            <p className="mt-1 text-sm leading-7 text-[#3E3832] sm:text-base">{category.whatItIs}</p>
                          </div>
                          <div className="rounded-2xl border border-[#E4D9CC] bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A5A45]">When it shines</p>
                            <p className="mt-1 text-sm leading-7 text-[#3E3832] sm:text-base">{category.oneLineFact}</p>
                          </div>
                        </div>

                        {budget === "all" && (
                          <div className="mt-5 rounded-2xl border border-[#1C1714]/10 bg-[#1C1714] p-4 text-[#F8F3EC]">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D9CBB8]">Editor’s spotlight</p>
                            <p className="mt-1 text-sm leading-7 text-[#F3EBDD]"><strong className="text-white">{featured.brand} {featured.name}</strong> — {featured.whyPick} <span className="text-[#D9CBB8]">({featured.tier})</span></p>
                          </div>
                        )}
                      </div>

                      <div className={`${isEditorial ? "" : "lg:order-1"}`}>
                        {tiers.length === 0 ? (
                          <div className="flex h-full items-center rounded-2xl border border-dashed border-[#D8CCBF] bg-[#FAF7F2] p-6 text-sm leading-7 text-[#4A433C]">
                            No picks shown for the selected budget lens. Choose <strong className="mx-1 text-[#1C1714]">All Budgets</strong> to compare every tier for this category.
                          </div>
                        ) : (
                          <div className={`grid gap-3 ${tiers.length === 3 ? "sm:grid-cols-2 xl:grid-cols-3" : tiers.length === 2 ? "sm:grid-cols-2" : ""}`}>
                            {tiers.map((t, tIdx) => {
                              const tone = tierTone(t.tier);
                              const featuredCard = budget === "all" && tiers.length === 3 && tIdx === 1;
                              return (
                                <div key={`${category.id}-${t.tier}-${t.name}`} className={`group rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${tone.panel} ${featuredCard ? "sm:col-span-2 xl:col-span-1 xl:-translate-y-1" : ""}`}>
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tone.badge}`}>{t.tier}</span>
                                    <span className="text-xs font-medium text-[#6A5C52]">{t.brand}</span>
                                  </div>
                                  <h4 className="mt-3 font-serif text-xl leading-snug text-[#1C1714]">{t.name}</h4>
                                  <p className="mt-2 text-sm leading-6 text-[#4A433C]">{t.whyPick}</p>
                                  <a
                                    href={t.affiliateUrl}
                                    target="_blank"
                                    rel={GO_REL}
                                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1C1714] px-4 py-2.5 text-sm font-semibold text-[#F8F3EC] transition hover:bg-[#332B25]"
                                  >
                                    View on Amazon <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                  </a>
                                  <p className="mt-2 text-[11px] leading-5 text-[#6A5C52]">Search: {t.amazonSearchQuery}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Editorial notes / education */}
      <section className="border-y border-[#D9CEC1] bg-[#F3EEE7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5A45]">Beauty, explained beautifully</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#1C1714] sm:text-5xl">Little knowledge. Big confidence.</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-[#4A433C]">
              Makeup becomes easier when every product has a purpose. Tap through quick explanations and practical answers—designed to be helpful even if you’re just starting out.
            </p>
            <div className="mt-8 rounded-3xl border border-[#D8CCBF] bg-white/70 p-5">
              <p className="font-serif text-2xl text-[#1C1714]">“A Little Glam Never Hurt.”</p>
              <p className="mt-2 text-sm leading-7 text-[#4A433C]">But the best kit is the one that fits your life—your budget, your climate, your occasions, your rules.</p>
            </div>
          </div>
          <div className="space-y-3">
            {BEAUTY_FAQS.map((faq) => {
              const open = openTip === faq.question;
              return (
                <div key={faq.question} className="overflow-hidden rounded-2xl border border-[#D8CCBF] bg-white/80">
                  <button
                    type="button"
                    onClick={() => setOpenTip(open ? null : faq.question)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-serif text-xl leading-snug text-[#1C1714] sm:text-2xl">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#6A5C52] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {open && <p className="border-t border-[#E4D9CC] px-5 py-4 text-sm leading-7 text-[#4A433C] sm:text-base">{faq.answer}</p>}
                </div>
              );
            })}
            <p className="pt-2 text-xs leading-6 text-[#6A5C52]">
              Educational notes are general guidance. Check product details, shades, ingredients, and suitability on Amazon before purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-[#D8CCBF] bg-[#1C1714] px-6 py-12 text-[#F8F3EC] sm:px-10 lg:px-14">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#6B4A3A]/30 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#D9CBB8]/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D9CBB8]">The edit continues</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beauty finds worth your time, your budget, and your moment.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#E3D7C8]">
                Explore Amazon picks across everyday essentials and luxe icons, compare by occasion, and build a makeup kit that feels considered—not complicated.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <a href="#discovery" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7F1E8] px-7 text-sm font-semibold text-[#1C1714] transition hover:bg-white">
                Refine Your Discovery <Check className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#chapters" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-sm font-semibold text-[#F8F3EC] transition hover:bg-white/10">
                Browse Chapters <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs leading-6 text-[#6A5C52]">
          Amazon-only product recommendations shown with genuine product information. Live prices, shades, availability, and seller details are determined on Amazon and may change. Affiliate/tracked links are used and can be updated with direct affiliate URLs per product as needed. No discounts, ratings, or popularity claims are invented.
        </p>
      </section>
    </div>
  );
}
