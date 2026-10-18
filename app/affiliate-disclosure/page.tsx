import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import PageTitle from "@/components/ui/PageTitle";

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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageTitle>Affiliate Disclosure</PageTitle>
      <p className="mt-3 text-sm text-ink-soft">Last updated: {LEGAL_LAST_UPDATED}</p>

      <div className="mt-10 grid gap-12 md:grid-cols-4">
        <aside className="hidden md:block">
          <nav className="sticky top-24 space-y-1">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink-soft">On this page</p>
            {[
              ["How Our Links Work", "how-our-links-work"],
              ["What It Costs You", "what-it-costs-you"],
              ["Sponsored Placements", "sponsored-placements"],
              ["How We Rank Offers", "how-we-rank-offers"],
              ["The Networks and Cookies", "the-networks-and-cookies"],
              ["Editorial Independence", "editorial-independence"],
              ["Questions", "questions"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="block rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-paper-raised hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="md:col-span-3 space-y-4 text-ink-soft">
          <div className="mb-10 rounded-xl border border-orange-100 bg-orange-50 p-6">
            <p className="mb-2 font-semibold text-ink">Key highlights</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
              <li>We may earn a commission when you use some links and buy from a store.</li>
              <li>Commissions come from the store, not from you — you pay the same price.</li>
              <li>Ranking blends verification, success rates, freshness, relevance and expected commission.</li>
              <li>Sponsored placements are always labelled clearly.</li>
            </ul>
          </div>

          <p>
            Durza is free to use, and this is how it stays that way: when you
            use some of our links and complete a purchase with a participating
            store, the store pays us a commission. This page explains exactly
            how that works.
          </p>
        <p>
          Durza is free to use, and this is how it stays that way: when you
          use some of our links and complete a purchase with a participating
          store, the store pays us a commission. This page explains exactly
          how that works.
        </p>

        <h2 id="how-our-links-work" className="pt-4 font-serif text-xl text-ink scroll-mt-24">
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

        <h2 id="what-it-costs-you" className="pt-4 font-serif text-xl text-ink scroll-mt-24">
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

        <h2 id="sponsored-placements" className="pt-4 font-serif text-xl text-ink scroll-mt-24">
          Sponsored Placements
        </h2>
        <p>
          Some placements on Durza may also be sponsored or promotional. When
          that applies, we identify them clearly so you always know what you
          are looking at.
        </p>

        <h2 id="how-we-rank-offers" className="pt-4 font-serif text-xl text-ink scroll-mt-24">
          How We Rank Offers
        </h2>
        <p>
          Offer order is a weighted blend of verification status, shopper success
          rates, freshness, relevance and expected commission earnings. Each
          offer&rsquo;s verification state is always shown on the page, whatever
          its rank, and a commission cannot keep a coupon visible once checks or
          shopper reports show it doesn&rsquo;t work.
        </p>

        <h2 id="the-networks-and-cookies" className="pt-4 font-serif text-xl text-ink scroll-mt-24">
          The Networks and Cookies
        </h2>
        <p>
          We work with affiliate networks and directly with some stores, in
          India and internationally. After you click through to a store, the
          store or its network may set cookies to attribute your purchase;
          those cookies and that data are governed by their policies, not
          ours.
        </p>

        <h2 id="editorial-independence" className="pt-4 font-serif text-xl text-ink scroll-mt-24">
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

        <h2 id="questions" className="pt-4 font-serif text-xl text-ink scroll-mt-24">Questions</h2>
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
      </div>
    </div>
  );
}
