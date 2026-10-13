import { describe, expect, it } from "vitest";

import {
  createRateLimiter,
  getClientIp,
  MAX_CONTACT_BODY_BYTES,
  readJsonBody,
} from "./request-guards";

const jsonRequest = (body: string, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body,
  });

describe("readJsonBody", () => {
  it("parses a normal JSON body", async () => {
    expect(await readJsonBody(jsonRequest('{"a":1}'))).toEqual({
      ok: true,
      body: { a: 1 },
    });
  });

  it("rejects non-JSON content types with 415", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "{}",
    });
    expect(await readJsonBody(request)).toMatchObject({
      ok: false,
      status: 415,
    });
  });

  it("rejects bodies over the size limit with 413, even without Content-Length", async () => {
    const big = JSON.stringify({ message: "x".repeat(MAX_CONTACT_BODY_BYTES) });
    expect(await readJsonBody(jsonRequest(big))).toMatchObject({
      ok: false,
      status: 413,
    });
  });

  it("rejects an oversized declared Content-Length before reading", async () => {
    const request = jsonRequest("{}", {
      "Content-Length": String(MAX_CONTACT_BODY_BYTES + 1),
    });
    expect(await readJsonBody(request)).toMatchObject({ status: 413 });
  });

  it("rejects malformed JSON with 400", async () => {
    expect(await readJsonBody(jsonRequest("{nope"))).toMatchObject({
      ok: false,
      status: 400,
    });
  });
});

describe("getClientIp", () => {
  it("prefers Netlify's client IP header", () => {
    const request = new Request("http://localhost", {
      headers: {
        "x-nf-client-connection-ip": "203.0.113.9",
        "x-forwarded-for": "198.51.100.1, 10.0.0.1",
      },
    });
    expect(getClientIp(request)).toBe("203.0.113.9");
  });

  it("falls back to the first X-Forwarded-For address", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "198.51.100.1, 10.0.0.1" },
    });
    expect(getClientIp(request)).toBe("198.51.100.1");
  });

  it("returns undefined when no IP header is present", () => {
    expect(getClientIp(new Request("http://localhost"))).toBeUndefined();
  });
});

describe("createRateLimiter", () => {
  it("allows up to the limit, then blocks until the window resets", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1_000 });
    expect(check("ip", 0).allowed).toBe(true);
    expect(check("ip", 100).allowed).toBe(true);
    const blocked = check("ip", 200);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
    expect(check("ip", 1_001).allowed).toBe(true);
  });

  it("counts each client separately", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("b", 0).allowed).toBe(true);
    expect(check("a", 1).allowed).toBe(false);
  });
});
