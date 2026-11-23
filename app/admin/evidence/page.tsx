"use client";

/** Phase 2 T3 — editor queue and schema-free evidence form. */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { STALE_AFTER_DAYS } from "@/lib/offer-presentation";
import {
  deactivateOffer,
  fetchEvidenceQueue,
  recordOfferEvidence,
  type EvidenceRow,
} from "@/lib/api/admin";

const SOURCE_KINDS = [
  "brand_site", "offers_page", "terms_page", "bank_page", "affiliate_feed", "manual",
];

function localNow(): string {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}

export default function EvidencePage() {
  const [rows, setRows] = useState<EvidenceRow[]>([]);
  const [store, setStore] = useState("");
  const [tier, setTier] = useState("");
  const [evidenceTier, setEvidenceTier] = useState("");
  const [selected, setSelected] = useState<EvidenceRow | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceKind, setSourceKind] = useState("brand_site");
  const [checkedOn, setCheckedOn] = useState(localNow);
  const [expiryClaim, setExpiryClaim] = useState("");
  const [expirySourceUrl, setExpirySourceUrl] = useState("");
  const [reason, setReason] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setRows(await fetchEvidenceQueue({ store_slug: store, tier, evidence_tier: evidenceTier }));
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load the editor queue.");
    }
  }, [store, tier, evidenceTier]);

  useEffect(() => { void load(); }, [load]);

  const choose = (row: EvidenceRow) => {
    setSelected(row);
    setSourceUrl(row.source_url ?? "");
    setSourceKind(row.source_kind ?? "brand_site");
    setCheckedOn(row.checked_on ? new Date(row.checked_on).toISOString().slice(0, 16) : localNow());
    setExpiryClaim(row.expiry_claim ?? "");
    setExpirySourceUrl(row.expiry_source_url ?? "");
    setNotice(null);
  };

  const save = async () => {
    if (!selected) return;
    try {
      await recordOfferEvidence(selected.id, {
        source_url: sourceUrl,
        source_kind: sourceKind,
        checked_on: new Date(checkedOn).toISOString(),
        expiry_claim: expiryClaim || null,
        expiry_source_url: expirySourceUrl || null,
      });
      setNotice("Evidence saved. The offer now shows a source-seen evidence line.");
      await load();
    } catch (caught) {
      setNotice(caught instanceof Error ? caught.message : "Could not save evidence.");
    }
  };

  const deactivate = async () => {
    if (!selected || !reason.trim()) return;
    try {
      await deactivateOffer(selected.id, reason);
      setNotice("Offer deactivated (reversible). Reason recorded.");
      setReason("");
      await load();
    } catch (caught) {
      setNotice(caught instanceof Error ? caught.message : "Could not deactivate the offer.");
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Offer evidence queue</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            Ranked by store tier, missing source date, expiry and clicks. Evidence is typed by you;
            it never marks a code as checkout-tested.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <input value={store} onChange={(e) => setStore(e.target.value)} placeholder="Store slug" className="rounded border px-2 py-1" />
        <select value={tier} onChange={(e) => setTier(e.target.value)} className="rounded border px-2 py-1">
          <option value="">All tiers</option><option value="A">Tier A</option><option value="B">Tier B</option><option value="C">Tier C</option>
        </select>
        <select value={evidenceTier} onChange={(e) => setEvidenceTier(e.target.value)} className="rounded border px-2 py-1">
          <option value="">All evidence</option><option value="unknown">No source date</option><option value="source_seen">Source seen</option><option value="feed_reported">Feed reported</option><option value="checkout_tested">Checkout tested</option>
        </select>
        <button type="button" onClick={() => void load()} className="rounded border px-3 py-1">Refresh</button>
      </div>

      {error && <p role="alert" className="mb-3 rounded bg-rose-50 p-2 text-sm text-rose-800">{error}</p>}
      {notice && <p role="status" className="mb-3 rounded bg-slate-100 p-2 text-sm">{notice}</p>}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr><th className="p-2">Offer</th><th>Store</th><th> clicks</th><th>Evidence</th><th>Source seen</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={`border-t ${selected?.id === row.id ? "bg-slate-50" : ""}`}>
                  <td className="p-2">
                    <button type="button" onClick={() => choose(row)} className="text-left underline">{row.title}</button>
                  </td>
                  <td>{row.store_slug ?? "—"} · {row.store_tier}</td>
                  <td>{row.clicks}</td>
                  <td>{row.evidence_tier}</td>
                  <td>{row.checked_on ? new Date(row.checked_on).toLocaleDateString("en-IN") : "No source date"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="p-5 text-center text-sm text-slate-500">No offers match these filters.</p>}
        </div>

        {selected && (
          <section aria-label="Evidence form" className="rounded border p-4 text-sm">
            <h2 className="mb-2 font-semibold">{selected.title}</h2>
            {selected.checked_on && Date.now() - new Date(selected.checked_on).getTime() > STALE_AFTER_DAYS * 86_400_000 ? (
              <p className="mb-2 rounded bg-amber-50 px-2 py-1 text-xs text-amber-800">Older check — consider re-checking the source.</p>
            ) : null}
            <label className="mb-2 block">Source URL
              <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
            </label>
            <label className="mb-2 block">Source kind
              <select value={sourceKind} onChange={(e) => setSourceKind(e.target.value)} className="mt-1 w-full rounded border px-2 py-1">
                {SOURCE_KINDS.map((kind) => <option key={kind} value={kind}>{kind}</option>)}
              </select>
            </label>
            <label className="mb-2 block">Checked on
              <input type="datetime-local" value={checkedOn} onChange={(e) => setCheckedOn(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
            </label>
            <label className="mb-2 block">Expiry claim (optional)
              <input value={expiryClaim} onChange={(e) => setExpiryClaim(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
            </label>
            <label className="mb-3 block">Expiry source URL (optional)
              <input value={expirySourceUrl} onChange={(e) => setExpirySourceUrl(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
            </label>
            <button type="button" onClick={() => void save()} className="rounded bg-slate-900 px-3 py-1.5 text-white">Save evidence</button>
            <div className="mt-4 border-t pt-3">
              <label className="mb-2 block">Deactivate reason
                <input value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
              </label>
              <button type="button" onClick={() => void deactivate()} className="rounded border border-rose-300 px-3 py-1.5 text-rose-700">Deactivate offer</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
