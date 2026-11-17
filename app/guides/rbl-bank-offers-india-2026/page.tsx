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

const title = "RBL Bank Offers India 2026 — live list";
const description =
  "Which RBL Bank offers are live right now in India? See current RBL card and payment offers in our catalogue — plus how RBL card instant discounts work at checkout, eligibility and common pitfalls.";
const canonical = "/guides/rbl-bank-offers-india-2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Do RBL instant discounts apply to all RBL credit cards?",
    answer:
      "No card-family inclusions are universal. RBL campaigns typically target specific families — World Safari, Icon, Shoprite, Easyup — or specific networks (Visa vs Mastercard). The live offer page for each deal lists the exact eligible cards; if your variant is not named, the discount will not apply even if the bank name appears.",
  },
  {
    question: "Are RBL offers different across categories?",
    answer:
      "Yes. RBL campaigns can differ by merchant and category, each with its own minimum booking value and per-customer cap. A discount on one category or merchant does not imply the same offer exists elsewhere. The panel below links per-offer terms; read the one for the purchase you are about to make.",
  },
  {
    question: "Can I assume an RBL discount applies at any store showing a bank-offer badge?",
    answer:
      "Only when that specific merchant is part of the campaign. The /bank-offers hub tracks whichever partner offers are live in a given week; partnerships change, so never assume an RBL discount applies unless the payment page confirms it.",
  },
  {
    question: "What happens if my card gets declined for the instant discount?",
    answer:
      "The payment succeeds without the discount — there is no partial credit. Check two things before pressing pay again: the minimum transaction value (hotel bookings count the hotel total, not flights+hotel combined, when the campaign is hotel-only) and whether the offer cap for the day is exhausted. If both check out, the card family may simply not be included in that specific campaign.",
  },
  {
    question: "Are RBL UPI or net-banking offers also tracked?",
    answer:
      "Yes, when the source offer names RBL. The same matching runs across UPI, debit card and net-banking offers in Durza's catalogue. Credit-card offers have historically been the most common — improving the ratio means more bank names surface by default; the panel below shows whatever RBL names are currently readable.",
  },
];

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "RBL Bank Offers India 2026", path: canonical },
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

export default async function RblBankOffersPage() {
  const snapshot = await fetchLiveBankSnapshot();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "RBL Bank Offers India 2026", path: canonical },
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
          RBL Bank Offers India (2026) — what is live right now
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Current RBL card and payment offers in our catalogue — plus how RBL card instant discounts apply at checkout, and the one trap that silently kills them.
        </p>

        <QuickAnswer
          question="Which RBL Bank offers are live right now?"
          answer="The panel below lists every RBL offer Durza's catalogue has read from source pages. Eligibility, minimum spend and caps differ by campaign; the panel links the exact terms per offer."
          jumpHref="#live"
          jumpLabel="See the live RBL offers"
        />

        <div id="live">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={["rbl"]}
            heading="Live RBL Bank offers — right now"
            asOfLabel="Read live from Durza’s coupon catalogue. Eligible card families, minimum spend and per-customer caps are on each offer’s own page — open the offer, don’t trust the banner."
          />
        </div>

        <section aria-labelledby="how-rbl" className="mt-12">
          <h2 id="how-rbl" className="font-serif text-2xl font-extrabold text-ink">
            How an RBL instant discount applies at checkout
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Same mechanism as other banks: the discount is negotiated between the store&apos;s payment gateway and RBL at the moment of payment, not at item level. What differs is the campaign shape — eligible merchants, categories, minimum values and per-customer caps are enforced at the gateway.
          </p>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-ink-soft">
            <li>Add the item to cart and create the order; the sale price, if any, is already applied by the store.</li>
            <li>At the payment page, select your RBL card — debit, credit or net-banking as the campaign specifies.</li>
            <li>The gateway validates the card family, the minimum transaction value and any campaign cap, then approves or drops the discount instantly.</li>
            <li>The discounted amount is what you are charged — visible on the payment confirmation screen and on your statement.</li>
          </ol>
        </section>

        <section aria-labelledby="eligibility" className="mt-12">
          <h2 id="eligibility" className="font-serif text-2xl font-extrabold text-ink">
            Eligibility — what RBL actually asks
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Named card family in the campaign — 'RBL credit cards' is a headline, not a rule. The eligible list is specific to the offer.",
              "Minimum value — campaigns can have different slabs by merchant or category; check the offer terms for the exact threshold.",
              "Per-customer cap — some campaigns allow only one discounted transaction per window per card.",
              "Channel — an app-only or web-only tag, when present, is printed in the offer terms and enforced by the gateway silently.",
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
              If you have already used an RBL offer that has a per-customer cap, a second transaction may show full price on the payment page. That is the cap working — not an error. Always confirm the discount line before paying.
            </p>
          </div>
        </section>

        <section aria-labelledby="stacking" className="mt-12">
          <h2 id="stacking" className="font-serif text-2xl font-extrabold text-ink">
            Stacking RBL with sale prices and coupons
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Some merchants allow a coupon plus a bank instant discount, while others do not. The rule of thumb: one promo code per order; any bank instant discount applies on the cart total after the code when the campaign allows it; EMI rewards come last. If a code removes the bank discount, the payment page will show the bank line dropping — confirm before you pay.
          </p>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            See <Link href="/bank-offers" className="font-semibold text-inkblue hover:underline">/bank-offers</Link> for the current multi-bank snapshot, or the <Link href="/guides/best-credit-card-online-shopping-india-2026" className="font-semibold text-inkblue hover:underline">online-shopping card guide</Link> to compare RBL&apos;s offers against other banks.
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
