import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

import { securityHeaders, securityHeadersSource } from "./security-headers";

const header = (key: string) =>
  securityHeaders.find((entry) => entry.key === key)?.value;

describe("security headers", () => {
  it("are registered in next.config", async () => {
    expect(await nextConfig.headers?.()).toEqual([
      { source: securityHeadersSource, headers: securityHeaders },
    ]);
  });

  it("block framing by other sites and plugin content", () => {
    const csp = header("Content-Security-Policy");
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).not.toContain("unsafe");
  });

  it("enforce HTTPS for at least a year", () => {
    const maxAge = Number(
      header("Strict-Transport-Security")?.match(/max-age=(\d+)/)?.[1],
    );
    expect(maxAge).toBeGreaterThanOrEqual(31_536_000);
  });

  it("leave camera and microphone available to the booking embed", () => {
    const policy = header("Permissions-Policy");
    expect(policy).not.toContain("camera");
    expect(policy).not.toContain("microphone");
  });

  describe("route matching", () => {
    const matches = (path: string) =>
      new RegExp(`^${securityHeadersSource}$`).test(path);

    it.each([
      "/",
      "/about",
      "/services/ai-governance",
      "/api/contact",
      "/api/cms/auth",
      "/api/cms/config",
    ])("applies to %s", (path) => expect(matches(path)).toBe(true));

    it.each(["/admin", "/api/cms/callback"])(
      "skips %s, which sets its own stricter policy",
      (path) => expect(matches(path)).toBe(false),
    );
  });
});
