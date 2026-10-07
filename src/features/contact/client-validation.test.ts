import { describe, expect, it } from "vitest";

import {
  type ContactFormValues,
  validateContactField,
  validateContactForm,
} from "./client-validation";

const validForm: ContactFormValues = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "",
  organisation: "",
  enquiryType: "Board training",
  message: "I would like to learn more about AI governance services.",
  consent: true,
};

describe("validateContactForm", () => {
  it("accepts a valid form with the optional fields left blank", () => {
    expect(validateContactForm(validForm)).toEqual({});
  });

  it("accepts a valid form with every field filled in", () => {
    expect(
      validateContactForm({
        ...validForm,
        phone: "+61 476 779 285",
        organisation: "Example Not-for-profit",
      }),
    ).toEqual({});
  });

  it("returns one message per invalid field", () => {
    expect(
      validateContactForm({
        name: "",
        email: "invalid",
        phone: "12",
        organisation: "A".repeat(121),
        enquiryType: "",
        message: "Short",
        consent: false,
      }),
    ).toEqual({
      name: "Name is required",
      email: "Invalid email address",
      phone: "Invalid phone number",
      organisation: "Organisation must be 120 characters or fewer",
      enquiryType: "Select a topic",
      message: "Message must be at least 10 characters",
      consent: "Please accept to continue",
    });
  });
});

describe("validateContactField", () => {
  it("ignores surrounding whitespace", () => {
    expect(validateContactField("name", { ...validForm, name: "  J  " })).toBe(
      "Name must be at least 2 characters",
    );
    expect(validateContactField("email", { ...validForm, email: "  " })).toBe(
      "Email is required",
    );
    expect(
      validateContactField("message", { ...validForm, message: "   " }),
    ).toBe("Message is required");
  });

  it("enforces the maximum lengths", () => {
    expect(
      validateContactField("name", { ...validForm, name: "A".repeat(101) }),
    ).toBe("Name must be 100 characters or fewer");
    expect(
      validateContactField("message", {
        ...validForm,
        message: "A".repeat(5001),
      }),
    ).toBe("Message must be 5000 characters or fewer");
  });

  it.each(["0412 345 678", "+61 8 9123 4567", "(08) 9123-4567"])(
    "accepts the phone number %s",
    (phone) => {
      expect(validateContactField("phone", { ...validForm, phone })).toBe(
        undefined,
      );
    },
  );

  it.each(["1234567", "call me", "+61 400 000 000 000 0", "0412-abc-678"])(
    "rejects the phone number %s",
    (phone) => {
      expect(
        validateContactField("phone", { ...validForm, phone }),
      ).toBeDefined();
    },
  );

  it("only accepts the listed enquiry types", () => {
    expect(
      validateContactField("enquiryType", {
        ...validForm,
        enquiryType: "Something made up",
      }),
    ).toBe("Select a topic");
  });
});
