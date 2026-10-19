import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Durza is a deals platform where every coupon and offer shows the store page it was read from, the date it was last checked, and the commission we earn.",
};

const HIGHLIGHTS = [
  "Every offer shows the store page it was read from and when it was last checked.",
  "Shopper votes set the success rate — nothing is shown until someone reports.",
  "Every commission we earn is disclosed on the page.",
];

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About Durza"
      title="Evidence, not marketing"
      lede="Durza is a deals platform built on one idea: a discount should be evidence, not marketing. We are building toward a shopping assistant that answers what is the cheapest legitimate way to buy this with price history, sourced offers and honest math."
      highlights={HIGHLIGHTS}
      toc={[
        { id: "what-we-do", label: "What we do" },
        { id: "what-we-will-not-do", label: "What we will not do" },
        { id: "how-we-make-money", label: "How we make money" },
      ]}
      related={[
        { href: "/trust", label: "How Durza works" },
        { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
        { href: "/contact", label: "Contact us" },
      ]}
    >
      <h2 id="what-we-do" className="scroll-mt-24 pt-4 font-serif text-2xl font-extrabold text-ink">
        What we do
      </h2>
      <p>
        Every offer on Durza shows the store page it was read from and when we last checked it. We
        do not republish percentages we cannot trace to a source, and we do not show a success rate
        until a shopper has actually reported one. Sponsored placements are always labelled, and
        the commission we expect to earn is disclosed on the page.
      </p>
      <p>
        We are building toward a different kind of shopping assistant — one that can answer
        &ldquo;what&apos;s the cheapest legitimate way to buy this?&rdquo; with price history,
        sourced offers and honest math, instead of a wall of untested promotional percentages.
      </p>

      <h2
        id="what-we-will-not-do"
        className="scroll-mt-24 pt-4 font-serif text-2xl font-extrabold text-ink"
      >
        What we will not do
      </h2>
      <ul className="my-5 space-y-2 pl-6 text-base leading-7" style={{ listStyleType: "disc" }}>
        <li>We will not label a paid placement as editorial — sponsored content always says so.</li>
        <li>We will not hijack another creator&apos;s referral link.</li>
        <li>We will not show a success rate we don&apos;t have evidence for.</li>
        <li>We will not sell your personal data, and we do not process payments.</li>
      </ul>

      <h2
        id="how-we-make-money"
        className="scroll-mt-24 pt-4 font-serif text-2xl font-extrabold text-ink"
      >
        How we make money
      </h2>
      <p>
        Durza is free to use. When you use certain links and complete a purchase with a
        participating store, the store pays us a commission. That never adds to the price you pay.
        Read our{" "}
        <Link href="/affiliate-disclosure" className="text-inkblue underline underline-offset-2">
          affiliate disclosure
        </Link>{" "}
        for the full picture, including how we rank offers.
      </p>
    </LegalPage>
  );
}
