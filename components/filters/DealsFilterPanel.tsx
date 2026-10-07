"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function apply(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("skip");
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleFacet(key: "stores" | "categories", slug: string, checked: boolean) {
    const selected = new Set((params.get(key) ?? "").split(",").filter(Boolean));
    if (checked) selected.add(slug);
    else selected.delete(slug);
    apply(key, [...selected].join(","));
  }

  return (
    <div className="space-y-6">
      <FacetGroup
        label="Stores"
        items={stores}
        selected={filters.stores}
        onToggle={(slug, checked) => toggleFacet("stores", slug, checked)}
      />
      <FacetGroup
        label="Categories"
        items={categories}
        selected={filters.categories}
        onToggle={(slug, checked) => toggleFacet("categories", slug, checked)}
      />
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          Recently verified
        </span>
        <select
          className="input"
          value={filters.verifiedWithinHours ?? ""}
          onChange={(event) => apply("verified_within_hours", event.target.value)}
        >
          <option value="">Any time</option>
          <option value="24">Within 24 hours</option>
          <option value="168">Within 7 days</option>
          <option value="720">Within 30 days</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          Expiration
        </span>
        <select
          className="input"
          value={filters.expiresWithinDays ?? ""}
          onChange={(event) => apply("expires_within_days", event.target.value)}
        >
          <option value="">Any expiration</option>
          <option value="1">Within 1 day</option>
          <option value="7">Within 7 days</option>
          <option value="30">Within 30 days</option>
          <option value="90">Within 90 days</option>
        </select>
      </label>
    </div>
  );
}

function FacetGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string;
  items: Facet[];
  selected: string[];
  onToggle: (slug: string, checked: boolean) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
        {label}
      </legend>
      <div className="max-h-56 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <label key={item.id} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={selected.includes(item.slug)}
              onChange={(event) => onToggle(item.slug, event.target.checked)}
              className="accent-vermilion"
            />
            <span className="truncate">{item.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
