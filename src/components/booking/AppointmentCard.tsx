"use client";

import type { AppointmentTypeConfig, CalBookingOptions } from "@/features/booking/types";
import { buildCalComUrl } from "@/features/booking/utils";

export interface AppointmentCardProps {
  appointment: AppointmentTypeConfig;
  isSelected?: boolean;
  onSelectEmbed?: (appointment: AppointmentTypeConfig) => void;
  prefillOptions?: CalBookingOptions;
}

export function AppointmentCard({
  appointment,
  isSelected = false,
  onSelectEmbed,
  prefillOptions = {},
}: AppointmentCardProps) {
  const directUrl = buildCalComUrl(appointment.id, prefillOptions);
  const cardClass = isSelected ? "appt-card appt-card--selected" : "appt-card";

  return (
    <div className={cardClass}>
      <div>
        <div className="appt-card__meta">
          <span className="appt-card__duration">
            {appointment.durationMinutes} mins
          </span>

          {appointment.recommendedFor && appointment.recommendedFor.length > 0 && (
            <span className="appt-card__rec">
              Rec: {appointment.recommendedFor.join(", ")}
            </span>
          )}
        </div>

        <h3 className="appt-card__title">{appointment.title}</h3>

        <p className="appt-card__desc">{appointment.description}</p>

        <div className="appt-card__audience">
          <strong>Audience:</strong> {appointment.targetAudience}
        </div>
      </div>

      <div className="appt-card__actions">
        {onSelectEmbed && (
          <button
            type="button"
            onClick={() => onSelectEmbed(appointment)}
            className="appt-card__book-btn"
          >
            {isSelected ? "Currently Viewing" : "Book Online"}
          </button>
        )}

        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="appt-card__ext-link"
        >
          External ↗
        </a>
      </div>
    </div>
  );
}
