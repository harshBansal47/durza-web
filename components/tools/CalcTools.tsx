"use client";

import { useState } from "react";
import { bldcSavings, firstcryClub, fitspireStack, nordpassPlan } from "@/lib/store-tools";
import { Result, Seg, Slider, inr } from "./fields";

export function BldcSavings() {
  const [regular, setRegular] = useState(75);
  const [bldc, setBldc] = useState(28);
  const [hours, setHours] = useState(16);
  const [tariff, setTariff] = useState(7);
  const r = bldcSavings({ regularWatts: regular, bldcWatts: bldc, hoursPerDay: hours, tariff });
  return (
    <>
      <Slider id="hx-bs-reg" label="Regular fan consumption" display={`${regular} W`} min={55} max={110} step={1} value={regular} onChange={setRegular} />
      <Slider id="hx-bs-bldc" label="BLDC fan consumption" display={`${bldc} W`} min={18} max={42} step={1} value={bldc} onChange={setBldc} />
      <Slider id="hx-bs-hrs" label="Hours used per day" display={`${hours} h`} min={4} max={24} step={1} value={hours} onChange={setHours} />
      <Slider id="hx-bs-tar" label="Electricity tariff" display={`₹${tariff}/unit`} min={3} max={15} step={0.5} value={tariff} onChange={setTariff} />
      <Result
        label="You save"
        main={<>₹{inr(Math.round(r.monthlySavings))} <small>per month</small></>}
        rows={[
          ["Yearly savings", `₹${inr(Math.round(r.yearlySavings))}`],
          ["10-year savings", `₹${inr(Math.round(r.tenYearSavings))}`],
          ["Units saved per year", inr(Math.round(r.annualKwhSaved))],
          ["Payback on a ₹2,500 price gap", r.paybackMonths !== null ? `≈ ${Math.ceil(r.paybackMonths)} months` : "No saving at these settings"],
        ]}
        verdict={r.paybackMonths !== null ? { tone: r.paybackMonths <= 36 ? "good" : "mid", text: r.paybackMonths <= 36 ? "Pays for itself within 3 years" : "Long payback — raise hours or tariff to re-check" } : undefined}
      />
      <p className="hx-mo-note">Assumes a typical ₹2,500 price difference between a BLDC fan and a similar regular fan. Your tariff and usage decide the real number.</p>
    </>
  );
}

export function FitspireStack() {
  const [cart, setCart] = useState(2000);
  const r = fitspireStack(cart);
  return (
    <>
      <Slider id="hx-f-cart" label="Cart total" display={`₹${inr(cart)}`} min={500} max={5000} step={100} value={cart} onChange={setCart} />
      <Result
        label="Final estimated price"
        main={<>₹{inr(r.final)} <small>· you save ₹{inr(r.saved)}</small></>}
        rows={[
          ["Baseline cart", `₹${inr(cart)}`],
          ["Code FIT20", `− ₹${inr(r.fit20)}`],
          ["Extra prepaid discount (5%)", `− ₹${inr(r.prepaid)}`],
          ["Free delivery (saved)", `₹${r.shipping}`],
        ]}
      />
      <p className="hx-mo-note">Estimate using the discounts Fitspire states on its store page. Confirm the final price at checkout.</p>
    </>
  );
}

export function NordpassPlan() {
  const [members, setMembers] = useState<"2" | "3" | "4" | "5" | "6">("6");
  const r = nordpassPlan(Number(members));
  return (
    <>
      <Seg label="Family members (vaults)" value={members} onChange={setMembers} options={(["2", "3", "4", "5", "6"] as const).map((m) => ({ v: m, t: `${m} vaults` }))} />
      <Result
        label="Per person"
        main={<>~₹{r.perPerson} <small>/month each</small></>}
        rows={[["Family plan total", "₹249/month"], ["Savings vs Individual", `~${r.savingsPct}%`]]}
      />
      <p className="hx-mo-note">The Family Plan (₹249/mo for 6 vaults) drops per-person cost as you add members. Each member gets a private zero-knowledge vault, passkey sync, breach scanner and encrypted file attachments.</p>
    </>
  );
}

export function FirstcryClub() {
  const [spend, setSpend] = useState(2500);
  const [months, setMonths] = useState<"3" | "12">("12");
  const r = firstcryClub(spend, Number(months) as 3 | 12);
  return (
    <>
      <Slider id="hx-c-spend" label="Monthly spend" display={`₹${inr(spend)}`} min={1000} max={10000} step={500} value={spend} onChange={setSpend} />
      <Seg label="Membership" value={months} onChange={setMonths} options={[{ v: "3", t: "3 months (₹499)" }, { v: "12", t: "12 months (₹999)" }]} />
      <Result
        label={r.net > 0 ? "You come out ahead" : "Not worth it yet"}
        main={r.net > 0 ? <>₹{inr(r.net)} <small>net saving</small></> : <>No net saving</>}
        rows={[["Estimated savings", `₹${inr(r.savings)}`], ["Membership cost", `₹${inr(r.membership)}`]]}
        verdict={{ tone: r.net > 0 ? "good" : "bad", text: r.net > 0 ? "Club pays for itself at this spend" : "Skip Club at this spend" }}
      />
      <p className="hx-mo-note">Uses a 7% member discount plus ₹100 per month in perks — actual savings vary by category. Check the current Club terms before joining.</p>
    </>
  );
}
