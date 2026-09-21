import type { ContactPayload } from "../validation";
import type { EmailProvider } from "../../email/server/email-provider";
import { EmailNotConfiguredError } from "../../email/server/email-errors";
import { createResendProvider } from "../../email/server/resend-provider";
import { createMockProvider } from "../../email/server/mock-provider";

export class ContactDeliveryNotConfiguredError extends Error {}

function resolveProvider(): EmailProvider {
  const providerName = process.env.CONTACT_EMAIL_PROVIDER ?? "";

  if (providerName === "mock") {
    return createMockProvider();
  }

  if (providerName === "resend") {
    return createResendProvider();
  }

  throw new ContactDeliveryNotConfiguredError(
    "Contact email delivery has not been configured.",
  );
}

export async function deliverContactLead(
  payload: ContactPayload,
): Promise<void> {
  try {
    const provider = resolveProvider();
    await provider.sendContactLead({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      throw new ContactDeliveryNotConfiguredError(error.message);
    }
    throw error;
  }
}
