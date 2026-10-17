import Image from "next/image";
import Link from "next/link";
import { storeInitials } from "@/lib/catalog";
import { storeLogoUrl } from "@/lib/storeLogos";

interface MarqueeStore {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
}

function Chip({ store }: { store: MarqueeStore }) {
  const logo = storeLogoUrl(store);
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="mx-2 flex shrink-0 items-center gap-2.5 rounded-full border border-ledger-line bg-white py-2 pl-2 pr-5 shadow-[var(--shadow-hairline)] transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-[var(--shadow-raised)]"
    >
      {logo ? (
        <Image src={logo} alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-paper object-contain" />
      ) : (
        <span aria-hidden="true" className="bg-ink flex h-9 w-9 items-center justify-center rounded-full font-sans text-sm font-medium text-white">
          {storeInitials(store.name)}
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-medium text-ink">{store.name}</span>
    </Link>
  );
}

/** Seamless looping row of store chips. Fully static (scrollable) under reduced motion. */
export default function StoreMarquee({ stores }: { stores: MarqueeStore[] }) {
  if (stores.length === 0) return null;
  const base = stores.length >= 8 ? stores : Array.from({ length: Math.ceil(8 / stores.length) }, () => stores).flat();
  return (
    <div className="marquee relative overflow-hidden py-1" aria-label="Stores we track">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-paper to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-paper to-transparent" aria-hidden="true" />
      <div className="marquee-track" style={{ animationDuration: `${Math.max(base.length * 4, 24)}s` }}>
        {[...base, ...base].map((s, i) => (
          <div key={`${s.id}-${i}`} aria-hidden={i >= base.length} {...(i >= base.length ? { inert: true } : {})}>
            <Chip store={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
