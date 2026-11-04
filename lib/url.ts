/**
 * Links built from data an editor or a feed typed in.
 *
 * `website_url` is a free-text field, and a browser follows `javascript:` and `data:` URLs
 * in an `href`. Anything that reaches a link goes through here first: only http(s) passes,
 * and a malformed value yields null instead of throwing during render.
 */
export function parseHttpUrl(value: string | null | undefined): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** The text to show for a store link ("example.com"), or null when it is not a usable link. */
export function hostnameOf(value: string | null | undefined): string | null {
  const url = parseHttpUrl(value);
  return url ? url.hostname.replace(/^www\./, "") : null;
}
