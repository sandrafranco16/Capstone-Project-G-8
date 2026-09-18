import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { assessmentLevels } from "./config";
import { assessmentPathways, isPathwayId, pathwayIds } from "./pathways";
import { getRecommendations } from "./recommendations";
import type { AssessmentLevel } from "./types";

describe("assessment content integrity", () => {
  it("has four distinct sets of five questions with explicit unique options", () => {
    const ids = new Set<string>();
    for (const path of Object.values(assessmentPathways)) {
      expect(path.questions).toHaveLength(5);
      for (const question of path.questions) {
        expect(ids.has(question.id)).toBe(false);
        ids.add(question.id);
        expect(question.options.map((option) => option.score)).toEqual([
          0, 1, 2, 3,
        ]);
        expect(
          new Set(question.options.map((option) => option.value)).size,
        ).toBe(4);
        expect(
          question.options.every((option) => option.label.trim().length > 0),
        ).toBe(true);
      }
    }
    expect(ids.size).toBe(20);
  });

  it("maps all 16 outcomes to existing service anchors", () => {
    const html = readFileSync("demo/services.html", "utf8");
    for (const path of pathwayIds) {
      for (const level of Object.keys(assessmentLevels) as AssessmentLevel[]) {
        const recommendation = getRecommendations(path, level);
        expect(recommendation.message.length).toBeGreaterThan(0);
        expect(recommendation.nextStep.length).toBeGreaterThan(0);
        expect(recommendation.services.length).toBeGreaterThan(0);
        for (const service of recommendation.services) {
          expect(service.href).toMatch(/^\/services#[a-z]+$/);
          expect(html).toContain(`id="${service.href.split("#")[1]}"`);
        }
      }
    }
  });

  it("accepts only one known pathway value from the query string", () => {
    for (const path of pathwayIds) expect(isPathwayId(path)).toBe(true);
    for (const value of [
      undefined,
      null,
      "",
      "constructor",
      "unknown",
      ["career"],
      ["risk", "learn"],
    ]) {
      expect(isPathwayId(value)).toBe(false);
    }
  });
});
