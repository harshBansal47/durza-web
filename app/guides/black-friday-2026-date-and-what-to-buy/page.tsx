import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

const canonical = "/guides/black-friday-2026-date-and-what-to-buy";
const title = "Black Friday 2026: Date and What to Buy on Amazon India";
const description =
  "Black Friday 2026 falls on Friday 27 November. Amazon India's exact sale window is not confirmed — here is how published bank slabs work, what is worth waiting for, and live CTAs. Reviewed 24 Nov 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const OFFER_SOURCES = [
  {
    label: "Amazon.in Bank offer terms — Home & Kitchen",
    href: "https://www.amazon.in/b?node=85183825031",
    note: "Checked 20 Oct 2026 · 10% instant discount with SBI credit card, ₹10,000 minimum cart, ₹1,000 cap per card.",
  },
  {
    label: "Amazon.in Exchange Offer Terms & Conditions",
    href: "https://www.amazon.in/gp/help/customer/display.html?nodeId=202110920",
    note: "Checked 20 Oct 2026 · exchange credit rules and eligibility.",
  },
];

const FAQS = [
  {
    question: "When is Black Friday 2026 in India?",
    answer:
      "Black Friday 2026 falls on Friday, 27 November 2026. Amazon India has not published a confirmed sale start/end window for that date; any exact hours you see before the live banner appears should be treated as expected, not confirmed. Check the product page and the bank offer terms before planning a purchase around it.",
  },
  {
    question: "Are the Amazon-SBI discounts on this page Black Friday 2026 offers?",
    answer:
      "No. They are real published terms from Amazon India's October 2026 Amazon-SBI campaign, used here as a structural benchmark for how bank slabs work. The 10% rate, ₹4,990/₹2,490 minimums and ₹1,000–₹1,500 caps are from that checked offer page, not a confirmed Black Friday 2026 campaign. Confirm the live slabs when Amazon publishes them.",
  },
  {
    question: "What is worth waiting for on Black Friday?",
    answer:
      "High-ticket categories where a flat bank cap plus exchange credit matters: laptops above ₹45,000, 43-inch and larger 4K TVs, large Home & Kitchen appliance sets, and exchange-eligible phones. Everyday groceries and fashion basics rarely see savings that beat the minimum-spend and cap rules.",
  },
  {
    question: "Do bank instant discounts work with EMI?",
    answer:
      "Not usually. The published Amazon-SBI terms exclude debit cards and both credit and debit EMI transactions. A full card swipe is typically required for the instant discount. If you need EMI for cash flow, check whether the offer explicitly allows it and account for processing fees and GST on interest.",
  },
  {
    question: "Does Amazon Pay balance count toward the minimum spend?",
    answer:
      "Check the specific offer terms. Many bank instant-discount campaigns exclude gift-card or Amazon Pay balance payments from the qualifying transaction value, and exchange credit can reduce the net amount the bank sees. The payment summary is the only reliable confirmation.",
  },
  {
    question: "Did Durza verify live Black Friday 2026 prices?",
    answer:
      "No. We verified published Amazon India policy pages on 20 Oct 2026 and re-audited this guide on 24 Nov 2026. We have not verified stock, live product prices or today's active bank quotas. Prices and offers change on the merchant side; the checkout page is the source of truth.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-14",
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
  { href: "/compare/black-friday-2026-india-best-deals-vs-regular-sale", label: "Black Friday vs regular sales: what actually drops" },
  { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant bank discount vs No-Cost EMI" },
  { href: "/compare/amazon-vs-flipkart-electronics-2026", label: "Amazon India vs Flipkart: returns, OBD and bank offers" },
  { href: "/guides/cyber-monday-2026-india-electronics-home-gifts", label: "Cyber Monday 2026 India guide" },
  { href: "/categories/finance", label: "Finance & Cards deals and guides" },
  { href: "/bank-offers", label: "Live bank & card instant discounts" },
  { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
  { href: "/stores/amazon-in", label: "Amazon India store hub" },
  { href: "/stores/flipkart", label: "Flipkart store hub" },
];

export default function BlackFridayDatePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Black Friday 2026 date and what to buy", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "Black Friday 2026 date and what to buy", path: canonical },
      ])} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Published 14 Nov 2026 · Research reviewed 24 Nov 2026 · Sale window not yet confirmed</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Black Friday 2026 is Friday, 27 November. Amazon India has not confirmed its exact sale window — but published bank terms show the shape of the discounts. Here is what to plan for, and where to check live prices.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Who it is for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Planners with a target SKU and a price-history baseline for phones, laptops, TVs or appliances.</li>
              <li>• Buyers with an eligible core bank credit card and a working, scratch-free device to exchange.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Impulse browsers without a target price — MRP inflation and minimum-spend traps erase small discounts.</li>
              <li>• Shoppers buying groceries, fashion basics or EMI-only carts where instant bank offers are excluded.</li>
            </ul>
          </div>
        </div>

        <EditorialByline
          authorName="Harsh Bansal"
          publishedAt="2026-11-14"
          updatedAt="2026-11-24"
          checkedAt="2026-11-24"
          hasMethod
        />

        <QuickAnswer
          question="Is Black Friday 2026 on Amazon India worth waiting for?"
          answer="Worth planning for on laptops above ₹45,000, 43-inch+ 4K TVs, large appliances and exchange-eligible phones, where a bank cap plus exchange credit can save thousands. Skip it for everyday groceries and fashion basics. The calendar date is 27 November 2026, but Amazon's exact sale window is not confirmed."
          jumpHref="#worked-math"
          jumpLabel="See the worked cart maths"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/go/amazon-in?src=guide-bf2026-verdict" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Check live Black Friday deals on Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-bf2026-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare prices on Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/black-friday" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Open the Black Friday hub <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section aria-labelledby="terms" className="mt-12">
          <h2 id="terms" className="font-serif text-2xl font-extrabold text-ink">
            One published Amazon-SBI offer, broken down
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            These are real terms from Amazon India&apos;s October 2026 Amazon-SBI campaign, checked 20 Oct 2026. They are a structural benchmark — not a confirmed Black Friday 2026 offer.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Term</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Published figure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Instrument", "SBI credit card only — debit cards and credit/debit EMI excluded"],
                  ["Minimum spend — mobiles", "₹4,990 (varies by campaign day)"],
                  ["Minimum spend — other categories", "₹2,490 (varies by campaign)"],
                  ["Instant discount", "10% with tier caps of ₹1,000 / ₹1,250 / ₹1,500 on mobiles; ₹1,500 on other categories per card"],
                  ["Additive bonus slabs", "₹14,990+ ₹250 · ₹24,990+ ₹500 · ₹29,990+ ₹500 · ₹34,990+ ₹750 · ₹49,990+ ₹1,000"],
                  ["Home & Kitchen example", "10% with SBI credit card, ₹10,000 minimum cart, ₹1,000 cap per card (source node 85183825031)"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-ledger-line">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{row[0]}</th>
                    <td className="px-4 py-3 text-ink-soft">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="worked-math" className="mt-10 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Worked maths</p>
          <h2 id="worked-math" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
            How a big-ticket cart could stack
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">
            Illustrative arithmetic using the published October 2026 structure above — not a Black Friday 2026 quote.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: laptop sale price ₹52,000, clip coupon ₹2,000, eligible cart ₹50,000; SBI full swipe with ₹1,500 capped instant discount plus the ₹1,000 additive slab on ₹49,990+; exchange credit ₹8,000.</li>
            <li>• Step 1: ₹52,000 − ₹2,000 = ₹50,000, clearing the ₹49,990 bonus tier.</li>
            <li>• Step 2: ₹1,500 capped discount + ₹1,000 additive slab = ₹2,500 off.</li>
            <li>• Step 3: exchange credit ₹8,000, assuming the post-exchange net still satisfies the campaign terms.</li>
            <li>• Net payable: ₹50,000 − ₹2,500 − ₹8,000 = ₹39,500. Total saving ₹12,500 against the ₹52,000 sale price, with no EMI fee because this was a full swipe.</li>
          </ul>
        </section>

        <section aria-labelledby="mid-cta" className="mt-10">
          <h2 id="mid-cta" className="font-serif text-xl font-extrabold text-ink">Compare live prices before paying</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link href="/go/amazon-in?src=guide-bf2026-mid" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
              Check live deals &amp; bank terms on Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/go/flipkart?src=guide-bf2026-mid" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
              Compare same-SKU prices &amp; exchange on Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section aria-labelledby="costs" className="mt-12">
          <h2 id="costs" className="font-serif text-2xl font-extrabold text-ink">What Black Friday actually costs you</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
            {[
              "Minimum spends are calculated after exclusions — a cart that looks eligible may not be.",
              "Caps are per card and often per campaign; a large discount rarely scales with a very large cart.",
              "Bank instant discounts usually exclude EMI, and gift-card or Amazon Pay balance payments may not qualify.",
              "Exchange credit is convenient but below a private sale in many cases — and it can reduce the net total below a bank slab.",
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
            We verified Amazon India&apos;s published Exchange Offer Terms and Amazon-SBI Bank Offer Terms on 20 Oct 2026 and re-audited this guide on 24 Nov 2026. The slabs in the table are real published figures used as a structural benchmark; Amazon India has not confirmed identical terms or exact hours for Black Friday 2026, which falls on Friday 27 November. We have not verified live stock, prices or your card&apos;s active quota. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <div className="mt-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Sources</p>
            <ul className="mt-2 space-y-2">
              {OFFER_SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-durza-deep hover:underline">
                    {source.label} ↗
                  </a>
                  <p className="text-xs leading-5 text-ink-soft">{source.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <section aria-labelledby="check-live" className="mt-10">
          <h2 id="check-live" className="font-serif text-2xl font-extrabold text-ink">Check live Black Friday 2026 offers</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/go/amazon-in?src=guide-bf2026-bottom" className="group rounded-2xl border border-ledger-line bg-white p-5 transition hover:border-ink/30">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Amazon India</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">Best for 43-inch+ 4K TVs, WFH laptops, large appliances and predictable no-exchange bank slabs.</p>
              <p className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-durza-deep group-hover:underline">Check live offers on Amazon India <ArrowRight aria-hidden="true" className="h-4 w-4" /></p>
            </Link>
            <Link href="/go/flipkart?src=guide-bf2026-bottom" className="group rounded-2xl border border-ledger-line bg-white p-5 transition hover:border-ink/30">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Flipkart</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">Best for sub-₹25,000 smartphones and exchange-heavy upgrades with open-box inspection.</p>
              <p className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-durza-deep group-hover:underline">Check live offers on Flipkart <ArrowRight aria-hidden="true" className="h-4 w-4" /></p>
            </Link>
          </div>
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

        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-ledger-line bg-white p-4">
                <summary className="cursor-pointer text-base font-semibold text-ink">{faq.question}</summary>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs leading-5 text-ink-soft">
          Editorial note: sale dates, bank slabs and stock change frequently. We do not claim a date or discount we have not verified on a live store page. Using our tracked links may earn us a commission at no extra cost to you.
        </div>
      </article>
    </>
  );
}
