import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, CheckCircle2, BadgePercent, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import { BANKS } from "@/lib/bank-offers";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 3600;

const title = "Best Credit Card for Online Shopping India 2026 — the honest answer, with live offers";
const description =
  "There is no single best online-shopping credit card — there is the card running a live offer on the cart you actually have this month. Live offers across ICICI, RBL, HDFC, Kotak, HSBC & BoB, plus a 5-step decision framework.";
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
      "No card wins every month. The genuinely best card is the one with a live offer on the exact cart you have — bank offers rotate weekly by category and merchant. Use the decision framework on this page: check the live panel below, then match your cart to it. Card fee and reward tables change monthly and are best read on the issuer's own page; we deliberately track the offer layer, not card economics.",
  },
  {
    question: "Co-brand card (Amazon Pay ICICI) vs a general bank card — which should I hold?",
    answer:
      "Hold both if you can, but for different jobs. Co-brand cards like Amazon Pay ICICI are strongest on the platform they belong to and weakest elsewhere. General cards win when the live offer lands on the platform you actually shop on this month — which is how most people mis-judge them: judged in a quiet month, not during a sale.",
  },
  {
    question: "Instant discount vs cashback — which is actually better?",
    answer:
      "Instant discount, almost always. Cashback is real only if (a) you redeem it, (b) it holds its value until redemption, and (c) you were actually going to buy anyway. An instant discount lowers the amount you physically pay today, which is strictly stronger than a reward you may or may not claim. If a bank frames the same benefit as cashback, assume the cashback has strings.",
  },
  {
    question: "Do credit card offers stack with coupon codes?",
    answer:
      "Order matters: promo code first (reduces item value), bank instant discount second (applies on reduced value), EMI rewards last. Two bank offers never stack. Brand coupons that say 'not valid with bank offers' do what they say — the payment page drops the bank line for that merchant. There is no magic order that bends gateway rules.",
  },
  {
    question: "Can I redeem my credit card reward points for these carts?",
    answer:
      "Often yes, through your card's own redemption portal — HDFC SmartBuy converts points to online shopping vouchers for major marketplaces, and ICICI/RBL have equivalent portals. The value per point varies by campaign and category; the exchange rate shown at the redemption step is the real one. This page tracks the instant-discount layer only — reward-point values update daily and are owned by the bank, not by Durza.",
  },
  {
    question: "Why did a friend get a discount I did not qualify for?",
    answer:
      "Most offers have caps — per day, per campaign, per customer per month — and eligibility lists by card family. Two people standing in the same store on the same day can see different outcomes. The four usual differences: card family variant, minimum transaction value honored after exclusions, campaign cap already exhausted, and whether the offer is targeted at existing holders of a specific card rather than a general campaign.",
  },
];

const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Credit Card for Online Shopping 2026", path: canonical },
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

const FRAMEWORK = [
  {
    step: "1",
    title: "Check the live panel, not the banner",
    detail:
      "Open the store you're buying from, then check the live panel below (or /bank-offers). If a bank you hold has a live offer for that store, that bank wins — nothing else matters this month.",
  },
  {
    step: "2",
    title: "Match your card's family, not just the bank name",
    detail:
      "Offer copy says 'ICICI Bank credit cards' — the eligible list is always narrower. Open the offer, read the family list; if your variant isn't named, pick the next bank.",
  },
  {
    step: "3",
    title: "Verify the minimum slab against your actual cart value",
    detail:
      "An 8% discount on a ₹400-extra-to-qualify cart is not free money. Run the maths at your real cart total, not at the banner's example cart.",
  },
  {
    step: "4",
    title: "Stack in the working order",
    detail:
      "Promo code → bank instant discount → EMI rewards. Anything else is wishful thinking the payment gateway will silently refuse.",
  },
  {
    step: "5",
    title: "Check the cap before assuming next month works the same",
    detail:
      "Per-customer and per-card monthly caps mean today's offer will not run for the full four-week window. If the cart can wait a cycle, waiting is a strategy.",
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
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Updated 15 Nov 2026 · Offer layer tracked live from Durza’s catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Which credit card is best for online shopping in India (2026)?
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          The honest answer: the one running a live offer on the cart you have this month. Here is the framework — and every offer live across our catalogue right now.
        </p>

        <QuickAnswer
          question="Which card should I use at checkout right now?"
          answer="Check the live panel below: today it surfaces offers from ICICI Bank, RBL Bank, HDFC, Kotak, HSBC and Bank of Baroda. Hold the card that is eligible for the specific offer on your store — the offer matters more than the card brand, and eligibility family lists are always narrower than the banner suggests."
          jumpHref="#live-bank-matrix"
          jumpLabel="See the live multi-bank panel"
        />

        <div id="live-bank-matrix">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={BANKS.map((bank) => bank.id)}
            heading={`Live offers across every bank we track — ${liveOffers} live offer${liveOffers === 1 ? "" : "s"} from ${liveBanks} bank${liveBanks === 1 ? "" : "s"}`}
            asOfLabel="Read live from Durza's coupon catalogue. Lists refresh as offers expire or rotate; nothing here is a cached banner headline."
          />
        </div>

        <section aria-labelledby="framework" className="mt-12">
          <h2 id="framework" className="font-serif text-2xl font-extrabold text-ink">
            The 5-step framework — how to pick the card for this cart
          </h2>
          <ol className="mt-5 space-y-4">
            {FRAMEWORK.map((item) => (
              <li key={item.step} className="flex items-start gap-4 rounded-2xl border border-ledger-line bg-white p-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink font-mono text-sm font-bold text-white">
                  {item.step}
                </span>
                <span>
                  <span className="font-serif font-bold text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-ink-soft">{item.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="by-bank" className="mt-12">
          <h2 id="by-bank" className="font-serif text-2xl font-extrabold text-ink">
            Deep-dives for the banks with the most live offers
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/guides/icici-bank-offers-india-2026"
              className="group rounded-2xl border border-ledger-line bg-white p-5 transition hover:border-inkblue hover:shadow-sm"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">ICICI deep-dive</p>
              <p className="mt-2 font-serif font-bold text-ink">ICICI Bank Offers India 2026</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">How ICICI instant discounts apply at checkout, eligibility, and common reasons they fail.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-inkblue">Read the guide <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
            </Link>
            <Link
              href="/guides/rbl-bank-offers-india-2026"
              className="group rounded-2xl border border-ledger-line bg-white p-5 transition hover:border-inkblue hover:shadow-sm"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">RBL deep-dive</p>
              <p className="mt-2 font-serif font-bold text-ink">RBL Bank Offers India 2026</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">How RBL card instant discounts work at checkout, eligibility, and monthly caps.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-inkblue">Read the guide <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
            </Link>
          </div>
        </section>

        <section aria-labelledby="what-we-dont" className="mt-12">
          <div className="flex items-start gap-3 rounded-2xl border border-ledger-line bg-paper-alt p-5">
            <BadgePercent aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-ink-soft" strokeWidth={1.75} />
            <div>
              <h2 id="what-we-dont" className="font-serif text-lg font-extrabold text-ink">
                What this page deliberately does not do
              </h2>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-ink-soft">
                <li>We do not publish card fee, reward-rate or lounge-access tables — these change monthly and belong on the issuer's own page, not a coupon catalogue.</li>
                <li>We do not rank cards by a numeric score we invented; we rank live offers, sourced per offer.</li>
                <li>We do not repeat offer counts statically — the panel above is re-read every few minutes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="when" className="mt-12">
          <h2 id="when" className="font-serif text-2xl font-extrabold text-ink">
            When new offers actually appear
          </h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Three recurring waves: the festive mega-sale fortnight (late September–mid October), bank quarter closes (March and December, when campaigns top up to hit targets), and travel-partner campaign pushes. Between waves the field narrows to co-brands and targeted cardholder emails. The panel above shows whatever is readable on any given day — if it is empty, no bank is currently running an offer we can honestly show you.
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
          All bank & card offers on Durza — live multi-bank view
          <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </Link>
      </article>
    </>
  );
}
