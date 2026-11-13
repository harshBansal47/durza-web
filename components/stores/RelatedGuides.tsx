import Link from "next/link";

interface RelatedStore {
  slug: string;
  name: string;
  hook: string;
}

/**
 * Curated, vertical-matched cross-links rendered at the bottom of each custom
 * brand store page. Groups: nutrition & supplements, clean beauty, fragrance,
 * wellness, men's grooming, fashion, home & kitchen, gifting/kids, digital life.
 */
const RELATED_GUIDES: Record<string, RelatedStore[]> = {
  // Nutrition & supplements
  healthkart: [
    { slug: "beast-life", name: "Beast Life", hook: "Whey isolate, creatine & recovery blends" },
    { slug: "alpino", name: "Alpino", hook: "High-protein oats & natural PB" },
    { slug: "truebasics", name: "TrueBasics", hook: "Patented KSM-66® clinical supplements" },
  ],
  "beast-life": [
    { slug: "healthkart", name: "HealthKart", hook: "India's widest supplement range" },
    { slug: "truebasics", name: "TrueBasics", hook: "Clinically dosed omega-3 & ashwagandha" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Himalayan shilajit & vitality juices" },
  ],
  alpino: [
    { slug: "beast-life", name: "Beast Life", hook: "Whey isolate & training nutrition" },
    { slug: "gritzo", name: "Gritzo", hook: "Growth nutrition for kids" },
    { slug: "healthkart", name: "HealthKart", hook: "Complete protein & mass-gain store" },
  ],
  truebasics: [
    { slug: "beast-life", name: "Beast Life", hook: "Protein for training recovery" },
    { slug: "hkvitals", name: "HK Vitals", hook: "Fish oil, multivitamins & calcium" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Everyday Ayurvedic vitality" },
  ],
  fuelone: [
    { slug: "beast-life", name: "Beast Life", hook: "Whey, creatine & pre-workout" },
    { slug: "healthkart", name: "HealthKart", hook: "MuscleBlaze by HealthKart, direct" },
    { slug: "alpino", name: "Alpino", hook: "Protein oats & snacks" },
  ],
  hkvitals: [
    { slug: "truebasics", name: "TrueBasics", hook: "KSM-66® & triple-strength omega-3" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Shilajit & herbal juices" },
    { slug: "healthkart", name: "HealthKart", hook: "Protein & daily nutrition" },
  ],
  kapiva: [
    { slug: "truebasics", name: "TrueBasics", hook: "Clinically dosed supplements" },
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Classical Kumkumadi & Bringadi" },
    { slug: "hkvitals", name: "HK Vitals", hook: "Omega-3 & multivitamin basics" },
  ],
  gritzo: [
    { slug: "alpino", name: "Alpino", hook: "Family-friendly protein snacks" },
    { slug: "firstcry", name: "FirstCry", hook: "Baby & kids essentials" },
    { slug: "healthkart", name: "HealthKart", hook: "Adult protein & gains" },
  ],
  "ajio-com-ecommerce-cps-india": [
    { slug: "myntra", name: "Myntra", hook: "Fashion, beauty and home finds" },
    { slug: "tatacliq-com-ecommerce-cps-india", name: "Tata CLiQ", hook: "Marketplace + Neu app bank deals" },
    { slug: "levis", name: "Levi's", hook: "Jeans, tees and offer-week drops" },
  ],
  "tatacliq-com-ecommerce-cps-india": [
    { slug: "ajio-com-ecommerce-cps-india", name: "Ajio", hook: "Ethnic, western and designer sale drops" },
    { slug: "myntra", name: "Myntra", hook: "Fashion and beauty with member pricing" },
    { slug: "levis", name: "Levi's", hook: "Direct from the denim source" },
  ],
  nykaa: [
    { slug: "iba-cosmetics", name: "IBA Cosmetics", hook: "Halal-certified clean beauty" },
    { slug: "dot-and-key", name: "Dot & Key", hook: "Skin longevity actives for India" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Vegan clean skincare routines" },
  ],
  myntra: [
    { slug: "ajio-com-ecommerce-cps-india", name: "Ajio", hook: "Ethnic-first sale fashion" },
    { slug: "levis", name: "Levi's", hook: "Denim at list-and-sale prices" },
    { slug: "lavie-world", name: "Lavie", hook: "Everyday handbags and totes" },
  ],
  swiggy: [
    { slug: "zomato", name: "Zomato", hook: "Food delivery and dineout deals" },
    { slug: "igp", name: "IGP", hook: "Late-night cakes and gifts" },
  ],
  zomato: [
    { slug: "swiggy", name: "Swiggy", hook: "Food delivery and Instamart" },
    { slug: "igp", name: "IGP", hook: "Celebration cakes and gifts" },
  ],
  zeroharm: [
    { slug: "truebasics", name: "TrueBasics", hook: "Patented-ingredient clinical nutrition" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Ayurvedic metabolic support" },
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Classical herbal formulations" },
  ],
  fitspire: [
    { slug: "alpino", name: "Alpino", hook: "Protein-rich everyday staples" },
    { slug: "beast-life", name: "Beast Life", hook: "Training & recovery supplements" },
    { slug: "truebasics", name: "TrueBasics", hook: "Collagen & joint care" },
  ],
  boldfit: [
    { slug: "beast-life", name: "Beast Life", hook: "Fuel the training you build at home" },
    { slug: "alpino", name: "Alpino", hook: "High-protein snacks" },
    { slug: "gritzo", name: "Gritzo", hook: "Nutrition for the whole family" },
  ],
  // Clean beauty
  brillare: [
    { slug: "dot-and-key", name: "Dot & Key", hook: "Sunscreens & skincare actives" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Clean vegan anti-aging serums" },
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Kumkumadi & Bringadi classics" },
  ],
  "dot-and-key": [
    { slug: "brillare", name: "Brillare", hook: "Scalp care & oil shots" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Peptides & vitamin C serums" },
    { slug: "iba-cosmetics", name: "Iba Cosmetics", hook: "Halal certified color cosmetics" },
  ],
  "nourish-mantra": [
    { slug: "dot-and-key", name: "Dot & Key", hook: "Gel moisturisers & sunscreens" },
    { slug: "brillare", name: "Brillare", hook: "Vedic scalp rituals" },
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Saffron-based anti-aging" },
  ],
  "kama-ayurveda": [
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Shilajit & metabolic juices" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Vegan botanical actives" },
    { slug: "iba-cosmetics", name: "Iba Cosmetics", hook: "Pure, halal color cosmetics" },
  ],
  "iba-cosmetics": [
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Clean vegan skincare" },
    { slug: "dot-and-key", name: "Dot & Key", hook: "Budget-friendly skincare actives" },
    { slug: "the-natural-wash", name: "The Natural Wash", hook: "Kitchen-active ayurvedic care" },
  ],
  "the-natural-wash": [
    { slug: "iba-cosmetics", name: "Iba Cosmetics", hook: "Halal certified makeup" },
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Kannauj rose & kumkumadi" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Modern clean skincare" },
  ],
  "indus-valley": [
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Bringadi hair therapy oil" },
    { slug: "the-natural-wash", name: "The Natural Wash", hook: "Onion hair oil & rose water" },
    { slug: "iba-cosmetics", name: "Iba Cosmetics", hook: "Halal personal care" },
  ],
  // Fragrance
  hirafragrance: [
    { slug: "neesh-perfumes", name: "Neesh Perfumes", hook: "Extrait de parfum & attars" },
    { slug: "the-man-company", name: "The Man Company", hook: "Blanc EDP & beard growth kits" },
  ],
  "neesh-perfumes": [
    { slug: "hirafragrance", name: "Hira Fragrance", hook: "Oud & attar roll-ons" },
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Kannauj rose water rituals" },
  ],
  // Wellness & intimate care
  sirona: [
    { slug: "mymuse", name: "MyMuse", hook: "Modern intimate wellness, discreet care" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Gentle clean body care" },
    { slug: "dot-and-key", name: "Dot & Key", hook: "Skincare basics" },
  ],
  mymuse: [
    { slug: "sirona", name: "Sirona Hygiene", hook: "Period-positive menstrual care" },
    { slug: "brillare", name: "Brillare", hook: "Scalp & self-care rituals" },
    { slug: "dot-and-key", name: "Dot & Key", hook: "Easy everyday skincare" },
  ],
  // Men's grooming
  "the-man-company": [
    { slug: "healthkart", name: "HealthKart", hook: "Protein & strength supplements" },
    { slug: "beast-life", name: "Beast Life", hook: "Training recovery nutrition" },
    { slug: "hirafragrance", name: "Hira Fragrance", hook: "Everyday office attars" },
  ],
  // Fashion
  "lavie-world": [
    { slug: "levis", name: "Levi's India", hook: "501/511/512 denim classics" },
    { slug: "the-bear-house", name: "The Bear House", hook: "Linen & oxford casual shirts" },
    { slug: "neesh-perfumes", name: "Neesh Perfumes", hook: "Gift-worthy extrait perfumes" },
  ],
  levis: [
    { slug: "lavie-world", name: "Lavie World", hook: "Handbags & satchels" },
    { slug: "the-bear-house", name: "The Bear House", hook: "Denim-friendly casual tops" },
    { slug: "the-man-company", name: "The Man Company", hook: "Grooming for the denim life" },
  ],
  "the-bear-house": [
    { slug: "levis", name: "Levi's India", hook: "The denim that completes the look" },
    { slug: "lavie-world", name: "Lavie World", hook: "Work-to-weekend bags" },
    { slug: "the-man-company", name: "The Man Company", hook: "Beard & fragrance finish" },
  ],
  // Home & kitchen
  milton: [
    { slug: "wonderchef", name: "Wonderchef", hook: "Nutri-Blend & granite cookware" },
    { slug: "havells", name: "Havells", hook: "Home electricals & appliances" },
    { slug: "nilkamalfurniture", name: "Nilkamal Furniture", hook: "WFH chairs & wardrobes" },
  ],
  wonderchef: [
    { slug: "milton", name: "Milton India", hook: "24H thermosteel flasks & tiffins" },
    { slug: "havells", name: "Havells", hook: "Kitchen & home appliances" },
    { slug: "moglix", name: "Moglix", hook: "DIY tools for kitchen repairs" },
  ],
  havells: [
    { slug: "nilkamalfurniture", name: "Nilkamal Furniture", hook: "Furniture for every room" },
    { slug: "wonderchef", name: "Wonderchef", hook: "Chef-curated kitchenware" },
    { slug: "milton", name: "Milton India", hook: "Insulated daily carry" },
  ],
  nilkamalfurniture: [
    { slug: "havells", name: "Havells", hook: "Home electricals & lighting" },
    { slug: "wonderchef", name: "Wonderchef", hook: "Kitchen upgrades" },
    { slug: "moglix", name: "Moglix", hook: "Mounting & assembly tools" },
  ],
  moglix: [
    { slug: "nilkamalfurniture", name: "Nilkamal Furniture", hook: "WFH & storage solutions" },
    { slug: "havells", name: "Havells", hook: "Home wiring & appliances" },
    { slug: "wonderchef", name: "Wonderchef", hook: "Serious kitchen hardware" },
  ],
  "zoff-foods": [
    { slug: "wonderchef", name: "Wonderchef", hook: "Cook the cool-ground way" },
    { slug: "milton", name: "Milton India", hook: "Freshness-keeping storage" },
    { slug: "havells", name: "Havells", hook: "Kitchen & dining electricals" },
  ],
  // Gifting & kids
  igp: [
    { slug: "lavie-world", name: "Lavie World", hook: "Giftable handbags & wallets" },
    { slug: "neesh-perfumes", name: "Neesh Perfumes", hook: "Luxury perfume gift boxes" },
    { slug: "gritzo", name: "Gritzo", hook: "Nutrition gifts for kids" },
  ],
  firstcry: [
    { slug: "gritzo", name: "Gritzo", hook: "Growth supermilk for kids" },
    { slug: "alpino", name: "Alpino", hook: "Family snacking staples" },
    { slug: "igp", name: "IGP.com", hook: "Birthday & christening gifts" },
  ],
  "firstcry/club-calculator": [
    { slug: "firstcry", name: "FirstCry", hook: "Parenting essentials, sorted" },
    { slug: "gritzo", name: "Gritzo", hook: "Kids nutrition & growth drinks" },
    { slug: "alpino", name: "Alpino", hook: "Family snacking staples" },
  ],
  "firstcry/diaper-cost-tracker": [
    { slug: "firstcry", name: "FirstCry", hook: "Bulk diaper packs & deals" },
    { slug: "gritzo", name: "Gritzo", hook: "Kids nutrition growth packs" },
    { slug: "igp", name: "IGP.com", hook: "Hampers for new parents" },
  ],
  "firstcry/baby-gear-finder": [
    { slug: "firstcry", name: "FirstCry", hook: "Strollers, car seats & more" },
    { slug: "gritzo", name: "Gritzo", hook: "Growth nutrition for toddlers" },
    { slug: "alpino", name: "Alpino", hook: "Healthy family snacking" },
  ],
  // Digital life
  nordpass: [
    { slug: "bytepe", name: "BytePe", hook: "Secure BBPS bill payments & gift cards" },
    { slug: "truebasics", name: "TrueBasics", hook: "Monthly wellness replenishment" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Subscription herbal nutrition" },
  ],
  bytepe: [
    { slug: "nordpass", name: "NordPass", hook: "Protect every account on one master key" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Monthly health subscriptions" },
    { slug: "truebasics", name: "TrueBasics", hook: "Clinically dosed monthly stacks" },
  ],
  guvi: [
    { slug: "bytepe", name: "BytePe", hook: "Pay for courses without fees" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Fuel the brain while you learn" },
    { slug: "truebasics", name: "TrueBasics", hook: "Focus & memory nutrition" },
  ],
  "life-changing-astro": [
    { slug: "kama-ayurveda", name: "Kama Ayurveda", hook: "Auspicious Kannauj attars" },
    { slug: "kapiva", name: "Kapiva Ayurveda", hook: "Meditation & sleep remedies" },
    { slug: "nourish-mantra", name: "Nourish Mantra", hook: "Calm-skin rituals" },
  ],
};

export default function RelatedGuides({ slug }: { slug: string }) {
  const items = RELATED_GUIDES[slug];
  if (!items?.length) return null;
  return (
    <section aria-label="Related stores" className="mx-auto max-w-6xl px-4 pb-10">
      <h2 className="text-lg font-bold text-ink">Related Smart Store Guides</h2>
      <p className="mt-1 text-sm text-ink-soft">
        More Durza store hubs in the same shelf — built by the same editors.
      </p>
      <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="w-52 shrink-0 sm:w-auto">
            <Link
              href={`/stores/${item.slug}`}
              className="block h-full rounded-2xl border border-ledger-line bg-white p-4 transition hover:border-inkblue hover:shadow-sm"
            >
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="mt-1 text-xs text-ink-soft">{item.hook}</p>
              <span className="mt-3 inline-block text-xs font-medium text-accent">
                Visit store →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
