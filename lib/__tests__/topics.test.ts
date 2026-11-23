import { describe, expect, it } from "vitest";
import {
  buildTopicSpotlights,
  classifyCategory,
  classifyText,
  freshnessDays,
  isTopicId,
  scoreContent,
  siblingTopicIds,
  TOPICS,
  type DiscoverableContent,
} from "@/lib/topics";

const NOW = new Date("2026-11-24T00:00:00.000Z");

function item(overrides: Partial<DiscoverableContent> = {}): DiscoverableContent {
  return {
    id: "test-1",
    topicId: "tech",
    contentType: "guide",
    title: "A guide",
    summary: "A summary",
    href: "/guides/a-guide",
    updatedAt: "2026-11-01T00:00:00.000Z",
    authorName: "Durza Research Desk",
    priority: 5,
    hasMethod: true,
    hasFaq: true,
    ...overrides,
  };
}

describe("classifyCategory", () => {
  it("maps every known static category to a topic", () => {
    const known = [
      "Electronics & Laptops",
      "Smartphones",
      "Laptops & Tech",
      "EdTech & Careers",
      "Work & Tech",
      "Health & Home",
      "Home & Appliances",
      "Gifting & Lifestyle",
      "Sale & Card Math",
      "Memberships & Cards",
      "Health & Supplements",
      "Fitness & Nutrition",
      "Skincare & Haircare",
      "Beauty & Grooming",
      "Fashion & Activewear",
      "Fashion & Accessories",
      "Electronics",
      "Fashion",
      "Home",
      "Grooming",
      "Fitness",
    ];
    for (const category of known) {
      expect(classifyCategory(category), category).not.toBeNull();
    }
  });

  it("uses keyword fallback for unlisted store-guide categories", () => {
    expect(classifyCategory("Protein & Recovery")).toBe("health");
    expect(classifyCategory("Air conditioners")).toBe("home");
  });

  it("returns null for unknown or empty input", () => {
    expect(classifyCategory(null)).toBeNull();
    expect(classifyCategory("   ")).toBeNull();
    expect(classifyCategory("Astrology consultations")).toBeNull();
  });
});

describe("classifyText", () => {
  it("classifies DB editorial rows that have no category column", () => {
    expect(classifyText("Best noise cancelling headphones under 5000")).toBe("tech");
    expect(classifyText("How to stack HDFC bank card offers")).toBe("money");
  });
});

describe("freshnessDays", () => {
  it("returns whole days and never a negative value", () => {
    expect(freshnessDays("2026-11-21T00:00:00.000Z", NOW)).toBe(3);
    expect(freshnessDays("2026-12-01T00:00:00.000Z", NOW)).toBe(0);
  });

  it("returns null for missing or invalid dates", () => {
    expect(freshnessDays(null, NOW)).toBeNull();
    expect(freshnessDays("not-a-date", NOW)).toBeNull();
  });
});

describe("scoreContent", () => {
  it("ranks comparisons above collections at equal freshness", () => {
    const comparison = scoreContent(item({ contentType: "comparison" }), NOW);
    const collection = scoreContent(item({ contentType: "collection" }), NOW);
    expect(comparison).toBeGreaterThan(collection);
  });

  it("rewards recent checks and penalises stale ones", () => {
    const recent = scoreContent(item({ updatedAt: "2026-11-20T00:00:00.000Z" }), NOW);
    const older = scoreContent(item({ updatedAt: "2026-06-01T00:00:00.000Z" }), NOW);
    const stale = scoreContent(item({ updatedAt: "2024-01-01T00:00:00.000Z" }), NOW);
    expect(recent).toBeGreaterThan(older);
    expect(older).toBeGreaterThan(stale);
  });

  it("rewards a published method and FAQ", () => {
    const complete = scoreContent(item({ hasMethod: true, hasFaq: true }), NOW);
    const bare = scoreContent(item({ hasMethod: false, hasFaq: false }), NOW);
    expect(complete).toBeGreaterThan(bare);
  });
});

describe("buildTopicSpotlights", () => {
  it("omits topics with no content", () => {
    const spotlights = buildTopicSpotlights([item({ topicId: "tech" })], { now: NOW });
    expect(spotlights).toHaveLength(1);
    expect(spotlights[0].topic.id).toBe("tech");
  });

  it("caps topics and items per topic", () => {
    const items = TOPICS.flatMap((topic) => [
      item({ id: `${topic.id}-1`, topicId: topic.id }),
      item({ id: `${topic.id}-2`, topicId: topic.id }),
      item({ id: `${topic.id}-3`, topicId: topic.id }),
      item({ id: `${topic.id}-4`, topicId: topic.id }),
    ]);
    const spotlights = buildTopicSpotlights(items, { limit: 2, perTopic: 3, now: NOW });
    expect(spotlights).toHaveLength(2);
    expect(spotlights.every((spotlight) => spotlight.items.length === 3)).toBe(true);
    expect(spotlights.every((spotlight) => spotlight.total === 4)).toBe(true);
  });
});

describe("topic registry", () => {
  it("validates topic ids and returns siblings", () => {
    expect(isTopicId("tech")).toBe(true);
    expect(isTopicId("unknown")).toBe(false);
    const siblings = siblingTopicIds("tech");
    expect(siblings).toHaveLength(TOPICS.length - 1);
    expect(siblings).not.toContain("tech");
  });
});
