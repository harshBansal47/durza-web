import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Learn how BachatBase earns commissions and what that means for your shopping experience.",
  alternates: {
    canonical: absoluteUrl("/affiliate-disclosure"),
  },
  openGraph: {
    title: "Affiliate Disclosure",
    description:
      "BachatBase may earn a commission when you use certain links and complete a qualifying purchase.",
    url: absoluteUrl("/affiliate-disclosure"),
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl text-ink">Affiliate Disclosure</h1>
      <div className="mt-6 space-y-4 text-ink-soft">
        <p>
          BachatBase may earn a commission when you use certain links on our
          site and complete a qualifying purchase with a participating store.
        </p>
        <p>
          <strong className="font-semibold text-ink">
            This does not add to the price you pay.
          </strong>{" "}
          The store determines the price and terms of your purchase. The
          commission comes from the store, not from you.
        </p>
        <p>
          Some placements on BachatBase may also be sponsored or promotional.
          When that applies, we identify them clearly so you always know what
          you are looking at.
        </p>
        <p>
          Affiliate relationships help support the operation and development
          of BachatBase. They allow us to keep the service free for shoppers
          while maintaining and improving the platform.
        </p>
        <p>
          We work to keep our listings useful and up to date. If you have
          questions about how BachatBase makes money, feel free to reach out
          through our contact page.
        </p>
      </div>
    </article>
  );
}
