import { jsonLdString } from "@/lib/json-ld";

/** The one way to emit structured data. Never write the script tag by hand. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
