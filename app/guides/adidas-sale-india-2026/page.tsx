import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import GuideAffiliateOutButton, { GuideAffiliateOutBanner } from "@/components/guides/GuideAffiliateOutButton";
import { ADMITAD_PROGRAMS } from "@/data/admitad-programs";

const canonical = "/guides/adidas-sale-india-2026";
const title = "Adidas Sale in India (2026): What “Up to 60% Off” Means & How the Reading Tricks Work";
const description =
  "Adidas India's sale pages use layered discounts — MRP vs offer price vs coupon stacking. This guide explains which discounts are real, which are seasonal clearance, and how to build the cheapest genuine ₹ order — footwear to running.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const ADIDAS = ADMITAD_PROGRAMS.adidas;
const ADIDAS_STORE = "/stores/adidas";
const ADIDAS_HOME = "https://www.adidas.co.in/";
const ADIDAS_SHOES = "https://www.adidas.co.in/footwear";

const FAQS = [
  {
    question: "Is the 60% OFF on Adidas India real or a marketing number?",
    answer:
      "It is real but narrow: 'up to 60%' applies to selected older-season styles and specific sizes, not the whole catalogue. The newest models and black/white staples (Samba, Boston, Ultraboost for that reason) rarely sit in the deepest discount tiers. If everything in the filter reads 'up to 60%', the banner is averaging masks; the actual average discount across the page is usually 20–35%.",
  },
  {
    question: "Can I stack a coupon on already-discounted Adidas items?",
    answer:
      "Mostly yes on the official India store. Discount coupons on adidas.co.in are separate from the item-level sale price; the coupon applies to the final cart before GST. Excluded categories are printed in the promo terms — usually gift cards and outlet-only SKUs. Bank instant discounts sit on top of that, applied last.",
  },
  {
    question: "Is the Adidas official store really cheaper than Myntra or Ajio?",
    answer:
      "Not always by a big margin on the same shoe — the official store wins on the newest drops (same-day) and reliable returns, and ties on price for most seasonal styles. The official store is the only place running Adidas-exclusive capsules and member pricing. Myntra/Ajio can be cheaper on deep-clearance older models by a small amount, but check the seller and, more importantly, the size guide before buying sportswear from a marketplace we haven't audited.",
  },
  {
    question: "Which Adidas shoe styles in India hold their value or resell?",
    answer:
      "Samba, Gazelle, Ultraboost and SL lineage models sell on resale markets for close to retail when stock is short. They will rarely be in the 40–60% discount brackets during peak demand — if you see them that deep, it's a colourway nobody wants or a damaged box. Buy them at 15–25% off and wear them; don't expect appreciation.",
  },
  {
    question: "How does Adidas India handle returns and exchanges on sale items?",
    answer:
      "The India store supports 30-day returns/exchanges on full-price and sale items alike; the return must be in original packaging with tags. Return pick-ups depend on pincode reachability; confirm the return rule on the specific order before you pay.",
  },
  {
    question: "Are Adidas India promo codes genuine or do they get declined at checkout?",
    answer:
      "Genuine Adidas coupons apply on the India store at checkout, but they are selective about eligible categories and cart value. If checkout silently refuses a code that 'should work', the usual reasons are an excluded category, a minimum cart floor, or a members-only coupon applied by a signed-out browser. Sign in before applying and read the code's eligibility line.",
  },
];

const faqSchema = faqPageJsonLd(FAQS);
const breadcrumbSchema = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Adidas Sale India 2026", path: canonical },
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
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="flex items-center gap-2 text-xs font-semibold text-verified-ink">
          <BadgeCheck aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          Updated Nov 2026 · Editorial buying guide
        </p>
        <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Adidas India</p>
        <h1 className="mt-2 font-serif text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Adidas Sale in India (2026)
        </h1>
        <p className="mt-3 font-serif text-xl leading-snug text-ink-soft">
          “Up to 60% off” explained honestly — what is actually cheap this season, what is just a padded MRP, and how to stack bank instant discounts on official-store orders.
        </p>

        <GuideAffiliateOutButton
          program={ADIDAS.id}
          ulp={ADIDAS_SHOES}
          contentRef="adidas_guide_hero"
          label="Open the Adidas India sale"
          note="Tracked affiliate link through the Adidas Admitad program — no price change for you."
        />

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">What “up to 60% off” really means on Adidas India</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          The banner's number is real but narrow: the deepest discounts sit on specific older-season styles, odd sizes and retired colourways. Three categories earn the steepest cuts, and you can find them by URL rather than by trust:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-ink-soft">
          <li><strong className="text-ink">Outlet / clearance URLs</strong> — the genuinely deep discounts live here, usually with one or two sizes left.</li>
          <li><strong className="text-ink">Seasonal sales (Republic Day / festive)</strong> — sitewide but smaller cuts (15–30%), with fresh stock and complete size runs.</li>
          <li><strong className="text-ink">Member-only offers &amp; coupon stacking</strong> — small but universal; available to any signed-in member account.</li>
        </ul>

        <GuideAffiliateOutBanner
          program={ADIDAS.id}
          ulp={ADIDAS_HOME}
          contentRef="adidas_guide_banner_mid"
          imageUrl="https://cdn.admitad.com/bs/2023/03/14/300x250_27.630d.jpg"
          width={300}
          height={250}
          alt="Adidas India — shoes and sportswear sale"
        />

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">How to stack discounts, in order</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-ink-soft">
          <li><strong className="text-ink">Sale base price first.</strong> Never buy at the pre-sale sticker if you can wait; the same style usually reappears at a deeper cut in the next window.</li>
          <li><strong className="text-ink">Then coupons / member codes</strong> — applied at checkout on the payable cart value, after item-level sale pricing.</li>
          <li><strong className="text-ink">Then bank instant discount</strong> — specific banks on specific days; check eligibility before entering card details.</li>
          <li><strong className="text-ink">Then EMI / exchange rewards</strong> — only if the processing fee does not erase the bank discount.</li>
          <li><strong className="text-ink">Gift the tax back to yourself</strong> — keep the GST invoice; returns need it.</li>
        </ol>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Which Adidas models are worth buying at full pride vs waiting</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
            <p className="font-serif text-lg font-extrabold text-ink">Samba / Gazelle</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The most-searched sneakers in India right now; rarely go on deep sale. Waiting 3–4 months at best saves ₹1–2k, not 50%. If you like them, buy them; waiting for a steal usually means a different silhouette or a grey colourway.
            </p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
            <p className="font-serif text-lg font-extrabold text-ink">Ultraboost</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The remaining stock from the last generation sits in outlet at genuine deep cuts. Slightly older foam is still genuinely comfortable for city running; check the generation suffix before paying the new-model price for an older chassis.
            </p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
            <p className="font-serif text-lg font-extrabold text-ink">Football boots (Pre-owned + reaffirmed)</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Cleat models for artificial-grass pitches run cyclical clearance — but football boots are size- and pitch-dependent. Buy in season at the sale windows rather than hoping for a random drop.
            </p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5 shadow-sm">
            <p className="font-serif text-lg font-extrabold text-ink">Running / Originals crossover</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The SL range, Ozelia and Rivalry models sell through in odd sizes — if your size is gone, it is gone; do not wait. Conversely, if the pair you want is in stock at a small discount only, buy and do not hunt further.
            </p>
          </div>
        </div>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Sizing in India: the part most shoppers get wrong</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          Adidas India runs about half a size small for Indian city footwork (standing on metro platforms and office carpets, not running). If you are usually a UK 8 in other brands, try UK 8.5 in Adidas Samba/Gazelle before ordering straight. Ultraboost and SL models run more true to size. The adidas.co.in size chart on each product page is the single most accurate reference — measure your foot (heel to toe) in the evening and match the cm column.
        </p>

        <h2 className="mt-10 font-serif text-2xl font-bold text-ink">Adidas store hub on Durza</h2>
        <p className="mt-3 leading-7 text-ink-soft">
          Every live coupon and auto-applied deal we have captured from the Adidas India program is aggregated on the Durza hub — sizes and eligibility included. Deals without a code apply automatically at checkout.
        </p>
        <p className="mt-2 leading-7 text-ink-soft">
          → <Link href={ADIDAS_STORE} className="font-semibold text-inkblue underline">Adidas store page on Durza</Link>
        </p>

        <GuideAffiliateOutButton
          program={ADIDAS.id}
          ulp={ADIDAS_HOME}
          contentRef="adidas_guide_verify"
          label="See the live Adidas India sale"
          note="Opens the official Adidas.co.in storefront — eligibility and cart terms are shown there."
        />

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
          Affiliate disclosure: links marked sponsored on this page track a referral to adidas.co.in through our Admitad India program (commission at no extra cost to you). Prices, eligibility and sale windows are Adidas's own — we may not match the exact cart total in real time. Always confirm the size, return rule and final price on Adidas.co.in before you pay.
        </p>
      </article>
    </>
  );
}
