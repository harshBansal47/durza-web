"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";

export default function RankingExplain() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {copy.ranking.whyThisOrder}
      </button>
      {open && (
        <div role="dialog" aria-label={copy.ranking.whyThisOrder} className="absolute z-10 mt-2 w-72 rounded border bg-white p-3 text-sm">
          <p>{copy.ranking.body}</p>
          <a href="/affiliate-disclosure" className="underline">Affiliate disclosure</a>
        </div>
      )}
    </div>
  );
}
