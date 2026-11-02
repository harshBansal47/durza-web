/** `harsh@gmail.com` -> `h••••@gmail.com`. Enough to recognise, not enough to harvest. */
export function maskEmail(email: string): string {
  const [name = "", domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 1)}${"\u2022".repeat(Math.min(Math.max(name.length - 1, 1), 4))}@${domain}`;
}
