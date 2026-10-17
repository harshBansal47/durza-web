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
    // The catalogue API filters by a single store/category, so the checkboxes
    // behave as single-select: picking one clears the others.
    if (!checked) {
      apply(key, "");
      return;
    }
    apply(key, slug);
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
      <div className="max-h-56 space-y-1.5 overflow-y-auto">
        {items.map((item) => (
          <label
            key={item.id}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
              selected.includes(item.slug)
                ? "bg-accent-faint text-ink"
                : "text-ink-soft hover:bg-paper-raised hover:text-ink"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                selected.includes(item.slug)
                  ? "border-accent bg-accent text-white"
                  : "border-ledger-line bg-paper-raised"
              }`}
              aria-hidden="true"
            >
              {selected.includes(item.slug) && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={selected.includes(item.slug)}
              onChange={(event) => onToggle(item.slug, event.target.checked)}
              className="sr-only"
            />
            <span className="truncate">{item.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
