import { describe, expect, it } from "vitest";
import { bookingConfig } from "./config";
import { buildCalComUrl, getAppointmentType, validateCalComUrl } from "./utils";

describe("Booking Utilities", () => {
  describe("getAppointmentType", () => {
    it("returns correct appointment config for valid id", () => {
      const type = getAppointmentType("executive-consultation");
      expect(type).toBeDefined();
      expect(type?.title).toBe("Executive Consultation");
      expect(type?.durationMinutes).toBe(60);
    });

    it("returns correct appointment config when query is case-insensitive", () => {
      const type = getAppointmentType("  CAREER-COACHING ");
      expect(type?.id).toBe("career-coaching");
    });

    it("returns undefined for non-existent appointment type", () => {
      expect(getAppointmentType("non-existent-type")).toBeUndefined();
      expect(getAppointmentType(undefined)).toBeUndefined();
    });
  });

  describe("validateCalComUrl", () => {
    it("validates and returns clean https URL", () => {
      expect(validateCalComUrl("https://cal.com/bitdot")).toBe("https://cal.com/bitdot");
    });

    it("returns default base url for invalid or unsafe protocols", () => {
      expect(validateCalComUrl("javascript:alert(1)")).toBe(bookingConfig.baseUrl);
      expect(validateCalComUrl("not-a-url")).toBe(bookingConfig.baseUrl);
      expect(validateCalComUrl("")).toBe(bookingConfig.baseUrl);
      expect(validateCalComUrl(undefined)).toBe(bookingConfig.baseUrl);
    });
  });

  describe("buildCalComUrl", () => {
    it("builds URL with default slug when no type is provided", () => {
      const url = buildCalComUrl();
      expect(url).toContain(bookingConfig.defaultSlug);
    });

    it("builds URL for specified appointment type", () => {
      const url = buildCalComUrl("workshop-enquiry");
      expect(url).toBe(`${bookingConfig.baseUrl}/workshop-enquiry`);
    });

    it("attaches pre-filled parameters correctly", () => {
      const url = buildCalComUrl("career-coaching", {
        name: "Jane Doe",
        email: "jane@example.com",
        notes: "Interested in AI Governance transition",
        theme: "dark",
      });

      const parsed = new URL(url);
      expect(parsed.searchParams.get("name")).toBe("Jane Doe");
      expect(parsed.searchParams.get("email")).toBe("jane@example.com");
      expect(parsed.searchParams.get("notes")).toBe(
        "Interested in AI Governance transition"
      );
      expect(parsed.searchParams.get("theme")).toBe("dark");
    });

    it("encodes special characters in query parameters safely", () => {
      const url = buildCalComUrl("discovery-call", {
        name: "O'Connor & Sons",
        email: "user+test@domain.com",
        notes: "AI & ML > 100% assessment score",
      });

      const parsed = new URL(url);
      expect(parsed.searchParams.get("name")).toBe("O'Connor & Sons");
      expect(parsed.searchParams.get("email")).toBe("user+test@domain.com");
      expect(parsed.searchParams.get("notes")).toBe("AI & ML > 100% assessment score");
    });
  });
});
