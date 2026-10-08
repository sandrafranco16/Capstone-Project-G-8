import {
  CONTACT_LIMITS,
  type EnquiryType,
  isEnquiryType,
  isValidEmail,
  isValidPhone,
} from "./contact-fields";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  enquiryType: EnquiryType;
  message: string;
  consent: boolean;
};

export type ContactValidationResult =
  | { success: true; data: ContactPayload }
  | { success: false; errors: string[] };

export type TurnstilePolicy = "disabled" | "enabled" | "misconfigured";

export function validateContactPayload(
  value: unknown,
): ContactValidationResult {
  if (!value || typeof value !== "object") {
    return { success: false, errors: ["Invalid request body."] };
  }

  const input = value as Record<string, unknown>;
  const text = (key: string) =>
    typeof input[key] === "string" ? (input[key] as string).trim() : "";
  const name = text("name");
  const email = text("email");
  const phone = text("phone");
  const organisation = text("organisation");
  const enquiryType = text("enquiryType");
  const message = text("message");
  const consent = input.consent === true;
  const errors: string[] = [];
  const limits = CONTACT_LIMITS;

  if (name.length < limits.name.min || name.length > limits.name.max) {
    errors.push("Name is invalid.");
  }
  if (!isValidEmail(email)) errors.push("Email is invalid.");
  if (phone && !isValidPhone(phone)) errors.push("Phone is invalid.");
  if (organisation.length > limits.organisation.max) {
    errors.push("Organisation is invalid.");
  }
  if (!isEnquiryType(enquiryType)) errors.push("Enquiry type is invalid.");
  if (
    message.length < limits.message.min ||
    message.length > limits.message.max
  ) {
    errors.push("Message is invalid.");
  }
  if (!consent) errors.push("Consent is required.");

  if (errors.length > 0 || !isEnquiryType(enquiryType)) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: { name, email, phone, organisation, enquiryType, message, consent },
  };
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
 * Turnstile may be omitted for local development, but deployed production
 * builds must fail closed when the secret is missing.
 */
export function getTurnstilePolicy({
  isProduction,
  secret,
}: {
  isProduction: boolean;
  secret: string | undefined;
}): TurnstilePolicy {
  const hasSecret = Boolean(secret?.trim());

  if (isProduction && !hasSecret) return "misconfigured";
  return hasSecret ? "enabled" : "disabled";
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns true if the token is valid, false otherwise.
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
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
