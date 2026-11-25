"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, ExternalLink, Plus } from "lucide-react";
import { GO_REL } from "@/lib/go";
import type { CollectionKit, CollectionKitProduct } from "@/data/collection-kits";

const FALLBACK = "/collections/amazon-beauty-toolkit/product-placeholder.svg";

function KitImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const resolved = failed || !src ? FALLBACK : src;
  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
      className="object-cover"
      unoptimized={!resolved.startsWith("/")}
      onError={() => setFailed(true)}
    />
  );
}

function ProductCard({
  product,
  selected,
  onToggle,
}: {
  product: CollectionKitProduct;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#141413]/10 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f4f0ea]">
        <KitImage src={product.image} alt={product.name} />
        <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-full bg-[#1f1713]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {product.badge}
        </span>
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="font-serif text-base font-bold leading-snug text-ink">{product.name}</h3>
        {product.priceLabel && (
          <p className="mt-1.5 flex items-baseline gap-2 text-sm">
            <span className="font-semibold text-ink">{product.priceLabel}</span>
            {product.mrpLabel && <span className="text-xs text-ink-soft line-through">{product.mrpLabel}</span>}
          </p>
        )}
        <p className="mt-1.5 flex-1 text-xs leading-5 text-ink-soft">{product.description}</p>
        {product.note && (
          <p className="mt-2 text-[11px] leading-4 text-ink-soft">
            <span className="font-semibold text-ink">Skip if:</span> {product.note}
          </p>
        )}
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <a
            href={product.href}
            target="_blank"
            rel={GO_REL}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#1f1713] px-3 text-xs font-semibold text-white hover:bg-[#34261f]"
          >
            View on store <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={selected}
            aria-label={selected ? `Remove ${product.name} from kit` : `Add ${product.name} to kit`}
            className={`inline-flex min-h-10 items-center justify-center gap-1 rounded-xl border px-3 text-xs font-semibold transition ${
              selected
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-[#141413]/15 bg-white text-ink hover:bg-paper-alt"
            }`}
          >
            {selected ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Plus aria-hidden="true" className="h-3.5 w-3.5" />}
            {selected ? "In kit" : "Kit"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CollectionKitClient({ kit }: { kit: CollectionKit }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const allProducts = kit.sections.flatMap((section) => section.products);
  const selectedProducts = allProducts.filter((product) => selected.has(product.id));

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function copyKit() {
    const text = selectedProducts.length
      ? `${kit.headline}\n\n${selectedProducts.map((p) => `- ${p.name}: ${p.href}`).join("\n")}\n\nCurated by Durza. Prices and availability change — confirm on the store.`
      : "Add a few picks to your kit first.";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="bg-[#FAF8F5] text-[#141413]">
      {/* Designed hero — CSS only, like the makeup toolkit benchmark. */}
      <section className="relative overflow-hidden bg-[#1f1713] text-white" aria-labelledby="kit-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#c9813a]/25 blur-3xl" />
          <div className="absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-[#7a4a2b]/30 blur-3xl" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`kit-grid-${kit.sections.length}`} width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M44 0H0V44" fill="none" stroke="#f6e7d2" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#kit-grid-${kit.sections.length})`} />
          </svg>
        </div>
        <div className="relative mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e7b988]">
            Durza collections · {kit.eyebrow}
          </p>
          <h1 id="kit-heading" className="mt-4 max-w-3xl font-serif text-3xl font-extrabold leading-tight sm:text-5xl">
            {kit.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#e8ddd1] sm:text-lg">{kit.subline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#kit-products" className="inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#1f1713] hover:bg-[#f3e8da]">
              Browse the picks ↓
            </a>
            <span className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-[#e7b988]">
              {allProducts.length} picks · {kit.sections.length} categories
            </span>
            <span className="text-xs text-[#c9b9a8]">{kit.checkedLabel} · verify live prices on the store</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 sm:pt-10 md:pb-16">
        <nav aria-label="Kit categories" className="sticky top-0 z-30 -mx-4 mb-8 flex gap-2 overflow-x-auto border-y border-[#141413]/10 bg-[#FAF8F5]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          {kit.sections.map((section) => (
            <a
              key={section.slug}
              href={`#${section.slug}`}
              className="shrink-0 rounded-full border border-[#141413]/15 bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-[#8a4b12] hover:text-[#8a4b12]"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div id="kit-products" className="space-y-12 scroll-mt-24">
          {kit.sections.map((section) => (
            <section key={section.slug} id={section.slug} aria-labelledby={`kit-${section.slug}`} className="scroll-mt-24">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">{section.stepLabel}</p>
              <h2 id={`kit-${section.slug}`} className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
                {section.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{section.shortIntro}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} selected={selected.has(product.id)} onToggle={() => toggle(product.id)} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {kit.healthNote && (
          <section aria-label="Health note" className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            <strong className="font-semibold">Health note.</strong> {kit.healthNote}
          </section>
        )}

        <section aria-labelledby="kit-list-heading" className="mt-12 rounded-2xl border border-[#141413]/10 bg-white p-5">
          <h2 id="kit-list-heading" className="font-serif text-xl font-bold text-ink">Your kit list</h2>
          <p className="mt-1 text-sm leading-6 text-ink-soft">
            {selectedProducts.length === 0
              ? "Add picks with the + Kit button to build a short list you can copy."
              : `${selectedProducts.length} pick${selectedProducts.length === 1 ? "" : "s"} selected.`}
          </p>
          {selectedProducts.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-ink-soft">
              {selectedProducts.map((product) => (
                <li key={product.id}>• {product.name}</li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyKit}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#1f1713] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#34261f]"
            >
              <Copy aria-hidden="true" className="h-4 w-4" />
              {copied ? "Copied" : "Copy kit list"}
            </button>
            <Link href="/affiliate-disclosure" className="text-xs font-semibold text-[#8a4b12] hover:underline">
              How we make money →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
