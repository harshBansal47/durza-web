import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of Durza to find coupons, deals, and offers.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Use",
    description:
      "The terms that govern your use of Durza to find coupons, deals, and offers.",
    url: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl font-extrabold text-ink sm:text-5xl">
        Terms of Use
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        Last updated: {LEGAL_LAST_UPDATED}
      </p>
      <div className="mt-6 space-y-4 text-ink-soft">
        <p>
          These terms govern your use of Durza (durza.in). By using the site,
          you agree to them. If you do not agree, please do not use Durza.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Eligibility and Your Account
        </h2>
        <p>
          You must be able to form a binding contract under Indian law — at
          least 18 years old — to create an account. If you are younger, you
          may browse Durza only with the involvement of a parent or guardian.
        </p>
        <p>
          Keep your credentials safe: you are responsible for activity under
          your account. Give us accurate information, and tell us promptly if
          you believe your account has been used without your permission. We
          may suspend or close accounts that abuse the service or break these
          terms.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Using Durza</h2>
        <p>
          Durza helps you discover coupons, deals, and offers from online
          stores. Use it for that — for your own personal, non-commercial
          shopping.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Coupon and Deal Information
        </h2>
        <p>
          Durza lists offers from third-party merchants. We work to keep our
          listings useful and up to date, but we cannot guarantee that every
          coupon will work at every checkout. Offers change frequently, and
          the final determination of whether an offer applies is made by the
          store.
        </p>
        <p>
          Prices and availability change quickly. The price history we show is
          as-reported and may lag the merchant&rsquo;s live price by hours.
          Always check the store&rsquo;s checkout page before buying.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Third-Party Stores and External Links
        </h2>
        <p>
          When you click through to a store, you are leaving Durza and subject
          to that store&rsquo;s terms, policies, and practices. We are not
          responsible for the content, policies, or actions of third-party
          stores or websites.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Affiliate Relationships
        </h2>
        <p>
          Durza may earn a commission when you use certain links and complete
          a qualifying purchase with a participating store. This does not add
          to the price you pay. Some placements may be sponsored or
          promotional, and we identify them clearly when they appear. See our{" "}
          <Link
            href="/affiliate-disclosure"
            className="text-inkblue underline underline-offset-2"
          >
            Affiliate Disclosure
          </Link>{" "}
          for the full picture.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Acceptable Use</h2>
        <p>
          To keep Durza useful for everyone, you agree not to:
        </p>
        <p>
          scrape or bulk-download the site or its data without our permission;
          interfere with, overload, or attempt to breach the service;
          misreport whether a coupon worked, or otherwise manipulate votes,
          reports, or success rates; impersonate others; or collect other
          users&rsquo; information.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Your Reports and Contributions
        </h2>
        <p>
          When you vote on a coupon or report whether it worked, that feedback
          feeds the success rates everyone sees — so keep it honest. By
          submitting it, you allow us to display and aggregate it on Durza. We
          may remove or adjust contributions, and repeated abuse can end
          access to the service.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Intellectual Property
        </h2>
        <p>
          The content, design, and functionality of Durza are protected by
          intellectual property laws. You may not copy, reproduce, or
          redistribute our content without permission. Store names, logos, and
          trademarks belong to their owners and are used only to identify
          them; if you are a rights holder with a concern, contact us and we
          will address it.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Availability and Changes
        </h2>
        <p>
          We strive to keep Durza available and reliable, but we do not
          guarantee uninterrupted access. We may update these terms or modify
          the service at any time. Continued use of Durza after changes
          constitutes acceptance of the updated terms.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Disclaimers</h2>
        <p>
          Durza is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;, to the fullest extent permitted by law. We list
          offers to help you compare and save, but we do not warrant that any
          particular offer will be available, valid, or produce a given
          saving.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, Durza is not liable for
          indirect or consequential losses, lost savings or profits, or
          disputes between you and a store. Nothing in these terms limits any
          rights you have that cannot be limited by law, including under
          consumer protection law.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Indemnity</h2>
        <p>
          To the extent permitted by law, you agree to indemnify Durza against
          claims, losses, or costs arising from your misuse of the service or
          your breach of these terms.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Termination
        </h2>
        <p>
          You can stop using Durza, and delete your account, at any time. We
          may suspend or terminate access for conduct that breaks these terms.
          Sections that by their nature should survive — intellectual
          property, disclaimers, liability, indemnity, and governing law —
          survive termination.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Governing Law and Jurisdiction
        </h2>
        <p>
          These terms are governed by and construed in accordance with the
          laws of India. You agree that the courts in India have exclusive
          jurisdiction over any dispute arising out of or relating to these
          terms or your use of Durza.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Changes to These Terms
        </h2>
        <p>
          We may update these terms as the service evolves. When we do, we
          update the date at the top of this page; material changes will be
          surfaced on the site.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Contact and Grievance
        </h2>
        <p>
          Questions about these terms, or a grievance about how we have
          handled something, can go to{" "}
          <a
            href="mailto:hello@durza.in"
            className="text-inkblue underline underline-offset-2"
          >
            hello@durza.in
          </a>
          . We acknowledge complaints promptly and aim to resolve them within
          the timelines required by law.
        </p>
      </div>
    </article>
  );
}
