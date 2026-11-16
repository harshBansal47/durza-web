import { Calculator, FlaskConical, HeartPulse, Zap, type LucideIcon } from "lucide-react";
import type { HeroDeal } from "@/lib/home-hero";

export type HeroToolId = "bldc" | "protein" | "cup" | "gst";

export interface HeroTool {
  id: HeroToolId;
  name: string;
  desc: string;
  time: string;
  Icon: LucideIcon;
  tone: "amber" | "green" | "magenta" | "blue";
  /** Store pages whose live offers are relevant to this tool. */
  storeSlugs: string[];
  /** Where the longer version of the tool lives on the site. */
  fullToolHref: string;
  fullToolLabel: string;
}

export const HERO_TOOLS: HeroTool[] = [
  {
    id: "bldc",
    name: "BLDC Power Calculator",
    desc: "Right wattage & sweep for your room",
    time: "~10s",
    Icon: Zap,
    tone: "amber",
    storeSlugs: ["havells"],
    fullToolHref: "/stores/havells/bldc-calculator",
    fullToolLabel: "BLDC savings calculator",
  },
  {
    id: "protein",
    name: "Protein Cost Decoder",
    desc: "₹ per 25g of actual protein",
    time: "~15s",
    Icon: FlaskConical,
    tone: "green",
    storeSlugs: ["alpino", "beast-life", "healthkart", "boldfit", "fuelone"],
    fullToolHref: "/stores/alpino#protein-decoder",
    fullToolLabel: "protein-per-rupee calculator",
  },
  {
    id: "cup",
    name: "Menstrual Cup Size Finder",
    desc: "S or L, matched to your body",
    time: "~20s",
    Icon: HeartPulse,
    tone: "magenta",
    storeSlugs: ["sirona"],
    fullToolHref: "/stores/sirona#cup-size-finder",
    fullToolLabel: "cup size finder",
  },
  {
    id: "gst",
    name: "GST Tool Matcher",
    desc: "Free vs paid filing software",
    time: "~15s",
    Icon: Calculator,
    tone: "blue",
    storeSlugs: ["moglix"],
    fullToolHref: "/stores/moglix#gst-net-cost",
    fullToolLabel: "true net cost calculator",
  },
];

/** Up to two live offers from the stores a tool is about — real rows only, never a placeholder. */
export function relatedDealsFor(tool: HeroTool, deals: readonly HeroDeal[], limit = 2): HeroDeal[] {
  return deals.filter((d) => tool.storeSlugs.includes(d.store.slug)).slice(0, limit);
}
