import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, AlertTriangle, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 21600;

const title = "RBL Bank Offers in India (2026): Live Deals, Eligibility and Checkout Checks";
const description =
  "Check live RBL Bank offers from Durza's catalogue, then verify card family, minimum spend, cap and channel before paying. Checked 26 Nov 2026; offer terms change by campaign.";
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
    question: "Are RBL Bank offers live all the time?",
    answer:
      "No. RBL offers appear and disappear by campaign, merchant and card family. The live panel on this page reads from Durza's catalogue at request time. If it is empty, we are not seeing a readable live RBL offer in our catalogue at that moment — that does not mean no offer exists anywhere, only that you should verify directly on the merchant payment page.",
  },
  {
    question: "Do all RBL credit cards get the same discount?",
    answer:
      "Usually not. Campaigns often name specific card families, networks or variants. 'RBL credit cards' in a banner headline can hide a narrower eligible list in the terms. Check the exact offer page and confirm the discount line after selecting your card on the payment screen.",
  },
  {
    question: "Why did an RBL discount disappear at checkout?",
    answer:
      "Common reasons are: your card variant is not eligible, the net cart value fell below the minimum after coupon/exchange, the campaign cap was exhausted, or the offer was restricted to a channel/category. If the payment page shows no discount before confirmation, treat it as not applied.",
  },
  {
    question: "Can I combine an RBL instant discount with a coupon code?",
    answer:
      "Sometimes, but only when the campaign terms allow it. The usual order is coupon first, then bank discount on the eligible net amount. Two bank offers on the same transaction generally do not stack. The payment summary is the final check.",
  },
  {
    question: "Does Durza verify every RBL offer on a live checkout?",
    answer:
      "No. We read RBL-named offers from Durza's catalogue and explain the common eligibility rules. We do not run live checkout tests for every card, merchant and campaign. Before paying, verify the eligible card list, minimum spend, cap and discount line on the merchant's payment page.",
  },
];

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "RBL Bank Offers India 2026", path: canonical },
]);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-15",
  dateModified: "2026-11-26",
  author: { "@type": "Person", name: "Harsh Bansal", url: absoluteUrl("/about") },
  publisher: {
    "@type": "Organization",
    name: "Durza",
    url: "https://durza.in",
    logo: { "@type": "ImageObject", url: "https://durza.in/logo.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
};

const CHECK_ROWS = [
  {
    check: "Eligible card family",
    where: "Offer terms / eligible cards list",
    risk: "Bank name matches, but your exact RBL variant is excluded.",
  },
  {
    check: "Minimum net transaction",
    where: "Offer terms and payment summary",
    risk: "Coupon, exchange or excluded items push the net below the threshold.",
  },
  {
    check: "Cap and usage limit",
    where: "Offer terms",
    risk: "Per-card/per-campaign cap is exhausted; discount does not apply.",
  },
  {
    check: "Channel and payment mode",
    where: "Offer terms",
    risk: "App-only, web-only, full-swipe-only or EMI-excluded campaigns fail silently.",
  },
  {
    check: "Final discount line",
    where: "Payment page before confirmation",
    risk: "If the line is missing, the discount is not being applied.",
  },
];

export default async function RblBankOffersPage() {
  const snapshot = await fetchLiveBankSnapshot();
  const rblGroup = snapshot.groups.find((group) => group.bank.id === "rbl");
  const liveCount = rblGroup?.coupons.length ?? 0;

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
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Checked 26 Nov 2026 · Live panel reads from Durza&apos;s catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          RBL Bank Offers in India (2026)
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          RBL offers are usually campaign-specific: useful when your card, merchant and cart value line up, easy to miss when one condition fails. This page shows live RBL-named offers we can read, then gives you the checks that matter before you pay.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Use this page if</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• You have an RBL card and want to see whether any live offer matches your cart.</li>
              <li>• You need a quick eligibility checklist before trusting a bank-offer banner.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Be careful if</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• You are adding filler items just to cross a minimum spend.</li>
              <li>• You are assuming a co-brand, EMI or app-only payment will qualify without checking terms.</li>
            </ul>
          </div>
        </div>

        <EditorialByline
          authorName="Harsh Bansal"
          publishedAt="2026-11-15"
          updatedAt="2026-11-26"
          checkedAt="2026-11-26"
          hasMethod
        />

        <QuickAnswer
          question="Should you use an RBL offer right now?"
          answer={
            liveCount > 0
              ? `${liveCount} RBL offer${liveCount === 1 ? "" : "s"} ${liveCount === 1 ? "is" : "are"} currently readable in Durza's catalogue. Open the specific offer, confirm your card variant and minimum spend, then only trust the discount line shown on the payment page.`
              : "No RBL offers are currently readable in Durza's catalogue. That can change quickly during campaigns, so check the live panel below and confirm any merchant banner on the payment page before paying."
          }
          jumpHref="#live"
          jumpLabel="See live RBL offers"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#live" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Jump to live offers <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/bank-offers" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare all banks <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/guides/best-credit-card-online-shopping-india-2026" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Card selection guide <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div id="live" className="mt-10">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={["rbl"]}
            heading="Live RBL Bank offers"
            asOfLabel="Read live from Durza’s coupon catalogue. Open the offer for eligible card families, minimum spend, caps and exclusions — the banner alone is not enough."
          />
        </div>

        <section aria-labelledby="checks" className="mt-12">
          <h2 id="checks" className="font-serif text-2xl font-extrabold text-ink">The five checks that decide whether RBL works</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            RBL discounts usually fail for a boring reason, not a mysterious one. Run these checks before you change your cart to chase an offer.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Check</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Where to verify</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Common failure</th>
                </tr>
              </thead>
              <tbody>
                {CHECK_ROWS.map((row) => (
                  <tr key={row.check} className="border-t border-ledger-line align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.check}</th>
                    <td className="px-4 py-3 text-ink-soft">{row.where}</td>
                    <td className="px-4 py-3 text-ink-soft">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="worked" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Illustrative maths</p>
          <h2 id="worked" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">When chasing a minimum spend backfires</h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">
            Example only — not a live RBL offer. The point is to show how the net payable amount can stay the same after you add filler.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• <strong>Inputs:</strong> cart ₹9,200; RBL offer 10% up to ₹1,000 on minimum ₹10,000; filler item ₹800.</li>
            <li>• <strong>Without filler:</strong> no discount qualifies; you pay ₹9,200.</li>
            <li>• <strong>With filler:</strong> cart becomes ₹10,000; 10% discount is ₹1,000; you pay ₹9,000 but you also bought ₹800 of unwanted goods.</li>
            <li>• <strong>Net result:</strong> you spent ₹9,800 total value for items you wanted plus filler, versus ₹9,200 for what you actually needed. The discount only helped if the ₹800 item was already planned.</li>
          </ul>
        </section>

        <section aria-labelledby="how" className="mt-12">
          <h2 id="how" className="font-serif text-2xl font-extrabold text-ink">How RBL instant discounts usually apply</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-ink-soft">
            <li>Build the cart and apply any merchant coupon that is allowed by the campaign.</li>
            <li>On the payment page, select the eligible RBL card or payment mode named in the offer.</li>
            <li>Check the discount line before confirming. If it is missing, do not assume it will appear after payment.</li>
            <li>Save the payment summary for high-value purchases, especially when caps or exclusions are involved.</li>
          </ol>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-amber-700" strokeWidth={2} />
            <p className="text-sm leading-6 text-amber-900">
              A bank-name match is not enough. The payment gateway decides eligibility using the campaign rules, your card variant, and the final qualifying amount.
            </p>
          </div>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We checked Durza&apos;s live bank-offer catalogue for RBL-named offers on 26 November 2026 and reviewed the common campaign-rule patterns used across bank instant-discount terms. We did not verify a live RBL checkout for every merchant, card variant or city. Campaign caps, eligible card families and minimum spends can change without notice. Durza may earn a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <div className="mt-10">
          <VerifiedResearchPanel kind="bank" />
        </div>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Related guides</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/bank-offers", label: "All live bank & card offers" },
              { href: "/guides/icici-bank-offers-india-2026", label: "ICICI Bank offers guide" },
              { href: "/guides/best-credit-card-online-shopping-india-2026", label: "Best credit card for online shopping in India" },
              { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-start gap-1.5 text-sm text-durza-deep hover:underline">
                  <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-white">
            {FAQS.map((faq) => (
              <div key={faq.question} className="p-5">
                <h3 className="font-serif text-lg font-bold leading-snug text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-ink-soft">
          <p className="font-semibold text-ink">Editorial note</p>
          <p className="mt-1">
            Checked 26 Nov 2026. RBL offer availability, eligible cards and caps change by campaign. The live panel reads Durza&apos;s catalogue; the merchant payment page remains the final source of truth.
          </p>
        </div>
      </article>
    </>
  );
}
