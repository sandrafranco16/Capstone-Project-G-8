import { NextRequest, NextResponse } from "next/server";

import { getCmsConfig } from "@/features/cms/config";
import {
  createGitHubAuthorizationUrl,
  createOAuthState,
  createPkceVerifier,
  getCmsOAuthConfig,
} from "@/features/cms/oauth";

export const dynamic = "force-dynamic";

const STATE_COOKIE = "bitdot_cms_oauth_state";
const VERIFIER_COOKIE = "bitdot_cms_oauth_verifier";

export function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("provider") !== "github") {
    return new Response("Unsupported CMS authentication provider.", {
      status: 400,
    });
  }

  try {
    const cmsConfig = getCmsConfig(process.env, request.nextUrl.origin);
    const oauthConfig = getCmsOAuthConfig(cmsConfig.baseUrl);
    const state = createOAuthState();
    const verifier = createPkceVerifier();
    const authorizationUrl = createGitHubAuthorizationUrl(
      oauthConfig,
      state,
      verifier,
    );
    const response = NextResponse.redirect(authorizationUrl, 302);
    const cookieOptions = {
      httpOnly: true,
      secure: cmsConfig.baseUrl.startsWith("https://"),
      sameSite: "lax" as const,
      maxAge: 600,
      path: "/api/cms/callback",
    };

    response.cookies.set(STATE_COOKIE, state, cookieOptions);
    response.cookies.set(VERIFIER_COOKIE, verifier, cookieOptions);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return new Response("CMS authentication is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
