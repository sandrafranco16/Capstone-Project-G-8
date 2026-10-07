// Checks the HTTP headers a running build actually sends, rather than the
// config object. Run against `pnpm start` (CI does this after the build):
//
//   node scripts/check-security-headers.mjs http://localhost:3000
//
// The CMS auth and config routes answer 503 when the CMS environment
// variables are missing (as in CI) and 200/302 when they are set. Either
// status is accepted, because the headers must be the same on both paths.

const base = process.argv[2] ?? "http://localhost:3000";

const baseline = {
  "content-security-policy": "frame-ancestors 'self'",
  "x-frame-options": "SAMEORIGIN",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=31536000",
  "permissions-policy": "geolocation=()",
};

const cases = [
  { path: "/", status: 200, expect: baseline },
  { path: "/about", status: 200, expect: baseline },
  {
    path: "/api/cms/auth?provider=unknown",
    status: 400,
    expect: baseline,
  },
  {
    path: "/api/cms/auth?provider=github",
    status: [302, 503],
    expect: baseline,
  },
  {
    path: "/api/cms/config",
    status: [200, 503],
    expect: baseline,
  },
  {
    // Keeps its own nonce CSP and stricter referrer policy.
    path: "/api/cms/callback",
    status: 200,
    expect: {
      "content-security-policy": "script-src 'nonce-",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
    },
    absent: ["x-frame-options", "strict-transport-security"],
  },
  {
    // Keeps DENY framing and its same-origin referrer policy.
    path: "/admin",
    status: 200,
    expect: {
      "x-frame-options": "DENY",
      "referrer-policy": "same-origin",
      "x-content-type-options": "nosniff",
    },
    absent: ["content-security-policy"],
  },
];

let failures = 0;

for (const testCase of cases) {
  const response = await fetch(new URL(testCase.path, base), {
    redirect: "manual",
  });
  const problems = [];

  const allowed = [testCase.status].flat();
  if (!allowed.includes(response.status)) {
    problems.push(
      `status ${response.status}, expected ${allowed.join(" or ")}`,
    );
  }

  for (const [name, fragment] of Object.entries(testCase.expect)) {
    const value = response.headers.get(name);
    if (value === null) problems.push(`missing ${name}`);
    else if (!value.includes(fragment))
      problems.push(`${name} is "${value}", expected "${fragment}"`);
    // Two values for one header arrive joined with a comma.
    else if (value.includes(", ") && name !== "permissions-policy")
      problems.push(`${name} is sent twice: "${value}"`);
  }

  for (const name of testCase.absent ?? []) {
    if (response.headers.has(name)) problems.push(`unexpected ${name}`);
  }

  if (problems.length) {
    failures += 1;
    console.error(`FAIL ${testCase.path}\n  ${problems.join("\n  ")}`);
  } else {
    console.log(`ok   ${testCase.path} (${response.status})`);
  }
}

if (failures) {
  console.error(`\n${failures} route(s) sent unexpected security headers.`);
  process.exit(1);
}
