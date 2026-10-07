import { describe, expect, it } from "vitest";

import { isValidEmail, isValidPhone, sanitizePhone } from "./contact-fields";

describe("isValidEmail", () => {
  it.each([
    "jane@example.com",
    "jane.doe+ai@sub.example.com.au",
    "o'brien@example.ie",
    "j_d-2026@my-company.co",
  ])("accepts %s", (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each([
    "sandrafranco665@gmail..com",
    "jane..doe@example.com",
    ".jane@example.com",
    "jane.@example.com",
    "jane@.example.com",
    "jane@example.com.",
    "jane@-example.com",
    "jane@example-.com",
    "jane@example",
    "jane@example.c",
    "jane@example.123",
    "jane@@example.com",
    "jane doe@example.com",
    "jane@exa mple.com",
    "@example.com",
    "jane@",
    "jane",
    `${"a".repeat(65)}@example.com`,
  ])("rejects %s", (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe("sanitizePhone", () => {
  it("removes letters and symbols as the visitor types", () => {
    expect(sanitizePhone("04a12 b345 678")).toBe("0412 345 678");
    expect(sanitizePhone("call me")).toBe("");
    expect(sanitizePhone("+61 (8) 9123-4567 ext.")).toBe("+61 (8) 9123-4567 ");
  });

  it("only keeps a leading plus sign", () => {
    expect(sanitizePhone("+61+400+000")).toBe("+61400000");
    expect(sanitizePhone("call +61 476 779 285 now")).toBe("+61 476 779 285 ");
    expect(sanitizePhone("61+400")).toBe("61400");
  });

  it("produces numbers the validator accepts", () => {
    expect(isValidPhone(sanitizePhone("+61 476 779 285abc"))).toBe(true);
  });
});
