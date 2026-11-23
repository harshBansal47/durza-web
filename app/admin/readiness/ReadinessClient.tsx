"use client";

import { useEffect, useState } from "react";
import type { CollectionEntry } from "@/data/collections";
import { fetchEvidenceQueue, type EvidenceRow } from "@/lib/api/admin";
import { collectionReadiness, publishableOffers } from "@/lib/readiness";

export default function ReadinessClient({ collections }: { collections: CollectionEntry[] }) {
  const [offers, setOffers] = useState<EvidenceRow[]>([]);
  useEffect(() => { void fetchEvidenceQueue({ limit: 200 }).then(setOffers).catch(() => setOffers([])); }, []);
  const rows = collections.map(collectionReadiness);
  const publishable = publishableOffers(offers);

  return (
    <div className="space-y-6 text-sm">
      <section>
        <h2 className="mb-2 text-lg font-semibold">Collections</h2>
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-2">Collection</th><th>Items</th><th>Source-seen</th><th>Gate</th><th>Reasons</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug} className="border-t">
                  <td className="p-2">{row.title}</td><td>{row.items}</td><td>{row.sourcedItems}</td>
                  <td>{row.gate ? "pass" : "fail"}</td>
                  <td className="text-xs text-rose-700">{row.reasons.join("; ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold">Publishable offers (live, source-seen or better)</h2>
        <p className="mb-2">Total: {publishable.total}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div><h3 className="font-medium">By store</h3><ul>{publishable.byStore.map(([slug, count]) => <li key={slug}>{slug}: {count}</li>)}</ul></div>
          <div><h3 className="font-medium">By tier</h3><ul>{publishable.byTier.map(([tier, count]) => <li key={tier}>{tier}: {count}</li>)}</ul></div>
        </div>
      </section>
    </div>
  );
}
