export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading reviews</span>
      <div className="h-4 w-44 animate-pulse rounded bg-[#e9e4db]" />
      <div className="mt-4 h-10 w-72 max-w-full animate-pulse rounded bg-[#e9e4db]" />
      <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-[#f1ede6]" />
      <div className="mt-8 flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-[#e9e4db]" />
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-[#141413]/10 bg-white">
            <div className="aspect-[16/9] w-full animate-pulse bg-[#f1ede6]" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-[#e9e4db]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#f1ede6]" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-[#f1ede6]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
