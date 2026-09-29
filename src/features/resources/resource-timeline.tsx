"use client";

import { useEffect, useState } from "react";

import { milestones } from "./timeline-data";

type Filter = "all" | "au" | "eu" | "live" | "next";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "au", label: "Australia" },
  { value: "eu", label: "European Union" },
  { value: "live", label: "In force" },
  { value: "next", label: "Still to come" },
];

function perthToday() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function trackFilter(filter: Filter, shown: number) {
  const analytics = window as Window & {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: string,
      name: string,
      properties: Record<string, unknown>,
    ) => void;
    clarity?: (command: string, name: string) => void;
  };
  analytics.dataLayer ??= [];
  analytics.dataLayer.push({ event: "resources_filtered", filter, shown });
  analytics.gtag?.("event", "resources_filtered", { filter, shown });
  analytics.clarity?.("event", "resources_filtered");
}

export function ResourceTimeline() {
  const [filter, setFilter] = useState<Filter>("all");
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const updateToday = () => setToday(perthToday());
    updateToday();
    const timer = window.setInterval(updateToday, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const shown = milestones.filter((item) => {
    if (filter === "all") return true;
    if (filter === "au" || filter === "eu") return item.region === filter;
    return (
      today !== null &&
      (filter === "live" ? item.date <= today : item.date > today)
    );
  });
  const nextIndex =
    today === null ? -1 : milestones.findIndex((item) => item.date > today);
  const formattedToday = today
    ? new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${today}T00:00:00Z`))
    : "";

  return (
    <>
      <div
        className="filter rv in"
        role="group"
        aria-label="Filter the timeline"
      >
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? "act" : undefined}
            aria-pressed={filter === value}
            onClick={() => {
              setFilter(value);
              const count = milestones.filter(
                (item) =>
                  value === "all" ||
                  item.region === value ||
                  (today !== null &&
                    (value === "live"
                      ? item.date <= today
                      : value === "next" && item.date > today)),
              ).length;
              trackFilter(value, count);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="f-count" aria-live="polite">
        {filter === "all"
          ? `${milestones.length} milestones, oldest first`
          : `${shown.length} of ${milestones.length} milestones shown`}
      </p>
      <div className="tl" id="tl">
        {milestones.map((item, index) => {
          const live = today !== null && item.date <= today;
          const visible = shown.includes(item);
          return (
            <div key={item.date + item.title}>
              {filter === "all" && index === nextIndex && (
                <div className="today">
                  <span>Today · {formattedToday}</span>
                </div>
              )}
              <article
                className={`ev rv in ${live ? "live" : "next"}${visible ? "" : " hide"}`}
                data-date={item.date}
                data-region={item.region}
                data-state={live ? "live" : "next"}
              >
                <div className="ev-card card">
                  <div className="ev-top">
                    <span className="ev-date">{item.dateLabel}</span>
                    <span className={`tag ${item.region}`}>
                      {item.region === "au" ? "Australia" : "European Union"}
                    </span>
                    {today !== null && (
                      <span className={`tag st ${live ? "live" : "next"}`}>
                        {live ? "In force" : "Still to come"}
                      </span>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  {item.description}
                  <a
                    className="src"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.source}{" "}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}
