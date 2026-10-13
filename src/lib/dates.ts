import { TZDate } from "@date-fns/tz";
import { format, parseISO } from "date-fns";

/** Business timezone used for "today" on the compliance clock. */
export const SITE_TIMEZONE = "Australia/Perth";

/**
 * Reads an ISO date (`2026-08-20`) or timestamp as a calendar day, so the
 * day shown never shifts with the visitor's or server's timezone.
 */
function calendarDay(value: string) {
  return parseISO(value.slice(0, 10));
}

/** "20 August 2026" */
export function formatLongDate(value: string) {
  return format(calendarDay(value), "d MMMM yyyy");
}

/** "20 Aug 2026" */
export function formatShortDate(value: string) {
  return format(calendarDay(value), "d MMM yyyy");
}

/** Today's date as `YYYY-MM-DD` in the given timezone (Perth by default). */
export function todayIn(timeZone = SITE_TIMEZONE, now = new Date()) {
  return format(new TZDate(now, timeZone), "yyyy-MM-dd");
}
