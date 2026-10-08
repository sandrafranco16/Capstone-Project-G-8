/**
 * The early scaffold built /pathways/[slug] and /services/[slug] pages. The
 * real journeys now live on /assessment (one pathway per ?path=) and on the
 * /services page (one section per practice), and nothing links to the old
 * detail pages any more. They were still listed in the sitemap, so search
 * engines indexed thin pages that duplicate the live ones.
 *
 * Each old URL now redirects permanently to the place its content moved to,
 * so shared or bookmarked links keep working. Executive and board services
 * are part of the governance practice on /services.
 */
export const pathwayDestinations = {
  "launch-my-ai-career": "/assessment?path=career",
  "learn-ai-and-automation": "/assessment?path=learn",
  "govern-ai-responsibly": "/assessment?path=govern",
  "prepare-for-ai-risks": "/assessment?path=risk",
} as const;

export const serviceDestinations = {
  "career-development": "/services#career",
  "ai-and-automation": "/services#training",
  "ai-governance": "/services#governance",
  "executive-and-board": "/services#governance",
  "ai-risk-and-crisis": "/services#crisis",
} as const;

type PermanentRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export const detailPageRedirects: PermanentRedirect[] = [
  ...Object.entries(pathwayDestinations).map(([slug, destination]) => ({
    source: `/pathways/${slug}`,
    destination,
    permanent: true as const,
  })),
  ...Object.entries(serviceDestinations).map(([slug, destination]) => ({
    source: `/services/${slug}`,
    destination,
    permanent: true as const,
  })),
];
