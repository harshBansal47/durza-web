"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAcquisitionReadiness, type AcquisitionReadiness } from "@/lib/api/admin";

export default function GoNoGoPage() {
  const [data, setData] = useState<AcquisitionReadiness | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void fetchAcquisitionReadiness().then(setData).catch((caught) =>
      setError(caught instanceof Error ? caught.message : "Could not compute readiness."),
    );
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Acquisition readiness</h1>
          <p className="mt-1 text-sm text-slate-600">Advisory go/no-go from live data. This page triggers nothing.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      {error && <p role="alert" className="mb-3 rounded bg-rose-50 p-2 text-sm text-rose-800">{error}</p>}
      {data && (
        <>
          <p className="mb-4 text-lg font-semibold">Overall: <span className={data.overall === "green" ? "text-emerald-700" : "text-rose-700"}>{data.overall}</span></p>
          <ul className="space-y-3">
            {data.gates.map((gate) => (
              <li key={gate.name} className="rounded border p-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="font-semibold">{gate.name}</span>
                  <span className={gate.status === "green" ? "text-emerald-700" : gate.status === "amber" ? "text-amber-700" : "text-rose-700"}>{gate.status}</span>
                </div>
                <p className="mt-1">Value: {gate.value}</p>
                <p className="text-slate-600">{gate.reason}</p>
                {gate.next_action ? <p className="mt-1 text-xs text-slate-500">Next: {gate.next_action}</p> : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">{data.note}</p>
        </>
      )}
    </main>
  );
}
