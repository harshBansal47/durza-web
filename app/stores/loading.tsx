
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 h-10 w-32 animate-pulse rounded-lg bg-paper-alt" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-ledger-line bg-paper-raised p-4">
            <div className="h-5 w-20 animate-pulse rounded bg-paper-alt" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-paper-alt" />
          </div>
        ))}
      </div>
    </div>
  );
}
