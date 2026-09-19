export class EmailNotConfiguredError extends Error {
  constructor(message = "Email delivery is not configured.") {
    super(message);
    this.name = "EmailNotConfiguredError";
  }
}

export class EmailDeliveryError extends Error {
  constructor(message = "Email delivery failed.") {
    super(message);
    this.name = "EmailDeliveryError";
  }
}
