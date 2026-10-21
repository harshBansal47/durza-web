export const SALE_HUBS_ENABLED = process.env.NEXT_PUBLIC_SALE_HUBS_ENABLED === "true";
// Personalization is off until somebody deliberately turns it on. The API
// refuses the personalization endpoints while it is off (404), and the UI
// hides every control that would use them, so a build with the flag unset
// behaves exactly like a build without the feature.
export const PERSONALIZATION_ENABLED =
  process.env.NEXT_PUBLIC_PERSONALIZATION_ENABLED === "true";
export const PERSONALIZATION_EXPERIMENTS_ENABLED =
  process.env.NEXT_PUBLIC_PERSONALIZATION_EXPERIMENTS_ENABLED === "true";
