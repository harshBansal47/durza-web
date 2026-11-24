import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";

export const metadata: Metadata = {
  title: "How Durza researches",
  description:
    "The method behind Durza's comparisons, buying guides and reviews: what we check, what we publish, and what we will never claim.",
  alternates: { canonical: absoluteUrl("/methodology") },
};

const STEPS = [
  {
    title: "We start with the buyer's decision",
    body: "Every guide answers a specific question: which of these two is right for me, or which pick fits this budget. If a page cannot state that in one sentence, it is not published.",
  },
  {
    title: "We use published, checkable inputs",
    body: "Specifications come from manufacturer or seller pages, prices and offer terms from the live store listing, and owner feedback from verified reviews. The source is named on the page wherever we can name it.",
  },
  {
    title: "We show the comparison, not just the verdict",
    body: "Decisions are broken into factors with a winner for each one. Where we have measured or calculated a number, we show the number and what it is based on.",
  },
  {
    title: "We publish the date of every check",
    body: "Prices, offer terms and article facts carry the date they were checked. If we have not checked something recently, the page says so — it does not imply freshness it does not have.",
  },
  {
    title: "We name who is accountable",
    body: "Editorial pages carry a byline and a method. If a page says 'we tested', a person or team actually did the testing. We do not attribute work to an invented reviewer.",
  },
];

const RULES = [
  "No fabricated coupon codes or invented discounts.",
  "No countdown timers that reset when you refresh.",
  "No positive review written in exchange for payment or a free product.",
  "No 'checked today' label unless a check actually happened today.",
  "No commission-based ranking presented as an editorial winner.",
];

export default function MethodologyPage() {
  return (
    <div className="page-shell py-10 sm:py-14">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">
        Editorial standards
      </p>
      <h1 className="mt-2 font-serif text-4xl font-extrabold text-ink">How Durza researches</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Durza is built by technically minded people who prefer a checkable comparison to a
        confident-sounding claim. This page is the standard every guide, review and comparison on
        the site is held to.
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Research steps">
        {STEPS.map((step, index) => (
          <article key={step.title} className="info-card p-5">
            <p className="font-mono text-xs font-bold text-durza-deep">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 font-serif text-lg font-bold text-ink">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="section-panel mt-10 p-6" aria-labelledby="rules-heading">
        <h2 id="rules-heading" className="font-serif text-2xl font-bold text-ink">
          What we will not do
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-soft">
          {RULES.map((rule) => (
            <li key={rule} className="flex gap-2">
              <span aria-hidden="true" className="text-durza-deep">✕</span>
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <VerifiedResearchPanel kind="general" />
      </div>

      <section className="mt-10 max-w-2xl">
        <h2 className="font-serif text-2xl font-bold text-ink">Found something wrong?</h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Corrections are published on the page with a new &ldquo;Last updated&rdquo; date. Tell us
          what is wrong and which source shows the correct value.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-durza-deep">
          <Link href="/contact" className="hover:underline">Contact us →</Link>
          <Link href="/trust" className="hover:underline">Trust &amp; verification →</Link>
          <Link href="/affiliate-disclosure" className="hover:underline">Affiliate disclosure →</Link>
        </div>
      </section>
    </div>
  );
}
