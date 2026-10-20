import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import ConsentPreferences from "@/components/ConsentPreferences";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Durza collects, uses, and protects your information — and the rights you have under India's DPDP Act.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Durza collects, uses, and protects your information — and the rights you have under India's DPDP Act.",
    url: absoluteUrl("/privacy"),
  },
};

const HIGHLIGHTS = [
  "We collect only what we need to run Durza — account details, saved stores, tracked products, and anonymised usage.",
  "We never sell your personal data. Commissions come from stores, not from you.",
  "You can request a copy, correction, or deletion of your data at any time.",
  "Verification reports are public attestations and are kept even after account deletion.",
];

const TOC = [
  ["Information We Collect", "information-we-collect"],
  ["How We Use Information", "how-we-use-information"],
  ["What We Do Not Do", "what-we-do-not-do"],
  ["Cookies, Analytics, and Your Choices", "cookies-analytics-and-your-choices"],
  ["Your Rights Under the DPDP Act", "your-rights-under-the-dpdp-act"],
  ["Data Retention and Deletion", "data-retention-and-deletion"],
  ["Sharing and Third-Party Services", "sharing-and-third-party-services"],
  ["Where Your Data Is Processed", "where-your-data-is-processed"],
  ["Children", "children"],
  ["Security", "security"],
  ["Changes to This Policy", "changes-to-this-policy"],
  ["Grievance and Contact", "grievance-and-contact"],
] as const;

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      lede="How Durza collects, uses, and protects your information — and the rights you have under India's DPDP Act. Written in plain language on purpose."
      updated={LEGAL_LAST_UPDATED}
      highlights={HIGHLIGHTS}
      toc={TOC.map(([label, id]) => ({ label, id }))}
      related={[
        { href: "/terms", label: "Terms of use" },
        { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
        { href: "/contact", label: "Contact us" },
      ]}
    >
      <p>
        Durza (durza.in) helps shoppers find coupons and deals. This policy explains what personal
        data we collect, why we collect it, who we share it with, and the choices and rights you
        have. We keep it in plain language on purpose. We are the{" "}
        <strong className="font-semibold text-ink">data fiduciary</strong> for the personal data
        described here, and we process it under India&rsquo;s Digital Personal Data Protection Act,
        2023 (the DPDP Act).
      </p>

      <h2 id="information-we-collect" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Information We Collect
      </h2>
      <p>
        <strong className="font-semibold text-ink">Account information.</strong> When you create an
        account, we store your email address, a hashed password, and optionally your full name. We
        use this information to authenticate you and provide access to your saved deals, tracked
        products, and alerts.
      </p>
      <p>
        <strong className="font-semibold text-ink">Saved data.</strong> If you choose to save
        coupons, follow stores, or track products, we store those preferences so you can access them
        when you return.
      </p>
      <p>
        <strong className="font-semibold text-ink">Notification preferences.</strong> We store your
        email notification settings and, if you opt in, your Telegram chat ID or browser push
        subscription so we can deliver price-drop and deal alerts.
      </p>
      <p>
        <strong className="font-semibold text-ink">Usage data.</strong> Page views, searches, and
        coupon impressions are recorded only if you allow analytics. If you decline, those events
        are not sent and the site works exactly the same.
      </p>
      <p>
        <strong className="font-semibold text-ink">Clicks, votes, and reports.</strong> Coupon votes
        and outbound clicks are logged with a <em>salted one-way hash</em> of your IP address, never
        the raw address, and we scrub even that hash after 90 days. The event itself stays (without
        you in it) so we can tell which deals actually help shoppers.
      </p>

      <h2 id="how-we-use-information" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        How We Use Information
      </h2>
      <p>
        We process personal data to run your account and the features you ask for — sign-in, saves,
        and alerts; to understand, in aggregate, which offers and pages are useful; to attribute
        outbound clicks so stores can credit the commissions that keep Durza free; to keep the
        service safe and working (rate limiting, abuse prevention, error monitoring); and to meet
        our legal obligations.
      </p>

      <h2 id="what-we-do-not-do" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        What We Do Not Do
      </h2>
      <p>
        We do not sell personal data, and we do not use your browsing history to rank deals.
        On editorial pages, Google AdSense may use cookies and device identifiers to serve and
        measure non-personalized ads; that is described below. Affiliate commissions may be one
        of several signals used to order offers; verification evidence, shopper success, and
        relevance also matter.
      </p>
      <p>
        We do not store raw IP addresses, credit card numbers, or payment credentials. Durza does
        not process payments directly and never sees your card details.
      </p>

      <h2
        id="cookies-analytics-and-your-choices"
        className="scroll-mt-24 pt-4 font-serif text-xl text-ink"
      >
        Cookies, Analytics, and Your Choices
      </h2>
      <p>
        We use first-party cookies to maintain your browsing session and remember your preferences.
        A pseudonymous visitor ID supports attribution and can connect activity from the same
        browser, but it does not contain your name or email address.
      </p>
      <p>
        Optional analytics events — such as page views, searches, and coupon impressions — are sent
        only if you accept analytics. You can change or withdraw that choice at any time using the
        controls at the end of this page. Declining blocks those events; necessary session and deal
        functionality may still use first-party data. This choice controls analytics only; it does
        not turn ads off.
      </p>
      <p>
        <strong className="font-semibold text-ink">Editorial advertising.</strong> Guides, reviews,
        and comparisons show Google AdSense units to all visitors. We request non-personalized ads,
        which are selected from the page content rather than your past behaviour. Google may still
        use cookies or device identifiers for frequency capping and aggregated ad reporting. We do
        not pass your account email or name to AdSense. You can block cookies in your browser, but
        some ad delivery features may then be affected.
      </p>

      <h2 id="your-rights-under-the-dpdp-act" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Your Rights Under the DPDP Act
      </h2>
      <p>
        <strong className="font-semibold text-ink">Access.</strong> You can ask for a summary of the
        personal data we process about you, and how we use it.
      </p>
      <p>
        <strong className="font-semibold text-ink">Correction.</strong> You can ask us to correct
        inaccurate or incomplete personal data. Most of it — your name, email, and preferences — is
        editable yourself in your account settings.
      </p>
      <p>
        <strong className="font-semibold text-ink">Erasure.</strong> You can delete your account at
        any time; see the section below for exactly what that removes.
      </p>
      <p>
        <strong className="font-semibold text-ink">Withdrawing consent.</strong> Where we rely on
        your consent — for example, analytics — you can withdraw it at any time. Withdrawing consent
        stops the processing that depended on it; features that don&rsquo;t need it keep working.
      </p>
      <p>
        <strong className="font-semibold text-ink">Grievance.</strong> If you believe we have
        mishandled your data, you can complain to us using the contact details below, and we will
        respond as required by law.
      </p>
      <p>
        <strong className="font-semibold text-ink">Nomination.</strong> You can nominate another
        person to exercise these rights on your behalf in the event of your death or incapacity, by
        writing to us.
      </p>
      <p>
        To exercise any of these rights, write to{" "}
        <a href="mailto:hello@durza.in" className="text-inkblue underline underline-offset-2">
          hello@durza.in
        </a>
        . We may ask you to verify your identity before acting, to protect your account. Some
        requests may be limited where the law allows — for example, we cannot delete records we are
        legally required to keep.
      </p>

      <h2 id="data-retention-and-deletion" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Data Retention and Deletion
      </h2>
      <p>
        You can delete your account at any time from your account settings. When you do, we
        permanently remove your account information, saved items, tracked products, and notification
        preferences.
      </p>
      <p>
        Click and vote identifiers are scrubbed after 90 days, as described above. Anonymized
        analytics data — which cannot identify you — may be retained in aggregate form. If the law
        requires us to keep something, we keep only what is required and only for as long as
        required.
      </p>

      <h2
        id="sharing-and-third-party-services"
        className="scroll-mt-24 pt-4 font-serif text-xl text-ink"
      >
        Sharing and Third-Party Services
      </h2>
      <p>
        When you click through to a store, we add a random reference to the link so the store&rsquo;s
        affiliate network can tell us a purchase came from Durza. That reference identifies the
        click, not you, and your name, email, and IP address are never placed in it. Once you follow
        the link, you are on the store&rsquo;s site and its policies apply.
      </p>
      <p>
        We use third-party services for hosting and databases, email delivery, error monitoring, and
        rate limiting. These services receive only the information necessary to perform their
        function. We may also disclose information where we are legally required to.
      </p>

      <h2 id="where-your-data-is-processed" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Where Your Data Is Processed
      </h2>
      <p>
        Some of our service providers process data outside India, including in the United States. We
        transfer personal data only as permitted under the DPDP Act — India allows transfers except
        to destinations the Government restricts — and we choose providers with strong security
        practices.
      </p>

      <h2 id="children" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Children
      </h2>
      <p>
        Durza is intended for adults. We do not knowingly process personal data of children under 18.
        If you believe a child has given us personal data, contact us and we will delete it.
      </p>

      <h2 id="security" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Security
      </h2>
      <p>
        Passwords are stored hashed, never in readable form; the site runs over HTTPS; and access to
        personal data is limited to what the service needs to operate. No online service can promise
        perfect security, but we work to protect your data and to fix issues quickly.
      </p>

      <h2 id="changes-to-this-policy" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Changes to This Policy
      </h2>
      <p>
        We may update this policy as the service changes. When we do, we update the date at the top
        of this page, and we will surface material changes on the site.
      </p>

      <h2 id="grievance-and-contact" className="scroll-mt-24 pt-4 font-serif text-xl text-ink">
        Grievance and Contact
      </h2>
      <p>
        For questions about this policy, or to raise a grievance about how your data is handled,
        contact our Grievance Officer at{" "}
        <a href="mailto:hello@durza.in" className="text-inkblue underline underline-offset-2">
          hello@durza.in
        </a>{" "}
        with the subject line &ldquo;Grievance&rdquo;. We acknowledge complaints promptly and aim to
        resolve them within the timelines required by law.
      </p>

      <ConsentPreferences />
    </LegalPage>
  );
}
