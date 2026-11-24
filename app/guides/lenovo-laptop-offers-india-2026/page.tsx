import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EditorialByline from "@/components/editorial/EditorialByline";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import QuickAnswer from "@/components/ui/QuickAnswer";

const canonical = "/guides/lenovo-laptop-offers-india-2026";
const title = "Lenovo Laptop Offers & Deals in India (2026): IdeaPad, ThinkBook, LOQ & ThinkPad Compared";
const description =
  "Lenovo India headline banners apply to select SKUs. Compare verified IdeaPad and ThinkBook prices against marketplace bank slabs, with three-store CTAs and worked checkout maths. Reviewed 24 Nov 2026.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Which Lenovo laptop should I buy for college in India?",
    answer:
      "For most students the IdeaPad Slim 3 with a Ryzen 5 7530U, 16GB RAM across two DIMM slots and a 512GB SSD is the safe value pick — reviewed at ₹43,990 in an October 2026 roundup. If you compile code or run large spreadsheets daily, the ThinkBook 16 with a 45W Ryzen 5 7535HS scored 9,393 in Cinebench R23 multi-core in 91mobiles' September 2026 testing and was reviewed at ₹46,990.",
  },
  {
    question: "Are Lenovo 'flat ₹20,000 off' deals actually real?",
    answer:
      "Treat headline discounts as a question, not a number. They usually apply to a slice of the line — often a top-tier SKU or older stock — not uniformly. Open the exact configuration, add it to cart, and compare the payable amount across Lenovo.com, Amazon India and Flipkart. If the cart disagrees with the banner, the banner refers to another SKU.",
  },
  {
    question: "Can I stack card discounts with Lenovo website offers in India?",
    answer:
      "Often, if you order from Lenovo's official India store with an eligible bank card. The order is: Lenovo coupon or student offer first, bank instant discount on the reduced payable amount second, EMI rewards last. Two bank offers do not stack. Always read the payment summary before confirming.",
  },
  {
    question: "Is Lenovo.com India cheaper than Amazon or Flipkart?",
    answer:
      "On listed prices they are often within a few hundred rupees for the same SKU. Lenovo.com is where student verification and discounted Accidental Damage Protection live. Amazon and Flipkart can win when a flat ₹3,000–₹5,000 bank instant discount is live, or when exchange credit is generous. Compare the final payable amount, not the banner. Our ₹50,000 laptop comparison does this side by side.",
  },
  {
    question: "Which Lenovo laptop component should I not compromise on in India?",
    answer:
      "RAM first, then storage. 8GB feels fine briefly and tight after a year of browser tabs and video calls. Prefer 16GB even at a lower CPU tier, and at least a 512GB SSD. Check whether the memory is soldered — several slim IdeaPad and Yoga SKUs cannot be upgraded later.",
  },
  {
    question: "How is the Lenovo India warranty service?",
    answer:
      "Lenovo's India service network is broad. Keep the GST invoice and register the machine on the Lenovo India support site soon after purchase — service requests move faster with a registered product. Consider accidental-damage coverage for a student or gaming laptop, and check the exact terms before buying it as an add-on.",
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
  {
    href: "/go/lenovo?src=guide-lenovo-mid",
    store: "Lenovo.com India",
    edge: "Official eStore — student verification, CTO configs and discounted ADP",
    label: "Check Live Offers on Lenovo.com India",
  },
  {
    href: "/go/amazon-in?src=guide-lenovo-mid",
    store: "Amazon India",
    edge: "1–2 day delivery, flat bank slabs and easy GST invoice download",
    label: "Check Live Lenovo Prices on Amazon India",
  },
  {
    href: "/go/flipkart?src=guide-lenovo-mid",
    store: "Flipkart",
    edge: "Exchange bonuses on old laptops and open-box inspection before OTP",
    label: "Check Live Lenovo Prices on Flipkart",
  },
];

const FACTORS = [
  {
    title: "1. CPU wattage decides sustained work",
    winner: "Winner: ThinkBook 16 (45W) for compiling; IdeaPad Slim 3 (15W) for battery",
    number: "9,393 Cinebench R23 multi-core for the Ryzen 5 7535HS",
    detail: "A 45W HS-series chip holds up under long compiles and large spreadsheets; a 15W U-series chip is quieter and lasts longer off mains. The reviewed price gap was about ₹3,000.",
  },
  {
    title: "2. Upgradeability beats shipped RAM",
    winner: "Winner: ThinkBook 16 — dual RAM and dual M.2 slots",
    number: "IdeaPad Slim 3: 2 DIMM slots · ThinkBook 16: 2 RAM + 2 SSD slots",
    detail: "Avoid 8GB soldered configurations. Both reviewed models let you add memory and storage later without replacing the machine.",
  },
  {
    title: "3. Display quality varies inside one series",
    winner: "Winner: ThinkBook 16 (300 nits) or a 100% sRGB gaming panel",
    number: "IdeaPad Slim 3: 250 nits · ThinkBook 16: 300 nits",
    detail: "A 250-nit panel is fine indoors and dim near a sunny window. Check the exact panel spec on the SKU, not just the series name.",
  },
  {
    title: "4. Store choice changes the final payable amount",
    winner: "Winner: Lenovo.com for ADP/student perks; Amazon or Flipkart for flat bank slabs",
    number: "A ₹3,000 flat bank discount on ₹45,000 is roughly 6.7% off",
    detail: "Official-store custom builds can take 2–4 weeks to ship; marketplaces deliver pre-built SKUs in 1–3 days. Compare delivery time, warranty extras and the final cart total.",
  },
  {
    title: "5. Warranty and honest downsides",
    winner: "Winner: buyer awareness",
    number: "Gaming bricks run 170W–230W; CTO builds can take 2–4 weeks",
    detail: "Legion and LOQ machines are heavy and hot with a large charger. Slim IdeaPad and Yoga SKUs may have soldered RAM. Register the machine and keep the GST invoice for service.",
  },
];

const EXPLORE_LINKS = [
  { href: "/topics/tech", label: "Tech & Gadgets topic hub" },
  { href: "/categories/electronics", label: "Electronics coupons, laptop deals and guides" },
  { href: "/compare/best-laptops-under-50000-india-coding-office-2026", label: "Best laptops under ₹50,000 compared" },
  { href: "/compare/official-brand-store-vs-amazon-flipkart-laptops-india", label: "Official stores vs Amazon & Flipkart: warranty and price" },
  { href: "/compare/best-laptop-deals-india-amazon-vs-flipkart-2026", label: "₹35K–₹75K laptops: Amazon vs Flipkart vs brand stores" },
  { href: "/reviews/lenovo-loq-and-thinkpad-india-official-store-review", label: "Buying direct from Lenovo India" },
  { href: "/guides/best-acer-laptop-deals-promo-codes", label: "Acer laptop deals and promo codes" },
  { href: "/tools", label: "Durza shopping calculators" },
  { href: "/stores/lenovo", label: "Lenovo India store hub" },
  { href: "/stores/amazon-in", label: "Amazon India store hub" },
  { href: "/stores/flipkart", label: "Flipkart store hub" },
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
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "Lenovo Laptop Offers in India 2026", path: canonical },
      ])} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Research reviewed 24 Nov 2026 · Specs from published tests and roundups</span>
        </p>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          Lenovo India&apos;s headline &ldquo;flat ₹20,000 off&rdquo; banners apply to select SKUs. On everyday ₹40,000–₹85,000 laptops, real savings come from comparing the official-store stack against flat bank slabs on Amazon and Flipkart.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-durza-deep">Who it is for</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Students, coders and office buyers comparing IdeaPad Slim 3 and ThinkBook 16 with ThinkPad and LOQ models.</li>
              <li>• Buyers deciding between Lenovo.com CTO builds and ready-to-ship marketplace SKUs.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-800">Who should skip it</p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-ink-soft">
              <li>• Buyers needing a custom build in 1–2 days — CTO orders can take 2–4 weeks.</li>
              <li>• Ultralight OLED seekers under ₹75,000 — compare Acer Swift Go 14 OLED first.</li>
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
          question="Which Lenovo laptop and store should you pick right now?"
          answer="Under ₹45,000 for multitasking, the IdeaPad Slim 3 with Ryzen 5 7530U and 16GB across two DIMM slots was reviewed at ₹43,990. For compiling and heavy spreadsheets, the ThinkBook 16 with a 45W Ryzen 5 7535HS was ₹46,990. Buy direct when you need student perks or ADP; compare Amazon and Flipkart when a flat bank slab is live."
          jumpHref="#lenovo-sku-table"
          jumpLabel="See the SKU comparison"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/go/lenovo?src=guide-lenovo-verdict" className="inline-flex min-h-12 items-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
            Check Lenovo.com India offers <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/amazon-in?src=guide-lenovo-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Amazon India <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/go/flipkart?src=guide-lenovo-verdict" className="inline-flex min-h-12 items-center rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-paper-raised">
            Compare on Flipkart <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <section aria-labelledby="lenovo-sku-table" className="mt-12">
          <h2 id="lenovo-sku-table" className="font-serif text-2xl font-extrabold text-ink">
            Lenovo 2026 lineup: exact SKUs, specs and reviewed prices
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Two rows use figures we sourced from published tests and roundups. For LOQ and ThinkPad E14 we have not verified a current SKU or price, so those cells say what to check rather than guessing.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-paper-raised">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Model</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Buyer</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">CPU / GPU</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">RAM &amp; storage</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Display</th>
                  <th scope="col" className="px-4 py-3 font-bold text-ink">Price*</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["IdeaPad Slim 3 (Ryzen 5)", "College and everyday office", "Ryzen 5 7530U (15W), integrated Radeon", "16GB DDR4, 2 DIMM slots · 512GB SSD", "15.6-inch FHD IPS, 250 nits", "₹43,990 — Oct 2026 roundup"],
                  ["ThinkBook 16 (Ryzen 5)", "Coding and heavy spreadsheets", "Ryzen 5 7535HS (45W), 9,393 Cinebench R23 multi", "16GB DDR5 · dual RAM + dual M.2 slots", "16-inch WUXGA IPS, 300 nits", "₹46,990 — 91mobiles, Sep 2026"],
                  ["LOQ 15", "1080p gaming and editing", "Verify exact CPU and RTX 4050 TGP on the SKU", "Verify slots and SSD generation", "Verify panel and refresh rate", "Check live price on all three stores"],
                  ["ThinkPad E14", "Business travel and long typing days", "Verify exact generation and CPU", "Verify soldered vs SO-DIMM", "Verify brightness and panel", "Check live price on all three stores"],
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
          <h2 id="compare-stores" className="font-serif text-2xl font-extrabold text-ink">Check the exact model across all three stores</h2>
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

        <section aria-labelledby="banners" className="mt-12">
          <h2 id="banners" className="font-serif text-2xl font-extrabold text-ink">How to read Lenovo promo banners honestly</h2>
          <p className="mt-3 text-base leading-7 text-ink-soft">
            Headline numbers apply to a slice of the line, not all of it. Lenovo runs four distinct mechanisms in India: site-wide instant discounts, series discounts, student/professional offers with verification, and bank EMI instant discounts applied after Lenovo discounts on the payable cart value.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
            {[
              "Open the exact configuration and add it to cart before trusting a banner number.",
              "Compare the payable amount on Lenovo.com, Amazon India and Flipkart — the same SKU can differ by several thousand rupees after bank slabs.",
              "Check whether the RAM is soldered and whether the panel is 250 or 300 nits; both vary inside one series name.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-verified-ink" strokeWidth={2} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stack" className="mt-12">
          <h2 id="stack" className="font-serif text-2xl font-extrabold text-ink">Stack in the right order</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-ink-soft">
            <li>Open the exact SKU on the official India store and confirm RAM, storage, screen and OS.</li>
            <li>Apply any Lenovo coupon or student offer first — it acts on the Lenovo cart.</li>
            <li>Then apply the bank instant discount on the reduced payable amount; two bank offers do not stack.</li>
            <li>Choose EMI only for cash flow — check the processing fee and GST treatment before committing.</li>
            <li>Capture the GST invoice at checkout for warranty registration and returns.</li>
          </ol>
        </section>

        <section aria-labelledby="verification" className="mt-12 rounded-2xl border border-ledger-line bg-white p-5">
          <h2 id="verification" className="font-serif text-xl font-bold text-ink">What we verified, and what we did not</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            We used published specification and pricing data from 91mobiles&apos; September 2026 laptop test (ThinkBook 16 at ₹46,990) and an October 2026 buying roundup (IdeaPad Slim 3 at ₹43,990), and checked Lenovo India store structure on 24 Nov 2026. We did not purchase or physically test these machines, and we have not verified live checkout codes or LOQ/ThinkPad pricing on today&apos;s cart. Prices are dated snapshots. Durza earns a commission on qualifying purchases through tracked Lenovo, Amazon and Flipkart links at no extra cost to you.
          </p>
          <p className="mt-3 text-sm"><Link href="/methodology" className="font-semibold text-durza-deep hover:underline">How Durza researches →</Link></p>
        </section>

        <section aria-labelledby="check-live" className="mt-10">
          <h2 id="check-live" className="font-serif text-2xl font-extrabold text-ink">Check live Lenovo prices across all three stores</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { href: "/go/lenovo?src=guide-lenovo-bottom", store: "Lenovo.com India", label: "Check Live Offers on Lenovo.com India" },
              { href: "/go/amazon-in?src=guide-lenovo-bottom", store: "Amazon India", label: "Check Live Lenovo Prices on Amazon India" },
              { href: "/go/flipkart?src=guide-lenovo-bottom", store: "Flipkart", label: "Check Live Lenovo Prices on Flipkart" },
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
          Research reviewed 24 Nov 2026. Prices, offers and configuration names change on the merchant side — the checkout cart is the source of truth. We do not fabricate codes, discounts or stock status. Using our tracked links may earn us a commission at no extra cost to you.
        </div>
      </article>
    </>
  );
}
