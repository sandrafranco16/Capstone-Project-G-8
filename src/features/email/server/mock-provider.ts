import type {
  EmailProvider,
  LeadEmailInput,
  EmailSendResult,
} from "./email-provider";

export function createMockProvider(): EmailProvider {
  return {
    async sendContactLead(input: LeadEmailInput): Promise<EmailSendResult> {
      void input;
      return { id: `mock-${Date.now()}` };
    },
  };
}
