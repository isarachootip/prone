import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig, clients } from "@/content";
import {
  AboutHero,
  AboutHistory,
  AboutClients,
  AboutTeam,
} from "@/components/sections/about";
import { ContactCTA } from "@/components/sections/home";

import { createLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tAbout = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: `${tAbout("title")} | ${tMeta("siteName")}`,
    description: tAbout("positioning"),
    alternates: createLocalizedAlternates(locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tAbout = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <div className="flex flex-col">
      <div className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 md:space-y-28">
          <AboutHero
            eyebrow={tAbout("eyebrow")}
            title={tAbout("title")}
            positioning={tAbout("positioning")}
          />

          <AboutHistory
            eyebrow={tAbout("historyEyebrow")}
            title={tAbout("historyTitle")}
            text={tAbout("historyText")}
            foundedYear={siteConfig.foundedYear}
          />

          <AboutClients
            eyebrow={tAbout("clientsEyebrow")}
            title={tAbout("clientsTitle")}
            description={tAbout("clientsDescription")}
            clients={clients}
          />

          <AboutTeam
            eyebrow={tAbout("teamEyebrow")}
            title={tAbout("teamTitle")}
            notice={tAbout("teamNotice")}
          />
        </div>
      </div>

      <ContactCTA />
    </div>
  );
}
