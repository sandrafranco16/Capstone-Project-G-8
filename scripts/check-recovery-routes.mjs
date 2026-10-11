import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const missingRoutes = [
  "/__route-check__/missing",
  "/services/__route-check-missing__",
];
// Dynamic notFound() responses may defer fallback UI to browser hydration.
const renderedRecoveryRoute = missingRoutes[0];
const recoveryRoutes = [
  "/",
  "/services",
  "/assessment",
  "/resources",
  "/about",
  "/contact",
];

/**
 * @param {string} base
 * @param {(url: URL, options: RequestInit) => Promise<Response>} [request]
 */
export async function verifyRecoveryRoutes(base, request = fetch) {
  /** @type {Array<{path: string, status: number | null, problems: string[]}>} */
  const results = [];
  for (const path of [...missingRoutes, ...recoveryRoutes]) {
    const result = {
      path,
      status: /** @type {number | null} */ (null),
      problems: /** @type {string[]} */ ([]),
    };
    results.push(result);
    try {
      const response = await request(new URL(path, base), {
        redirect: "manual",
        signal: AbortSignal.timeout(10000),
      });
      result.status = response.status;
      const expected = missingRoutes.includes(path) ? 404 : 200;
      if (response.status !== expected) {
        result.problems.push(`status ${response.status}, expected ${expected}`);
      }
      if (expected !== 404) continue;

      const page = new JSDOM(await response.text());
      try {
        const document = page.window.document;
        const region = document.querySelector(
          'section[aria-labelledby="not-found-heading"]',
        );
        const heading = region?.querySelector("h1#not-found-heading");
        if (path === renderedRecoveryRoute && !heading?.textContent?.trim()) {
          result.problems.push("branded, labelled 404 heading is missing");
        }
        const links = [...(region?.querySelectorAll("a[href]") ?? [])];
        for (const destination of path === renderedRecoveryRoute
          ? recoveryRoutes
          : []) {
          if (
            !links.some(
              (link) =>
                link.getAttribute("href") === destination &&
                link.textContent?.trim(),
            )
          ) {
            result.problems.push(
              `404 recovery link to ${destination} is missing`,
            );
          }
        }
        const robots = [...document.querySelectorAll('meta[name="robots"]')];
        if (
          !robots.some((meta) =>
            meta
              .getAttribute("content")
              ?.split(/[,\s]+/)
              .includes("noindex"),
          )
        ) {
          result.problems.push("404 response is missing noindex metadata");
        }
      } finally {
        page.window.close();
      }
    } catch {
      result.problems.push("request or response parsing failed");
    }
  }
  return results;
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  const results = await verifyRecoveryRoutes(
    process.argv[2] ?? "http://localhost:3000",
  );
  for (const result of results) {
    if (result.problems.length) {
      console.error(`FAIL ${result.path}\n  ${result.problems.join("\n  ")}`);
    } else {
      console.log(`ok   ${result.path} (${result.status})`);
    }
  }
  process.exitCode = results.some((result) => result.problems.length) ? 1 : 0;
}
