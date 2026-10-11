import { events } from "./events";
import { caseStudies } from "./case-studies";
import { clients } from "./clients";
import type { Event, CaseStudy, ClientIndustry } from "./types";

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

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((event) => event.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) => b.year - a.year);
}

export function getFeaturedCaseStudies(limit?: number): CaseStudy[] {
  const featured = caseStudies.filter((cs) => cs.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(currentSlug: string, limit: number = 2): CaseStudy[] {
  return caseStudies.filter((cs) => cs.slug !== currentSlug).slice(0, limit);
}

const caseStudyIndustryMap: Record<string, ClientIndustry> = {
  "Benz BKK": "consumer",
  "Thailand Trader Fair": "enterprise",
  "Asia Sourcing Show": "enterprise",
};

export function getCaseStudyIndustry(cs: CaseStudy): ClientIndustry {
  if (caseStudyIndustryMap[cs.client]) {
    return caseStudyIndustryMap[cs.client];
  }
  const found = clients.find(
    (c) => c.name.toLowerCase() === cs.client.toLowerCase()
  );
  return found?.industry || "tech";
}
