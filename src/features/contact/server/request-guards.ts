/**
 * Cheap checks that run before the contact payload is parsed or validated.
 * They keep oversized, malformed or high-volume requests away from the
 * email provider and the Turnstile API.
 */

/** Generous for a contact form: the message field alone is capped at 5,000 characters. */
export const MAX_CONTACT_BODY_BYTES = 16 * 1024;

export type GuardFailure = { status: number; error: string };

type BodyResult = { ok: true; body: unknown } | ({ ok: false } & GuardFailure);

/** Reads a JSON body with a hard size limit, without trusting Content-Length alone. */
export async function readJsonBody(
  request: Request,
  maxBytes = MAX_CONTACT_BODY_BYTES,
): Promise<BodyResult> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      ok: false,
      status: 415,
      error: "Please send the form as JSON.",
    };
  }

  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) {
    return { ok: false, status: 413, error: "Your message is too long." };
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON body." };
  }

  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    return { ok: false, status: 413, error: "Your message is too long." };
  }

  try {
    return { ok: true, body: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON body." };
  }
}

/** Best-effort client IP from the headers our hosts set (Netlify first). */
export function getClientIp(request: Request): string | undefined {
  const headers = request.headers;
  const candidates = [
    headers.get("x-nf-client-connection-ip"),
    headers.get("x-forwarded-for")?.split(",")[0],
    headers.get("x-real-ip"),
  ];
  return candidates.map((value) => value?.trim()).find(Boolean) || undefined;
}

type RateLimiterOptions = { limit: number; windowMs: number };

/**
 * Fixed-window, in-memory rate limiter keyed by client IP.
 *
 * Each server instance keeps its own counts, so on serverless hosting this
 * is a speed bump rather than a hard guarantee. Turnstile remains the main
 * spam control; this stops one client from hammering the endpoint.
 */
export function createRateLimiter({ limit, windowMs }: RateLimiterOptions) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()) {
    if (hits.size > 5_000) {
      for (const [entryKey, entry] of hits) {
        if (entry.resetAt <= now) hits.delete(entryKey);
      }
    }

    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    entry.count += 1;
    if (entry.count > limit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
      };
    }
    return { allowed: true, retryAfterSeconds: 0 };
  };
}

/** Five enquiries per IP every ten minutes. */
export const contactRateLimit = createRateLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1000,
});
