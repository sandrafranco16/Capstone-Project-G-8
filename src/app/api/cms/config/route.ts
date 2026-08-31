import { getCmsConfig, renderCmsConfig } from "@/features/cms/config";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  try {
    const config = getCmsConfig(process.env, new URL(request.url).origin);

    return new Response(renderCmsConfig(config), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/yaml; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
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
