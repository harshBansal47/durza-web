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

const title = "RBL Bank Offers India 2026 — ixigo Hotels, Tatacliq, Travel Card Benefits (live list)";
const description =
  "Which RBL Bank offers are live right now in India? Current ixigo domestic & international hotel discounts, Tatacliq instant discount, plus how RBL card instant discounts work at checkout, eligibility and common pitfalls.";
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
    question: "Are RBL flight offers different from hotel offers?",
    answer:
      "Yes, increasingly. RBL has leaned into travel since late 2025 — separate promo routes for flights (ixigo) and hotels, each with its own minimum booking value and per-customer cap. A hotel discount does not imply the same offer exists on flights. The panel below links per-offer terms; read the one for the booking you are about to make.",
  },
  {
    question: "Can I use an RBL discount with a MakeMyTrip or Goibibo booking?",
    answer:
      "Only when that specific merchant is part of the campaign. RBL's active partnerships shown today on Durza are ixigo and Tatacliq. MakeMyTrip/Goibibo have their own bank partnerships at various times — the /bank-offers hub tracks whichever is live in a given week; bank names change, so never assume an RBL discount because the store shows a bank-offer badge.",
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
          The current ixigo hotel discounts and Tatacliq card offer — plus how RBL card instant discounts apply at checkout, and the one trap that silently kills them.
        </p>

        <QuickAnswer
          question="Which RBL Bank offers are live right now?"
          answer="The panel below lists every RBL offer Durza's catalogue has read from source pages — today that means ixigo flight-and-hotel discounts for specific RBL card families and a Tatacliq card discount. Hotel and flight slabs differ; the panel links the exact terms per offer."
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
            Same mechanism as other banks: the discount is negotiated between the store's payment gateway and RBL at the moment of payment, not at item level. What differs is the campaign shape. RBL's 2026 campaigns lean travel — flight and hotel discounts on ixigo — with per-customer caps (one discount per card per booking type per month) enforced at the gateway.
          </p>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-ink-soft">
            <li>Add the item to cart and create the order; the sale price, if any, is already applied by the store.</li>
            <li>At the payment page, select your RBL card — debit, credit or net-banking as the campaign specifies.</li>
            <li>The gateway validates the card family, the minimum booking value and the monthly cap, then approves or drops the discount instantly.</li>
            <li>The discounted amount is what you are charged — visible on the payment confirmation screen and on your statement.</li>
          </ol>
        </section>

        <section aria-labelledby="eligibility" className="mt-12">
          <h2 id="eligibility" className="font-serif text-2xl font-extrabold text-ink">
            Eligibility — what RBL actually asks
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Named card family in the campaign — 'RBL credit cards' is a headline, not a rule. The eligible list is specific; Icon World Safari is not Icon Shoprite.",
              "Minimum value — hotel campaigns have separate booking-value slabs from flight campaigns; domestic vs international usually sit in different tiers.",
              "Per-customer cap — one discounted transaction per campaign window per card. Second booking in the same month is generally full price.",
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
              If you have already used an RBL ixigo discount this month, the second booking shows full price on the payment page. That is the cap working — not an error. Splitting one booking across two cards is against campaign terms; the gateway declines the discount on both.
            </p>
          </div>
        </section>

        <section aria-labelledby="tatacliq" className="mt-12">
          <h2 id="tatacliq" className="font-serif text-2xl font-extrabold text-ink">
            The Tatacliq offer — what to know
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Tatacliq runs a recurring RBL campaign on its marketplace — historically a flat percentage on the order, with a minimum spend and an upper discount cap per transaction. Because Tatacliq also hosts third-party sellers, check the seller block on the product page: some campaigns apply to the Tatacliq-fulfilled portion only, not to seller-shipped orders. The live panel above links the current offer's terms in full; read the inclusions before adding to cart.
          </p>
        </section>

        <section aria-labelledby="stacking" className="mt-12">
          <h2 id="stacking" className="font-serif text-2xl font-extrabold text-ink">
            Stacking RBL with sale prices and coupons
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Tatacliq allows coupon + bank instant discount when the coupon is a Tatacliq-platform coupon (not a brand code that excludes bank offers). On ixigo, coupons are usually direct-booking discounts that apply on top of the bank campaign — but hotel coupons often carry their own minimum value and property exclusions. The rule of thumb: one promo code per order; bank instant discount topped on whatever the cart total is after the code; EMI rewards last. If a brand code removes the bank discount, the code wins for the platform and the payment page drops the bank line.
          </p>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            See <Link href="/bank-offers" className="font-semibold text-inkblue hover:underline">/bank-offers</Link> for the current multi-bank snapshot, or the <Link href="/guides/best-credit-card-online-shopping-india-2026" className="font-semibold text-inkblue hover:underline">online-shopping card guide</Link> to compare RBL's offer against ICICI and HDFC's.
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
