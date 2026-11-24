import { ExternalLink } from "lucide-react";
import { RESEARCH_CHECK_DATE, VERIFIED_LISTINGS } from "@/data/verified-research-2026-11-25";

/** Exact-code listings from one research date. No affiliate CTAs. */
export default function VerifiedListingsTable({
  store,
}: {
  store: keyof typeof VERIFIED_LISTINGS;
}) {
  const rows = VERIFIED_LISTINGS[store];
  if (!rows?.length) return null;

  return (
    <section aria-labelledby={`verified-listings-${store}`} className="my-8 overflow-hidden rounded-2xl border border-ledger-line bg-white">
      <div className="border-b border-ledger-line px-5 py-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-durza-deep">
          Exact-code listings · checked {RESEARCH_CHECK_DATE}
        </p>
        <h2 id={`verified-listings-${store}`} className="mt-1 font-serif text-xl font-bold text-ink">
          Verified price snapshots
        </h2>
        <p className="mt-1 text-xs leading-5 text-ink-soft">
          Listing displays on one date, not live quotes. Match the full model code and confirm the final payable on the store.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-paper-raised text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th scope="col" className="px-5 py-3">Model / variant</th>
              <th scope="col" className="px-5 py-3">Price</th>
              <th scope="col" className="px-5 py-3">MRP / reference</th>
              <th scope="col" className="px-5 py-3">Seller</th>
              <th scope="col" className="px-5 py-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.model}-${row.seller}`} className="border-t border-ledger-line align-top">
                <td className="px-5 py-3">
                  <span className="font-semibold text-ink">{row.model}</span>
                  <span className="mt-0.5 block text-xs text-ink-soft">{row.name}</span>
                  {row.note && <span className="mt-1 block text-xs text-ink-soft">{row.note}</span>}
                </td>
                <td className="px-5 py-3 font-semibold text-ink">{row.price}</td>
                <td className="px-5 py-3 text-ink-soft">{row.mrp}</td>
                <td className="px-5 py-3 text-ink-soft">{row.seller}</td>
                <td className="px-5 py-3">
                  <a href={row.source} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 font-semibold text-durza-deep hover:underline">
                    Open <ExternalLink aria-hidden="true" className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-ledger-line px-5 py-3 text-xs text-ink-soft">
        Durza did not buy or test these products. Figures are arithmetic on published figures where noted, not live quotes.
      </p>
    </section>
  );
}
