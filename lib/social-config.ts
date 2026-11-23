/**
 * Phase 3 T6 — optional follow links. No forms, no personal data, no messaging APIs.
 * Invalid configured URLs are rejected at config load instead of rendering a bad link.
 */

export const SOCIAL_HOSTS: Record<string, readonly string[]> = {
  instagram: ["instagram.com", "www.instagram.com"],
  facebook: ["facebook.com", "www.facebook.com", "fb.com"],
  whatsapp: ["whatsapp.com", "www.whatsapp.com", "wa.me", "chat.whatsapp.com"],
};

export type SocialChannel = keyof typeof SOCIAL_HOSTS;

export function validateSocialUrl(channel: SocialChannel, value: string | undefined): string | null {
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid ${channel} URL: must be an absolute https URL`);
  }
  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || !SOCIAL_HOSTS[channel].includes(host)) {
    throw new Error(`Invalid ${channel} URL: host must be one of ${SOCIAL_HOSTS[channel].join(", ")}`);
  }
  return value;
}

function fromEnv(channel: SocialChannel): string | null {
  const key = `NEXT_PUBLIC_${channel.toUpperCase()}_FOLLOW_URL`;
  return validateSocialUrl(channel, process.env[key]);
}

/** Evaluated once on the server and passed to the client; never a placeholder. */
export function socialFollowLinks(): Partial<Record<SocialChannel, string>> {
  const out: Partial<Record<SocialChannel, string>> = {};
  for (const channel of Object.keys(SOCIAL_HOSTS) as SocialChannel[]) {
    const url = fromEnv(channel);
    if (url) out[channel] = url;
  }
  return out;
}
