import { getCmsConfig, renderCmsConfig } from "@/features/cms/config";

export const dynamic = "force-dynamic";

// nosniff and the rest of the baseline security headers come from
// next.config.ts for both the 200 and 503 responses (src/lib/security-headers.ts).

export function GET(request: Request) {
  try {
    const config = getCmsConfig(process.env, new URL(request.url).origin);

    return new Response(renderCmsConfig(config), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/yaml; charset=utf-8",
      },
    });
  } catch {
    return new Response("CMS configuration is unavailable.\n", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
