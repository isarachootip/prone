import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/brand/section-heading";
import {
  ContactQuickCards,
  ContactLocationCard,
  ContactBriefForm,
} from "@/components/sections/contact";

import { createLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tContact = await getTranslations({ locale, namespace: "contactPage" });

  return {
    title: `${tContact("title")} | ${tMeta("siteName")}`,
    description: tContact("description"),
    alternates: createLocalizedAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tContact = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <main className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        <SectionHeading
          eyebrow={tContact("eyebrow")}
          title={tContact("title")}
          description={tContact("description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Channels & Office Location */}
          <aside className="lg:col-span-5 space-y-6">
            <ContactQuickCards
              title={tContact("quickChannels.title")}
              lineTitle={tContact("quickChannels.lineTitle")}
              lineAction={tContact("quickChannels.lineAction")}
              phoneTitle={tContact("quickChannels.phoneTitle")}
              emailTitle={tContact("quickChannels.emailTitle")}
            />

            <ContactLocationCard
              title={tContact("location.title")}
              openMaps={tContact("location.openMaps")}
              locale={locale as "th" | "en" | "de" | "zh" | "ar"}
            />
          </aside>

          {/* Right Column: Brief Inquiry Form */}
          <section className="lg:col-span-7">
            <ContactBriefForm />
          </section>
        </div>
      </div>
    </main>
  );
}
