import SectionTitle from "@/components/SectionTitle";
import DealsCarousel from "@/components/home/DealsCarousel";
import type { CouponCardStore } from "@/components/CouponCard";
import type { CouponPublic } from "@/lib/types";
import { daysUntil } from "@/lib/format";

/**
 * Reusable data-driven discovery modules (§35). Each renders the rows it is
 * given IN THE ORDER GIVEN: ordering is the backend's job (`sort=` on the
 * coupon list), so these never re-rank. They only refuse to render a claim the
 * rows cannot back (no "Freshly checked" without a verification time, no
 * "Ending soon" on a coupon that does not expire) — never an empty "Trending".
 */

function storesFor(coupons: CouponPublic[], stores: CouponCardStore[]): CouponCardStore[] {
  const ids = new Set(coupons.map((c) => c.store_id));
  return stores.filter((s) => ids.has(s.id));
}

export function RecentlyVerifiedRow({
  coupons,
  stores,
}: {
  coupons: CouponPublic[];
  stores: CouponCardStore[];
}) {
  const rows = coupons.filter((c) => c.last_verified_at !== null).slice(0, 8);
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby="freshly-checked">
      <SectionTitle hint="checked by shoppers">
        <span id="freshly-checked">Freshly checked</span>
      </SectionTitle>
      <DealsCarousel coupons={rows} stores={storesFor(rows, stores)} label="Recently verified deals" />
    </section>
  );
}

export function NewDealsRow({
  coupons,
  stores,
}: {
  coupons: CouponPublic[];
  stores: CouponCardStore[];
}) {
  const rows = coupons.slice(0, 8);
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby="new-deals">
      <SectionTitle hint="just listed">
        <span id="new-deals">New deals</span>
      </SectionTitle>
      <DealsCarousel coupons={rows} stores={storesFor(rows, stores)} label="New deals" />
    </section>
  );
}

export function ExpiringRow({
  coupons,
  stores,
}: {
  coupons: CouponPublic[];
  stores: CouponCardStore[];
}) {
  const rows = coupons
    .filter((c) => {
      const d = daysUntil(c.expires_at);
      return d !== null && d >= 0 && d <= 7;
    })
    .slice(0, 8);
  if (rows.length === 0) return null;
  return (
    <section aria-labelledby="ending-soon">
      <SectionTitle hint="real expiry dates only">
        <span id="ending-soon">Ending soon</span>
      </SectionTitle>
      <DealsCarousel coupons={rows} stores={storesFor(rows, stores)} label="Deals ending soon" />
    </section>
  );
}
