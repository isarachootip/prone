import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAllCaseStudies } from "@/content";
import { SectionHeading } from "@/components/brand/section-heading";
import { WorkListingView } from "@/components/sections/work";
import { ContactCTA } from "@/components/sections/home";

import { createLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tWork = await getTranslations({ locale, namespace: "work" });

  return {
    title: `${tWork("title")} | ${tMeta("siteName")}`,
    description: tWork("description"),
    alternates: createLocalizedAlternates(locale, "/work"),
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tWork = await getTranslations({ locale, namespace: "work" });
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-col">
      <main className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
          <SectionHeading
            eyebrow={tWork("eyebrow")}
            title={tWork("title")}
            description={tWork("description")}
          />

          <WorkListingView caseStudies={caseStudies} />
        </div>
      </main>

      <ContactCTA />
    </div>
  );
}
