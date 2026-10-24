import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GuideArt from "@/components/editorial/GuideArt";
import { guideStoreMentions } from "@/components/editorial/GuideCover";

const srcs = (container: HTMLElement) =>
  [...container.querySelectorAll("img")].map((img) => decodeURIComponent(img.getAttribute("src") ?? ""));

describe("guideStoreMentions", () => {
  it("finds the stores a guide names, in the order they appear", () => {
    expect(guideStoreMentions("Myntra vs Flipkart: where fashion is cheaper", "")).toEqual([
      "myntra",
      "flipkart",
    ]);
  });

  it("reads the summary too, and maps Amazon to its Indian store", () => {
    expect(guideStoreMentions("Prime Day tips", "How to stack Amazon India offers")).toEqual([
      "amazon-in",
    ]);
  });

  it("returns nothing for a guide that names no store we have a logo for", () => {
    expect(guideStoreMentions("How credit card EMIs work", "A plain explainer")).toEqual([]);
  });

  it("does not match inside other words and caps the list", () => {
    expect(guideStoreMentions("Ajiotech news", "")).toEqual([]);
    expect(
      guideStoreMentions("Flipkart Myntra Ajio Nykaa Croma", "").length,
    ).toBe(3);
  });
});

describe("GuideArt", () => {
  it("uses the editor's real image when one is set, and no generated cover", () => {
    const { container } = render(
      <GuideArt
        title="Flipkart sale guide"
        summary=""
        heroImageUrl="https://cdn.example.com/photo.jpg"
      />,
    );

    expect(srcs(container)).toEqual(["https://cdn.example.com/photo.jpg"]);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("falls back to a generated cover carrying the logos of the stores it names", () => {
    const { container } = render(
      <GuideArt title="How to save on Flipkart and Myntra" summary="" heroImageUrl={null} />,
    );

    const found = srcs(container).join(" ");
    expect(found).toContain("/stores/flipkart.png");
    expect(found).toContain("/stores/myntra.png");
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("still renders a cover (topic art, no logos) for a guide with no store", () => {
    const { container } = render(
      <GuideArt title="Credit card EMI basics" summary="" heroImageUrl={null} />,
    );

    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });
});
