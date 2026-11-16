import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 3600;

const title = "ICICI Bank Offers India 2026 — ixigo, MakeMyTrip, Amazon Pay ICICI (live list)";
const description =
  "Which ICICI Bank offers are live right now in India? Current ixigo flight discounts, MakeMyTrip instant discount, Amazon Pay ICICI card deals — plus how ICICI instant discounts work at checkout, eligibility and common reasons they fail.";
const canonical = "/guides/icici-bank-offers-india-2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Can I combine an ICICI instant discount with a sale price?",
    answer:
      "Usually yes. Sale prices reduce the item value, and the instant discount applies at the order level after that. The usual exceptions are MRP-based exclusions (some marketplaces exclude sale items from bank offers) and stores whose payment gateway does not pass the discounted total to the bank. Check the payment page — the discount line is either visible there or the offer does not apply.",
  },
  {
    question: "Is there a minimum transaction value on ICICI instant discounts?",
    answer:
      "Most ICICI offers carry a minimum transaction value — ₹2,000–₹5,000 for everyday electronics, ₹7,500+ for premium categories. The exact slab and card family vary per offer and per sale window. The live panel on this page links each offer to its terms; never assume the threshold from last month's sale.",
  },
  {
    question: "Why did my ICICI card get no discount even though the store advertised one?",
    answer:
      "The three usual causes: (1) the card is not one of the eligible card families for that specific offer (credit vs debit, certain variants excluded); (2) the minimum transaction value was not met after returns/exclusions; (3) the offer has a daily or overall cap that is exhausted by the time you paid. The payment page shows whether the instant discount was applied before you confirm — if it shows zero, expect the full amount.",
  },
  {
    question: "How is the Amazon Pay ICICI card different from a regular ICICI credit card?",
    answer:
      "The Amazon Pay ICICI card is a co-branded ICICI credit card with its rewards tied to Amazon.in spends, and it appears on this page when Amazon runs card-linked offers. Card-linked offers for the co-brand rotate with Amazon's own sale calendar; regular ICICI offers follow the bank's own campaign calendar. They are different programmes — do not assume one implies the other.",
  },
  {
    question: "Are ICICI offers the same on website and app?",
    answer:
      "Generally yes, because the discount is applied by the payment gateway at the bank layer, not by the storefront. Occasionally a campaign is app-only or web-only — the store states that in the offer terms. Both channels hit the same payment page logic; the price before payment and the discount line are the two things to verify.",
  },
];

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "ICICI Bank Offers India 2026", path: canonical },
]);

const faqSchema = faqPageJsonLd(FAQS);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-15",
  dateModified: "2026-11-15",
  publisher: {
    "@type": "Organization",
    name: "Durza",
    url: "https://durza.in",
    logo: { "@type": "ImageObject", url: "https://durza.in/logo.png" },
  },
  author: {
    "@type": "Organization",
    name: "Durza Editors",
    url: absoluteUrl("/about"),
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
};

export default async function IciciBankOffersPage() {
  const snapshot = await fetchLiveBankSnapshot();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "ICICI Bank Offers India 2026", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Updated 15 Nov 2026 · Every offer below is read live from Durza’s own catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          ICICI Bank Offers India (2026) — what is live right now
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          The current ixigo, MakeMyTrip and Amazon Pay ICICI offers — plus how ICICI instant discounts actually apply at checkout, and why the payment page decides everything.
        </p>

        <QuickAnswer
          question="Which ICICI offers are actually live this week?"
          answer="The panel below lists every ICICI offer our catalogue has read from the source pages — today that means ixigo flight and net-banking discounts, a MakeMyTrip instant discount with a specific code, and the Amazon Pay ICICI co-brand offers. They rotate, so the panel is the truth, not a cached headline."
          jumpHref="#live"
          jumpLabel="See the live ICICI offers"
        />

        <div id="live">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={["icici"]}
            heading="Live ICICI offers — right now"
            asOfLabel="Read live from Durza’s coupon catalogue. Expiry dates and minimum spend are on each offer’s own page — open the offer, don’t trust the banner."
          />
        </div>

        <section aria-labelledby="how-instant" className="mt-12">
          <h2 id="how-instant" className="font-serif text-2xl font-extrabold text-ink">
            How an ICICI instant discount works at checkout
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-ink-soft">
            <li>You add the product and proceed to payment; the item-level sale price is already applied by the store.</li>
            <li>At the payment page, the store’s payment gateway tells the bank what the cart total is — after discounts and exclusions.</li>
            <li>The bank checks your card family and the minimum transaction value against the live campaign rules, then approves or declines the instant discount.</li>
            <li>If approved, the discount is deducted on the final statement line of the same payment — the amount you actually pay is lower than the cart shows at item level.</li>
          </ol>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            The important consequence: the discount is not shown as a separate “coupon applied” line by every storefront. The only place it is reliably visible is the payment page before you confirm, and later, your bank statement. If neither shows a discount, the full cart total is what you pay.
          </p>
        </section>

        <section aria-labelledby="eligibility" className="mt-12">
          <h2 id="eligibility" className="font-serif text-2xl font-extrabold text-ink">
            What eligibility usually means
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Every ICICI offer has three gates. Failing any one silently drops the discount — no error, no partial credit:
          </p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Card family — credit vs debit vs co-brand, and specific variants. A premium credit card may be eligible while the same bank's entry debit card is not.",
              "Minimum transaction value — typically ₹2,000 to ₹7,500+ depending on category. Returns and excluded items lower the value the bank actually sees.",
              "Merchant and channel — the campaign may be web-only, app-only, or restricted to selected categories (flights vs hotels vs merchandise).",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-ink-soft" strokeWidth={2} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-amber-700" strokeWidth={2} />
            <p className="text-sm leading-6 text-amber-900">
              If the payment page shows no discount after you select your ICICI card, do not press pay on the assumption it will appear on your statement. It almost never does. Switch card or accept the full price before confirming.
            </p>
          </div>
        </section>

        <section aria-labelledby="stacking" className="mt-12">
          <h2 id="stacking" className="font-serif text-2xl font-extrabold text-ink">
            Stacking ICICI with sale codes — the honest order
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Promo code first, bank instant discount second, EMI rewards last. The store code reduces the base price; the bank discount applies on the reduced value; EMI programmes grant extra points or cashback on the post-discount spend. Stacking more than that — two bank offers plus a code — is almost never permitted, and pool-counter limits (one transaction, one card, one instant discount) are enforced at the payment gateway. See <Link href="/bank-offers" className="font-semibold text-inkblue hover:underline">/bank-offers</Link> for the current multi-bank view, or our <Link href="/guides/best-credit-card-online-shopping-india-2026" className="font-semibold text-inkblue hover:underline">online-shopping credit card guide</Link> to pick a card for this stack deliberately.
          </p>
        </section>

        <section aria-labelledby="when-icici" className="mt-12">
          <h2 id="when-icici" className="font-serif text-2xl font-extrabold text-ink">
            When ICICI pushes the strongest offers
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Two recurring windows: the festive mega-sale fortnight (September–October) when every bank competes for the cart, and travel-launch windows when ICICI leans into ixigo and MakeMyTrip partnerships with flat flight and hotel discounts. Outside those windows, the offers narrow to co-brand campaigns and targeted email/SMS offers for existing cardholders — the catalogue panel above is the only honest source for what is actually running today.
          </p>
        </section>

        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="font-serif text-2xl font-extrabold text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-white">
            {FAQS.map((faq) => (
              <div key={faq.question} className="p-5">
                <h3 className="font-serif text-lg font-bold leading-snug text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <Link href="/bank-offers" className="mt-10 inline-flex items-center gap-1.5 font-semibold text-inkblue hover:underline">
          All bank & card offers on Durza
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </Link>
      </article>
    </>
  );
}
