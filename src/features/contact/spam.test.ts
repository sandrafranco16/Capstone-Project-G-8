import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getTurnstilePolicy,
  isHoneypotTriggered,
  verifyTurnstileToken,
} from "./validation";

describe("isHoneypotTriggered", () => {
  it("returns false when honeypot field is absent", () => {
    expect(isHoneypotTriggered({ name: "Jane" })).toBe(false);
  });

  it("returns false when honeypot field is empty", () => {
    expect(isHoneypotTriggered({ website: "" })).toBe(false);
  });

  it("returns false when honeypot field is whitespace only", () => {
    expect(isHoneypotTriggered({ website: "   " })).toBe(false);
  });

  it("returns true when honeypot field has a value", () => {
    expect(isHoneypotTriggered({ website: "http://spam.com" })).toBe(true);
  });

  it("returns false for non-object input", () => {
    expect(isHoneypotTriggered(null)).toBe(false);
    expect(isHoneypotTriggered(undefined)).toBe(false);
  });
});

describe("getTurnstilePolicy", () => {
  it("allows an explicit local development bypass", () => {
    expect(getTurnstilePolicy({ isProduction: false, secret: undefined })).toBe(
      "disabled",
    );
  });

  it("enables verification when a secret is configured", () => {
    expect(
      getTurnstilePolicy({ isProduction: true, secret: "test-secret" }),
    ).toBe("enabled");
  });

  it("fails closed when the production secret is missing or blank", () => {
    expect(getTurnstilePolicy({ isProduction: true, secret: undefined })).toBe(
      "misconfigured",
    );
    expect(getTurnstilePolicy({ isProduction: true, secret: "   " })).toBe(
      "misconfigured",
    );
  });
});

describe("verifyTurnstileToken", () => {
  it("returns false when TURNSTILE_SECRET_KEY is not set", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await verifyTurnstileToken("any-token")).toBe(false);
  });

  it("returns false when TURNSTILE_SECRET_KEY is blank", async () => {
    process.env.TURNSTILE_SECRET_KEY = "   ";
    expect(await verifyTurnstileToken("any-token")).toBe(false);
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("returns true when Turnstile API responds with success", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    expect(await verifyTurnstileToken("valid-token")).toBe(true);
    expect(mockFetch).toHaveBeenCalledOnce();

    vi.unstubAllGlobals();
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("returns false when Turnstile API responds with failure", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: false }),
    });
    vi.stubGlobal("fetch", mockFetch);

    expect(await verifyTurnstileToken("bad-token")).toBe(false);

    vi.unstubAllGlobals();
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("returns false when fetch throws", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    expect(await verifyTurnstileToken("any-token")).toBe(false);

    vi.unstubAllGlobals();
    delete process.env.TURNSTILE_SECRET_KEY;
  });
});

describe("verifyTurnstileToken hardening", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("forwards the visitor IP to Cloudflare", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await verifyTurnstileToken("token", { remoteIp: "203.0.113.5" });

    const body = mockFetch.mock.calls[0][1].body as URLSearchParams;
    expect(body.get("remoteip")).toBe("203.0.113.5");
  });

  it("rejects tokens issued on another hostname when hostnames are configured", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({ success: true, hostname: "evil.example" }),
      }),
    );

    expect(
      await verifyTurnstileToken("token", {
        allowedHostnames: ["www.bitdot.com.au"],
      }),
    ).toBe(false);
  });

  it("accepts tokens from an allowed hostname", async () => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({ success: true, hostname: "www.bitdot.com.au" }),
      }),
    );

    expect(
      await verifyTurnstileToken("token", {
        allowedHostnames: ["www.bitdot.com.au"],
      }),
    ).toBe(true);
  });
});
