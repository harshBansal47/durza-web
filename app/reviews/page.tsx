import type { Metadata } from "next";
import ReviewsHub from "@/components/reviews/ReviewsHub";
import ListingHero from "@/components/listing/ListingHero";
import { REVIEWS } from "@/data/reviews";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Independent Reviews | Honest Buyer Assessments | Durza",
  description:
    "Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Independent Reviews | Durza",
    description:
      "Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness.",
    url: absoluteUrl("/reviews"),
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <div className="hx-portal lx mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <ListingHero
        eyebrow="Honest Buyer Assessments"
        title="Independent Reviews"
        lead="Real pros, honest trade-offs, and break-even math before you spend on memberships, tech, fashion, and wellness."
        stats={[{ value: REVIEWS.length.toLocaleString("en-IN"), label: "Reviews" }]}
        trust={false}
      />
      <ReviewsHub items={REVIEWS} hideHeader />
    </div>
  );
}
