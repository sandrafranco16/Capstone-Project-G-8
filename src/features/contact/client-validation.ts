export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  consent: boolean;
};

export function validateContactForm({
  name,
  email,
  message,
  consent,
}: ContactFormValues): string[] {
  const errors: string[] = [];

  if (name.length < 2) errors.push("Please enter your name.");
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (message.length < 10) {
    errors.push("Message must be at least 10 characters.");
  }
  if (!consent) errors.push("You must consent to being contacted.");

  return errors;
}
