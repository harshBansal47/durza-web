import { notFound } from "next/navigation";
import { SALE_HUBS_ENABLED } from "@/lib/flags";
import { api } from "@/lib/api";

export const revalidate = 300;

export default async function SaleSeriesPage({ params }: { params: { series: string } }) {
  if (!SALE_HUBS_ENABLED) notFound();
  const data = await api.getSaleSeries(params.series);
  if (!data) notFound();
  return (
    <main>
      <h1>{data.title ?? data.series}</h1>
      <p>Current edition: {data.edition}</p>
    </main>
  );
}
