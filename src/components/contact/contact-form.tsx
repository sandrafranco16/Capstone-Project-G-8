"use client";

import { useCallback, useRef, useState } from "react";

import { validateContactForm } from "@/features/contact/client-validation";
import { TurnstileWidget } from "./turnstile-widget";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  function resetTurnstile() {
    if (!siteKey) return;
    setTurnstileToken("");
    setTurnstileResetSignal((value) => value + 1);
  }

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
    const website = (data.get("website") as string) ?? "";

    const clientErrors = validateContactForm({
      name,
      email,
      message,
      consent,
    });

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
        setTurnstileToken("");
        formRef.current?.reset();
      } else {
        const body = await response.json().catch(() => ({}));
        const serverErrors =
          (body as { errors?: string[] }).errors ?? ["Something went wrong. Please try again."];
        setErrors(serverErrors);
        setState("error");
        resetTurnstile();
      }
    } catch {
      setErrors(["Unable to reach the server. Please try again later."]);
      setState("error");
      resetTurnstile();
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
          onClick={() => {
            setErrors([]);
            setTurnstileToken("");
            setState("idle");
          }}
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
        <TurnstileWidget
          siteKey={siteKey}
          resetSignal={turnstileResetSignal}
          onTokenChange={handleTurnstileToken}
        />
      )}

      <button
        type="submit"
        className="button"
        disabled={
          state === "submitting" || Boolean(siteKey && !turnstileToken)
        }
      >
        {state === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
