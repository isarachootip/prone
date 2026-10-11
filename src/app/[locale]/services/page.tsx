import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { services, caseStudies } from "@/content";
import { SectionHeading } from "@/components/brand/section-heading";
import { ServicesList } from "@/components/sections/services";
import { ContactCTA } from "@/components/sections/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tServices = await getTranslations({ locale, namespace: "servicesPage" });

  return {
    title: `${tServices("title")} | ${tMeta("siteName")}`,
    description: tServices("description"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServices = await getTranslations({ locale, namespace: "servicesPage" });

  return (
    <div className="flex flex-col">
      <main className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 md:space-y-20">
          <SectionHeading
            eyebrow={tServices("eyebrow")}
            title={tServices("title")}
            description={tServices("description")}
          />

          <ServicesList
            services={services}
            caseStudies={caseStudies}
            locale={locale as "th" | "en" | "de" | "zh" | "ar"}
            itemsTitle={tServices("itemsTitle")}
            relatedWorkTitle={tServices("relatedWorkTitle")}
          />
        </div>
      </main>

      <ContactCTA />
    </div>
  );
}
