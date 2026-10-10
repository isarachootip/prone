import { getPayload } from "payload";
import config from "@payload-config";
import {
  getUpcomingEvents as getStaticUpcomingEvents,
  getFeaturedCaseStudies as getStaticFeaturedCaseStudies,
  getCaseStudy as getStaticCaseStudy,
  clients as staticClients,
} from "./index";
import type { Event, CaseStudy, Client } from "./types";
import type {
  Event as PayloadEvent,
  CaseStudy as PayloadCaseStudy,
  Client as PayloadClient,
} from "@/payload/payload-types";

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function fetchUpcomingEvents(limit?: number): Promise<Event[]> {
  try {
    if (!process.env.DATABASE_URI) return getStaticUpcomingEvents(limit);
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "events",
      where: { status: { equals: "upcoming" } },
      sort: "date",
      limit: limit || 10,
    });

    if (!result.docs || result.docs.length === 0) {
      return getStaticUpcomingEvents(limit);
    }

    return result.docs.map((doc: PayloadEvent) => ({
      slug: doc.slug,
      title: {
        th: normalizeString(doc.title),
        en: normalizeString(doc.title),
      },
      type: doc.type as Event["type"],
      date: doc.date,
      venue: {
        th: normalizeString(doc.venue),
        en: normalizeString(doc.venue),
      },
      client: doc.client,
      summary: {
        th: normalizeString(doc.summary),
        en: normalizeString(doc.summary),
      },
      registerUrl: doc.registerUrl || undefined,
      status: doc.status,
    }));
  } catch {
    return getStaticUpcomingEvents(limit);
  }
}

export async function fetchFeaturedCaseStudies(limit?: number): Promise<CaseStudy[]> {
  try {
    if (!process.env.DATABASE_URI) return getStaticFeaturedCaseStudies(limit);
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "case-studies",
      where: { featured: { equals: true } },
      limit: limit || 10,
    });

    if (!result.docs || result.docs.length === 0) {
      return getStaticFeaturedCaseStudies(limit);
    }

    return result.docs.map((doc: PayloadCaseStudy) => ({
      slug: doc.slug,
      title: doc.title,
      client: doc.client,
      year: doc.year,
      eventType: doc.eventType as CaseStudy["eventType"],
      challenge: {
        th: normalizeString(doc.challenge),
        en: normalizeString(doc.challenge),
      },
      whatWeDid: {
        th: normalizeString(doc.whatWeDid),
        en: normalizeString(doc.whatWeDid),
      },
      results: (doc.results || []).map((r) => ({
        label: {
          th: normalizeString(r.label),
          en: normalizeString(r.label),
        },
        value: r.value,
      })),
      gallery: [],
      featured: Boolean(doc.featured),
    }));
  } catch {
    return getStaticFeaturedCaseStudies(limit);
  }
}

export async function fetchCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  try {
    if (!process.env.DATABASE_URI) return getStaticCaseStudy(slug);
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (!result.docs || result.docs.length === 0) {
      return getStaticCaseStudy(slug);
    }

    const doc = result.docs[0];
    return {
      slug: doc.slug,
      title: doc.title,
      client: doc.client,
      year: doc.year,
      eventType: doc.eventType as CaseStudy["eventType"],
      challenge: {
        th: normalizeString(doc.challenge),
        en: normalizeString(doc.challenge),
      },
      whatWeDid: {
        th: normalizeString(doc.whatWeDid),
        en: normalizeString(doc.whatWeDid),
      },
      results: (doc.results || []).map((r) => ({
        label: {
          th: normalizeString(r.label),
          en: normalizeString(r.label),
        },
        value: r.value,
      })),
      gallery: [],
      featured: Boolean(doc.featured),
    };
  } catch {
    return getStaticCaseStudy(slug);
  }
}

export async function fetchClients(): Promise<Client[]> {
  try {
    if (!process.env.DATABASE_URI) return staticClients;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "clients",
      limit: 100,
    });

    if (!result.docs || result.docs.length === 0) {
      return staticClients;
    }

    return result.docs.map((doc: PayloadClient) => ({
      name: doc.name,
      industry: doc.industry,
    }));
  } catch {
    return staticClients;
  }
}
