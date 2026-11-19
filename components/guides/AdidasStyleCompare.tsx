import { ArrowUpRight } from "lucide-react";
import { GO_REL, storeGoHref } from "@/lib/go";

const STYLES = [
  {
    id: "ultraboost",
    source: "adidas-guide-style-ultraboost",
    category: "Road running",
    name: "Ultraboost",
    description:
      "Compare the current version by fit, cushioning and weight for your usual distance. Check the exact model and return terms before ordering.",
  },
  {
    id: "adizero",
    source: "adidas-guide-style-adizero",
    category: "Faster sessions",
    name: "Adizero",
    description:
      "A line to explore for faster training or race-focused use. Match the specific shoe to your experience, running surface and training plan.",
  },
  {
    id: "originals",
    source: "adidas-guide-style-originals",
    category: "Everyday wear",
    name: "Samba and Gazelle",
    description:
      "Compare these Originals for casual outfits rather than running. Their shape may feel narrow, so check the size guide and return policy.",
  },
  {
    id: "training",
    source: "adidas-guide-style-training",
    category: "Gym and studio",
    name: "Training",
    description:
      "Choose by the movements you do most. Check the outsole, support and fit on the exact pair instead of relying on the family name.",
  },
] as const;

export default function AdidasStyleCompare() {
  return (
    <section
      aria-labelledby="adidas-styles-heading"
      className="my-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
    >
      <div className="max-w-2xl">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
          Choose by use case
        </p>
        <h2 id="adidas-styles-heading" className="mt-2 font-serif text-2xl font-extrabold text-ink">
          Adidas styles to compare
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          This is a practical shortlist, not a live bestseller ranking. Product versions, sizing,
          prices and availability can change; confirm the exact pair on Adidas India.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {STYLES.map((style) => {
          return (
            <article key={style.id} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {style.category}
              </p>
              <h3 className="mt-2 text-lg font-bold text-ink">{style.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{style.description}</p>
              <a
                href={storeGoHref("adidas", style.source)}
                target="_blank"
                rel={GO_REL}
                data-affiliate-click={style.source}
                className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-700"
              >
                Check on Adidas India
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </article>
          );
        })}
      </div>

    </section>
  );
}
