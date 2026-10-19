import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, CreditCard, Landmark, Layers, ShieldCheck, Wallet } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import { resilient } from "@/lib/api";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd } from "@/lib/seo";
import { BANKS, buildBankGroups, type BankOfferGroup } from "@/lib/bank-offers";
import type { CouponPublic } from "@/lib/types";
import { formatDiscount, successRateLabel, expiryLabel } from "@/lib/format";
import { storeLogoUrl } from "@/lib/storeLogos";

export const revalidate = 300;

/** Page through the live catalogue so the hub is not blind to offers past page one. */
async function fetchLiveCoupons(maxPages = 3): Promise<CouponPublic[]> {
  const items: CouponPublic[] = [];
  for (let page = 0; page < maxPages; page++) {
    const result = await resilient.listCoupons({ active_only: true, skip: page * 100, limit: 100 });
    items.push(...result.items);
    if (result.items.length < 100) break;
  }
  return items;
}

export async function generateMetadata(): Promise<Metadata> {
  const [coupons, stores] = await Promise.all([
    fetchLiveCoupons(),
    resilient.listStores({ limit: 100 }),
  ]);
  const groups = buildBankGroups(coupons, stores.items);
  const offerCount = groups.reduce((sum, group) => sum + group.coupons.length, 0);
  const title = offerCount > 0 ? `Bank & Card Offers: ${offerCount} Live Credit Card Deals` : "Bank & Card Offers in India";
  const description = offerCount > 0
    ? `Live ${offerCount} credit card and bank offers across ${groups.length} banks — HDFC, SBI, ICICI, Axis and more — each read from the store or bank page it was published on.`
    : "Compare credit card and bank offers across Indian stores — how instant discounts, no-cost EMI, cashback and rewards stack, and what each bank typically runs.";
  const canonical = absoluteUrl("/bank-offers");
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const HOW_IT_WORKS = [
  {
    icon: BadgePercent,
    title: "Instant discount",
    body: "A percentage taken off at the payment page when you pay with an eligible card and meet a minimum spend. The strongest benefit for a single large purchase.",
  },
  {
    icon: Layers,
    title: "No-cost EMI",
    body: "Spread a big-ticket purchase over months without interest. Check for a processing fee before assuming it is free.",
  },
  {
    icon: Wallet,
    title: "Cashback & rewards",
    body: "Money or points returned after the purchase. Valuable for smaller buys and for shoppers who already hold a rewards card.",
  },
  {
    icon: ShieldCheck,
    title: "Eligibility rules",
    body: "Most offers have a minimum spend, a discount cap, and exclusions for sale items, corporate cards or specific brands.",
  },
];

const FAQS = [
  {
    question: "Which bank gives the best instant discount on electronics?",
    answer:
      "The best instant discount is whichever offer is live at the store you are buying from. Compare the rupee value of each live offer on your actual cart rather than choosing by bank brand.",
  },
  {
    question: "Can I combine a bank offer with a store coupon?",
    answer:
      "Often, yes. A store coupon reduces the cart before payment, and a bank instant discount applies at the payment page to the resulting amount, provided the minimum spend is still met.",
  },
  {
    question: "Do bank offers work on already-discounted products?",
    answer:
      "Sometimes. Some banks apply the discount to the final price, while others exclude clearance or sale items. Always read the exclusion list on the bank's offer page.",
  },
  {
    question: "Is no-cost EMI really free?",
    answer:
      "No-cost EMI removes the interest, but some banks or retailers add a processing or convenience fee. Add any fee to the total before comparing it with paying upfront.",
  },
  {
    question: "How do I know a bank offer applied?",
    answer:
      "The order summary shows a separate discount line for the bank offer. If it is missing, confirm the offer was selected at the payment page and that you met the minimum spend.",
  },
];

function BankSection({ group }: { group: BankOfferGroup }) {
  const { bank, coupons, stores } = group;
  const storeById = new Map(stores.map((store) => [store.id, store]));
  return (
    <section id={bank.id} className="section-panel mt-8 scroll-mt-24 p-6 sm:p-8" aria-labelledby={`${bank.id}-heading`}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ledger-line pb-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-ink text-white">
            <Landmark className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id={`${bank.id}-heading`} className="font-serif text-2xl font-extrabold text-ink">
              {bank.name}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{bank.typicalBenefit}</p>
            <p className="mt-1 text-xs text-ink-soft">
              <span className="font-semibold text-ink">Best for:</span> {bank.bestFor}
            </p>
          </div>
        </div>
        <p className="rounded-full bg-inkblue/10 px-3 py-1.5 text-xs font-semibold text-inkblue">
          {coupons.length} live offer{coupons.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {coupons.map((coupon) => {
          const store = storeById.get(coupon.store_id);
          const logo = storeLogoUrl(store);
          const rate = successRateLabel(coupon);
          return (
            <li key={coupon.id}>
              <article className="flex flex-col gap-4 rounded-2xl border border-ledger-line bg-paper-raised p-4 transition-colors hover:border-inkblue/30 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  {logo ? (
                    <Image
                      src={logo}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 flex-none rounded-lg border border-ledger-line object-contain"
                    />
                  ) : (
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-paper-alt text-xs font-bold text-ink-soft">
                      {store?.name.slice(0, 2).toUpperCase() ?? "ST"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {store?.name ?? "Store"}
                    </p>
                    <Link
                      href={`/coupons/${coupon.slug}`}
                      className="mt-0.5 block font-medium leading-snug text-ink hover:text-inkblue"
                    >
                      {coupon.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-soft">
                      {rate ? `${rate} reported working` : "No shopper reports yet"}
                      {expiryLabel(coupon.expires_at) ? ` · ${expiryLabel(coupon.expires_at)}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-none items-center gap-3 sm:flex-col sm:items-end">
                  <span className="rounded-full bg-verified-soft px-3 py-1 text-sm font-bold text-verified">
                    {formatDiscount(coupon, store?.currency ?? "INR")}
                  </span>
                  <Link
                    href={`/coupons/${coupon.slug}`}
                    className="inline-flex min-h-11 items-center gap-1 rounded-full bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-inkblue"
                  >
                    View offer <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function BankOffersPage() {
  const [coupons, storesPage] = await Promise.all([
    fetchLiveCoupons(),
    resilient.listStores({ limit: 100 }),
  ]);
  const groups = buildBankGroups(coupons, storesPage.items);
  const offerCount = groups.reduce((sum, group) => sum + group.coupons.length, 0);
  const bankChips = groups.map((group) => group.bank);

  const faqJsonLd = faqPageJsonLd(FAQS);
  const offerItemListJsonLd = itemListJsonLd(
    groups
      .flatMap((group) => group.coupons)
      .slice(0, 20)
      .map((coupon) => ({ name: coupon.title, path: `/coupons/${coupon.slug}` })),
  );
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Bank & card offers", path: "/bank-offers" },
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerItemListJsonLd).replace(/</g, "\\u003c") }} />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a0a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, #000 30%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(238,90,11,0.08),transparent)] blur-3xl" />
      </div>

      <div className="relative">
        {/* Hero */}
        <section className="px-6 pb-10 pt-14 sm:pb-14 sm:pt-20">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-soft">
              <Link href="/" className="hover:text-inkblue">
                Home
              </Link>
              <span className="px-2" aria-hidden="true">
                /
              </span>
              Bank &amp; card offers
            </nav>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
              Bank &amp; card offers
            </p>
            <PageTitle className="mt-3 leading-tight">Credit card deals that actually stack</PageTitle>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
              Every live bank offer on Durza, grouped by the bank that published it. Each one shows
              the store it works at, the discount it gives, and when it was last checked — so you can
              compare the real rupee value before you pay.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#live-offers"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-inkblue"
              >
                See live offers <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-ledger-line bg-white/70 px-3.5 py-2 text-xs text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden="true" />
                {offerCount} live offer{offerCount === 1 ? "" : "s"} · {groups.length} bank
                {groups.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            {/* How bank offers work */}
            <section aria-labelledby="how-heading" className="mt-4">
              <div className="mb-6 max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
                  Before you shop
                </p>
                <h2 id="how-heading" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
                  How bank offers work
                </h2>
                <p className="mt-2 text-ink-soft">
                  A bank offer is a discount the bank gives you for paying with its card. It is
                  separate from the store&apos;s own sale, which is why the two usually combine.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {HOW_IT_WORKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="info-card p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-inkblue/10 text-inkblue">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-serif text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Live offers */}
            <section id="live-offers" aria-labelledby="live-heading" className="mt-14 scroll-mt-24">
              <div className="mb-4 max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
                  Live now
                </p>
                <h2 id="live-heading" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
                  Bank offers you can use today
                </h2>
                <p className="mt-2 text-ink-soft">
                  Sourced from store offer pages and bank offer pages. If a bank has no live offer
                  right now, it does not appear here — we would rather show nothing than a stale
                  deal.
                </p>
              </div>

              {bankChips.length > 0 && (
                <nav aria-label="Banks with live offers" className="mb-6 flex flex-wrap gap-2">
                  {bankChips.map((bank) => (
                    <Link
                      key={bank.id}
                      href={`#${bank.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ledger-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-inkblue/40"
                    >
                      <CreditCard aria-hidden="true" className="h-4 w-4 text-inkblue" />
                      {bank.shortName}
                    </Link>
                  ))}
                </nav>
              )}

              {groups.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-ledger-line bg-white p-10 text-center">
                  <p className="font-serif text-xl font-bold text-ink">No bank offers are live right now</p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
                    Bank promotions rotate weekly. Check back soon, or browse today&apos;s store
                    coupons in the meantime.
                  </p>
                  <Link
                    href="/deals"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-inkblue"
                  >
                    Browse today&apos;s deals <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                groups.map((group) => <BankSection key={group.bank.id} group={group} />)
              )}
            </section>

            {/* Comparison table */}
            <section aria-labelledby="compare-heading" className="mt-14">
              <div className="mb-6 max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
                  At a glance
                </p>
                <h2 id="compare-heading" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
                  What each bank typically runs
                </h2>
                <p className="mt-2 text-ink-soft">
                  General guidance, not a live offer: bank promotions change often and are
                  store-specific. The live count is real and comes from Durza&apos;s catalogue.
                </p>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-ledger-line bg-white">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-paper">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-bold text-ink">Bank</th>
                      <th scope="col" className="px-4 py-3 font-bold text-ink">Typical benefit</th>
                      <th scope="col" className="px-4 py-3 font-bold text-ink">Best for</th>
                      <th scope="col" className="px-4 py-3 font-bold text-ink">Live offers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BANKS.map((bank) => {
                      const group = groups.find((candidate) => candidate.bank.id === bank.id);
                      return (
                        <tr key={bank.id} className="border-t border-ledger-line">
                          <th scope="row" className="px-4 py-3 font-semibold text-ink">
                            {bank.shortName}
                          </th>
                          <td className="px-4 py-3 text-ink-soft">{bank.typicalBenefit}</td>
                          <td className="px-4 py-3 text-ink-soft">{bank.bestFor}</td>
                          <td className="px-4 py-3">
                            {group ? (
                              <span className="font-semibold text-verified">{group.coupons.length}</span>
                            ) : (
                              <span className="text-ink-soft">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Stacking guide */}
            <section aria-labelledby="stack-heading" className="mt-14">
              <div className="mb-6 max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
                  Get the most out of it
                </p>
                <h2 id="stack-heading" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
                  Stack a bank offer correctly
                </h2>
              </div>
              <ol className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Start from the sale price", "Buy during the store's sale so the base price is already reduced."],
                  ["Clip the store coupon", "Apply any product or cart coupon before you reach the payment page."],
                  ["Select the bank offer", "Choose your bank at payment and confirm you meet the minimum spend."],
                  ["Check the final summary", "Make sure the bank discount line appears before you pay."],
                ].map(([title, body], index) => (
                  <li key={title} className="info-card flex gap-4 p-5">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-ink">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ */}
            <section aria-labelledby="faq-heading" className="mt-14">
              <h2 id="faq-heading" className="font-serif text-2xl font-extrabold text-ink">
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

            <p className="mt-10 border-t border-ledger-line pt-5 text-xs leading-5 text-ink-soft">
              Bank offers are set by the banks and stores, not by Durza, and can change or end at
              any time. We may earn a commission when you shop through links on this page; it does
              not change the price you pay. See our{" "}
              <Link href="/affiliate-disclosure" className="text-inkblue underline underline-offset-2">
                affiliate disclosure
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
