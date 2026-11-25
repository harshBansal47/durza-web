import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

const canonical = "/guides/lenovo-laptop-offers-india-2026";
const title = "Lenovo Laptop Offers in India (2026): How to Read Banners and Pick the Right Store";
const description =
  "Lenovo discounts vary by exact SKU, coupon, cashback and bank offer. Compare IdeaPad, ThinkBook, LOQ and ThinkPad buying checks across Lenovo.com, Amazon and Flipkart. Checked 26 Nov 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Are Lenovo headline discounts real?",
    answer:
      "Sometimes, but they are often SKU-specific. A 'flat ₹20,000 off' banner may apply to selected configurations, older stock, or a cart after specific coupons/cashback conditions. Always check the exact model code and the final payable amount in the cart.",
  },
  {
    question: "Is Lenovo.com cheaper than Amazon or Flipkart?",
    answer:
      "Not always. Lenovo.com can be better for student/corporate verification, custom configurations or official accessories/ADP offers. Amazon or Flipkart can be better when a card instant discount, exchange or fast delivery matters. Compare final payable amount, warranty terms, delivery date and return policy.",
  },
  {
    question: "Which Lenovo laptop is better for students: IdeaPad or ThinkBook?",
    answer:
      "It depends on workload. IdeaPad Slim models can be good value for everyday study and office work. ThinkBook models often make more sense for heavier multitasking, coding or spreadsheet work when you need a higher-power CPU and better upgradeability. Confirm the exact CPU wattage, RAM slots and display brightness on the SKU you are buying.",
  },
  {
    question: "Should I buy a Lenovo laptop on EMI because of a discount?",
    answer:
      "Only after checking the total cost. Some offers require full swipe; some EMI offers include processing fees or interest/GST mechanics. Use EMI for cash flow if needed, but compare the total payable amount against a full-swipe discount.",
  },
  {
    question: "Did Durza physically test these Lenovo laptops?",
    answer:
      "No. We used published specs/reviews and Lenovo offer-structure checks. Specific prices cited from 91mobiles or roundups are dated references, not live quotes. Verify the exact SKU, price and offer on the day you buy.",
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

const STORE_ROWS = [
  {
    store: "Lenovo.com India",
    goodFor: "Student/corporate benefits, CTO configs, official accessories, some cashback/coupon flows",
    watchFor: "Delivery times, coupon conditions, cashback posting rules, exact SKU availability",
  },
  {
    store: "Amazon India",
    goodFor: "Fast delivery, easy price comparison, bank/card sale events, simple returns on eligible listings",
    watchFor: "Seller identity, exact model code, warranty terms, exchange value assumptions",
  },
  {
    store: "Flipkart",
    goodFor: "Card offers, exchange bonuses, occasional SKU-specific pricing",
    watchFor: "Seller/warranty details, exchange inspection outcomes, exact configuration name",
  },
];

const CHECKLIST = [
  "Match the full model code/MTM, not just 'IdeaPad Slim 3' or 'LOQ 15'.",
  "Check CPU class and wattage: U-series for efficiency, H/HS/HX for sustained heavier workloads.",
  "Prefer 16GB RAM where possible; confirm if memory is soldered or upgradeable.",
  "Look for at least 512GB SSD for most students/office users; confirm SSD slot availability if you plan upgrades.",
  "Compare final payable amount after coupon, bank discount, exchange, cashback conditions and delivery cost.",
  "Save invoice and register warranty; check accidental-damage cover only if the terms make sense for your use.",
];

export default function LenovoOffersPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Lenovo Laptop Offers in India 2026", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Lenovo Laptop Offers in India 2026", path: canonical },
        ])}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Research reviewed 24 Nov 2026 · Editorial check 26 Nov 2026</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Lenovo deals look simple in banners and messy in carts. The right way to buy is to pick the exact configuration first, then compare the final payable amount across Lenovo.com, Amazon and Flipkart.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Use this guide for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• IdeaPad, ThinkBook, LOQ or ThinkPad purchases where banner discounts look confusing.</li>
              <li>• Comparing official-store benefits against marketplace card/exchange offers.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Be careful if</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• You are comparing two laptops by series name only — MTM/config differences can be large.</li>
              <li>• The &quot;discount&quot; depends on cashback, EMI or exchange values you have not verified.</li>
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
          question="How do you get a real Lenovo deal in India?"
          answer="Ignore the headline percentage until you have the exact model code in cart. Compare the final payable amount on Lenovo.com, Amazon and Flipkart after coupons, bank offers, exchange and cashback conditions. The best store changes by SKU and day."
          jumpHref="#store-compare"
          jumpLabel="Compare store trade-offs"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/go/lenovo?src=guide-lenovo-verdict" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Check Lenovo.com India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-lenovo-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Amazon <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-lenovo-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section aria-labelledby="store-compare" className="mt-12">
          <h2 id="store-compare" className="font-serif text-2xl font-extrabold text-ink">Where to buy: trade-offs that actually matter</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Store</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Usually good for</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Check before paying</th>
                </tr>
              </thead>
              <tbody>
                {STORE_ROWS.map((row) => (
                  <tr key={row.store} className="border-t border-ledger-line align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.store}</th>
                    <td className="px-4 py-3 text-ink-soft">{row.goodFor}</td>
                    <td className="px-4 py-3 text-ink-soft">{row.watchFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="checklist" className="mt-12">
          <h2 id="checklist" className="font-serif text-2xl font-extrabold text-ink">The Lenovo buying checklist</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-verified-ink" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="math" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Illustrative maths</p>
          <h2 id="math" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">Why the headline discount can mislead</h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">Example only — use it to structure your comparison, not as a live offer.</p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Lenovo.com cart: ₹60,000 after coupon, with ₹3,000 cashback posted after delivery. Effective cost may be ₹57,000 if cashback terms are met.</li>
            <li>• Marketplace cart: same SKU at ₹59,000 with ₹2,000 instant card discount. Pay ₹57,000 now.</li>
            <li>• If you need the machine immediately, or cashback terms are restrictive, the marketplace may be better despite a smaller headline discount.</li>
          </ul>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We reviewed published Lenovo offer structures, dated review/roundup pricing references used in earlier research, and the Lenovo verified-research panel below. We did not physically test laptops, did not confirm live cart prices for every SKU, and did not validate every cashback/coupon claim at checkout. The exact cart, offer terms and payment summary on the day you buy are the source of truth. Durza may earn a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <div className="mt-10">
          <VerifiedResearchPanel kind="lenovo" />
        </div>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Related guides</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { href: "/compare/best-laptops-under-50000-india-coding-office-2026", label: "Best laptops under ₹50,000 compared" },
              { href: "/compare/official-brand-store-vs-amazon-flipkart-laptops-india", label: "Official brand stores vs Amazon & Flipkart" },
              { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer laptop deals guide" },
              { href: "/stores/lenovo", label: "Lenovo store hub" },
              { href: "/stores/amazon-in", label: "Amazon India store hub" },
              { href: "/stores/flipkart", label: "Flipkart store hub" },
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
          <div className="mt-4 space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold leading-6 text-ink">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs leading-5 text-ink-soft">
          Research reviewed 24 Nov 2026; editorial check 26 Nov 2026. Prices, coupons, cashback terms and stock change quickly. Verify the exact SKU and the final payable amount before buying.
        </div>
      </article>
    </>
  );
}
