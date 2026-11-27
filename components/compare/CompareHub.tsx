"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentPage } from "@/lib/content/schema";

const ALL = "All Comparisons";

interface CompareCardItem {
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  category: string;
  updatedLabel: string | null;
  vsLabel: string | null;
}

function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function toCompareCard(page: ContentPage): CompareCardItem {
  const structured = page.structured_data as {
    category?: unknown;
    updatedLabel?: unknown;
    verdict?: { optionA?: unknown; optionB?: unknown };
  };
  const optionA = structured.verdict?.optionA;
  const optionB = structured.verdict?.optionB;

  return {
    slug: page.slug,
    title: page.title,
    summary: page.description || page.meta_description || "",
    heroImage: page.hero_image_url || "/opengraph-image.png",
    category: typeof structured.category === "string" ? structured.category : "Comparison",
    updatedLabel:
      (typeof structured.updatedLabel === "string" ? structured.updatedLabel : null) ??
      formatDate(page.updated_at) ??
      formatDate(page.published_at),
    vsLabel:
      typeof optionA === "string" && typeof optionB === "string" ? `${optionA} vs ${optionB}` : null,
  };
}

export default function CompareHub({ items }: { items: ContentPage[] }) {
  const cards = useMemo(() => items.map(toCompareCard), [items]);
  const categories = useMemo(
    () => [...new Set(cards.map((card) => card.category))].sort((a, b) => a.localeCompare(b)),
    [cards],
  );
  const filters = useMemo(() => [ALL, ...categories], [categories]);
  const [active, setActive] = useState(ALL);
  const filtered = useMemo(
    () => (active === ALL ? cards : cards.filter((card) => card.category === active)),
    [active, cards],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Comparison categories">
        {filters.map((category) => {
          const selected = active === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(category)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                selected
                  ? "border-[#141413] bg-[#141413] text-white"
                  : "border-[#141413]/15 bg-white text-[#141413] hover:border-[#141413]/35 hover:bg-[#f3efe8]",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-[#141413]/10 bg-white p-6 text-sm text-[#5a564f]">
          No comparisons are available in this category yet.
        </p>
      ) : (
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
                    {item.updatedLabel ? (
                      <span className="rounded-full border border-[#141413]/10 px-2.5 py-1 font-medium text-[#5a564f]">{item.updatedLabel}</span>
                    ) : null}
                  </div>
                  {item.vsLabel ? (
                    <div className="mt-3 inline-flex items-center rounded-md border border-[#141413]/10 bg-[#FAF8F5] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#141413]">
                      VS · {item.vsLabel}
                    </div>
                  ) : null}
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
      )}
    </div>
  );
}
