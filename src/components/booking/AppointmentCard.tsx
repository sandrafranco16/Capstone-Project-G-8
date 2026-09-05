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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.5rem",
        borderRadius: "0.75rem",
        border: isSelected ? "2px solid #2563eb" : "1px solid #e5e7eb",
        backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
        boxShadow: isSelected
          ? "0 4px 12px rgba(37, 99, 235, 0.15)"
          : "0 1px 3px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "0.25rem 0.625rem",
              borderRadius: "9999px",
              backgroundColor: "#dbeafe",
              color: "#1e40af",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {appointment.durationMinutes} mins
          </span>

          {appointment.recommendedFor && appointment.recommendedFor.length > 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "#059669",
                fontWeight: 500,
                backgroundColor: "#ecfdf5",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.375rem",
              }}
            >
              Rec: {appointment.recommendedFor.join(", ")}
            </span>
          )}
        </div>

        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "0.5rem",
          }}
        >
          {appointment.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            color: "#4b5563",
            lineHeight: 1.5,
            marginBottom: "1rem",
          }}
        >
          {appointment.description}
        </p>

        <div
          style={{
            fontSize: "0.8125rem",
            color: "#6b7280",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
          }}
        >
          <strong>Audience:</strong> {appointment.targetAudience}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        {onSelectEmbed && (
          <button
            type="button"
            onClick={() => onSelectEmbed(appointment)}
            style={{
              flex: 1,
              padding: "0.625rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              textAlign: "center",
              transition: "background-color 0.15s ease",
            }}
          >
            {isSelected ? "Currently Viewing" : "Book Online"}
          </button>
        )}

        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "0.625rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            backgroundColor: "#ffffff",
            color: "#374151",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          External ↗
        </a>
      </div>
    </div>
  );
}
