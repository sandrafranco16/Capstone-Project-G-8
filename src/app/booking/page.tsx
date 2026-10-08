import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { AppointmentList } from "@/components/booking/AppointmentList";
import { bookingConfig } from "@/features/booking/config";
import type { CalBookingOptions } from "@/features/booking/types";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a 1-on-1 consultation with BITDOT AI governance, career coaching, executive advisory, and technical training experts.",
};

interface BookingPageProps {
  searchParams: Promise<{
    type?: string;
    email?: string;
    name?: string;
    notes?: string;
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;

  const prefillOptions: CalBookingOptions = {
    email: params.email,
    name: params.name,
    notes: params.notes,
  };

  return (
    <>
      <header className="page-header booking-header">
        <Container>
          <p className="eyebrow">{bookingConfig.provider}</p>
          <h1>Book the right conversation.</h1>
          <p className="lead">
            Select an appointment type below to schedule directly with our AI
            governance advisors, career coaches, or technical team.
          </p>
        </Container>
      </header>

      <section className="section">
        <Container>
          {params.email || params.name || params.notes ? (
            <div className="booking-prefill-banner">
              ℹ️ Your details ({params.name || params.email}) have been
              pre-filled from your previous step.
            </div>
          ) : null}

          <AppointmentList
            appointmentTypes={bookingConfig.appointmentTypes}
            initialSelectedId={params.type}
            prefillOptions={prefillOptions}
          />
        </Container>
      </section>
    </>
  );
}
