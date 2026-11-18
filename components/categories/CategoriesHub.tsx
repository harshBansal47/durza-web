"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import type { Category } from "@/lib/types";

export interface CategoryCardData {
  id: string;
  name: string;
  slug: string;
  href: string;
  iconCategory: Category;
  storeCount: number;
  offerCount: number;
  topStoreNames: string[];
  subtitle: string;
}

export default function CategoriesHub({ items }: { items: CategoryCardData[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      if (item.name.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q)) return true;
      return item.topStoreNames.some((s) => s.toLowerCase().includes(q));
    });
  }, [items, query]);

  return (
    <div className="mt-6">
      <div className="mb-5">
        <label htmlFor="category-filter" className="sr-only">Filter categories or brands</label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="category-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter categories or type a brand name..."
            className="w-full rounded-xl border border-ledger-line bg-white py-3 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/70 focus:border-inkblue"
          />
        </div>
        <p className="mt-2 text-sm text-ink-soft">Showing <span className="font-semibold text-ink">{filtered.length}</span> of {items.length} categories</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="group flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-5 shadow-[var(--shadow-hairline)] transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-ledger-line bg-paper text-ink shadow-[var(--shadow-hairline)] transition-all duration-200 group-hover:border-accent-soft"
                >
                  <CategoryIcon category={c.iconCategory} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-ink group-hover:text-accent">{c.name}</h2>
                  <p className="mt-0.5 text-xs font-medium text-ink-soft">
                    {c.storeCount} {c.storeCount === 1 ? "Store" : "Stores"} · {c.offerCount} {c.offerCount === 1 ? "Offer" : "Offers"}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-paper-alt px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                {c.offerCount > 0 ? "Live" : "Explore"}
              </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-soft">{c.subtitle}</p>

            {c.topStoreNames.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.topStoreNames.slice(0, 4).map((name) => (
                  <span key={name} className="rounded-full border border-ledger-line bg-paper-raised px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                    {name}
                  </span>
                ))}
              </div>
            )}

            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-inkblue">
              Explore offers <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-ledger-line bg-white p-8 text-center text-ink-soft">
          No categories match your filter. Try a different category or brand name.
        </p>
      )}

      <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="More ways to browse">
        {[
          {
            href: "/collections",
            title: "Curated Buying Kits",
            note: "Multi-store kits built for WFH desks, humidity skincare & home gyms.",
          },
          {
            href: "/compare",
            title: "Side-by-Side Comparisons",
            note: "Amazon vs. Flipkart, brand eStores vs. marketplaces, and bank card math.",
          },
          {
            href: "/stores",
            title: "All Stores A–Z",
            note: "Browse every brand hub and verified affiliate storefront on Durza.",
          },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group rounded-3xl border border-ledger-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-inkblue/30 hover:shadow-md">
            <p className="font-serif text-lg font-extrabold text-ink">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{item.note}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">Explore <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
          </Link>
        ))}
      </section>
    </div>
  );
}
