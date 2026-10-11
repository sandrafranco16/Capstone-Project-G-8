import { describe, expect, it } from "vitest";
import { verifyRecoveryRoutes } from "./check-recovery-routes.mjs";

const destinations = [
  "/",
  "/services",
  "/assessment",
  "/resources",
  "/about",
  "/contact",
];
const markup = `<!doctype html><html><head><meta name="robots" content="noindex, follow"></head><body>
<section aria-labelledby="not-found-heading"><h1 id="not-found-heading">Missing page</h1>
${destinations.map((path) => `<a href="${path}">Go to ${path}</a>`).join("")}
</section></body></html>`;

function responses({
  html = markup,
  missingStatus = 404,
  targetStatus = 200,
} = {}) {
  return async (url) => {
    const missing = url.pathname.includes("__route-check");
    return new Response(missing ? html : "Target page", {
      status: missing ? missingStatus : targetStatus,
    });
  };
}

describe("production recovery checks", () => {
  it("accepts real 404 responses and all six available recovery destinations", async () => {
    const results = await verifyRecoveryRoutes(
      "http://localhost:3000",
      responses(),
    );
    expect(results).toHaveLength(8);
    expect(results.every((result) => result.problems.length === 0)).toBe(true);
    expect(results.slice(0, 2).every((result) => result.status === 404)).toBe(
      true,
    );
  });

  it("rejects soft 404s even when the page contains the expected recovery UI", async () => {
    const results = await verifyRecoveryRoutes(
      "http://localhost:3000",
      responses({ missingStatus: 200 }),
    );
    expect(
      results
        .slice(0, 2)
        .every((result) =>
          result.problems.includes("status 200, expected 404"),
        ),
    ).toBe(true);
  });

  it("rejects the previous Resources-to-blog regression even when /blog is available", async () => {
    const results = await verifyRecoveryRoutes(
      "http://localhost:3000",
      responses({ html: markup.replace('href="/resources"', 'href="/blog"') }),
    );
    expect(results[0].problems).toContain(
      "404 recovery link to /resources is missing",
    );
  });

  it("rejects the framework's generic page without the labelled recovery region or noindex metadata", async () => {
    const results = await verifyRecoveryRoutes(
      "http://localhost:3000",
      responses({ html: "<h1>404</h1>" }),
    );
    expect(results[0].problems).toContain(
      "branded, labelled 404 heading is missing",
    );
    expect(results[0].problems).toContain(
      "404 response is missing noindex metadata",
    );
  });

  it("rejects redirects from recovery destinations instead of silently following them", async () => {
    const results = await verifyRecoveryRoutes(
      "http://localhost:3000",
      responses({ targetStatus: 302 }),
    );
    expect(
      results
        .slice(2)
        .every((result) =>
          result.problems.includes("status 302, expected 200"),
        ),
    ).toBe(true);
  });

  it("accepts a dynamic service 404 that defers its UI, while still checking status and noindex", async () => {
    const request = async (url) =>
      url.pathname.startsWith("/services/__route-check")
        ? new Response(
            '<html><head><meta name="robots" content="noindex"></head><body></body></html>',
            { status: 404 },
          )
        : responses()(url);
    const results = await verifyRecoveryRoutes(
      "http://localhost:3000",
      request,
    );
    expect(results.every((result) => result.problems.length === 0)).toBe(true);
  });
});
