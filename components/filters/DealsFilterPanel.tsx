"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useFilterNavigation } from "./FilterNavigation";
import type { DealFilters } from "@/lib/deal-discovery";

interface Facet {
  id: string;
  name: string;
  slug: string;
}

export default function DealsFilterPanel({
  stores,
  categories,
  filters,
}: {
  stores: Facet[];
  categories: Facet[];
  filters: DealFilters;
}) {
  const { navigate } = useFilterNavigation();
  const pathname = usePathname();
  const params = useSearchParams();

  function apply(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("skip");
    const query = next.toString();
    navigate(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="block min-w-[12rem] flex-1">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">Store</span>
        <select className="input" value={filters.stores[0] ?? ""} onChange={(e) => apply("stores", e.target.value)}>
          <option value="">All stores</option>
          {stores.map((s) => (
            <option key={s.id} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </label>

      <label className="block min-w-[12rem] flex-1">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">Category</span>
        <select className="input" value={filters.categories[0] ?? ""} onChange={(e) => apply("categories", e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </label>

      <label className="block min-w-[10rem]">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">Verified</span>
        <select
          className="input"
          value={filters.verifiedWithinHours ?? ""}
          onChange={(e) => apply("verified_within_hours", e.target.value)}
        >
          <option value="">Any</option>
          <option value="168">Verified recently</option>
        </select>
      </label>

      <label className="block min-w-[10rem]">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">Expiring</span>
        <select
          className="input"
          value={filters.expiresWithinDays ?? ""}
          onChange={(e) => apply("expires_within_days", e.target.value)}
        >
          <option value="">Anytime</option>
          <option value="1">Ending today</option>
          <option value="7">This week</option>
        </select>
      </label>
    </div>
  );
}
