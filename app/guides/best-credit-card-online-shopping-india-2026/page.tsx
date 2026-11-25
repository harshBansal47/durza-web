import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import { BANKS } from "@/lib/bank-offers";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 3600;

const title = "Best Credit Card for Online Shopping in India (2026): How to Pick the Right One";
const description =
  "There is no single best card for every cart. Use live bank offers, instant-discount vs cashback maths, and a 6-point checkout checklist. Checked 26 Nov 2026.";
const canonical = "/guides/best-credit-card-online-shopping-india-2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Which credit card is best for online shopping in India in 2026?",
    answer:
      "There is no single winner for every cart. A card with a live instant-discount slab on the merchant you are using can beat a cashback card on that purchase. On days with no live slab, a rewards or co-brand card may be better. Check the live panel below, then confirm eligibility and the final payment-page discount.",
  },
  {
    question: "Is instant discount better than cashback?",
    answer:
      "Usually, for a specific eligible purchase. Instant discount reduces what you pay now. Cashback arrives later and may have exclusions, caps or redemption conditions. Compare the effective cost after all conditions, not just the headline percentage.",
  },
  {
    question: "Can I use a coupon code and a bank offer together?",
    answer:
      "Sometimes. Many checkouts apply a merchant coupon first and then evaluate the bank offer on the qualifying net amount. But some campaigns exclude discounted carts, EMI, wallets, or specific card variants. Two bank offers on the same transaction generally do not stack.",
  },
  {
    question: "Should I get a co-brand card or a general rewards card?",
    answer:
      "It depends on where you spend. Co-brand cards can be strong on one merchant but are often excluded from general bank instant-discount campaigns. A general rewards/cashback card can be more flexible across merchants. The right answer is the card that gives the better verified value on your actual spending pattern.",
  },
  {
    question: "What should I check before applying for a card because of an offer?",
    answer:
      "Check the issuer's current fees, waiver conditions, interest rate, reward exclusions, foreign markup, and the offer's eligibility/cap rules. A one-time discount is not worth a card whose ongoing cost or credit behaviour does not fit you.",
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

const DECISION_STEPS = [
  {
    title: "Start with the cart, not the card",
    detail: "The best card for a ₹30,000 electronics cart today may be different from the best card for groceries next week. Check live merchant offers first.",
  },
  {
    title: "Match the exact card variant",
    detail: "Bank-name banners often hide narrower eligibility. Credit, debit, co-brand, EMI and corporate cards can be treated differently.",
  },
  {
    title: "Compare effective value",
    detail: "Instant discount now, cashback later, reward points with redemption conditions — convert them into an effective rupee value only when the terms are clear.",
  },
  {
    title: "Check the minimum-spend trap",
    detail: "Adding filler to hit a slab can erase the benefit. Calculate net saving on the items you actually wanted.",
  },
  {
    title: "Confirm the payment page",
    detail: "The discount line before confirmation is the real answer. A banner, SMS or screenshot is not.",
  },
  {
    title: "Do not let a discount drive bad credit behaviour",
    detail: "If you revolve a balance, interest and fees can wipe out the savings quickly. A card is only a good deal when the repayment plan is also good.",
  },
];

export default async function BestOnlineShoppingCardPage() {
  const snapshot = await fetchLiveBankSnapshot();
  const liveBanks = snapshot.liveBanks;
  const liveOffers = snapshot.liveOffers;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Best Credit Card for Online Shopping 2026", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Best Credit Card for Online Shopping 2026", path: canonical },
        ])}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Checked 26 Nov 2026 · Live offer panel read from Durza&apos;s catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Best Credit Card for Online Shopping in India (2026)
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          The best card is usually the one that gives you the best verified value on the cart in front of you. This guide helps you choose between live instant discounts, co-brand cashback and regular rewards without over-trusting the banner.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Useful for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Shoppers deciding which card to use at checkout today.</li>
              <li>• People comparing a co-brand card against general bank instant-discount campaigns.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Not a fit for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Anyone carrying revolving credit-card debt for the sake of a discount.</li>
              <li>• Card applications made only because of a short-lived offer without checking issuer fees.</li>
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
          question="Which card should you use for this purchase?"
          answer={`Use the card with a verified live instant discount on your exact cart when available. If no eligible instant-discount slab is live, use the card with the clearest effective reward value for that merchant. The live panel below currently reads ${liveOffers} offer${liveOffers === 1 ? "" : "s"} from ${liveBanks} bank${liveBanks === 1 ? "" : "s"} in Durza's catalogue.`}
          jumpHref="#live-offers"
          jumpLabel="See live bank offers"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/bank-offers" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            All live bank offers <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-cc-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Check Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-cc-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Check Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div id="live-offers" className="mt-10">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={BANKS.map((bank) => bank.id)}
            heading={`Live offers across tracked banks — ${liveOffers} offer${liveOffers === 1 ? "" : "s"} from ${liveBanks} bank${liveBanks === 1 ? "" : "s"}`}
            asOfLabel="Read live from Durza's catalogue. Open each offer for card-family eligibility, minimum spend, cap and exclusions."
          />
        </div>

        <section aria-labelledby="decision" className="mt-12">
          <h2 id="decision" className="font-serif text-2xl font-extrabold text-ink">A simple decision framework</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {DECISION_STEPS.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-ledger-line bg-white p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Step {index + 1}</p>
                <h3 className="mt-2 font-serif text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="worked" className="mt-12 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Worked maths</p>
          <h2 id="worked" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">Compare effective value, not marketing copy</h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">Illustrative examples. Verify the live offer and your card&apos;s current terms before paying or applying.</p>
          <h3 className="mt-6 font-serif text-lg font-bold text-ink">1. Instant discount vs cashback</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Cart: ₹30,000. Card A gives 10% instant discount. Card B gives 5% cashback later.</li>
            <li>• Card A: pay ₹27,000 now.</li>
            <li>• Card B: pay ₹30,000 now, get ₹1,500 later if eligible and redeemed. Effective cost ₹28,500.</li>
            <li>• Card A wins by ₹1,500 in this example.</li>
          </ul>
          <h3 className="mt-7 font-serif text-lg font-bold text-ink">2. The filler-item trap</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Cart: ₹4,600. Offer: 8% off on ₹5,000 minimum spend. Filler: ₹400.</li>
            <li>• Without filler: pay ₹4,600, no discount.</li>
            <li>• With filler: ₹5,000 − ₹400 discount = ₹4,600 payable, but you bought ₹400 extra.</li>
            <li>• Only worth it if the ₹400 item was already on your list.</li>
          </ul>
        </section>

        <section aria-labelledby="reference" className="mt-12">
          <h2 id="reference" className="font-serif text-2xl font-extrabold text-ink">Card-type reference</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Rates, fees and exclusions change. Use this as a map of what to verify, not as a live rate card.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Card type</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Usually strong when</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Verify before relying on it</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Co-brand marketplace card", "You spend repeatedly on one merchant and no general instant-discount slab is live", "Current earn rate, exclusions, EMI treatment, and whether it is excluded from bank banners"],
                  ["General cashback card", "You want simple value across many merchants", "Monthly caps, category exclusions, fee waiver and cashback posting rules"],
                  ["Core bank credit card", "A merchant is running an eligible instant-discount campaign", "Exact eligible variants, minimum spend, cap, channel and payment mode"],
                  ["Rewards/points card", "You can redeem points at a clear value for something you would buy anyway", "Point value at redemption, expiry, transfer partners and excluded categories"],
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

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We read live bank-offer data from Durza&apos;s catalogue on 26 November 2026. Card rates, fees, exclusions and issuer terms change frequently and were not re-verified for every card issuer in this pass; verify the issuer&apos;s Most Important Terms and Conditions and the payment-page discount line before acting. Worked examples are illustrative arithmetic. Durza may earn a commission on qualifying purchases through tracked links at no extra cost to you.
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
              { href: "/bank-offers", label: "Live multi-bank offers" },
              { href: "/guides/icici-bank-offers-india-2026", label: "ICICI Bank offers guide" },
              { href: "/guides/rbl-bank-offers-india-2026", label: "RBL Bank offers guide" },
              { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI" },
              { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
              { href: "/stores/amazon-in", label: "Amazon India store hub" },
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
            Checked 26 Nov 2026. Bank offers, reward rates and card terms change frequently. Use the live panel for current catalogue offers, but treat the merchant payment page and issuer MITC as the final source of truth.
          </p>
        </div>
      </article>
    </>
  );
}
