import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, IndianRupee, ShoppingBag, Lightbulb } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageTitle from "@/components/ui/PageTitle";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { resilient } from "@/lib/api";
import { formatDiscount } from "@/lib/format";
import { allowedStoreIds } from "@/lib/homepage-curation";
import { storeLogoUrl } from "@/lib/storeLogos";
import Image from "next/image";

export const revalidate = 3600;

const canonical = "/black-friday";
const title = "Black Friday India — Deals, Dates & What to Actually Buy";
const description =
  "Black Friday in India lands on the last Friday of November. Here is what historically goes on sale, which stores run real discounts, and how to stack bank offers on top.";

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

/** Categories historically worth watching on Black Friday */
const CATEGORIES = [
  {
    name: "Laptops & Electronics",
    why: "Most reliable category — brands clear older SKUs before year-end. Cross-check the price on the brand's own site.",
    slug: "electronics",
  },
  {
    name: "Fashion & Footwear",
    why: "Myntra, Ajio and Levi's typically run 40–70% off during the weekend. Useful for buying ahead of winter.",
    slug: "fashion",
  },
  {
    name: "Beauty & Skincare",
    why: "Nykaa and D2C beauty brands (Dot & Key, Kama Ayurveda, Brillare) often bundle free products with purchase.",
    slug: "beauty",
  },
  {
    name: "Health & Fitness",
    why: "Protein, supplements and home gym gear see site-wide codes. Stack with a no-cost EMI for large orders.",
    slug: "health-fitness",
  },
  {
    name: "Home & Kitchen",
    why: "Nilkamal, Pepperfry and Wonderchef often run deep cuts. Check the actual MRP — furniture 'discounts' can be inflated.",
    slug: "home-kitchen",
  },
];

/** Stores with reliable Black Friday history in India */
const FEATURED_STORE_SLUGS = [
  "amazon-in",
  "myntra",
  "nykaa",
  "ajio-com-ecommerce-cps-india",
  "lenskart",
  "flipkart",
  "healthkart",
  "nilkamalfurniture",
];

export default async function BlackFridayPage() {
  // Load live offers from stores that typically run Black Friday deals.
  // We show at most 8 live offers so the page is accurate — no fabricated listings.
  const [storesPage, liveOffers] = await Promise.all([
    resilient.listStores({ limit: 150 }),
    resilient.listCoupons({
      active_only: true,
      sort: "recommended",
      limit: 8,
      store_ids: await (async () => {
        const s = await resilient.listStores({ limit: 150 });
        return allowedStoreIds(s.items);
      })(),
    }).catch(() => ({ items: [], total: 0, skip: 0, limit: 0 })),
  ]);

  const storeBySlug = new Map(storesPage.items.map((s) => [s.slug, s]));
  const featuredStores = FEATURED_STORE_SLUGS
    .map((slug) => storeBySlug.get(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof storeBySlug.get>>[];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Black Friday", path: "/black-friday" },
  ];

  const faqJsonLd = faqPageJsonLd(FAQS);
  const breadcrumb = breadcrumbJsonLd(crumbs);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqJsonLd} />

      <Breadcrumbs items={crumbs} />

      <header className="mt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
          Black Friday in India
        </p>
        <PageTitle className="mt-2 leading-tight">
          Black Friday — Dates, Deals & What to Actually Buy
        </PageTitle>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
          Black Friday lands on the last Friday of November — in 2026 that is{" "}
          <strong>27 November</strong>. This page collects what is live now across the stores
          we track, the categories worth watching, and how to stack offers without chasing
          fake urgency.
        </p>
      </header>

      {/* Date & context strip */}
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
                Most Indian stores extend the sale through the weekend. A few start early
                the week before.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Year-specific guide link */}
      <div className="mt-6 rounded-xl border border-ledger-line bg-paper-raised p-4">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">In-depth 2026 guide →</span>{" "}
          <Link
            href="/guides/black-friday-2026-date-and-what-to-buy"
            className="text-inkblue underline underline-offset-2 hover:no-underline"
          >
            Black Friday 2026: Date and Best Buys on Amazon India
          </Link>{" "}
          — covers what to buy, what to skip, and when to shop.
        </p>
      </div>

      {/* Categories worth watching */}
      <section className="mt-10" aria-labelledby="bf-categories-heading">
        <div className="mb-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
            What to watch
          </p>
          <h2 id="bf-categories-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
            Categories worth your time
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
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

      {/* Live offers */}
      {liveOffers.items.length > 0 && (
        <section className="mt-10" aria-labelledby="bf-live-heading">
          <div className="mb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
              Live right now
            </p>
            <h2 id="bf-live-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
              Current offers on tracked stores
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              These are live today — not a mock-up. Each one shows the discount, the last-checked
              date and the source page.
            </p>
          </div>
          <ul className="space-y-3">
            {liveOffers.items.map((coupon) => {
              const store = storesPage.items.find((s) => s.id === coupon.store_id);
              const logo = storeLogoUrl(store);
              const discount = formatDiscount(coupon, store?.currency ?? "INR");
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
                    </div>
                    {discount && !discount.startsWith("MEGA") && (
                      <span className="flex-none rounded-full bg-verified-soft px-3 py-1 text-sm font-bold text-verified-ink">
                        {discount}
                      </span>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <Link
              href="/deals"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-inkblue hover:underline"
            >
              Browse all live deals
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {/* Featured stores */}
      {featuredStores.length > 0 && (
        <section className="mt-10" aria-labelledby="bf-stores-heading">
          <div className="mb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
              Stores to bookmark
            </p>
            <h2 id="bf-stores-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
              Stores that run Black Friday deals
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {featuredStores.map((store) => {
              const logo = storeLogoUrl(store);
              return (
                <li key={store.id}>
                  <Link
                    href={`/stores/${store.slug}`}
                    className="flex flex-col items-center gap-2 rounded-xl border border-ledger-line bg-white p-4 text-center transition-colors hover:border-inkblue/40"
                  >
                    {logo ? (
                      <Image
                        src={logo}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className="h-10 w-10 rounded-lg border border-ledger-line object-contain"
                      />
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

      {/* Bank offer stacking */}
      <section className="mt-10 rounded-2xl border border-ledger-line bg-paper-raised p-5 sm:p-6" aria-labelledby="bf-stacking-heading">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-inkblue/10 text-inkblue">
            <IndianRupee className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="bf-stacking-heading" className="font-serif text-lg font-bold text-ink">
              How to stack a Black Friday deal with a bank offer
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">1</span>
                Start from the sale or discounted price — not the MRP.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">2</span>
                Apply the store&apos;s promo code (if any) to bring the cart total down further.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">3</span>
                At the payment page, select your bank offer and confirm you still meet the minimum spend.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-xs font-bold text-white">4</span>
                Check the order summary — the bank discount should appear as a separate line before you pay.
              </li>
            </ol>
            <Link
              href="/bank-offers"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-inkblue hover:underline"
            >
              See current bank & card offers
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* What to skip */}
      <section className="mt-8 rounded-2xl border border-rust/20 bg-rust-soft/40 p-5 sm:p-6" aria-labelledby="bf-skip-heading">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-rust/10 text-rust">
            <Lightbulb className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="bf-skip-heading" className="font-serif text-lg font-bold text-ink">
              What to skip on Black Friday
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <strong className="text-ink">Jewellery and luxury goods</strong> — MRPs are often inflated; compare the discounted price to what the item sold for a month earlier.
              </li>
              <li>
                <strong className="text-ink">Last-gen electronics</strong> — a 30% discount on a two-year-old GPU or phone is usually not a deal. Check whether the newer model is actually more expensive or just marginally so.
              </li>
              <li>
                <strong className="text-ink">Anything with an artificial countdown</strong> — genuine stock-outs don&apos;t need a ticking clock. Sites that reset the timer on refresh are manufacturing urgency.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10" aria-labelledby="bf-faq-heading">
        <h2 id="bf-faq-heading" className="font-serif text-2xl font-bold text-ink">
          Frequently asked questions
        </h2>
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
