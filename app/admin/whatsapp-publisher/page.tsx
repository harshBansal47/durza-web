"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";

function buildMessage(coupon: CouponPublic, title?: string): string {
  const discount =
    coupon.discount_type === "percentage" && coupon.discount_value != null
      ? `🏷️ Get ${coupon.discount_value}% OFF`
      : coupon.discount_type === "fixed" && coupon.discount_value != null
        ? `🏷️ Get ₹${coupon.discount_value} OFF`
        : "🏷️ Special deal";
  return [
    "🛍 Durza Offer",
    "",
    `🔥 ${title ?? coupon.title}`,
    "",
    discount,
    coupon.code ? `🎟 Promo Code: ${coupon.code.slice(0,6)}****` : "✨ Deal — no code needed",
    "",
    "🛒 Claim Offer:",
    `https://durza.in/coupons/${coupon.slug}`,
    "",
    "Visit Durza for more details and exclusive deals.",
    "Click the below link to claim offer.",
  ].join("\n");
}

export default function WhatsAppPublisherPage() {
  const [coupons, setCoupons] = useState<CouponPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});

  const load = useCallback(async (p: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.listCoupons({ active_only: true, sort: "newest", limit: 20, skip: (p - 1) * 20 });
      setCoupons(result.items);
      setTotal(result.total);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load deals.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Deferred so state updates happen after mount, not inside the effect body.
    const id = setTimeout(() => void load(1), 0);
    return () => clearTimeout(id);
  }, [load]);

  async function copy(coupon: CouponPublic) {
    await navigator.clipboard.writeText(buildMessage(coupon, titles[coupon.id]));
    setCopiedId(coupon.id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">Durza back office</p>
            <h1 className="text-3xl font-semibold tracking-tight">WhatsApp publisher</h1>
            <p className="mt-2 text-sm text-gray-500">Copy a ready-to-post message, then paste it into your WhatsApp channel.</p>
          </div>
          <button
            type="button"
            onClick={() => void load(page)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-sm font-medium hover:bg-gray-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </header>
        {error ? <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
        {loading && coupons.length === 0 ? (
          <p className="text-gray-500">Loading deals…</p>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div key={coupon.id} className="rounded-xl border border-black/10 bg-white p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{coupon.title}</p>
                    <input
                      type="text"
                      value={titles[coupon.id] ?? coupon.title}
                      onChange={(e) => setTitles((prev) => ({ ...prev, [coupon.id]: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
                      placeholder="Edit WhatsApp title"
                    />
                    <p className="text-xs text-gray-500">{coupon.slug}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void copy(coupon)}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-green-600 px-3 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedId === coupon.id ? "Copied" : "Copy message"}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm text-gray-800">{buildMessage(coupon, titles[coupon.id])}</pre>
              </div>
            ))}
          </div>
        )}
      {Math.ceil(total / 20) > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => { const np = page - 1; setPage(np); void load(np); }}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button
            type="button"
            disabled={page >= Math.ceil(total / 20)}
            onClick={() => { const np = page + 1; setPage(np); void load(np); }}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      </div>
    </div>
  );
}