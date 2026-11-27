import { notFound } from "next/navigation";
import { SALE_HUBS_ENABLED } from "@/lib/flags";
import { api } from "@/lib/api";
import OfferCard from "@/components/OfferCard";
import type { CouponPublic } from "@/lib/types";
import { lastCheckedLine, offerType, offerTypeLabel } from "@/lib/offer-presentation";

export const revalidate = 1800;


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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => (
          <OfferCard
            key={c.id}
            bookmarkId={c.id}
            code={c.code}
            badge={null}
            badgeTone={c.code ? "amber" : "emerald"}
            title={c.title}
            description={c.description}
            ctaHref={api.goUrl(c.id, "coupons")}
            ctaLabel={c.code ? "View code" : "View offer"}
            expiresAt={c.expires_at}
            typeLabelOverride={offerTypeLabel(offerType(c))}
            lastChecked={lastCheckedLine(c)}
            autoSuppressed={c.auto_suppressed}
          />
        ))}
      </div>
      )}
    </div>
  );
}
