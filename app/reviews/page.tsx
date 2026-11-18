import type { Metadata } from "next";
import ReviewsHub from "@/components/reviews/ReviewsHub";
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
  return <ReviewsHub items={REVIEWS} />;
}
