import { notFound } from "next/navigation";
import { SALE_HUBS_ENABLED } from "@/lib/flags";
import { api } from "@/lib/api";

export const revalidate = 300;

export default async function SaleEditionPage({ params }: { params: { series: string; edition: string } }) {
  if (!SALE_HUBS_ENABLED) notFound();
  const data = await api.getSaleEdition(params.series, params.edition);
  if (!data) notFound();
  return (
    <main>
      <h1>{params.series} {params.edition}</h1>
      <p>{data.lifecycle_status}</p>
      {!data.dates_confirmed && <p>Dates to be confirmed</p>}
    </main>
  );
}
