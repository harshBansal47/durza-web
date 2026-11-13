import { Copy, ShoppingBag, BadgeCheck } from "lucide-react";

/**
 * 3-step "how to use a coupon" — written for a first-time Indian online
 * shopper. Purely presentational; no JS required.
 */
export default function HowToApply({ storeName }: { storeName: string }) {
  const steps = [
    { icon: Copy, title: "Copy the code", body: "Tap the Copy button on any offer card above." },
    { icon: ShoppingBag, title: `Shop at ${storeName}`, body: "Add everything you need to your cart — the code works on the website and in the app." },
    { icon: BadgeCheck, title: "Paste & apply at checkout", body: "Paste the code into the coupon box on the payment page and tap Apply." },
  ];

  return (
    <section aria-labelledby="how-to-apply" className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
      <h2 id="how-to-apply" className="text-lg font-bold text-ink">How to apply a coupon code</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3 rounded-xl bg-paper-alt/60 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <step.icon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">
                <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">Step {index + 1}</span>
                <br />
                {step.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-ink-soft">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-ink-soft">
        Code not working? Check the card for minimum order value and eligible products, then try the newest verified code.
      </p>
    </section>
  );
}
