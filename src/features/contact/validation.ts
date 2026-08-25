export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};

export type ContactValidationResult =
  | { success: true; data: ContactPayload }
  | { success: false; errors: string[] };

export function validateContactPayload(value: unknown): ContactValidationResult {
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
