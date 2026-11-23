"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Batch = { batch_id: string; rows: number };
type Result = { rows: number; errors: string[]; matched: string[]; unmatched: string[]; duplicates: string[]; written: number; batch_id: string | null };

export default function ConversionsPage() {
  const [network, setNetwork] = useState("admitad");
  const [csvText, setCsvText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/conversions/imports", { credentials: "include", cache: "no-store" });
    if (res.ok) setBatches(await res.json());
  }, []);
  useEffect(() => { void load(); }, [load]);

  const submit = async (dryRun: boolean) => {
    const res = await fetch("/api/admin/conversions/import", {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ network, csv_text: csvText, dry_run: dryRun, confirm: !dryRun }),
    });
    const body = await res.json();
    if (!res.ok) { setNotice(JSON.stringify(body.detail ?? body)); return; }
    setResult(body);
    setNotice(dryRun ? "Dry run only — nothing was written." : `Wrote ${body.written} rows.`);
    await load();
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Offline conversion import</h1>
          <p className="mt-1 text-sm text-slate-600">Paste a CSV exported from your own network dashboard. No network calls are made. Synthetic test data only in this workspace.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      {notice && <p role="status" className="mb-3 rounded bg-slate-100 p-2 text-sm">{notice}</p>}
      <label className="mb-2 block text-sm">Network
        <input value={network} onChange={(e) => setNetwork(e.target.value)} className="mt-1 w-48 rounded border px-2 py-1" />
      </label>
      <label className="mb-3 block text-sm">CSV text (map columns from your own export)
        <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} rows={8} className="mt-1 w-full rounded border p-2 font-mono text-xs" />
      </label>
      <div className="flex gap-2">
        <button type="button" className="rounded border px-3 py-1.5 text-sm" onClick={() => void submit(true)}>Dry run</button>
        <button type="button" className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white" onClick={() => void submit(false)}>Confirm import</button>
      </div>
      {result && (
        <pre className="mt-4 overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Import batches</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {batches.map((batch) => (
            <li key={batch.batch_id} className="flex items-center gap-3">
              <span className="font-mono text-xs">{batch.batch_id}</span> · {batch.rows} rows
              <button type="button" className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700"
                onClick={() => void fetch(`/api/admin/conversions/imports/${batch.batch_id}/void`, { method: "POST", credentials: "include" }).then(load)}>
                Void batch
              </button>
            </li>
          ))}
          {batches.length === 0 && <li className="text-slate-500">No manual import batches.</li>}
        </ul>
      </section>
    </main>
  );
}
