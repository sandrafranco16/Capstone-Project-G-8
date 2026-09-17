import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("preserves class order and omits absent values", () => {
    expect(cn("base", undefined, false, null, "custom")).toBe("base custom");
  });
  it("supports conditional classes and nested arrays", () => {
    expect(cn(["base", ["primary"]], { active: true, hidden: false })).toBe(
      "base primary active",
    );
  });
});
