/** Structured, content-frozen input for the redesigned guide template. */

export interface GuideDocument {
  slug: string;
  url: string;
  title: string;
  description: string;
  researchReviewedDate: string | null;
  evidenceBadges: string[];
  audience: {
    bestFor: string[];
    skipIf: string[];
  } | null;
  byline: {
    author: string;
    role: string;
    published: string;
    updated: string;
    factsChecked: string;
    bio: string;
    methodHref: string;
  } | null;
  quickAnswer: {
    question: string;
    answer: string;
    jumpHref: string;
    jumpLabel: string;
  } | null;
  ctas: { href: string; label: string; primary?: boolean }[];
  methodNote: string | null;
  scenarios: {
    heading: string;
    body: string;
    icon: "gamepad" | "laptop" | "cap" | null;
  }[] | null;
  skuTable: { headers: string[]; rows: string[][] } | null;
  checkoutSteps: string[] | null;
  checkoutNote: string | null;
  verifiedFacts: {
    kicker: string;
    title: string;
    facts: { label: string; detail: string; href: string | null }[];
    note: string;
    methodHref: string;
  } | null;
  verificationParagraph: string | null;
  verificationNotes: string[] | null;
  exploreLinks: { href: string; label: string }[] | null;
  faqs: { question: string; answer: string }[] | null;
  editorialNote: string | null;
  sources: { label: string; href: string; checkedAt: string | null }[];
}
