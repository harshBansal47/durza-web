import Link from "next/link";
import { formatDiscount } from "@/lib/format";
import { maskCode } from "@/lib/codes";
import type { CouponPublic } from "@/lib/types";

/**
 * One card for a family of near-identical offers (same title, different
 * codes) so a store page is not eight copies of one headline. Codes are not
 * printed here — every row links to its offer page, where the reveal + copy
 * flow lives.
 */
export default function CouponGroupCard({
  label,
  coupons,
  currency,
}: {
  label: string;
  coupons: CouponPublic[];
  currency: string;
}) {
  return (
    <details className="lift h-fit rounded-[20px] border border-ledger-line bg-white p-4 shadow-[var(--shadow-hairline)]">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block font-serif text-base font-bold leading-snug text-ink">{label}</span>
          <span className="mt-1 block text-xs text-ink-soft">
            {coupons.length} separate codes for this offer — open to see each one.
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-paper-alt px-3 py-1 font-mono text-[11px] text-ink-soft">
          {coupons.length} codes
        </span>
      </summary>
      <ul className="mt-3 divide-y divide-ledger-line border-t border-ledger-line">
        {coupons.map((coupon) => (
          <li key={coupon.id}>
            <Link
              href={`/coupons/${coupon.slug}`}
              className="flex min-h-11 items-center justify-between gap-3 py-2.5 transition-colors hover:bg-paper-raised"
            >
              <span className="min-w-0 flex-1 truncate text-sm text-ink">
                {formatDiscount(coupon, currency)}
              </span>
              <span className="shrink-0 rounded-md border border-dashed border-ledger-line bg-paper-alt px-2 py-0.5 font-mono text-xs text-ink-soft">
                {maskCode(coupon.code) ?? "No code"}
              </span>
              <span className="shrink-0 text-xs font-semibold text-inkblue">View code →</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
