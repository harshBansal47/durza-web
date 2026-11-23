import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, IndianRupee, Lightbulb, ShoppingBag } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageTitle from "@/components/ui/PageTitle";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { resilient } from "@/lib/api";
import { formatDate, formatDiscount } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";
import Image from "next/image";

export const revalidate = 3600;

const canonical = "/black-friday";
const title = "Black Friday Sale 2026 India: Dates (Nov 27), Store Windows & What to Actually Buy | Durza";
const description =
  "Black Friday 2026 in India lands on Friday, 27 November (Cyber Monday 30 Nov). Compare expected Amazon, Flipkart, Nykaa Pink Friday, Myntra & Lenovo sale windows, bank card stacking rules, and categories worth buying.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

const FAQS = [
  {
    question: "Is Black Friday a real sale in India?",
    answer:
      "Yes — Amazon India, Myntra, Nykaa, Flipkart, Lenskart and many brand stores run Black Friday discounts. Indian sellers largely mirror the US dates (the Friday after US Thanksgiving). The discounts are real but the depth varies — electronics and fashion typically see the steepest cuts, while groceries and food delivery rarely participate.",
  },
  {
    question: "When is Black Friday in India?",
    answer:
      "Black Friday falls on the last Friday of November — the day after US Thanksgiving. In 2026 that is Friday 27 November. Many stores extend it into a 'Black Friday weekend' or 'Cyber Monday' week running through Monday 30 November.",
  },
  {
    question: "How do I stack a Black Friday deal with a bank offer?",
    answer:
      "Apply the store's sale or promo code first to get the discounted cart total, then select your bank at the payment page. The bank's instant discount applies to that reduced amount — provided you still meet the bank's minimum spend threshold. Check the exclusion list on the bank's offer page, since some banks exclude already-discounted items.",
  },
  {
    question: "Should I buy electronics on Black Friday in India?",
    answer:
      "Electronics (laptops, earbuds, monitors) tend to see the most reliable discounts — brands clear older SKUs before year-end. Avoid buying last-gen products just because they are on sale; compare the discounted price to the year-round price on platforms like Amazon or Flipkart to confirm the saving is real.",
  },
  {
    question: "Which categories should I skip on Black Friday?",
    answer:
      "Groceries, fresh food delivery, most SaaS subscriptions and insurance products rarely carry meaningful Black Friday offers in India. Jewellery discounts often come with inflated MRPs — check the base price from a few weeks earlier before treating a percentage off as a saving.",
  },
];

const CATEGORIES = [
  {
    name: "Laptops & Electronics",
    why: "Most reliable category — brands clear older SKUs before year-end. Cross-check the price on the brand's own site.",
    href: "/categories/electronics",
  },
  {
    name: "Fashion & Footwear",
    why: "Myntra, Ajio and Levi's typically run 40–70% off during the weekend. Useful for buying ahead of winter.",
    href: "/categories/fashion",
  },
  {
    name: "Beauty & Skincare",
    why: "Nykaa and D2C beauty brands (Dot & Key, Kama Ayurveda, Brillare) often bundle free products with purchase.",
    href: "/categories/beauty",
  },
  {
    name: "Health & Fitness",
    why: "Protein, supplements and home gym gear see site-wide codes. Stack with a no-cost EMI for large orders.",
    href: "/categories/supplements",
  },
  {
    name: "Home & Kitchen",
    why: "Nilkamal, Pepperfry and Wonderchef often run deep cuts. Check the actual MRP — furniture 'discounts' can be inflated.",
    href: "/categories/home-kitchen",
  },
  {
    name: "Bank & Credit Card Slabs",
    why: "Check which core HDFC/ICICI/SBI cards give 10% instant discounts—and why co-branded cashback cards are often excluded.",
    href: "/bank-offers",
  },
];

const FEATURED_STORE_SLUGS = [
  "amazon-in",
  "flipkart",
  "lenovo",
  "asus",
  "myntra",
  "nykaa",
  "ajio-com-ecommerce-cps-india",
  "adidas",
  "dot-and-key",
  "kama-ayurveda",
  "healthkart",
  "nilkamalfurniture",
];

const WINDOWS = [
  {
    retailer: "Nykaa Pink Friday Sale",
    window: "Expected ~21–30 Nov (Privé early access first)",
    categories: "Skincare, luxury beauty & B1G1/gift-with-purchase sets",
    hubs: [
      { href: "/stores/nykaa", label: "Nykaa" },
      { href: "/stores/dot-and-key", label: "Dot & Key" },
    ],
  },
  {
    retailer: "Flipkart Black Friday / Cyber Week",
    window: "Expected ~22–30 Nov (Plus/Black early access)",
    categories: "Smartphones with exchange bonuses & RTX entry laptops",
    hubs: [{ href: "/stores/flipkart", label: "Flipkart" }],
  },
  {
    retailer: "Myntra & Ajio Black Friday",
    window: "Expected ~23–30 Nov",
    categories: "Winter jackets, sneakers & end-of-season fashion",
    hubs: [
      { href: "/stores/myntra", label: "Myntra" },
      { href: "/stores/adidas", label: "Adidas" },
    ],
  },
  {
    retailer: "Amazon India Black Friday / Cyber Monday",
    window: "Expected ~25–30 Nov (Prime early access)",
    categories: "Laptops, 4K TVs, ANC headphones & PC upgrades",
    hubs: [{ href: "/stores/amazon-in", label: "Amazon India" }],
  },
  {
    retailer: "Lenovo & ASUS Official India Stores",
    window: "Late-Nov Cyber Week (22 Nov – early Dec)",
    categories: "Custom CTO laptops, ₹999 3-Yr ADP & SheerID student perks",
    hubs: [
      { href: "/stores/lenovo", label: "Lenovo" },
      { href: "/stores/asus", label: "ASUS" },
    ],
  },
];

function isVerifiedDeal(coupon: { is_verified?: boolean; verification_status?: string }): boolean {
  return Boolean(coupon.is_verified) || coupon.verification_status === "verified";
}

export default async function BlackFridayPage() {
  const [storesPage, liveOffersRes] = await Promise.all([
    resilient.listStores({ limit: 100 }),
    resilient
      .listCoupons({
        active_only: true,
        sort: "recommended",
        limit: 100,
      })
      .catch(() => ({ items: [], total: 0, skip: 0, limit: 0 })),
  ]);

  const storeBySlug = new Map(storesPage.items.map((s) => [s.slug, s]));
  const storeById = new Map(storesPage.items.map((s) => [s.id, s]));
  const featuredStores = FEATURED_STORE_SLUGS.map((slug) => storeBySlug.get(slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  const seenStores = new Set<string>();
  const dedupedOffers = liveOffersRes.items
    .filter((coupon) => {
      if (seenStores.has(coupon.store_id)) return false;
      const store = storeById.get(coupon.store_id);
      const discount = formatDiscount(coupon, store?.currency ?? "INR");
      const hasBadge = Boolean(discount && !discount.startsWith("MEGA") && discount.trim().length > 0);
      if (!hasBadge && !isVerifiedDeal(coupon)) return false;
      seenStores.add(coupon.store_id);
      return true;
    })
    .slice(0, 8);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Black Friday", path: "/black-friday" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqPageJsonLd(FAQS)} />

      <Breadcrumbs items={crumbs} />

      <header className="mt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
          Black Friday in India
        </p>
        <PageTitle className="mt-2 leading-tight">
          Black Friday — Dates, Deals &amp; What to Actually Buy
        </PageTitle>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
          Black Friday 2026 in India lands on <strong>Friday, 27 November</strong> (Cyber Monday <strong>30 November</strong>). Use this hub to compare expected store windows, bank-card stacking, and the categories that usually deliver real value—without fake urgency.
        </p>
      </header>

      <section
        className="mt-8 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50/40 p-5 sm:p-6"
        aria-labelledby="bf-date-heading"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="bf-date-heading" className="font-serif text-lg font-bold text-ink">
              2026 dates
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              <li>
                <strong className="text-ink">Black Friday:</strong> Friday 27 November 2026
              </li>
              <li>
                <strong className="text-ink">Cyber Monday:</strong> Monday 30 November 2026
              </li>
              <li className="mt-1 text-xs">
                Most Indian stores extend campaigns across the weekend; some start early in the week before.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="bf-windows-heading">
        <h2 id="bf-windows-heading" className="font-serif text-2xl font-bold text-ink">
          2026 India Black Friday Sale Windows
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Calendar facts are fixed; retailer windows below are <strong>expected</strong> based on typical India sale patterns unless officially announced. Always verify dates and offers on the live store page.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-ledger-line bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-paper text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Retailer / Event</th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">2026 Window Status</th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Best Categories to Watch</th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Durza Hub</th>
              </tr>
            </thead>
            <tbody>
              {WINDOWS.map((row, i) => (
                <tr key={row.retailer} className={i === 0 ? "" : "border-t border-ledger-line"}>
                  <th scope="row" className="px-4 py-3 align-top font-semibold text-ink sm:px-5">{row.retailer}</th>
                  <td className="px-4 py-3 align-top text-ink-soft sm:px-5">{row.window}</td>
                  <td className="px-4 py-3 align-top text-ink-soft sm:px-5">{row.categories}</td>
                  <td className="px-4 py-3 align-top sm:px-5">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {row.hubs.map((hub) => (
                        <Link key={hub.href} href={hub.href} className="font-medium text-inkblue hover:underline">
                          {hub.label}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-6 space-y-2 rounded-xl border border-ledger-line bg-paper-raised p-4">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">In-depth 2026 guide →</span>{" "}
          <Link href="/guides/black-friday-2026-date-and-what-to-buy" className="text-inkblue underline underline-offset-2 hover:no-underline">
            Black Friday 2026: Date and Best Buys on Amazon India
          </Link>{" "}
          — covers what to buy, what to skip, and when to shop.
        </p>
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">Full 2026 calendar →</span>{" "}
          <Link href="/guides/amazon-flipkart-sale-dates-2026" className="text-inkblue underline underline-offset-2 hover:no-underline">
            Amazon &amp; Flipkart Sale Dates India 2026
          </Link>{" "}
          — Black Friday, Cyber Monday, Christmas &amp; New Year, plus expected Big Billion Days / Great Indian Festival windows.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6" aria-labelledby="bf-verdicts-heading">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800">Side-by-Side Black Friday Verdicts</p>
        <h2 id="bf-verdicts-heading" className="mt-2 font-serif text-xl font-bold text-ink">Compare the real trade-offs before checkout</h2>
        <ul className="mt-4 space-y-3 text-sm sm:text-base">
          <li>
            <Link href="/compare/black-friday-2026-india-best-deals-vs-regular-sale" className="inline-flex items-start gap-2 font-medium text-inkblue hover:underline">
              <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span><span className="font-semibold text-ink">Black Friday 2026 India vs. Regular Sales:</span> Which Categories Actually Drop?</span>
            </Link>
          </li>
          <li>
            <Link href="/compare/credit-card-instant-discount-vs-no-cost-emi-india" className="inline-flex items-start gap-2 font-medium text-inkblue hover:underline">
              <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span><span className="font-semibold text-ink">Instant Bank Discount vs. No-Cost EMI:</span> Hidden GST &amp; Fees Explained</span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="bf-categories-heading">
        <div className="mb-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">What to watch</p>
          <h2 id="bf-categories-heading" className="mt-1 font-serif text-2xl font-bold text-ink">Categories worth your time</h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="flex flex-col rounded-xl border border-ledger-line bg-white p-4 transition-colors hover:border-inkblue/40"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 flex-none text-inkblue" aria-hidden="true" />
                  <span className="font-semibold text-ink">{cat.name}</span>
                </span>
                <span className="mt-2 text-xs leading-5 text-ink-soft">{cat.why}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {dedupedOffers.length > 0 && (
        <section className="mt-10" aria-labelledby="bf-live-heading">
          <div className="mb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Live right now</p>
            <h2 id="bf-live-heading" className="mt-1 font-serif text-2xl font-bold text-ink">Current offers on tracked stores</h2>
            <p className="mt-1 text-sm text-ink-soft">
              One top live offer per store (up to 8 unique stores). Each card shows the offer type, a check date when available, and the store.
            </p>
          </div>
          <ul className="space-y-3">
            {dedupedOffers.map((coupon) => {
              const store = storeById.get(coupon.store_id);
              const logo = storeLogoUrl(store);
              const discount = formatDiscount(coupon, store?.currency ?? "INR");
              const hasBadge = Boolean(discount && !discount.startsWith("MEGA") && discount.trim().length > 0);
              return (
                <li key={coupon.id}>
                  <article className="flex items-start gap-3 rounded-xl border border-ledger-line bg-white p-4 transition-colors hover:border-inkblue/30">
                    {logo ? (
                      <Image
                        src={logo}
                        alt=""
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 flex-none rounded-lg border border-ledger-line object-contain"
                      />
                    ) : (
                      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-paper-alt text-xs font-bold text-ink-soft">
                        {store?.name.slice(0, 2).toUpperCase() ?? "ST"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                        {store?.name ?? "Store"}
                      </p>
                      <Link
                        href={`/coupons/${coupon.slug}`}
                        className="mt-0.5 block text-sm font-medium leading-snug text-ink hover:text-inkblue"
                      >
                        {coupon.title}
                      </Link>
                      <p className="mt-1 text-xs text-ink-soft">
                        Last checked {coupon.last_checked_at ? formatDate(coupon.last_checked_at) : "—"}
                        {isVerifiedDeal(coupon) ? "" : ""}
                      </p>
                    </div>
                    {hasBadge ? (
                      <span className="flex-none rounded-full bg-verified-soft px-3 py-1 text-sm font-bold text-verified">
                        {discount}
                      </span>
                    ) : isVerifiedDeal(coupon) ? (
                      <span className="flex-none rounded-full bg-verified-soft px-3 py-1 text-sm font-bold text-verified">
                        Checkout-tested
                      </span>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <Link href="/deals" className="inline-flex items-center gap-1.5 text-sm font-medium text-inkblue hover:underline">
              Browse all live deals
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {featuredStores.length > 0 && (
        <section className="mt-10" aria-labelledby="bf-stores-heading">
          <div className="mb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">Stores to bookmark</p>
            <h2 id="bf-stores-heading" className="mt-1 font-serif text-2xl font-bold text-ink">Stores that run Black Friday deals</h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {featuredStores.map((store) => {
              const logo = storeLogoUrl(store);
              return (
                <li key={store.id}>
                  <Link
                    href={`/stores/${store.slug}`}
                    className="flex flex-col items-center gap-2 rounded-xl border border-ledger-line bg-white p-4 text-center transition-colors hover:border-inkblue/40"
                  >
                    {logo ? (
                      <Image src={logo} alt="" width={40} height={40} unoptimized className="h-10 w-10 rounded-lg border border-ledger-line object-contain" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper-alt text-sm font-bold text-ink-soft">
                        {store.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-medium text-ink">{store.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-ledger-line bg-paper-raised p-5 sm:p-6" aria-labelledby="bf-stacking-heading">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-inkblue/10 text-inkblue">
            <IndianRupee className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="bf-stacking-heading" className="font-serif text-lg font-bold text-ink">How to stack a Black Friday deal with a bank offer</h2>
            <ol className="mt-3 space-y-2 text-sm text-ink-soft">
              <li className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">1</span>Start from the sale or discounted price — not the MRP.</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">2</span>Apply the store&apos;s promo code (if any) to bring the cart total down further.</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">3</span>At the payment page, select your bank offer and confirm you still meet the minimum spend.</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">4</span>Check the order summary — the bank discount should appear as a separate line before you pay.</li>
            </ol>
            <Link href="/bank-offers" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-inkblue hover:underline">
              See current bank &amp; card offers
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-rust/20 bg-rust-soft/40 p-5 sm:p-6" aria-labelledby="bf-skip-heading">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-rust/10 text-rust">
            <Lightbulb className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="bf-skip-heading" className="font-serif text-lg font-bold text-ink">What to skip on Black Friday</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><strong className="text-ink">Jewellery and luxury goods</strong> — MRPs are often inflated; compare the discounted price to what the item sold for a month earlier.</li>
              <li><strong className="text-ink">Last-gen electronics</strong> — a 30% discount on a two-year-old GPU or phone is usually not a deal. Check whether the newer model is actually more expensive or just marginally so.</li>
              <li><strong className="text-ink">Anything with an artificial countdown</strong> — genuine stock-outs don&apos;t need a ticking clock. Sites that reset the timer on refresh are manufacturing urgency.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="bf-faq-heading">
        <h2 id="bf-faq-heading" className="font-serif text-2xl font-bold text-ink">Frequently asked questions</h2>
        <dl className="mt-4 divide-y divide-ledger-line rounded-2xl border border-ledger-line bg-white px-5">
          {FAQS.map((faq) => (
            <div key={faq.question} className="py-4">
              <dt className="font-semibold text-ink">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-6 text-ink-soft">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
