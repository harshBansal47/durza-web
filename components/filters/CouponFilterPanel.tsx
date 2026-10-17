"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "@/components/ui/Dropdown";
import {
  CODE_OPTIONS,
  CONFIRMED_OPTIONS,
  EXPIRES_OPTIONS,
  FILTER_KEYS,
  RATE_OPTIONS,
  TYPE_OPTIONS,
  filterCount,
  hintOf,
  labelOf,
  parseFilters,
  type FilterOption,
} from "@/lib/filters";

export interface CouponFilterPanelProps {
  stores: { id: string; name: string; slug: string }[];
  categories: { id: string; name: string; slug: string }[];
  /** Skip the category control when the page is already scoped to one category. */
  hideCategory?: boolean;
  /** Rendered under the heading — a one-line explanation of what this panel does. */
  note?: ReactNode;
}

/**
 * The filter sidebar.
 *
 * Every control writes to the URL and nothing else: the server component then
 * re-runs the query with the new params. Changing any filter resets `skip`,
 * because page 3 of the old result set is not page 1 of the new one.
 */
export default function CouponFilterPanel({
  stores,
  categories,
  hideCategory = false,
  note,
}: CouponFilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = parseFilters(params);

  // Plain functions on purpose: the React Compiler memoizes these for us, and
  // a manual useCallback here is a lint error rather than an optimisation.
  function apply(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    next.delete("skip");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function clearAll() {
    const next = new URLSearchParams(params.toString());
    for (const key of FILTER_KEYS) {
      if (key !== "q") next.delete(key);
    }
    next.delete("skip");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const count = filterCount(filters);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        {/* A label, not a document heading: this panel is rendered three times
            (desktop, drawer, sticky), and its h2 was landing before the page h1
            and duplicating in the heading outline. */}
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          Filters{count > 0 ? ` (${count})` : ""}
        </p>
        {count > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-inkblue underline-offset-2 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {note && <p className="text-xs leading-relaxed text-ink-soft">{note}</p>}

      <Select
        label="Store"
        options={[{ value: "", label: "All stores" }, ...stores.map((s) => ({ value: s.slug, label: s.name }))]}
        value={filters.store}
        onChange={(v) => apply("store", v)}
        searchable
        searchPlaceholder="Find a store…"
        placeholder="All stores"
      />

      {!hideCategory && (
        <Select
          label="Category"
          options={[
            { value: "", label: "All categories" },
            ...categories.map((c) => ({ value: c.slug, label: c.name })),
          ]}
          value={filters.category}
          onChange={(v) => apply("category", v)}
          searchable
          searchPlaceholder="Find a category…"
          placeholder="All categories"
        />
      )}

      <Select
        label="Offer type"
        options={TYPE_OPTIONS}
        value={filters.type}
        onChange={(v) => apply("type", v)}
        placeholder="Any kind"
      />

      <Select
        label="Code"
        options={CODE_OPTIONS}
        value={filters.code}
        onChange={(v) => apply("code", v)}
        placeholder="Codes and deals"
      />

      <Select
        label="Confirmed"
        options={CONFIRMED_OPTIONS}
        value={filters.confirmed}
        onChange={(v) => apply("confirmed", v)}
        placeholder="Any, confirmed or not"
      />

      <Select
        label="Success rate"
        options={RATE_OPTIONS}
        value={filters.rate}
        onChange={(v) => apply("rate", v)}
        placeholder="Any success rate"
      />

      <Select
        label="Expiring"
        options={EXPIRES_OPTIONS}
        value={filters.expires}
        onChange={(v) => apply("expires", v)}
        placeholder="Any expiry"
      />
    </div>
  );
}

function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  searchable,
  searchPlaceholder,
}: {
  label: string;
  options: FilterOption<string>[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}) {
  const selected = labelOf(options, value) ?? placeholder;
  const hint = hintOf(options, value);

  return (
    <FilterGroup label={label}>
      <Dropdown
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        width="16rem"
        options={[
          options[0],
          ...(options.length > 1 ? [{ divider: true as const }] : []),
          ...options.slice(1),
        ]}
        onSelect={onChange}
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="input flex w-full items-center text-left"
          >
            <Trigger label={selected} open={open} />
          </button>
        )}
      />
      {hint && <p className="mt-1.5 text-xs leading-snug text-ink-soft">{hint}</p>}
    </FilterGroup>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">{label}</p>
      {children}
    </div>
  );
}

function Trigger({ label, open }: { label: string; open: boolean }) {
  return (
    <span className="flex w-full items-center justify-between gap-2">
      <span className="truncate">{label}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}
