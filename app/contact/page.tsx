import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Durza team to report a coupon that did not work, suggest a store we should track, or ask about listings and partnerships.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-4xl font-extrabold text-ink sm:text-5xl">Contact</h1>
      <p className="mt-4 text-ink-soft">
        Questions, corrections, or a store you&apos;d like listed? Reach us at{" "}
        <a href="mailto:hello@durza.in" className="text-inkblue underline underline-offset-2">
          hello@durza.in
        </a>
        . If a coupon on our site didn&apos;t work, the fastest fix is the{" "}
        <em>&quot;didn&apos;t work&quot;</em> button on its page — it updates the success rate
        everyone sees.
      </p>
    </article>
  );
}
