/**
 * Author registry for the editorial layer.
 *
 * The named reviewer below is a real person who has agreed to be credited.
 * Everything is resolved from `author_name` on the content, so a piece can
 * always be re-attributed to a different reviewer without touching components.
 *
 * NEVER put a name here for someone who did not actually write or review the
 * content. Content that has no named author falls back to the team identity.
 */

export interface Author {
  id: string;
  name: string;
  credential: string;
  bio: string;
  avatarUrl: string | null;
  /** Set once a real author page exists. */
  profileHref: string | null;
}

export const AUTHORS: Record<string, Author> = {
  "harsh-bansal": {
    id: "harsh-bansal",
    name: "Harsh Bansal",
    credential: "Senior software engineer · 8+ years in technology",
    bio: "Harsh builds and audits data-driven products. On Durza he reviews the research method, the comparison logic and the numbers behind each recommendation — so a verdict is something you can check, not just something you are told.",
    avatarUrl: null,
    profileHref: "/about",
  },
  "research-desk": {
    id: "research-desk",
    name: "Durza Research Desk",
    credential: "Editorial team · research-led buying guidance",
    bio: "We compare published specifications, seller terms and verified owner feedback, then show the method next to the conclusion so you can check it yourself.",
    avatarUrl: null,
    profileHref: null,
  },
};

/** Used when a content row has no explicit author_name. */
export const DEFAULT_AUTHOR: Author = AUTHORS["harsh-bansal"];

export function resolveAuthor(nameOrId: string | null | undefined): Author {
  if (!nameOrId) return DEFAULT_AUTHOR;
  const key = nameOrId.trim();
  if (AUTHORS[key]) return AUTHORS[key];
  const byId = Object.values(AUTHORS).find((author) => author.id === key);
  if (byId) return byId;

  // Preserve any real free-text byline already stored on a content row.
  return {
    ...DEFAULT_AUTHOR,
    id: "external",
    name: key,
    credential: DEFAULT_AUTHOR.credential,
    bio: DEFAULT_AUTHOR.bio,
  };
}
