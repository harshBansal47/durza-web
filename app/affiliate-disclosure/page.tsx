import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Learn how Durza earns commissions and what that means for your shopping experience.",
  alternates: {
    canonical: absoluteUrl("/affiliate-disclosure"),
  },
  openGraph: {
    title: "Affiliate Disclosure",
    description:
      "Durza may earn a commission when you use certain links and complete a qualifying purchase.",
    url: absoluteUrl("/affiliate-disclosure"),
  },
};

const HIGHLIGHTS = [
  "We may earn a commission when you use some links and buy from a store.",
  "Commissions come from the store, not from you — you pay the same price.",
  "Ranking blends verification, success rates, freshness, relevance and expected commission.",
  "Sponsored placements are always labelled clearly.",
];

const TOC = [
  ["How Our Links Work", "how-our-links-work"],
  ["What It Costs You", "what-it-costs-you"],
  ["Sponsored Placements", "sponsored-placements"],
  ["How We Rank Offers", "how-we-rank-offers"],
  ["The Networks and Cookies", "the-networks-and-cookies"],
  ["Editorial Independence", "editorial-independence"],
  ["Questions", "questions"],
] as const;

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      eyebrow="Affiliate disclosure"
      title="Affiliate Disclosure"
      lede="Durza is free to use, and this is how it stays that way: when you use some of our links and complete a purchase with a participating store, the store pays us a commission. This page explains exactly how that works."
      updated={LEGAL_LAST_UPDATED}
      highlights={HIGHLIGHTS}
      toc={TOC.map(([label, id]) => ({ label, id }))}
      related={[
        { href: "/trust", label: "How Durza works" },
        { href: "/terms", label: "Terms of use" },
        { href: "/privacy", label: "Privacy policy" },
      ]}
    >
      <h2 id="how-our-links-work" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        How Our Links Work
      </h2>
      <p>
        Every outbound click goes through a redirect on our side, which records the click and adds a
        random reference to the link. If you then buy something, the store&rsquo;s affiliate network
        can match that reference to the purchase and credit the commission to Durza. The reference
        identifies the click, not you, and we never put your name, email, or IP address in it.
      </p>
      <p>
        Not every link earns us money. Some links go straight to the store, and we still track the
        click so we can tell which deals actually help shoppers.
      </p>

      <h2 id="what-it-costs-you" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        What It Costs You
      </h2>
      <p>
        <strong className="font-semibold text-ink">
          Nothing — this does not add to the price you pay.
        </strong>{" "}
        The store determines the price and terms of your purchase, and the commission comes from
        the store, not from you. You pay the same price as going there directly.
      </p>

      <h2 id="sponsored-placements" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Sponsored Placements
      </h2>
      <p>
        Some placements on Durza may also be sponsored or promotional. When that applies, we
        identify them clearly so you always know what you are looking at.
      </p>

      <h2 id="how-we-rank-offers" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        How We Rank Offers
      </h2>
      <p>
        Offer order is a weighted blend of verification status, shopper success rates, freshness,
        relevance and expected commission earnings. Each offer&rsquo;s verification state is always
        shown on the page, whatever its rank, and a commission cannot keep a coupon visible once
        checks or shopper reports show it doesn&rsquo;t work.
      </p>

      <h2 id="the-networks-and-cookies" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        The Networks and Cookies
      </h2>
      <p>
        We work with affiliate networks and directly with some stores, in India and internationally.
        After you click through to a store, the store or its network may set cookies to attribute
        your purchase; those cookies and that data are governed by their policies, not ours.
      </p>

      <h2 id="editorial-independence" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Editorial Independence
      </h2>
      <p>
        Affiliate relationships help support the operation and development of Durza. They do not buy
        placement in our editorial content, and we work to keep our listings accurate. If you spot a
        coupon that doesn&rsquo;t work, the fastest correction is the{" "}
        <em>&ldquo;didn&rsquo;t work&rdquo;</em> button on its page — it updates the success rate
        everyone sees.
      </p>

      <h2 id="questions" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Questions
      </h2>
      <p>
        If you have questions about how Durza makes money, write to{" "}
        <a href="mailto:hello@durza.in" className="text-inkblue underline underline-offset-2">
          hello@durza.in
        </a>
        . You can also read{" "}
        <Link href="/trust" className="text-inkblue underline underline-offset-2">
          how Durza works
        </Link>{" "}
        and our{" "}
        <Link href="/privacy" className="text-inkblue underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </LegalPage>
  );
}
