import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import PageTitle from "@/components/ui/PageTitle";
import type { Category } from "@/lib/types";
import { categoryImageFor } from "@/lib/siteImages";

export default function CategoryHero({
  category,
  title,
}: {
  category: Category;
  title: string;
}) {
  const image = categoryImageFor(category);
  if (!image) {
    return (
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-lg border border-ledger-line bg-paper text-ink shadow-[var(--shadow-hairline)]">
          <CategoryIcon category={category} className="h-6 w-6" />
        </span>
        <PageTitle className="mb-0">{title}</PageTitle>
      </div>
    );
  }

  return (
    <section className="relative mb-7 isolate overflow-hidden rounded-2xl border border-ledger-line bg-paper-alt shadow-[var(--shadow-hairline)]" aria-label={`${category.name} category`}>
      <div className="relative aspect-[2.2/1] min-h-44 sm:aspect-[3.5/1] sm:min-h-52">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover object-center"
          priority
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/5 sm:via-white/65" />
        <div className="absolute inset-y-0 left-0 flex max-w-[85%] items-center p-5 sm:max-w-[60%] sm:p-8">
          <div>
            <span aria-hidden="true" className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-accent shadow-sm">
              <CategoryIcon category={category} className="h-5 w-5" />
            </span>
            <PageTitle className="text-2xl text-ink sm:text-4xl">{title}</PageTitle>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft sm:text-base">
              Browse current {category.name.toLowerCase()} deals and coupons, with source details and check dates on every offer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
