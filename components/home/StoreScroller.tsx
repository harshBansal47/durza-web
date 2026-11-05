import Image from "next/image";
import Link from "next/link";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";

interface ScrollerStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
  website_url?: string | null;
}

/**
 * Store grid with large logos and clear names for quick brand recognition.
 */
export default function StoreScroller({ stores }: { stores: ScrollerStore[] }) {
  if (stores.length === 0) return null;
  return (
    <ul
      className="grid grid-cols-2 gap-3 pb-1 pt-1 sm:grid-cols-3 lg:grid-cols-4"
      aria-label="Stores we track"
    >
      {stores.map((store) => {
        const logo = storeLogoUrl(store);
        return (
          <li key={store.id}>
            <Link
              href={`/stores/${store.slug}`}
              title={store.name}
              className="relative flex h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border border-ledger-line bg-paper-raised p-3 shadow-[var(--shadow-hairline)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-[var(--shadow-raised)]"
            >
              {logo ? (
                <Image src={logo} alt="" width={128} height={48} className="h-12 w-auto max-w-full object-contain" />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink font-sans text-base font-bold text-white"
                >
                  {storeInitials(store.name)}
                </span>
              )}
              <span className="sr-only">{store.name}</span>
            </Link>
          </li>
        );
      })}
      <li className="col-span-full flex justify-center pt-2">
        <Link href="/stores" className="btn btn-outline">View all stores</Link>
      </li>
    </ul>
  );
}
