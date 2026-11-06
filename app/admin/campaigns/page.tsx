"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import AffiliateCampaignCard from "@/components/AffiliateCampaignCard";
import { fetchAffiliateCampaigns } from "@/lib/api/admin";
import type { AffiliateCampaign } from "@/lib/types";

const PAGE_SIZE = 20;

/** Why a load failed, in words an admin can act on. */
function describeError(error: unknown): string {
  const status = (error as { response?: { status?: number } })?.response?.status;
  if (status === 401) return "Sign in as an admin to see campaigns.";
  if (status === 403) return "This account is not an admin, so campaigns are hidden.";
  return "Could not load campaigns. Try again.";
}

export default function AdminCampaignsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [needsReview, setNeedsReview] = useState(false);
  const [skip, setSkip] = useState(0);
  const [result, setResult] = useState<{
    key: string;
    items: AffiliateCampaign[];
    total: number;
    error: string | null;
  } | null>(null);

  // "Loading" is derived, not stored: a result belongs to the filters it was fetched for, so
  // when the filters change the stored result is stale until the new request lands.
  const key = JSON.stringify([search, category, country, needsReview, skip]);
  const loading = result?.key !== key;
  const items = result && !loading ? result.items : [];
  const total = result && !loading ? result.total : 0;
  const error = result && !loading ? result.error : null;

  useEffect(() => {
    const controller = new AbortController();
    fetchAffiliateCampaigns(
      {
        search,
        category,
        country: country.toUpperCase(),
        needs_review: needsReview ? true : undefined,
        skip,
        limit: PAGE_SIZE,
      },
      controller.signal,
    )
      .then((page) => setResult({ key, items: page.items, total: page.total, error: null }))
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        setResult({ key, items: [], total: 0, error: describeError(e) });
      });
    return () => controller.abort();
  }, [key, search, category, country, needsReview, skip]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.floor(skip / PAGE_SIZE) + 1;
  const filtering = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setSkip(0);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/admin/analytics" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-inkblue">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Admin
      </Link>
      <h1 className="mt-3 font-serif text-3xl text-ink">Advertiser campaigns</h1>
      <p className="mt-2 max-w-prose text-sm text-ink-soft">
        Internal view. Advertiser terms and payout details are commercial data and are not shown to shoppers.
        Preview clicks here are tagged <code>admin-preview</code> so they do not count as shopper traffic.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <label className="text-sm text-ink-soft">
          Search
          <input
            value={search}
            onChange={(e) => filtering(setSearch)(e.target.value)}
            maxLength={100}
            className="mt-1 w-full rounded-md border border-ledger-line bg-white px-3 py-2 text-ink"
          />
        </label>
        <label className="text-sm text-ink-soft">
          Category
          <input
            value={category}
            onChange={(e) => filtering(setCategory)(e.target.value)}
            maxLength={120}
            className="mt-1 w-full rounded-md border border-ledger-line bg-white px-3 py-2 text-ink"
          />
        </label>
        <label className="text-sm text-ink-soft">
          Country (2 letters)
          <input
            value={country}
            onChange={(e) => filtering(setCountry)(e.target.value.slice(0, 2))}
            maxLength={2}
            className="mt-1 w-full rounded-md border border-ledger-line bg-white px-3 py-2 uppercase text-ink"
          />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={needsReview}
          onChange={(e) => {
            setNeedsReview(e.target.checked);
            setSkip(0);
          }}
        />
        Needs review only
        <span className="text-ink-soft">(terms we could not fully establish, or that affect which codes pay)</span>
      </label>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-soft" aria-live="polite">
        {loading ? "Loading…" : `${total} campaign${total === 1 ? "" : "s"} · page ${page} of ${pages}`}
      </p>

      {error ? (
        <p role="alert" className="mt-4 rounded-md border border-ledger-line bg-white p-4 text-sm text-ink">
          {error}
        </p>
      ) : null}

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((campaign) => (
          <AffiliateCampaignCard key={campaign.id} campaign={campaign} src="admin-preview" />
        ))}
      </div>

      {!error && !loading && items.length === 0 ? (
        <p className="mt-6 text-sm text-ink-soft">No campaigns match these filters.</p>
      ) : null}

      {pages > 1 ? (
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            disabled={skip === 0 || loading}
            onClick={() => setSkip(Math.max(0, skip - PAGE_SIZE))}
            className="rounded-full border border-ledger-line px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= pages || loading}
            onClick={() => setSkip(skip + PAGE_SIZE)}
            className="rounded-full border border-ledger-line px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
