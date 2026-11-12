/**
 * Skeleton placeholder for the stream-rendered deals feed. Mirrors the layout
 * of the loaded section — toolbar row, pills, deal grid and price-drops — so
 * first paint on a cold render lands almost immediately.
 */
export default function DealsFeedSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-6">
      {/* Mobile toolbar row */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-9 w-36 animate-pulse rounded-xl bg-paper-alt" />
        <div className="h-9 w-28 animate-pulse rounded-xl bg-paper-alt" />
      </div>
      {/* Category pills */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-24 shrink-0 animate-pulse rounded-full bg-paper-alt" />
        ))}
      </div>
      {/* Desktop heading row */}
      <div className="flex items-end justify-between border-b border-ledger-line pb-4">
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded bg-paper-alt" />
          <div className="h-4 w-40 animate-pulse rounded bg-paper-alt" />
        </div>
        <div className="h-8 w-32 animate-pulse rounded-xl bg-paper-alt" />
      </div>
      {/* Deal grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-2xl border border-ledger-line bg-paper-alt" />
        ))}
      </div>
    </div>
  );
}
