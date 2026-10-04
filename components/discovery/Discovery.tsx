import SectionTitle from "@/components/SectionTitle";
import DealsCarousel from "@/components/home/DealsCarousel";
import type { CouponCardStore } from "@/components/CouponCard";
import type { CouponPublic } from "@/lib/types";
import { daysUntil } from "@/lib/format";

/**
 * Reusable data-driven discovery modules (§35). Each takes real catalogue
 * rows and renders nothing when the data cannot back the claim — no
 * "Trending" label on unranked stock, ever.
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
  const rows = [...coupons]
    .filter((c) => c.last_verified_at !== null)
    .sort((a, b) => Date.parse(b.last_verified_at!) - Date.parse(a.last_verified_at!))
    .slice(0, 8);
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
  const rows = [...coupons]
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .slice(0, 8);
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
    .sort((a, b) => (daysUntil(a.expires_at) ?? 99) - (daysUntil(b.expires_at) ?? 99))
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
