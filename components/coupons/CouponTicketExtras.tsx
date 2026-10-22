"use client";

import { useState } from "react";
import Link from "next/link";
import type { CouponPublic } from "@/lib/types";
import { maskCode } from "@/lib/codes";

/**
 * The "+N more codes" expander for a ticket.
 *
 * Implemented as a controlled region rather than <details>/<summary>, so the
 * button can carry the explicit aria-expanded / aria-controls attributes the
 * accessibility audit checks for.
 */
export default function CouponTicketExtras({
  extra,
  id,
}: {
  extra: CouponPublic[];
  id: string;
}) {
  const [open, setOpen] = useState(false);
  if (extra.length === 0) return null;

  return (
    <div className="relative z-10 mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-6 items-center px-1 text-xs font-medium text-durza-deep underline-offset-2 hover:underline"
      >
        {open ? "Hide" : `+${extra.length} more ${extra.length === 1 ? "code" : "codes"}`}
      </button>
      <div id={id} hidden={!open} className="mt-2 divide-y divide-ledger-line border-t border-ledger-line">
        {extra.map((other) => (
          <Link
            key={other.id}
            href={`/coupons/${other.slug}`}
            className="flex min-h-11 items-center justify-between gap-3 py-2 transition-colors hover:text-accent"
          >
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{other.title}</span>
            <span className="shrink-0 rounded-md border border-dashed border-ledger-line bg-paper-alt px-2 py-0.5 font-mono text-xs text-ink-soft">
              {maskCode(other.code) ?? "No code"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
