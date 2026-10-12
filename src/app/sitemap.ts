import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { events, caseStudies } from "@/content";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/events", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  // Helper to build hreflang alternates
  function buildAlternates(path: string) {
    const languages: Record<string, string> = {};
    for (const loc of routing.locales) {
      languages[loc] = `${siteUrl}/${loc}${path}`;
    }
    languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${path}`;
    return { languages };
  }

  // 1. Static Routes across all locales
  for (const route of staticRoutes) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: buildAlternates(route.path),
      });
    }
  }

  // 2. Dynamic Event Routes
  for (const event of events) {
    const eventPath = `/events/${event.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${eventPath}`,
        lastModified: new Date(event.date),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: buildAlternates(eventPath),
      });
    }
  }

  // 3. Dynamic Case Study Routes
  for (const study of caseStudies) {
    const studyPath = `/work/${study.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${studyPath}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: buildAlternates(studyPath),
      });
    }
  }

  return entries;
}
