import type { ContactPayload } from "../validation";

export class ContactDeliveryNotConfiguredError extends Error {}

export async function deliverContactLead(payload: ContactPayload): Promise<void> {
  void payload;
  // Keep the provider-specific SDK or API call inside this adapter. The final
  // provider, credentials, sender and recipient are still client decisions.
  throw new ContactDeliveryNotConfiguredError(
    "Contact email delivery has not been configured.",
  );
}
