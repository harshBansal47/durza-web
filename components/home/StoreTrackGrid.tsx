import Image from "next/image";
import PendingLink from "@/components/ui/PendingLink";
import { formatStoreDisplayName } from "@/lib/store-display";
import { storeLogoUrl } from "@/lib/storeLogos";
import { TIER_A_STORE_SLUGS } from "@/lib/homepage-curation";

interface TrackStore {
  id: string;
  name: string;
  slug: string;
  offer_count?: number | null;
  logo_url?: string | null;
  website_url?: string | null;
}

/**
 * Stores we track — upgraded logo grid. Pins flagship/high-utility stores
 * first, then fills from the live catalogue by offer count.
 */
const PINNED = [...TIER_A_STORE_SLUGS];
const PINNED_SET = new Set(PINNED);
const TARGET = 12;

export default function StoreTrackGrid({ stores }: { stores: TrackStore[] }) {
  if (stores.length === 0) return null;
  const bySlug = new Map(stores.map((s) => [s.slug, s]));
  const picked: TrackStore[] = [];

  for (const slug of PINNED) {
    const store = bySlug.get(slug);
    if (store) picked.push(store);
  }
  const rest = stores
    .filter((s) => !PINNED_SET.has(s.slug))
    .sort((a, b) => (b.offer_count ?? 0) - (a.offer_count ?? 0));
  for (const store of rest) {
    if (picked.length >= TARGET) break;
    picked.push(store);
  }
  if (picked.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {picked.map((store) => {
        const logo = storeLogoUrl(store);
        const count = typeof store.offer_count === "number" ? store.offer_count : null;
        const displayName = formatStoreDisplayName({ slug: store.slug, name: store.name });
        return (
          <li key={store.id}>
            <PendingLink
              variant="overlay"
              href={`/stores/${store.slug}`}
              className="group flex h-full flex-col items-center justify-center rounded-2xl border border-ledger-line bg-white px-2 py-4 text-center shadow-2xs transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-ledger-line bg-white p-1.5"
              >
                {logo ? (
                  <Image
                    src={logo}
                    alt=""
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-ink-soft">
                    {displayName.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              <span className="mt-2.5 text-sm font-semibold leading-tight text-slate-900">
                {displayName}
              </span>
              <span
                className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  count && count > 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {count && count > 0 ? `${count} offer${count === 1 ? "" : "s"}` : "Official Store Guide"}
              </span>
            </PendingLink>
          </li>
        );
      })}
    </ul>
  );
}
