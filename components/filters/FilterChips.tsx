"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FILTER_KEYS, activeChips, parseFilters } from "@/lib/filters";

/**
 * The active filters as removable chips, shown above the results.
 *
 * They exist because a sidebar selection is invisible once the sidebar scrolls
 * away — and because a filtered URL pasted into a chat has to be readable. The
 * labels come from the server (it resolved the slugs to real names), so a chip
 * never shows an id.
 */
export default function FilterChips({
  storeLabel,
  categoryLabel,
  hideCategory = false,
}: {
  storeLabel?: string;
  categoryLabel?: string;
  /** A category-scoped page says so in its heading; a chip would repeat it. */
  hideCategory?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = parseFilters(params);
  const chips = activeChips(
    hideCategory ? { ...filters, category: "" } : filters,
    { store: storeLabel, category: categoryLabel },
  );

  const push = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mutate(next);
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Showing</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() =>
            push((next) => {
              next.delete(chip.key);
              next.delete("skip");
            })
          }
          className="group inline-flex items-center gap-1.5 rounded-full border border-ink bg-ink px-3 py-1 text-xs font-semibold text-paper transition-colors hover:border-rust hover:bg-rust"
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <span aria-hidden="true" className="text-[13px] leading-none opacity-70 group-hover:opacity-100">
            ×
          </span>
        </button>
      ))}
      <button
        type="button"
        onClick={() =>
          push((next) => {
            for (const key of FILTER_KEYS) {
              if (key !== "q") next.delete(key);
            }
            next.delete("skip");
          })
        }
        className="text-xs text-inkblue underline-offset-2 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
