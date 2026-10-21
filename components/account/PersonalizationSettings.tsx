"use client";

import { useState } from "react";
import { PERSONALIZATION_ENABLED } from "@/lib/flags";
import {
  getPersonalizationConsent,
  resetPersonalization,
  setPersonalizationConsent,
  withdrawPersonalization,
} from "@/lib/consent";

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
}

/**
 * The personalization panel.
 *
 * It only exists when personalization is switched on: the flag defaults to
 * false, so a build without it shows no personalization controls at all. The
 * gate lives in a wrapper rather than inside the panel, so the panel's hooks
 * are not conditional.
 */
export default function PersonalizationSettings() {
  if (!PERSONALIZATION_ENABLED) return null;
  return <PersonalizationSettingsPanel />;
}

function PersonalizationSettingsPanel() {
  const [status, setStatus] = useState<string>(() =>
    getPersonalizationConsent() === "accepted"
      ? "Personalization is on."
      : "Personalization is off.",
  );
  const [busy, setBusy] = useState(false);

  async function exportInterests() {
    setBusy(true);
    try {
      const resp = await fetch(`${apiBase()}/personalization/export`, {
        credentials: "include",
        cache: "no-store",
      });
      if (!resp.ok) throw new Error("export failed");
      const data = await resp.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "durza-personalization.json";
      link.click();
      URL.revokeObjectURL(url);
      setStatus("Export downloaded.");
    } catch {
      setStatus("Could not export your data. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function turnOff() {
    setBusy(true);
    await withdrawPersonalization();
    setStatus("Personalization is off. Local and synced interests were deleted.");
    setBusy(false);
  }

  async function reset() {
    setBusy(true);
    await resetPersonalization();
    setStatus("Interests reset.");
    setBusy(false);
  }

  return (
    <div className="mt-3 space-y-3 text-sm text-ink-soft">
      <p role="status">{status}</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-outline"
          disabled={busy}
          onClick={() => {
            setPersonalizationConsent("accepted");
            setStatus("Personalization is on.");
          }}
        >
          Personalize my experience
        </button>
        <button type="button" className="btn-outline" disabled={busy} onClick={() => void turnOff()}>
          Turn off personalization
        </button>
        <button type="button" className="btn-outline" disabled={busy} onClick={() => void reset()}>
          Reset my interests
        </button>
        <button type="button" className="btn-outline" disabled={busy} onClick={() => void exportInterests()}>
          Export my personalization data
        </button>
      </div>
    </div>
  );
}
