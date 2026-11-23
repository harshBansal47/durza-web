import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Durza is a shopping discovery platform where offers state their type, show a last-checked date when known, and disclose commissions.",
  alternates: { canonical: "https://durza.in/about" },
};

const HIGHLIGHTS = [
  "Offers state their type and show a last-checked date when known.",
  "Success rates are based on shopper reports — we don’t show one until there’s feedback.",
  "Commissions are disclosed clearly on the page.",
];

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About Durza"
      title="Clear, honest savings"
      lede="Durza helps you find store offers with context you can trust: their type, last-checked dates when known, and how they’re performing based on real reports."
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
        Offers on Durza state their type and show a last-checked date when known. We
        do not show a success rate
        until a shopper has actually reported one. Sponsored placements are always labelled, and
        the commission we expect to earn is disclosed on the page.
      </p>
      <p>
        We are building toward a different kind of shopping assistant — one that can answer
        &ldquo;what&apos;s the cheapest legitimate way to buy this?&rdquo; with clearly
        labelled offers and honest math, instead of a wall of untested promotional percentages.
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
      <p>
        Durza is edited and maintained in India with a focus on clear sourcing and reader-first guidance.
        If you have a question or need help, contact us at{" "}
        <a href="mailto:hello@durza.in" className="text-inkblue underline underline-offset-2">
          hello@durza.in
        </a>.
      </p>
    </LegalPage>
  );
}
