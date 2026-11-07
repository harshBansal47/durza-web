"use client";

import { useCallback, useEffect, useState } from "react";
import { Send, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";

function buildMessage(coupon: CouponPublic): string {
  return [
    `🛍 ${coupon.title}`,
    coupon.code ? `🎟 Code: ${coupon.code}` : "✨ Deal — no code needed",
    `🔗 https://durza.in/coupons/${coupon.slug}`,
  ].join("\n");
}

export default function TelegramPublisherPage() {
  const [coupons, setCoupons] = useState<CouponPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());

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

  async function send(coupon: CouponPublic) {
    setSendingId(coupon.id);
    try {
      await api.sendTelegram(coupon.id);
      setSentIds((prev) => new Set(prev).add(coupon.id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Send failed.");
    } finally {
      setSendingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Durza back office</p>
            <h1 className="text-3xl font-semibold tracking-tight">Telegram publisher</h1>
            <p className="mt-2 text-sm text-gray-500">Review a message, then approve to send it to the Telegram channel.</p>
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
          <ul className="space-y-4">
            {coupons.map((coupon) => (
              <li key={coupon.id} className="rounded-2xl border border-black/10 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900">{coupon.title}</h2>
                    <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-700">{buildMessage(coupon)}</pre>
                  </div>
                  <button
                    type="button"
                    onClick={() => void send(coupon)}
                    disabled={sendingId === coupon.id || sentIds.has(coupon.id)}
                    className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {sentIds.has(coupon.id) ? "Sent" : sendingId === coupon.id ? "Sending…" : "Approve & send"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
