import type { AssessmentLevel, PathwayId } from "./types";
import {
  recommendationMatrix,
  resultMessages,
  services,
} from "./content/recommendations";
export {
  recommendationMatrix,
  resultMessages,
  services,
} from "./content/recommendations";

export function getRecommendations(pathway: PathwayId, level: AssessmentLevel) {
  const entry = recommendationMatrix[pathway][level];
  return {
    message: resultMessages[level],
    nextStep: entry.nextStep,
    services: entry.services.map((id) => services[id]),
  };
}
