"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import StoreCard from "@/components/stores/StoreCard";
import type { Store } from "@/lib/types";
import { formatStoreDisplayName, storeBucketLetter, storeSortKey } from "@/lib/store-display";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl, storeAccent } from "@/lib/storeLogos";
import { TIER_A_STORE_SLUGS } from "@/lib/homepage-curation";

const FEATURED_SLUGS = TIER_A_STORE_SLUGS.slice(0, 8);

function FeaturedStoreCard({ store }: { store: Store }) {
  const displayName = formatStoreDisplayName(store);
  const logo = storeLogoUrl(store);
  const accent = storeAccent(store.slug);
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="group flex items-center gap-3 rounded-2xl border border-ledger-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-inkblue/30 hover:shadow-md"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-ledger-line bg-paper font-serif text-sm text-ink-soft">
          {storeInitials(displayName)}
        </span>
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={48}
            height={48}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            className="absolute inset-0 h-12 w-12 rounded-full border border-ledger-line bg-white object-contain"
            style={accent ? { boxShadow: `0 0 0 3px ${accent}26` } : undefined}
          />
        ) : null}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink group-hover:text-inkblue">{displayName}</span>
        <span className="block text-xs text-ink-soft">Official store guide</span>
      </span>
    </Link>
  );
}

export default function StoresDirectoryClient({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState("");

  const featured = useMemo(() => {
    const bySlug = new Map(stores.map((s) => [s.slug, s]));
    return FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter((s): s is Store => Boolean(s));
  }, [stores]);

  const enriched = useMemo(() => {
    return stores.map((s) => {
      const displayName = formatStoreDisplayName(s);
      return { store: s, displayName, bucket: storeBucketLetter(displayName), sortKey: storeSortKey(displayName) };
    });
  }, [stores]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = [...enriched].sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.displayName.localeCompare(b.displayName));
    if (!q) return base;
    return base.filter(({ store, displayName }) => {
      const host = store.website_url ? store.website_url.replace(/^https?:\/\//, "").replace(/^www\./, "") : "";
      return (
        displayName.toLowerCase().includes(q) ||
        store.name.toLowerCase().includes(q) ||
        store.slug.toLowerCase().includes(q) ||
        host.toLowerCase().includes(q)
      );
    });
  }, [enriched, query]);

  const groups = useMemo(() => {
    const map = new Map<string, { store: Store; displayName: string }[]>();
    for (const item of filtered) {
      const arr = map.get(item.bucket) ?? [];
      arr.push({ store: item.store, displayName: item.displayName });
      map.set(item.bucket, arr);
    }
    return map;
  }, [filtered]);

  const letters = useMemo(() => {
    const keys = Array.from(groups.keys());
    return keys.sort((a, b) => {
      if (a === "#" && b !== "#") return 1;
      if (b === "#" && a !== "#") return -1;
      return a.localeCompare(b);
    });
  }, [groups]);

  return (
    <div>
      <div className="mb-8">
        <label htmlFor="stores-search" className="sr-only">Search stores</label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="stores-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 95+ stores by brand or domain (e.g., Lenovo, skincare, shoes)..."
            className="w-full rounded-xl border border-ledger-line bg-white py-3 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink-soft/70 focus:border-inkblue"
          />
        </div>
        <p className="mt-2 text-sm text-ink-soft">Showing <span className="font-semibold text-ink">{filtered.length}</span> of {stores.length} stores</p>
      </div>

      {query.trim() === "" && featured.length > 0 && (
        <section aria-labelledby="featured-stores-heading" className="mb-10">
          <div className="mb-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Spotlight</p>
            <h2 id="featured-stores-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Featured Official Stores</h2>
            <p className="mt-1 text-sm text-ink-soft">Flagship brand hubs and official storefront guides on Durza.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((store) => (
              <FeaturedStoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>
      )}

      {letters.length > 0 && (
        <nav className="sticky top-16 z-10 mb-8 flex flex-wrap gap-2 rounded-2xl border border-ledger-line bg-paper/95 p-3 backdrop-blur" aria-label="Jump to letter">
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

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ledger-line bg-white p-10 text-center">
          <p className="font-serif text-xl font-bold text-ink">No stores match that search</p>
          <p className="mt-2 text-sm text-ink-soft">Try a brand name, domain, or category keyword like “Lenovo”, “skincare”, or “shoes”.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-28">
              <h2 className="mb-4 flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  {letter === "#" ? "Others" : letter}
                </span>
                <span className="text-[11px] text-ink-soft">
                  {groups.get(letter)!.length} {groups.get(letter)!.length === 1 ? "store" : "stores"}
                </span>
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groups.get(letter)!.map(({ store }) => (
                  <li key={store.id}>
                    <StoreCard store={store} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
