import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck2, Fingerprint, Store } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trust & Verification | Durza",
  description:
    "How Durza presents offers: offer types, last-checked dates when known, shopper votes, and checkout-tested codes.",
  alternates: {
    canonical: absoluteUrl("/trust"),
  },
  openGraph: {
    title: "Trust & Verification | Durza",
    description:
      "Offers on Durza state their type, show a last-checked date when known, and disclose commissions.",
    url: absoluteUrl("/trust"),
  },
};

const PROCESS = [
  {
    icon: BadgeCheck,
    title: "Offer Types, Clearly Labelled",
    description:
      "Every offer states its type — coupon code, deal with no code listed, or another clearly labelled offer type.",
  },
  {
    icon: CalendarCheck2,
    title: "Last-Checked Dates When Known",
    description:
      "A last-checked date appears only when one exists. Offers without one show no placeholder.",
  },
  {
    icon: Fingerprint,
    title: "Salted-Hash Shopper Votes",
    description:
      "Worked / Didn't Work votes are limited to 1 per visitor per day using a salted IP hash—no fake percentages before real votes arrive.",
  },
  {
    icon: Store,
    title: "Direct Store Checkout",
    description:
      "You always pay the merchant directly on their official website. Durza never marks up prices or processes payments.",
  },
];

export default function TrustPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#141413]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <section className="max-w-3xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">
            How Durza Checks Offers
          </p>
          <h1 className="mt-3 font-serif text-4xl font-extrabold leading-tight tracking-tight text-[#141413] sm:text-5xl">
            How Durza checks offers.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#3f3b35]">
            Offers on Durza state their type, show a last-checked date when known, and disclose commissions.
          </p>
          <div className="mt-7">
            <Link
              href="/deals"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#141413] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2a2a27]"
            >
              Browse current deals <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section aria-labelledby="trust-process" className="mt-12">
          <h2 id="trust-process" className="sr-only">
            How offers are labelled
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROCESS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#141413] text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#141413]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#3f3b35] sm:text-base">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="votes-sources" className="mt-10 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">
            How votes &amp; sources work
          </p>
          <h2 id="votes-sources" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
            Clear signals, no made-up numbers
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#3f3b35] sm:text-base">
            <p>
              Each offer can be marked <strong className="font-medium text-[#141413]">worked</strong> or{" "}
              <strong className="font-medium text-[#141413]">didn&apos;t work</strong>. The success rate is calculated as{" "}
              <strong className="font-medium text-[#141413]">worked / total votes</strong>. Until real votes exist, we show{" "}
              <strong className="font-medium text-[#141413]">&ldquo;No votes yet&rdquo;</strong> instead of a percentage.
            </p>
            <p>
              Votes are limited to one per visitor per offer per day using a salted IP hash to reduce spam without storing raw identities.
              Offers come from store and affiliate-network data, state their type, and show a last-checked date when known.
            </p>
            <p>
              Expired offers are retired from listings and are not recycled. A retired code only reappears if the store republishes it.
            </p>
          </div>
        </section>

        <nav className="mt-12" aria-label="Keep reading">
          <h2 className="font-serif text-xl font-bold text-[#141413]">Keep reading</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li>
              <Link href="/guides/how-durza-verifies-offers-methodology-2026" className="inline-flex min-h-11 items-center rounded-full border border-[#141413]/15 bg-white px-4 text-sm font-semibold text-[#141413] transition-colors hover:border-[#141413]/40">
                Crawl, restore &amp; audit methodology (2026)
              </Link>
            </li>
            <li>
              <Link href="/affiliate-disclosure" className="inline-flex min-h-11 items-center rounded-full border border-[#141413]/15 bg-white px-4 text-sm font-semibold text-[#141413] transition-colors hover:border-[#141413]/40">
                Affiliate disclosure
              </Link>
            </li>
            <li>
              <Link href="/about" className="inline-flex min-h-11 items-center rounded-full border border-[#141413]/15 bg-white px-4 text-sm font-semibold text-[#141413] transition-colors hover:border-[#141413]/40">
                About Durza
              </Link>
            </li>
            <li>
              <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full border border-[#141413]/15 bg-white px-4 text-sm font-semibold text-[#141413] transition-colors hover:border-[#141413]/40">
                Contact &amp; report a broken code
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
