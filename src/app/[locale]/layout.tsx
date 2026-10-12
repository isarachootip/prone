import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontClassNames } from "@/app/fonts";
import { SiteHeader, SiteFooter } from "@/components/brand";
import { siteConfig } from "@/content/site";
import { getSiteUrl, createLocalizedAlternates } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("tagline"),
    alternates: createLocalizedAlternates(locale),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`dark ${fontClassNames}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono text-xs uppercase tracking-wider font-semibold"
          >
            {tCommon("skipToContent")}
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter config={siteConfig} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
