/**
 * Codes are revealed on the offer page, not in listings. A listing prints a
 * mask like "BFF•••" and links through to the reveal + copy flow.
 */
export function maskCode(code: string | null | undefined): string | null {
  const trimmed = code?.trim();
  if (!trimmed) return null;
  const visible = trimmed.slice(0, 3);
  return `${visible}${"•".repeat(Math.max(3, trimmed.length - visible.length))}`;
}
