"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReviewCategory, ReviewEntry } from "@/data/reviews";

type Filter = "All" | ReviewCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All (8)", value: "All" },
  { label: "Memberships & Cards", value: "Memberships & Cards" },
  { label: "Laptops & Tech", value: "Laptops & Tech" },
  { label: "Skincare & Haircare", value: "Skincare & Haircare" },
  { label: "Health & Supplements", value: "Health & Supplements" },
  { label: "Fashion & Activewear", value: "Fashion & Activewear" },
  { label: "EdTech & Careers", value: "EdTech & Careers" },
];

export default function ReviewsHub({ items }: { items: ReviewEntry[] }) {
  const [active, setActive] = useState<Filter>("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active, items],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <header className="max-w-3xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">
          Honest Buyer Assessments
        </p>
        <h1 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-[#141413] sm:text-5xl">
          Independent Reviews
        </h1>
        <p className="mt-4 text-base leading-7 text-[#4a463f] sm:text-lg">
          Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Review categories">
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
            <Link href={`/reviews/${item.slug}`} className="block">
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
                    {item.updatedLabel}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-[#141413] sm:text-xl">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5a564f] sm:text-base">
                  {item.verdict}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">
                  Read Full Review <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
