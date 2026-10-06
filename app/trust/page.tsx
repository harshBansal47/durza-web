import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Couponza Works",
  description:
    "Learn how Couponza helps you find coupons, deals, and offers from online stores.",
  alternates: {
    canonical: absoluteUrl("/trust"),
  },
  openGraph: {
    title: "How Couponza Works",
    description:
      "Find coupons and deals with Couponza. Here's how it works.",
    url: absoluteUrl("/trust"),
  },
};

/* ─────────────────────────────────────────────────────────────
   Icons
   ───────────────────────────────────────────────────────────── */

type IconProps = {
  className?: string;
};

const IconSearch = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <circle
      cx="11"
      cy="11"
      r="6.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m16 16 5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const IconTag = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M4 4.5h6.2L20 14.3 14.3 20 4.5 10.2V4.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="8.2" cy="8.2" r="1.2" fill="currentColor" />
  </svg>
);

const IconExternal = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M14 5h5v5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m19 5-8 8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M19 13.5V18a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18V6a1.5 1.5 0 0 1 1.5-1.5H10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const IconWallet = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <rect
      x="3.5"
      y="5"
      width="17"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M16 12h4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="16" cy="12" r="0.8" fill="currentColor" />
    <path
      d="M3.5 8h17"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const IconShield = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M12 2.5 5 5v6.2c0 4.5 3 8.4 7 9.8 4-1.4 7-5.3 7-9.8V5l-7-2.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="m8.5 12 2.3 2.3 4.7-4.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrow = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="m14 7 5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────────── */

const STEPS = [
  {
    number: "01",
    icon: IconSearch,
    title: "Find a store",
    description:
      "Search for a store you shop with or browse the deals available on Couponza.",
  },
  {
    number: "02",
    icon: IconTag,
    title: "Choose an offer",
    description:
      "Review the coupon or deal details and choose the offer that suits you.",
  },
  {
    number: "03",
    icon: IconExternal,
    title: "Visit the store",
    description:
      "Use the offer on the store's website and complete your purchase there.",
  },
  {
    number: "04",
    icon: IconWallet,
    title: "Save",
    description:
      "If the offer applies to your purchase, you get the savings offered by the store.",
  },
];

const FEATURES = [
  {
    title: "Useful offers",
    description:
      "We organize coupons and deals so you can spend less time searching for savings.",
  },
  {
    title: "Clear details",
    description:
      "Important offer information is presented before you leave Couponza for the store.",
  },
  {
    title: "Fresh listings",
    description:
      "We work to keep our listings useful and remove offers when we identify that they are no longer relevant.",
  },
  {
    title: "No extra cost",
    description:
      "When a store pays Couponza a commission on a qualifying purchase, that does not add to the price you pay.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */

export default function TrustPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] text-slate-900 antialiased">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a0a 1px, transparent 1px), linear-gradient(to bottom, #0f172a0a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 35%, transparent 100%)",
          }}
        />

        <div className="absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent)] blur-3xl" />

        <div className="absolute top-96 -left-40 h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.06),transparent)] blur-3xl" />

        <div className="absolute top-[700px] -right-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.06),transparent)] blur-3xl" />
      </div>

      <div className="relative">

        {/* ══════════════════════════════════════════════════════
             HERO
            ══════════════════════════════════════════════════════ */}

        <section className="px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              How Couponza works
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Find better deals,
              <span className="block text-emerald-600">
                without the hassle.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Couponza helps you discover coupons, deals, and offers from
              online stores so you can find potential savings before you shop.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/deals"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
              >
                Browse deals
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                See how it works
              </Link>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
             HOW IT WORKS
            ══════════════════════════════════════════════════════ */}

        <section
          id="how-it-works"
          className="scroll-mt-24 px-6 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">

            <div className="mb-10 max-w-2xl">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Simple by design
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Four simple steps
              </h2>

              <p className="mt-3 text-slate-600">
                Find an offer, check the details, and shop with the store.
                That&apos;s it.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-semibold tracking-wider text-slate-300">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
             WHAT YOU CAN EXPECT
            ══════════════════════════════════════════════════════ */}

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">

            <div className="mb-10 text-center">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                What you can expect
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Built around the shopper
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                We want finding a useful offer to be quick, clear, and
                straightforward.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:border-slate-300 hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.15)]"
                >
                  <div className="flex items-start gap-4">

                    <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <IconShield className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {feature.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>

                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
             HOW COUPONZA MAKES MONEY
            ══════════════════════════════════════════════════════ */}

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-10">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <IconWallet className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    A quick note
                  </div>

                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    How Couponza makes money
                  </h2>
                </div>

              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
                <p>
                  Couponza may earn a commission when you use certain links
                  and complete a qualifying purchase with a store.
                </p>

                <p>
                  <strong className="font-semibold text-slate-900">
                    This does not add to the price you pay.
                  </strong>{" "}
                  The store determines the price and terms of your purchase.
                </p>

                <p>
                  Some placements may also be sponsored or promotional. When
                  that applies, we identify them clearly.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
             SIMPLE TRUST MESSAGE
            ══════════════════════════════════════════════════════ */}

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-12">

              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)] blur-3xl"
              />

              <div className="relative">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <IconShield className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Keep it simple.
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-slate-600">
                  Search for a store, find an offer, check the details, and
                  shop. Couponza is here to make the search for savings easier.
                </p>

                <div className="mt-7">
                  <Link
                    href="/deals"
                    className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
                  >
                    Browse deals
                    <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
             FINAL CTA
            ══════════════════════════════════════════════════════ */}

        <section className="px-6 pb-24 pt-4">
          <div className="mx-auto max-w-2xl text-center">

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Ready to find a deal?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Search for your favorite store and see what&apos;s available.
            </p>

            <div className="mt-6">
              <Link
                href="/deals"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
              >
                Browse coupons & deals
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
