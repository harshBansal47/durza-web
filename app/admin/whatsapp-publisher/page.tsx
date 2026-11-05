"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";

function buildMessage(coupon: CouponPublic): string {
  const discount =
    coupon.discount_type === "percentage" && coupon.discount_value != null
      ? `🏷️ Get ${coupon.discount_value}% OFF`
      : coupon.discount_type === "fixed" && coupon.discount_value != null
        ? `🏷️ Get ₹${coupon.discount_value} OFF`
        : "🏷️ Special deal";
  return [
    "🔥 HOT DEAL ALERT 🔥",
    "",
    `🎧 ${coupon.title}`,
    "",
    discount,
    "",
    "🛒 Grab Deal:",
    `https://durza.in/coupons/${coupon.slug}`,
    "",
    "⚡ Verified by Durza",
    "",
    "Join Durza Coupons India for more deals!",
  ].join("\n");
}

export default function WhatsAppPublisherPage() {
  const [coupons, setCoupons] = useState<CouponPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.listCoupons({ active_only: true, sort: "newest", limit: 20 });
      setCoupons(result.items);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load deals.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function copy(coupon: CouponPublic) {
    await navigator.clipboard.writeText(buildMessage(coupon));
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
            onClick={() => void load()}
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
                <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm text-gray-800">{buildMessage(coupon)}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}