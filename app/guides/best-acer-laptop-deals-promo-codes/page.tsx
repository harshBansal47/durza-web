import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import GuidePromoRevealCTA, { type GuidePromoOffer } from "@/components/guides/GuidePromoRevealCTA";
import QuickAnswer from "@/components/ui/QuickAnswer";

const title = "Best Acer Laptop Deals in India (2026): Nitro Gaming, Swift OLED, Aspire Lite + Verified Promo Codes";
const description =
  "Buying an Acer laptop in India in 2026? We rank Nitro V, Predator Helios, Swift Go OLED & Aspire Lite — with Admitad codes verified in our own audit and stacked with bank offers.";
const canonical = "/guides/best-acer-laptop-deals-promo-codes";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Which Acer laptop should I buy for college in 2026?",
    answer:
      "For most students, the Acer Aspire Lite is the right pick — affordable, thin, fast enough for assignments, coding or video calls. If you are into gaming or video editing on the side, skip up to the Nitro V series — the perf bump matters more than saving on the Lite.",
  },
  {
    question: "Do Acer promo codes work on the official Acer.com India store?",
    answer:
      "Yes. Every code on this page is linked to Acer's official Indian storefront (store.acer.com/en-in). Codes are valid at checkout on the Acer store — they do not apply to marketplace sellers on Amazon or Flipkart. The Admitad tracking we use routes the click and credits the sale to our publisher account only when you buy from Acer India.",
  },
  {
    question: "Can I stack an Acer promo code with a bank card discount?",
    answer:
      "Yes, in most cases. Acer codes work at the Acer cart and reduce the base price. Bank instant discounts then run on the reduced total. Co-branded credit cards can carry additional rewards. Stack in this order: promo code → bank instant discount → EMI rewards.",
  },
  {
    question: "Are Acer student discounts real or just a marketing trick?",
    answer:
      "Acer runs legitimate student and corporate discounts on its India store, typically through an on-site form on the specific product pages. Stacking the student discount with a promo code is allowed — both act on the Acer cart directly.",
  },
  {
    question: "How fast is delivery from Acer.com India?",
    answer:
      "Most pincodes see delivery within 4-7 business days. Tier-1 metros are faster (2-4 days). Express delivery is an option at checkout for a fee; covered by our affiliate tracking just like a regular order.",
  },
];

const GAMING_OFFER: GuidePromoOffer = {
  code: "AD233KGL",
  badge: "FLAT ₹3,000 OFF · GAMING",
  headline: "Extra ₹3,000 OFF on Acer Predator Helios & Nitro V gaming laptops",
  eligibility: "Predator Helios + Nitro V series only · minimum cart rules apply as per Acer",
  offerUrl: "https://store.acer.com/en-in/products",
  subId: "guide_acer_gaming",
};

const SWIFT_OFFER: GuidePromoOffer = {
  code: "AD232KL",
  badge: "FLAT ₹2,000 OFF · THIN & LIGHT",
  headline: "Extra ₹2,000 OFF on Acer Swift Go OLED, Aspire 5 and Spin series",
  eligibility: "Non-gaming Aspire / Swift / Spin series · cart value is on Acer",
  offerUrl: "https://store.acer.com/en-in/products",
  subId: "guide_acer_swift",
};

const BUDGET_OFFER: GuidePromoOffer = {
  code: "TABLET500",
  badge: "₹500 OFF · TABLET",
  headline: "Get ₹500 OFF on Acer tablets & Chromebooks",
  eligibility: "Applicable Acer tablet / Chromebook models · cart value on Acer",
  offerUrl: "https://store.acer.com/en-in/products",
  subId: "guide_acer_budget",
};

const faqSchema = faqPageJsonLd(FAQS);
const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Acer Laptops in India 2026", path: canonical },
]);
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished: "2026-11-14",
  dateModified: "2026-11-14",
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

export default function BestAcerLaptopDealsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: "Best Acer Laptops in India 2026", path: canonical },
        ]}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-verified-ink">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          <span>Updated Nov 2026 · Codes verified on Acer.com</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center rounded-full bg-verified-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-verified-ink"><Sparkles className="mr-1 h-3 w-3" /> Admitad coupon verified</span>
          <span className="inline-flex items-center rounded-full border border-ledger-line bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Official store only</span>
          <span className="inline-flex items-center rounded-full border border-ledger-line bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Student-eligible</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">Best Acer Laptops in India (2026)</h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">Nitro gaming, Swift OLED, Aspire budget — with the Admitad codes we actually used in testing, and where they really apply.</p>
        <QuickAnswer
          question="Which Acer laptop should I buy in India right now?"
          answer="Gaming (ray-tracing / 4K video): Nitro V or Predator Helios. Thin, light, everyday carry: Swift Go OLED. Strictly budget for study or office: Aspire Lite. All three take the Admitad code on the official Acer store plus your student discount."
          jumpHref="#use-case-recs"
          jumpLabel="See the full breakdown below"
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Starting price", value: "₹34,990" },
            { label: "Extra off with codes", value: "up to ₹3,000" },
            { label: "Code eligibility", value: "official store only" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-ledger-line bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">{s.label}</p>
              <p className="mt-1 text-base font-extrabold text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-base leading-8 text-ink-soft">
          We test Acer&apos;s Indian-spec laptops in three buckets — gaming, thin and light, and budget. Each one below ships with the Admitad promo code that&apos;s actually live on Acer.com that we&apos;ve verified in our own store audit, paired with the natural use case. Every CTA copies the code to your clipboard and lands you on the Acer page with the offer tracked — no marketplace seller, no used-unit surprise.
        </p>

        <section aria-labelledby="why-acer-official" className="mt-12">
          <h2 id="why-acer-official" className="font-serif text-2xl font-extrabold text-ink">Why buy direct from the official Acer.com store</h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-ink-soft">
            {[
              "Official India warranty registered on the unit — walk into any Acer service center with just the serial number.",
              "Student and corporate discounts apply on the same checkout, in addition to the Admitad code.",
              "Code stacking: Admitad promo + Acer student discount + bank instant discount + EMI rewards — four layers that only work on the Acer cart.",
              "No grey-import units. The serial, the box, the warranty cell — all Acer.",
              "Images on this page are for reference — actual RAM and SSD configuration is the one you see at Acer at checkout.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-verified-ink" strokeWidth={2} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="use-case-recs" className="mt-12">
          <h2 id="use-case-recs" className="font-serif text-2xl font-extrabold text-ink">Pick your scenario — and grab the right code</h2>

          <h3 className="mt-6 font-serif text-xl font-bold text-ink">Gaming & heavy video editing — Predator Helios / Nitro V</h3>
          <p className="mt-2 text-base leading-7 text-ink-soft">If you&apos;ll genuinely run AAA games with ray tracing on Ultra, or export 4K footage in Premiere, the discrete GPU in the Helios and Nitro V series is non-negotiable. Paired with the ₹3,000-off Admitad code, the HP Omen and Lenovo LOQ trail this Acer deal on like-for-like hardware.</p>
          <GuidePromoRevealCTA offer={GAMING_OFFER} />

          <h3 className="mt-8 font-serif text-xl font-bold text-ink">Thin & light for office, coding, MBA — Swift Go OLED / Aspire 5</h3>
          <p className="mt-2 text-base leading-7 text-ink-soft">If you open a laptop for meetings, Excel, and Slack — and occasionally Lightroom — the Swift line is well-loved. OLED variants are notably better than the IPS Aspire 5s. The ₹2,000-off code pushes the Swift Go OLED further below the Apple MacBook Air&apos;s entry price curve.</p>
          <GuidePromoRevealCTA offer={SWIFT_OFFER} />

          <h3 className="mt-8 font-serif text-xl font-bold text-ink">College everyday, strict budget — Acer Aspire Lite</h3>
          <p className="mt-2 text-base leading-7 text-ink-soft">No-frills, perfect for first laptops. Thin, battery-friendly, fast enough for coding assignments and PDF-dense lecture notes. The ₹500 tablet code from Acer&apos;s India store runs on the Aspire&apos;s Chromebook siblings — useful only for non-laptop purchases.</p>
          <GuidePromoRevealCTA offer={BUDGET_OFFER} />
        </section>

        <section aria-labelledby="checkout-stack" className="mt-12">
          <h2 id="checkout-stack" className="font-serif text-2xl font-extrabold text-ink">How the 4-layer stack actually works at checkout</h2>
          <ol className="mt-4 space-y-4 text-base leading-7 text-ink-soft">
            {[
              "Click one of the deal buttons above — the Admitad code copies to your clipboard. Acer opens in a new tab.",
              "Find the specific laptop you want — go to the product page, pick RAM/SSD configuration if applicable.",
              "Add to cart. The Acer cart now shows the current item price before discounts.",
              "Paste the code in the 'Have a promo code?' box and tap 'Apply' — the cart line shows the Admitad deduction (₹2,000 or ₹3,000).",
              "At payment, pick your bank card — Acer's offer matrix will apply any instant discount on the reduced total.",
              "Select an EMI option. The HDFC/ICICI card reward or bank cashback (the offer depends on which are active at checkout) applies to the remaining total.",
              "Check the order summary: one line for the Admitad code, one line for bank instant discount, one line for rewards. Three layers. One checkout.",
            ].map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-ink">{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl border border-ledger-line bg-yellow-50 px-4 py-3 text-sm leading-6 text-ink-soft">
            <strong className="text-ink">Note:</strong> Acer&apos;s promo codes are condition-dependent. The ₹3,000 gaming code is for Predator Helios and Nitro V only. The ₹2,000 code applies to Swift Go and Aspire Non-gaming. On-screen validation is the ultimate source of truth — if a code fails, the cart tells you before you pay.
          </p>
        </section>

        <section aria-labelledby="explore-more" className="mt-12">
          <h2 id="explore-more" className="font-serif text-2xl font-extrabold text-ink">Explore more verified store hubs on Durza</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/stores/acer", title: "All Acer coupons on Durza", subtitle: "View All Active Acer Coupons & Offers →", primary: true },
              { href: "/stores/boult", title: "Boult gaming audio & watches", subtitle: "Gaming TWS & Smartwatches from ₹799", primary: false },
              { href: "/stores/moglix", title: "Moglix laptop accessories & office gear", subtitle: "Mouse, laptop bag, office mats", primary: false },
              { href: "/stores/nordpass", title: "NordPass on your new laptop", subtitle: "Password security for new devices", primary: false },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">{s.primary ? "Start here" : "Related hub"}</p>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink group-hover:text-inkblue">{s.title}</h3>
                <p className="mt-1 text-xs text-ink-soft">{s.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="acer-faqs" className="mt-12">
          <h2 id="acer-faqs" className="font-serif text-2xl font-extrabold text-ink">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((f) => (
              <details key={f.question} className="rounded-xl border border-ledger-line bg-white p-4">
                <summary className="cursor-pointer text-base font-semibold text-ink">{f.question}</summary>
                <p className="mt-2 text-base leading-7 text-ink-soft">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-ink-soft">
          <p className="font-semibold text-ink">Editorial note</p>
          <p className="mt-1">This guide was written and updated November 2026. Acer&apos;s catalogue and offers change frequently; the codes on this page were verified in our own store audit on Acer.com India on this date. We never invent list prices, discounts, or stock status; exact figures shown on Acer&apos;s checkout are the ones you pay.</p>
        </div>
      </article>
    </>
  );
}
