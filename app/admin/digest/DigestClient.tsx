"use client";

import { useEffect, useState } from "react";
import type { CollectionEntry } from "@/data/collections";
import { fetchEvidenceQueue, type EvidenceRow } from "@/lib/api/admin";
import { buildDigestText } from "@/lib/share-text";

export default function DigestClient({ collections }: { collections: CollectionEntry[] }) {
  const [offers, setOffers] = useState<EvidenceRow[]>([]);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void fetchEvidenceQueue({ evidence_tier: "source_seen" })
      .then(setOffers)
      .catch(() => setOffers([]));
  }, []);

  const generate = () => {
    setDraft(
      buildDigestText(
        collections,
        offers.map((offer) => ({
          title: offer.title,
          source_url: offer.source_url,
          checked_on: offer.checked_on,
          evidence_tier: offer.evidence_tier,
        })),
      ),
    );
  };

  return (
    <section className="mt-6 rounded border p-4 text-sm">
      <h2 className="mb-2 font-semibold">Weekly digest draft (copy only)</h2>
      <p className="mb-3 text-slate-600">
        Built from published collections and offers with a source page and check date. Nothing is sent,
        scheduled or stored.
      </p>
      <button type="button" onClick={generate} className="rounded bg-slate-900 px-3 py-1.5 text-white">
        Generate draft
      </button>
      {draft && (
        <>
          <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded bg-slate-50 p-3 text-xs">{draft}</pre>
          <button
            type="button"
            className="mt-2 rounded border px-3 py-1.5"
            onClick={() => void navigator.clipboard.writeText(draft).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); })}
          >
            {copied ? "Copied" : "Copy draft"}
          </button>
        </>
      )}
    </section>
  );
}
