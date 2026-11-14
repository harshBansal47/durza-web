/**
 * The Admitad-connected programs we can send tracked Indian traffic to,
 * keyed by Durza store slug where a store hub exists.
 *
 * `externalCampaignId` is the public program id from the Admitad dashboard;
 * it ships in every outbound /out URL by design (it is not a secret — the
 * tracked destination is minted server-side).
 *
 * `/go/{slug}` stays the preferred destination on pages whose own hub handles
 * the store. These ids exist for in-content guide CTAs (/out?program=...).
 */
export interface AdmitadProgram {
  id: string;
  slug: string;
  displayName: string;
  /** Program country coverage on Admitad ('IN' = India). */
  market: string;
}

export const ADMITAD_PROGRAMS: Record<string, AdmitadProgram> = {
  palmonas: { id: "124942", slug: "palmonas", displayName: "Palmonas", market: "IN" },
  firstcry: { id: "14719", slug: "firstcry", displayName: "FirstCry", market: "IN" },
  milton: { id: "141228", slug: "milton-in", displayName: "Milton", market: "IN" },
  adidas: { id: "34208", slug: "adidas", displayName: "Adidas India", market: "IN" },
  bewakoof: { id: "42616", slug: "bewakoof", displayName: "Bewakoof", market: "IN" },
  acer: { id: "24575", slug: "acer", displayName: "Acer India", market: "IN" },
  asus: { id: "36176", slug: "asus", displayName: "ASUS", market: "IN" },
  lenovo: { id: "22328", slug: "lenovo-india", displayName: "Lenovo India", market: "IN" },
  victoriasSecret: { id: "183205", slug: "victorias-secret", displayName: "Victoria's Secret", market: "IN" },
  salty: { id: "88834", slug: "salty", displayName: "Salty", market: "IN" },
  veromoda: { id: "193910", slug: "veromoda", displayName: "Vero Moda", market: "IN" },
  aldoNew: { id: "185776", slug: "aldo-new", displayName: "Aldo", market: "IN" },
  digihaat: { id: "182817", slug: "digihaat", displayName: "Digihaat", market: "IN" },
  charlesKeith: { id: "181717", slug: "charles-keith", displayName: "Charles & Keith", market: "IN" },
  blissClub: { id: "37709", slug: "bliss-club", displayName: "Bliss Club", market: "IN" },
  bathBodyWorks: { id: "185777", slug: "bath-body-works", displayName: "Bath & Body Works", market: "IN" },
};

export type AdmitadProgramKey = keyof typeof ADMITAD_PROGRAMS;
