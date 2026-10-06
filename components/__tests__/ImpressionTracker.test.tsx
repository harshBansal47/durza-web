import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImpressionTracker } from "@/components/ImpressionTracker";
import { resetImpressionDedupe } from "@/lib/analytics";
import { api } from "@/lib/api";

/** An IntersectionObserver the test drives by hand, instead of the global always-visible mock. */
class ManualObserver {
  static instances: ManualObserver[] = [];
  disconnected = false;
  constructor(private cb: IntersectionObserverCallback) {
    ManualObserver.instances.push(this);
  }
  observe = vi.fn();
  disconnect = () => {
    this.disconnected = true;
  };
  unobserve = vi.fn();
  takeRecords = () => [];
  show(isIntersecting: boolean) {
    this.cb([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
}

const original = globalThis.IntersectionObserver;

describe("ImpressionTracker", () => {
  let spy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    resetImpressionDedupe();
    ManualObserver.instances = [];
    globalThis.IntersectionObserver = ManualObserver as unknown as typeof IntersectionObserver;
    spy = vi.spyOn(api, "recordImpression").mockResolvedValue(undefined as never);
  });
  afterEach(() => {
    globalThis.IntersectionObserver = original;
    vi.restoreAllMocks();
  });

  const mount = () =>
    render(
      <div>
        <ImpressionTracker couponId="c1" merchantId="m1" pageType="homepage" position={2} />
      </div>,
    );

  it("does not report a card that is rendered but never scrolled into view", () => {
    mount();
    expect(spy).not.toHaveBeenCalled();
    ManualObserver.instances[0].show(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it("reports once when the card becomes visible, then stops watching", () => {
    mount();
    const io = ManualObserver.instances[0];
    io.show(true);
    io.show(true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatchObject({ coupon_id: "c1", page_type: "homepage", position: 2 });
    expect(io.disconnected).toBe(true);
  });

  it("observes the card it sits in, not itself", () => {
    const { container } = mount();
    const io = ManualObserver.instances[0];
    expect(io.observe).toHaveBeenCalledWith(container.firstElementChild);
  });
});
