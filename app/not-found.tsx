import Link from "next/link";
import PageTitle from "@/components/ui/PageTitle";
import PopularChips from "@/components/PopularChips";
import { resilient } from "@/lib/api";

/** Give a lookup two seconds, then carry on without it: a 404 must never itself be slow. */
function soon<T>(promise: Promise<T>): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000)),
  ]).catch(() => null);
}

export default async function NotFound() {
  const [stores, categories] = await Promise.all([
    soon(resilient.listStores({ limit: 100 })),
    soon(resilient.listCategories({ limit: 100 })),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p
        aria-hidden="true"
        className="text-gradient animate-float font-serif text-[8rem] font-extrabold leading-none sm:text-[10rem]"
      >
        404
      </p>
      <PageTitle className="mt-2">That page doesn&apos;t exist</PageTitle>
      <p className="mt-3 text-ink-soft">
        The deal, store, or category you&apos;re looking for isn&apos;t here — it may have expired
        or moved.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary px-6 py-3">
          Back to deals
        </Link>
        <Link href="/search" className="btn btn-outline px-6 py-3">
          Search instead
        </Link>
      </div>
      {/* A dead end is the moment to offer the way back in, not just "Home". */}
      <PopularChips stores={stores?.items ?? []} categories={categories?.items ?? []} />
    </div>
  );
}
