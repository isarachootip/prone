import { describe, it, expect } from "vitest";
import {
  getUpcomingEvents,
  getEventsByYear,
  getEventBySlug,
  getFeaturedCaseStudies,
  getCaseStudy,
  getAllCaseStudies,
  getRelatedCaseStudies,
  getCaseStudyIndustry,
  clients,
  siteConfig,
  caseStudies,
} from "@/content";

describe("Content Model & Query Helpers", () => {
  describe("getUpcomingEvents", () => {
    it("returns upcoming events sorted by date ascending", () => {
      const upcoming = getUpcomingEvents();
      expect(upcoming.length).toBeGreaterThan(0);
      expect(upcoming.every((e) => e.status === "upcoming")).toBe(true);

      for (let i = 0; i < upcoming.length - 1; i++) {
        const current = new Date(upcoming[i].date).getTime();
        const next = new Date(upcoming[i + 1].date).getTime();
        expect(current).toBeLessThanOrEqual(next);
      }
    });

    it("respects the limit argument", () => {
      const limited = getUpcomingEvents(2);
      expect(limited.length).toBeLessThanOrEqual(2);
    });
  });

  describe("getEventsByYear", () => {
    it("filters events by the specified year", () => {
      const events2026 = getEventsByYear(2026);
      expect(events2026.every((e) => new Date(e.date).getFullYear() === 2026)).toBe(true);
    });

    it("returns empty array for years with no events", () => {
      const events1999 = getEventsByYear(1999);
      expect(events1999).toEqual([]);
    });
  });

  describe("getEventBySlug", () => {
    it("finds event by slug", () => {
      const found = getEventBySlug("upcoming-tech-summit-2026");
      expect(found).toBeDefined();
      expect(found?.type).toBe("summit");
    });

    it("returns undefined for unknown slug", () => {
      const notFound = getEventBySlug("non-existent-event-slug");
      expect(notFound).toBeUndefined();
    });
  });

  describe("getFeaturedCaseStudies", () => {
    it("returns only featured case studies", () => {
      const featured = getFeaturedCaseStudies();
      expect(featured.length).toBeGreaterThan(0);
      expect(featured.every((cs) => cs.featured)).toBe(true);
    });

    it("respects limit argument", () => {
      const limited = getFeaturedCaseStudies(1);
      expect(limited.length).toBe(1);
    });
  });

  describe("getCaseStudy", () => {
    it("finds case study by slug", () => {
      const found = getCaseStudy("uipath-fusion-summit-bangkok");
      expect(found).toBeDefined();
      expect(found?.client).toBe("UiPath");
    });

    it("returns undefined for unknown slug", () => {
      const notFound = getCaseStudy("non-existent-event-slug");
      expect(notFound).toBeUndefined();
    });
  });

  describe("getAllCaseStudies", () => {
    it("returns all case studies sorted by year descending", () => {
      const all = getAllCaseStudies();
      expect(all.length).toBe(caseStudies.length);
      for (let i = 0; i < all.length - 1; i++) {
        expect(all[i].year).toBeGreaterThanOrEqual(all[i + 1].year);
      }
    });
  });

  describe("getRelatedCaseStudies", () => {
    it("excludes the current case study and limits results", () => {
      const related = getRelatedCaseStudies("uipath-fusion-summit-bangkok", 2);
      expect(related.length).toBeLessThanOrEqual(2);
      expect(related.every((cs) => cs.slug !== "uipath-fusion-summit-bangkok")).toBe(true);
    });
  });

  describe("getCaseStudyIndustry", () => {
    it("returns mapped or looked up industry correctly", () => {
      const csTech = caseStudies.find((c) => c.client === "UiPath")!;
      expect(getCaseStudyIndustry(csTech)).toBe("tech");

      const csConsumer = caseStudies.find((c) => c.client === "Benz BKK")!;
      expect(getCaseStudyIndustry(csConsumer)).toBe("consumer");
    });
  });

  describe("Quality & AGENTS.md Compliance", () => {
    it("includes confirmed client roster of 20 companies", () => {
      expect(clients.length).toBe(20);
      expect(clients.some((c) => c.name === "Cisco")).toBe(true);
      expect(clients.some((c) => c.name === "Huawei")).toBe(true);
    });

    it("uses brackets placeholder for unconfirmed metrics in case studies", () => {
      caseStudies.forEach((cs) => {
        expect(cs.challenge.th).toContain("[");
        expect(cs.whatWeDid.th).toContain("[");
        cs.results.forEach((r) => {
          expect(r.value).toContain("[");
        });
      });
    });

    it("has confirmed founding year 2004 and Bangkok address", () => {
      expect(siteConfig.foundedYear).toBe(2004);
      expect(siteConfig.address.th).toContain("206 ซอยรามอินทรา 57");
    });
  });
});
