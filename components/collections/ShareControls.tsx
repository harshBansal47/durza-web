"use client";

import { useState } from "react";
import { buildShareText, shareUrl } from "@/lib/share-text";
import type { CollectionEntry } from "@/data/collections";

/** Copy-only share controls. Nothing is posted, sent or scheduled (Phase 2 T6). */
export default function ShareControls({ entry }: { entry: CollectionEntry }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section aria-label="Share this collection" className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        className="rounded-full border border-[#141413]/15 px-3 py-1.5 text-xs font-semibold"
        onClick={() => void copy("link", shareUrl(entry))}
      >
        {copied === "link" ? "Link copied" : "Copy link"}
      </button>
      <button
        type="button"
        className="rounded-full border border-[#141413]/15 px-3 py-1.5 text-xs font-semibold"
        onClick={() => void copy("text", buildShareText(entry))}
      >
        {copied === "text" ? "Text copied" : "Copy text for WhatsApp / Instagram"}
      </button>
    </section>
  );
}
