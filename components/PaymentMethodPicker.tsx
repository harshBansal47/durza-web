"use client";

import { useState } from "react";

const METHODS = ["UPI", "Credit card", "Debit card", "Net banking"];

export default function PaymentMethodPicker() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (m: string) =>
    setSelected((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  return (
    <div>
      {METHODS.map((m) => (
        <button key={m} type="button" onClick={() => toggle(m)} aria-pressed={selected.includes(m)}>
          {m}
        </button>
      ))}
    </div>
  );
}
