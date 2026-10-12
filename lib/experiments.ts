"use client";

import { track } from "./analytics";

/**
 * Lightweight experimentation foundation. No platform, just:
 * Experiment → Variant → stable session assignment → event outcomes.
 *
 * Never run an experiment without hypothesis + primary + guardrail recorded
 * alongside the experiment id (see docs or PR description).
 */

const PREFIX = "durza.exp.";

export function getVariant(experiment: string, variants: string[]): string {
  const fallback = variants[0] ?? "control";
  try {
    const stored = localStorage.getItem(PREFIX + experiment);
    if (stored && variants.includes(stored)) return stored;
    const pick = variants[Math.floor(Math.random() * variants.length)] ?? fallback;
    localStorage.setItem(PREFIX + experiment, pick);
    return pick;
  } catch {
    return fallback;
  }
}

export function trackOutcome(experiment: string, variant: string, outcome: string) {
  track("filter_change", { experiment, variant, outcome });
}
