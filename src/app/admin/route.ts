const DECAP_CMS_VERSION = "3.15.1";
const DECAP_CMS_INTEGRITY =
  "sha384-in6eHztHveqQ7uMZ1fDaKlDmacQLFuLH2wWrFTiymyuS8zQ5bixwL8U3AeRi8h/L";

export function GET() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>BITDOT Content Manager</title>
    <link href="/api/cms/config" rel="cms-config-url" type="text/yaml" />
  </head>
  <body>
    <noscript>JavaScript is required to use the BITDOT Content Manager.</noscript>
    <script
      src="https://unpkg.com/decap-cms@${DECAP_CMS_VERSION}/dist/decap-cms.js"
      integrity="${DECAP_CMS_INTEGRITY}"
      crossorigin="anonymous"
    ></script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
      "Referrer-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  });
}
