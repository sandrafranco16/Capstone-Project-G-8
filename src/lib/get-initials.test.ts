import { describe, expect, it } from "vitest";
import { getInitials } from "./get-initials";

describe("getInitials", () => {
  it.each([
    ["  Hemna   Goyal  ", "HG"],
    ["Vaibhav\tAgrawal\nExample", "VA"],
    ["Oliver", "O"],
    ["", ""],
    ["   ", ""],
    ["𠮷田 太郎", "𠮷太"],
  ])("returns initials for %j", (name, expected) => {
    expect(getInitials(name)).toBe(expected);
  });
});
