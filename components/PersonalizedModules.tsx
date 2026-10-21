"use client";

import { useEffect, useState } from "react";
import { isPersonalizationAllowed } from "@/lib/consent";
import { PERSONALIZATION_ENABLED } from "@/lib/flags";

interface PersonalizedItem {
  title?: string;
}

interface PersonalizedResponse {
  items?: PersonalizedItem[];
  reason?: string;
}

export default function PersonalizedModules() {
  const [items, setItems] = useState<PersonalizedItem[]>([]);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    // The flag is off by default: no request is made, and nothing renders.
    if (!PERSONALIZATION_ENABLED) return;
    if (!isPersonalizationAllowed()) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"}/personalization/picked-for-you`, {
      credentials: "include",
      cache: "no-store",
    })
      .then((r) => (r.ok ? (r.json() as Promise<PersonalizedResponse>) : null))
      .then((data) => {
        if (data) {
          setItems(data.items ?? []);
          setReason(data.reason ?? null);
        }
      })
      .catch(() => {});
  }, []);

  if (!items.length) return null;
  return (
    <section>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.title ?? "Item"}</li>
        ))}
      </ul>
      {reason && (
        <details>
          <summary>Why am I seeing this?</summary>
          <p>{reason}</p>
        </details>
      )}
    </section>
  );
}
