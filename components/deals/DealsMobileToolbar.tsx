"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Filter } from "lucide-react";
import KeywordForm from "@/components/filters/KeywordForm";

/**
 * The phone tool row for the deals page: search and filters, pinned under the
 * site header. The header is already sticky, so this anchors below it via
 * --header-height (kept up to date by Header) instead of covering the brand
 * row with a second top-0 layer.
 *
 * The filter sheet is the same panel the desktop sidebar shows, in a native
 * modal dialog — the pattern FilterLayout uses, except this bar owns the
 * trigger on phones (FilterLayout renders none there).
 */
export default function DealsMobileToolbar({
  panel,
  activeFilterCount,
}: {
  panel: ReactNode;
  activeFilterCount: number;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <div className="sticky top-[var(--header-height,68px)] z-30 -mx-4 flex items-center gap-2 border-b border-ledger-line bg-white/90 px-4 py-2.5 backdrop-blur-md md:hidden">
        <Suspense fallback={<div className="h-10 min-w-0 flex-1 rounded-xl bg-paper-raised" />}>
          <KeywordForm size="bar" placeholder="Search today's deals…" label="Search today's deals" />
        </Suspense>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label="Filters"
          onClick={() => setOpen(true)}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ledger-line bg-paper-raised text-ink transition-colors hover:border-accent-soft hover:bg-accent-faint hover:text-accent"
        >
          <Filter aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          {activeFilterCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-medium text-white"
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Filters"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-ink/50 md:hidden"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="ml-auto flex h-full w-[min(22rem,90vw)] flex-col overflow-y-auto border-l border-ledger-line bg-warm-paper p-5 shadow-overlay">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-xl text-ink">Filters</h2>
            <button
              type="button"
              className="rounded-full p-2 text-ink hover:bg-ledger-line/50"
              aria-label="Close filters"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <Suspense fallback={<div className="h-64 bg-paper-raised" />}>{panel}</Suspense>
        </div>
      </dialog>
    </>
  );
}
