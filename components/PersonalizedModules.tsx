"use client";

import { useEffect, useState } from "react";
import { isPersonalizationAllowed } from "@/lib/consent";
import { PERSONALIZATION_ENABLED } from "@/lib/flags";
import { personalizationApi, type PersonalizedItem } from "@/lib/client-api/personalization";

export default function PersonalizedModules() {
  const [items, setItems] = useState<PersonalizedItem[]>([]);
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    // The flag is off by default: no request is made, and nothing renders.
    if (!PERSONALIZATION_ENABLED) return;
    if (!isPersonalizationAllowed()) return;
    personalizationApi
      .getPickedForYou()
      .then((data) => {
        setItems(data.items ?? []);
        setReason(data.reason ?? null);
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
