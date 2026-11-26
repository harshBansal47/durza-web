import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Shared pill + H2 + description + action header for homepage sections. */
export default function SectionHead({
  id,
  pill,
  title,
  description,
  href,
  linkLabel,
}: {
  id: string;
  pill: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="hs-head" aria-labelledby={`${id}-heading`}>
      <div>
        <span className="hs-pill">{pill}</span>
        <h2 id={`${id}-heading`} className="hs-h2">{title}</h2>
        <p className="hs-sub">{description}</p>
      </div>
      <Link href={href} className="hs-more">{linkLabel} <ArrowRight aria-hidden="true" size={15} /></Link>
    </div>
  );
}
