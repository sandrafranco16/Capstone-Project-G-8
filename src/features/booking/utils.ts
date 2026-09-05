import { bookingConfig } from "./config";
import type { AppointmentTypeConfig, AppointmentTypeId, CalBookingOptions } from "./types";

export function getAppointmentType(
  idOrSlug?: string
): AppointmentTypeConfig | undefined {
  if (!idOrSlug) return undefined;
  const normalized = idOrSlug.trim().toLowerCase();
  return bookingConfig.appointmentTypes.find(
    (item) => item.id === normalized || item.slug === normalized
  );
}

export function validateCalComUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== "string") {
    return bookingConfig.baseUrl;
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return bookingConfig.baseUrl;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return trimmed;
    }
  } catch {
    // Return safe fallback if URL parsing fails
  }

  return bookingConfig.baseUrl;
}

export function buildCalComUrl(
  typeId?: AppointmentTypeId | string,
  options: CalBookingOptions = {}
): string {
  const matchedType = getAppointmentType(typeId);
  const targetSlug = matchedType ? matchedType.slug : bookingConfig.defaultSlug;

  const base = validateCalComUrl(bookingConfig.baseUrl).replace(/\/+$/, "");
  const fullBaseUrl = `${base}/${targetSlug}`;

  const url = new URL(fullBaseUrl);

  if (options.name && options.name.trim()) {
    url.searchParams.set("name", options.name.trim());
  }

  if (options.email && options.email.trim()) {
    url.searchParams.set("email", options.email.trim());
  }

  if (options.notes && options.notes.trim()) {
    url.searchParams.set("notes", options.notes.trim());
  }

  if (options.theme) {
    url.searchParams.set("theme", options.theme);
  }

  if (options.layout) {
    url.searchParams.set("layout", options.layout);
  }

  if (options.hideEventTypeDetails !== undefined) {
    url.searchParams.set(
      "hideEventTypeDetails",
      options.hideEventTypeDetails ? "1" : "0"
    );
  }

  return url.toString();
}
