"use client";

import { useState } from "react";

export default function ClubCalculatorPage() {
  const [spend, setSpend] = useState(2500);
  const [months, setMonths] = useState(12);
  const membership = months === 12 ? 999 : 499;
  const savings = Math.round(spend * 0.07 * months + 100 * months);
  const net = savings - membership;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-ink">FirstCry Club Break-Even Calculator</h1>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-ink">
          Monthly spend: ₹{spend.toLocaleString("en-IN")}
          <input type="range" min={1000} max={10000} step={500} value={spend} onChange={(e) => setSpend(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Membership
          <select value={months} onChange={(e) => setMonths(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-ledger-line px-3 py-2">
            <option value={3}>3 months (₹499)</option>
            <option value={12}>12 months (₹999)</option>
          </select>
        </label>
      </div>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <p className="text-sm text-ink-soft">Estimated annual savings: ₹{savings.toLocaleString("en-IN")}</p>
        <p className="mt-1 text-sm text-ink-soft">Membership cost: ₹{membership}</p>
        <p className={`mt-2 text-lg font-bold ${net > 0 ? "text-green-700" : "text-rust"}`}>
          {net > 0 ? `You save ₹${net.toLocaleString("en-IN")} net.` : "Not worth it yet."}
        </p>
        {net > 0 && (
          <a href="https://track.vcommission.com/click?campaign_id=10081&pub_id=133499&sub1=club_calc&url=https://www.firstcry.com/club" target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
            Join FirstCry Club
          </a>
        )}
      </div>
    </div>
  );
}
