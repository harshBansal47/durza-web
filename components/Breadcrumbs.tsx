import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * The visible breadcrumb trail and its BreadcrumbList structured data, from one list.
 *
 * They used to be separate: pages emitted the JSON-LD but showed nothing, so the markup
 * described a trail no visitor could see. Rendering both here means they cannot drift apart,
 * and the visible links give crawlers a real path from each page up to its parents.
 * The last crumb is the current page: shown as text, not a link.
 */
export default function Breadcrumbs({ items, className = "mb-4" }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className={`text-sm text-ink-soft ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-x-2">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="hover:text-inkblue">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
