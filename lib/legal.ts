/**
 * When the legal documents — privacy policy, terms of use, affiliate
 * disclosure — were last revised. They are reviewed and republished together,
 * so they share one date; update this constant and every page picks it up.
 *
 * Written as a plain display string on purpose: a Date would render in
 * whatever timezone the request happens to hit, and a legal date shouldn't
 * wobble by a day for a visitor in a different timezone.
 */
export const LEGAL_LAST_UPDATED = "17 October 2026";
