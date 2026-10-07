import { describe, expect, it } from "vitest";
import { validateContactPayload } from "./validation";

describe("validateContactPayload", () => {
  const validPayload = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "",
    organisation: "",
    enquiryType: "Board training",
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

  it.each(["jane@gmail..com", "jane..doe@example.com", "jane@example"])(
    "rejects the malformed email %s",
    (email) => {
      const result = validateContactPayload({ ...validPayload, email });
      expect(result.success).toBe(false);
      if (!result.success) expect(result.errors).toContain("Email is invalid.");
    },
  );

  it("rejects letters in the phone number", () => {
    const result = validateContactPayload({
      ...validPayload,
      phone: "0412 abc 678",
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Phone is invalid.");
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

  it("accepts and trims the optional phone and organisation", () => {
    const result = validateContactPayload({
      ...validPayload,
      phone: "  +61 476 779 285 ",
      organisation: "  Example Org ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("+61 476 779 285");
      expect(result.data.organisation).toBe("Example Org");
      expect(result.data.enquiryType).toBe("Board training");
    }
  });

  it("treats missing optional fields as blank", () => {
    const { phone: _p, organisation: _o, ...required } = validPayload;
    void _p;
    void _o;
    const result = validateContactPayload(required);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("");
      expect(result.data.organisation).toBe("");
    }
  });

  it("rejects an invalid phone number", () => {
    const result = validateContactPayload({ ...validPayload, phone: "abc" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toContain("Phone is invalid.");
  });

  it("rejects organisation exceeding 120 characters", () => {
    const result = validateContactPayload({
      ...validPayload,
      organisation: "A".repeat(121),
    });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.errors).toContain("Organisation is invalid.");
  });

  it.each([undefined, "", "Free consulting", 3])(
    "rejects the enquiry type %s",
    (enquiryType) => {
      const result = validateContactPayload({ ...validPayload, enquiryType });
      expect(result.success).toBe(false);
      if (!result.success)
        expect(result.errors).toContain("Enquiry type is invalid.");
    },
  );

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
      expect(result.errors.length).toBeGreaterThanOrEqual(5);
    }
  });
});
