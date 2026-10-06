"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "@/components/ui/Dropdown";
import { DEFAULT_SORT, SORT_OPTIONS, hintOf, parseFilters } from "@/lib/filters";

/**
 * Sort, in the results header where shoppers expect it.
 *
 * Several sorts are deliberately exclusive — "ending soonest" cannot include a
 * coupon with no expiry — and the backend drops those rows rather than padding
 * the list, so the count changes with the sort. The hint says so instead of
 * letting the number of results quietly move under the visitor.
 */
export default function SortControl({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { sort } = parseFilters(params);

  // A plain function: the React Compiler memoizes it, a manual useCallback is a lint error.
  function apply(value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === DEFAULT_SORT) next.delete("sort");
    else next.set("sort", value);
    next.delete("skip");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const hint = hintOf(SORT_OPTIONS, sort);
  const selected = SORT_OPTIONS.find((o) => o.value === sort) ?? SORT_OPTIONS[0];

  return (
    <div className={className}>
      <Dropdown
        width="16rem"
        align="right"
        options={SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
        onSelect={apply}
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label="Sort results"
            className="input flex items-center text-left"
          >
            <span className="flex w-full items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                Sort
              </span>
              <span className="truncate">{selected.label}</span>
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
          </button>
        )}
      />
      {hint && <p className="mt-1.5 max-w-xs text-right text-xs leading-snug text-ink-soft">{hint}</p>}
    </div>
  );
}
