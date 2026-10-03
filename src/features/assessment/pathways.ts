import type { PathwayId } from "./types";
export type { PathwayId, AssessmentPathway } from "./types";
export { assessmentPathways } from "./content/pathways";

export const pathwayIds = ["career", "learn", "govern", "risk"] as const;

export function isPathwayId(value: unknown): value is PathwayId {
  return typeof value === "string" && pathwayIds.some((id) => id === value);
}
