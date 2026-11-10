import { describe, expect, it } from "vitest";
import { getCouponDealDetails } from "@/lib/couponDealDetails";
import { htmlToText } from "@/lib/htmlText";

describe("htmlToText", () => {
  it("converts HTML description lists into readable text", () => {
    expect(
      htmlToText(
        '<ul><li><strong>Comfort:</strong> <span>Soft &amp; supportive</span></li><li>Daily use</li></ul>',
      ),
    ).toBe("• Comfort: Soft & supportive\n• Daily use");
  });

  it("removes embedded active content and decodes numeric entities", () => {
    expect(htmlToText("<p>Size&nbsp;&#x4e2d;</p><script>alert(1)</script>")).toBe("Size 中");
  });
});

describe("getCouponDealDetails", () => {
  it("returns only supplied and valid product deal details", () => {
    expect(
      getCouponDealDetails({
        title: "Trail shoes",
        image_url: "https://cdn.example.com/shoe.jpg",
        deal_price: "₹1,499",
        original_mrp: "₹3,499",
        discount_tag: "57% OFF",
        rating: "4.3",
        reviews_count: "1,420",
        product_url: "https://shop.example/products/trail-shoes",
      }),
    ).toEqual({
      title: "Trail shoes",
      category: null,
      badge: null,
      discount: "57% OFF",
      dealPrice: "₹1,499",
      originalPrice: "₹3,499",
      savings: null,
      rating: "4.3",
      reviewCount: "1,420",
      checkedDate: null,
      imageUrl: "https://cdn.example.com/shoe.jpg",
    });
  });

  it("does not display invalid ratings or unsafe image URLs", () => {
    expect(
      getCouponDealDetails({
        image_url: "javascript:alert(1)",
        rating: "5.5",
        reviews_count: "-2",
      }),
    ).toBeNull();
  });
});
