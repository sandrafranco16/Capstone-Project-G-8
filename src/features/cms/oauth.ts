import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

type CmsOAuthEnvironment = Record<string, string | undefined>;

export type CmsOAuthConfig = {
  clientId: string;
  clientSecret: string;
  scope: "public_repo" | "repo";
  baseUrl: string;
  redirectUri: string;
};

type GitHubTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

export class CmsOAuthError extends Error {}

export function getCmsOAuthConfig(
  baseUrl: string,
  environment: CmsOAuthEnvironment = process.env,
): CmsOAuthConfig {
  const clientId = environment.CMS_GITHUB_CLIENT_ID?.trim();
  const clientSecret = environment.CMS_GITHUB_CLIENT_SECRET?.trim();
  const scope = environment.CMS_GITHUB_SCOPE?.trim() || "public_repo";

  if (!clientId || !clientSecret) {
    throw new CmsOAuthError("GitHub OAuth credentials are not configured.");
  }

  if (scope !== "public_repo" && scope !== "repo") {
    throw new CmsOAuthError("CMS_GITHUB_SCOPE must be public_repo or repo.");
  }

  return {
    clientId,
    clientSecret,
    scope,
    baseUrl,
    redirectUri: `${baseUrl}/api/cms/callback`,
  };
}

export function createOAuthState() {
  return randomBytes(32).toString("base64url");
}

export function createPkceVerifier() {
  return randomBytes(48).toString("base64url");
}

export function createPkceChallenge(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function createGitHubAuthorizationUrl(
  config: CmsOAuthConfig,
  state: string,
  verifier: string,
) {
  const url = new URL(GITHUB_AUTHORIZE_URL);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("scope", config.scope);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", createPkceChallenge(verifier));
  url.searchParams.set("code_challenge_method", "S256");
  return url;
}

export function oauthStatesMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export async function exchangeGitHubCode(
  config: CmsOAuthConfig,
  code: string,
  verifier: string,
  fetchImplementation: typeof fetch = fetch,
) {
  const tokenResponse = await fetchImplementation(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri,
      code_verifier: verifier,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    throw new CmsOAuthError("GitHub rejected the OAuth token request.");
  }

  const result = (await tokenResponse.json()) as GitHubTokenResponse;
  if (!result.access_token) {
    throw new CmsOAuthError(
      result.error_description || result.error || "GitHub OAuth failed.",
    );
  }

  const userResponse = await fetchImplementation(GITHUB_USER_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${result.access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!userResponse.ok) {
    throw new CmsOAuthError("The GitHub account could not be verified.");
  }

  return result.access_token;
}

function serialiseForScript(value: string) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

export function renderOAuthCallback(
  baseUrl: string,
  nonce: string,
  result: { token: string } | { error: string },
) {
  const message =
    "token" in result
      ? `authorization:github:success:${JSON.stringify({ token: result.token })}`
      : `authorization:github:error:${JSON.stringify({ message: result.error })}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>BITDOT CMS authentication</title>
  </head>
  <body>
    <p>Completing GitHub authentication…</p>
    <script nonce="${nonce}">
      const cmsOrigin = ${serialiseForScript(baseUrl)};
      const resultMessage = ${serialiseForScript(message)};

      window.addEventListener("message", (event) => {
        if (event.origin === cmsOrigin && event.data === "authorizing:github") {
          window.opener?.postMessage(resultMessage, cmsOrigin);
        }
      });

      window.opener?.postMessage("authorizing:github", cmsOrigin);
    </script>
  </body>
</html>`;
}
