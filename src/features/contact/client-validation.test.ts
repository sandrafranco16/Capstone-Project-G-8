import { describe, expect, it } from "vitest";

import { validateContactForm } from "./client-validation";

describe("validateContactForm", () => {
  const validForm = {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "I would like to learn more about AI governance services.",
    consent: true,
  };

  it("accepts a valid form", () => {
    expect(validateContactForm(validForm)).toEqual([]);
  });

  it("returns errors for invalid fields", () => {
    expect(
      validateContactForm({
        name: "",
        email: "invalid",
        message: "Short",
        consent: false,
      }),
    ).toEqual([
      "Please enter your name.",
      "Please enter a valid email address.",
      "Message must be at least 10 characters.",
      "You must consent to being contacted.",
    ]);
  });
});
