"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrors([]);

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const message = (data.get("message") as string)?.trim() ?? "";
    const consent = data.get("consent") === "on";
    const turnstileToken = (data.get("cf-turnstile-response") as string) ?? "";
    const website = (data.get("website") as string) ?? "";

    const clientErrors: string[] = [];
    if (name.length < 2) clientErrors.push("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      clientErrors.push("Please enter a valid email address.");
    if (message.length < 10)
      clientErrors.push("Message must be at least 10 characters.");
    if (!consent)
      clientErrors.push("You must consent to being contacted.");

    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      setState("idle");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          consent,
          turnstileToken,
          website,
        }),
      });

      if (response.ok) {
        setState("success");
        formRef.current?.reset();
      } else {
        const body = await response.json().catch(() => ({}));
        const serverErrors =
          (body as { errors?: string[] }).errors ?? ["Something went wrong. Please try again."];
        setErrors(serverErrors);
        setState("error");
      }
    } catch {
      setErrors(["Unable to reach the server. Please try again later."]);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="contact-success" role="status">
        <h2>Thank you for your enquiry.</h2>
        <p>
          We have received your message and will get back to you shortly.
        </p>
        <button
          type="button"
          className="button"
          onClick={() => setState("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="contact-form"
    >
      {errors.length > 0 && (
        <div className="contact-form__errors" role="alert">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="contact-form__field">
        <label htmlFor="contact-name">Name *</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          disabled={state === "submitting"}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email *</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          disabled={state === "submitting"}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          disabled={state === "submitting"}
        />
      </div>

      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form__field contact-form__consent">
        <label>
          <input
            name="consent"
            type="checkbox"
            required
            disabled={state === "submitting"}
          />
          I consent to BITDOT using my details to respond to this enquiry.
        </label>
      </div>

      {siteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme="light"
        />
      )}

      <button
        type="submit"
        className="button"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
