import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, CheckCircle2, AlertTriangle, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 3600;

const title = "ICICI Bank Offers in India (2026): Live Discounts, Card Eligibility and Maths";
const description =
  "Live ICICI-named offers from Durza's catalogue, plus card-family eligibility, minimum-spend traps and worked checkout maths. Checked 26 Nov 2026.";
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
      "Usually yes. The store sale price applies first, and the bank instant discount is evaluated at payment on the eligible net amount. The exceptions matter: some campaigns exclude EMI, certain categories, or carts that fall below the minimum after coupon/exchange. If the payment page does not show the discount line, do not assume it will appear later.",
  },
  {
    question: "Why did my ICICI discount not apply?",
    answer:
      "The most common reasons are card-family ineligibility, minimum spend not met on the net amount, campaign cap exhausted, or a payment mode excluded by the terms. A banner that says 'ICICI Bank cards' can still exclude specific variants or co-brand cards.",
  },
  {
    question: "Is Amazon Pay ICICI the same as a regular ICICI card for offers?",
    answer:
      "No. Amazon Pay ICICI is a co-brand card with its own cashback rules. Amazon's help pages have stated 5% cashback on Amazon.in for eligible Prime members, including Shopping Edition members, and 3% for non-Prime members; verify the current rate on Amazon's help page before relying on it. Co-brand cards are often excluded from core ICICI instant-discount banners.",
  },
  {
    question: "Do ICICI offers work the same on app and website?",
    answer:
      "Often yes, because the gateway applies the bank rule at payment. But some campaigns are channel-specific. Check the offer terms and confirm the discount line in the channel you are actually using.",
  },
  {
    question: "Should I pick instant discount or cashback?",
    answer:
      "For a one-time eligible cart, an instant discount is usually easier to value because it reduces what you pay now. Cashback can be better when no instant-discount slab is live, but only if you understand the earn rate, exclusions and redemption. Compare the final payable/effective cost, not the headline percentage alone.",
  },
];

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

const FACTORS = [
  {
    title: "Card family comes before the bank name",
    winner: "Winner: the exact eligible ICICI variant named in the offer",
    number: "Co-brand cards are often excluded from core ICICI instant-discount banners",
    detail: "Check the eligible-card list. Credit, debit, EMI and co-brand cards can be treated as different campaigns.",
  },
  {
    title: "Net cart value after discounts",
    winner: "Winner: keep the qualifying net amount above the minimum spend",
    number: "A ₹500 coupon can drop a ₹5,400 cart below a ₹5,000 slab",
    detail: "The gateway evaluates the qualifying amount after exclusions. Falling below the threshold usually removes the whole discount.",
  },
  {
    title: "Instant discount vs co-brand cashback",
    winner: "Winner: instant discount on a large eligible cart",
    number: "Illustrative: ₹2,400 off now beats ₹1,200 later on a ₹24,000 cart",
    detail: "Cashback is real, but it is delayed and conditional. Use it when no eligible instant-discount slab is live.",
  },
  {
    title: "Cap and campaign exhaustion",
    winner: "Winner: check the cap before assuming the headline applies to your full cart",
    number: "Caps are commonly per card / per campaign / per period",
    detail: "A 10% offer with a cap behaves very differently on a ₹20,000 cart and a ₹60,000 cart.",
  },
  {
    title: "Payment mode and channel",
    winner: "Winner: full swipe when the campaign requires it",
    number: "EMI, wallet, gift card or app-only restrictions can void the offer",
    detail: "Read the payment-mode exclusions before you change your checkout flow.",
  },
  {
    title: "The payment-page discount line",
    winner: "Winner: the amount shown before you confirm payment",
    number: "No discount line = no discount",
    detail: "Screenshots and banners do not override the payment summary.",
  },
];

const EXPLORE_LINKS = [
  { href: "/bank-offers", label: "Live multi-bank instant-discount matrix" },
  { href: "/guides/best-credit-card-online-shopping-india-2026", label: "Which credit card is best for online shopping in India?" },
  { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
  { href: "/guides/rbl-bank-offers-india-2026", label: "RBL Bank offers guide" },
  { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
  { href: "/stores/amazon-in", label: "Amazon India store hub" },
];

export default async function IciciBankOffersPage() {
  const snapshot = await fetchLiveBankSnapshot();
  const iciciGroup = snapshot.groups.find((group) => group.bank.id === "icici");
  const liveCount = iciciGroup?.coupons.length ?? 0;

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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "ICICI Bank Offers India 2026", path: canonical },
        ])}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Checked 26 Nov 2026 · Live ICICI offers read from Durza&apos;s catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          ICICI Bank Offers in India (2026)
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          The useful question is not “Is there an ICICI offer?” but “Does my exact ICICI card qualify on this cart, after coupon and payment mode?” This page keeps those checks in front of the live offer list.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Good fit</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• You have an ICICI credit/debit/co-brand card and want to check live campaign eligibility.</li>
              <li>• You want to compare instant discount against co-brand cashback before paying.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Not enough on its own</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• A banner screenshot without the eligible-card list, minimum spend and cap.</li>
              <li>• EMI or wallet checkout where the campaign requires a full card swipe.</li>
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
          question="Which ICICI offer should you use right now?"
          answer={
            liveCount > 0
              ? `${liveCount} ICICI offer${liveCount === 1 ? "" : "s"} ${liveCount === 1 ? "is" : "are"} readable in Durza's catalogue. Use an eligible core ICICI card when the payment page shows a live instant-discount line; use Amazon Pay ICICI for Amazon.in cashback only when that gives the better effective value.`
              : "No ICICI instant-discount offers are currently readable in Durza's catalogue. If you are buying on Amazon.in, compare Amazon Pay ICICI cashback against any live merchant/card offer before paying."
          }
          jumpHref="#live-offers"
          jumpLabel="See live ICICI offers"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#live-offers" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Jump to live offers <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/bank-offers" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare all banks <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-icici-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Check Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div id="live-offers" className="mt-10">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={["icici"]}
            heading="Live ICICI offers"
            asOfLabel="Read live from Durza’s catalogue. Confirm eligible card family, minimum spend, cap and payment mode on the offer before paying."
          />
        </div>

        <section aria-labelledby="families" className="mt-12">
          <h2 id="families" className="font-serif text-2xl font-extrabold text-ink">ICICI card families: different products, different offer behavior</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Card family</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Typical role</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">What to verify</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Core ICICI credit cards", "Often the main eligible group for merchant instant-discount banners", "Exact eligible variants, minimum spend, cap, EMI exclusion and channel."],
                  ["Amazon Pay ICICI (co-brand)", "Cashback card; commonly excluded from core ICICI instant-discount banners", "Current Amazon cashback rate, Prime/non-Prime status, and whether EMI forfeits cashback."],
                  ["ICICI debit cards", "Appear in selected campaigns, less consistently than credit cards", "Eligible variants, higher minimum spend, lower cap and category restrictions."],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-ledger-line align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{row[0]}</th>
                    <td className="px-4 py-3 text-ink-soft">{row[1]}</td>
                    <td className="px-4 py-3 text-ink-soft">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-5 text-ink-soft">
            Amazon Pay ICICI cashback rates referenced here are based on Amazon India help-page claims previously checked on 24 Nov 2026; verify the current rate on Amazon before applying.
          </p>
        </section>

        <section aria-labelledby="worked" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Worked maths</p>
          <h2 id="worked" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">Two ICICI checkout scenarios</h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">Illustrative arithmetic. Not live offers or guaranteed eligibility.</p>
          <h3 className="mt-6 font-serif text-lg font-bold text-ink">1. Instant discount vs co-brand cashback</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: ₹24,000 cart; core ICICI 10% instant discount up to ₹2,500; Amazon Pay ICICI 5% cashback.</li>
            <li>• Core ICICI: 10% × ₹24,000 = ₹2,400 off now → ₹21,600 payable.</li>
            <li>• Amazon Pay ICICI: 5% × ₹24,000 = ₹1,200 later → ₹22,800 effective after cashback, if eligible and redeemed.</li>
            <li>• Result: instant discount wins by ₹1,200 on this example, assuming the core card is eligible and the co-brand card is excluded from the banner.</li>
          </ul>
          <h3 className="mt-7 font-serif text-lg font-bold text-ink">2. Minimum spend after a coupon</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: item ₹5,400; coupon ₹500; ICICI 10% instant discount on ₹5,000 minimum net spend.</li>
            <li>• Net cart after coupon: ₹4,900. The slab is missed by ₹100.</li>
            <li>• You pay ₹4,900, not ₹4,410. The discount is lost entirely unless the offer terms say otherwise.</li>
          </ul>
        </section>

        <section aria-labelledby="factors" className="mt-12">
          <h2 id="factors" className="font-serif text-2xl font-extrabold text-ink">Six checks before you pick the ICICI card</h2>
          <div className="mt-5 space-y-4">
            {FACTORS.map((factor) => (
              <div key={factor.title} className="rounded-2xl border border-ledger-line bg-white p-4">
                <h3 className="font-serif font-bold text-ink">{factor.title}</h3>
                <p className="mt-1 text-sm font-semibold text-durza-deep">{factor.winner}</p>
                <p className="mt-1 text-sm text-ink-soft">{factor.number}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{factor.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="gates" className="mt-12">
          <h2 id="gates" className="font-serif text-2xl font-extrabold text-ink">If the discount is missing, check these first</h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Card variant: the offer may exclude co-brand, debit, corporate or specific credit-card families.",
              "Net amount: coupons, exchange, gift cards or excluded items can reduce the qualifying value.",
              "Mode/channel: EMI, app-only, web-only or full-swipe rules are enforced at the gateway.",
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
              Do not confirm payment expecting the discount to appear on the statement. If the payment summary does not show it, switch card or accept the full price.
            </p>
          </div>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We read ICICI-named offers from Durza&apos;s live catalogue on 26 November 2026. Amazon Pay ICICI cashback rates were previously checked against Amazon India help pages on 24 November 2026 and should be rechecked on Amazon before use. The worked examples are illustrative arithmetic, not bank guarantees. We did not test every ICICI variant or merchant checkout. Durza may earn a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <div className="mt-10">
          <VerifiedResearchPanel kind="bank" />
        </div>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Related guides</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {EXPLORE_LINKS.map((link) => (
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
            Checked 26 Nov 2026. ICICI offer availability, eligible card families and caps change by campaign. The live panel reads Durza&apos;s catalogue; the merchant payment page and issuer terms remain the final source of truth.
          </p>
        </div>
      </article>
    </>
  );
}
