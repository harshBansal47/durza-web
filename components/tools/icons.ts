import { Baby, Calculator, Coffee, Clock, Flame, FlaskConical, Gift, GraduationCap, Headphones, HeartPulse, House, Leaf, ListChecks, Lock, Pill, Scale, ShieldCheck, Shirt, ShoppingBag, ShoppingCart, Sparkles, Wallet, Zap, type LucideIcon } from "lucide-react";
import type { ToolIcon } from "@/lib/store-tools";

export const TOOL_ICONS: Record<ToolIcon, LucideIcon> = {
  zap: Zap, flask: FlaskConical, heart: HeartPulse, calc: Calculator, wallet: Wallet, sparkles: Sparkles, shirt: Shirt, home: House,
  bag: ShoppingBag, gift: Gift, baby: Baby, shield: ShieldCheck, list: ListChecks, coffee: Coffee, scale: Scale, clock: Clock,
  pill: Pill, leaf: Leaf, lock: Lock, cap: GraduationCap, headphones: Headphones, cart: ShoppingCart,
};
export const FALLBACK_ICON = Flame;
