"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJobStatus, type JobStatusRow } from "@/lib/api/admin";

export default function JobsPage() {
  const [rows, setRows] = useState<JobStatusRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchJobStatus().then(setRows).catch((caught) =>
      setError(caught instanceof Error ? caught.message : "Could not load job status."),
    );
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Scheduled jobs</h1>
          <p className="mt-1 text-sm text-slate-600">Read-only status from the existing JobRun ledger. The scheduler is not enabled by this page.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      {error && <p role="alert" className="mb-3 rounded bg-rose-50 p-2 text-sm text-rose-800">{error}</p>}
      <div className="overflow-x-auto rounded border">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr><th className="p-2">Job</th><th>Enabled</th><th>Last run</th><th>Result</th><th>Next run</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.job} className="border-t">
                <td className="p-2">{row.job}</td>
                <td>{row.enabled ? "yes" : "no"}</td>
                <td>{row.last_run_at ? new Date(row.last_run_at).toLocaleString("en-IN") : "never"}</td>
                <td>{row.last_status ?? "no record"}</td>
                <td>{row.next_run_at ? new Date(row.next_run_at).toLocaleString("en-IN") : "not scheduled"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
