"use client";

import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { bldcSpec, cupSize, gstTier, proteinDecode, type BldcClimate, type CupInput, type GstInput } from "@/lib/hero-tools";
import type { HeroDeal } from "@/lib/home-hero";
import StoreMark from "./StoreMark";
import { HERO_TOOLS, relatedDealsFor, type HeroToolId } from "./tools";
import { useDialog } from "./useDialog";

const inr = (n: number, digits = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });

function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; t: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="hx-field" role="group" aria-label={label}>
      <div className="lbl">{label}</div>
      <div className="hx-seg">
        {options.map((o) => (
          <button key={o.v} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)}>
            {o.t}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ id, label, display, min, max, step, value, onChange }: { id: string; label: string; display: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="hx-field">
      <label htmlFor={id}>
        {label} <output htmlFor={id}>{display}</output>
      </label>
      <input id={id} className="hx-range" type="range" min={min} max={max} step={step} value={value} style={{ ["--fill" as string]: `${fill}%` }} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function NumberField({ id, label, value, onChange, min, inputMode = "decimal" }: { id: string; label: string; value: string; onChange: (v: string) => void; min?: number; inputMode?: "decimal" | "numeric" }) {
  return (
    <div className="hx-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode={inputMode} min={min} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Result({ label, main, rows, verdict }: { label: string; main: ReactNode; rows: [string, string][]; verdict?: { tone: "good" | "mid" | "bad"; text: string } }) {
  return (
    <div className="hx-result" role="status" aria-live="polite">
      <div className="hx-r-label">{label}</div>
      <div className="hx-r-main">{main}</div>
      <div className="hx-r-rows">
        {rows.map(([k, v]) => (
          <div className="hx-r-row" key={k}>
            <span>{k}</span>
            <b>{v}</b>
          </div>
        ))}
      </div>
      {verdict && (
        <span className={`hx-verdict ${verdict.tone}`}>
          {verdict.tone === "good" && <Check aria-hidden="true" size={12} strokeWidth={3} />}
          {verdict.text}
        </span>
      )}
    </div>
  );
}

function Bldc() {
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

function Protein() {
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

function Cup() {
  const [s, setS] = useState<CupInput>({ age: "u30", birth: "no", flow: "med", cervix: "mid" });
  const r = cupSize(s);
  return (
    <>
      <Seg label="Your age" value={s.age} onChange={(age) => setS({ ...s, age })} options={[{ v: "u30", t: "Under 30" }, { v: "o30", t: "30 or above" }]} />
      <Seg label="Birth history" value={s.birth} onChange={(birth) => setS({ ...s, birth })} options={[{ v: "no", t: "No vaginal birth" }, { v: "yes", t: "Vaginal birth" }]} />
      <Seg label="Typical flow" value={s.flow} onChange={(flow) => setS({ ...s, flow })} options={[{ v: "light", t: "Light" }, { v: "med", t: "Medium" }, { v: "heavy", t: "Heavy" }]} />
      <Seg label="Cervix height (knuckle test on your period)" value={s.cervix} onChange={(cervix) => setS({ ...s, cervix })} options={[{ v: "low", t: "Low — first knuckle" }, { v: "mid", t: "Medium" }, { v: "high", t: "High — can't reach" }]} />
      <Result
        label="Recommended size"
        main={<>Size {r.size} <small>· {r.capacity} capacity</small></>}
        rows={[["Why", r.why], ["Fit note", r.stemNote], [`Emptying rhythm (${s.flow === "med" ? "medium" : s.flow} flow)`, `${r.emptying} (max 12 h)`]]}
        verdict={{ tone: "good", text: `Check the brand chart for ${r.size === "L" ? "L / large" : "S / small"} before ordering` }}
      />
      <p className="hx-mo-note">General guidance, not medical advice — brands size differently, so check the brand&apos;s own chart before buying. Cervix height matters more than age.</p>
    </>
  );
}

function Gst() {
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

/**
 * One calculator in a modal. All maths is client-side (lib/hero-tools.ts); nothing
 * is sent anywhere. Related offers are real rows from the stores the tool is about.
 */
export default function ToolModal({ toolId, deals, onClose, onOpenDeal }: { toolId: HeroToolId; deals: HeroDeal[]; onClose: () => void; onOpenDeal: (deal: HeroDeal) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useDialog(cardRef, onClose);
  const tool = HERO_TOOLS.find((t) => t.id === toolId);
  if (!tool) return null;
  const related = relatedDealsFor(tool, deals);

  return createPortal(
    <div className="hx-portal">
      <div className="hx-scrim" onClick={onClose} aria-hidden="true" />
      <div className="hx-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="hx-modal-card" ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="hx-tool-title" tabIndex={-1}>
          <div className="hx-mo-head">
            <span className={`hx-mo-icon tone-${tool.tone}`} aria-hidden="true">
              <tool.Icon size={20} strokeWidth={2.1} />
            </span>
            <div>
              <div className="hx-mo-title" id="hx-tool-title">{tool.name}</div>
              <div className="hx-mo-sub">{tool.desc} · nothing leaves your browser</div>
            </div>
            <button type="button" className="hx-iconbtn" style={{ marginLeft: "auto" }} aria-label="Close tool" onClick={onClose}>
              <X aria-hidden="true" size={14} strokeWidth={2.6} />
            </button>
          </div>
          <div className="hx-mo-body">
            {tool.id === "bldc" && <Bldc />}
            {tool.id === "protein" && <Protein />}
            {tool.id === "cup" && <Cup />}
            {tool.id === "gst" && <Gst />}
            <p className="hx-mo-note">
              Want more detail? Open the <Link href={tool.fullToolHref} onClick={onClose}>{tool.fullToolLabel}</Link>.
            </p>
            {related.length > 0 && (
              <div className="hx-mo-deals">
                <div className="hx-md-label">While you&apos;re here — offers from {tool.storeSlugs.length === 1 ? related[0].store.name : "related stores"}</div>
                {related.map((deal) => (
                  <button key={deal.id} type="button" className="hx-mo-deal" onClick={() => onOpenDeal(deal)}>
                    <StoreMark store={deal.store} size={28} />
                    <span className="hx-md-t">{deal.title}</span>
                    <span className="hx-md-c">{deal.code ?? deal.discount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
