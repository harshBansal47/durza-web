import type { ReactNode } from "react";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Loading skeletons for routes that fetch from the API.
 *
 * Next shows a route's `loading.tsx` while its server component is waiting on data. Without
 * one, a route borrows the nearest parent's, which here is the homepage-shaped skeleton in
 * `app/loading.tsx`: a guide or a product would flash a big hero and category icons, then jump
 * to a different layout. Each skeleton below matches one *kind* of page (same container width,
 * same grid), so the page fills in where the placeholder was.
 *
 * They draw shapes only, never numbers or words that could be mistaken for real content. The
 * one string is a screen-reader label, because a screen reader cannot see a shimmer.
 */

function Busy({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  return (
    <div className={className} aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function Intro({ narrow = false }: { narrow?: boolean }) {
  return (
    <>
      <Skeleton className="mb-6 h-4 w-40" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className={`mt-3 h-10 w-full ${narrow ? "max-w-sm" : "max-w-md"}`} />
      <div className="mt-4 max-w-2xl space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </>
  );
}

function Card() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ledger-line bg-white">
      <Skeleton className="h-36 w-full !rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/5" />
      </div>
    </div>
  );
}

/** Index pages: a heading, then a grid of cards (guides, reviews, comparisons, collections, sales, bank offers). */
export function ListingSkeleton({ label = "Loading", cards = 6 }: { label?: string; cards?: number }) {
  return (
    <Busy label={label} className="page-shell">
      <Intro />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </Busy>
  );
}

/** The category index: a grid of small tiles rather than image cards. */
export function TileGridSkeleton({ label = "Loading categories", tiles = 12 }: { label?: string; tiles?: number }) {
  return (
    <Busy label={label} className="mx-auto max-w-6xl px-6 py-12">
      <Intro narrow />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: tiles }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-ledger-line bg-white p-4">
            <Skeleton className="h-10 w-10 shrink-0 !rounded-xl" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </Busy>
  );
}

/** A long read: guide, review, comparison. Same width as the real article. */
export function ArticleSkeleton({ label = "Loading article" }: { label?: string }) {
  return (
    <Busy label={label} className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Skeleton className="mb-6 h-4 w-48" />
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-10 w-full" />
      <Skeleton className="mt-2 h-10 w-3/5" />
      <div className="mt-5 max-w-3xl space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <Skeleton className="mt-8 h-56 w-full !rounded-2xl" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-3/4" : "w-full"}`} />
        ))}
      </div>
    </Busy>
  );
}

/** Search: title, the search box, then result rows. */
export function ResultsSkeleton({ label = "Loading results", rows = 6 }: { label?: string; rows?: number }) {
  return (
    <Busy label={label} className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-5 h-12 w-full max-w-xl !rounded-full" />
      <div className="mt-4 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 !rounded-full" />
        ))}
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-3 rounded-2xl border border-ledger-line bg-white p-4">
            <Skeleton className="h-16 w-16 shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-9 w-28 !rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Busy>
  );
}

/** One product: picture beside the facts, price history below. */
export function DetailSkeleton({ label = "Loading product" }: { label?: string }) {
  return (
    <Busy label={label} className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Skeleton className="mb-6 h-4 w-56" />
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full !rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-10 w-40" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-12 w-48 !rounded-full" />
        </div>
      </div>
      <Skeleton className="mt-10 h-64 w-full !rounded-2xl" />
    </Busy>
  );
}
