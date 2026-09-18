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
    <div className="appt-list">
      {selectedAppointment && (
        <div id="booking-embed-section" className="appt-list__embed">
          <CalEmbed
            url={buildCalComUrl(selectedAppointment.id, prefillOptions)}
            title={`Schedule: ${selectedAppointment.title}`}
            onClose={() => setSelectedAppointment(undefined)}
          />
        </div>
      )}

      <div className="appt-list__grid">
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
