import { notFound } from "next/navigation";
import { SALE_HUBS_ENABLED } from "@/lib/flags";
import { api } from "@/lib/api";
import { CouponCardGrid } from "@/components/CouponCard";
import type { CouponPublic } from "@/lib/types";

export const revalidate = 300;


function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function SaleEditionPage({ params }: { params: Promise<{ series: string; edition: string }> }) {
  if (!SALE_HUBS_ENABLED) notFound();
  const { series, edition } = await params;
  const data = await api.getSaleEdition(series, edition);
  if (!data) notFound();
  const coupons: CouponPublic[] = (data.coupons ?? []) as CouponPublic[];
  const start = formatDate(data.start_at);
  const end = formatDate(data.end_at);
  return (
    <div>
      <h1>{data.title ?? series}</h1>
      <p>
        {series} {edition}
      </p>
      {start && end ? (
        <p>
          {start} – {end}
        </p>
      ) : (
        <p>Dates to be confirmed</p>
      )}
      {coupons.length === 0 ? (
        <p>The coupons for this sale are being prepared.</p>
      ) : (
        <CouponCardGrid coupons={coupons} pageType="coupon_card" />
      )}
    </div>
  );
}
