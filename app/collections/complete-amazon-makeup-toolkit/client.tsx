"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  BEAUTY_BUDGET_FILTERS,
  BEAUTY_PICK_CHECKED_LABEL,
  BEAUTY_SHOP_CATEGORIES,
  parsePriceValue,
  type BeautyProduct,
} from "@/data/amazon-beauty-toolkit";

const serif = "font-['Playfair_Display',Georgia,serif]";
const FALLBACK_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

function SafeImage({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}

function matchesBudget(product: BeautyProduct, max: number | null) {
  if (max == null) return true;
  const value = parsePriceValue(product.priceLabel);
  return value != null && value <= max;
}

function ProductCard({ product }: { product: BeautyProduct }) {
  const hasLivePrice = product.priceLabel !== "Check price";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7DDD1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#F6F0E8]">
        <SafeImage
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3A312A] shadow-sm">
          {product.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6A55]">{product.brand}</p>
        <h3 className="mt-2 text-base font-semibold leading-6 text-[#2A211A] sm:text-lg">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#5F5247]">{product.description}</p>

        <div className="mt-4 border-t border-[#EFE6DC] pt-4">
          {hasLivePrice ? (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-xl font-bold text-[#2A211A]">{product.priceLabel}</span>
              {product.mrpLabel ? <span className="text-sm text-[#8A7A6D] line-through">{product.mrpLabel}</span> : null}
              {product.discountLabel ? <span className="text-sm font-semibold text-[#1F7A4D]">{product.discountLabel}</span> : null}
            </div>
          ) : (
            <p className="text-sm font-semibold text-[#5F5247]">Check price</p>
          )}
        </div>

        <a
          href={product.amazonUrl}
          target="_blank"
          rel={GO_REL}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2A211A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3B3128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A14A2A] focus-visible:ring-offset-2"
          aria-label={`View ${product.name} on Amazon`}
        >
          View on Amazon <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function BeautyToolkitClient() {
  const [budgetMax, setBudgetMax] = useState<number | null>(null);

  const sections = useMemo(() => {
    return BEAUTY_SHOP_CATEGORIES.map((category) => {
      const filtered = category.products.filter((p) => matchesBudget(p, budgetMax));
      return { category, filtered };
    });
  }, [budgetMax]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2A211A]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFF7F1] border-b border-[#E7DDD1]">
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
              Six clear sections, 36 curated picks—organized by trend, occasion, starter basics, and tools. Scroll, compare, and check the latest details on Amazon.
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

            <div className="mt-8 flex flex-wrap gap-2">
              {BEAUTY_SHOP_CATEGORIES.map((c) => (
                <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-[#E0D2C3] bg-white px-4 py-2 text-sm font-medium text-[#3E342C] hover:border-[#A14A2A] hover:text-[#A14A2A]">
                  {c.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All sections on one page */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="space-y-16 sm:space-y-20">
          {sections.map(({ category, filtered }) => (
            <section key={category.slug} id={category.slug} className="scroll-mt-24">
              <div className="mb-8 flex flex-col gap-4 border-b border-[#E7DDD1] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A14A2A]">
                    {category.eyebrow}{category.updatedLabel ? ` · ${category.updatedLabel}` : ""}
                  </p>
                  <h2 className={`${serif} mt-2 text-3xl font-semibold text-[#2A211A] sm:text-4xl`}>{category.title}</h2>
                  <p className="mt-3 text-base leading-7 text-[#5F5247]">{category.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full border border-[#E0D2C3] bg-white px-4 py-2 text-sm font-medium text-[#5F5247]">
                    {filtered.length}/{category.products.length} picks
                  </span>
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D8CFC4] bg-white/60 p-8 text-center text-sm text-[#6B5D52]">
                  No picks in this section under the selected budget filter.
                </div>
              )}
            </section>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-center text-xs leading-6 text-[#7A6A5D]">
          Prices, MRP, and discounts are indicative and may change. Check the latest price and availability on Amazon.in before buying.
        </p>
      </div>
    </main>
  );
}
