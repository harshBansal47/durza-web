import { Suspense, type ReactNode } from "react";

/**
 * Two-column listing shell: the filter panel sticks on the left on wide
 * screens, and the same panel collapses into a disclosure above the results on
 * narrow ones. The panel is rendered twice from one element so both placements
 * stay in sync — only one is ever visible.
 */
export default function FilterLayout({
  panel,
  children,
  summaryLabel = "Filters",
}: {
  panel: ReactNode;
  children: ReactNode;
  summaryLabel?: string;
}) {
  return (
    <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <Suspense fallback={<div className="h-64 bg-paper-raised" />}>{panel}</Suspense>
        </div>
      </aside>
      <div className="min-w-0">
        <details className="mb-6 border border-ledger-line bg-paper-raised p-4 lg:hidden">
          <summary className="btn-outline cursor-pointer list-none">{summaryLabel}</summary>
          <div className="mt-4">
            <Suspense fallback={null}>{panel}</Suspense>
          </div>
        </details>
        {children}
      </div>
    </div>
  );
}
