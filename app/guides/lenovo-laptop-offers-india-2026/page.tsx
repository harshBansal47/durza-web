import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import GuideAffiliateOutButton, { GuideAffiliateOutBanner } from "@/components/guides/GuideAffiliateOutButton";
import { ADMITAD_PROGRAMS } from "@/data/admitad-programs";

const canonical = "/guides/lenovo-laptop-offers-india-2026";
const title = "Lenovo Laptop Offers in India (2026): IdeaPad, ThinkPad, Legion — What's Real vs Inflated";
const description =
  "Every major Lenovo laptop line sold in India — IdeaPad for daily work, ThinkPad for business and study, Legion for gaming — and how to tell a genuine price cut from a padded-MRP discount before you buy from Lenovo.com.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const LENOVO = ADMITAD_PROGRAMS.lenovo;
const LENOVO_STORE = "/stores/lenovo-india";
const LENOVO_HOME = "https://www.lenovo.com/in/en/";

const FAQS = [
  {
    question: "Which Lenovo laptop should I buy for college in India?",
    answer:
      "The IdeaPad line is the safest pick for most students: recent-generation Intel or Ryzen, 16 GB RAM, and a 512 GB SSD handle assignments, coding, video calls and light editing without the premium of a ThinkPad. If you know you need serious reliability and keyboard quality, and you are buying for 4+ years of coursework, the ThinkPad line is worth the extra — the chassis, hinges and service network in India are genuinely better.",
  },
  {
    question: "Are Lenovo 'flat ₹20,000 off' deals actually real?",
    answer:
      "Treat every headline discount as a question to answer, not a number to trust. Check the current price against a market-comparison page and against the recent price history before a sale. Lenovo prices genuinely drop during festive and Republic-Day windows on specific, high-volume configurations — they rarely drop uniformly across the line. If the configuration you want is 'general availability' with no sale marker, the headline usually applies to a different SKU.",
  },
  {
    question: "Can I stack card discounts with Lenovo website offers in India?",
    answer:
      "Usually yes, if you order from Lenovo's official India store (lenovo.com/in) and use a recognised bank EMI or instant discount: the card offer applies at checkout on the payable amount, after the Lenovo offer. The order in which you apply things matters: Lenovo instant discount/coupons first, bank discount on the reduced total, EMI rewards last.",
  },
  {
    question: "Is Lenovo.com India cheaper than Amazon or Flipkart?",
    answer:
      "On listed prices, the official store and Amazon/Flipkart are usually within a few hundred rupees on the same SKU — but the official store is where exclusive student and government offers live, and where the warranty is direct from Lenovo India. Marketplace sellers can be cheaper when they clear old stock; check the seller name, return window and GST invoice before you buy from a marketplace for a big-ticket item.",
  },
  {
    question: "Which Lenovo laptop component should I not compromise on in India?",
    answer:
      "RAM and SSD capacity — in that order. 8 GB of RAM feels fine for three months and tight after a year of browser tabs and Teams/Google Meet. Prefer 16 GB even if it means dropping a lower CPU tier, and an SSD of at least 512 GB; upgrading later means opening the machine inside warranty.",
  },
  {
    question: "How is the Lenovo India warranty service?",
    answer:
      "Lenovo's India service network is broad, and ThinkPad/Legion models with accidental-damage coverage are worth considering for a student or gaming laptop. Keep the GST invoice and register the machine on the Lenovo India support site within the first 30 days — service requests move much faster with a registered machine.",
  },
];

const faqSchema = faqPageJsonLd(FAQS);
const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Lenovo Laptop Offers in India 2026", path: canonical },
]);
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
  author: { "@type": "Organization", name: "Durza Editors", url: absoluteUrl("/about") },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(canonical) },
};

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
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-verified-ink">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          Updated Nov 2026 · Editorial buying guide
        </p>
        <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Lenovo India</p>
        <h1 className="mt-2 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Lenovo Laptop Offers in India (2026)
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          IdeaPad vs ThinkPad vs Legion — what the 2026 discounts are worth, where they apply, and how to stack them with card offers without buying the wrong machine.
        </p>

        <GuideAffiliateOutButton
          program={LENOVO.id}
          ulp={LENOVO_HOME}
          contentRef="lenovo_guide_hero"
          label="Shop Lenovo laptops on the official India store"
          note="Tracked affiliate link through the Lenovo India Admitad program — commission costs you nothing; price is unchanged."
        />

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Which Lenovo line is for which buyer?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              line: "IdeaPad",
              who: "Students & home buyers who want the most machine per rupee",
              watch: "Plastic-thick chassis; check the exact SKU for RAM and SSD size — it varies within the same model name",
            },
            {
              line: "ThinkPad",
              who: "Professionals, programmers, and anyone who travels with the machine daily",
              watch: "Better keyboards and hinges at a genuine premium; think about service coverage, not just specs",
            },
            {
              line: "Legion",
              who: "Gamers and 3D/video editors who need sustained performance",
              watch: "Heavy and hot — check the power brick (170W+, extra weight) and whether the game you buy fits the GPU tier",
            },
          ].map((x) => (
            <div key={x.line} className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
              <p className="font-serif text-lg font-extrabold text-ink">{x.line}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{x.who}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-ink">What to watch: {x.watch}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">How to read Lenovo promo banners honestly</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          Every headline number you see — ₹15,000 off, 28% off this series — applies to a slice of the line, not all of it. Lenovo runs four distinct discount mechanisms in India, and they behave differently:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-ink-soft">
          <li><strong className="text-ink">Site-wide instant discounts</strong> — small, apply broadly, usually visible at cart without a code.</li>
          <li><strong className="text-ink">Series discounts</strong> — apply only to IdeaPad / ThinkPad / Legion; the crossover model within the range is usually not eligible.</li>
          <li><strong className="text-ink">Student / professional discounts</strong> — visible on Lenovo Education Store-type pages or via student verification; stackable with other offers on the official store.</li>
          <li><strong className="text-ink">Bank EMI instant discounts</strong> — applied after Lenovo discounts, on the payable cart value, by specific banks on specific days.</li>
        </ul>
        <p className="mt-3 leading-7 text-ink-soft">
          The honest test for any offer: open the product page, add the specific configuration to cart, and check whether the discount shows up and how the payable changes line by line. If the discount exists in the banner but the cart disagrees, the banner refers to a different configuration.
        </p>

        <GuideAffiliateOutBanner
          program={LENOVO.id}
          ulp={LENOVO_HOME}
          contentRef="lenovo_guide_banner_mid"
          imageUrl="https://cdn.admitad.com/bs/2019/10/18/9e36fbe4e70d48f40a5e74d992b4a7f1.jpg"
          width={300}
          height={250}
          alt="Lenovo India — IdeaPad, ThinkPad and Legion laptops"
        />

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">When Lenovo discounts are genuinely good</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          In India, the deep, configuration-wide cuts appear in a handful of windows: the festive season (September–November), Republic Day (end of January), and graduation/college windows (May–June). Outside these, big headline discounts are usually tied to older-generation stock or specific GPU tiers. Between windows, the official store still runs bank-instant discounts that shave a few hundred to low thousands off, but the ₹20,000+ cuts are rare.
        </p>
        <p className="mt-3 leading-7 text-ink-soft">
          Practical rule: if you need a laptop in the next 90 days, set an alert and let the sale come to you rather than buying at the pre-sale price out of urgency. If you need one this week, buy the configuration that genuinely fits your work and bank the instant bank discount instead of waiting.
        </p>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Stack in the right order</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-ink-soft">
          <li>Open the product page on the official India store; confirm the exact SKU (RAM, storage, screen, OS).</li>
          <li>Apply any Lenovo discount/coupon or student offer first — it acts on the Lenovo cart.</li>
          <li>Then apply bank instant discount (on the reduced value) tied to your card; check eligibility for your bank before entering card details.</li>
          <li>Choose EMI tenure; note the processing fee — it can erase 1–2% of the discount.</li>
          <li>Capture the GST invoice at checkout; it is needed for warranty registration and returns.</li>
        </ol>

        <GuideAffiliateOutButton
          program={LENOVO.id}
          ulp={LENOVO_HOME}
          contentRef="lenovo_guide_verify"
          label="Browse Lenovo laptop offers in India"
          note="Opens the official Lenovo India storefront — see which configurations carry the current discounts."
        />

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Lenovo vs Acer vs ASUS for the same budget</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          All three brands sell on Lenovo.com/Acer India/ASUS India with broadly similar pricing. The honest differentiators in India are service speed and configuration discipline:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-ink-soft">
          <li>Acer is often cheapest on paper and delivers very good configurations at the entry budget, with OLED options on Swift Go; service turnaround varies by city — check your pincode experience with a known owner before buying there.</li>
          <li>ASUS matches Acer on price for gaming-class OLEDs and Zephyrus-class designs; check the exact SKU suffix — sometimes two consecutive numbers apart the "OLED" badge covers different panels.</li>
          <li>Lenovo sits slightly above Acer on average spec per rupee on gaming and business laptops, and its ThinkPad keyboard and hinge quality are genuinely miles ahead for 8-hour typing days.</li>
        </ul>
        <p className="mt-4 leading-7 text-ink-soft">
          If you are cross-shopping, our <Link href="/guides/best-acer-laptop-deals-promo-codes" className="font-semibold text-inkblue underline">Acer laptop deals guide</Link> ranks the Swift Go and Aspire Lite against the ThinkPad range and runs the same card-stacking checks.
        </p>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Lenovo store page on Durza</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          All current Lenovo contractable offers, coupons and deals are aggregated on the Durza store hub. The hub mirrors official Lenovo India offers, which are tracked via the official Admitad program; some promotions run without a code and appear as live deals.
        </p>
        <p className="mt-2 leading-7 text-ink-soft">
          → <Link href={LENOVO_STORE} className="font-semibold text-inkblue underline">Lenovo India store page on Durza</Link>
        </p>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">FAQ</h2>
        <div className="mt-4 space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
              <summary className="cursor-pointer font-semibold leading-6 text-ink">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-ledger-line bg-paper p-4 text-xs leading-5 text-ink-soft">
          Affiliate disclosure: links on this page marked sponsored track a referral to Lenovo India through our Admitad program (commission at no extra cost to you). Prices and offers change on the merchant side; we may not match the checkout cart exactly in real time. See the exact terms on the Lenovo India site before you pay.
        </p>
      </article>
    </>
  );
}
