"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  ALL_BEAUTY_PRODUCTS,
  BEAUTY_INFO_SECTIONS,
  BEAUTY_SHOP_CATEGORIES,
  type BeautyProduct,
} from "@/data/amazon-beauty-toolkit";

const serif = "font-['Playfair_Display',Georgia,serif]";
const FALLBACK_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

const PRICE_FILTERS = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500–₹1k", min: 500, max: 1000 },
  { label: "₹1k+", min: 1000, max: Infinity },
] as const;

const OCCASIONS = [
  { id: "trending", label: "Trending" },
  { id: "everyday", label: "5-Min Everyday" },
  { id: "party", label: "Party Glam" },
  { id: "wedding", label: "Wedding" },
  { id: "starter", label: "Starter" },
  { id: "tools", label: "Tools" },
] as const;

const OCCASION_SETS: Record<string, Set<string>> = {
  trending: new Set(["tr-lip-oil","tr-liquid-blush","tr-blush-wand","tr-lip-cheek-tint","tr-jelly-tint","tr-sky-tubes"]),
  everyday: new Set(["ed-tinted-moisturiser","ed-lip-cheek","ed-kajal","ed-mascara","ed-lip-balm","ed-concealer"]),
  party: new Set(["pg-vinyl-ink","pg-felt-liner","pg-pen-liner","pg-kohl","pg-waterproof-mascara","pg-strobing"]),
  wedding: new Set(["wf-foundation","st-compact","wf-bold-liner","wf-kohl","wf-mascara","wf-liquid-lip","tt-fixer-renee","tt-fixer-faces"]),
  starter: new Set(["st-kajal","st-mascara","st-lip-balm","st-compact","st-bb","st-brow"]),
  tools: new Set(["tt-curler","tt-blotting","tt-brush","tt-sponge","tools-real-techniques-miracle-sponge","tools-vega-brush-set","spray-swiss-beauty-fixer"]),
};

function getNumericPrice(label: string): number | null {
  if (!label || label === "Check price") return null;
  const m = label.match(/₹\s*([0-9,]+)/);
  if (!m) return null;
  return Number(m[1].replace(/,/g, ""));
}

function discountPercent(priceLabel?: string, mrpLabel?: string): string | null {
  const p = getNumericPrice(priceLabel || "");
  const m = getNumericPrice(mrpLabel || "");
  if (!p || !m || m <= p) return null;
  return `${Math.round(((m - p) / m) * 100)}% off`;
}

function displayBadge(tag: string): { label: string; cls: string } {
  const t = tag.toLowerCase();
  if (t.includes("budget") || t.includes("under")) return { label: "Budget", cls: "bg-[#E8F5EC] text-[#1F7A4D]" };
  if (t.includes("premium") || t.includes("luxury")) return { label: "Premium", cls: "bg-[#FCEAEA] text-[#A14A2A]" };
  if (t.includes("bestseller")) return { label: "Bestseller", cls: "bg-[#FFF3E3] text-[#9A5A1A]" };
  return { label: "Editor’s pick", cls: "bg-[#EFE8FF] text-[#5B4B8A]" };
}

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

function ProductCard({ product, inKit, onToggleKit }: { product: BeautyProduct; inKit: boolean; onToggleKit: (id: string) => void }) {
  const badge = displayBadge(product.tag);
  const pct = discountPercent(product.priceLabel, product.mrpLabel);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E7DDD1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#F6F0E8]">
        <SafeImage
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 240px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] sm:px-2.5 sm:py-1 sm:text-[10px] ${badge.cls}`}>
          {badge.label}
        </span>
        <button
          type="button"
          onClick={() => onToggleKit(product.id)}
          aria-label={inKit ? `Remove ${product.name} from kit` : `Add ${product.name} to kit`}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border text-sm shadow-sm transition ${inKit ? "border-[#A14A2A] bg-[#A14A2A] text-white" : "border-[#E7DDD1] bg-white/95 text-[#6B5D52] hover:text-[#A14A2A]"}`}
        >
          {inKit ? "✓" : "+"}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8A6A55] sm:text-[10px]">{product.brand}</p>
        <h3 className="mt-1 font-['Inter',ui-sans-serif,system-ui,sans-serif] text-xs font-medium leading-4 text-[#2A211A] sm:text-[13px] sm:leading-5">{product.name}</h3>
        {product.shadeTip ? <p className="mt-1.5 text-[11px] leading-4 text-[#8A6A55]">{product.shadeTip}</p> : null}

        <div className="mt-2.5 border-t border-[#EFE6DC] pt-2.5">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-sm font-bold text-[#2A211A] sm:text-base">{product.priceLabel}</span>
            {product.mrpLabel ? <span className="text-[11px] text-[#8A7A6D] line-through sm:text-xs">{product.mrpLabel}</span> : null}
            {pct ? <span className="text-[11px] font-semibold text-[#1F7A4D] sm:text-xs">{pct}</span> : null}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-2">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel={GO_REL}
            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#2A211A] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#3B3128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A14A2A] focus-visible:ring-offset-2 sm:text-xs"
            aria-label={`View ${product.name} on Amazon`}
          >
            View on Amazon <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => onToggleKit(product.id)}
            className={`rounded-full border px-3 py-2 text-[11px] font-semibold transition sm:text-xs ${inKit ? "border-[#A14A2A] bg-[#FFF4EE] text-[#A14A2A]" : "border-[#D8C7B8] text-[#5F5247] hover:border-[#A14A2A] hover:text-[#A14A2A]"}`}
          >
            {inKit ? "Added" : "+ Kit"}
          </button>
        </div>
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

export default function BeautyToolkitClient() {
  const [q, setQ] = useState("");
  const [priceIdx, setPriceIdx] = useState(0);
  const [brand, setBrand] = useState("All brands");
  const [dealsOnly, setDealsOnly] = useState(false);
  const [occasion, setOccasion] = useState<string>("");
  const [sort, setSort] = useState("curated");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [kit, setKit] = useState<Set<string>>(new Set());
  const [kitOpen, setKitOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const p of ALL_BEAUTY_PRODUCTS) set.add(p.brand);
    return ["All brands", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const priceRange = PRICE_FILTERS[priceIdx];
  const query = q.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return BEAUTY_SHOP_CATEGORIES.map((cat) => {
      let products = cat.products.filter((p) => {
        if (brand !== "All brands" && p.brand !== brand) return false;
        if (occasion && !OCCASION_SETS[occasion]?.has(p.id)) return false;
        const price = getNumericPrice(p.priceLabel);
        if (price !== null) {
          if (price < priceRange.min || price >= priceRange.max) return false;
        }
        if (dealsOnly && !discountPercent(p.priceLabel, p.mrpLabel)) return false;
        if (query) {
          const hay = `${p.brand} ${p.name} ${p.description} ${p.tag}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });
      if (sort === "pl") products = [...products].sort((a, b) => (getNumericPrice(a.priceLabel) ?? 999999) - (getNumericPrice(b.priceLabel) ?? 999999));
      if (sort === "ph") products = [...products].sort((a, b) => (getNumericPrice(b.priceLabel) ?? 0) - (getNumericPrice(a.priceLabel) ?? 0));
      return { ...cat, products };
    }).filter((c) => c.products.length > 0);
  }, [brand, priceRange, occasion, dealsOnly, query, sort]);

  const visibleCount = filteredCategories.reduce((n, c) => n + c.products.length, 0);
  const kitProducts = useMemo(() => ALL_BEAUTY_PRODUCTS.filter((p) => kit.has(p.id)), [kit]);
  const kitTotal = kitProducts.reduce((sum, p) => sum + (getNumericPrice(p.priceLabel) ?? 0), 0);

  const toggleExpand = (slug: string) => setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  const toggleKit = (id: string) => setKit((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clearFilters = () => { setQ(""); setPriceIdx(0); setBrand("All brands"); setDealsOnly(false); setOccasion(""); setSort("curated"); };

  const hasFilters = q || priceIdx !== 0 || brand !== "All brands" || dealsOnly || occasion || sort !== "curated";

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2A211A] pb-20">
      <section className="relative overflow-hidden bg-[#1F1713] text-[#FFF7F1]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,121,84,0.45),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(244,208,186,0.22),transparent_40%),linear-gradient(135deg,#1F1713_0%,#3A2820_45%,#5A3528_100%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id="beauty-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="1" /></pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beauty-grid)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#F7D6C1]">Amazon.in Beauty Toolkit</p>
          <h1 className={`${serif} mt-6 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl`}>
            The Complete <span className="block text-[#F4C7AE]">Makeup Toolkit.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#F3E4D8]/90 sm:text-lg">Every step. Every essential. One place — curated from budget to premium.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm"><span className="font-semibold">{ALL_BEAUTY_PRODUCTS.length}</span> products</div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm"><span className="font-semibold">{BEAUTY_SHOP_CATEGORIES.length}</span> routine steps</div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">Budget → Premium</div>
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-5 text-[#F3E4D8]/70">Disclosure: As an Amazon Associate, Durza earns from qualifying purchases. Prices and availability may change on Amazon.in.</p>
        </div>
      </section>

      <div className="sticky top-0 z-40 border-b border-[#E7DDD1] bg-[#FAF7F2]/96 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2.5">
            <nav aria-label="Routine steps" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              <ul className="flex min-w-max gap-1.5 sm:gap-2">
                {BEAUTY_SHOP_CATEGORIES.map((cat, i) => (
                  <li key={cat.slug}>
                    <a href={`#${cat.slug}`} className="inline-flex rounded-full border border-[#E0D2C3] bg-white px-2.5 py-1 text-[11px] font-medium text-[#5F5247] hover:border-[#C9A48D] hover:text-[#A14A2A] sm:px-3 sm:py-1.5 sm:text-xs">
                      {i + 1}. {cat.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7A6D]" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products, brands..."
                  className="w-full rounded-full border border-[#E0D2C3] bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#A14A2A]"
                />
              </div>
              <span className="shrink-0 text-[11px] text-[#7A6A5D] lg:hidden">{visibleCount}</span>
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E0D2C3] bg-white px-3 py-2 text-xs font-medium text-[#5F5247] hover:border-[#C9A48D] lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters{hasFilters ? " •" : ""}
              </button>
              <span className="hidden shrink-0 text-xs text-[#7A6A5D] lg:inline">{visibleCount} shown</span>
            </div>

            <div className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-2 lg:flex`}>
              <div className="flex flex-wrap items-center gap-2">
                {PRICE_FILTERS.map((r, i) => (
                  <button key={r.label} type="button" onClick={() => setPriceIdx(i)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${priceIdx === i ? "border-[#2A211A] bg-[#2A211A] text-white" : "border-[#E0D2C3] bg-white text-[#5F5247] hover:border-[#C9A48D]"}`}>{r.label}</button>
                ))}
                <button type="button" onClick={() => setDealsOnly((v) => !v)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${dealsOnly ? "border-[#A14A2A] bg-[#FFF4EE] text-[#A14A2A]" : "border-[#E0D2C3] bg-white text-[#5F5247] hover:border-[#C9A48D]"}`}>Deals only</button>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="max-w-[170px] rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#4A4038] focus:outline-none focus:ring-2 focus:ring-[#A14A2A]">
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#4A4038] focus:outline-none focus:ring-2 focus:ring-[#A14A2A]">
                  <option value="curated">Sort: Curated</option>
                  <option value="pl">Price: Low to high</option>
                  <option value="ph">Price: High to low</option>
                </select>
                {hasFilters && <button type="button" onClick={clearFilters} className="text-xs font-medium text-[#A14A2A] underline underline-offset-2">Clear</button>}
                <span className="text-xs text-[#7A6A5D] lg:hidden">{visibleCount} shown</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A6A55]">Occasion</span>
                {OCCASIONS.map((o) => (
                  <button key={o.id} type="button" onClick={() => setOccasion(occasion === o.id ? "" : o.id)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${occasion === o.id ? "border-[#C9A48D] bg-[#F4E4D8] text-[#7A3D24]" : "border-[#E0D2C3] bg-white text-[#5F5247] hover:border-[#C9A48D]"}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <section key={category.slug} id={category.slug} className="scroll-mt-28 lg:scroll-mt-44">
                  <div className="mb-6 flex items-start gap-3 border-b border-[#E7DDD1] pb-5 sm:mb-8">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4E4D8]"><SectionIcon /></div>
                    <div className="max-w-3xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A14A2A]">{category.stepLabel}</p>
                      <h2 className={`${serif} mt-1 text-2xl font-semibold text-[#2A211A] sm:text-3xl`}>{category.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[#5F5247] sm:text-base">{category.shortIntro}</p>
                    </div>
                    <span className="ml-auto hidden shrink-0 rounded-full border border-[#E0D2C3] bg-white px-3 py-1.5 text-xs font-medium text-[#6B5D52] sm:inline-flex">{category.products.length} picks</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} inKit={kit.has(product.id)} onToggleKit={toggleKit} />
                    ))}
                  </div>
                  {hiddenCount > 0 && (
                    <div className="mt-5 text-center">
                      <button type="button" onClick={() => toggleExpand(category.slug)} className="rounded-full border border-[#D8C7B8] bg-white px-5 py-2 text-sm font-medium text-[#4A4038] hover:border-[#A14A2A] hover:text-[#A14A2A]">Show {hiddenCount} more</button>
                    </div>
                  )}
                  {isExpanded && category.products.length > 4 && (
                    <div className="mt-5 text-center">
                      <button type="button" onClick={() => toggleExpand(category.slug)} className="rounded-full border border-[#D8C7B8] bg-white px-5 py-2 text-sm font-medium text-[#4A4038] hover:border-[#A14A2A] hover:text-[#A14A2A]">Show less</button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        <section className="mt-16 border-t border-[#E7DDD1] pt-12 sm:mt-20 sm:pt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A14A2A]">Quick guides</p>
            <h2 className={`${serif} mt-2 text-3xl font-semibold text-[#2A211A] sm:text-4xl`}>Shop by occasion or need</h2>
            <p className="mt-3 text-base leading-7 text-[#5F5247]">Use these guides for quick starting points. Tap an occasion chip above to filter the actual product grid.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {BEAUTY_INFO_SECTIONS.map((section) => (
              <article key={section.slug} id={section.slug} className="scroll-mt-28 lg:scroll-mt-44 rounded-2xl border border-[#E7DDD1] bg-white p-5 shadow-sm sm:p-6">
                <h3 className={`${serif} text-xl font-semibold text-[#2A211A]`}>{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5F5247]">{section.description}</p>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item.label} className="flex gap-2 text-sm leading-6 text-[#4A4038]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A14A2A]" aria-hidden="true" />
                      <span>
                        <a href={item.href} target="_blank" rel={GO_REL} className="font-medium text-[#2A211A] underline decoration-[#C9A48D] underline-offset-2 hover:text-[#A14A2A] hover:decoration-[#A14A2A]">{item.label}</a>
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

      <div className="fixed bottom-4 right-4 z-50">
        <button type="button" onClick={() => setKitOpen(true)} className="rounded-full bg-[#2A211A] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#3B3128]">
          Kit · {kit.size} {kit.size === 1 ? "item" : "items"}{kitTotal > 0 ? ` · ₹${kitTotal.toLocaleString("en-IN")}` : ""}
        </button>
      </div>

      {kitOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" role="dialog" aria-modal="true" aria-label="My kit">
          <div className="h-full w-full max-w-md overflow-y-auto bg-[#FAF7F2] p-5 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-[#E7DDD1] pb-4">
              <div>
                <h2 className={`${serif} text-2xl font-semibold text-[#2A211A]`}>My Kit</h2>
                <p className="text-sm text-[#6B5D52]">{kit.size} picks{kitTotal > 0 ? ` · ₹${kitTotal.toLocaleString("en-IN")}` : ""}</p>
              </div>
              <button type="button" onClick={() => setKitOpen(false)} aria-label="Close kit" className="rounded-full border border-[#E0D2C3] p-2 text-[#5F5247] hover:text-[#A14A2A]"><X className="h-4 w-4" /></button>
            </div>
            {kitProducts.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#6B5D52]">Tap “+ Kit” on any product to build your routine.</p>
            ) : (
              <ul className="divide-y divide-[#E7DDD1]">
                {kitProducts.map((p) => (
                  <li key={p.id} className="flex items-start gap-3 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A6A55]">{p.brand}</p>
                      <a href={p.amazonUrl} target="_blank" rel={GO_REL} className="text-sm font-medium text-[#2A211A] underline decoration-[#C9A48D] underline-offset-2 hover:text-[#A14A2A]">{p.name}</a>
                      <p className="mt-1 text-sm font-semibold text-[#2A211A]">{p.priceLabel}</p>
                    </div>
                    <button type="button" onClick={() => toggleKit(p.id)} className="text-xs font-medium text-[#A14A2A] underline underline-offset-2">Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 border-t border-[#E7DDD1] pt-4 text-xs leading-5 text-[#7A6A5D]">
              Tip: open each item on Amazon to check shade, size, and live price. Kit links open individual Amazon product pages.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
