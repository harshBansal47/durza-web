import Image from "next/image";
import Link from "next/link";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";

interface ScrollerStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
}

/**
 * Stores as a snap-scrolling rail of logo cards: recognisable logos, larger
 * than a chip row, scrollable by touch, trackpad, or keyboard. The store name
 * rides along for screen readers and as a tooltip.
 */
export default function StoreScroller({ stores }: { stores: ScrollerStore[] }) {
  if (stores.length === 0) return null;
  return (
    <ul
      className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1"
      aria-label="Stores we track"
    >
      {stores.map((store) => {
        const logo = storeLogoUrl(store);
        return (
          <li key={store.id} className="shrink-0 snap-start">
            <Link
              href={`/stores/${store.slug}`}
              title={store.name}
              className="relative flex h-20 w-32 items-center justify-center rounded-xl border border-ledger-line bg-paper-raised p-4 shadow-[var(--shadow-hairline)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-[var(--shadow-raised)]"
            >
              {logo ? (
                <Image src={logo} alt="" width={96} height={40} className="h-10 w-auto max-w-full object-contain" />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-sans text-sm font-medium text-white"
                >
                  {storeInitials(store.name)}
                </span>
              )}
              <span className="sr-only">{store.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
