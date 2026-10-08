export const ENQUIRY_TYPES = [
  "Discovery call",
  "Board training",
  "AI strategy",
  "Tool workshop",
  "Career coaching",
  "Something else",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 20 },
  organisation: { max: 120 },
  message: { min: 10, max: 5000 },
} as const;

export function isEnquiryType(value: string): value is EnquiryType {
  return (ENQUIRY_TYPES as readonly string[]).includes(value);
}

const EMAIL_LOCAL_PART =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN_LABEL = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
const TOP_LEVEL_DOMAIN = /^[A-Za-z]{2,63}$/;

export function isValidEmail(email: string): boolean {
  if (email.length > CONTACT_LIMITS.email.max) return false;

  const at = email.lastIndexOf("@");
  if (at < 1) return false;

  const local = email.slice(0, at);
  const labels = email.slice(at + 1).split(".");

  return (
    local.length <= 64 &&
    EMAIL_LOCAL_PART.test(local) &&
    labels.length >= 2 &&
    labels.every((label) => DOMAIN_LABEL.test(label)) &&
    TOP_LEVEL_DOMAIN.test(labels[labels.length - 1])
  );
}

export function sanitizePhone(value: string): string {
  const allowed = value.replace(/[^\d\s()+-]/g, "").trimStart();
  return allowed.replace(/(?!^)\+/g, "");
}

export function isValidPhone(phone: string): boolean {
  if (phone.length > CONTACT_LIMITS.phone.max) return false;
  if (!/^\+?[\d\s()-]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}
