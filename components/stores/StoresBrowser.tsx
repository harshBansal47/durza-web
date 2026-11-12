"use client";

import { useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import StoreCard from "@/components/stores/StoreCard";
import { api } from "@/lib/api";
import type { Store } from "@/lib/types";

/**
 * Progressive "View More" for the stores index. The server renders the first
 * batch; appended pages come from the API below what is already on screen,
 * keeping filters (q) intact. Letter sections re-derive as items append.
 */
export default function StoresBrowser({
  initialStores,
  total,
  q,
  initialSkip = 0,
  limit = 24,
}: {
  initialStores: Store[];
  total: number;
  q: string;
  initialSkip?: number;
  limit?: number;
}) {
  const [items, setItems] = useState<Store[]>(initialStores);
  const [nextSkip, setNextSkip] = useState(initialSkip + initialStores.length);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const seen = useRef(new Set(initialStores.map((store) => store.id)));

  const hasMore = items.length < total;

  const groups = useMemo(() => {
    const map = new Map<string, Store[]>();
    for (const store of items) {
      const letter = store.name[0]?.toUpperCase() ?? "#";
      const key = /[A-Z]/.test(letter) ? letter : "#";
      map.set(key, [...(map.get(key) ?? []), store]);
    }
    return map;
  }, [items]);
  const letters = useMemo(() => [...groups.keys()].sort(), [groups]);

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(false);
    try {
      const result = await api.listStores({
        ...(q ? { search: q } : {}),
        skip: nextSkip,
        limit,
      });
      const fresh = result.items.filter((store) => !seen.current.has(store.id));
      for (const store of fresh) seen.current.add(store.id);
      setItems((previous) => [...previous, ...fresh]);
      setNextSkip(nextSkip + result.items.length);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {letters.length > 0 && (
        <nav className="mb-10 flex flex-wrap gap-2" aria-label="Jump to letter">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="rounded-full border border-ledger-line px-3 py-1 font-mono text-xs font-medium text-ink-soft transition-colors hover:border-inkblue hover:text-inkblue"
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {items.length === 0 ? null : (
        <div className="space-y-10">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
              <h2 className="mb-4 flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  {letter === "#" ? "Others" : letter}
                </span>
                <span className="text-[11px] text-ink-soft">
                  {groups.get(letter)!.length} {groups.get(letter)!.length === 1 ? "store" : "stores"}
                </span>
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groups.get(letter)!.map((store) => (
                  <li key={store.id}>
                    <StoreCard store={store} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-col items-center gap-2">
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ledger-line bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:border-inkblue hover:text-inkblue disabled:opacity-60"
          >
            {loading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />}
            {loading ? "Loading…" : "View More"}
          </button>
        ) : (
          total > 0 && (
            <p className="py-2 text-center text-xs text-ink-soft">That&apos;s all {total} stores.</p>
          )
        )}
        {error && (
          <p role="alert" className="text-xs text-rust">
            Couldn&apos;t load more stores — check your connection and try again.
          </p>
        )}
      </div>
    </div>
  );
}
