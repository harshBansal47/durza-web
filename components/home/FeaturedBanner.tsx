import Link from "next/link";

/**
 * Full-width dark intermission between card rows. The number comes from the
 * biggest percentage offer the backend returns — it is the maximum of a real
 * list, never a marketing ceiling.
 */
export default function FeaturedBanner({ percent }: { percent: number }) {
  return (
    <section
      aria-labelledby="featured-banner-heading"
      className="dark-surface relative my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-12 select-none font-sans text-[180px] font-extrabold leading-none tracking-tighter text-white/[0.05] sm:text-[220px] md:-top-24 md:text-[300px]"
      >
        {percent}%
      </span>
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative max-w-2xl p-8 md:p-12">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-soft">
          Biggest % off right now
        </p>
        <h2
          id="featured-banner-heading"
          className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl"
        >
          Up to {percent}% off, straight from the stores.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
          The steepest cuts we are tracking today. Each one links to the store page it was read
          from, with the date we last checked it.
        </p>
        <Link href="/coupons?sort=biggest_discount" className="btn-cta mt-7 rounded-xl px-6 py-3 font-semibold text-white">
          See the biggest discounts
        </Link>
      </div>
    </section>
  );
}
