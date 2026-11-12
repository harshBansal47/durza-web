"use client";

import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";

const FAN_PREMIUM = 2500; // typical price difference of a BLDC fan vs a similar regular fan

export default function BldcCalculatorClient() {
  const [regularWatts, setRegularWatts] = useState(75);
  const [bldcWatts, setBldcWatts] = useState(28);
  const [hoursPerDay, setHoursPerDay] = useState(16);
  const [tariff, setTariff] = useState(7);

  const annualKwhSaved = ((regularWatts - bldcWatts) / 1000) * hoursPerDay * 365;
  const monthlySavings = ((regularWatts - bldcWatts) / 1000) * hoursPerDay * 30 * tariff;
  const yearlySavings = monthlySavings * 12;
  const tenYearSavings = yearlySavings * 10;
  const paybackMonths = monthlySavings > 0 ? FAN_PREMIUM / monthlySavings : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-ink">BLDC Fan Power Calculator</h1>
      <p className="text-sm text-ink-soft">
        Compare a regular capacitor-start ceiling fan with a BLDC fan. Adjust the sliders to your
        home — the savings figures update live.
      </p>

      <div className="space-y-5 rounded-2xl border border-ledger-line bg-white p-6">
        <label className="block text-sm font-medium text-ink">
          Regular fan consumption: {regularWatts}W
          <input type="range" min={55} max={110} step={1} value={regularWatts} onChange={(e) => setRegularWatts(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <label className="block text-sm font-medium text-ink">
          BLDC fan consumption: {bldcWatts}W
          <input type="range" min={18} max={42} step={1} value={bldcWatts} onChange={(e) => setBldcWatts(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Hours used per day: {hoursPerDay}h
          <input type="range" min={4} max={24} step={1} value={hoursPerDay} onChange={(e) => setHoursPerDay(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Electricity tariff: ₹{tariff}/unit
          <input type="range" min={3} max={15} step={0.5} value={tariff} onChange={(e) => setTariff(Number(e.target.value))} className="mt-2 w-full" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ledger-line bg-paper p-5 text-center">
          <p className="text-xs text-ink-soft">Monthly savings</p>
          <p className="mt-1 text-3xl font-bold text-verified">₹{Math.round(monthlySavings).toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-2xl border border-ledger-line bg-paper p-5 text-center">
          <p className="text-xs text-ink-soft">Yearly savings</p>
          <p className="mt-1 text-3xl font-bold text-verified">₹{Math.round(yearlySavings).toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-2xl border border-ledger-line bg-paper p-5 text-center">
          <p className="text-xs text-ink-soft">10-year savings</p>
          <p className="mt-1 text-3xl font-bold text-ink">₹{Math.round(tenYearSavings).toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-2xl border border-ledger-line bg-paper p-5 text-center">
          <p className="text-xs text-ink-soft">Units saved per year</p>
          <p className="mt-1 text-3xl font-bold text-ink">{Math.round(annualKwhSaved).toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-ledger-line bg-white p-5 text-sm text-ink-soft">
        <p className="font-semibold text-ink">Payback check</p>
        {paybackMonths !== null ? (
          <p className="mt-1">
            Assuming a ₹{FAN_PREMIUM.toLocaleString("en-IN")} price difference between a similar regular fan
            and a BLDC model, the upgrade pays for itself in about{" "}
            <span className="font-semibold text-ink">{Math.ceil(paybackMonths)} months</span> of typical use.
          </p>
        ) : (
          <p className="mt-1">Increase daily usage or tariff to see the payback period.</p>
        )}
        <a
          href={getAffiliateLink("havells", "https://www.havells.com/en/consumer/fans", "bldc_calculator")}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          Shop Havells BLDC Fans
        </a>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How is a BLDC fan different from a regular ceiling fan?</summary><p className="mt-2 text-sm text-ink-soft">Regular fans use AC induction motors (60–110W). BLDC (Brushless DC) fans use electronic DC motors (18–42W) with precise speed control, converting much more electricity into airflow and far less into heat and noise.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How much money does a BLDC fan actually save?</summary><p className="mt-2 text-sm text-ink-soft">At 16 hours of daily use and ₹7 per unit, switching a 75W regular fan to a 28W BLDC model saves roughly ₹1,900 per year — over ₹19,000 across 10 years, usually more than the price difference within two to three years.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Does a BLDC fan work without remote control or inverter?</summary><p className="mt-2 text-sm text-ink-soft">Yes. BLDC fans work directly on mains power and pair well with inverters — a 28W fan draws about a third of a regular fan during a power cut, extending inverter runtime significantly.</p></details>
      </section>
    </div>
  );
}
