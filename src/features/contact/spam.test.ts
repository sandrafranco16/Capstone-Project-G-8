import { describe, expect, it, vi } from "vitest";
import { isHoneypotTriggered, verifyTurnstileToken } from "./validation";

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

describe("verifyTurnstileToken", () => {
  it("returns false when TURNSTILE_SECRET_KEY is not set", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await verifyTurnstileToken("any-token")).toBe(false);
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
