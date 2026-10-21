"use client";

import { useEffect, useState } from "react";
import { isAnalyticsAllowed, isPersonalizationAllowed } from "@/lib/consent";

export default function PersonalizedModules() {
  const [items, setItems] = useState<any[]>([]);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    if (!isPersonalizationAllowed()) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"}/personalization/picked-for-you`, {
      credentials: "include",
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : null))
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
      {reason && <p>{reason}</p>}
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.title ?? "Item"}</li>
        ))}
      </ul>
    </section>
  );
}
