import {
  CONTACT_LIMITS,
  isEnquiryType,
  isValidEmail,
  isValidPhone,
} from "./contact-fields";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  enquiryType: string;
  message: string;
  consent: boolean;
};

export type ContactField = keyof ContactFormValues;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS: readonly ContactField[] = [
  "name",
  "email",
  "phone",
  "organisation",
  "enquiryType",
  "message",
  "consent",
];

export function validateContactField(
  field: ContactField,
  values: ContactFormValues,
): string | undefined {
  const { name, message } = CONTACT_LIMITS;

  switch (field) {
    case "name": {
      const value = values.name.trim();
      if (!value) return "Name is required";
      if (value.length < name.min)
        return `Name must be at least ${name.min} characters`;
      if (value.length > name.max)
        return `Name must be ${name.max} characters or fewer`;
      return undefined;
    }
    case "email": {
      const value = values.email.trim();
      if (!value) return "Email is required";
      if (!isValidEmail(value)) return "Invalid email address";
      return undefined;
    }
    case "phone": {
      const value = values.phone.trim();
      if (value && !isValidPhone(value)) return "Invalid phone number";
      return undefined;
    }
    case "organisation": {
      const max = CONTACT_LIMITS.organisation.max;
      if (values.organisation.trim().length > max)
        return `Organisation must be ${max} characters or fewer`;
      return undefined;
    }
    case "enquiryType":
      return isEnquiryType(values.enquiryType) ? undefined : "Select a topic";
    case "message": {
      const value = values.message.trim();
      if (!value) return "Message is required";
      if (value.length < message.min)
        return `Message must be at least ${message.min} characters`;
      if (value.length > message.max)
        return `Message must be ${message.max} characters or fewer`;
      return undefined;
    }
    case "consent":
      return values.consent ? undefined : "Please accept to continue";
  }
}

export function validateContactForm(
  values: ContactFormValues,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateContactField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}
