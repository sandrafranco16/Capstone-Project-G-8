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
  enquiryType: "Board training",
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

describe("contact API request guards", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.mocked(deliverContactLead).mockReset();
    vi.mocked(deliverContactLead).mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects non-JSON requests without sending", async () => {
    const response = await POST(
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "hello",
      }),
    );
    expect(response.status).toBe(415);
    expect(deliverContactLead).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies without sending", async () => {
    const response = await POST(
      contactRequest(
        JSON.stringify({ ...validPayload, message: "x".repeat(20_000) }),
      ),
    );
    expect(response.status).toBe(413);
    expect(deliverContactLead).not.toHaveBeenCalled();
  });

  it("rate limits repeated enquiries from one IP", async () => {
    const fromIp = () =>
      new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "198.51.100.77",
        },
        body: JSON.stringify(validPayload),
      });

    const statuses: number[] = [];
    for (let attempt = 0; attempt < 6; attempt += 1) {
      statuses.push((await POST(fromIp())).status);
    }

    expect(statuses.slice(0, 5)).toEqual([202, 202, 202, 202, 202]);
    expect(statuses[5]).toBe(429);
    expect(deliverContactLead).toHaveBeenCalledTimes(5);
  });
});
