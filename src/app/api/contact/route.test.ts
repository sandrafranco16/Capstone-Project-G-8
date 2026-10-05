import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  ContactDeliveryNotConfiguredError,
  deliverContactLead,
} from "@/features/contact/server/deliver-contact-lead";
import { POST } from "./route";

vi.mock("@/features/contact/server/deliver-contact-lead", () => ({
  ContactDeliveryNotConfiguredError: class extends Error {},
  deliverContactLead: vi.fn(),
}));

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I would like to discuss AI governance training.",
  consent: true,
};

function contactRequest(body = JSON.stringify(validPayload)) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

describe("contact API error responses", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.mocked(deliverContactLead).mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a readable service-unavailable error without sending when the production secret is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const response = await POST(contactRequest());

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      errors: [
        "The contact service is temporarily unavailable. Please try again later.",
      ],
    });
    expect(deliverContactLead).not.toHaveBeenCalled();
  });

  it("returns a readable error when email delivery is not configured", async () => {
    vi.mocked(deliverContactLead).mockRejectedValue(
      new ContactDeliveryNotConfiguredError("Private configuration details"),
    );

    const response = await POST(contactRequest());

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      errors: [
        "The contact service is temporarily unavailable. Please try again later.",
      ],
    });
  });

  it("returns a readable error without exposing provider details when delivery fails", async () => {
    vi.mocked(deliverContactLead).mockRejectedValue(
      new Error("Private provider details"),
    );

    const response = await POST(contactRequest());

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      errors: ["Unable to send your enquiry. Please try again later."],
    });
  });

  it("uses the same error format for an invalid JSON body", async () => {
    const response = await POST(contactRequest("not JSON"));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ errors: ["Invalid JSON body."] });
    expect(deliverContactLead).not.toHaveBeenCalled();
  });
});
