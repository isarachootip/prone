import { events } from "./events";
import { caseStudies } from "./case-studies";
import type { Event, CaseStudy } from "./types";

export * from "./types";
export * from "./clients";
export * from "./events";
export * from "./case-studies";
export * from "./services";
export * from "./site";

export function getUpcomingEvents(limit?: number): Event[] {
  const filtered = events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export function getEventsByYear(year: number): Event[] {
  return events.filter((event) => new Date(event.date).getFullYear() === year);
}

export function getFeaturedCaseStudies(limit?: number): CaseStudy[] {
  const featured = caseStudies.filter((cs) => cs.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
