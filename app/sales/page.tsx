import { notFound } from "next/navigation";
import { SALE_HUBS_ENABLED } from "@/lib/flags";
import { api } from "@/lib/api";

export const revalidate = 300;

export default async function SalesIndexPage() {
  if (!SALE_HUBS_ENABLED) notFound();
  const series = await api.listSales();
  return (
    <main>
      <h1>Sales</h1>
      {series.length === 0 ? (
        <p>No sales are running right now.</p>
      ) : (
        <ul>
          {series.map((s) => (
            <li key={s.slug}>
              <a href={`/sales/${s.slug}`}>{s.title}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
