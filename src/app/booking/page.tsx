import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { AppointmentList } from "@/components/booking/AppointmentList";
import { bookingConfig } from "@/features/booking/config";
import type { CalBookingOptions } from "@/features/booking/types";

export const metadata: Metadata = {
  title: "Book a Consultation | BITDOT",
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
      <header className="page-header" style={{ padding: "3rem 0 2rem", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <Container>
          <p className="eyebrow" style={{ color: "#2563eb", fontWeight: 600, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            {bookingConfig.provider}
          </p>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>
            Book the right conversation.
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#475569", maxWidth: "42rem" }}>
            Select an appointment type below to schedule directly with our AI governance advisors, career coaches, or technical team.
          </p>
        </Container>
      </header>

      <section className="section" style={{ padding: "3rem 0" }}>
        <Container>
          {params.email || params.name || params.notes ? (
            <div
              style={{
                marginBottom: "2rem",
                padding: "1rem 1.25rem",
                backgroundColor: "#eff6ff",
                borderRadius: "0.5rem",
                border: "1px solid #bfdbfe",
                color: "#1e40af",
                fontSize: "0.875rem",
              }}
            >
              ℹ️ Your details ({params.name || params.email}) have been pre-filled from your previous step.
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
