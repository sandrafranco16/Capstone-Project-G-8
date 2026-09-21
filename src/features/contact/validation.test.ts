import { describe, expect, it } from "vitest";
import { validateContactPayload } from "./validation";

describe("validateContactPayload", () => {
  const validPayload = {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "I would like to learn more about AI governance services.",
    consent: true,
  };

  it("accepts a valid payload", () => {
    const result = validateContactPayload(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jane Doe");
      expect(result.data.email).toBe("jane@example.com");
    }
  });

  it("trims whitespace from fields", () => {
    const result = validateContactPayload({
      ...validPayload,
      name: "  Jane Doe  ",
      email: "  jane@example.com  ",
      message: "  I would like to learn more about AI governance services.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jane Doe");
      expect(result.data.email).toBe("jane@example.com");
    }
  });

  it("rejects missing name", () => {
    const result = validateContactPayload({ ...validPayload, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Name is invalid.");
  });

  it("rejects name exceeding 100 characters", () => {
    const result = validateContactPayload({
      ...validPayload,
      name: "A".repeat(101),
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Name is invalid.");
  });

  it("rejects invalid email format", () => {
    const result = validateContactPayload({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Email is invalid.");
  });

  it("rejects email exceeding 254 characters", () => {
    const longEmail = "a".repeat(246) + "@test.com";
    const result = validateContactPayload({
      ...validPayload,
      email: longEmail,
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Email is invalid.");
  });

  it("rejects message shorter than 10 characters", () => {
    const result = validateContactPayload({
      ...validPayload,
      message: "Hi",
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Message is invalid.");
  });

  it("rejects message exceeding 5000 characters", () => {
    const result = validateContactPayload({
      ...validPayload,
      message: "A".repeat(5001),
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Message is invalid.");
  });

  it("rejects when consent is false", () => {
    const result = validateContactPayload({
      ...validPayload,
      consent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.errors).toContain("Consent is required.");
  });

  it("rejects when consent is missing", () => {
    const { consent: _, ...noConsent } = validPayload;
    void _;
    const result = validateContactPayload(noConsent);
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.errors).toContain("Consent is required.");
  });

  it("rejects non-object input", () => {
    expect(validateContactPayload(null).success).toBe(false);
    expect(validateContactPayload(undefined).success).toBe(false);
    expect(validateContactPayload("string").success).toBe(false);
  });

  it("collects multiple errors at once", () => {
    const result = validateContactPayload({
      name: "",
      email: "bad",
      message: "",
      consent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThanOrEqual(4);
    }
  });
});
