import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The basic terms for using Savevero to find coupons, deals, and offers.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Use",
    description:
      "The basic terms for using Savevero to find coupons, deals, and offers.",
    url: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl text-ink">Terms of Use</h1>
      <div className="mt-6 space-y-4 text-ink-soft">
        <h2 className="pt-4 font-serif text-xl text-ink">Using Savevero</h2>
        <p>
          Savevero helps you discover coupons, deals, and offers from online
          stores. By using the site, you agree to these terms. If you do not
          agree, please do not use Savevero.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Coupon and Deal Information
        </h2>
        <p>
          Savevero lists offers from third-party merchants. We work to keep
          our listings useful and up to date, but we cannot guarantee that
          every coupon will work at every checkout. Offers change frequently,
          and the final determination of whether an offer applies is made by
          the store.
        </p>
        <p>
          Prices and availability change quickly. The price history we show
          is as-reported and may lag the merchant&apos;s live price by hours.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Third-Party Stores and External Links
        </h2>
        <p>
          When you click through to a store, you are leaving Savevero and
          subject to that store&apos;s terms, policies, and practices. We are
          not responsible for the content, policies, or actions of third-party
          stores or websites.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Affiliate Relationships
        </h2>
        <p>
          Savevero may earn a commission when you use certain links and
          complete a qualifying purchase with a participating store. This
          does not add to the price you pay. Some placements may be sponsored
          or promotional, and we identify them clearly when they appear.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Intellectual Property
        </h2>
        <p>
          The content, design, and functionality of Savevero are protected by
          intellectual property laws. You may not copy, reproduce, or
          redistribute our content without permission.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Availability and Changes
        </h2>
        <p>
          We strive to keep Savevero available and reliable, but we do not
          guarantee uninterrupted access. We may update these terms or modify
          the service at any time. Continued use of Savevero after changes
          constitutes acceptance of the updated terms.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Contact</h2>
        <p>
          If you have questions about these terms, please reach out through
          our contact page.
        </p>
      </div>
    </article>
  );
}
