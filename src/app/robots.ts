import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/design", "/design", "/admin", "/admin/*", "/api/*"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
