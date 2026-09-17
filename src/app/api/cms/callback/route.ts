import { randomBytes } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { getCmsConfig } from "@/features/cms/config";
import {
  exchangeGitHubCode,
  getCmsOAuthConfig,
  oauthStatesMatch,
  renderOAuthCallback,
} from "@/features/cms/oauth";

export const dynamic = "force-dynamic";

const STATE_COOKIE = "bitdot_cms_oauth_state";
const VERIFIER_COOKIE = "bitdot_cms_oauth_verifier";

function callbackResponse(
  baseUrl: string,
  result: { token: string } | { error: string },
) {
  const nonce = randomBytes(18).toString("base64url");
  const response = new NextResponse(
    renderOAuthCallback(baseUrl, nonce, result),
    {
      headers: {
        "Cache-Control": "no-store",
        "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'`,
        "Content-Type": "text/html; charset=utf-8",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );

  response.cookies.set(STATE_COOKIE, "", {
    maxAge: 0,
    path: "/api/cms/callback",
  });
  response.cookies.set(VERIFIER_COOKIE, "", {
    maxAge: 0,
    path: "/api/cms/callback",
  });
  return response;
}

export async function GET(request: NextRequest) {
  let baseUrl = request.nextUrl.origin;

  try {
    const cmsConfig = getCmsConfig(process.env, request.nextUrl.origin);
    baseUrl = cmsConfig.baseUrl;

    const providerError = request.nextUrl.searchParams.get("error");
    if (providerError) {
      return callbackResponse(baseUrl, {
        error: "GitHub access was not approved.",
      });
    }

    const code = request.nextUrl.searchParams.get("code");
    const receivedState = request.nextUrl.searchParams.get("state");
    const expectedState = request.cookies.get(STATE_COOKIE)?.value;
    const verifier = request.cookies.get(VERIFIER_COOKIE)?.value;

    if (!code || !receivedState || !expectedState || !verifier) {
      return callbackResponse(baseUrl, {
        error: "The authentication request has expired.",
      });
    }

    if (!oauthStatesMatch(receivedState, expectedState)) {
      return callbackResponse(baseUrl, {
        error: "The authentication request could not be verified.",
      });
    }

    const oauthConfig = getCmsOAuthConfig(baseUrl);
    const token = await exchangeGitHubCode(oauthConfig, code, verifier);
    return callbackResponse(baseUrl, { token });
  } catch {
    return callbackResponse(baseUrl, {
      error: "GitHub authentication failed. Please try again.",
    });
  }
}
