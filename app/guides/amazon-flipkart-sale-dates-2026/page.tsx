import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CalendarDays, BadgePercent } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 21600;

const title = "Amazon & Flipkart Sale Dates India 2026 — Black Friday, Christmas & New Year";
const description =
  "When are Amazon and Flipkart sales in India 2026? The full calendar — Great Indian Festival, Big Billion Days, Black Friday (Nov 27), Cyber Monday (Nov 30), Christmas & New Year — plus how to stack sale prices with bank card discounts.";
const canonical = "/guides/amazon-flipkart-sale-dates-2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "When is Black Friday in India 2026?",
    answer:
      "Black Friday falls on Friday, 27 November 2026 — the day after US Thanksgiving. Indian stores run weekend-long campaigns from roughly Thursday 26 November to Monday 30 November (Cyber Monday). Deal quality varies more by category than by store — electronics, appliances and fashion clear well; groceries barely move.",
  },
  {
    question: "Has Amazon India announced Great Indian Festival 2026 dates?",
    answer:
      "Not as of 15 November 2026 when this page was updated. The Great Indian Festival traditionally runs in late September and early October, timed around the Navratri–Diwali window, and dates are announced around 10–14 days before the sale opens. Any site quoting exact 2026 dates before Amazon does is guessing.",
  },
  {
    question: "Has Flipkart announced Big Billion Days 2026 dates?",
    answer:
      "Not yet, either. Big Billion Days has also run in the late September–October Diwali window, typically overlapping or bracketing the Amazon sale. Flipkart announces the exact dates closer to launch, usually with Flipkart Plus members getting early access — the same pattern as previous years, but not confirmed for 2026.",
  },
  {
    question: "Are Christmas and New Year sales on Amazon and Flipkart worth it?",
    answer:
      "For electronics and large appliances, the deepest discounts of the year land in the September–October festive window, not December. Christmas and New Year sales run on the cleared stock — fashion, accessories, mid-range electronics and categories where stores want year-end numbers. They are worth checking, but compare against the October sale price before you assume a December price is the lowest.",
  },
  {
    question: "How do I know which site had the better price?",
    answer:
      "Compare the final cart total — after sale price, instant bank discount and any coupon — not the headline '50% off'. We track this directly: see our Amazon vs Flipkart comparisons for laptop, smartphone and Black Friday week specifically, then check last month's price on the product page before buying.",
  },
];

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Amazon & Flipkart Sale Dates 2026", path: canonical },
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

const CALENDAR = [
  {
    event: "Amazon Great Indian Festival",
    dates: "Late Sep – Oct 2026",
    status: "Expected window · dates not officially announced",
    note: "Tracks the Navratri–Diwali period. Dates are usually announced 10–14 days before launch with early access for Prime members.",
  },
  {
    event: "Flipkart Big Billion Days",
    dates: "Late Sep – Oct 2026",
    status: "Expected window · dates not officially announced",
    note: "Brackets or overlaps the Amazon sale; Flipkart Plus members get early access. Historically diwali-timed.",
  },
  {
    event: "Black Friday",
    dates: "Friday, 27 November 2026",
    status: "Calendar certainty",
    note: "Weekend run from roughly Thu 26 to Mon 30 Nov. Electronics, appliances and fashion clear hardest.",
  },
  {
    event: "Cyber Monday",
    dates: "Monday, 30 November 2026",
    status: "Calendar certainty",
    note: "Online-only deals. Traditionally strong on electronics, gaming accessories and large appliances.",
  },
  {
    event: "Christmas sale",
    dates: "Roughly 19 – 25 December 2026",
    status: "Expected window · store-specific, not a single announced date",
    note: "Fashion, accessories and cleared stock. Most stores publish their own windows in mid-December.",
  },
  {
    event: "New Year sale",
    dates: "Roughly 26 December – 5 January 2027",
    status: "Expected window · store-specific, not a single announced date",
    note: "Year-end clearance across categories. Strong on fashion and mid-range electronics; weak on premium appliances vs festive pricing.",
  },
];

export default function AmazonFlipkartSaleDatesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Amazon & Flipkart Sale Dates 2026", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CalendarDays aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Updated 15 Nov 2026 · Dates checked against the calendar where they are fixed</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Amazon & Flipkart Sale Dates India 2026
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Great Indian Festival, Big Billion Days, Black Friday, Cyber Monday, Christmas & New Year — every sale worth planning around, honestly labelled confirmed vs expected.
        </p>

        <QuickAnswer
          question="When are the Amazon and Flipkart sales in India in 2026?"
          answer="Black Friday is 27 Nov 2026 and Cyber Monday is 30 Nov 2026 — both calendar certainties. The two mega-sales (Amazon Great Indian Festival and Flipkart Big Billion Days) ran late September–October in every recent year; 2026 dates have not been officially announced yet. Christmas and New Year sales are store-specific windows in the last two weeks of December."
          jumpHref="#calendar-2026"
          jumpLabel="Jump to the 2026 calendar"
        />

        <section id="calendar-2026" aria-labelledby="calendar-heading" className="mt-12">
          <h2 id="calendar-heading" className="font-serif text-2xl font-extrabold text-ink">
            2026 sale calendar at a glance
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line">
            <table className="min-w-full divide-y divide-ledger-line text-sm">
              <thead className="bg-paper-alt text-left">
                <tr>
                  <th className="px-4 py-3 font-bold text-ink">Event</th>
                  <th className="px-4 py-3 font-bold text-ink">Dates</th>
                  <th className="px-4 py-3 font-bold text-ink">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ledger-line bg-white">
                {CALENDAR.map((row) => (
                  <tr key={row.event}>
                    <td className="px-4 py-3 align-top font-semibold text-ink">{row.event}</td>
                    <td className="px-4 py-3 align-top text-ink-soft">{row.dates}</td>
                    <td className="px-4 py-3 align-top text-xs text-ink-soft">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-5 text-ink-soft">
            “Expected window” means the recurring pattern from previous years, not an official announcement. We update this page when each platform publishes dates.
          </p>
        </section>

        <section aria-labelledby="amazon-gif" className="mt-12">
          <h2 id="amazon-gif" className="font-serif text-2xl font-extrabold text-ink">
            Amazon sale dates 2026 — Great Indian Festival
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            The Great Indian Festival is Amazon India’s flagship sale. It has run in the Navratri–Diwali window (late September through mid-October) in every recent year, with Prime members getting early access — typically a 24-hour head start on the opening deals. Amazon announces the dates roughly two weeks ahead, usually through app notifications and email to Prime members.
          </p>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            Two practical notes. First, the deepest discounts concentrate on the first 48 hours and on flagship electronics — phones, laptops, TVs, refrigerators — so wishlist before the sale opens. Second, Amazon price-matching is rare during the sale week; if a Flipkart or Vijay Sales price is lower, the fastest route is usually to claim the difference via the store’s own price-promise rather than wait for Amazon to match.
          </p>
        </section>

        <section aria-labelledby="flipkart-bbd" className="mt-12">
          <h2 id="flipkart-bbd" className="font-serif text-2xl font-extrabold text-ink">
            Flipkart Big Billion Days — the rival window
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Big Billion Days is Flipkart’s competing flagship. It has also landed in the September–October Diwali window, sometimes exactly overlapping the Amazon sale and sometimes bracketing it from the other side. Flipkart Plus members historically get early access and exclusive exchange-offer slabs. The sale is where Flipkart pushes its private labels — MarQ, SmartBuy — and exclusive smartphone launches that never appear on the Amazon listing.
          </p>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            For Flipkart, watch the bank offer line carefully: instant discounts for specific card families (HDFC, ICICI, SBI, Axis rotate by year) on top of sale prices have historically been the difference between “okay deal” and “genuinely lowest in 12 months”.
          </p>
        </section>

        <section aria-labelledby="bf-cm" className="mt-12">
          <h2 id="bf-cm" className="font-serif text-2xl font-extrabold text-ink">
            Black Friday & Cyber Monday — this weekend
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            This week (27–30 November 2026) is Black Friday and Cyber Monday. Both days are calendar facts — the discount structure on Amazon India, Flipkart and direct brand stores is what changes every year. For a live, shopped-through pick of what is actually worth buying rather than which banner is loudest, see our <Link href="/black-friday" className="font-semibold text-inkblue hover:underline">Black Friday 2026 hub</Link> and the <Link href="/compare/black-friday-2026-india-best-deals-vs-regular-sale" className="font-semibold text-inkblue hover:underline">Black Friday vs regular-sale price comparison</Link>.
          </p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Electronics and appliances carry the deepest absolute discounts this weekend — laptop, TV and AC categories.",
              "Fashion and accessories go deeper in December than in the festive window — hold non-urgent fashion buys for the Christmas sale unless sizes are evaporating.",
              "Smartphones almost never hit their lowest 2026 price this weekend; the all-time lows land near the September–October festive window.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-ink-soft" strokeWidth={2} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stacking" className="mt-12">
          <h2 id="stacking" className="font-serif text-2xl font-extrabold text-ink">
            How to stack sale prices with bank and card discounts
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            The checkout maths that decides whether a deal is real: sale price applies to the item, the bank instant discount applies to the reduced order value, and coupons apply on top when the store allows stacking. Stack in this order — <span className="font-semibold text-ink">promo code → bank instant discount → EMI rewards</span> — and watch minimum-order-value clauses, which disqualify the stack if ignored. We track the bank discounts that run with each sale; see the <Link href="/bank-offers" className="font-semibold text-inkblue hover:underline">bank & card offers hub</Link> for the currently live list, or our <Link href="/guides/best-credit-card-online-shopping-india-2026" className="font-semibold text-inkblue hover:underline">best credit cards for online shopping</Link> guide for how to choose a card for this.
          </p>
        </section>

        <section aria-labelledby="christmas-newyear" className="mt-12">
          <h2 id="christmas-newyear" className="font-serif text-2xl font-extrabold text-ink">
            Christmas & New Year — the quiet sale window
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            From roughly 19 December, stores start their year-end campaigns. The pattern: fashion, accessories, mid-range electronics and home categories clear hard, and premium appliances do little beyond festive-season pricing. Most stores publish their own dates in the second or third week of December — there is no single announcement, and no day where every store goes on sale together.
          </p>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            New Year (26 December – 5 January) is stronger on lifestyle — fashion, grooming, fitness, home — than on electronics. If you are shopping for gifts or a January refresh, check wishlist prices across both sites before assuming the New Year banner is the lowest of the year.
          </p>
        </section>

        <section aria-labelledby="what-we-track" className="mt-12">
          <div className="flex items-start gap-3 rounded-2xl border border-ledger-line bg-paper-alt p-5">
            <BadgePercent aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-ink-soft" strokeWidth={1.75} />
            <div>
              <h2 id="what-we-track" className="font-serif text-lg font-extrabold text-ink">
                What we track here at Durza
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Offer pages, not vibes. When the festive dates are announced, this page and the <Link href="/deals" className="font-semibold text-inkblue hover:underline">deals index</Link> update first — then the comparison articles. We do not publish unconfirmed dates as if they were launch dates, and we do not claim an offer is “live” until it is readable from the store’s own page. Where a date is expected, we say expected.
              </p>
            </div>
          </div>
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

        <p className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 text-sm leading-7 text-ink-soft">
          <span className="font-semibold text-ink">Corrections:</span> if a date on this page is wrong or missing, tell us at the <Link href="/contact" className="font-semibold text-inkblue hover:underline">contact page</Link> and it gets fixed. “Expected window” means exactly that — the recurring pattern, clearly labelled, updated when official dates land.
        </p>
      </article>
    </>
  );
}
