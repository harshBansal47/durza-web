// The vCommission-connected campaigns we can send tracked traffic to,
// keyed by the Durza store hub slug (the slug used by `/go/{slug}`,
// `/stores/{slug}` and the generic dynamic store route). Same role as
// `data/admitad-programs.ts`; mirrored from the live vCommission dashboard
// and `affiliate_campaigns` (network = "vcommission", is_active = true) as
// of 2026-11-17.
//
// `id` is the vCommission `campaign_id`; it ships in every outbound link by
// design (it is not a secret — the tracked destination is minted client-side
// as `https://track.vcommission.com/click?campaign_id=…`). `lib/affiliate.ts`
// derives its flat `VCOMMISSION_CAMPAIGNS` map from this file, so keep this
// list in sync with the dashboard when programs change.
//
// Markets: every campaign below is India-facing except `purevpn` (worldwide,
// CPA) and `boggbag` (US). Both are kept for completeness with their real
// coverage; do not feature them on India-targeted rails.
//
// `pageSlug` (optional) is the hand-rolled custom page slug when a store has
// one at a different path than its DB store slug.

export interface VCommissionCampaign {
  /** vCommission campaign id — public by design. */
  id: string;
  /** Durza store hub slug (DB slug), used by `/go/{slug}`. */
  slug: string;
  displayName: string;
  /** Program country coverage on vCommission ('IN' = India, 'WW' = worldwide, 'US'). */
  market: string;
  /** Hand-written custom page route when it differs from `slug` (optional). */
  pageSlug?: string;
}

const in_ = (slug: string, id: string, displayName: string): VCommissionCampaign => ({
  id,
  slug,
  displayName,
  market: "IN",
});

export const VCOMMISSION_CAMPAIGNS = {
  ajio: in_("ajio-com-ecommerce-cps-india", "10364", "AJIO"),
  alpino: in_("alpino", "13512", "Alpino"),
  beastLife: in_("beast-life", "13808", "Beastlife"),
  baccabucci: in_("baccabucci-com-ecommerce-cps-india", "11641", "Baccabucci"),
  blabliblulife: in_("blabliblulife-com-ecommerce-cps-india", "13738", "Blabliblulife"),
  boggbag: { id: "13589", slug: "boggbag-com-ecommerce-cps-united-states", displayName: "Bogg Bag", market: "US" },
  boldfit: in_("boldfit", "13749", "Boldfit"),
  boult: in_("boult", "10323", "Boult"),
  brillare: in_("brillare", "13375", "Brillare"),
  bytepe: in_("bytepe", "13363", "Bytepe"),
  dotAndKey: in_("dot-and-key", "12957", "Dot & Key"),
  firstcry: in_("firstcry", "10081", "FirstCry"),
  fitspire: in_("fitspire", "13768", "Fitspire"),
  fuelOne: in_("fuelone", "13114", "FuelOne"),
  gritzo: in_("gritzo", "13113", "Gritzo"),
  guvi: in_("guvi", "10782", "Guvi"),
  havells: in_("havells", "13307", "Havells"),
  healthkart: in_("healthkart", "10109", "HealthKart"),
  hiraFragrance: in_("hirafragrance", "13740", "Hira Fragrance"),
  hkvitals: in_("hkvitals", "10111", "HK Vitals"),
  ibaCosmetics: in_("iba-cosmetics", "12939", "Iba Cosmetics"),
  igp: in_("igp", "11874", "IGP"),
  indusValley: in_("indus-valley", "12859", "Indus Valley"),
  kamaAyurveda: in_("kama-ayurveda", "10125", "Kama Ayurveda"),
  kapiva: in_("kapiva", "10126", "Kapiva"),
  lavieWorld: in_("lavie-world", "13524", "Lavie"),
  levis: in_("levis", "11501", "Levi's"),
  lifeChangingAstro: in_("life-changing-astro", "13860", "Life Changing Astro"),
  milton: in_("milton", "12749", "Milton"),
  moglix: in_("moglix", "10351", "Moglix"),
  muscleblaze: in_("muscleblaze-com-ecommerce-cps-india", "10169", "MuscleBlaze"),
  mymuse: in_("mymuse", "10666", "MyMuse"),
  neeshPerfumes: in_("neesh-perfumes", "10175", "Neesh Perfumes"),
  nilkamalFurniture: in_("nilkamalfurniture", "11875", "Nilkamal Furniture"),
  nordpass: in_("nordpass", "10181", "NordPass"),
  nourishMantra: in_("nourish-mantra", "12144", "Nourish Mantra"),
  nuawoman: in_("nuawoman-com-ecommerce-cps-india", "10183", "Nuawoman"),
  pepperfry: in_("pepperfry-com-ecommerce-cps-india", "10194", "Pepperfry"),
  perfora: { ...in_("perforacare-com-ecommerce-cps-india", "11206", "Perfora"), pageSlug: "perfora-care" },
  purevpn: { id: "10203", slug: "purevpn-com-utility-cpa-worldwide", displayName: "PureVPN", market: "WW" },
  rForRabbit: { ...in_("rforrabbit-com-ecommerce-cps-india", "10207", "R for Rabbit"), pageSlug: "r-for-rabbit" },
  salty: in_("salty-co-in-ecommerce-cps-india", "11241", "Salty Co"),
  sanskrutiHomes: { ...in_("sanskrutihomes-in-ecommerce-cps-india", "13401", "Sanskruti Homes"), pageSlug: "sanskruti-homes" },
  shopTupperware: { ...in_("shoptupperware-in-ecommerce-cps-india", "13645", "Shop Tupperware"), pageSlug: "shop-tupperware" },
  sirona: in_("sirona", "13441", "Sirona"),
  skullcandy: in_("skullcandy-in-ecommerce-cps-india", "13831", "Skullcandy"),
  storeJeenasikho: in_("store-jeenasikho-com-ecommerce-cps-india", "13701", "Jeenasikho"),
  tatacliq: in_("tatacliq-com-ecommerce-cps-india", "10240", "Tata CLiQ"),
  tenxyou: in_("tenxyou-com-ecommerce-cps-india", "13667", "Tenxyou"),
  theBearHouse: in_("the-bear-house", "13462", "The Bear House"),
  theManCompany: in_("the-man-company", "10248", "The Man Company"),
  theNaturalWash: in_("the-natural-wash", "12839", "The Natural Wash"),
  truebasics: in_("truebasics", "10255", "TrueBasics"),
  wonderchef: in_("wonderchef", "12979", "Wonderchef"),
  zeroharm: in_("zeroharm", "10514", "ZeroHarm"),
  zoffFoods: in_("zoff-foods", "13859", "Zoff Foods"),
} as const satisfies Record<string, VCommissionCampaign>;

export type VCommissionCampaignKey = keyof typeof VCOMMISSION_CAMPAIGNS;
