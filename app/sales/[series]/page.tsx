import { notFound } from "next/navigation";
import { SALE_HUBS_ENABLED } from "@/lib/flags";
import { api } from "@/lib/api";
import { CouponCardGrid } from "@/components/CouponCard";
import type { CouponPublic } from "@/lib/types";

export const revalidate = 300;

/** "12 Mar 2026" — the shop's own format, not the browser's. */
function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function SaleSeriesPage({ params }: { params: { series: string } }) {
  if (!SALE_HUBS_ENABLED) notFound();
  const data = await api.getSaleSeries(params.series);
  if (!data) notFound();
  const coupons: CouponPublic[] = (data.coupons ?? []) as CouponPublic[];
  const start = formatDate(data.start_at);
  const end = formatDate(data.end_at);
  return (
    <main>
      <h1>{data.title ?? data.series}</h1>
      {data.description ? <p>{data.description}</p> : null}
      {start && end ? (
        <p>
          {start} – {end}
        </p>
      ) : (
        <p>Dates to be confirmed</p>
      )}
      <p>
        <a href={`/sales/${data.series}/${data.edition}`}>Current edition: {data.edition}</a>
      </p>
      {coupons.length === 0 ? (
        <p>The coupons for this sale are being prepared.</p>
      ) : (
        <CouponCardGrid coupons={coupons} pageType="coupon_card" />
      )}
    </main>
  );
}
