import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { createResendProvider } from "./resend-provider";
import { EmailNotConfiguredError } from "./email-errors";

describe("createResendProvider", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.CONTACT_EMAIL_API_KEY = "re_test_key";
    process.env.CONTACT_EMAIL_FROM = "BITDOT Website <website@notifications.bitdot.com.au>";
    process.env.CONTACT_EMAIL_TO = "test@example.com";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.unstubAllGlobals();
  });

  it("throws EmailNotConfiguredError when API key is missing", () => {
    delete process.env.CONTACT_EMAIL_API_KEY;
    expect(() => createResendProvider()).toThrow(EmailNotConfiguredError);
  });

  it("throws EmailNotConfiguredError when from address is missing", () => {
    delete process.env.CONTACT_EMAIL_FROM;
    expect(() => createResendProvider()).toThrow(EmailNotConfiguredError);
  });

  it("throws EmailNotConfiguredError when to address is missing", () => {
    delete process.env.CONTACT_EMAIL_TO;
    expect(() => createResendProvider()).toThrow(EmailNotConfiguredError);
  });

  it("sends email with correct fields via Resend API", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "email-123" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const provider = createResendProvider();
    const result = await provider.sendContactLead({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Tell me about AI governance.",
    });

    expect(result.id).toBe("email-123");
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");

    const body = JSON.parse(options.body);
    expect(body.from).toBe("BITDOT Website <website@notifications.bitdot.com.au>");
    expect(body.to).toBe("test@example.com");
    expect(body.reply_to).toBe("jane@example.com");
    expect(body.subject).toBe("New website enquiry");
    expect(body.text).toContain("Jane Doe");
    expect(body.text).toContain("Tell me about AI governance.");
  });

  it("uses user email only as reply_to, never as from", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "email-456" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const provider = createResendProvider();
    await provider.sendContactLead({
      name: "Attacker",
      email: "attacker@evil.com",
      message: "Trying to spoof from address.",
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.from).not.toContain("attacker@evil.com");
    expect(body.reply_to).toBe("attacker@evil.com");
  });

  it("escapes HTML in user input", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "email-789" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const provider = createResendProvider();
    await provider.sendContactLead({
      name: '<script>alert("xss")</script>',
      email: "test@example.com",
      message: "Hello <b>world</b>",
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.html).not.toContain("<script>");
    expect(body.html).toContain("&lt;script&gt;");
    expect(body.html).not.toContain("<b>");
    expect(body.html).toContain("&lt;b&gt;");
  });

  it("does not expose API key in request body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "email-000" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const provider = createResendProvider();
    await provider.sendContactLead({
      name: "Jane",
      email: "jane@example.com",
      message: "Just a message for testing.",
    });

    const body = mockFetch.mock.calls[0][1].body;
    expect(body).not.toContain("re_test_key");
  });

  it("throws EmailDeliveryError when API returns non-ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    const provider = createResendProvider();
    await expect(
      provider.sendContactLead({
        name: "Jane",
        email: "jane@example.com",
        message: "This should fail delivery.",
      }),
    ).rejects.toThrow("Email delivery failed.");
  });
});
