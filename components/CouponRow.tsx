import Image from "next/image";
import Link from "next/link";
import { storeInitials } from "@/lib/catalog";
import { formatDiscount } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic } from "@/lib/types";
import TrustBadge from "./TrustBadge";

interface StoreInfo {
  name: string;
  slug?: string | null;
  logoUrl?: string | null;
}

export default function CouponRow({ coupon, store }: { coupon: CouponPublic; store?: StoreInfo }) {

  return (
    <Link
      href={`/coupons/${coupon.slug}`}
      className="-mx-2 flex items-center gap-4 rounded-[var(--radius-sm)] border-b border-ledger-line px-2 py-4 transition-colors last:border-b-0 hover:bg-paper-raised"
    >
      {store && <StoreMark name={store.name} slug={store.slug} logoUrl={store.logoUrl} />}

      <div className="min-w-0 flex-1">
        {store && <p className="truncate text-sm text-ink-soft">{store.name}</p>}
        <p className="truncate font-serif text-lg text-ink">{coupon.title}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-sm text-ink">{formatDiscount(coupon)}</p>
        <TrustBadge successRate={coupon.success_rate} reports={coupon.success_count + coupon.fail_count} />
      </div>
    </Link>
  );
}

/** A real logo when the store has one; otherwise an initial-letter monogram
 * in the same ledger-stamp style as the site's favicon, rather than a blank
 * gap or a generic placeholder icon. */
export function StoreMark({ name, slug, logoUrl }: { name: string; slug?: string | null; logoUrl?: string | null }) {
  const logo = storeLogoUrl({ slug, logo_url: logoUrl });
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${name} logo`}
        width={40}
        height={40}
        className="shrink-0 rounded-full border border-ledger-line object-contain bg-paper-raised"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ledger-line bg-paper-raised font-serif text-base text-ink-soft"
    >
      {storeInitials(name)}
    </div>
  );
}
