import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Durza is a deals platform where every coupon and offer shows the store page it was read from, the date it was last checked, and the commission we earn.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl font-extrabold text-ink sm:text-5xl">About Durza</h1>
      <div className="prose-durza mt-6 space-y-4 text-ink-soft">
        <p>
          Durza is a deals platform built on one idea: a discount should be <em>evidence</em>, not
          marketing. Every offer shows the store page it was read from and when we last checked it.
          Shopper votes set the success rate once they arrive — and we show nothing until they do.
          Every commission we earn is disclosed right on the page.
        </p>
        <p>
          We&apos;re building toward a different kind of shopping assistant — one that can answer
          &quot;what&apos;s the cheapest legitimate way to buy this?&quot; with price history, sourced
          offers and honest math, instead of a wall of untested promotional percentages.
        </p>
        <h2 className="pt-4 font-serif text-xl text-ink">What we will not do</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>We will not label a paid placement as editorial — sponsored content always says so.</li>
          <li>We will not hijack another creator&apos;s referral link.</li>
          <li>We will not show a success rate we don&apos;t have evidence for.</li>
        </ul>
      </div>
    </article>
  );
}
