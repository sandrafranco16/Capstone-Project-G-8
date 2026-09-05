import { describe, expect, it } from "vitest";
import { bookingConfig } from "./config";

describe("Booking UI Configuration", () => {
  it("contains all 5 expected appointment types with required properties", () => {
    expect(bookingConfig.appointmentTypes).toHaveLength(5);
    bookingConfig.appointmentTypes.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.description).toBeDefined();
      expect(item.durationMinutes).toBeGreaterThan(0);
      expect(item.targetAudience).toBeDefined();
      expect(item.slug).toBeDefined();
    });
  });

  it("has distinct IDs and slugs for all appointment types", () => {
    const ids = bookingConfig.appointmentTypes.map((item) => item.id);
    const slugs = bookingConfig.appointmentTypes.map((item) => item.slug);
    expect(new Set(ids).size).toBe(5);
    expect(new Set(slugs).size).toBe(5);
  });
});
