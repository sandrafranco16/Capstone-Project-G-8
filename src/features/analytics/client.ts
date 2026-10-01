"use client";

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (
    command: string,
    name: string,
    properties: Record<string, unknown>,
  ) => void;
  clarity?: (command: string, name: string) => void;
};

/** Sends a browser event to each analytics provider configured by the site. */
export function trackClientEvent(
  event: string,
  properties: Record<string, unknown> = {},
) {
  const analytics = window as AnalyticsWindow;
  analytics.dataLayer ??= [];
  analytics.dataLayer.push({ event, ...properties });
  analytics.gtag?.("event", event, properties);
  analytics.clarity?.("event", event);
}
