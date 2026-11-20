"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  BEAUTY_CHAPTERS,
  BEAUTY_FAQS,
  BRAND_SHOWCASE,
  BUDGET_EDITS,
  EVERYDAY_MAKEUP_BAG,
  OCCASION_COLLECTIONS,
  type BeautyChapter,
  type BudgetTier,
} from "@/data/amazon-beauty-toolkit";

function formatInr(value?: number) {
  if (typeof value !== "number") return null;
  return `₹${value.toLocaleString("en-IN")}`;
}

function tierStyles(tier: BudgetTier) {
  if (tier === "Everyday Value") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (tier === "Mid-Range Cult") return "bg-amber-50 text-amber-800 border-amber-200";
  return "bg-rose-50 text-rose-800 border-rose-200";
}

function chapterTheme(chapter: BeautyChapter) {
  if (chapter.accent === "rose") return { wrap: "bg-[#F7EFEC]", panel: "bg-[#fffaf8]", ink: "text-[#4a2f35]" };
  if (chapter.accent === "champagne") return { wrap: "bg-[#F5F0E6]", panel: "bg-[#fffdf8]", ink: "text-[#4a3b22]" };
  if (chapter.accent === "cocoa") return { wrap: "bg-[#1E1A17] text-[#F7F1E8]", panel: "bg-[#2A241F]", ink: "text-[#E8D8C7]" };
  return { wrap: "bg-[#F6F2EC]", panel: "bg-white", ink: "text-[#3f372f]" };
}

const HERO_LINKS = [
  { href: "#occasions", label: "Shop by Occasion" },
  { href: "#budget", label: "Shop by Budget" },
  { href: "#makeup-bag", label: "Everyday Makeup Bag" },
  { href: "#skin-climate", label: "Skin & Climate Tips" },
  { href: "#brands", label: "Explore Brands" },
];

export default function BeautyToolkitClient() {
  const [openFaq, setOpenFaq] = useState<string | null>(BEAUTY_FAQS[0]?.question ?? null);
  const bagKnownPrices = useMemo(() => EVERYDAY_MAKEUP_BAG.filter((i) => typeof i.priceInr === "number"), []);
  const bagTotal = bagKnownPrices.reduce((sum, i) => sum + (i.priceInr ?? 0), 0);

  return (
    <div className="bg-[#FBF8F4] text-[#1A1714]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#120F0D] text-[#FAF6F0]">
        <div className="absolute inset-0">
          <Image
            src="/collections/amazon-beauty-toolkit/hero-vanity.webp"
            alt="Premium beauty vanity with makeup products, brushes, and palettes"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,210,186,0.25),transparent_35%),linear-gradient(to_right,rgba(12,10,9,0.88),rgba(18,15,13,0.55),rgba(18,15,13,0.25))]" />
        </div>
        <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-end gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F0E2CF] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Amazon.in Beauty Edit for Indian Shoppers
            </p>
            <h1 className="mt-6 font-serif text-[2.8rem] font-semibold leading-[0.93] tracking-[-0.02em] sm:text-6xl lg:text-[5.4rem]">
              Makeup for every mood,
              <br />
              every budget,
              <br />
              <span className="italic text-[#E7CDB0]">every Indian girl.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#E8DDD0] sm:text-lg">
              From college-day kajal to wedding-ready glam—discover what to buy, what it does, and what fits your occasion and budget. A friendly beauty destination, not a confusing product dump.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {HERO_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-[#FAF6F0] backdrop-blur-sm transition hover:bg-white/20">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              { title: "What can I buy?", text: "Face, eyes, lips, finishing, tools, and removal—explained simply." },
              { title: "What suits my occasion?", text: "College, everyday glow, office, party, or wedding & festive." },
              { title: "What fits my budget?", text: "Affordable finds to premium picks, with live prices on Amazon.in." },
            ].map((card, i) => (
              <div key={card.title} className={`rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm ${i === 1 ? "sm:translate-x-4 lg:translate-x-0" : ""}`}>
                <p className="font-serif text-2xl text-[#FFF8EF]">{card.title}</p>
                <p className="mt-2 text-sm leading-7 text-[#E2D5C5]">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section id="occasions" className="scroll-mt-24 bg-[#F6F1EA] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Shop by real life</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-[#1A1714] sm:text-6xl">What’s the Occasion, Girl?</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#4A433C] sm:text-lg">
              Pick the moment, not the jargon. Whether it’s a rushed college morning or a full wedding function, start with looks and products that actually make sense for you.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-6">
            {OCCASION_COLLECTIONS.map((col, idx) => {
              const span = idx === 0 ? "md:col-span-4" : idx === 1 ? "md:col-span-2" : idx === 2 ? "md:col-span-2" : idx === 3 ? "md:col-span-2" : "md:col-span-2";
              const tall = idx === 0 || idx === 4;
              return (
                <article key={col.id} className={`group overflow-hidden rounded-[2rem] border border-[#DCCFC1] bg-white shadow-sm ${span}`}>
                  <div className={`relative ${tall ? "aspect-[16/10] md:aspect-[16/9]" : "aspect-[4/3]"} overflow-hidden`}>
                    <Image src={col.image} alt={col.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171310]/70 via-[#171310]/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F0E2CF]">{col.vibe}</p>
                      <h3 className="mt-1 font-serif text-3xl text-white sm:text-4xl">{col.title}</h3>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-7 text-[#4A433C] sm:text-base">{col.description}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {col.picks.map((p) => (
                        <a key={p.name} href={p.affiliateUrl} target="_blank" rel={GO_REL} className="rounded-xl border border-[#E5DAD0] bg-[#FFFCF8] p-3 transition hover:border-[#CDBBA8] hover:bg-white">
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#8A5A44]">{p.brand}</p>
                          <p className="mt-0.5 text-sm font-semibold leading-5 text-[#1A1714]">{p.name}</p>
                          <p className="mt-1 text-xs leading-5 text-[#5A524B]">{p.reason}</p>
                          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1A1714]">
                            {formatInr(p.priceInr) ?? "Check live price"} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </p>
                        </a>
                      ))}
                    </div>
                    <a href="#chapters" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1A1714] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#332B25]">
                      Explore Collection <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section id="budget" className="scroll-mt-24 bg-[#1A1714] py-16 text-[#F7F1E8] sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8C4AA]">Beauty for every budget</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] text-[#FFF8EF] sm:text-6xl">Little price. Big beauty energy.</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#D9CCBC] sm:text-lg">
              Indian shoppers shouldn’t have to guess what’s affordable. Explore budget-friendly finds and premium splurges—always check the <strong className="text-white">live INR price</strong>, shade, and seller on Amazon.in before buying.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {BUDGET_EDITS.map((edit, i) => {
              const span = i === 0 ? "lg:col-span-4" : i === 1 ? "lg:col-span-8" : i === 2 ? "lg:col-span-5" : i === 3 ? "lg:col-span-7" : "lg:col-span-12";
              const dark = i % 2 === 1;
              return (
                <article key={edit.id} className={`rounded-[2rem] border p-5 sm:p-6 ${span} ${dark ? "border-[#3A332D] bg-[#241F1B]" : "border-[#3A332D] bg-[#F7F1E8] text-[#1A1714]"}`}>
                  <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-[#D8C4AA]" : "text-[#8A5A44]"}`}>{edit.subtitle}</p>
                  <h3 className={`mt-2 font-serif text-3xl leading-tight sm:text-4xl ${dark ? "text-[#FFF8EF]" : "text-[#1A1714]"}`}>{edit.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${dark ? "text-[#D9CCBC]" : "text-[#4A433C]"}`}>{edit.note}</p>
                  <div className={`mt-5 grid gap-3 ${i === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
                    {edit.picks.map((p) => (
                      <a key={p.name} href={p.affiliateUrl} target="_blank" rel={GO_REL} className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${dark ? "border-[#413932] bg-[#1A1714] hover:border-[#5A4E43]" : "border-[#E5DAD0] bg-white hover:border-[#CDBBA8]"}`}>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${dark ? "text-[#D8C4AA]" : "text-[#8A5A44]"}`}>{p.brand}</p>
                        <p className={`mt-1 text-sm font-semibold leading-6 ${dark ? "text-[#FFF8EF]" : "text-[#1A1714]"}`}>{p.name}</p>
                        <p className={`mt-1 text-xs leading-5 ${dark ? "text-[#CFC0AE]" : "text-[#5A524B]"}`}>{p.reason}</p>
                        <span className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${dark ? "text-[#F0E2CF]" : "text-[#1A1714]"}`}>
                          {formatInr(p.priceInr) ?? "Check live price on Amazon.in"} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAKEUP BAG */}
      <section id="makeup-bag" className="scroll-mt-24 bg-[#EFE7DC] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-[#D8CCBF] bg-[#FBF7F1] p-6 shadow-sm sm:p-8 lg:sticky lg:top-24">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Beginner-friendly curation</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] text-[#1A1714] sm:text-5xl">Your Everyday Makeup Bag</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#4A433C]">
                A simple, practical kit for an everyday look—easy to carry, easy to use, and easy to build on. Pick the items you need and check live prices on Amazon.in.
              </p>
              <div className="mt-6 rounded-2xl border border-[#E5DAD0] bg-white p-5">
                <p className="text-sm font-semibold text-[#1A1714]">Estimated combined cost</p>
                {bagKnownPrices.length > 0 ? (
                  <>
                    <p className="mt-1 font-serif text-3xl text-[#1A1714]">~{formatInr(bagTotal)}</p>
                    <p className="mt-1 text-xs leading-6 text-[#5A524B]">Based on {bagKnownPrices.length} item(s) with available prices. Other items vary—check live prices on Amazon.in.</p>
                  </>
                ) : (
                  <>
                    <p className="mt-1 font-serif text-2xl text-[#1A1714]">Check live prices on Amazon.in</p>
                    <p className="mt-1 text-xs leading-6 text-[#5A524B]">Prices vary by brand, size, shade, and seller. Add items to see the current total on Amazon.in.</p>
                  </>
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {["Beginner-friendly", "6 practical essentials", "Amazon.in picks", "No fixed bundle"].map((chip) => (
                  <span key={chip} className="rounded-full border border-[#D8CCBF] bg-[#F6F1EA] px-3 py-1.5 font-medium text-[#3E3832]">{chip}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {EVERYDAY_MAKEUP_BAG.map((item, idx) => (
                <article key={item.name} className={`rounded-3xl border border-[#D8CCBF] bg-white p-5 shadow-sm ${idx % 3 === 0 ? "sm:col-span-2" : ""}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A5A44]">Everyday essential</p>
                      <h3 className="mt-1 font-serif text-2xl leading-tight text-[#1A1714]">{item.name}</h3>
                      <p className="mt-1 text-sm font-medium text-[#5A524B]">{item.brand}</p>
                    </div>
                    <span className="rounded-full bg-[#F6F1EA] px-3 py-1 text-xs font-semibold text-[#3E3832]">{formatInr(item.priceInr) ?? "Live price on Amazon"}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#4A433C]">{item.role}</p>
                  <a href={item.affiliateUrl} target="_blank" rel={GO_REL} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1A1714] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#332B25]">
                    View on Amazon.in <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKIN TONE & CLIMATE */}
      <section id="skin-climate" className="scroll-mt-24 bg-[#F2ECE4] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Made for you</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] text-[#1A1714] sm:text-6xl">Skin tone &amp; Indian weather, decoded.</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#4A433C] sm:text-lg">
                The right shade and the right texture can change everything. Use these simple tips to choose makeup that looks natural on your skin and holds up in your city’s climate.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#D8CCBF] bg-[#1A1714] p-6 text-[#F7F1E8] sm:p-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8C4AA]">Quick shade-matching tip</p>
              <p className="mt-3 font-serif text-2xl leading-snug text-[#FFF8EF] sm:text-3xl">Check foundation/concealer in natural daylight on your jawline—not your hand.</p>
              <p className="mt-3 text-sm leading-7 text-[#D9CCBC]">Swatch 2–3 close shades, let them sit for a minute, and pick the one that disappears into your skin. When in doubt, check shade guides and reviews on Amazon.in.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[#D8CCBF] bg-white p-6 shadow-sm sm:p-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A5A44]">Skin tone &amp; undertone guidance</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight text-[#1A1714] sm:text-4xl">Find shades that flatter you</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Warm undertones",
                    text: "Skin may look golden/peachy in sunlight. Gold jewellery often complements well. Try foundations with golden/warm/yellow hints and lip colors like corals, warm reds, and peachy nudes.",
                  },
                  {
                    title: "Cool undertones",
                    text: "Skin may show pink/rosy hints. Silver jewellery can complement well. Look for cool/rosy/neutral-cool shades and lip colors like berry, mauve, and blue-based reds.",
                  },
                  {
                    title: "Neutral undertones",
                    text: "A mix of warm and cool—many shades can work. If a foundation looks too yellow or too pink, try a neutral option. Test in daylight for the best match.",
                  },
                  {
                    title: "Olive undertones",
                    text: "Skin can have a green/golden balance and sometimes looks ashy in very pink bases. Look for olive/golden-neutral shades where available and avoid overly pink tones if they look grey.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#E5DAD0] bg-[#FFFCF8] p-4">
                    <h4 className="font-serif text-xl text-[#1A1714]">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-[#4A433C]">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4A433C]">
                <strong className="text-[#1A1714]">For Indian skin tones:</strong> many people fall across fair-to-deep ranges with warm, neutral, or olive undertones. Prioritize undertone over just “fair/medium/dusky” labels, and use swatches/reviews to confirm.
              </p>
            </article>

            <article className="rounded-[2rem] border border-[#3A332D] bg-[#241F1B] p-6 text-[#F7F1E8] shadow-sm sm:p-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8C4AA]">Climate-smart makeup</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight text-[#FFF8EF] sm:text-4xl">Choose textures for your weather</h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Hot & humid / monsoon",
                    text: "Go lightweight and breathable: gripping primer, thin base layers, compact/loose powder on oily areas, smudge-resistant kajal/liner/mascara, and a setting spray. Blot and touch up instead of piling on more product.",
                    tone: "bg-[#1A1714] border-[#3A332D]",
                  },
                  {
                    title: "Dry winter / AC-heavy days",
                    text: "Prep with hydration and choose comfortable, creamy textures (cream blush, hydrating lip products). If skin feels tight, avoid over-powdering—set only where needed to keep a fresh finish.",
                    tone: "bg-[#1A1714] border-[#3A332D]",
                  },
                  {
                    title: "Sunny days & outdoor events",
                    text: "Keep makeup comfortable and long-wearing. Use SPF in your skincare routine during the day, and prefer smudge-resistant eye/lip products for heat and sweat. Reapply touch-ups thoughtfully as needed.",
                    tone: "bg-[#1A1714] border-[#3A332D]",
                  },
                ].map((item) => (
                  <div key={item.title} className={`rounded-2xl border p-4 ${item.tone}`}>
                    <h4 className="font-serif text-xl text-[#FFF8EF]">{item.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-[#D9CCBC]">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-[#BFB3A3]">
                Everyone’s skin behaves differently. Patch-test new products, check ingredients/shades on Amazon.in, and adjust textures based on how your skin feels in your local weather.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <div id="chapters" className="scroll-mt-24">
        {BEAUTY_CHAPTERS.map((chapter, chapterIndex) => {
          const theme = chapterTheme(chapter);
          const dark = chapter.accent === "cocoa";
          return (
            <section key={chapter.id} className={`${theme.wrap} py-16 sm:py-20 lg:py-24`}>
              <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${chapterIndex % 2 === 1 ? "" : ""}`}>
                  <div className={`lg:col-span-7 ${chapterIndex % 2 === 1 ? "lg:order-2" : ""}`}>
                    <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.22em] ${dark ? "text-[#D8C4AA]" : "text-[#8A5A44]"}`}>{chapter.step}</p>
                    <h2 className={`mt-3 font-serif text-4xl font-semibold leading-[0.98] tracking-tight sm:text-6xl ${dark ? "text-[#FFF8EF]" : "text-[#1A1714]"}`}>{chapter.title}</h2>
                    <p className={`mt-2 font-serif text-xl italic sm:text-2xl ${dark ? "text-[#E0CDB5]" : "text-[#6B4A3A]"}`}>{chapter.subtitle}</p>
                    <p className={`mt-4 max-w-2xl text-base leading-8 sm:text-lg ${dark ? "text-[#D9CCBC]" : "text-[#4A433C]"}`}>{chapter.intro}</p>
                  </div>
                  <div className={`lg:col-span-5 ${chapterIndex % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className={`relative overflow-hidden rounded-[2rem] border p-3 shadow-sm ${dark ? "border-[#3A332D] bg-[#241F1B]" : "border-[#D8CCBF] bg-white/70"}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
                        <Image src={chapter.image} alt={chapter.imageAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid gap-6">
                  {chapter.categories.map((category, idx) => (
                    <article key={category.id} className={`rounded-[2rem] border p-5 sm:p-7 ${dark ? "border-[#3A332D] bg-[#241F1B]" : "border-[#DDD2C6] bg-[#FFFCF8]"}`}>
                      <div className={`grid gap-6 lg:grid-cols-12 ${idx % 2 === 1 ? "" : ""}`}>
                        <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${dark ? "border-[#4A413A] bg-[#1A1714] text-[#E0CDB5]" : "border-[#D8CCBF] bg-[#F6F0E8] text-[#4A433C]"}`}>{category.occasionTag}</span>
                          </div>
                          <h3 className={`mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl ${dark ? "text-[#FFF8EF]" : "text-[#1A1714]"}`}>{category.title}</h3>
                          <p className={`mt-2 font-serif text-lg italic sm:text-xl ${dark ? "text-[#E0CDB5]" : "text-[#6B4A3A]"}`}>{category.editorialHeadline}</p>
                          <div className="mt-5 space-y-3">
                            <div className={`rounded-2xl border p-4 ${dark ? "border-[#3A332D] bg-[#1A1714]" : "border-[#E4D9CC] bg-[#F8F3EC]"}`}>
                              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-[#D8C4AA]" : "text-[#8A5A44]"}`}>What it does</p>
                              <p className={`mt-1 text-sm leading-7 sm:text-base ${dark ? "text-[#D9CCBC]" : "text-[#3E3832]"}`}>{category.whatItIs}</p>
                            </div>
                            <div className={`rounded-2xl border p-4 ${dark ? "border-[#3A332D] bg-[#2A241F]" : "border-[#E4D9CC] bg-white"}`}>
                              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-[#D8C4AA]" : "text-[#8A5A44]"}`}>When to use it</p>
                              <p className={`mt-1 text-sm leading-7 sm:text-base ${dark ? "text-[#D9CCBC]" : "text-[#3E3832]"}`}>{category.oneLineFact}</p>
                            </div>
                          </div>
                        </div>

                        <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {category.tiers.map((t, tIdx) => (
                              <div key={`${category.id}-${t.tier}-${t.name}`} className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${dark ? "border-[#3A332D] bg-[#1A1714]" : "border-[#E5DAD0] bg-white"} ${tIdx === 1 ? "sm:col-span-2 xl:col-span-1" : ""}`}>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tierStyles(t.tier)}`}>{t.tier}</span>
                                  <span className={`text-xs font-medium ${dark ? "text-[#CFC0AE]" : "text-[#6A5C52]"}`}>{t.brand}</span>
                                </div>
                                <h4 className={`mt-3 font-serif text-xl leading-snug ${dark ? "text-[#FFF8EF]" : "text-[#1A1714]"}`}>{t.name}</h4>
                                <p className={`mt-2 text-sm leading-6 ${dark ? "text-[#D9CCBC]" : "text-[#4A433C]"}`}>{t.whyPick}</p>
                                <div className="mt-3 flex items-center justify-between gap-3">
                                  <span className={`text-sm font-semibold ${dark ? "text-[#F0E2CF]" : "text-[#1A1714]"}`}>{formatInr(t.priceInr) ?? "Live price on Amazon.in"}</span>
                                </div>
                                <a href={t.affiliateUrl} target="_blank" rel={GO_REL} className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${dark ? "bg-[#F7F1E8] text-[#1A1714] hover:bg-white" : "bg-[#1A1714] text-white hover:bg-[#332B25]"}`}>
                                  View on Amazon.in <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                </a>
                                <p className={`mt-2 text-[11px] leading-5 ${dark ? "text-[#AFA292]" : "text-[#6A5C52]"}`}>Search: {t.amazonSearchQuery}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* BRANDS */}
      <section id="brands" className="scroll-mt-24 bg-[#F4EEE6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Brand discovery</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] text-[#1A1714] sm:text-6xl">The names Indian makeup bags know.</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#4A433C] sm:text-lg">
              Explore familiar, loved beauty brands available on Amazon.in—from budget-friendly favorites to premium picks. Open a brand to browse its current products and live prices.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRAND_SHOWCASE.map((brand, idx) => (
              <a key={brand.name} href={brand.affiliateUrl} target="_blank" rel={GO_REL} className={`group relative overflow-hidden rounded-[2rem] border border-[#D8CCBF] p-6 transition hover:-translate-y-0.5 hover:shadow-md ${idx % 3 === 0 ? "bg-[#1A1714] text-[#F7F1E8] lg:col-span-2" : "bg-white text-[#1A1714]"}`}>
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl ${idx % 3 === 0 ? "bg-[#C9A97E]/20" : "bg-[#EBDDCB]"}`} aria-hidden="true" />
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${idx % 3 === 0 ? "text-[#D8C4AA]" : "text-[#8A5A44]"}`}>{brand.tagline}</p>
                <h3 className={`mt-3 font-serif text-3xl leading-tight sm:text-4xl ${idx % 3 === 0 ? "text-[#FFF8EF]" : "text-[#1A1714]"}`}>{brand.name}</h3>
                <p className={`mt-3 max-w-md text-sm leading-7 sm:text-base ${idx % 3 === 0 ? "text-[#D9CCBC]" : "text-[#4A433C]"}`}>{brand.focus}</p>
                <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${idx % 3 === 0 ? "text-[#F0E2CF]" : "text-[#1A1714]"}`}>
                  Explore on Amazon.in <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FBF8F4] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Makeup, made simple</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#1A1714] sm:text-5xl">New to makeup? You’re in the right place.</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-[#4A433C]">
              Short, friendly explanations to help you shop with confidence. No complicated jargon—just what each product does and when it helps.
            </p>
            <div className="mt-8 rounded-3xl border border-[#D8CCBF] bg-[#F6F1EA] p-6">
              <p className="font-serif text-2xl text-[#1A1714]">Beauty Finds Worth Your Money.</p>
              <p className="mt-2 text-sm leading-7 text-[#4A433C]">Start small, learn what you love, and build a kit that fits your routine and your budget.</p>
            </div>
          </div>
          <div className="space-y-3">
            {BEAUTY_FAQS.map((faq) => {
              const open = openFaq === faq.question;
              return (
                <div key={faq.question} className="overflow-hidden rounded-2xl border border-[#D8CCBF] bg-white">
                  <button type="button" onClick={() => setOpenFaq(open ? null : faq.question)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open}>
                    <span className="font-serif text-xl leading-snug text-[#1A1714] sm:text-2xl">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#6A5C52] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {open && <p className="border-t border-[#E4D9CC] px-5 py-4 text-sm leading-7 text-[#4A433C] sm:text-base">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER NOTE / CLOSING */}
      <section className="bg-[#120F0D] py-14 text-[#F7F1E8] sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8C4AA]">Your beauty destination</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#FFF8EF] sm:text-5xl">Ready for college, office, parties, and every celebration in between.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#occasions" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F7F1E8] px-6 text-sm font-semibold text-[#1A1714] transition hover:bg-white">Shop by Occasion</a>
              <a href="#budget" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-[#F7F1E8] transition hover:bg-white/10">Shop by Budget</a>
              <Link href="/collections" className="inline-flex min-h-12 items-center justify-center px-2 text-sm font-medium text-[#D9CCBC] underline-offset-4 hover:text-white hover:underline">All Collections</Link>
            </div>
          </div>
          <p className="mt-8 max-w-4xl border-t border-white/10 pt-6 text-xs leading-6 text-[#BFB3A3]">
            Amazon.in products only. Product information is provided to help you discover and compare; <strong className="text-[#F0E2CF]">live prices, availability, shades, and offers can change</strong> on Amazon.in. No discounts, prices, ratings, or popularity claims are invented. Affiliate/tracked links are used and can be replaced with direct affiliate URLs per product.
          </p>
        </div>
      </section>
    </div>
  );
}
