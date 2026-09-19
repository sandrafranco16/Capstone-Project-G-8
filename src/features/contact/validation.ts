export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};

export type ContactValidationResult =
  | { success: true; data: ContactPayload }
  | { success: false; errors: string[] };

export function validateContactPayload(
  value: unknown,
): ContactValidationResult {
  if (!value || typeof value !== "object") {
    return { success: false, errors: ["Invalid request body."] };
  }

  const input = value as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const consent = input.consent === true;
  const errors: string[] = [];

  if (name.length < 2 || name.length > 100) errors.push("Name is invalid.");
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    errors.push("Email is invalid.");
  }
  if (message.length < 10 || message.length > 5000) {
    errors.push("Message is invalid.");
  }
  if (!consent) errors.push("Consent is required.");

  return errors.length > 0
    ? { success: false, errors }
    : { success: true, data: { name, email, message, consent } };
}

/**
 * Returns true if the honeypot field is filled — indicating a bot submission.
 * The honeypot field should be a hidden input that real users never fill in.
 */
export function isHoneypotTriggered(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  const hp = typeof input.website === "string" ? input.website.trim() : "";
  return hp.length > 0;
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns true if the token is valid, false otherwise.
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    const data = (await response.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
