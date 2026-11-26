"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DiscoveryStrip from "@/components/DiscoveryStrip";
import { ArrowRight, Search } from "lucide-react";
import type { GuideHubCategory } from "@/lib/guide-cover";

export interface GuideHubItem {
  slug: string;
  href: string;
  title: string;
  summary: string;
  categoryLabel: string;
  hubCategory: GuideHubCategory;
  updatedLabel: string | null;
  /** ISO-verified fact-check date, shown as a separate badge when present. */
  checkedLabel?: string | null;
  coverImage: string;
}

const FILTERS: GuideHubCategory[] = [
  "All Guides",
  "Electronics & Laptops",
  "Sale & Bank Math",
  "Beauty & Skincare",
  "Fashion & Footwear",
  "Supplements & Fitness",
  "Home & Appliances",
  "Travel & Lifestyle",
];

function matchesFeatured(item: GuideHubItem): boolean {
  const s = item.slug.toLowerCase();
  const t = item.title.toLowerCase();
  return (
    (s.includes("laptop") && (s.includes("deal") || t.includes("laptop deals"))) ||
    s.includes("credit-card-instant-discount") ||
    s.includes("best-credit-card-online-shopping") ||
    s.includes("skincare-actives")
  );
}

export default function GuidesHubClient({ items }: { items: GuideHubItem[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<GuideHubCategory>("All Guides");

  const counts = useMemo(() => {
    const map = new Map<GuideHubCategory, number>();
    for (const f of FILTERS) map.set(f, 0);
    for (const item of items) {
      map.set("All Guides", (map.get("All Guides") || 0) + 1);
      map.set(item.hubCategory, (map.get(item.hubCategory) || 0) + 1);
    }
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (active !== "All Guides" && item.hubCategory !== active) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
    });
  }, [items, active, query]);

  // Featured picks come from the current filter/search result set, so changing
  // a category chip or typing in search updates them as well.
  const featured = useMemo(() => {
    const picks = filtered.filter(matchesFeatured);
    const preferred: GuideHubItem[] = [];
    const want = [
      (i: GuideHubItem) => i.slug.includes("best-laptop") || (i.title.toLowerCase().includes("laptop") && i.title.toLowerCase().includes("deal")),
      (i: GuideHubItem) => i.slug.includes("credit-card-instant-discount") || i.slug.includes("best-credit-card-online-shopping"),
      (i: GuideHubItem) => i.slug.includes("skincare-actives") || i.title.toLowerCase().includes("skincare actives"),
    ];
    for (const fn of want) {
      const found = picks.find((p) => fn(p) && !preferred.includes(p)) || filtered.find((p) => fn(p) && !preferred.includes(p));
      if (found) preferred.push(found);
    }
    if (preferred.length < 3) {
      for (const item of filtered) {
        if (preferred.length >= 3) break;
        if (!preferred.includes(item)) preferred.push(item);
      }
    }
    return preferred.slice(0, 3);
  }, [filtered]);

  return (
    <div className="mt-2">
       <section className="mt-10" aria-label="Filter and search guides">
        <div className="rounded-3xl border border-ledger-line bg-white p-4 shadow-sm sm:p-5">
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides by title or summary (e.g. Lenovo, sunscreen, HDFC, whey)"
              className="w-full rounded-xl border border-ledger-line bg-paper-raised py-3 pl-10 pr-4 text-sm text-ink outline-none ring-0 placeholder:text-ink-soft/70 focus:border-inkblue"
              aria-label="Search guides"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Guide categories">
            {FILTERS.map((f) => {
              const selected = active === f;
              const label = `${f} (${counts.get(f) || 0})`;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(f)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    selected
                      ? "border-[#141413] bg-[#141413] text-white"
                      : "border-[#141413]/15 bg-white text-[#141413] hover:border-[#141413]/35 hover:bg-[#f3efe8]",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-ink-soft">Showing <span className="font-semibold text-ink">{filtered.length}</span> of {items.length} guides</p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.slug} className="group overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Link href={item.href} className="block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f3efe8]">
                  <Image src={item.coverImage} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-[#f3efe8] px-2.5 py-1 font-semibold text-[#141413]">{item.categoryLabel}</span>
                    {item.updatedLabel && (
                      <span className="rounded-full border border-[#141413]/10 px-2.5 py-1 font-medium text-[#5a564f]">Updated {item.updatedLabel}</span>
                    )}
                    {item.checkedLabel && (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-800">Facts checked {item.checkedLabel}</span>
                    )}
                  </div>
                  <h3 className="mt-3 line-clamp-2 font-serif text-lg font-extrabold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{item.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">Read guide <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 rounded-2xl border border-dashed border-ledger-line bg-white p-8 text-center text-ink-soft">No guides match your search. Try a different keyword or category.</p>
        )}
      </section>
      {featured.length > 0 && (
      <section aria-labelledby="featured-guides-heading" className="mt-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Featured</p>
            <h2 id="featured-guides-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Featured Must-Read Guides</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((item) => (
            <article key={item.slug} className="group overflow-hidden rounded-3xl border border-[#141413]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Link href={item.href} className="block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f3efe8]">
                  <Image src={item.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="p-4 sm:p-5">
                  <span className="inline-flex rounded-full bg-[#f3efe8] px-2.5 py-1 text-[11px] font-semibold text-[#141413]">{item.categoryLabel}</span>
                  <h3 className="mt-3 line-clamp-2 font-serif text-lg font-extrabold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">{item.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a4b12]">Read guide <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      )}

      <DiscoveryStrip
        ariaLabel="Explore more"
        items={[
          { href: "/compare", title: "Side-by-Side Comparisons", note: "Amazon vs Flipkart, brand stores vs marketplaces, and bank card math." },
          { href: "/collections", title: "Curated Buying Kits", note: "Multi-store kits for WFH desks, humidity skincare, home gyms, and more." },
          { href: "/stores", title: "Official Brand Stores", note: "Browse verified brand hubs and partner storefronts on Durza." },
        ]}
      />
    </div>
  );
}
