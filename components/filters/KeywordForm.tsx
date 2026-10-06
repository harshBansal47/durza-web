"use client";

import { useCallback, useId, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface KeywordFormProps {
  placeholder?: string;
  label?: string;
  submitLabel?: string;
  /** `lg` is the search page's full-width box; `sm` fits above a result list. */
  size?: "lg" | "sm";
  autoFocus?: boolean;
}

/**
 * The keyword box, shared by every listing page.
 *
 * It is a client form on purpose: a plain `<form action="/coupons">` replaces
 * the whole query string, so searching for a new term would silently drop the
 * store, type and sort a visitor had already chosen. This reads the current URL,
 * rewrites only `q`, and resets paging.
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

  const push = useCallback(
    (value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set("q", value);
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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = new FormData(e.currentTarget).get("q");
    push(typeof raw === "string" ? raw.trim() : "");
  }

  const large = size === "lg";

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
        defaultValue={current}
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
