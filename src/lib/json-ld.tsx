import React from "react";
import type { Event as EventContent } from "@/content/types";
import { siteConfig } from "@/content";
import { getSiteUrl } from "./seo";

export function generateOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PR One Network Co., Ltd.",
    alternateName: "PR One",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    foundingDate: "2004",
    address: {
      "@type": "PostalAddress",
      streetAddress: "206 Soi Ram Intra 57, Tha Raeng",
      addressLocality: "Bang Khen",
      addressRegion: "Bangkok",
      postalCode: "10220",
      addressCountry: "TH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
    ].filter(Boolean),
  };
}

export function generateEventJsonLd(
  event: EventContent,
  locale: "th" | "en" | "de" | "zh" | "ar"
) {
  const siteUrl = getSiteUrl();
  const eventTitle = event.title[locale] || event.title.th;
  const eventVenue = event.venue[locale] || event.venue.th;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventTitle,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: eventVenue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangkok",
        addressCountry: "TH",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "PR One Network Co., Ltd.",
      url: siteUrl,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
