import { ArrowUpRight } from "lucide-react";

interface Props {
  storeName: string;
  href: string;
  description?: string;
}

/** Shown on showcase/offer-hub pages when no provider offers are listed — routes users to the official store without claiming discounts. */
export default function ExploreStoreCta({ storeName, href, description }: Props) {
  return (
    <section
      aria-labelledby="explore-official-store"
      className="rounded-2xl border border-ledger-line bg-white px-5 py-8 text-center sm:px-8"
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
        Official store
      </p>
      <h2 id="explore-official-store" className="mt-2 font-serif text-xl font-extrabold text-ink sm:text-2xl">
        Explore {storeName} on the official store
      </h2>
      <p className="mx-auto mt-2 max-w-prose text-sm text-ink-soft">
        {description ??
          `Browse the full ${storeName} range and check live availability, current pricing and any offers running right now directly on the official store.`}
      </p>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="btn btn-cta mt-5 inline-flex items-center gap-2"
      >
        Shop {storeName} official store
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </section>
  );
}
