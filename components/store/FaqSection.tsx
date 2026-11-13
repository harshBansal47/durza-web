export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ accordion — also the single source behind the FAQPage JSON-LD, so the
 * visible answers can never drift from the structured data. Rendered with
 * <details>/<summary>: zero JS, keyboard-accessible.
 */
export default function FaqSection({ items, eyebrow }: { items: FaqItem[]; eyebrow?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="store-faqs">
      <h2 id="store-faqs" className="text-xl font-bold text-ink">
        {eyebrow ?? "FAQs"}
      </h2>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-xl border border-ledger-line bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              {item.question}
            </summary>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
