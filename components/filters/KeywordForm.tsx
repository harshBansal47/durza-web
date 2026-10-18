"use client";

import { useCallback, useId, useRef, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export interface KeywordFormProps {
  placeholder?: string;
  label?: string;
  submitLabel?: string;
  /**
   * `lg` is the search page's full-width box; `sm` fits above a result list;
   * `bar` is the compact icon-inset field for the sticky mobile toolbar —
   * Enter submits, typing still commits after the debounce.
   */
  size?: "lg" | "sm" | "bar";
  autoFocus?: boolean;
}

/**
 * The keyword box, shared by every listing page.
 *
 * It is a client form on purpose: a plain `<form action="/coupons">` replaces
 * the whole query string, so searching for a new term would silently drop the
 * store, type and sort a visitor had already chosen. This reads the current URL,
 * rewrites only `q`, and resets paging.
 *
 * Typing now drives the results (debounced) so a shopper never has to hunt for
 * a submit button; Enter still works for the impatient.
 */
export default function KeywordForm({
  placeholder = "Search coupons by keyword…",
  label = "Filter coupons by keyword",
  submitLabel = "Search",
  size = "sm",
  autoFocus = false,
}: KeywordFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const id = useId();

  const current = params.get("q") ?? params.get("search") ?? "";

  const [value, setValue] = useState(current);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const push = useCallback(
    (nextValue: string) => {
      const next = new URLSearchParams(params.toString());
      if (nextValue) next.set("q", nextValue);
      else {
        next.delete("q");
        next.delete("search");
      }
      next.delete("skip");
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  function schedule(value: string) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => push(value.trim()), 250);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    push(value.trim());
  }

  const large = size === "lg";

  if (size === "bar") {
    return (
      <form onSubmit={onSubmit} role="search" className="relative min-w-0 flex-1">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          strokeWidth={2}
        />
        <input
          id={id}
          name="q"
          type="search"
          key={current}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            schedule(e.target.value);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="h-10 w-full rounded-xl border border-ledger-line bg-paper-alt pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:border-accent-soft focus:bg-paper-raised focus:outline-none"
        />
        <button type="submit" className="sr-only">
          {submitLabel}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={large ? "flex gap-2" : "flex w-full gap-2 sm:max-w-md"}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name="q"
        type="search"
        key={current}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          schedule(e.target.value);
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={
          large
            ? "min-w-0 flex-1 border border-ledger-line bg-paper-raised px-5 py-4 font-mono text-sm text-ink placeholder:text-ink-soft focus:border-inkblue focus:outline-none"
            : "input min-w-0 flex-1"
        }
      />
      <button
        type="submit"
        className={large ? "btn btn-outline shrink-0 px-5" : "btn btn-outline shrink-0 px-3 text-sm"}
      >
        {submitLabel}
      </button>
    </form>
  );
}
