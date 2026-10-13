"use client";

import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";

import {
  CONTACT_FIELDS,
  type ContactField,
  type ContactFormValues,
  validateContactForm,
} from "../client-validation";
import {
  CONTACT_LIMITS,
  ENQUIRY_TYPES,
  sanitizePhone,
} from "../contact-fields";
import { TurnstileWidget } from "./turnstile-widget";

type FormState = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  enquiryType: "",
  message: "",
  consent: false,
};

const fieldId = (field: ContactField) => `contact-${field}`;
const errorId = (field: ContactField) => `contact-${field}-error`;

function ErrorMessage({
  field,
  error,
}: {
  field: ContactField;
  error?: string;
}) {
  if (!error) return null;
  return (
    <p id={errorId(field)} className="field-error">
      {error}
    </p>
  );
}

type FieldProps = {
  field: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  wide?: boolean;
  aside?: ReactNode;
  children: ReactNode;
};

function Field({
  field,
  label,
  optional,
  error,
  wide,
  aside,
  children,
}: FieldProps) {
  return (
    <div
      className="field"
      data-wide={wide || undefined}
      data-invalid={error ? true : undefined}
    >
      <div className="field-label">
        <label htmlFor={fieldId(field)}>
          {label}
          {optional && <span className="field-optional"> (optional)</span>}
        </label>
        {aside}
      </div>
      {children}
      <ErrorMessage field={field} error={error} />
    </div>
  );
}

export function ContactForm({
  initialEnquiryType = "",
  initialMessage = "",
}: {
  initialEnquiryType?: ContactFormValues["enquiryType"];
  initialMessage?: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...EMPTY_VALUES,
    enquiryType: initialEnquiryType,
    message: initialMessage.slice(0, CONTACT_LIMITS.message.max),
  }));
  const [shown, setShown] = useState<ReadonlySet<ContactField>>(new Set());
  const [serverError, setServerError] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const submitting = state === "submitting";
  const errors = validateContactForm(values);
  const errorFor = (field: ContactField) =>
    shown.has(field) ? errors[field] : undefined;

  function showField(field: ContactField) {
    setShown((current) =>
      current.has(field) ? current : new Set(current).add(field),
    );
  }

  function update<K extends ContactField>(
    field: K,
    value: ContactFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleBlur(field: ContactField) {
    const value = values[field];
    if (typeof value === "string" && value.trim()) showField(field);
  }

  function controlProps(field: ContactField) {
    const error = errorFor(field);
    return {
      id: fieldId(field),
      name: field,
      disabled: submitting,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId(field) : undefined,
      onBlur: () => handleBlur(field),
    };
  }

  function handleMagnetMove(event: React.PointerEvent<HTMLButtonElement>) {
    const button = event.currentTarget;
    if (event.pointerType !== "mouse" || button.disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.35;
    button.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handleMagnetLeave(event: React.PointerEvent<HTMLButtonElement>) {
    event.currentTarget.style.transform = "";
  }

  function resetTurnstile() {
    if (!siteKey) return;
    setTurnstileToken("");
    setTurnstileResetSignal((value) => value + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const invalid = CONTACT_FIELDS.filter((field) => errors[field]);
    if (invalid.length > 0) {
      setShown(new Set(CONTACT_FIELDS));
      document.getElementById(fieldId(invalid[0]))?.focus();
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          organisation: values.organisation.trim(),
          enquiryType: values.enquiryType,
          message: values.message.trim(),
          consent: values.consent,
          turnstileToken,
          website,
        }),
      });

      if (response.ok) {
        setState("success");
        setValues(EMPTY_VALUES);
        setShown(new Set());
        setTurnstileToken("");
        return;
      }

      const body = (await response.json().catch(() => ({}))) as {
        errors?: string[];
      };
      setServerError(
        body.errors?.[0] ?? "Something went wrong. Please try again.",
      );
      setState("error");
      resetTurnstile();
    } catch {
      setServerError("Unable to reach the server. Please try again later.");
      setState("error");
      resetTurnstile();
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <h2>Message sent</h2>
        <p>Thanks for getting in touch. We will reply to you shortly.</p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setServerError("");
            setState("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const topicError = errorFor("enquiryType");
  const consentError = errorFor("consent");

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting}
      aria-labelledby="contact-form-heading"
    >
      <div className="form-head">
        <h2 id="contact-form-heading" className="form-title">
          Send us a message
        </h2>
        <p className="form-intro">
          Tell us a little about you and what you need, and the right person
          will get back to you.
        </p>
      </div>

      {serverError && (
        <p className="form-alert" role="alert">
          {serverError}
        </p>
      )}

      <fieldset className="form-group">
        <legend className="group-title">About you</legend>
        <div className="form-grid">
          <Field field="name" label="Name" error={errorFor("name")}>
            <input
              {...controlProps("name")}
              type="text"
              autoComplete="name"
              placeholder="Jane Citizen"
              required
              maxLength={CONTACT_LIMITS.name.max}
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </Field>

          <Field field="email" label="Email" error={errorFor("email")}>
            <input
              {...controlProps("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="jane@company.com"
              required
              maxLength={CONTACT_LIMITS.email.max}
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </Field>

          <Field field="phone" label="Phone" optional error={errorFor("phone")}>
            <input
              {...controlProps("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+61 400 000 000"
              maxLength={CONTACT_LIMITS.phone.max}
              value={values.phone}
              onChange={(event) =>
                update("phone", sanitizePhone(event.target.value))
              }
            />
          </Field>

          <Field
            field="organisation"
            label="Organisation"
            optional
            error={errorFor("organisation")}
          >
            <input
              {...controlProps("organisation")}
              type="text"
              autoComplete="organization"
              placeholder="Company or board"
              maxLength={CONTACT_LIMITS.organisation.max}
              value={values.organisation}
              onChange={(event) => update("organisation", event.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset
        className="form-group topics"
        aria-invalid={topicError ? true : undefined}
        aria-describedby={topicError ? errorId("enquiryType") : undefined}
        data-invalid={topicError ? true : undefined}
      >
        <legend className="group-title">
          What would you like to talk about?
        </legend>
        <div className="topic-list">
          {ENQUIRY_TYPES.map((type, index) => (
            <label key={type} className="topic">
              <input
                type="radio"
                name="enquiryType"
                id={index === 0 ? fieldId("enquiryType") : undefined}
                value={type}
                required
                checked={values.enquiryType === type}
                disabled={submitting}
                onChange={() => {
                  update("enquiryType", type);
                  showField("enquiryType");
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        <ErrorMessage field="enquiryType" error={topicError} />
      </fieldset>

      <Field
        field="message"
        label="Message"
        wide
        error={errorFor("message")}
        aside={
          <span className="field-count" aria-hidden="true">
            {values.message.length} / {CONTACT_LIMITS.message.max}
          </span>
        }
      >
        <textarea
          {...controlProps("message")}
          required
          rows={6}
          placeholder="Share your goals, your team and any timelines."
          maxLength={CONTACT_LIMITS.message.max}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <div aria-hidden="true" className="honeypot">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="consent" data-invalid={consentError ? true : undefined}>
        <label htmlFor={fieldId("consent")}>
          <input
            {...controlProps("consent")}
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => {
              update("consent", event.target.checked);
              showField("consent");
            }}
          />
          <span className="checkbox" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M2.5 6.2l2.3 2.3 4.7-5" />
            </svg>
          </span>
          <span>
            I agree to BITDOT using my details to respond to this enquiry, as
            described in the <Link href="/legal#privacy">privacy policy</Link>.
          </span>
        </label>
        <ErrorMessage field="consent" error={consentError} />
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
        className="btn btn-coral btn-lg btn-submit"
        onPointerMove={handleMagnetMove}
        onPointerLeave={handleMagnetLeave}
        disabled={submitting || Boolean(siteKey && !turnstileToken)}
      >
        {submitting ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <svg
              className="btn-arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
