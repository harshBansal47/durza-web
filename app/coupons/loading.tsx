
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 h-10 w-40 animate-pulse rounded-lg bg-paper-alt" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-ledger-line bg-paper-raised p-4">
            <div className="h-6 w-24 animate-pulse rounded bg-paper-alt" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-paper-alt" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-paper-alt" />
            <div className="mt-4 h-9 w-full animate-pulse rounded-full bg-paper-alt" />
          </div>
        ))}
      </div>
    </div>
  );
}
