"use client";

import { useEffect, useState } from "react";

import { trackClientEvent } from "@/features/analytics/client";

import { resourceClassNames as rc } from "./resource-class-names";
import {
  filterMilestones,
  findNextMilestoneIndex,
  getPerthDate,
  type TimelineFilter,
} from "./timeline";
import { milestones } from "./timeline-data";

const filters: { value: TimelineFilter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "au", label: "Australia" },
  { value: "eu", label: "European Union" },
  { value: "live", label: "In force" },
  { value: "next", label: "Still to come" },
];

export function ResourceTimeline() {
  const [filter, setFilter] = useState<TimelineFilter>("all");
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const updateToday = () => setToday(getPerthDate());
    updateToday();
    const timer = window.setInterval(updateToday, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const shown = filterMilestones(milestones, filter, today ?? "");
  const nextIndex =
    today === null ? -1 : findNextMilestoneIndex(milestones, today);
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
        className={rc("filter rv in")}
        role="group"
        aria-label="Filter the timeline"
      >
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? rc("act") : undefined}
            aria-pressed={filter === value}
            onClick={() => {
              setFilter(value);
              const count = filterMilestones(
                milestones,
                value,
                today ?? "",
              ).length;
              trackClientEvent("resources_filtered", {
                filter: value,
                shown: count,
              });
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <p className={rc("f-count")} aria-live="polite">
        {filter === "all"
          ? `${milestones.length} milestones, oldest first`
          : `${shown.length} of ${milestones.length} milestones shown`}
      </p>
      <div className={rc("tl")} id="tl">
        {milestones.map((item, index) => {
          const live = today !== null && item.date <= today;
          const visible = shown.includes(item);
          return (
            <div key={item.date + item.title}>
              {filter === "all" && index === nextIndex && (
                <div className={rc("today")}>
                  <span>Today · {formattedToday}</span>
                </div>
              )}
              <article
                className={rc(
                  `ev rv in ${live ? "live" : "next"}${visible ? "" : " hide"}`,
                )}
                data-date={item.date}
                data-region={item.region}
                data-state={live ? "live" : "next"}
              >
                <div className={rc("ev-card card")}>
                  <div className={rc("ev-top")}>
                    <span className={rc("ev-date")}>{item.dateLabel}</span>
                    <span className={rc(`tag ${item.region}`)}>
                      {item.region === "au" ? "Australia" : "European Union"}
                    </span>
                    {today !== null && (
                      <span className={rc(`tag st ${live ? "live" : "next"}`)}>
                        {live ? "In force" : "Still to come"}
                      </span>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  {item.description}
                  <a
                    className={rc("src")}
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
