"use client";

import { useState } from "react";
import { bldcSpec, gstTier, proteinDecode, type BldcClimate, type GstInput } from "@/lib/hero-tools";
import { NumberField, Result, Seg, Slider, inr } from "./fields";

export function BldcSizing() {
  const [area, setArea] = useState(120);
  const [height, setHeight] = useState(9.5);
  const [climate, setClimate] = useState<BldcClimate>("humid");
  const r = bldcSpec({ areaSqFt: area, heightFt: height, climate });
  return (
    <>
      <Slider id="hx-b-area" label="Room size" display={`${area} sq ft`} min={60} max={300} step={10} value={area} onChange={setArea} />
      <Slider id="hx-b-ht" label="Ceiling height" display={`${height} ft`} min={8} max={14} step={0.5} value={height} onChange={setHeight} />
      <Seg label="How hot is your city?" value={climate} onChange={setClimate} options={[{ v: "mild", t: "Mild (Bengaluru)" }, { v: "humid", t: "Humid (Mumbai)" }, { v: "dry", t: "Dry heat (Delhi)" }]} />
      <Result
        label="Your fan spec"
        main={<>{r.sweepMm} mm <small>({r.sweepInches}″) sweep · {r.wattMin}–{r.wattMax} W BLDC</small></>}
        rows={[
          ["Airflow to look for", `≥ ${inr(r.airflowCmh)} m³/h (≈ ${r.airflowCmm} m³/min)`],
          ["Top-speed RPM", r.rpmLabel],
          ["Air changes assumed", `${r.ach}/hour (${climate})`],
          ["Running cost @ ₹8/unit, 12h/day", `≈ ₹${inr(r.monthlyCostMin)}–${inr(r.monthlyCostMax)}/month`],
        ]}
        verdict={{ tone: "good", text: "Match the spec, ignore the marketing wattage" }}
      />
      <p className="hx-mo-note">Rule of thumb: airflow need ≈ room volume × air changes per hour. BLDC motors deliver similar airflow at a fraction of the wattage of induction fans.</p>
    </>
  );
}

export function ProteinDecoder() {
  const [price, setPrice] = useState("2199");
  const [per, setPer] = useState("24");
  const [serve, setServe] = useState("33");
  const [n, setN] = useState("30");
  const r = proteinDecode({ price: Number(price), proteinPerServingG: Number(per), servingSizeG: Number(serve), servings: Number(n) });
  return (
    <>
      <NumberField id="hx-p-price" label="Tub price (₹)" value={price} onChange={setPrice} min={1} inputMode="numeric" />
      <NumberField id="hx-p-per" label="Protein per serving (g)" value={per} onChange={setPer} min={1} />
      <NumberField id="hx-p-serve" label="Serving size (g)" value={serve} onChange={setServe} min={1} />
      <NumberField id="hx-p-n" label="Servings per tub" value={n} onChange={setN} min={1} inputMode="numeric" />
      <Result
        label="Decoded"
        main={<>₹{r.costPer25g.toFixed(1)} <small>per 25 g protein</small></>}
        rows={[
          ["Protein purity (per scoop)", `${r.purityPct.toFixed(0)}% — ${r.purityLabel}`],
          ["Total protein in tub", `${inr(Math.round(r.totalProteinG))} g`],
          ["Cost per serving", `₹${r.costPerServing.toFixed(1)}`],
          ["Tub lasts (1 scoop/day)", `${Math.max(1, Math.round(Number(n) || 1))} days`],
        ]}
        verdict={{ tone: r.verdict, text: r.verdictLabel }}
      />
      <p className="hx-mo-note">Cost per 25 g of actual protein is the fairest comparison across brands and scoop sizes. Under ₹55 reads as good value; over ₹85 you are paying for the label.</p>
    </>
  );
}

export function GstMatcher() {
  const [inv, setInv] = useState(40);
  const [s, setS] = useState<{ multi: "no" | "yes"; filer: GstInput["filer"] }>({ multi: "no", filer: "me" });
  const r = gstTier({ invoicesPerMonth: inv, multiState: s.multi === "yes", filer: s.filer });
  return (
    <>
      <Slider id="hx-g-inv" label="Invoices per month" display={String(inv)} min={5} max={500} step={5} value={inv} onChange={setInv} />
      <Seg label="You sell across states?" value={s.multi} onChange={(multi) => setS({ ...s, multi })} options={[{ v: "no", t: "Only my state" }, { v: "yes", t: "Multiple states" }]} />
      <Seg label="Who does the filing?" value={s.filer} onChange={(filer) => setS({ ...s, filer })} options={[{ v: "me", t: "Me / my team" }, { v: "ca", t: "My CA" }]} />
      <Result
        label="Best-fit tool tier"
        main={<span style={{ fontSize: 20 }}>{r.tier}</span>}
        rows={[["Why this tier", r.why], ["Indicative cost", r.cost], [s.multi === "yes" ? "Multi-state note" : "Single-state note", r.stateNote], ["E-invoicing", r.einvoiceNote]]}
        verdict={{ tone: "mid", text: "Match the tier, then compare plans" }}
      />
      <p className="hx-mo-note">Match the tool to volume, not to ads. The government portal is free and enough for low volume; paid tools earn their fee on reconciliation and bulk GSTR-1/3B prep. Costs are indicative ranges, not quotes.</p>
    </>
  );
}
