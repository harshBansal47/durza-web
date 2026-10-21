import { describe, expect, it } from "vitest";
import {
  BRAND_NAME,
  BRAND_SHORT_NAME,
  BRAND_TITLE_SUFFIX,
  SITE_DESCRIPTION,
  SITE_TITLE,
  TITLE_TEMPLATE,
} from "@/lib/site";

describe("brand copy", () => {
  it("keeps the user-visible brand short and the title suffix specific", () => {
    expect(BRAND_NAME).toBe("Durza");
    expect(BRAND_SHORT_NAME).toBe("Durza");
    expect(BRAND_TITLE_SUFFIX).toBe("Durza Coupons");
    expect(SITE_TITLE.startsWith(`${BRAND_TITLE_SUFFIX} `)).toBe(true);
    expect(SITE_DESCRIPTION).toContain(BRAND_NAME);
  });

  it("uses the defined suffix for child-page titles", () => {
    expect(TITLE_TEMPLATE).toBe(`%s — ${BRAND_TITLE_SUFFIX}`);
  });
});
