"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEAL_SORT_OPTIONS } from "@/lib/deal-discovery";
import type { DealSort } from "@/lib/deal-discovery";

export default function DealsSortControl({ sort }: { sort: DealSort }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function changeSort(value: DealSort) {
    const next = new URLSearchParams(params.toString());
    if (value === "recommended") next.delete("sort");
    else next.set("sort", value);
    next.delete("skip");
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <label className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Sort</span>
      <select
        aria-label="Sort deals"
        className="input w-auto min-w-44"
        value={sort}
        onChange={(event) => {
          const selected = DEAL_SORT_OPTIONS.find((option) => option.value === event.target.value);
          if (selected) changeSort(selected.value);
        }}
      >
        {DEAL_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
