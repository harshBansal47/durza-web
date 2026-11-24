import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { fetchLiveBankSnapshot } from "@/lib/bank-offers-fetch";
import { BANKS } from "@/lib/bank-offers";
import LiveBankOffers from "@/components/bank-offers/LiveBankOffers";
import QuickAnswer from "@/components/ui/QuickAnswer";

export const revalidate = 3600;

const title = "Best Credit Card for Online Shopping India 2026 — the honest answer, with live offers";
const description =
  "There is no single best online-shopping credit card — there is the card running a live offer on the cart you have this month. Live bank offers, worked checkout maths and a 6-factor decision framework.";
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
      "No card wins every month. The best card is the one with a live offer on the exact cart you have — bank offers rotate weekly by category and merchant. Check the live panel below, then match your cart to it. Card fees and reward rates change often; verify them on the issuer's own Most Important Terms & Conditions page before applying.",
  },
  {
    question: "Co-brand card (Amazon Pay ICICI) vs a general bank card — which should I hold?",
    answer:
      "They do different jobs. Amazon state that eligible Prime members, including Shopping Edition members, earn 5% cashback on Amazon.in with the Amazon Pay ICICI card. A core bank card can beat that when a 10% instant-discount banner is live on your cart — but co-brand cards are routinely excluded from those core-bank banners. Compare the final payable amount on the day you buy.",
  },
  {
    question: "Instant discount vs cashback — which is actually better?",
    answer:
      "Instant discount, almost always. In our worked example, a 10% instant discount on a ₹30,000 cart saves ₹3,000 today; 5% cashback on the same cart returns ₹1,500 later as balance. Cashback is only equal if you redeem it, it holds its value, and you were going to buy anyway.",
  },
  {
    question: "Do credit card offers stack with coupon codes?",
    answer:
      "Order matters: promo code first (reduces item value), bank instant discount second (applies on the reduced value), EMI rewards last. Two bank offers never stack. If a brand coupon says 'not valid with bank offers', the payment page will drop the bank line. There is no order that bends gateway rules.",
  },
  {
    question: "Can I redeem my credit card reward points for these carts?",
    answer:
      "Often yes, through your card's redemption portal — HDFC SmartBuy converts points to online shopping vouchers for major marketplaces, and ICICI/RBL have equivalent portals. The value per point varies by campaign; the rate shown at the redemption step is the real one. We do not publish point valuations because they change daily.",
  },
  {
    question: "Why did a friend get a discount I did not qualify for?",
    answer:
      "Most offers have caps — per day, per campaign, per customer per month — and eligibility lists by card family. Two people on the same store on the same day can see different outcomes. Check four things: card family variant, minimum transaction value after exclusions, whether the campaign cap is exhausted, and whether the offer is targeted at existing holders of a specific card.",
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
    step: "1",
    title: "Check the live panel, not the banner",
    winner: "Winner: the card with a live offer on your store today",
    number: "Live offers counted on this page at render time",
    detail: "Open the store you're buying from, then check the live panel below or /bank-offers. If a bank you hold has a live offer there, that bank wins for this cart. The panel is re-read from the catalogue, not copied from a banner.",
  },
  {
    step: "2",
    title: "Match your card's family, not just the bank name",
    winner: "Winner: the exact eligible card variant",
    number: "Eligibility list is always narrower than the bank name",
    detail: "Offer copy says 'ICICI Bank credit cards' but the eligible family list is narrower. Open the offer and read the variants; if yours is not named, move to the next bank.",
  },
  {
    step: "3",
    title: "Run the minimum-spend maths at your real cart value",
    winner: "Winner: no filler purchase when the net benefit is zero",
    number: "₹400 filler to reach a ₹5,000 slab on an 8% offer yields ₹0 net saving",
    detail: "An 8% discount that requires adding ₹400 you did not need is not a saving. Worked calculation below shows the cart reaching exactly the same payable amount.",
  },
  {
    step: "4",
    title: "Stack in the working order",
    winner: "Winner: promo code → instant discount → rewards",
    number: "Two bank offers cannot be combined on one transaction",
    detail: "The gateway applies one bank offer. A brand coupon marked 'not valid with bank offers' will silently drop the bank line, so verify the payment summary before paying.",
  },
  {
    step: "5",
    title: "Prefer instant deduction over later cashback",
    winner: "Winner: 10% instant discount on a ₹30,000 cart",
    number: "₹3,000 today vs ₹1,500 as cashback later",
    detail: "An instant discount lowers what you physically pay. Cashback is real only if you redeem it and it holds value — see the worked maths below.",
  },
  {
    step: "6",
    title: "Check the cap before assuming next month repeats",
    winner: "Winner: wait a cycle only if the cart can wait",
    number: "Caps apply per day, per campaign and per customer per month",
    detail: "Today's offer may not run for the full window. If your cart is flexible, waiting for a fresh slab is a legitimate strategy.",
  },
];

const EXPLORE_LINKS = [
  { href: "/categories/finance", label: "Finance & Cards deals and card guides" },
  { href: "/bank-offers", label: "Live multi-bank instant-discount matrix" },
  { href: "/compare/credit-card-instant-discount-vs-no-cost-emi-india", label: "Instant discount vs No-Cost EMI: hidden GST & fees" },
  { href: "/guides/how-to-save-on-amazon-india", label: "How to save on Amazon India" },
  { href: "/reviews/amazon-prime-india-review-2026", label: "Amazon Prime India review: ₹399 vs ₹1,499" },
  { href: "/guides/amazon-finance-card-smarts-buying-guide", label: "Amazon finance & card smarts" },
  { href: "/tools", label: "Durza shopping calculators" },
  { href: "/stores/amazon-in", label: "Amazon India coupons & deals" },
  { href: "/stores/flipkart", label: "Flipkart coupons & store hub" },
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
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "Best Credit Card for Online Shopping 2026", path: canonical },
      ])} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <CreditCard aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>Research reviewed 24 Nov 2026 · Offer layer read live from Durza&apos;s catalogue</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Which credit card is best for online shopping in India (2026)?
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          There is no single winner all year. The right card is the one with a live offer on the cart you have today — plus a clear view of what that offer actually saves after minimum spends and caps.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Who it is for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Shoppers choosing between a zero-fee co-brand card, a flat cashback card and a core bank card for sale instant discounts.</li>
              <li>• Buyers checking live merchant slabs and minimum-spend rules before paying on Amazon, Flipkart or Tata CLiQ.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Revolvers carrying an unpaid balance — interest plus GST wipes out a 5–10% shopping discount in one cycle.</li>
              <li>• Buyers seeking lounge access, air miles or concierge perks — this covers online-shopping discounts and cashback maths only.</li>
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
          question="Which card should I use at checkout right now?"
          answer={`No single card wins all year. If a core HDFC, ICICI, SBI or Axis card has a live 10% instant-discount banner on your store today, swipe that card — a checkout deduction beats later cashback. When no instant slab is live, a dedicated online cashback card such as Amazon Pay ICICI wins for everyday spends. The live panel below currently reads ${liveOffers} offer${liveOffers === 1 ? "" : "s"} from ${liveBanks} bank${liveBanks === 1 ? "" : "s"}.`}
          jumpHref="#live-offers"
          jumpLabel="See the live multi-bank panel"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/bank-offers" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            View all live bank &amp; card offers <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-cc-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Check Amazon India deals <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-cc-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Check Flipkart deals <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div id="live-offers" className="mt-10">
          <LiveBankOffers
            groups={snapshot.groups}
            requestedBankIds={BANKS.map((bank) => bank.id)}
            heading={`Live offers across every bank we track — ${liveOffers} live offer${liveOffers === 1 ? "" : "s"} from ${liveBanks} bank${liveBanks === 1 ? "" : "s"}`}
            asOfLabel="Read live from Durza's coupon catalogue. Lists refresh as offers expire or rotate; nothing here is a cached banner headline."
          />
        </div>

        <section aria-labelledby="reference" className="mt-12">
          <h2 id="reference" className="font-serif text-2xl font-extrabold text-ink">
            Card reference: what we can verify and what you must check
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We publish rates only where the issuer or a Durza reference page states them. Annual fees, waiver thresholds and caps change often — check the issuer&apos;s Most Important Terms &amp; Conditions before applying.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Card</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Rate we can cite</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Fee / cap</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Key exclusion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Amazon Pay ICICI Bank", "5% on Amazon.in for eligible Prime members (incl. ₹399 Shopping Edition); 3% non-Prime — Amazon India help page", "Verify on issuer MITC", "Excluded from core ICICI instant-discount banners and EMI orders"],
                  ["Cashback SBI Card", "Advertised online cashback rate — verify on sbicard.com", "Verify on issuer MITC", "Typically excluded from core SBI instant-discount banners, EMI and gift cards"],
                  ["Flipkart Axis Bank", "Advertised marketplace cashback — verify on axisbank.com", "Verify on issuer MITC", "Converting an order to EMI can forfeit cashback"],
                  ["HDFC Bank Millennia", "Advertised partner-app rewards — verify on hdfcbank.com", "Verify on issuer MITC", "Co-brand/cashback variants are often excluded from core HDFC instant-discount banners"],
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
            Two checkout traps, quantified
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">
            Illustrative arithmetic with all inputs shown — not live offers or guaranteed slabs.
          </p>
          <h3 className="mt-6 font-serif text-lg font-bold text-ink">1. 10% instant discount vs 5% cashback on a ₹30,000 cart</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Core card instant discount: 10% × ₹30,000 = ₹3,000 off today → payable ₹27,000.</li>
            <li>• Cashback card: pay ₹30,000 today, receive 5% × ₹30,000 = ₹1,500 as balance later → effective cost ₹28,500.</li>
            <li>• Verdict: the instant slab wins by ₹1,500 on this cart, assuming both offers are actually live and eligible.</li>
          </ul>
          <h3 className="mt-7 font-serif text-lg font-bold text-ink">2. The “add ₹400 to qualify” trap</h3>
          <ul className="mt-2 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: cart ₹4,600, bank offer 8% on ₹5,000 minimum spend, filler item ₹400.</li>
            <li>• Without filler: you pay ₹4,600. With filler: cart ₹5,000 − 8% (₹400) = ₹4,600 payable.</li>
            <li>• Verdict: net saving is ₹0 unless the ₹400 item was already on your list. The filler is not free money.</li>
          </ul>
        </section>

        <section aria-labelledby="factors" className="mt-12">
          <h2 id="factors" className="font-serif text-2xl font-extrabold text-ink">
            Six decision factors — each with a winner and a number
          </h2>
          <ol className="mt-5 space-y-4">
            {FACTORS.map((item) => (
              <li key={item.step} className="rounded-2xl border border-ledger-line bg-white p-4">
                <span className="font-serif font-bold text-ink">{item.step}. {item.title}</span>
                <p className="mt-1 text-sm font-semibold text-durza-deep">{item.winner}</p>
                <p className="mt-1 text-sm text-ink-soft">{item.number}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="by-bank" className="mt-12">
          <h2 id="by-bank" className="font-serif text-2xl font-extrabold text-ink">Deep-dives for the banks with the most live offers</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/guides/icici-bank-offers-india-2026" className="group rounded-2xl border border-ledger-line bg-white p-5 transition hover:border-inkblue hover:shadow-sm">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">ICICI deep-dive</p>
              <p className="mt-2 font-serif font-bold text-ink">ICICI Bank Offers India 2026</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">How ICICI instant discounts apply at checkout, eligibility, and common reasons they fail.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-inkblue">Read the guide <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
            </Link>
            <Link href="/guides/rbl-bank-offers-india-2026" className="group rounded-2xl border border-ledger-line bg-white p-5 transition hover:border-inkblue hover:shadow-sm">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">RBL deep-dive</p>
              <p className="mt-2 font-serif font-bold text-ink">RBL Bank Offers India 2026</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">How RBL card instant discounts work at checkout, eligibility and monthly caps.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-inkblue">Read the guide <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} /></span>
            </Link>
          </div>
        </section>

        <section aria-labelledby="when" className="mt-12">
          <h2 id="when" className="font-serif text-2xl font-extrabold text-ink">When new offers actually appear</h2>
          <p className="mt-4 text-base leading-8 text-ink-soft">
            Three recurring waves: the festive mega-sale fortnight, bank quarter closes (March and December), and travel-partner campaign pushes. Between waves the field narrows to co-brands and targeted cardholder emails. The panel above shows whatever is readable on any given day — if it is empty, no bank is currently running an offer we can honestly show.
          </p>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We read the live bank-offer panel from Durza&apos;s catalogue and cross-checked the Amazon Pay ICICI cashback rate against Amazon India&apos;s published help pages on 24 Nov 2026. Both worked examples are illustrative arithmetic, not guaranteed live slabs. We do not hold or test every card listed. Issuer fees, caps and eligible card families change without notice — verify the final discount line on the payment page and check issuer MITC before applying. Durza earns a commission on qualifying purchases through tracked links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Explore related money &amp; card guides</h2>
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
            Research reviewed 24 Nov 2026. Bank slabs, reward rates and cap rules change constantly — the payment summary and the issuer&apos;s MITC are the only sources of truth. The live offer panel re-reads our catalogue; we do not publish static offer counts.
          </p>
        </div>
      </article>
    </>
  );
}
