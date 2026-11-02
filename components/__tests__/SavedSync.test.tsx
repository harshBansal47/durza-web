import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const session = vi.hoisted(() => ({
  value: { status: "authenticated", user: { name: "Asha" } } as
    | { status: "authenticated"; user: { name: string } }
    | { status: "anonymous"; user: null }
    | { status: "loading"; user: null },
}));
const saveCoupon = vi.hoisted(() => vi.fn());

vi.mock("@/components/session/SessionProvider", () => ({
  useSession: () => ({ session: session.value }),
}));
vi.mock("@/app/account/actions", () => ({
  setSavedCouponAction: saveCoupon,
}));
vi.mock("@/components/ui/Toast", () => ({ useTypedToast: () => ({ success: vi.fn(), error: vi.fn() }) }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

import { CardSaveButton } from "@/components/CardSaveButton";
import { setSavedCoupon } from "@/lib/personalization";

/**
 * A locally saved item is pushed to the account when a signed-in visitor sees it. That used
 * to run on every mount: a page of saved cards fired one server action per card, per
 * navigation. It now runs once per browser session per item.
 */
describe("saved-item sync is once per browser session", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    saveCoupon.mockReset().mockResolvedValue({ ok: true });
    session.value = { status: "authenticated", user: { name: "Asha" } };
  });
  afterEach(cleanup);

  it("syncs a saved coupon the first time it is seen", () => {
    setSavedCoupon("c1", true);
    render(<CardSaveButton couponId="c1" />);
    expect(saveCoupon).toHaveBeenCalledTimes(1);
    expect(saveCoupon).toHaveBeenCalledWith("c1", true);
  });

  it("does not sync again when the card remounts (navigation, list re-render)", () => {
    setSavedCoupon("c1", true);
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(<CardSaveButton couponId="c1" />);
      unmount();
    }
    expect(saveCoupon).toHaveBeenCalledTimes(1);
  });

  it("syncs each different saved coupon once", () => {
    setSavedCoupon("c1", true);
    setSavedCoupon("c2", true);
    render(
      <>
        <CardSaveButton couponId="c1" />
        <CardSaveButton couponId="c2" />
      </>,
    );
    expect(saveCoupon).toHaveBeenCalledTimes(2);
  });

  it("never syncs a coupon that is not saved locally", () => {
    render(<CardSaveButton couponId="c9" />);
    expect(saveCoupon).not.toHaveBeenCalled();
  });

  it("never syncs for an anonymous or still-loading visitor", () => {
    setSavedCoupon("c1", true);
    session.value = { status: "anonymous", user: null };
    render(<CardSaveButton couponId="c1" />);
    cleanup();
    session.value = { status: "loading", user: null };
    render(<CardSaveButton couponId="c1" />);
    expect(saveCoupon).not.toHaveBeenCalled();
  });

  it("syncs again for a different account in the same tab", () => {
    setSavedCoupon("c1", true);
    render(<CardSaveButton couponId="c1" />);
    cleanup();
    session.value = { status: "authenticated", user: { name: "Ben" } };
    render(<CardSaveButton couponId="c1" />);
    expect(saveCoupon).toHaveBeenCalledTimes(2);
  });

  it("retries on the next mount if the sync failed, instead of giving up for the session", async () => {
    setSavedCoupon("c1", true);
    saveCoupon.mockResolvedValueOnce({ error: "nope" });
    const first = render(<CardSaveButton couponId="c1" />);
    await vi.waitFor(() => expect(saveCoupon).toHaveBeenCalledTimes(1));
    await Promise.resolve();
    first.unmount();
    render(<CardSaveButton couponId="c1" />);
    expect(saveCoupon).toHaveBeenCalledTimes(2);
  });

  it("retries after a thrown error too", async () => {
    setSavedCoupon("c1", true);
    saveCoupon.mockRejectedValueOnce(new Error("network"));
    const first = render(<CardSaveButton couponId="c1" />);
    await vi.waitFor(() => expect(saveCoupon).toHaveBeenCalledTimes(1));
    await Promise.resolve();
    first.unmount();
    render(<CardSaveButton couponId="c1" />);
    expect(saveCoupon).toHaveBeenCalledTimes(2);
  });
});
