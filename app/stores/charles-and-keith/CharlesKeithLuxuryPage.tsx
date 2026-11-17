import Image from "next/image";

const LUXURY_COLLECTION_ITEMS = [
  {
    tag: "Iconic Silhouette",
    title: "The Gabine & Sculpted Saddle Bags",
    description:
      "Curved architectural lines finished with signature brushed-gold buckles. Designed to rest effortlessly against tailored linen or evening silk—the unmistakable emblem of modern quiet luxury.",
    imageUrl: "/stores/charles-and-keith/gabine-saddle-bags.jpg",
    cta: "Acquire from Official Boutique",
  },
  {
    tag: "Evening & Salon",
    title: "Architectural Heels & Slingbacks",
    description:
      "Knife-sharp pointed toes, lacquered sculptural heels, and delicate ankle straps. Built for champagne-hour gallery previews, private club dinners, and effortless poise after dark.",
    imageUrl: "/stores/charles-and-keith/architectural-heels.jpg",
    cta: "Explore Footwear Edit",
  },
  {
    tag: "Off-Duty Prestige",
    title: "The Riviera Loafers & Woven Mules",
    description:
      "Supple, structured loafers and hand-woven square-toe flats in rich espresso, ivory chalk, and noir. The definitive footwear for first-class lounges, Sunday brunches, and weekend escapes.",
    imageUrl: "/stores/charles-and-keith/riviera-loafers-mules.jpg",
    cta: "View Resort & Loafers",
  },
  {
    tag: "Executive Carry",
    title: "Structured East-West & Work Totes",
    description:
      "Monolithic, clean-lined carryalls engineered with rigid gussets and refined tonal stitching. Holds daily essentials while projecting unmistakable corner-office authority.",
    imageUrl: "/stores/charles-and-keith/structured-work-totes.jpg",
    cta: "Shop Executive Totes",
  },
  {
    tag: "Intimate Leather Goods",
    title: "Quilted Cardholders & Evening Clutches",
    description:
      "Tactile chevron quilting, metallic chain-link straps, and sleek zip-around wallets. Pocket-sized pieces designed to move easily from a daytime tote to a cocktail clutch.",
    imageUrl: "/stores/charles-and-keith/quilted-small-goods.jpg",
    cta: "Discover Small Goods",
  },
  {
    tag: "Gilded Finishing",
    title: "Acetate Eyewear & Sculptural Jewelry",
    description:
      "Bold geometric sun frames, gold-toned chunky hoops, and modern cuff bracelets. The final editorial punctuation mark that turns an understated outfit into a statement.",
    imageUrl: "/stores/charles-and-keith/eyewear-sculptural-jewelry.jpg",
    cta: "Explore Accessories",
  },
];

const FAQS = [
  {
    q: "Why acquire directly from the official Charles & Keith India store?",
    a: "Shopping directly via the official boutique guarantees access to limited-edition runway capsules, full EU sizing (35–41), and signature branded presentation boxes with protective dust bags—items rarely stocked on third-party marketplaces.",
  },
  {
    q: "How often do new seasonal capsules arrive in India?",
    a: "New architectural bags, metallic evening edits, and resort footwear drop monthly alongside global Singapore and European releases on charleskeith.in.",
  },
  {
    q: "How are packaging, authenticity, and size exchanges handled?",
    a: "All orders are fulfilled directly by Charles & Keith's authorized India flagship operations with boutique-grade packaging and streamlined size exchanges within the store's return window.",
  },
];

export default function CharlesKeithLuxuryStore() {
  const affiliatePrimary = "/go/charles-keith?src=store-page";
  const affiliateEdit = "/go/charles-keith?src=luxury";

  return (
    <div className="bg-[#FAF8F5] text-[#141413] antialiased selection:bg-[#141413] selection:text-[#FAF8F5]">
      {/* Luxury Editorial Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-6 pb-14">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#111111] p-8 text-[#FAF8F5] shadow-2xl md:p-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C6A87C]/50 bg-[#1C1B19] font-serif text-sm tracking-widest text-[#E5C99B]">
                  CK
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A87C]">
                  The Singapore Atelier · Official India Boutique
                </span>
              </div>

              <h1 className="font-serif text-3xl font-normal leading-[1.12] tracking-tight text-white sm:text-5xl">
                Charles &amp; Keith — <span className="italic text-[#E5C99B]">The Architectural Edit</span>
              </h1>

              <p className="text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
                Sculpted leather-grain silhouettes, gallery-worthy heels, and understated hardware crafted for women who command the room without raising their voice.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs uppercase tracking-wider text-neutral-400">
                <span className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1.5 text-neutral-200">
                  Flagship Collection
                </span>
                <span className="rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1.5 text-[#E5C99B]">
                  New Season Arrivals
                </span>
                <span className="px-2 py-1 text-neutral-400">charleskeith.in</span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <a
                href={affiliatePrimary}
                rel="nofollow sponsored noopener noreferrer"
                target="_blank"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#E5C99B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white"
              >
                <span>Enter Official Boutique</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <span className="text-[11px] tracking-wide text-neutral-400">
                Direct access to official Indian storefront
              </span>
            </div>
          </div>

          {/* Prestige Meta Strip */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-neutral-800/90 pt-8 text-xs sm:grid-cols-3">
            <div>
              <p className="uppercase tracking-[0.2em] text-neutral-500">House Heritage</p>
              <p className="mt-1 text-sm font-light text-neutral-200">Singapore Design Atelier · Est. 1996</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] text-neutral-500">Boutique Curation</p>
              <p className="mt-1 text-sm font-light text-neutral-200">Runway Capsules &amp; Signature Classics</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.2em] text-neutral-500">Client Assurance</p>
              <p className="mt-1 text-sm font-light text-neutral-200">Official Packaging &amp; Direct Dispatch</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Piece Luxury Lookbook Grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="flex flex-col justify-between gap-6 border-b border-neutral-200 pb-8 md:flex-row md:items-end">
          <div className="max-w-xl space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8C6D46]">
              Charles &amp; Keith · The Atelier Dossier
            </p>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl">
              Inside the House — <span className="italic text-neutral-600">the season&apos;s signatures.</span>
            </h2>
          </div>
          <a
            href={affiliateEdit}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:border-[#8C6D46] hover:text-[#8C6D46]"
          >
            <span>Explore Full Runway Edit</span>
            <span>↗</span>
          </a>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LUXURY_COLLECTION_ITEMS.map((item) => (
            <li key={item.title} className="group flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div>
                <a
                  href={affiliateEdit}
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                  className="relative block aspect-[4/5] w-full overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-900 backdrop-blur-md">
                    {item.tag}
                  </span>
                </a>

                <div className="space-y-3 p-6">
                  <h3 className="font-serif text-xl font-normal text-neutral-900 transition-colors group-hover:text-[#8C6D46]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <a
                  href={affiliateEdit}
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                  className="inline-flex w-full items-center justify-between border-t border-neutral-100 pt-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-900 transition-colors group-hover:text-[#8C6D46]"
                >
                  <span>{item.cta}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Quiet Editorial Disclosure */}
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Every collection gateway routes directly to the official Charles &amp; Keith India boutique via Durza&apos;s editorial partnership. No artificial countdowns or promotional clutter—just direct access to current runway inventory, sizing, and seasonal capsules. Durza may earn an affiliate commission on qualifying acquisitions at zero additional cost to you.
        </p>
      </section>

      {/* Luxury Buyer Concierge FAQ */}
      <section className="mx-auto max-w-6xl border-t border-neutral-200 px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C6D46]">Client Concierge</p>
            <h2 className="mt-2 font-serif text-2xl text-neutral-900">
              Acquiring from the Official Boutique
            </h2>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200 lg:col-span-2">
            {FAQS.map((item, i) => (
              <details key={item.q} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-neutral-900">
                  <span>{item.q}</span>
                  <span className="text-neutral-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm font-light leading-relaxed text-neutral-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
