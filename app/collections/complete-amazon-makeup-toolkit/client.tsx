"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  ALL_BEAUTY_PRODUCTS,
  BEAUTY_INFO_SECTIONS,
  BEAUTY_SHOP_CATEGORIES,
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

function ProductCard({ product }: { product: BeautyProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E7DDD1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#F6F0E8]">
        <SafeImage
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 240px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#3A312A] shadow-sm sm:px-2.5 sm:py-1 sm:text-[10px]">
          {product.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8A6A55] sm:text-[10px]">{product.brand}</p>
        <h3 className="mt-1 font-['Inter',ui-sans-serif,system-ui,sans-serif] text-xs font-medium leading-4 text-[#2A211A] sm:text-[13px] sm:leading-5">{product.name}</h3>

        <div className="mt-2.5 border-t border-[#EFE6DC] pt-2.5">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-sm font-bold text-[#2A211A] sm:text-base">{product.priceLabel}</span>
            {product.mrpLabel ? <span className="text-[11px] text-[#8A7A6D] line-through sm:text-xs">{product.mrpLabel}</span> : null}
            {product.discountLabel ? <span className="text-[11px] font-semibold text-[#1F7A4D] sm:text-xs">{product.discountLabel}</span> : null}
          </div>
        </div>

        <a
          href={product.amazonUrl}
          target="_blank"
          rel={GO_REL}
          className="mt-2.5 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[#2A211A] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#3B3128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A14A2A] focus-visible:ring-offset-2 sm:text-xs"
          aria-label={`View ${product.name} on Amazon`}
        >
          View on Amazon <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function SectionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#A14A2A]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4L12 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PRICE_RANGES = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500–₹1,000", min: 500, max: 1000 },
  { label: "₹1,000+", min: 1000, max: Infinity },
] as const;

function getNumericPrice(label: string): number | null {
  if (!label || label === "Check price") return null;
  const m = label.match(/₹\s*([0-9,]+)/);
  if (!m) return null;
  return Number(m[1].replace(/,/g, ""));
}

export default function BeautyToolkitClient() {
  const [priceIdx, setPriceIdx] = useState(0);
  const [brand, setBrand] = useState("All brands");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const p of ALL_BEAUTY_PRODUCTS) set.add(p.brand);
    return ["All brands", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const priceRange = PRICE_RANGES[priceIdx];

  const filteredCategories = useMemo(() => {
    return BEAUTY_SHOP_CATEGORIES.map((cat) => {
      const products = cat.products.filter((p) => {
        if (brand !== "All brands" && p.brand !== brand) return false;
        const price = getNumericPrice(p.priceLabel);
        if (price !== null) {
          if (price < priceRange.min || price >= priceRange.max) return false;
        }
        return true;
      });
      return { ...cat, products };
    }).filter((c) => c.products.length > 0);
  }, [brand, priceRange]);

  const visibleCount = filteredCategories.reduce((n, c) => n + c.products.length, 0);

  const toggleExpand = (slug: string) => setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  const clearFilters = () => { setPriceIdx(0); setBrand("All brands"); };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2A211A]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1F1713] text-[#FFF7F1]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,121,84,0.45),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(244,208,186,0.22),transparent_40%),linear-gradient(135deg,#1F1713_0%,#3A2820_45%,#5A3528_100%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id="beauty-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
              <pattern id="beauty-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beauty-grid)" />
            <rect width="100%" height="100%" fill="url(#beauty-dots)" opacity="0.45" />
          </svg>
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#E9A07A]/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#F7D6C1]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#F7D6C1] backdrop-blur-sm">
            Amazon.in Beauty Toolkit
          </p>
          <h1 className={`${serif} mt-6 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl`}>
            The Complete
            <span className="block text-[#F4C7AE]">Makeup Toolkit.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#F3E4D8]/90 sm:text-lg">
            Every step. Every essential. One place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[#FFF7F1] backdrop-blur-sm">
              <span className="font-semibold">{ALL_BEAUTY_PRODUCTS.length}</span> products
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[#FFF7F1] backdrop-blur-sm">
              <span className="font-semibold">{BEAUTY_SHOP_CATEGORIES.length}</span> routine steps
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[#FFF7F1] backdrop-blur-sm">
              Budget to premium picks
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-5 text-[#F3E4D8]/70">
            Disclosure: As an Amazon Associate, Durza earns from qualifying purchases. Prices and availability may change on Amazon.in.
          </p>
        </div>
      </section>

      {/* Sticky nav + filters */}
      <div className="sticky top-0 z-30 border-b border-[#E7DDD1] bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Routine steps" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              <ul className="flex min-w-max gap-2">
                {BEAUTY_SHOP_CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <a
                      href={`#${cat.slug}`}
                      className="inline-flex rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#5F5247] transition hover:border-[#C9A48D] hover:text-[#A14A2A]"
                    >
                      {cat.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="beauty-price">Filter by price</label>
              <select
                id="beauty-price"
                value={priceIdx}
                onChange={(e) => setPriceIdx(Number(e.target.value))}
                className="rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#4A4038] focus:outline-none focus:ring-2 focus:ring-[#A14A2A]"
              >
                {PRICE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
              </select>

              <label className="sr-only" htmlFor="beauty-brand">Filter by brand</label>
              <select
                id="beauty-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="max-w-[180px] rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#4A4038] focus:outline-none focus:ring-2 focus:ring-[#A14A2A]"
              >
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>

              {(priceIdx !== 0 || brand !== "All brands") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-[#A14A2A] underline decoration-[#C9A48D] underline-offset-2 hover:decoration-[#A14A2A]"
                >
                  Clear
                </button>
              )}
              <span className="text-xs text-[#7A6A5D]">{visibleCount} shown</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step sections */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-[#E7DDD1] bg-white p-8 text-center">
            <p className="text-base font-medium text-[#2A211A]">No products match these filters.</p>
            <button type="button" onClick={clearFilters} className="mt-3 text-sm font-medium text-[#A14A2A] underline underline-offset-2">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-16">
            {filteredCategories.map((category) => {
              const isExpanded = !!expanded[category.slug];
              const visibleProducts = isExpanded ? category.products : category.products.slice(0, 4);
              const hiddenCount = category.products.length - visibleProducts.length;
              return (
                <section key={category.slug} id={category.slug} className="scroll-mt-36">
                  <div className="mb-6 flex items-start gap-3 border-b border-[#E7DDD1] pb-5 sm:mb-8">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4E4D8]">
                      <SectionIcon />
                    </div>
                    <div className="max-w-3xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A14A2A]">{category.stepLabel}</p>
                      <h2 className={`${serif} mt-1 text-2xl font-semibold text-[#2A211A] sm:text-3xl`}>{category.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[#5F5247] sm:text-base">{category.shortIntro}</p>
                    </div>
                    <span className="ml-auto hidden shrink-0 rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#6B5D52] sm:inline-flex">
                      {category.products.length} picks
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {hiddenCount > 0 && (
                    <div className="mt-5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleExpand(category.slug)}
                        className="inline-flex items-center gap-1 rounded-full border border-[#D8C7B8] bg-white px-5 py-2 text-sm font-medium text-[#4A4038] transition hover:border-[#A14A2A] hover:text-[#A14A2A]"
                      >
                        Show {hiddenCount} more {hiddenCount === 1 ? "pick" : "picks"}
                      </button>
                    </div>
                  )}
                  {isExpanded && category.products.length > 4 && (
                    <div className="mt-5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleExpand(category.slug)}
                        className="inline-flex items-center gap-1 rounded-full border border-[#D8C7B8] bg-white px-5 py-2 text-sm font-medium text-[#4A4038] transition hover:border-[#A14A2A] hover:text-[#A14A2A]"
                      >
                        Show less
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {/* Old occasion sections as info only */}
        <section className="mt-16 border-t border-[#E7DDD1] pt-12 sm:mt-20 sm:pt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A14A2A]">Quick guides</p>
            <h2 className={`${serif} mt-2 text-3xl font-semibold text-[#2A211A] sm:text-4xl`}>Shop by occasion or need</h2>
            <p className="mt-3 text-base leading-7 text-[#5F5247]">Not sure where to start? Use these quick guides to pick the right routine from the toolkit above.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BEAUTY_INFO_SECTIONS.map((section) => (
              <article key={section.slug} id={section.slug} className="scroll-mt-36 rounded-2xl border border-[#E7DDD1] bg-white p-5 shadow-sm sm:p-6">
                <h3 className={`${serif} text-xl font-semibold text-[#2A211A]`}>{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5F5247]">{section.description}</p>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.label} className="flex gap-2 text-sm leading-6 text-[#4A4038]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A14A2A]" aria-hidden="true" />
                      <span>
                        <a
                          href={item.href}
                          target="_blank"
                          rel={GO_REL}
                          className="font-medium text-[#2A211A] underline decoration-[#C9A48D] underline-offset-2 transition hover:text-[#A14A2A] hover:decoration-[#A14A2A]"
                        >
                          {item.label}
                        </a>
                        {item.priceLabel ? <span className="ml-2 whitespace-nowrap font-semibold text-[#1F7A4D]">{item.priceLabel}</span> : null}
                        {item.note ? <span className="block text-[#6B5D52]">{item.note}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-6 text-[#7A6A5D]">
          As an Amazon Associate, Durza earns from qualifying purchases. Prices, MRP, and discounts are indicative and may change. Check the latest price and availability on Amazon.in before buying.
        </p>
      </div>
    </main>
  );
}
