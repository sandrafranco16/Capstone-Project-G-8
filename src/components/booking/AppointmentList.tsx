"use client";

import { useState } from "react";
import type { AppointmentTypeConfig, CalBookingOptions } from "@/features/booking/types";
import { buildCalComUrl } from "@/features/booking/utils";
import { AppointmentCard } from "./AppointmentCard";
import { CalEmbed } from "./CalEmbed";

export interface AppointmentListProps {
  appointmentTypes: AppointmentTypeConfig[];
  initialSelectedId?: string;
  prefillOptions?: CalBookingOptions;
}

export function AppointmentList({
  appointmentTypes,
  initialSelectedId,
  prefillOptions = {},
}: AppointmentListProps) {
  const defaultSelected = appointmentTypes.find(
    (item) => item.id === initialSelectedId || item.slug === initialSelectedId
  );

  const [selectedAppointment, setSelectedAppointment] = useState<
    AppointmentTypeConfig | undefined
  >(defaultSelected);

  const handleSelect = (appointment: AppointmentTypeConfig) => {
    setSelectedAppointment((prev) =>
      prev?.id === appointment.id ? undefined : appointment
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {selectedAppointment && (
        <div id="booking-embed-section" style={{ scrollMarginTop: "2rem" }}>
          <CalEmbed
            url={buildCalComUrl(selectedAppointment.id, prefillOptions)}
            title={`Schedule: ${selectedAppointment.title}`}
            onClose={() => setSelectedAppointment(undefined)}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {appointmentTypes.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            isSelected={selectedAppointment?.id === appointment.id}
            onSelectEmbed={handleSelect}
            prefillOptions={prefillOptions}
          />
        ))}
      </div>
    </div>
  );
}
