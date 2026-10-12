import { routing } from "@/i18n/routing";

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://prone.network";

  return url.replace(/\/+$/, "");
}

export interface LocalizedAlternates {
  canonical: string;
  languages: Record<string, string>;
}

export function createLocalizedAlternates(
  locale: string,
  pathname = ""
): LocalizedAlternates {
  const baseUrl = getSiteUrl();
  const cleanPath = pathname ? `/${pathname.replace(/^\/+/, "")}` : "";

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}${cleanPath}`;
  }
  // Default fallback language
  languages["x-default"] = `${baseUrl}/${routing.defaultLocale}${cleanPath}`;

  return {
    canonical: `${baseUrl}/${locale}${cleanPath}`,
    languages,
  };
}
