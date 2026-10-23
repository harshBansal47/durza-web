import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading account</span>

      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ledger-line pb-6">
        <div className="flex min-w-0 items-center gap-4">
          <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-4 w-48 max-w-full" />
          </div>
        </div>
        <Skeleton className="h-5 w-16" />
      </header>

      <nav
        aria-hidden="true"
        className="-mb-px overflow-x-auto border-b border-ledger-line scrollbar-hide"
      >
        <ul className="flex min-w-max">
          {["w-16", "w-12", "w-14", "w-12", "w-20", "w-14"].map((width, index) => (
            <li key={index} className="px-4 py-3">
              <Skeleton className={`h-4 ${width}`} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-5 pt-8">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-24 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}
