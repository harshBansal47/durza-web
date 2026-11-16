/**
 * Pure maths behind the four quick tools in the homepage hero.
 *
 * Everything here runs in the browser and returns plain numbers/strings, so the
 * modals stay thin and the formulas are unit-tested (lib/__tests__/hero-tools.test.ts).
 * These are rules of thumb for a 10-second answer, not engineering or medical
 * advice; each modal says so and links to the full tool on the store's page.
 */

export type BldcClimate = "mild" | "humid" | "dry";

export interface BldcInput {
  areaSqFt: number;
  heightFt: number;
  climate: BldcClimate;
}

export interface BldcResult {
  /** Air changes per hour assumed for the climate. */
  ach: number;
  /** Airflow to look for on the box, in m³/h. */
  airflowCmh: number;
  /** Same airflow in m³/min. */
  airflowCmm: number;
  sweepMm: number;
  sweepInches: number;
  wattMin: number;
  wattMax: number;
  rpmLabel: string;
  /** Monthly running cost range at the given tariff and hours. */
  monthlyCostMin: number;
  monthlyCostMax: number;
}

const ACH: Record<BldcClimate, number> = { mild: 6, humid: 8, dry: 9 };
const M3_PER_CUFT = 0.0283;

export function bldcSpec(
  { areaSqFt, heightFt, climate }: BldcInput,
  tariffPerUnit = 8,
  hoursPerDay = 12,
): BldcResult {
  const ach = ACH[climate];
  const airflowCmh = Math.round((areaSqFt * heightFt * M3_PER_CUFT * ach) / 5) * 5;

  let sweepMm: number;
  let sweepInches: number;
  let wattMin: number;
  let wattMax: number;
  if (areaSqFt <= 100) {
    [sweepMm, sweepInches, wattMin, wattMax] = [900, 36, 26, 28];
  } else if (areaSqFt <= 150) {
    [sweepMm, sweepInches, wattMin, wattMax] = [1200, 48, 28, 32];
  } else if (areaSqFt <= 220) {
    [sweepMm, sweepInches, wattMin, wattMax] = [1320, 52, 32, 35];
  } else {
    [sweepMm, sweepInches, wattMin, wattMax] = [1400, 56, 35, 40];
  }

  const monthly = (watts: number) => Math.round((watts * hoursPerDay * 30 * tariffPerUnit) / 1000);

  return {
    ach,
    airflowCmh,
    airflowCmm: Math.round(airflowCmh / 60),
    sweepMm,
    sweepInches,
    wattMin,
    wattMax,
    rpmLabel: areaSqFt <= 100 ? "350–380 RPM" : "300–340 RPM",
    monthlyCostMin: monthly(wattMin),
    monthlyCostMax: monthly(wattMax),
  };
}

export interface ProteinInput {
  price: number;
  proteinPerServingG: number;
  servingSizeG: number;
  servings: number;
}

export type Verdict = "good" | "mid" | "bad";

export interface ProteinResult {
  costPer25g: number;
  /** Protein as a share of the scoop, 0–100. */
  purityPct: number;
  totalProteinG: number;
  costPerServing: number;
  verdict: Verdict;
  verdictLabel: string;
  purityLabel: string;
}

/** Clamp to the same floors the form uses, so a half-typed field never divides by zero. */
export function proteinDecode(input: ProteinInput): ProteinResult {
  const price = Math.max(0, input.price || 0);
  const per = Math.max(0.1, input.proteinPerServingG || 0.1);
  const serve = Math.max(per, input.servingSizeG || per);
  const n = Math.max(1, input.servings || 1);

  const totalProteinG = per * n;
  const costPer25g = (price / totalProteinG) * 25;
  const purityPct = (per / serve) * 100;

  const [verdict, verdictLabel]: [Verdict, string] =
    costPer25g <= 55
      ? ["good", "Genuinely good value"]
      : costPer25g <= 85
        ? ["mid", "Fair — compare a couple more"]
        : ["bad", "Overpriced for the protein you get"];

  return {
    costPer25g,
    purityPct,
    totalProteinG,
    costPerServing: price / n,
    verdict,
    verdictLabel,
    purityLabel: purityPct >= 70 ? "solid" : purityPct >= 55 ? "average" : "heavily padded",
  };
}

export interface CupInput {
  age: "u30" | "o30";
  birth: "no" | "yes";
  flow: "light" | "med" | "heavy";
  cervix: "low" | "mid" | "high";
}

export interface CupResult {
  size: "S" | "L";
  capacity: string;
  why: string;
  stemNote: string;
  emptying: string;
}

export function cupSize({ age, birth, flow, cervix }: CupInput): CupResult {
  const large = age === "o30" || birth === "yes" || flow === "heavy";
  return {
    size: large ? "L" : "S",
    capacity: large ? "≈ 25–30 ml" : "≈ 15–20 ml",
    why: large
      ? "Age 30+, vaginal birth or heavy flow points to the larger size"
      : "Under 30, no vaginal birth and light/medium flow points to the smaller size",
    stemNote:
      cervix === "low"
        ? "Choose a short-stem or trimmable-stem variant — a low cervix needs less length."
        : cervix === "high"
          ? "A longer stem / bell shape will be easier to reach and remove."
          : "Standard stem length will suit you.",
    emptying: flow === "heavy" ? "every 4–6 h" : flow === "med" ? "every 6–8 h" : "up to 10–12 h",
  };
}

export interface GstInput {
  invoicesPerMonth: number;
  multiState: boolean;
  filer: "me" | "ca";
}

export interface GstResult {
  tier: string;
  why: string;
  cost: string;
  stateNote: string;
  einvoiceNote: string;
}

/**
 * Picks a software *tier* by filing volume. Prices are indicative annual ranges
 * for each tier, not quotes — the modal says so.
 */
export function gstTier({ invoicesPerMonth, multiState, filer }: GstInput): GstResult {
  let tier: string;
  let why: string;
  let cost: string;
  if (invoicesPerMonth <= 30 && !multiState) {
    tier = "GST portal (free)";
    why = "Low volume, single state — the official portal handles GSTR-1 & 3B fine";
    cost = "₹0";
  } else if (invoicesPerMonth <= 150) {
    tier = "Entry accounting tier (Zoho Books / Vyapar class)";
    why = "Auto GSTR prep + reminders save hours at this volume";
    cost = "≈ ₹750–1,500 / yr";
  } else if (filer === "ca") {
    tier = "Reconciliation tier with CA access (Clear / Masters India class)";
    why = "High volume with a CA — reconciliation & bulk export matter most";
    cost = "≈ ₹5,000–12,000 / yr";
  } else {
    tier = "Business tier (TallyPrime / Clear class)";
    why = "500-invoice months need bulk upload, e-invoicing and 2A/2B reconciliation";
    cost = "≈ ₹8,000–20,000 / yr";
  }

  return {
    tier,
    why,
    cost,
    stateNote: multiState
      ? "You need place-of-supply rules + IGST handling — avoid entry-level tools"
      : "CGST+SGST only; keep it simple",
    einvoiceNote:
      invoicesPerMonth > 150
        ? "Likely required above the turnover threshold — pick a tool with IRP built in"
        : "Not the deciding factor at your volume",
  };
}
