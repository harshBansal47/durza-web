import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

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

export default function AffiliateDisclosurePage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl font-extrabold text-ink sm:text-5xl">
        Affiliate Disclosure
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        Last updated: {LEGAL_LAST_UPDATED}
      </p>
      <div className="mt-6 space-y-4 text-ink-soft">
        <p>
          Durza is free to use, and this is how it stays that way: when you
          use some of our links and complete a purchase with a participating
          store, the store pays us a commission. This page explains exactly
          how that works.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          How Our Links Work
        </h2>
        <p>
          Every outbound click goes through a redirect on our side, which
          records the click and adds a random reference to the link. If you
          then buy something, the store&rsquo;s affiliate network can match
          that reference to the purchase and credit the commission to Durza.
          The reference identifies the click, not you, and we never put your
          name, email, or IP address in it.
        </p>
        <p>
          Not every link earns us money. Some links go straight to the store,
          and we still track the click so we can tell which deals actually
          help shoppers.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          What It Costs You
        </h2>
        <p>
          <strong className="font-semibold text-ink">
            Nothing — this does not add to the price you pay.
          </strong>{" "}
          The store determines the price and terms of your purchase, and the
          commission comes from the store, not from you. You pay the same
          price as going there directly.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Sponsored Placements
        </h2>
        <p>
          Some placements on Durza may also be sponsored or promotional. When
          that applies, we identify them clearly so you always know what you
          are looking at.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          How We Rank Offers
        </h2>
        <p>
          Verification evidence, shopper success rates, freshness, and
          relevance are the signals that order our listings. Affiliate
          commissions may be one factor among several — they never override
          verification, and a commission cannot keep a coupon visible once
          shopper reports show it doesn&rsquo;t work.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          The Networks and Cookies
        </h2>
        <p>
          We work with affiliate networks and directly with some stores, in
          India and internationally. After you click through to a store, the
          store or its network may set cookies to attribute your purchase;
          those cookies and that data are governed by their policies, not
          ours.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Editorial Independence
        </h2>
        <p>
          Affiliate relationships help support the operation and development
          of Durza. They do not buy placement in our editorial content, and we
          work to keep our listings accurate. If you spot a coupon that
          doesn&rsquo;t work, the fastest correction is the{" "}
          <em>&ldquo;didn&rsquo;t work&rdquo;</em> button on its page — it
          updates the success rate everyone sees.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Questions</h2>
        <p>
          If you have questions about how Durza makes money, write to{" "}
          <a
            href="mailto:hello@durza.in"
            className="text-inkblue underline underline-offset-2"
          >
            hello@durza.in
          </a>
          .
        </p>
      </div>
    </article>
  );
}
