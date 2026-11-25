import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, ArrowRight, ArrowUpRight, CalendarClock, CircleAlert } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

const canonical = "/guides/black-friday-2026-date-and-what-to-buy";
const title = "Black Friday 2026 in India: Date, Amazon Sale Window and What to Buy";
const description =
  "Amazon India says its Black Friday Sale starts 27 November 2026. Here is what is confirmed, what is still unannounced, and how to judge bank offers, exchange and big-ticket carts. Checked 26 Nov 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const OFFER_SOURCES = [
  {
    label: "Amazon India News — Black Friday Sale 2026 starts 27 November",
    href: "https://www.aboutamazon.in/news/retail/amazon-black-friday-sale-india",
    note: "Checked 26 Nov 2026. Amazon states the sale starts on 27 November 2026 and says deals will be announced closer to the sale.",
  },
  {
    label: "Amazon.in Bank offer terms — Home & Kitchen",
    href: "https://www.amazon.in/b?node=85183825031",
    note: "Checked 20 Oct 2026. Example campaign: 10% instant discount with SBI credit card, ₹10,000 minimum cart, ₹1,000 cap per card. Historical benchmark, not a confirmed Black Friday 2026 slab.",
  },
  {
    label: "Amazon.in Exchange Offer Terms & Conditions",
    href: "https://www.amazon.in/gp/help/customer/display.html?nodeId=202110920",
    note: "Checked 20 Oct 2026. Exchange credit rules and eligibility; final value depends on the device, condition checks and live listing terms.",
  },
];

const FAQS = [
  {
    question: "When is Black Friday 2026 in India?",
    answer:
      "Black Friday 2026 falls on Friday, 27 November 2026. Amazon India has said its Black Friday Sale starts on 27 November 2026, but as of 26 November 2026 it had not published the full deal list or a confirmed end time on that announcement page. Check the live Amazon page and the payment screen before planning around a specific offer.",
  },
  {
    question: "Has Amazon India confirmed Black Friday 2026 bank offers?",
    answer:
      "Not on the About Amazon announcement we checked on 26 November 2026. The bank-slab table on this page uses a published October 2026 Amazon-SBI campaign as a structural benchmark so you can read minimum spends, caps and exclusions correctly. Treat those figures as historical terms, not confirmed Black Friday 2026 offers.",
  },
  {
    question: "What is worth buying on Black Friday in India?",
    answer:
      "The best candidates are high-ticket carts where a real price drop, exchange credit or an eligible bank discount can move the final payable amount: laptops above roughly ₹45,000, large TVs, major appliances and exchange-eligible phones. Small everyday purchases are usually not worth waiting for unless you have already tracked the price.",
  },
  {
    question: "Do bank instant discounts work with EMI?",
    answer:
      "Often no. Many instant-discount campaigns require a full card swipe and exclude credit/debit EMI, Amazon Pay balance, gift cards or corporate cards. The published Amazon-SBI example we cite excluded debit cards and EMI transactions. Always read the live offer terms and confirm the discount line on the payment page before paying.",
  },
  {
    question: "Can exchange reduce my bank discount?",
    answer:
      "Yes. Exchange credit can lower the net amount the payment gateway evaluates for a minimum-spend slab. A cart that looks eligible before exchange may fall below the threshold after exchange. Check the final payable amount and the discount line after you apply exchange.",
  },
  {
    question: "Did Durza verify live Black Friday 2026 prices or stock?",
    answer:
      "No. We verified Amazon India's Black Friday announcement on 26 November 2026 and reviewed older Amazon policy/offer pages for structure. We did not verify live prices, stock, your card eligibility or campaign quotas. The checkout page and issuer terms are the source of truth.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-14",
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

const EXPLORE_LINKS = [
  { href: "/black-friday", label: "Black Friday 2026 hub" },
  { href: "/compare/black-friday-2026-india-best-deals-vs-regular-sale", label: "Black Friday vs regular sales: what actually drops" },
  { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant bank discount vs No-Cost EMI" },
  { href: "/compare/amazon-vs-flipkart-electronics-2026", label: "Amazon India vs Flipkart: returns, OBD and bank offers" },
  { href: "/guides/cyber-monday-2026-india-electronics-home-gifts", label: "Cyber Monday 2026 India guide" },
  { href: "/bank-offers", label: "Live bank & card instant discounts" },
  { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
  { href: "/stores/amazon-in", label: "Amazon India store hub" },
];

const DECISION_ROWS = [
  {
    cart: "Laptop / TV above ₹45,000",
    wait: "Usually worth planning for",
    check: "Track the exact model code, compare Amazon/Flipkart final payable, and confirm bank cap after exchange.",
  },
  {
    cart: "Phone with exchange",
    wait: "Can be good value",
    check: "Exchange quotes vary by condition and city; make sure the post-exchange net still qualifies for any bank slab.",
  },
  {
    cart: "Large appliance set",
    wait: "Sometimes worth it",
    check: "Delivery slot, installation, return window and card cap matter more than the headline percentage.",
  },
  {
    cart: "Groceries, fashion basics, low-ticket accessories",
    wait: "Usually skip the wait",
    check: "Buy when you need it unless you have a verified price drop on the exact item.",
  },
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Black Friday 2026 date and what to buy", path: canonical },
        ])}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Published 14 Nov 2026 · Checked 26 Nov 2026 · Amazon start date confirmed; deals not yet announced</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Amazon India says the Black Friday Sale starts on 27 November 2026. The calendar date is clear; the useful details — eligible bank slabs, exact prices, stock and end time — still need to be checked on the live pages.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Use this guide if</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• You have a specific laptop, TV, appliance or phone in mind and want to know whether waiting makes sense.</li>
              <li>• You plan to use a bank card or exchange and need to check the final payable amount, not the banner.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Skip the hype if</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• You are buying a low-ticket item with no tracked price history.</li>
              <li>• The discount depends on EMI, gift-card balance or exclusions you have not read.</li>
            </ul>
          </div>
        </div>

        <EditorialByline
          authorName="Harsh Bansal"
          publishedAt="2026-11-14"
          updatedAt="2026-11-26"
          checkedAt="2026-11-26"
          hasMethod
        />

        <QuickAnswer
          question="Is Black Friday 2026 on Amazon India worth waiting for?"
          answer="It can be worth waiting for a planned big-ticket purchase, but only after you compare the final payable amount. Amazon India has confirmed the sale starts on 27 November 2026; as of 26 November 2026, deal-specific bank slabs and prices were still not announced on that page."
          jumpHref="#what-is-confirmed"
          jumpLabel="See what is confirmed"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/go/amazon-in?src=guide-bf2026-verdict" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Check live Amazon India deals <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-bf2026-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/black-friday" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Open the Black Friday hub <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section id="what-is-confirmed" aria-labelledby="confirmed-heading" className="mt-12">
          <h2 id="confirmed-heading" className="font-serif text-2xl font-extrabold text-ink">
            What is confirmed, and what is still missing
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="flex items-center gap-2 font-semibold text-emerald-900"><CalendarClock aria-hidden="true" className="h-4 w-4" /> Confirmed on 26 Nov 2026</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-950/90">
                <li>• Black Friday 2026 is Friday, 27 November 2026.</li>
                <li>• Amazon India&apos;s About Amazon page says the Black Friday Sale starts on 27 November 2026.</li>
                <li>• Amazon said deals would be announced closer to the sale.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="flex items-center gap-2 font-semibold text-amber-900"><CircleAlert aria-hidden="true" className="h-4 w-4" /> Not confirmed by this guide</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950/90">
                <li>• Exact end time, category-wise deal list, or bank-slab details for Black Friday 2026.</li>
                <li>• Live product prices, stock, exchange quotes, or your card&apos;s remaining quota.</li>
                <li>• That an older Amazon-SBI slab will repeat unchanged.</li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="decision" className="mt-12">
          <h2 id="decision" className="font-serif text-2xl font-extrabold text-ink">A quick buy/wait filter</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            This is a planning filter, not a promise that every item in a category will drop. The right question is: can you verify a lower final payable amount on the exact SKU?
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Cart type</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Black Friday stance</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">What to verify</th>
                </tr>
              </thead>
              <tbody>
                {DECISION_ROWS.map((row) => (
                  <tr key={row.cart} className="border-t border-ledger-line align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.cart}</th>
                    <td className="px-4 py-3 text-ink-soft">{row.wait}</td>
                    <td className="px-4 py-3 text-ink-soft">{row.check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="terms" className="mt-12">
          <h2 id="terms" className="font-serif text-2xl font-extrabold text-ink">
            How to read a bank offer: historical Amazon-SBI example
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            The figures below come from Amazon India&apos;s published October 2026 Amazon-SBI campaign, checked 20 Oct 2026. They are here to show the mechanics of minimum spend, caps and exclusions. They are <strong>not</strong> confirmed Black Friday 2026 terms.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Term</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Published example (Oct 2026)</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Eligible instrument", "SBI credit card only; debit cards and credit/debit EMI excluded", "A valid card in the wrong payment mode can get zero discount."],
                  ["Minimum spend", "₹4,990 mobiles / ₹2,490 other categories in that campaign", "The threshold is checked on the qualifying net amount, not your wishlist total."],
                  ["Cap", "₹1,000–₹1,500 by tier/category in that campaign", "A large cart does not scale linearly once the cap is hit."],
                  ["Exchange / exclusions", "Exchange and some payment methods can affect qualifying value", "Always re-check the discount line after applying exchange or coupons."],
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
        </section>

        <section aria-labelledby="worked-math" className="mt-10 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Illustrative maths</p>
          <h2 id="worked-math" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
            One big-ticket cart, with every assumption visible
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">
            This uses the historical October 2026 structure above to show the arithmetic. It is not a Black Friday 2026 quote, not a live price, and not a guarantee that your card qualifies.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• <strong>Inputs:</strong> laptop sale price ₹52,000, clip coupon ₹2,000, eligible cart ₹50,000, SBI full swipe with ₹1,500 capped instant discount plus ₹1,000 additive slab on ₹49,990+, exchange credit ₹8,000.</li>
            <li>• <strong>After coupon:</strong> ₹52,000 − ₹2,000 = ₹50,000.</li>
            <li>• <strong>Bank discount:</strong> ₹1,500 + ₹1,000 = ₹2,500, assuming the offer is live, eligible and not capped out.</li>
            <li>• <strong>After exchange:</strong> ₹50,000 − ₹2,500 − ₹8,000 = ₹39,500 payable.</li>
            <li>• <strong>What to verify:</strong> the same model code, exchange value after inspection, card eligibility, EMI exclusion, and whether the payment page still shows the discount line.</li>
          </ul>
        </section>

        <section aria-labelledby="checklist" className="mt-12">
          <h2 id="checklist" className="font-serif text-2xl font-extrabold text-ink">Before you pay</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
            {[
              "Match the exact model code across stores; a series name is not the same SKU.",
              "Compare the final payable amount, not the MRP strike-through or the headline percentage.",
              "Check the bank offer on the payment page after coupon, exchange and payment mode selection.",
              "If you need EMI for cash flow, calculate processing fee and GST on interest separately from the discount.",
              "Keep screenshots of the offer terms and payment summary for high-value orders.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-verified-ink" strokeWidth={2} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sources" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="sources" className="font-serif text-xl font-bold text-ink">Sources and verification</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We checked Amazon India&apos;s official Black Friday announcement on 26 November 2026. We also reviewed older Amazon policy and offer pages to explain how bank slabs and exchange usually behave. We did not test live checkout for every card, device or city. Prices, stock, eligibility and caps can change before you pay.
          </p>
          <div className="mt-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Sources</p>
            <ul className="mt-2 space-y-3">
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
          <p className="font-semibold text-ink">Editorial note</p>
          <p className="mt-1">
            Checked 26 Nov 2026. Amazon&apos;s start date is confirmed by Amazon India&apos;s announcement; deal-specific slabs, prices and stock are not. Do not treat historical examples as live offers. Durza may earn a commission through tracked links at no extra cost to you.
          </p>
        </div>
      </article>
    </>
  );
}
