import type {
  EmailProvider,
  LeadEmailInput,
  EmailSendResult,
} from "./email-provider";
import { EmailDeliveryError, EmailNotConfiguredError } from "./email-errors";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Label/value rows for the summary; optional fields are left out when blank. */
function detailRows(input: LeadEmailInput): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Organisation", input.organisation],
    ["Enquiry type", input.enquiryType],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

function buildPlainTextBody(input: LeadEmailInput): string {
  return [
    ...detailRows(input).map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    input.message,
  ].join("\n");
}

function buildHtmlBody(input: LeadEmailInput): string {
  return [
    ...detailRows(input).map(
      ([label, value]) =>
        "<p><strong>" + label + ":</strong> " + escapeHtml(value) + "</p>",
    ),
    "<p><strong>Message:</strong></p>",
    "<p>" + escapeHtml(input.message).replace(/\n/g, "<br>") + "</p>",
  ].join("\n");
}

export function createResendProvider(): EmailProvider {
  const apiKey = process.env.CONTACT_EMAIL_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !from || !to) {
    throw new EmailNotConfiguredError();
  }

  return {
    async sendContactLead(input: LeadEmailInput): Promise<EmailSendResult> {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: input.email,
          subject: "New website enquiry",
          text: buildPlainTextBody(input),
          html: buildHtmlBody(input),
        }),
      });

      if (!response.ok) {
        throw new EmailDeliveryError();
      }

      const data = (await response.json()) as { id?: string };
      return { id: data.id ?? "unknown" };
    },
  };
}
