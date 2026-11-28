"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Star } from "lucide-react";

/**
 * DB-backed review hub item. Every field is derived server-side from the
 * editorial row in app/reviews/page.tsx; this component holds no content data.
 */
export interface ReviewHubItem {
  slug: string;
  href: string;
  title: string;
  summary: string;
  verdict: string | null;
  /** Authored category from structured_data.category (backfilled into PostgreSQL). */
  category: string;
  updatedLabel: string | null;
  coverImage: string;
  ratingValue?: number | null;
  ratingBest?: number | null;
  /** Set from the editorial row's `is_featured` flag. */
  featured?: boolean;
}

const ALL = "__all__";

export default function ReviewsHub({ items }: { items: ReviewHubItem[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) || 0) + 1);
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  const selected = categories.some(([category]) => category === active) ? active : ALL;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = items.filter((item) => {
      if (selected !== ALL && item.category !== selected) return false;
      if (!q) return true;
      return `${item.title} ${item.summary} ${item.verdict ?? ""}`.toLowerCase().includes(q);
    });
    // Featured reviews (from PostgreSQL) lead the list; order is otherwise stable.
    return [...matches].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [items, selected, query]);

  return (
    <div className="mt-2">
      <section aria-label="Filter and search reviews" className="rounded-3xl border border-ledger-line bg-white p-4 shadow-sm sm:p-5">
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reviews by product, verdict or category"
            aria-label="Search reviews"
            className="w-full rounded-xl border border-ledger-line bg-paper-raised py-3 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/70 focus:border-inkblue"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Review categories">
          <button
            type="button"
            role="tab"
            aria-selected={selected === ALL}
            onClick={() => setActive(ALL)}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              selected === ALL
                ? "border-ink bg-ink text-paper-raised"
                : "border-ink/15 bg-white text-ink hover:border-ink/35 hover:bg-paper",
            ].join(" ")}
          >
            All ({items.length})
          </button>
          {categories.map(([category, count]) => {
            const isSelected = selected === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActive(category)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  isSelected
                    ? "border-ink bg-ink text-paper-raised"
                    : "border-ink/15 bg-white text-ink hover:border-ink/35 hover:bg-paper",
                ].join(" ")}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> of {items.length} reviews
        </p>
      </section>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {filtered.map((item) => {
          const rating = item.ratingValue != null
            ? `${item.ratingValue.toFixed(1)}/${item.ratingBest ?? 5}`
            : null;
          return (
            <article
              key={item.slug}
              className="group overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link href={item.href} className="block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper">
                  <Image
                    src={item.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  {item.featured ? (
                    <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper-raised">
                      Editor&apos;s pick
                    </span>
                  ) : null}
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-paper px-2.5 py-1 font-semibold text-ink">{item.category}</span>
                    {rating ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 font-semibold text-amber-900">
                        <Star aria-hidden="true" className="h-3 w-3 fill-current" />
                        {rating}
                      </span>
                    ) : null}
                    {item.updatedLabel ? (
                      <span className="rounded-full border border-ink/10 px-2.5 py-1 font-medium text-ink-soft">
                        Updated {item.updatedLabel}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-ink sm:text-xl">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft sm:text-base">
                    {item.verdict || item.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-durza-deep">
                    Read Full Review <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-ledger-line bg-white p-8 text-center text-ink-soft">
          No reviews match your search. Try a different keyword or category.
        </p>
      ) : null}
    </div>
  );
}
