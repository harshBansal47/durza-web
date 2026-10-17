import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function ErrorState({ reset }: { reset?: () => void }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-ledger-line bg-white px-6 py-14 text-center">
      <span aria-hidden="true" className="bg-brand-warm mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white">
        <TriangleAlert className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <p className="mt-4 font-serif text-title font-medium text-ink">Something went wrong.</p>
      <p className="mt-2 text-sm text-ink-soft">This is on us, not you. Try again in a moment.</p>
      {reset ? (
        <button onClick={reset} className="btn btn-primary mt-5">
          Try again
        </button>
      ) : (
        <Link href="/" className="btn btn-primary mt-5">
          Back to deals
        </Link>
      )}
    </div>
  );
}
