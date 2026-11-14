"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

export interface StaticGuideEntry {
  slug: string;
  category: string;
  title: string;
  summary: string;
}

/**
 * Category-filtered directory of the Durza store buying guides.
 *
 * The DB editorial listing renders above this section on /guides; this grid
 * covers the hand-authored per-store catalogue. The chips are computed from
 * the guides that actually ship, so an empty category never renders a chip.
 */
export default function StoreGuideDirectory({ guides }: { guides: StaticGuideEntry[] }) {
  const categories = useMemo(
    () =>
      Array.from(new Set(guides.map((g) => g.category)))
        .sort()
        .map((category) => ({
          category,
          count: guides.filter((g) => g.category === category).length,
        })),
    [guides],
  );

  const [active, setActive] = useState<string>("All");
  const visible = useMemo(
    () => (active === "All" ? guides : guides.filter((g) => g.category === active)),
    [active, guides],
  );

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
            Store buying guides
          </p>
          <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">
            {visible.length} guides across {active === "All" ? categories.length : 1} categories
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter guides by category">
          <button
            type="button"
            onClick={() => setActive("All")}
            aria-pressed={active === "All"}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              active === "All"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-ledger-line bg-white text-ink hover:border-slate-900"
            }`}
          >
            <LayoutGrid aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
            All&nbsp;<span className="font-normal opacity-80">{guides.length}</span>
          </button>
          {categories.map(({ category, count }) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                active === category
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-ledger-line bg-white text-ink hover:border-slate-900"
              }`}
            >
              {category}&nbsp;<span className="font-normal opacity-80">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((guide) => (
          <article
            key={guide.slug}
            className="info-card lift flex h-full flex-col p-5"
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
              {guide.category} · Store guide
            </p>
            <h3 className="mt-2 font-serif text-lg font-extrabold leading-snug text-ink">
              <Link href={`/guides/${guide.slug}`} className="hover:text-durza-deep">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{guide.summary}</p>
            <span className="mt-auto pt-4">
              <Link
                href={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-inkblue hover:underline"
              >
                Read guide
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
