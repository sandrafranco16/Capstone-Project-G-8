import { describe, expect, it } from "vitest";

import { getInitials } from "./initials";

describe("getInitials", () => {
  it("takes the first letter of the first two words", () => {
    expect(getInitials("Sarah M.")).toBe("SM");
    expect(getInitials("mary jane watson")).toBe("MJ");
  });

  it("ignores punctuation and extra whitespace", () => {
    expect(getInitials("  (David)   K. ")).toBe("DK");
  });

  it("handles single names and non-Latin letters", () => {
    expect(getInitials("Émile")).toBe("É");
    expect(getInitials("")).toBe("");
  });
});
