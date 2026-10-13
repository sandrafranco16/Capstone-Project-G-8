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

  it("only allow data, frames and assets from approved origins", () => {
    const csp = header("Content-Security-Policy") ?? "";
    expect(csp).toMatch(
      /connect-src 'self' https:\/\/challenges\.cloudflare\.com/,
    );
    expect(csp).toContain("frame-src https://challenges.cloudflare.com");
    expect(csp).toContain("https://cal.com");
    expect(csp).toContain("https://www.youtube-nocookie.com");
    // No wildcard https: sources, so images and media cannot be used to send
    // data to an unapproved server.
    expect(csp).toContain("img-src 'self' data: blob:;");
    expect(csp).toMatch(/media-src 'self'(;|$)/);
    expect(csp).not.toMatch(/(^|[ ;])https:(;| |$)/);
    expect(csp).toContain("font-src 'self' data:");
    // Scripts are deliberately left to the browser default (see the module
    // comment), so no default-src that would silently block them.
    expect(csp).not.toContain("default-src");
    expect(csp).not.toContain("script-src");
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
