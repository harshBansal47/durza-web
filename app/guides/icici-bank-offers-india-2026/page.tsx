import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, CheckCircle2, AlertTriangle, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 3600;

const title = "ICICI Bank Offers India 2026 — live list";
const description =
  "Which ICICI Bank offers are live right now in India? Live catalogue offers, an ICICI card-family reference table, worked checkout maths and the reasons an instant discount silently fails.";
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
      "Usually yes — the sale price reduces the item value and the instant discount applies at the order level after that. Exceptions include MRP-based exclusions and gateways that do not pass the discounted total to the bank. The payment page is the only reliable check: if the discount line is absent before you pay, assume it will not appear later.",
  },
  {
    question: "Is there a minimum transaction value on ICICI instant discounts?",
    answer:
      "Minimum spends vary by campaign — commonly a few thousand rupees on everyday categories and higher on premium ones. We do not publish a fixed number because it changes per offer. Open the specific offer in the live panel and read its minimum-spend rule. A clip coupon or exchange that drops the net total below that threshold can void the discount entirely — see the worked example on this page.",
  },
  {
    question: "Why did my ICICI card get no discount even though the store advertised one?",
    answer:
      "Three usual causes: the card is not in the eligible family for that offer (credit vs debit vs co-brand, and specific variants); the net transaction value after exclusions fell below the minimum; or the campaign's daily/overall cap is exhausted. If the payment page shows zero discount before you confirm, expect to pay the full amount.",
  },
  {
    question: "How is the Amazon Pay ICICI card different from a regular ICICI credit card?",
    answer:
      "It is a co-branded ICICI card whose rewards are tied to Amazon.in. Amazon states that eligible Prime members, including the ₹399 Shopping Edition, earn 5% cashback on Amazon.in, and 3% for non-Prime members. It is routinely excluded from core ICICI 10% instant-discount banners — the two programmes are different and do not stack by default.",
  },
  {
    question: "Are ICICI offers the same on website and app?",
    answer:
      "Generally yes, because the discount is applied by the payment gateway at the bank layer, not by the storefront. Occasionally a campaign is app-only or web-only — the offer terms say so. Verify the price before payment and the discount line on the payment page in either channel.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-15",
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

const FACTORS = [
  {
    title: "Card family decides eligibility",
    winner: "Winner: an eligible core ICICI credit card when a general banner is live",
    number: "Co-brand Amazon Pay ICICI is usually excluded from core ICICI banners",
    detail: "Offer copy names a bank, but the eligible variant list is narrower. Credit, debit and co-brand cards are different programmes — check the specific offer before choosing which card to swipe.",
  },
  {
    title: "Net spend after coupon and exchange",
    winner: "Winner: keep the post-discount cart above the minimum",
    number: "A ₹500 clip coupon on a ₹5,400 cart can drop it to ₹4,900 — below a ₹5,000 slab",
    detail: "The bank sees the value after item-level discounts and exclusions. Dropping below the threshold loses the whole bank discount, not a percentage of it.",
  },
  {
    title: "Instant discount vs co-brand cashback",
    winner: "Winner: core ICICI instant discount on large eligible carts",
    number: "On a ₹24,000 illustrative cart, ₹2,400 today beats ₹1,200 credited later",
    detail: "An instant deduction lowers what you pay now. Cashback is only equal if you redeem it and were going to buy anyway.",
  },
  {
    title: "Cap and cadence",
    winner: "Winner: check the cap before assuming next month repeats",
    number: "Caps are typically per card, per campaign and per month",
    detail: "Today's slab may be exhausted or targeted. If your cart can wait, a fresh campaign is a legitimate strategy.",
  },
  {
    title: "Stacking order",
    winner: "Winner: promo code → bank discount → EMI rewards",
    number: "Two bank offers cannot be combined on one transaction",
    detail: "The gateway applies one bank offer. A brand coupon marked 'not valid with bank offers' silently drops the bank line.",
  },
  {
    title: "Full swipe vs no-cost EMI",
    winner: "Winner: full swipe when a flat instant discount is at stake",
    number: "EMI can add GST on discounted interest plus a processing fee",
    detail: "Use EMI for cash flow, not as a saving. Compare the total outflow, not the monthly instalment.",
  },
];

const EXPLORE_LINKS = [
  { href: "/categories/finance", label: "Finance & Cards deals and card guides" },
  { href: "/bank-offers", label: "Live multi-bank instant-discount matrix" },
  { href: "/guides/best-credit-card-online-shopping-india-2026", label: "Which credit card is best for online shopping in India?" },
  { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI: hidden GST & fees" },
  { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
  { href: "/reviews/amazon-prime-india-review-2026", label: "Amazon Prime India review: ₹399 vs ₹1,499" },
  { href: "/tools", label: "Durza shopping calculators" },
  { href: "/stores/amazon-in", label: "Amazon India coupons & deals" },
  { href: "/stores/flipkart", label: "Flipkart coupons & store hub" },
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
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "ICICI Bank Offers India 2026", path: canonical },
      ])} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Research reviewed 24 Nov 2026 · Offers read live from Durza&apos;s catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          ICICI Bank Offers India (2026) — what is live right now
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Current ICICI offers from our catalogue — plus the card-family rules, minimum-spend traps and worked checkout maths that decide whether the discount actually appears.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Who it is for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Core ICICI credit cardholders checking live slabs, minimum spends and caps before checkout.</li>
              <li>• Amazon Pay ICICI holders checking when co-brand cashback beats an excluded general banner.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• UPI, NetBanking or non-partner debit payers — most ICICI instant discounts need an eligible card.</li>
              <li>• Buyers considering no-cost EMI without checking fee and GST treatment.</li>
            </ul>
          </div>
        </div>

        <EditorialByline
          authorName="Harsh Bansal"
          publishedAt="2026-11-15"
          updatedAt="2026-11-24"
          checkedAt="2026-11-24"
          hasMethod
        />

        <QuickAnswer
          question="Which ICICI offer should you use right now?"
          answer={
            liveCount > 0
              ? `${liveCount} ICICI offer${liveCount === 1 ? "" : "s"} are live in our catalogue. If an eligible core ICICI card has a 10% instant-discount banner on your merchant, pay with it in a single full swipe when the net cart clears the minimum. Amazon Pay ICICI is usually excluded from those banners — use it for Amazon.in cashback instead.`
              : "No ICICI instant-discount offers are live in our catalogue right now. If you shop on Amazon.in, the Amazon Pay ICICI card's 5% cashback for Prime members (3% non-Prime) may still be the better fallback. Check the live panel below and the multi-bank view before paying."
          }
          jumpHref="#live-offers"
          jumpLabel="See the live ICICI panel"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#live-offers" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Jump to live ICICI offers <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/bank-offers" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            View all banks <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-icici-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Check Amazon India deals <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div id="live-offers" className="mt-10">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={["icici"]}
            heading="Live ICICI offers — right now"
            asOfLabel="Read live from Durza’s coupon catalogue. Expiry and minimum spend are on each offer’s own page — open the offer, don’t trust the banner."
          />
        </div>

        <section aria-labelledby="families" className="mt-12">
          <h2 id="families" className="font-serif text-2xl font-extrabold text-ink">
            ICICI card families: what each one is for
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Campaign eligibility is set by the issuer and merchant, not by the bank name alone. Rates and caps below are either published by Amazon or explicitly marked as needing verification on the live offer card.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Card family</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Typical campaign role</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Reward / discount we can cite</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Key restriction</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Core ICICI credit cards", "Primary eligible group for marketplace instant-discount banners", "10% instant discount up to a campaign cap — verify the live offer card", "One transaction per card per campaign; variant list is always narrower than 'ICICI cards'"],
                  ["Amazon Pay ICICI (co-brand)", "Usually excluded from core ICICI instant-discount banners", "5% on Amazon.in for eligible Prime members incl. ₹399 Shopping Edition; 3% non-Prime (Amazon help pages)", "EMI orders can forfeit cashback; not a core-banner instant discount"],
                  ["ICICI debit cards", "Select campaigns only — more common on travel or EMI offers", "Verify on the specific live offer", "Often a higher minimum spend and lower cap than credit cards"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-ledger-line">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">{row[0]}</th>
                    <td className="px-4 py-3 text-ink-soft">{row[1]}</td>
                    <td className="px-4 py-3 text-ink-soft">{row[2]}</td>
                    <td className="px-4 py-3 text-ink-soft">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="worked" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Worked maths</p>
          <h2 id="worked" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
            Two checkout scenarios, inputs shown
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">Illustrative arithmetic, not live offers or guaranteed slabs.</p>
          <h3 className="mt-6 font-serif text-lg font-bold text-ink">1. Core ICICI instant discount vs Amazon Pay ICICI cashback</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: ₹24,000 appliance cart; core ICICI 10% instant discount up to ₹2,500, minimum spend ₹15,000.</li>
            <li>• Core card: 10% × ₹24,000 = ₹2,400 off at payment → payable ₹21,600.</li>
            <li>• Co-brand: excluded from the banner; 5% × ₹24,000 = ₹1,200 cashback later → effective cost ₹22,800.</li>
            <li>• Winner: the core ICICI card by ₹1,200 on this illustrative cart.</li>
          </ul>
          <h3 className="mt-7 font-serif text-lg font-bold text-ink">2. The minimum-spend trap after a clip coupon</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: item ₹5,400; clip coupon ₹500; ICICI 10% instant discount on a ₹5,000 minimum net transaction.</li>
            <li>• Coupon applied: ₹5,400 − ₹500 = ₹4,900, which is ₹100 below the slab.</li>
            <li>• Gateway drops the ₹490 instant discount. You pay ₹4,900 instead of ₹4,500.</li>
            <li>• Winner: check the post-coupon, post-exchange net total before paying.</li>
          </ul>
        </section>

        <section aria-labelledby="factors" className="mt-12">
          <h2 id="factors" className="font-serif text-2xl font-extrabold text-ink">Six decision factors with a winner and a number</h2>
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
          <h2 id="gates" className="font-serif text-2xl font-extrabold text-ink">The three gates that silently drop a discount</h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Card family — credit vs debit vs co-brand, and specific variants. A premium card may qualify while the same bank's entry card does not.",
              "Minimum transaction value — varies by campaign. Returns and excluded items lower the value the bank sees.",
              "Merchant and channel — some campaigns are web-only, app-only or restricted to selected categories.",
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
              If the payment page shows no discount after you select your ICICI card, do not press pay expecting it on your statement. Switch card or accept the full price before confirming.
            </p>
          </div>
        </section>

        <section aria-labelledby="stacking" className="mt-12">
          <h2 id="stacking" className="font-serif text-2xl font-extrabold text-ink">Stacking ICICI with sale codes — the honest order</h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Promo code first, bank instant discount second, EMI rewards last. Two bank offers on one transaction are almost never permitted, and one-transaction caps are enforced at the gateway. See <Link href="/bank-offers" className="font-semibold text-durza-deep hover:underline">/bank-offers</Link> for the multi-bank view, or our <Link href="/guides/best-credit-card-online-shopping-india-2026" className="font-semibold text-durza-deep hover:underline">credit-card guide</Link> to choose a card deliberately.
          </p>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We checked Durza&apos;s live coupon catalogue for active ICICI offers and cross-checked Amazon Pay ICICI cashback rules against Amazon India&apos;s published help pages on 24 Nov 2026. Both rupee examples are illustrative arithmetic, not bank guarantees. We do not hold or test every ICICI card variant; eligibility lists, caps and minimum spends change per campaign. Confirm the discount line on the payment page before paying. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Explore related bank &amp; shopping guides</h2>
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
            Research reviewed 24 Nov 2026. ICICI slabs, eligible card families and caps change per campaign — the payment page and the issuer&apos;s terms are the only sources of truth. The live panel re-reads our catalogue; we do not publish static offer counts.
          </p>
        </div>
      </article>
    </>
  );
}
