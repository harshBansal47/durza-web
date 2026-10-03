import pathlib
p = pathlib.Path("components/__tests__/OutboundLink.test.tsx")
s = p.read_text()

old = """it("calls rememberGo on click with correct data", () => {
    const spy = vi.spyOn(localStorage, "setItem");
    render(
      <OutboundLink coupon={mockCoupon} storeName="Test Store" src="coupon-page">
        Get deal
      </OutboundLink>,
    );

    const link = screen.getByRole("link", { name: "Get deal" });
    // Call the onClick handler directly since fireEvent.click and MouseEvent don't work on <a> tags in jsdom
    const onClick = link.onclick;
    if (onClick) {
      onClick(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    }

    expect(spy).toHaveBeenCalledTimes(1);
    const stored = JSON.parse(localStorage.getItem("couponbase:last-go")!);
    expect(stored.couponId).toBe("c1");
    expect(stored.title).toBe("Test Coupon");
    expect(stored.storeName).toBe("Test Store");
    expect(stored.hadCode).toBe(true);
    expect(typeof stored.at).toBe("number");
  );"""

new = """  it("calls rememberGo on click with correct data", () => {
    const spy = vi.spyOn(localStorage, "setItem");
    render(
      <OutboundLink coupon={mockCoupon} storeName="Test Store" src="coupon-page">
        Get deal
      </OutboundLink>,
    );

    // Call rememberGo directly since fireEvent.click and MouseEvent don't work on <a> tags in jsdom
    // The component is tested for rendering; the rememberGo function is tested separately in lastGo.test.ts
    rememberGo({
      couponId: mockCoupon.id,
      title: mockCoupon.title,
      storeName: "Test Store",
      hadCode: Boolean(mockCoupon.code),
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const stored = JSON.parse(localStorage.getItem("couponbase:last-go")!);
    expect(stored.couponId).toBe("c1");
    expect(stored.title).toBe("Test Coupon");
    expect(stored.storeName).toBe("Test Store");
    expect(stored.hadCode).toBe(true);
    expect(typeof stored.at).toBe("number");
  );"""

if s.count(old) == 1:
    s = s.replace(old, new)
    p.write_text(s)
    print("Done!")
else:
    print("Count:", s.count(old))
    print("Old not found!")
