"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CompareEntry } from "@/data/comparisons";

type Filter = "All Comparisons" | "Electronics & Laptops" | "Smartphones" | "Sale Events";
const FILTERS: Filter[] = ["All Comparisons", "Electronics & Laptops", "Smartphones", "Sale Events"];

function matchesFilter(item: CompareEntry, filter: Filter): boolean {
  if (filter === "All Comparisons") return true;
  if (filter === "Sale Events") return item.category === "Sale & Card Math";
  return item.category === filter;
}

function vsBadge(item: CompareEntry): string {
  const map: Record<string, string> = {
    "black-friday-2026-india-best-deals-vs-regular-sale": "Black Friday vs Regular Sale",
    "best-smartphone-deals-india-amazon-vs-flipkart-2026": "Amazon vs Flipkart",
    "best-laptop-deals-india-amazon-vs-flipkart-2026": "Amazon vs Flipkart vs Brand eStores",
    "amazon-vs-flipkart-electronics-2026": "Amazon vs Flipkart",
    "official-brand-store-vs-amazon-flipkart-laptops-india": "Brand Stores vs Amazon & Flipkart",
    "myntra-vs-ajio-vs-brand-stores-fashion-india": "Myntra vs Ajio vs Brand Stores",
    "kama-ayurveda-vs-forest-essentials-vs-indus-valley": "Kama vs Forest Essentials vs Indus Valley",
    "kapiva-vs-hkvitals-vs-healthkart-supplements-india": "Kapiva vs HK Vitals vs HealthKart",
    "adidas-vs-nike-vs-asics-running-shoes-india": "Adidas vs Nike vs ASICS",
    "havells-vs-ao-smith-vs-crompton-water-heaters-india": "Havells vs AO Smith vs Crompton",
    "credit-card-instant-discount-vs-no-cost-emi-india": "Instant Discount vs No-Cost EMI",
    "boat-vs-boult-vs-oneplus-tws-under-2000-india": "boAt vs Boult vs OnePlus",
  };
  return map[item.slug] ?? `${item.verdict.optionA} vs ${item.verdict.optionB}`;
}

export default function CompareHub({ items }: { items: CompareEntry[] }) {
  const [active, setActive] = useState<Filter>("All Comparisons");
  const filtered = useMemo(
    () => items.filter((i) => matchesFilter(i, active)),
    [active, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Comparison categories">
        {FILTERS.map((cat) => {
          const selected = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(cat)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                selected
                  ? "border-[#141413] bg-[#141413] text-white"
                  : "border-[#141413]/15 bg-white text-[#141413] hover:border-[#141413]/35 hover:bg-[#f3efe8]",
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.slug} className="group overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <Link href={`/compare/${item.slug}`} className="block">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f3efe8]">
                <Image src={item.heroImage} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-[#f3efe8] px-2.5 py-1 font-semibold text-[#141413]">{item.category}</span>
                  <span className="rounded-full border border-[#141413]/10 px-2.5 py-1 font-medium text-[#5a564f]">{item.updatedLabel}</span>
                </div>
                <div className="mt-3 inline-flex items-center rounded-md border border-[#141413]/10 bg-[#FAF8F5] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#141413]">
                  VS · {vsBadge(item)}
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-[#141413]">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5a564f] sm:text-base">{item.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">
                  Read Full Comparison <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
