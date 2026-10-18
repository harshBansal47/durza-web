"use client";

import { Suspense, type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Two-column listing shell with a sticky wide-screen panel and an optional
 * native modal filter sheet on narrow screens.
 */
export default function FilterLayout({
  panel,
  children,
  summaryLabel = "Filters",
  mobileDrawer = false,
  mobileTrigger,
}: {
  panel: ReactNode;
  children: ReactNode;
  summaryLabel?: string;
  mobileDrawer?: boolean;
  /**
   * The narrow-screen trigger. Defaults to the existing behaviour
   * (`mobileDrawer` ? a modal sheet : a collapsed details panel); `"none"`
   * is for pages whose own toolbar owns the trigger, leaving only the
   * wide-screen sidebar.
   */
  mobileTrigger?: "drawer" | "details" | "none";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trigger = mobileTrigger ?? (mobileDrawer ? "drawer" : "details");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileOpen && !dialog.open) dialog.showModal();
    else if (!mobileOpen && dialog.open) dialog.close();
  }, [mobileOpen]);

  const layoutClass = mobileDrawer
    ? "lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10"
    : "lg:grid lg:grid-cols-[15rem_1fr] lg:gap-10";

  return (
    <div className={layoutClass}>
      <aside className="hidden lg:block">
        <div className={`sticky top-24 ${mobileDrawer ? "w-72" : ""}`}>
          <Suspense fallback={<div className="h-64 bg-paper-raised" />}>{panel}</Suspense>
        </div>
      </aside>
      <div className="min-w-0">
        {trigger === "drawer" ? (
          <>
            <button
              type="button"
              className="btn-outline mb-5 lg:hidden"
              aria-haspopup="dialog"
              onClick={() => setMobileOpen(true)}
            >
              {summaryLabel}
            </button>
            <dialog
              ref={dialogRef}
              aria-label={summaryLabel}
              className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-ink/50 lg:hidden"
              onClose={() => setMobileOpen(false)}
              onClick={(event) => {
                if (event.target === event.currentTarget) setMobileOpen(false);
              }}
            >
              <div className="ml-auto flex h-full w-[min(22rem,90vw)] flex-col overflow-y-auto border-l border-ledger-line bg-warm-paper p-5 shadow-overlay">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-xl text-ink">{summaryLabel}</h2>
                  <button
                    type="button"
                    className="rounded-full p-2 text-ink hover:bg-ledger-line/50"
                    aria-label="Close filters"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <Suspense fallback={<div className="h-64 bg-paper-raised" />}>{panel}</Suspense>
              </div>
            </dialog>
          </>
        ) : trigger === "details" ? (
          <details className="mb-6 border border-ledger-line bg-paper-raised p-4 lg:hidden">
            <summary className="btn-outline cursor-pointer list-none">{summaryLabel}</summary>
            <div className="mt-4">
              <Suspense fallback={null}>{panel}</Suspense>
            </div>
          </details>
        ) : null}
        {children}
      </div>
    </div>
  );
}
