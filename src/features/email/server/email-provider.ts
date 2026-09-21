export type LeadEmailInput = {
  name: string;
  email: string;
  message: string;
};

export type EmailSendResult = {
  id: string;
};

export type EmailProvider = {
  sendContactLead(input: LeadEmailInput): Promise<EmailSendResult>;
};
