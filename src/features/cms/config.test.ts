import { describe, expect, it } from "vitest";

import { getCmsConfig, renderCmsConfig } from "./config";

describe("getCmsConfig", () => {
  it("uses deployment settings and disables the local proxy in production", () => {
    const config = getCmsConfig(
      {
        CMS_REPOSITORY: "bitdot/site",
        CMS_BRANCH: "cms-preview",
        CMS_OAUTH_BASE_URL: "https://preview.example.com",
        NODE_ENV: "production",
      },
      "https://ignored.example.com",
    );

    expect(config).toEqual({
      repository: "bitdot/site",
      branch: "cms-preview",
      baseUrl: "https://preview.example.com",
      localBackend: false,
    });
  });

  it("rejects unsafe repository, branch and origin values", () => {
    expect(() =>
      getCmsConfig({ CMS_REPOSITORY: "missing-slash", NODE_ENV: "test" }),
    ).toThrow("owner/repository");
    expect(() => getCmsConfig({ CMS_BRANCH: "bad branch", NODE_ENV: "test" })).toThrow(
      "valid Git branch",
    );
    expect(() =>
      getCmsConfig({ CMS_OAUTH_BASE_URL: "http://example.com", NODE_ENV: "test" }),
    ).toThrow("must use HTTPS");
  });
});

describe("renderCmsConfig", () => {
  it("renders the GitHub backend and local development proxy", () => {
    const yaml = renderCmsConfig({
      repository: "bitdot/site",
      branch: "cms-preview",
      baseUrl: "http://localhost:3000",
      localBackend: true,
    });

    expect(yaml).toContain('repo: "bitdot/site"');
    expect(yaml).toContain('branch: "cms-preview"');
    expect(yaml).toContain('base_url: "http://localhost:3000"');
    expect(yaml).toContain("auth_endpoint: /api/cms/auth");
    expect(yaml).toContain("local_backend: true");
  });
});
