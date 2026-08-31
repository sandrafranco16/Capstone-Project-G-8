import { describe, expect, it, vi } from "vitest";

import {
  createGitHubAuthorizationUrl,
  exchangeGitHubCode,
  getCmsOAuthConfig,
  oauthStatesMatch,
  renderOAuthCallback,
} from "./oauth";

const config = getCmsOAuthConfig("https://cms.example.com", {
  CMS_GITHUB_CLIENT_ID: "client-id",
  CMS_GITHUB_CLIENT_SECRET: "client-secret",
  CMS_GITHUB_SCOPE: "public_repo",
});

describe("GitHub OAuth", () => {
  it("creates an authorization URL with state and PKCE", () => {
    const url = createGitHubAuthorizationUrl(config, "expected-state", "verifier");

    expect(url.origin + url.pathname).toBe("https://github.com/login/oauth/authorize");
    expect(url.searchParams.get("state")).toBe("expected-state");
    expect(url.searchParams.get("scope")).toBe("public_repo");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(url.searchParams.get("code_challenge")).toBeTruthy();
  });

  it("compares callback state values", () => {
    expect(oauthStatesMatch("same-state", "same-state")).toBe(true);
    expect(oauthStatesMatch("changed-state", "same-state")).toBe(false);
  });

  it("exchanges the code and verifies the signed-in account", async () => {
    const fetchImplementation = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "github-token" }), { status: 200 }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ login: "cms-client" }), { status: 200 }));

    await expect(
      exchangeGitHubCode(config, "temporary-code", "verifier", fetchImplementation),
    ).resolves.toBe("github-token");
    expect(fetchImplementation).toHaveBeenCalledTimes(2);
  });

  it("restricts callback messages to the CMS origin", () => {
    const html = renderOAuthCallback("https://cms.example.com", "nonce", {
      token: "github-token",
    });

    expect(html).toContain('event.origin === cmsOrigin');
    expect(html).toContain('postMessage(resultMessage, cmsOrigin)');
    expect(html).not.toContain('postMessage(resultMessage, "*")');
  });
});
