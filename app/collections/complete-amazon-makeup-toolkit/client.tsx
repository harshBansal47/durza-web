"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import {
  ALL_BEAUTY_PRODUCTS,
  BEAUTY_BUDGET_FILTERS,
  BEAUTY_PICK_CHECKED_LABEL,
  BEAUTY_SHOP_CATEGORIES,
  BEAUTY_TRENDING_DATE_LABEL,
  parsePriceValue,
  type BeautyProduct,
} from "@/data/amazon-beauty-toolkit";

const serif = "font-['Playfair_Display',Georgia,serif]";
const FALLBACK_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

function SafeThumb({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="176px"
      className="object-cover transition duration-300 group-hover:scale-[1.03]"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}

function matchesBudget(product: BeautyProduct, max: number | null) {
  if (max == null) return true;
  const value = parsePriceValue(product.priceLabel);
  return value != null && value <= max;
}

export default function BeautyToolkitClient() {
  const [budgetMax, setBudgetMax] = useState<number | null>(null);

  const trending = BEAUTY_SHOP_CATEGORIES.find((c) => c.slug === "trending-now");
  const trendingProducts = trending?.products ?? [];

  const categories = useMemo(() => {
    return BEAUTY_SHOP_CATEGORIES.map((category) => {
      const filtered = category.products.filter((p) => matchesBudget(p, budgetMax));
      return { category, filteredCount: filtered.length };
    });
  }, [budgetMax]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2A211A]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFF7F1]">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#E8D5C8] bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#7A4A2E]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Durza Beauty Store
            </p>
            <h1 className={`${serif} mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#2A211A] sm:text-5xl lg:text-6xl`}>
              Pick a look. <span className="text-[#A14A2A]">Shop it on Amazon.in.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5F5247] sm:text-lg">
              Six clear sections, 36 curated picks—organized by trend, occasion, starter basics, and tools. Tap a section, compare picks, and check the latest details on Amazon.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#2A211A] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFF7F1]">
                {BEAUTY_PICK_CHECKED_LABEL}
              </span>
              <span className="text-sm text-[#6B5D52]">Budget filter:</span>
              <button
                type="button"
                onClick={() => setBudgetMax(null)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${budgetMax === null ? "border-[#2A211A] bg-[#2A211A] text-white" : "border-[#D8CFC4] bg-white text-[#3E342C] hover:border-[#A14A2A]"}`}
              >
                All
              </button>
              {BEAUTY_BUDGET_FILTERS.map((f) => (
                <button
                  key={f.max}
                  type="button"
                  onClick={() => setBudgetMax(f.max)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${budgetMax === f.max ? "border-[#2A211A] bg-[#2A211A] text-white" : "border-[#D8CFC4] bg-white text-[#3E342C] hover:border-[#A14A2A]"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending strip */}
      <section className="border-y border-[#E7DDD1] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A14A2A]">{BEAUTY_TRENDING_DATE_LABEL}</p>
              <h2 className={`${serif} mt-1 text-2xl font-semibold text-[#2A211A] sm:text-3xl`}>Trending this week</h2>
            </div>
            <Link href="/collections/complete-amazon-makeup-toolkit/trending-now" className="inline-flex items-center gap-1 text-sm font-semibold text-[#A14A2A] hover:underline">
              View all <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {trendingProducts.map((product) => (
              <Link
                key={product.id}
                href="/collections/complete-amazon-makeup-toolkit/trending-now"
                className="group w-44 shrink-0 rounded-2xl border border-[#ECE2D8] bg-[#FFFCF9] p-3 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F3ECE4]">
                  <SafeThumb src={product.image} alt={product.name} />
                </div>
                <p className="mt-3 line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6A55]">{product.brand}</p>
                <p className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-[#2A211A]">{product.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding banner */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/collections/complete-amazon-makeup-toolkit/wedding-festive"
          className="group flex flex-col gap-4 rounded-3xl border border-[#E8D8BF] bg-gradient-to-r from-[#FFF8EE] via-[#FFF1DA] to-[#FCE8C8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#946200]">Seasonal spotlight</p>
            <h2 className={`${serif} mt-2 text-2xl font-semibold text-[#3A2A14] sm:text-3xl`}>Wedding season is on</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5F4A2E] sm:text-base">Long-wear, photo-friendly picks for shaadi functions, festive events, and touch-ups that last.</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#3A2A14] px-5 py-3 text-sm font-semibold text-[#FFF8EE] transition group-hover:bg-[#2A1E0F]">
            Explore Wedding & Festive <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6A55]">Browse by section</p>
            <h2 className={`${serif} mt-2 text-3xl font-semibold text-[#2A211A] sm:text-4xl`}>Find your kit, your way</h2>
          </div>
          <p className="hidden text-sm text-[#6B5D52] sm:block">{budgetMax ? `Showing products under ₹${budgetMax.toLocaleString("en-IN")}` : "All price ranges"}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ category, filteredCount }) => (
            <Link
              key={category.slug}
              href={`/collections/complete-amazon-makeup-toolkit/${category.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-[#E7DDD1] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE5DA]">
                <Image src={category.coverImage} alt={category.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">{category.eyebrow}</p>
                    <h3 className={`${serif} mt-1 text-2xl font-semibold text-white`}>{category.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2A211A]">
                    {filteredCount}/{category.products.length} picks
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-[#5F5247]">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#A14A2A]">
                  Explore section <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-[#7A6A5D]">
          Prices, MRP, and discounts are indicative and may change. Check the latest price and availability on Amazon.in before buying.
        </p>
      </section>
    </main>
  );
}
