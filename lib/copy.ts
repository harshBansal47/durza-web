export const copy = {
  actions: {
    copyCodeAndOpen: "Copy & open",
    viewCode: "View code",
    getDeal: "Get deal",
    trackDeal: "Track deal",
    save: "Save",
    saved: "Saved",
    follow: "Follow",
    following: "Following",
    signIn: "Sign in",
  },
  status: {
    noVotes: "No votes yet",
    lowData: "No votes yet from enough shoppers",
    verified: (reports: number) => `Verified working by ${reports} Durza users recently`,
    checked: (date: string) => `Checked ${date}`,
    expires: (date: string) => `Expires ${date}`,
    endsToday: "Ends today",
    expired: "Expired",
  },
  empty: {
    noOffers: "No active offers right now.",
    noVotes: "No votes yet. Be the first to tell us if it worked.",
    noSaved: "Nothing saved yet.",
    noAlerts: "No alerts yet.",
    noTracked: "No tracked products yet.",
  },
  ranking: {
    whyThisOrder: "Why this order?",
    body: "Part of this order reflects how offers perform for shoppers, including affiliate earnings that fund the site. Some spots try newer offers. Read the affiliate disclosure and how it works for details.",
  },
  errors: {
    loadFailed: "We could not load this. Try again.",
    clipboardFailed: "Copy did not work. The code is still visible.",
    trackFailed: "We could not save your alert. Try again.",
  },
} as const;

export const BANNED_HYPE = [
  "amazing",
  "awesome",
  "best",
  "crazy",
  "exclusive",
  "guaranteed",
  "huge",
  "insane",
  "instant",
  "legendary",
  "massive",
  "mind-blowing",
  "must-have",
  "perfect",
  "revolutionary",
  "secret",
  "shocking",
  "unbeatable",
  "world-class",
  "100%",
] as const;

export const GLOSSARY_TERMS = [
  { term: "coupon", allowed: ["coupon", "offer", "deal"] },
  { term: "code", allowed: ["code", "promo code"] },
  { term: "verified", allowed: ["verified", "checked", "reports"] },
] as const;
