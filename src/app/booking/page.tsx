import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { bookingConfig } from "@/features/booking/config";

export const metadata: Metadata = { title: "Book a Consultation" };

export default function BookingPage() {
  return (
    <>
      <header className="page-header">
        <Container>
          <p className="eyebrow">{bookingConfig.provider}</p>
          <h1>Book the right conversation.</h1>
        </Container>
      </header>
      <section className="section">
        <Container className="prose">
          <h2>Appointment types</h2>
          <ul>
            {bookingConfig.appointmentTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
          {bookingConfig.url ? (
            <a className="button" href={bookingConfig.url} rel="noreferrer">
              Continue to Cal.com
            </a>
          ) : (
            <p className="notice">
              Add the approved Cal.com URL to `NEXT_PUBLIC_CALCOM_URL` before enabling
              booking links.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
