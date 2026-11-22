"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, Share2, SlidersHorizontal, X } from "lucide-react";
import { GO_REL } from "@/lib/go";
import {
  ALL_BEAUTY_PRODUCTS,
  BEAUTY_INFO_SECTIONS,
  BEAUTY_SHOP_CATEGORIES,
  type BeautyProduct,
} from "@/data/amazon-beauty-toolkit";

const serif = "font-['Playfair_Display',Georgia,serif]";
const FALLBACK_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

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
  if (t.includes("budget") || t.includes("under")) return { label: "Budget", cls: "bg-[#EAF2EC] text-[#2F5B3A]" };
  if (t.includes("premium") || t.includes("luxury")) return { label: "Premium", cls: "bg-[#F3E6E1] text-[#7A3E2B]" };
  if (t.includes("bestseller")) return { label: "Bestseller", cls: "bg-[#F5ECD8] text-[#6B4F1D]" };
  return { label: "Editor’s pick", cls: "bg-[#ECE7F6] text-[#4A3F73]" };
}

function SafeImage({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  const isExternal = /^https?:\/\//.test(imgSrc);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      loading="lazy"
      decoding="async"
      unoptimized={isExternal}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}

function ProductCard({ product, inKit, onToggleKit }: { product: BeautyProduct; inKit: boolean; onToggleKit: (id: string) => void }) {
  const badge = displayBadge(product.tag);
  const pct = discountPercent(product.priceLabel, product.mrpLabel);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E8DDD2] bg-white/95 shadow-[0_1px_2px_rgba(44,36,32,0.04)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(44,36,32,0.12)] hover:border-[#B5654A]/20 hover:ring-1 hover:ring-[#B5654A]/10">
      <div className="relative aspect-square overflow-hidden bg-[#F4EFEA]">
        <SafeImage
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 240px"
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] sm:px-2.5 sm:py-1 sm:text-[10px] ${badge.cls}`}>
          {badge.label}
        </span>
        <button
          type="button"
          onClick={() => onToggleKit(product.id)}
          aria-label={inKit ? `Remove ${product.name} from kit` : `Add ${product.name} to kit`}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border text-sm shadow-sm transition-all duration-200 ease-out active:scale-110 ${inKit ? "border-[#B5654A] bg-[#B5654A] text-white scale-100" : "border-[#E8DDD2] bg-white/95 text-[#7A6A5F] hover:text-[#B5654A] hover:border-[#B5654A]/40 hover:bg-white"}`}
        >
          {inKit ? "✓" : "+"}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8A7A70] sm:text-[10px]">{product.brand}</p>
        <h3 className="mt-1 font-['Inter',ui-sans-serif,system-ui,sans-serif] text-xs font-medium leading-4 text-[#2C2420] sm:text-[13px] sm:leading-5">{product.name}</h3>
        {product.shadeTip ? <p className="mt-1.5 text-[11px] leading-4 text-[#8A7A70]">{product.shadeTip}</p> : null}

        <div className="mt-2.5 border-t border-[#EBE0D6] pt-2.5">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-sm font-bold text-[#2C2420] sm:text-base">{product.priceLabel}</span>
            {product.mrpLabel ? <span className="text-[11px] text-[#8A7A70] line-through sm:text-xs">{product.mrpLabel}</span> : null}
            {pct ? <span className="text-[11px] font-semibold text-[#3F7A57] sm:text-xs">{pct}</span> : null}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-2">
          <a
            href={product.amazonUrl}
            target="_blank"
            rel={GO_REL}
            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#2C2420] px-3 py-2 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-[#8F4E38] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B5654A] focus-visible:ring-offset-2 sm:text-xs"
            aria-label={`View ${product.name} on Amazon`}
          >
            View on Amazon <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => onToggleKit(product.id)}
            className={`rounded-full border px-3 py-2 text-[11px] font-semibold transition-all duration-200 active:scale-95 sm:text-xs ${inKit ? "border-[#B5654A] bg-[#FBF0EA] text-[#B5654A]" : "border-[#D9CABE] text-[#7A6A5F] hover:border-[#B5654A] hover:text-[#B5654A] hover:bg-[#FBF0EA]/50"}`}
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
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#B5654A]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4L12 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BeautyToolkitClient() {
  const [brand, setBrand] = useState("All brands");
  const [dealsOnly, setDealsOnly] = useState(false);
  const [occasion, setOccasion] = useState<string>("");
  const [sort, setSort] = useState("curated");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [kit, setKit] = useState<Set<string>>(new Set());
  const [kitOpen, setKitOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const p of ALL_BEAUTY_PRODUCTS) set.add(p.brand);
    return ["All brands", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredCategories = useMemo(() => {
    return BEAUTY_SHOP_CATEGORIES.map((cat) => {
      let products = cat.products.filter((p) => {
        if (brand !== "All brands" && p.brand !== brand) return false;
        if (occasion && !OCCASION_SETS[occasion]?.has(p.id)) return false;
        if (dealsOnly && !discountPercent(p.priceLabel, p.mrpLabel)) return false;
        return true;
      });
      if (sort === "pl") products = [...products].sort((a, b) => (getNumericPrice(a.priceLabel) ?? 999999) - (getNumericPrice(b.priceLabel) ?? 999999));
      if (sort === "ph") products = [...products].sort((a, b) => (getNumericPrice(b.priceLabel) ?? 0) - (getNumericPrice(a.priceLabel) ?? 0));
      return { ...cat, products };
    }).filter((c) => c.products.length > 0);
  }, [brand, occasion, dealsOnly, sort]);

  const visibleCount = filteredCategories.reduce((n, c) => n + c.products.length, 0);
  const kitProducts = useMemo(() => ALL_BEAUTY_PRODUCTS.filter((p) => kit.has(p.id)), [kit]);
  const kitTotal = kitProducts.reduce((sum, p) => sum + (getNumericPrice(p.priceLabel) ?? 0), 0);

  const toggleExpand = (slug: string) => setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  const toggleKit = (id: string) => setKit((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const clearFilters = () => { setBrand("All brands"); setDealsOnly(false); setOccasion(""); setSort("curated"); };

  const hasFilters = brand !== "All brands" || dealsOnly || occasion || sort !== "curated";

  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}/collections/complete-amazon-makeup-toolkit` : "https://www.durza.in/collections/complete-amazon-makeup-toolkit";

  const buildChecklistText = () => {
    const items = kitProducts.length > 0 ? kitProducts : ALL_BEAUTY_PRODUCTS;
    const heading = kitProducts.length > 0 ? "My Amazon Makeup Toolkit" : "Complete Amazon Makeup Toolkit Checklist";
    const lines = [heading, ""];
    if (kitProducts.length > 0) {
      items.forEach((p, i) => lines.push(`${i + 1}. ${p.brand} — ${p.name} (${p.priceLabel})`));
      if (kitTotal > 0) lines.push("", `Estimated total: ₹${kitTotal.toLocaleString("en-IN")}`);
    } else {
      BEAUTY_SHOP_CATEGORIES.forEach((cat) => {
        lines.push(`${cat.stepLabel}: ${cat.title}`);
        cat.products.slice(0, 3).forEach((p) => lines.push(`- ${p.brand} — ${p.name}`));
        if (cat.products.length > 3) lines.push(`- +${cat.products.length - 3} more`);
        lines.push("");
      });
    }
    lines.push(`Check the full list: ${pageUrl}`);
    return lines.join("\n");
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(buildChecklistText());
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copyChecklist = async () => {
    const text = buildChecklistText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#F4EFEA] text-[#2C2420] pb-20">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <section className="relative z-[1] overflow-hidden bg-[#1F1713] text-[#FFF7F1]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,140,104,0.50),transparent_42%),radial-gradient(ellipse_at_80%_20%,rgba(245,217,200,0.18),transparent_35%),radial-gradient(ellipse_at_bottom_right,rgba(181,101,74,0.28),transparent_45%),linear-gradient(135deg,#211712_0%,#3D2920_48%,#5C3528_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(250,248,245,0.08),transparent_55%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id="beauty-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="1" /></pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beauty-grid)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#F5D9C8]">Amazon.in Beauty Toolkit</p>
          <h1 className={`${serif} mt-6 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl`}>
            <span className="text-[#F5EBE3]/80">Everything you need for your</span> <span className="block text-[#F2CDB8]">makeup routine.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#F5EBE3]/92 sm:text-lg">From essential basics to finishing touches, all in one place.</p>
        </div>
      </section>

      <div className="sticky top-0 z-40 border-b border-[rgba(232,221,210,0.6)] bg-[rgba(244,239,234,0.88)] backdrop-blur-[12px] shadow-[0_1px_0_rgba(255,255,255,0.5)]">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2.5">
            <nav aria-label="Routine steps" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              <ul className="flex min-w-max gap-1.5 sm:gap-2">
                {BEAUTY_SHOP_CATEGORIES.map((cat, i) => (
                  <li key={cat.slug}>
                    <a href={`#${cat.slug}`} className="inline-flex rounded-full border border-[#E0D4C8] bg-white px-2.5 py-1 text-[11px] font-medium text-[#7A6A5F] hover:border-[#C9A08A] hover:text-[#B5654A] sm:px-3 sm:py-1.5 sm:text-xs">
                      {i + 1}. {cat.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-[#8A7A70]">{visibleCount} shown</span>
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E0D4C8] bg-white px-3 py-2 text-xs font-medium text-[#7A6A5F] hover:border-[#C9A08A] lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters{hasFilters ? " •" : ""}
              </button>
            </div>

            <div className={`${filtersOpen ? "flex" : "hidden"} flex-col gap-2 lg:flex`}>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => setDealsOnly((v) => !v)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${dealsOnly ? "border-[#B5654A] bg-[#FBF0EA] text-[#B5654A]" : "border-[#E0D4C8] bg-white text-[#7A6A5F] hover:border-[#C9A08A]"}`}>Deals only</button>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="max-w-[170px] rounded-full border border-[#E0D4C8] bg-white px-3 py-1.5 text-xs font-medium text-[#5A4D45] focus:outline-none focus:ring-2 focus:ring-[#B5654A]">
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-[#E0D4C8] bg-white px-3 py-1.5 text-xs font-medium text-[#5A4D45] focus:outline-none focus:ring-2 focus:ring-[#B5654A]">
                  <option value="curated">Sort: Curated</option>
                  <option value="pl">Price: Low to high</option>
                  <option value="ph">Price: High to low</option>
                </select>
                {hasFilters && <button type="button" onClick={clearFilters} className="text-xs font-medium text-[#B5654A] underline underline-offset-2">Clear</button>}
                <span className="text-xs text-[#8A7A70] lg:hidden">{visibleCount} shown</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A7A70]">Occasion</span>
                {OCCASIONS.map((o) => (
                  <button key={o.id} type="button" onClick={() => setOccasion(occasion === o.id ? "" : o.id)} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${occasion === o.id ? "border-[#C9A08A] bg-[#F1E4DA] text-[#8F4E38]" : "border-[#E0D4C8] bg-white text-[#7A6A5F] hover:border-[#C9A08A]"}`}>
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
          <div className="rounded-2xl border border-[#E8DDD2] bg-white p-8 text-center">
            <p className="text-base font-medium text-[#2C2420]">No products match these filters.</p>
            <button type="button" onClick={clearFilters} className="mt-3 text-sm font-medium text-[#B5654A] underline underline-offset-2">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-16">
            {filteredCategories.map((category) => {
              const isExpanded = !!expanded[category.slug];
              const visibleProducts = isExpanded ? category.products : category.products.slice(0, 4);
              const hiddenCount = category.products.length - visibleProducts.length;
              return (
                <section key={category.slug} id={category.slug} className="scroll-mt-28 lg:scroll-mt-44">
                  <div className="mb-6 flex items-start gap-3 border-b border-[#E8DDD2] pb-5 sm:mb-8">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1E4DA]"><SectionIcon /></div>
                    <div className="max-w-3xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B5654A]">{category.stepLabel}</p>
                      <h2 className={`${serif} mt-1 text-2xl font-semibold text-[#2C2420] sm:text-3xl`}>{category.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[#7A6A5F] sm:text-base">{category.shortIntro}</p>
                    </div>
                    <span className="ml-auto hidden shrink-0 rounded-full border border-[#E0D4C8] bg-white px-3 py-1.5 text-xs font-medium text-[#7A6A5F] sm:inline-flex">{category.products.length} picks</span>
                  </div>
                  <div key={`${category.slug}-${brand}-${dealsOnly}-${occasion}-${sort}`} className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 animate-[fadeIn_0.35s_ease-out]">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} inKit={kit.has(product.id)} onToggleKit={toggleKit} />
                    ))}
                  </div>
                  {hiddenCount > 0 && (
                    <div className="mt-5 text-center">
                      <button type="button" onClick={() => toggleExpand(category.slug)} className="rounded-full border border-[#D9CABE] bg-white px-5 py-2 text-sm font-medium text-[#5A4D45] hover:border-[#B5654A] hover:text-[#B5654A]">Show {hiddenCount} more</button>
                    </div>
                  )}
                  {isExpanded && category.products.length > 4 && (
                    <div className="mt-5 text-center">
                      <button type="button" onClick={() => toggleExpand(category.slug)} className="rounded-full border border-[#D9CABE] bg-white px-5 py-2 text-sm font-medium text-[#5A4D45] hover:border-[#B5654A] hover:text-[#B5654A]">Show less</button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        <section className="mt-16 border-t border-[#E8DDD2] pt-12 sm:mt-20 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B5654A]">Quick guides</p>
            <h2 className={`${serif} mt-2 text-3xl font-semibold text-[#2C2420] sm:text-4xl`}>Shop by occasion or need</h2>
            <p className="mt-3 text-base leading-7 text-[#7A6A5F]">Curated shortcuts for common makeup moments. Tap an occasion chip above to filter the full product grid.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {BEAUTY_INFO_SECTIONS.map((section) => (
              <article key={section.slug} id={section.slug} className="group scroll-mt-28 lg:scroll-mt-44 flex flex-col overflow-hidden rounded-2xl border border-[#E8DDD2] bg-white shadow-[0_1px_2px_rgba(44,36,32,0.04)] transition-all duration-300 hover:shadow-[0_12px_24px_-12px_rgba(44,36,32,0.12)]">
                <div className="border-b border-[#EFE6DC] bg-gradient-to-br from-[#FFFDFC] to-[#F7F1EB] px-5 py-5 sm:px-6">
                  <h3 className={`${serif} text-xl font-semibold text-[#2C2420]`}>{section.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#7A6A5F]">{section.description}</p>
                </div>
                <ul className="flex-1 divide-y divide-[#F0E6DC] px-5 sm:px-6">
                  {section.items.map((item) => (
                    <li key={item.label} className="py-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <a href={item.href} target="_blank" rel={GO_REL} className="text-sm font-medium leading-5 text-[#2C2420] underline decoration-transparent underline-offset-2 transition hover:text-[#B5654A] hover:decoration-[#D4B5A6]">
                            {item.label}
                          </a>
                          {item.note ? <p className="mt-0.5 text-xs leading-5 text-[#8A7A70]">{item.note}</p> : null}
                        </div>
                        {item.priceLabel ? (
                          <span className="shrink-0 rounded-full bg-[#F3F8F4] px-2.5 py-1 text-[11px] font-semibold text-[#3F7A57]">{item.priceLabel}</span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        <button type="button" onClick={shareWhatsApp} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(37,211,102,0.3)] transition-all duration-300 hover:bg-[#1fb857] hover:-translate-y-0.5 active:scale-[0.98]">
          <Share2 className="h-3.5 w-3.5" /> Share on WhatsApp
        </button>
        <button type="button" onClick={() => setKitOpen(true)} className="rounded-full bg-[#2C2420] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(44,36,32,0.25)] transition-all duration-300 hover:bg-[#8F4E38] hover:shadow-[0_12px_28px_rgba(143,78,56,0.3)] hover:-translate-y-0.5 active:scale-[0.98]">
          Kit · {kit.size} {kit.size === 1 ? "item" : "items"}{kitTotal > 0 ? ` · ₹${kitTotal.toLocaleString("en-IN")}` : ""}
        </button>
      </div>

      {kitOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-[2px] animate-[fadeIn_0.2s_ease-out]" role="dialog" aria-modal="true" aria-label="My kit">
          <div className="h-full w-full max-w-md overflow-y-auto bg-[rgba(244,239,234,0.94)] backdrop-blur-[16px] p-5 shadow-[-8px_0_32px_rgba(44,36,32,0.12)] sm:p-6 animate-[slideInRight_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="sticky top-0 z-10 -mx-5 -mt-5 flex items-center justify-between border-b border-[#E8DDD2]/80 bg-[rgba(250,248,245,0.85)] px-5 py-4 backdrop-blur-[12px] sm:-mx-6 sm:-mt-6 sm:px-6">
              <div>
                <h2 className={`${serif} text-2xl font-semibold text-[#2C2420]`}>My Kit</h2>
                <p className="text-sm text-[#7A6A5F]">{kit.size} picks{kitTotal > 0 ? ` · ₹${kitTotal.toLocaleString("en-IN")}` : ""}</p>
              </div>
              <button type="button" onClick={() => setKitOpen(false)} aria-label="Close kit" className="rounded-full border border-[#E0D4C8] p-2 text-[#7A6A5F] hover:text-[#B5654A]"><X className="h-4 w-4" /></button>
            </div>
            {kitProducts.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#7A6A5F]">Tap “+ Kit” on any product to build your routine.</p>
            ) : (
              <ul className="divide-y divide-[#E8DDD2]">
                {kitProducts.map((p) => (
                  <li key={p.id} className="flex items-start gap-3 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A7A70]">{p.brand}</p>
                      <a href={p.amazonUrl} target="_blank" rel={GO_REL} className="text-sm font-medium text-[#2C2420] underline decoration-[#D4B5A6] underline-offset-2 hover:text-[#B5654A]">{p.name}</a>
                      <p className="mt-1 text-sm font-semibold text-[#2C2420]">{p.priceLabel}</p>
                    </div>
                    <button type="button" onClick={() => toggleKit(p.id)} className="text-xs font-medium text-[#B5654A] underline underline-offset-2">Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 border-t border-[#E8DDD2] pt-4">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={shareWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1fb857] active:scale-[0.98]">
                  <Share2 className="h-3.5 w-3.5" /> Share on WhatsApp
                </button>
                <button type="button" onClick={copyChecklist} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9CABE] bg-white px-3 py-2.5 text-xs font-semibold text-[#5A4D45] transition hover:border-[#B5654A] hover:text-[#B5654A] active:scale-[0.98]">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : kitProducts.length > 0 ? "Copy my kit" : "Copy checklist"}
                </button>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#8A7A70]">
                Tip: open each item on Amazon to check shade, size, and live price. Kit links open individual Amazon product pages.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
