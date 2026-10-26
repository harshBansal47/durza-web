import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { storeInitials } from "@/lib/catalog";
import { storeAccent, storeLogoUrl } from "@/lib/storeLogos";
import type { Store } from "@/lib/types";

/** Shared by the stores index and search results, so a store looks the same
 * wherever it appears. A store card: its own logo, a stripe of the accent sampled from that logo,
 * and a quiet hostname line — the store's identity, not a plain text link. */
export default function StoreCard({ store }: { store: Store }) {
  const logo = storeLogoUrl(store);
  const accent = storeAccent(store.slug);

  let host: string | null = null;
  if (store.website_url) {
    try {
      host = new URL(store.website_url).hostname.replace(/^www\./, "");
    } catch {
      host = null;
    }
  }

  return (
    <Link
      href={`/stores/${store.slug}`}
      className="lift group relative flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-ledger-line bg-white p-4 pr-4 shadow-[var(--shadow-hairline)]"
    >
      {accent && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      )}
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full border border-ledger-line bg-white object-contain"
          style={accent ? { boxShadow: `0 0 0 3px ${accent}26` } : undefined}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper font-serif text-base text-ink-soft"
        >
          {storeInitials(store.name)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-ink">{store.name}</span>
        <span className="block truncate text-xs text-ink-soft">
          {host ?? "Offers and coupon codes"}
        </span>
        {typeof store.offer_count === "number" && (
          <span
            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
              store.offer_count > 0 ? "bg-accent-faint text-accent" : "bg-paper text-ink-soft"
            }`}
          >
            {store.offer_count > 0
              ? `${store.offer_count} live ${store.offer_count === 1 ? "offer" : "offers"}`
              : "No live offers right now"}
          </span>
        )}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-inkblue"
      />
    </Link>
  );
}
