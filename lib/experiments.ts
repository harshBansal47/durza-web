"use client";

import { track } from "./analytics";
import { isAnalyticsAllowed } from "./consent";
import { PERSONALIZATION_EXPERIMENTS_ENABLED } from "./flags";

export interface Experiment {
  id: string;
  hypothesis: string;
  primaryMetric: string;
  guardrails: string[];
  minSampleSize: number;
  variants: string[];
}

const REGISTRY: Record<string, Experiment> = {};

export function registerExperiment(exp: Experiment) {
  REGISTRY[exp.id] = exp;
}

export function getVariant(experiment: string, variants: string[]): string {
  const fallback = variants[0] ?? "control";
  if (!PERSONALIZATION_EXPERIMENTS_ENABLED) return fallback;
  try {
    const key = `durza.exp.${experiment}`;
    const stored = localStorage.getItem(key);
    if (stored && variants.includes(stored)) return stored;
    const pick = variants[Math.floor(Math.random() * variants.length)] ?? fallback;
    localStorage.setItem(key, pick);
    const exp = REGISTRY[experiment];
    if (exp && isAnalyticsAllowed() && !localStorage.getItem(`${key}:exposed`)) {
      track("filter_change", { experiment, variant: pick, outcome: "exposure" });
      localStorage.setItem(`${key}:exposed`, "1");
    }
    return pick;
  } catch {
    return fallback;
  }
}

export function trackOutcome(experiment: string, variant: string, outcome: string) {
  if (!PERSONALIZATION_EXPERIMENTS_ENABLED) return;
  if (!isAnalyticsAllowed()) return;
  track("filter_change", { experiment, variant, outcome });
}
