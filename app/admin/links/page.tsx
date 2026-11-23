"use client";

import Link from "next/link";
import { useState } from "react";
import { buildCampaignUrl, CHANNELS, type Channel } from "@/lib/campaign-links";

export default function LinksPage() {
  const [target, setTarget] = useState("/");
  const [channel, setChannel] = useState<Channel>("instagram");
  const [campaign, setCampaign] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generate = () => {
    try {
      setResult(buildCampaignUrl({ path: target, channel, campaignSlug: campaign }));
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Invalid input");
      setResult("");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Campaign link builder</h1>
          <p className="mt-1 text-sm text-slate-600">Builds tagged URLs from strict lowercase slugs. No shortener, no posting.</p>
        </div>
        <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
      </div>
      {error && <p role="alert" className="mb-3 rounded bg-rose-50 p-2 text-sm text-rose-800">{error}</p>}
      <label className="mb-2 block text-sm">Target path
        <input value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
      </label>
      <label className="mb-2 block text-sm">Channel
        <select value={channel} onChange={(e) => setChannel(e.target.value as Channel)} className="mt-1 w-full rounded border px-2 py-1">
          {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label className="mb-3 block text-sm">Campaign slug (lowercase a-z, 0-9, hyphens)
        <input value={campaign} onChange={(e) => setCampaign(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
      </label>
      <button type="button" onClick={generate} className="rounded bg-slate-900 px-3 py-1.5 text-sm text-white">Build link</button>
      {result && (
        <section className="mt-4 rounded border p-3 text-sm">
          <p className="break-all font-mono text-xs">{result}</p>
          <button type="button" className="mt-2 rounded border px-3 py-1.5 text-xs" onClick={() => void navigator.clipboard.writeText(result)}>Copy link</button>
        </section>
      )}
    </main>
  );
}
