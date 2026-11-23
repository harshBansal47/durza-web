"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  fetchMonetisationQueue,
  markAcceptedUnmonetised,
  restoreTrackedUrl,
  setTrackedUrl,
  type MonetisationRow,
} from "@/lib/api/admin";

export default function MonetisationPage() {
  const [rows, setRows] = useState<MonetisationRow[]>([]);
  const [selected, setSelected] = useState<MonetisationRow | null>(null);
  const [url, setUrl] = useState("");
  const [reason, setReason] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setRows(await fetchMonetisationQueue());
    } catch (caught) {
      setNotice(caught instanceof Error ? caught.message : "Could not load the queue.");
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const act = async (message: string, action: () => Promise<unknown>) => {
    try {
      await action();
      setNotice(message);
      await load();
    } catch (caught) {
      setNotice(caught instanceof Error ? caught.message : "Action failed.");
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Monetisation coverage</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            Live offers ranked by clicks, labelled from existing routing data only. A human decides
            whether to paste a tracked URL or accept an offer as unmonetised.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      {notice && <p role="status" className="mb-3 rounded bg-slate-100 p-2 text-sm">{notice}</p>}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr><th className="p-2">Offer</th><th>Store</th><th>Clicks</th><th>Label</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={`border-t ${selected?.id === row.id ? "bg-slate-50" : ""}`}>
                  <td className="p-2"><button type="button" onClick={() => setSelected(row)} className="text-left underline">{row.title}</button></td>
                  <td>{row.store_slug ?? "—"}</td><td>{row.clicks}</td>
                  <td><span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{row.label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <section aria-label="Monetisation action" className="rounded border p-4 text-sm">
            <h2 className="mb-2 font-semibold">{selected.title}</h2>
            <p className="mb-2 break-all text-xs text-slate-600">{selected.destination_url}</p>
            <p className="mb-3 text-xs text-slate-500">{selected.rule}</p>
            <label className="mb-2 block">Tracked URL (https, allowlisted host)
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
            </label>
            <label className="mb-3 block">Reason
              <input value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
            </label>
            <button type="button" className="rounded bg-slate-900 px-3 py-1.5 text-white"
              onClick={() => void act("Tracked URL saved (reversible).", () => setTrackedUrl(selected.id, url, reason))}>
              Save tracked URL
            </button>
            <button type="button" className="ml-2 rounded border px-3 py-1.5"
              onClick={() => void act("Previous URL restored.", () => restoreTrackedUrl(selected.id))}>
              Restore
            </button>
            <div className="mt-4 border-t pt-3">
              <button type="button" className="rounded border px-3 py-1.5"
                onClick={() => void act("Decision recorded.", () => markAcceptedUnmonetised(selected.id, !selected.accepted_unmonetised))}>
                {selected.accepted_unmonetised ? "Remove acceptance" : "Accept as unmonetised"}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
