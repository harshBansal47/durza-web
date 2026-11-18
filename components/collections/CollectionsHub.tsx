"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CollectionCategory, CollectionEntry } from "@/data/collections";

type Filter = "All" | CollectionCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All (8)", value: "All" },
  { label: "Work & Tech", value: "Work & Tech" },
  { label: "Beauty & Grooming", value: "Beauty & Grooming" },
  { label: "Fitness & Nutrition", value: "Fitness & Nutrition" },
  { label: "Fashion & Accessories", value: "Fashion & Accessories" },
  { label: "Gifting & Lifestyle", value: "Gifting & Lifestyle" },
  { label: "Home & Appliances", value: "Home & Appliances" },
];

export default function CollectionsHub({ items }: { items: CollectionEntry[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">
          Curated Buying Kits
        </p>
        <h1 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#141413] sm:text-5xl">
          Collections Built Around Real Goals
        </h1>
        <p className="mt-4 text-base leading-7 text-[#4a463f] sm:text-lg">
          Complete multi-brand kits researched for Indian homes, wardrobes, desks, and wellness—every item vetted for real utility and linked straight to official stores.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Collection categories">
        {FILTERS.map((f) => {
          const selected = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(f.value)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                selected
                  ? "border-[#141413] bg-[#141413] text-white"
                  : "border-[#141413]/15 bg-white text-[#141413] hover:border-[#141413]/35 hover:bg-[#f3efe8]",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="group overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link href={`/collections/${item.slug}`} className="block">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f3efe8]">
                <Image
                  src={item.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-[#f3efe8] px-2.5 py-1 font-semibold text-[#141413]">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-[#141413]/10 px-2.5 py-1 font-medium text-[#5a564f]">
                    {item.itemCountLabel}
                  </span>
                  <span className="rounded-full border border-[#141413]/10 px-2.5 py-1 font-medium text-[#5a564f]">
                    {item.updatedLabel}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-[#141413] sm:text-xl">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5a564f] sm:text-base">
                  {item.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">
                  Explore Collection <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-[#141413]/15 bg-white p-8 text-center text-[#5a564f]">
          No collections in this category yet.
        </p>
      )}
    </div>
  );
}
