/**
 * Reads a rupee amount out of display text such as "₹2,109.00", "Rs. 1,299/-" or "From ₹399".
 *
 * Offer prices arrive as strings straight from the store feed, so they carry symbols, Indian
 * digit grouping and often ".00". Stripping everything except digits turns "₹399.00" into
 * 39900, a hundred times too big, so the decimal point has to survive. When the text holds
 * more than one amount ("MRP ₹999 now ₹399"), the first one is used.
 *
 * Returns null when there is no amount, so callers can tell "no price" from "free".
 */
export function parseRupeePrice(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const match = value.match(/\d[\d,]*(?:\.\d+)?/);
  if (!match) return null;
  const amount = Number.parseFloat(match[0].replace(/,/g, ""));
  return Number.isFinite(amount) ? amount : null;
}
