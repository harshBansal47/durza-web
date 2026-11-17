"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";

export const inr = (n: number, digits = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { v: T; t: string }[]; onChange: (v: T) => void }) {
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

export function Slider({ id, label, display, min, max, step, value, onChange }: { id: string; label: string; display: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void }) {
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

export function NumberField({ id, label, value, onChange, min, inputMode = "decimal" }: { id: string; label: string; value: string; onChange: (v: string) => void; min?: number; inputMode?: "decimal" | "numeric" }) {
  return (
    <div className="hx-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode={inputMode} min={min} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Result({ label, main, rows, verdict }: { label: string; main: ReactNode; rows?: [string, string][]; verdict?: { tone: "good" | "mid" | "bad"; text: string } }) {
  return (
    <div className="hx-result" role="status" aria-live="polite">
      <div className="hx-r-label">{label}</div>
      <div className="hx-r-main">{main}</div>
      {rows && rows.length > 0 && (
        <div className="hx-r-rows">
          {rows.map(([k, v]) => (
            <div className="hx-r-row" key={k}>
              <span>{k}</span>
              <b>{v}</b>
            </div>
          ))}
        </div>
      )}
      {verdict && (
        <span className={`hx-verdict ${verdict.tone}`}>
          {verdict.tone === "good" && <Check aria-hidden="true" size={12} strokeWidth={3} />}
          {verdict.text}
        </span>
      )}
    </div>
  );
}
