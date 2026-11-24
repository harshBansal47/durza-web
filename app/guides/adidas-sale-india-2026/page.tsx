import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

const canonical = "/guides/adidas-sale-india-2026";
const title = "Adidas Sale in India (2026): What “Up to 60% Off” Covers & How to Stack";
const description =
  "Adidas India's “up to 60% off” applies to outlet tail stock and odd sizes, not core Samba or Gazelle. Which lines actually drop, how member codes and bank slabs stack, and where to check live prices. Reviewed 24 Nov 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Is the 'up to 60% off' on Adidas India real?",
    answer:
      "The number is real but narrow. Deep cuts sit on older-season styles, retired colourways and odd sizes — not across the whole catalogue. Core black and white staples like Samba OG and Gazelle rarely reach those brackets. When a filter page says 'up to 60%', treat it as the deepest single item in the result set, not the average discount across it. Check the specific SKU's sale price against its MRP.",
  },
  {
    question: "Can I stack a coupon on already-discounted Adidas items?",
    answer:
      "Sometimes. Member and promo codes on adidas.co.in are separate from the item-level sale price, but many fast-selling styles are explicitly excluded from further discounts. The promo terms list the exclusions. Bank instant discounts are applied at payment on the reduced amount and may have their own minimum-spend and eligibility rules. Read the cart and payment summary before paying.",
  },
  {
    question: "Is the Adidas official store cheaper than Myntra or Ajio?",
    answer:
      "Not always by a large margin on the same shoe. The official store wins on newest drops, member pricing and direct brand returns. Marketplaces can be cheaper on older clearance colourways, but check the seller rating and box serial tag on delivery — marketplace sneakers carry a higher counterfeit risk. Use the three-store comparison on this page to check the same model side by side.",
  },
  {
    question: "Which Adidas lines hold their value or resell?",
    answer:
      "Samba, Gazelle, Ultraboost and SL lineage models can sell close to retail when stock is short, so they rarely appear in the 40–60% brackets during peak demand. If one does, it is usually an unpopular colourway or a damaged box. Buy around 15–25% off and wear them rather than expecting appreciation.",
  },
  {
    question: "What is the Adidas India return window on sale items?",
    answer:
      "Return and exchange rules in India have changed in recent years, so do not assume a 30-day window. Check the current policy on the exact order at adidas.co.in before paying, and keep the original packaging, tags and invoice. Return pickup availability varies by pincode.",
  },
  {
    question: "Why would an Adidas promo code be declined at checkout?",
    answer:
      "Common causes are an excluded category or SKU, a minimum cart floor, or a members-only code used while signed out. Sign in first and read the code's eligibility line. If the checkout panel refuses the code, the cart tells you the real price before you pay.",
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

const STORE_CTAS = [
  { href: "/go/adidas?src=guide-adidas-mid", store: "adidas.co.in", edge: "Newest drops, adiClub member pricing and direct brand returns", label: "Check live offers on adidas.co.in" },
  { href: "/go/amazon-in?src=guide-adidas-mid", store: "Amazon India", edge: "Prime delivery and bank slabs on Duramo, Runfalcon and select Originals", label: "Check live Adidas prices on Amazon India" },
  { href: "/go/flipkart?src=guide-adidas-mid", store: "Flipkart", edge: "Sale-event clearance on older colourways — verify seller and open-box inspection", label: "Check live Adidas prices on Flipkart" },
];

const FACTORS = [
  {
    title: "1. Core Originals vs last-season running stock",
    winner: "Winner: wait on Ultraboost and outlet lines; buy Samba and Gazelle if you need them",
    number: "Core staples rarely drop below 10–20%; outgoing running models reach the 30–50% brackets",
    detail: "The deepest discounts sit in the outlet tail, not the core colourways. If your size in a core style is available at a small discount, waiting rarely produces a better deal.",
  },
  {
    title: "2. Member code plus bank slab",
    winner: "Winner: stack only where the SKU is not excluded",
    number: "Worked example: ₹9,999 MRP → ₹6,999 → ₹5,949 → ₹5,354 payable",
    detail: "Sale price first, then an eligible member coupon, then the bank instant discount on the reduced total. Excluded SKUs lose the member-code step entirely.",
  },
  {
    title: "3. Sizing and fit",
    winner: "Winner: measure in cm against the product-page chart",
    number: "Samba and Gazelle use a narrow toe box; consider half a size up for wide feet",
    detail: "Ultraboost and SL models run closer to true size. The adidas.co.in size chart on the exact product page is more reliable than general advice.",
  },
  {
    title: "4. Official store vs marketplace",
    winner: "Winner: adidas.co.in for authenticity; marketplaces for clearance price",
    number: "Verify authorised seller and box serial tag on delivery",
    detail: "The official store gives direct returns and first access to new drops. Marketplace deals can be cheaper on old colourways but carry higher counterfeit risk.",
  },
  {
    title: "5. Return rules",
    winner: "Winner: check the policy on your order before paying",
    number: "Return windows in India have shortened at some brands — do not assume 30 days",
    detail: "Keep the tags, box and invoice. Pincode-level pickup availability can differ from the published policy.",
  },
];

const EXPLORE_LINKS = [
  { href: "/topics/fashion", label: "Fashion & Style topic hub" },
  { href: "/categories/fashion", label: "Fashion coupons, footwear deals and guides" },
  { href: "/compare/adidas-vs-nike-vs-asics-running-shoes-india", label: "Adidas vs Nike vs ASICS for Indian roads" },
  { href: "/compare/myntra-vs-ajio-vs-brand-stores-fashion-india", label: "Myntra vs Ajio vs official brand stores" },
  { href: "/guides/adidas-india-ultraboost-originals-training-2026-guide", label: "Adidas India 2026: runners, Originals and training picks" },
  { href: "/stores/adidas", label: "Adidas official store hub" },
  { href: "/stores/amazon-in", label: "Amazon India store hub" },
  { href: "/stores/flipkart", label: "Flipkart store hub" },
];

export default function AdidasSalePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Adidas Sale India 2026", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "Adidas Sale India 2026", path: canonical },
      ])} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Research reviewed 24 Nov 2026 · Sale slabs vary by SKU and size</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Adidas India&apos;s “up to 60% off” applies to outlet tail stock, outgoing running models and odd sizes — not core Samba OG or Gazelle staples. Here is which lines actually drop, how member codes stack with bank slabs, and where to check live prices.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Who it is for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Sneaker and running buyers comparing Samba, Gazelle, Ultraboost and Duramo across adidas.co.in, Amazon and Flipkart.</li>
              <li>• Shoppers checking whether adiClub codes and bank slabs stack on already-discounted styles.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Buyers expecting 50–60% off core black/white Samba or Gazelle in common sizes — those colourways rarely go that deep.</li>
              <li>• Serious marathon runners comparing midsole technology — read our running-shoe comparison first.</li>
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
          question="Is the Adidas India 2026 sale worth waiting for?"
          answer="Worth waiting for on outgoing Ultraboost generations, SL 72 / Ozelia colourways and Duramo trainers, where outlet cuts can be substantial. Core Samba and Gazelle rarely drop past small single-to-low-double-digit percentages. Buy from adidas.co.in for new drops and returns; check Amazon and Flipkart for clearance colourways, verifying the seller."
          jumpHref="#adidas-stack-order"
          jumpLabel="See the stacking order"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/go/adidas?src=guide-adidas-verdict" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Shop the official Adidas India sale <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-adidas-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-adidas-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section aria-labelledby="lines" className="mt-12">
          <h2 id="lines" className="font-serif text-2xl font-extrabold text-ink">Adidas 2026 product lines: discount depth and fit</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Discount brackets describe how each line typically behaves in sales. We have not checked live prices for these models, so the price column tells you what to verify rather than quoting a number we cannot source.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Product line</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Typical discount bracket</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Size availability</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Fit note</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Price</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Originals core (Samba OG, Gazelle)", "0–20%; often excluded from sitewide codes", "Full runs at MRP; discounts sell out fast", "Narrow toe box — consider half a size up for wide feet", "Check live price on all three stores"],
                  ["Performance running (Ultraboost 1.0 / 5)", "30–50% on outgoing colourways", "Good in seasonal sales; odd sizes in outlet", "Close to true size for most buyers", "Check live price on all three stores"],
                  ["Originals lifestyle (SL 72, Rivalry, Ozelia)", "25–45% in Republic Day, festive and Black Friday sales", "Gaps in UK 8–9 mid-sale", "SL 72 runs slightly slim", "Check live price on all three stores"],
                  ["Budget daily runners (Duramo SL, Runfalcon)", "35–60% across outlet and marketplaces", "High stock across stores", "True to size", "Check live price on all three stores"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-ledger-line">
                    {row.map((cell, i) => (
                      i === 0
                        ? <th key={cell} scope="row" className="px-4 py-3 font-semibold text-ink">{cell}</th>
                        : <td key={`${cell}-${i}`} className="px-4 py-3 text-ink-soft">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="compare-stores" className="mt-10">
          <h2 id="compare-stores" className="font-serif text-xl font-extrabold text-ink">Compare the same line across all three stores</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {STORE_CTAS.map((cta) => (
              <Link key={cta.href} href={cta.href} className="group rounded-2xl border border-ledger-line bg-white p-4 transition hover:border-ink/30 hover:shadow-sm">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">{cta.store}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{cta.edge}</p>
                <p className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-durza-deep group-hover:underline">
                  {cta.label} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="worked" className="mt-10 rounded-3xl border border-[#141413]/10 bg-white p-5 shadow-sm sm:p-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a4b12]">Worked maths</p>
          <h2 id="worked" className="mt-2 font-serif text-2xl font-extrabold text-[#141413]">
            How a sale, a member code and a bank slab interact
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5a564f]">Illustrative arithmetic with inputs shown — not a live quote or a guaranteed code.</p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            <li>• Inputs: MRP ₹9,999, seasonal markdown 30%, member coupon 15% where eligible, bank 10% instant discount up to ₹1,000 with a ₹5,000 minimum.</li>
            <li>• Sale price: ₹9,999 − 30% = ₹6,999.</li>
            <li>• Member coupon: ₹6,999 − ₹1,050 = ₹5,949, still above the bank minimum.</li>
            <li>• Bank slab: 10% × ₹5,949 = ₹595 → net payable ₹5,354, an effective 46.5% off MRP.</li>
            <li>• Trap: if the shoe is marked “excluded from promotional discounts”, the member step drops out and only the bank slab applies. Verify the cart before paying.</li>
          </ul>
        </section>

        <section aria-labelledby="adidas-stack-order" className="mt-12">
          <h2 id="adidas-stack-order" className="font-serif text-2xl font-extrabold text-ink">How to stack discounts, in order</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-ink-soft">
            <li>Sale base price first — the item-level markdown is already applied by the store.</li>
            <li>Then a member or promo code, if that SKU is eligible.</li>
            <li>Then the bank instant discount on the reduced amount, subject to minimum spend and eligible card terms.</li>
            <li>Then EMI or exchange rewards, only if fees do not erase the saving.</li>
            <li>Keep the invoice and tags for returns — check the current return window on the order page.</li>
          </ol>
        </section>

        <section aria-labelledby="factors" className="mt-12">
          <h2 id="factors" className="font-serif text-2xl font-extrabold text-ink">Five decision factors with a winner and a number</h2>
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

        <section aria-labelledby="sizing" className="mt-12">
          <h2 id="sizing" className="font-serif text-2xl font-extrabold text-ink">Sizing: the part most shoppers get wrong</h2>
          <p className="mt-3 text-base leading-8 text-ink-soft">
            Samba and Gazelle use a narrow toe box; if you are between sizes or have wide feet, consider half a size up. Ultraboost and SL models run closer to true size. The adidas.co.in size chart on the exact product page is the most accurate reference — measure heel to toe in the evening and match the centimetre column.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            Marketplace sneakers carry a higher counterfeit risk. On delivery, verify the authorised seller, box serial tag and return eligibility before removing tags.
          </p>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We reviewed adidas.co.in&apos;s store structure, product-category layout and published size-chart approach on 24 Nov 2026. The discount brackets describe typical sale behaviour, not live offers for a specific SKU. The worked stack is illustrative arithmetic. We did not purchase, wear-test or lab-test any shoe, and marketplace prices and seller eligibility change daily. Check the exact model, seller authorisation and return window before paying. Durza earns a commission on qualifying purchases through tracked Adidas, Amazon and Flipkart links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <section aria-labelledby="check-live" className="mt-10">
          <h2 id="check-live" className="font-serif text-2xl font-extrabold text-ink">Check live Adidas prices across all three stores</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { href: "/go/adidas?src=guide-adidas-bottom", label: "Check live offers on adidas.co.in" },
              { href: "/go/amazon-in?src=guide-adidas-bottom", label: "Check live Adidas prices on Amazon India" },
              { href: "/go/flipkart?src=guide-adidas-bottom", label: "Check live Adidas prices on Flipkart" },
            ].map((cta) => (
              <Link key={cta.href} href={cta.href} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
                {cta.label} <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="explore" className="mt-12 border-t border-ledger-line pt-8">
          <h2 id="explore" className="font-serif text-2xl font-extrabold text-ink">Keep exploring</h2>
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
          Research reviewed 24 Nov 2026. Discount brackets and prices change by SKU, size and sale window. We do not fabricate prices or claim a code works without checkout confirmation. Using our tracked links may earn us a commission at no extra cost to you.
        </div>
      </article>
    </>
  );
}
