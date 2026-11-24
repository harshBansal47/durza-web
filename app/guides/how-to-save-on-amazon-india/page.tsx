import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

const title = "How to Save on Amazon India: Coupons, Bank Offers & Exchange Deals";
const description =
  "A repeatable Amazon India checkout order: deal price, clipped coupon, exchange check, bank instant discount or co-branded cashback. Worked examples with all inputs shown. Reviewed 24 Nov 2026.";
const canonical = "/guides/how-to-save-on-amazon-india";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: absoluteUrl(canonical), type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Do Amazon clip coupons and bank offers combine?",
    answer:
      "Often, yes — the clip coupon reduces the item price at cart level and the bank instant discount applies at payment. But the bank slab has a minimum net transaction value, so a large exchange credit can push the cart below that threshold and void the bank offer. Read the payment summary with each option selected.",
  },
  {
    question: "Is the exchange offer worth it?",
    answer:
      "Only if the exchange credit beats what you would get by selling the old device yourself, and only if applying it does not disqualify a larger bank discount. Compare the final payable amount with and without exchange on the payment page.",
  },
  {
    question: "When is the best time to shop on Amazon India?",
    answer:
      "The Great Indian Festival and Prime Day typically carry the deepest bank slabs and exchange bonuses, but prices are often inflated before the sale. Track the price for a few weeks and compare against Flipkart before paying. Our Black Friday vs regular sales comparison explains the pattern.",
  },
  {
    question: "Does no-cost EMI really cost nothing?",
    answer:
      "Not necessarily. Banks may charge GST on the discounted interest component and a processing fee, and choosing EMI can make you ineligible for a flat instant discount. In our illustrative scenario, a full-card swipe with a ₹3,000 instant discount worked out cheaper than a no-cost EMI that kept the discount off the table.",
  },
  {
    question: "How do I know if a bank offer applied?",
    answer:
      "The payment page must show a separate discount line before you click Pay. If the line is missing after you select a card or EMI, the offer has not applied — do not assume it will be adjusted later.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-10-18",
  dateModified: "2026-11-24",
  author: { "@type": "Person", name: "Harsh Bansal", url: absoluteUrl("/about") },
  publisher: {
    "@type": "Organization",
    name: "Durza",
    url: "https://durza.in",
    logo: { "@type": "ImageObject", url: "https://durza.in/logo.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
};

const EXPLORE_LINKS = [
  { href: "/categories/finance", label: "Finance & Cards deals and card guides" },
  { href: "/bank-offers", label: "Credit Card & Bank Instant Discount Offers India" },
  { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant Bank Discount vs No-Cost EMI: hidden GST & fees" },
  { href: "/compare/amazon-vs-flipkart-electronics-2026", label: "Amazon India vs Flipkart: returns, OBD & bank offers" },
  { href: "/reviews/amazon-prime-india-review-2026", label: "Amazon Prime India review: ₹399 vs ₹1,499" },
  { href: "/guides/amazon-finance-card-smarts-buying-guide", label: "Amazon finance & card smarts" },
  { href: "/stores/amazon-in", label: "Amazon India coupons & deals" },
  { href: "/stores/flipkart", label: "Flipkart coupons & store hub" },
];

const FACTORS = [
  {
    heading: "1. Deal price vs list price — Winner: track the deal, not the MRP",
    body: "Sale banners often sit on top of an inflated list price. Compare the current price against a few weeks of history before treating a deal as a saving.",
  },
  {
    heading: "2. Product clip coupon — Winner: clip before checkout",
    body: "Amazon India mostly uses a product-page checkbox rather than a public text code. A ₹1,500 clip coupon is a direct cart-level deduction — but it only helps if it is actually applied.",
  },
  {
    heading: "3. Bank instant discount — Winner: core bank 10% slabs where eligible",
    body: "A 10% instant discount capped at ₹5,000 on a ₹25,000 minimum spend beats most coupon-level savings. Check whether your card is in the active slab that day.",
  },
  {
    heading: "4. Co-branded cashback — Winner: Amazon Pay ICICI for everyday spends",
    body: "Amazon Pay ICICI advertises 5% cashback for Prime members on Amazon.in. It is routinely excluded from core-bank 10% instant-discount banners — compare both rather than assuming they stack.",
  },
  {
    heading: "5. Exchange — Winner: only when it beats a self-sale",
    body: "Exchange credits are convenient but often below what a private sale yields. More importantly, a large exchange can drop the net cart below the bank offer's minimum spend.",
  },
  {
    heading: "6. Full swipe vs no-cost EMI — Winner: full swipe when a flat discount is at stake",
    body: "GST on discounted interest plus a processing fee can add a few hundred rupees, and EMI may disqualify the instant discount entirely. Use EMI for cash flow, not as a saving.",
  },
];

export default function HowToSaveOnAmazonPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "How to save on Amazon India", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "How to save on Amazon India", path: canonical },
      ])} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-verified-ink">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Research reviewed 24 Nov 2026 · Illustrative maths, not live offers</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Amazon India rarely uses public text promo codes. The real savings live in product-page clip coupons, payment-page bank slabs and exchange offers — and the order you apply them changes the final payable amount.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Who it is for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Shoppers buying electronics, appliances or household staples who want one repeatable checkout order.</li>
              <li>• Cardholders choosing between a core-bank 10% slab, Amazon Pay ICICI cashback and no-cost EMI.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Buyers hunting for third-party “secret codes” — Amazon mostly uses clip checkboxes and bank slabs.</li>
              <li>• Single-item buyers under ₹499 without Prime: ₹40–₹100 shipping can erase a small coupon saving.</li>
            </ul>
          </div>
        </div>

        <EditorialByline
          authorName="Harsh Bansal"
          publishedAt="2026-10-18"
          updatedAt="2026-11-24"
          checkedAt="2026-11-24"
          hasMethod
        />

        <QuickAnswer
          question="What is the exact stacking order on Amazon India?"
          answer="Deal price → product clip coupon → exchange (only after checking the post-exchange total still clears the bank offer's minimum spend) → bank instant discount at payment, or Amazon Pay ICICI cashback if no instant slab is active. Verify the separate discount lines before clicking Pay."
          jumpHref="#worked-math"
          jumpLabel="See the worked maths"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/go/amazon-in?src=guide-amazon-save-verdict" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Check live deals on Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/bank-offers" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare live bank slabs <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section aria-labelledby="factors" className="mt-12">
          <h2 id="factors" className="font-serif text-2xl font-extrabold text-ink">Six decisions that decide your final payable amount</h2>
          <div className="mt-4 space-y-5">
            {FACTORS.map((factor) => (
              <div key={factor.heading} className="rounded-2xl border border-ledger-line bg-white p-5">
                <h3 className="font-serif text-lg font-bold text-ink">{factor.heading}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{factor.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="worked-math" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Worked maths</p>
          <h2 id="worked-math" className="mt-2 font-serif text-2xl font-extrabold text-ink">
            Two checkout scenarios, with all inputs shown
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            These are illustrative arithmetic, not live offers. Every number below is an input we chose to show the order of operations.
          </p>

          <h3 className="mt-6 font-serif text-lg font-bold text-ink">Scenario A — coupon, bank slab and exchange</h3>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Inputs: listed price ₹54,999 → sale price ₹49,999 → clip coupon ₹1,500 → bank 10% instant discount capped at ₹5,000 with a ₹25,000 minimum net transaction.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Clip coupon: ₹49,999 − ₹1,500 = ₹48,499 subtotal.</li>
            <li>• Bank discount: 10% × ₹48,499 = ₹4,849 (below the ₹5,000 cap). Net payable = ₹43,650.</li>
            <li>• Add a ₹6,000 exchange: post-exchange subtotal ₹42,499, bank discount becomes ₹4,249, net payable ₹38,250 — the slab still applies because the total clears ₹25,000.</li>
            <li>• But a ₹25,000 exchange drops the post-exchange total to ₹23,499. Below the minimum, the payment page may remove the entire bank discount. Check the summary.</li>
          </ul>

          <h3 className="mt-8 font-serif text-lg font-bold text-ink">Scenario B — full swipe vs “no-cost” EMI</h3>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Inputs: ₹40,000 laptop, 6-month no-cost EMI at 16% p.a. reducing balance (≈₹1,880 discounted interest), ₹299 processing fee, 18% GST on interest and fees, versus a ₹3,000 flat instant discount on full card payment.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Full swipe: ₹40,000 − ₹3,000 = ₹37,000 payable today.</li>
            <li>• EMI: ₹40,000 principal + ≈₹338 GST on interest + ≈₹353 (₹299 fee + 18% GST) = ≈₹40,691, and the ₹3,000 instant discount is typically not available on EMI.</li>
            <li>• Difference: ≈₹3,691 more on EMI. Use EMI for cash flow, not as a saving. Confirm your bank&apos;s exact fee treatment on the statement.</li>
          </ul>
        </section>

        <section aria-labelledby="exclusions" className="mt-12">
          <h2 id="exclusions" className="font-serif text-2xl font-extrabold text-ink">What does not stack on Amazon India</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
            {[
              "Co-branded cards vs core bank banners: Amazon Pay ICICI cashback is routinely excluded from ICICI 10% instant-discount banners.",
              "Amazon Pay Gift Card balance: paying partly or fully with gift-card balance usually voids bank instant-discount eligibility.",
              "Two bank offers at once: an instant discount and a separate bank cashback offer generally cannot be combined on one transaction.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-verified-ink" strokeWidth={2} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            A 25 Nov 2026 evidence pass confirmed Amazon&apos;s plan pages and checkout mechanics, but the only supplied bank-offer terms page documenting an SBI 10% slab lists a validity window of 10–14 June 2023. That campaign is historical and is not presented here as a live offer. Both scenarios are illustrative arithmetic built to show the order of operations — not live product quotes. We have not verified today&apos;s bank slab on your specific SKU or pincode. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link>
          </p>
        </section>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Explore related savings</h2>
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

        <section aria-labelledby="faqs" className="mt-12">
          <h2 id="faqs" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-ledger-line bg-white p-4">
                <summary className="cursor-pointer text-base font-semibold text-ink">{faq.question}</summary>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-ink-soft">
          <p className="font-semibold text-ink">Editorial note</p>
          <p className="mt-1">
            First published 18 Oct 2026. Research reviewed 24 Nov 2026. Bank slabs, exchange values and coupon eligibility change constantly — the payment summary is the only source of truth for what you actually pay. We do not fabricate codes or claim a discount we have not seen accepted at checkout.
          </p>
        </div>
      </article>
    </>
  );
}
