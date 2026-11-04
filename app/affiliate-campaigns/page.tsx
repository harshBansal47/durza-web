import type { Metadata } from "next";
import AffiliateCampaignCard from "@/components/AffiliateCampaignCard";
import DisclosureNote from "@/components/DisclosureNote";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import PageTitle from "@/components/ui/PageTitle";
import { resilient } from "@/lib/api";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const revalidate = 300;

const PAGE_SIZE = 20;

export const metadata: Metadata = {
  title: "Affiliate Campaigns",
  description:
    "Browse advertiser affiliate campaigns. Publisher commissions are separate from shopper coupons and discounts.",
  alternates: { canonical: absoluteUrl("/affiliate-campaigns") },
  openGraph: {
    title: "Affiliate Campaigns",
    description:
      "Browse advertiser affiliate campaigns. Publisher commissions are separate from shopper coupons and discounts.",
    url: absoluteUrl("/affiliate-campaigns"),
    type: "website",
  },
};

function firstParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export default async function AffiliateCampaignsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const search = firstParam(params.search);
  const category = firstParam(params.category);
  const countryInput = firstParam(params.country).toUpperCase();
  const invalidCountry = countryInput !== "" && !/^[A-Z]{2}$/.test(countryInput);
  const country = invalidCountry ? "" : countryInput;
  const requestedSkip = Number.parseInt(firstParam(params.skip), 10);
  const skip = Number.isFinite(requestedSkip) ? Math.max(requestedSkip, 0) : 0;
  const filters = {
    search: search || undefined,
    category: category || undefined,
    country: country || undefined,
    skip,
    limit: PAGE_SIZE,
  };
  const campaigns = invalidCountry
    ? { items: [], total: 0, skip, limit: PAGE_SIZE }
    : await resilient.listAffiliateCampaigns(filters);
  const paginationParams = {
    search: search || undefined,
    category: category || undefined,
    country: country || undefined,
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Affiliate campaigns", path: "/affiliate-campaigns" },
        ])}
      />

      <section className="mb-9 max-w-3xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-inkblue">
          Advertiser partnerships
        </p>
        <PageTitle className="mt-2">Affiliate campaigns</PageTitle>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink-soft">
          Browse campaigns advertisers make available to publishers. Publisher commissions are
          not shopper discounts, coupon codes, or a promise of savings.
        </p>
      </section>

      <div className="mb-8">
        <DisclosureNote
          commissionDisclosure="Durza may earn a commission when a visitor follows a campaign link. Any payout shown is compensation for publishers, not a discount for shoppers."
        />
      </div>

      <form
        action="/affiliate-campaigns"
        className="mb-8 grid gap-3 rounded-lg border border-ledger-line bg-white p-4 sm:grid-cols-[1fr_1fr_10rem_auto] sm:items-end"
      >
        <div>
          <label htmlFor="campaign-search" className="mb-1.5 block text-xs font-medium text-ink-soft">
            Search campaigns
          </label>
          <input
            id="campaign-search"
            name="search"
            type="search"
            defaultValue={search}
            maxLength={100}
            placeholder="Brand or campaign"
            className="min-h-11 w-full rounded-md border border-ledger-line bg-paper px-3 text-sm text-ink focus:border-inkblue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="campaign-category" className="mb-1.5 block text-xs font-medium text-ink-soft">
            Category
          </label>
          <input
            id="campaign-category"
            name="category"
            type="search"
            defaultValue={category}
            maxLength={120}
            placeholder="ecommerce"
            className="min-h-11 w-full rounded-md border border-ledger-line bg-paper px-3 text-sm text-ink focus:border-inkblue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="campaign-country" className="mb-1.5 block text-xs font-medium text-ink-soft">
            Country code
          </label>
          <input
            id="campaign-country"
            name="country"
            type="text"
            defaultValue={countryInput}
            maxLength={2}
            placeholder="IN"
            autoCapitalize="characters"
            className="min-h-11 w-full rounded-md border border-ledger-line bg-paper px-3 text-sm uppercase text-ink focus:border-inkblue focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="min-h-11 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-inkblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inkblue"
        >
          Apply filters
        </button>
      </form>

      {invalidCountry ? (
        <p role="alert" className="mb-5 text-sm text-rust">
          Enter a two-letter country code, such as IN.
        </p>
      ) : null}

      <div className="mb-5 border-b border-ledger-line pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          {campaigns.total} campaign{campaigns.total === 1 ? "" : "s"}
        </p>
      </div>

      {campaigns.items.length === 0 ? (
        <EmptyState
          title={invalidCountry ? "Check the country code." : "No campaigns found."}
          body={
            invalidCountry
              ? "Country filters use a two-letter ISO code."
              : search || category || country
                ? "Try broadening or clearing your filters."
                : "There are no active advertiser campaigns to show right now."
          }
          cta={{ href: "/affiliate-campaigns", label: "Browse all campaigns" }}
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.items.map((campaign) => (
            <li key={campaign.id}>
              <AffiliateCampaignCard campaign={campaign} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        basePath="/affiliate-campaigns"
        searchParams={paginationParams}
        skip={skip}
        limit={PAGE_SIZE}
        total={campaigns.total}
      />
    </div>
  );
}
