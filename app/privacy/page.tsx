import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import ConsentPreferences from "@/components/ConsentPreferences";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BachatBase collects, uses, and protects your information.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how BachatBase collects, uses, and protects your information.",
    url: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl text-ink">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-ink-soft">
        <h2 className="pt-4 font-serif text-xl text-ink">
          Information We Collect
        </h2>
        <p>
          <strong className="font-semibold text-ink">Account information.</strong>{" "}
          When you create an account, we store your email address, a hashed
          password, and optionally your full name. We use this information to
          authenticate you and provide access to your saved deals, tracked
          products, and alerts.
        </p>
        <p>
          <strong className="font-semibold text-ink">Saved data.</strong>{" "}
          If you choose to save coupons, follow stores, or track products, we
          store those preferences so you can access them when you return.
        </p>
        <p>
          <strong className="font-semibold text-ink">Notification preferences.</strong>{" "}
          We store your email notification settings and, if you opt in, your
          Telegram chat ID or browser push subscription so we can deliver
          price-drop and deal alerts.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Analytics and Cookies
        </h2>
        <p>
          We use first-party cookies to maintain your browsing session and
          remember your preferences. A pseudonymous visitor ID supports
          attribution and can connect activity from the same browser, but does
          not contain your name or email address.
        </p>
        <p>
          Optional analytics events — such as page views, searches, and coupon
          impressions — are sent only if you accept analytics. Declining blocks
          those events; necessary session and deal functionality may still use
          first-party data.
        </p>
        <p>
          Coupon votes and outbound clicks are logged with a{" "}
          <em>salted one-way hash</em> of your IP address, never the raw
          address. We forget even that hash after 90 days; the click itself
          stays (without you in it) so we can tell which deals actually help
          shoppers.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Third-Party Services
        </h2>
        <p>
          When you click through to a store, we add a random reference to the
          link so the store&apos;s affiliate network can tell us a purchase
          came from BachatBase. That reference identifies the click, not you,
          and your IP address is never shared with merchants or affiliate
          networks.
        </p>
        <p>
          We use third-party services for email delivery, error monitoring,
          and rate limiting. These services receive only the information
          necessary to perform their function.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          What We Do Not Do
        </h2>
        <p>
          We do not sell personal data, and we do not profile you for
          advertising or use your browsing history to rank deals. Affiliate
          commissions may be one of several signals used to order offers;
          verification evidence, shopper success, and relevance also matter.
        </p>
        <p>
          We do not store raw IP addresses, credit card numbers, or payment
          credentials. BachatBase does not process payments directly.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">
          Data Retention and Deletion
        </h2>
        <p>
          You can delete your account at any time from your account settings.
          When you do, we permanently remove your account information, saved
          items, tracked products, and notification preferences. Some
          anonymized analytics data may be retained in aggregate form.
        </p>

        <h2 className="pt-4 font-serif text-xl text-ink">Contact</h2>
        <p>
          If you have questions about this privacy policy or how we handle
          your data, please reach out through our contact page.
        </p>
      </div>
      <ConsentPreferences />
    </article>
  );
}
