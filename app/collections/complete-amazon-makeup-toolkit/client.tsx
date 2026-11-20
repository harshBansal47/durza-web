"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BEAUTY_SHOP_CATEGORIES } from "@/data/amazon-beauty-toolkit";

const BASE = "/collections/complete-amazon-makeup-toolkit";

function HeroDecor() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4DFC8" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#F4DFC8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F4DFC8" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="heroGlow" cx="80%" cy="20%" r="45%">
          <stop offset="0%" stopColor="#F2CDA8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F2CDA8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#heroGlow)" />
      <path d="M-40 720 C 240 560, 520 860, 820 680 C 1080 520, 1260 620, 1500 460" stroke="url(#heroLine)" strokeWidth="1.5" fill="none" />
      <path d="M-60 610 C 260 470, 540 760, 860 560 C 1120 390, 1300 520, 1520 360" stroke="url(#heroLine)" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="1080" cy="180" r="180" stroke="#F4DFC8" strokeOpacity="0.18" strokeWidth="1" fill="none" />
      <circle cx="1080" cy="180" r="240" stroke="#F4DFC8" strokeOpacity="0.1" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function BeautyToolkitClient() {
  return (
    <div className="bg-[#120F0D] text-[#F7F1E8]">
      {/* HERO */}
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/collections/amazon-beauty-toolkit/hero-vanity.webp"
            alt="Beauty makeup store edit for Indian shoppers"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(10,8,7,0.92)_0%,rgba(18,15,13,0.78)_38%,rgba(42,28,22,0.45)_68%,rgba(18,15,13,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(240,201,160,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(168,106,74,0.18),transparent_40%)]" />
        </div>
        <HeroDecor />

        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:px-10 lg:pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F3E3D0] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Amazon.in Beauty Storefront
            </p>
            <h1 className="mt-6 font-serif text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.02em] text-[#FFF8F0] sm:text-6xl lg:text-[5.2rem]">
              Browse beauty
              <br />
              by the moment
              <br />
              <span className="italic text-[#E8C7A8]">you’re dressing for.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#E4D6C6] sm:text-lg">
              A curated makeup store for Indian shoppers. Pick a relatable category, explore handpicked products with prices and offers, then shop directly on Amazon.in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#categories"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F7F1E8] px-7 text-sm font-semibold text-[#1A1714] transition hover:bg-white"
              >
                Browse Categories
              </a>
              <p className="flex items-center text-sm text-[#D9C8B5]">Curated picks • Live prices on Amazon • Affiliate links</p>
            </div>
          </div>

          <div className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Categories", v: `${BEAUTY_SHOP_CATEGORIES.length} edits` },
              { k: "Marketplace", v: "Amazon.in" },
              { k: "For", v: "Indian shoppers" },
              { k: "Style", v: "Shop & compare" },
            ].map((stat) => (
              <div key={stat.k} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E7D3BC]">{stat.k}</p>
                <p className="mt-1 font-serif text-xl text-[#FFF8F0] sm:text-2xl">{stat.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative overflow-hidden bg-[#FBF7F2] py-14 text-[#1A1714] sm:py-18 lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden="true">
          <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="catWash" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F3E6D8" />
                <stop offset="100%" stopColor="#FBF7F2" />
              </linearGradient>
            </defs>
            <rect width="1200" height="800" fill="url(#catWash)" />
            <circle cx="1050" cy="120" r="260" fill="#E9D8C6" fillOpacity="0.35" />
            <circle cx="120" cy="680" r="220" fill="#E2D2C2" fillOpacity="0.3" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A5A44]">Shop by relatable category</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.98] tracking-tight text-[#1A1714] sm:text-5xl lg:text-6xl">
                Pick your vibe. We’ll show the kit.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#4A433C] sm:text-lg">
                Tap a category to explore curated product picks—each with an image, tag, price &amp; offer details, and a direct Amazon button.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-[#DCCFC1] bg-white/70 px-5 py-4 text-sm text-[#4A433C] backdrop-blur-sm lg:block">
              <span className="font-semibold text-[#1A1714]">Tip:</span> Choose by occasion or need, then compare on Amazon.in.
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BEAUTY_SHOP_CATEGORIES.map((category, idx) => (
              <Link
                key={category.slug}
                href={`${BASE}/${category.slug}`}
                className={`group relative isolate overflow-hidden rounded-[2rem] border border-[#D8CCBF] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  idx === 0 || idx === 3 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                  <Image
                    src={category.coverImage}
                    alt={category.coverAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.theme.gradient}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.18),transparent_35%)]" />
                  <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 520" preserveAspectRatio="none">
                    <path d="M-20 420 C 80 360, 180 460, 280 380 C 340 330, 380 350, 430 300" stroke={category.theme.accent} strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
                    <path d="M260 -20 C 280 60, 360 80, 420 140" stroke={category.theme.accent} strokeOpacity="0.28" strokeWidth="1" fill="none" />
                    <circle cx="330" cy="90" r="54" stroke={category.theme.accent} strokeOpacity="0.22" fill="none" />
                  </svg>

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                    <span
                      className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
                      style={{ color: category.theme.ink, borderColor: "rgba(255,255,255,0.28)", backgroundColor: category.theme.soft }}
                    >
                      {category.eyebrow}
                    </span>
                    <span
                      className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                    >
                      {category.products.length} picks
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6" style={{ color: category.theme.ink }}>
                    <h3 className="font-serif text-3xl font-semibold leading-tight sm:text-[2.1rem]">{category.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/90 sm:text-[15px]">{category.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-[#1A1714] transition group-hover:bg-white">
                      Explore Category <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-[#6A5C52]">
            Prices, MRP, discounts, and availability are shown as live/indicative labels—please check the latest details on Amazon.in before buying.
          </p>
        </div>
      </section>
    </div>
  );
}
