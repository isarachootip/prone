import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { events } from "@/content";
import { SectionHeading } from "@/components/brand/section-heading";
import { YearTimeline } from "@/components/brand/year-timeline";
import { EventsListingView } from "@/components/sections/events";
import { ContactCTA } from "@/components/sections/home";

import { createLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tEvents = await getTranslations({ locale, namespace: "eventsPage" });

  return {
    title: `${tEvents("title")} | ${tMeta("siteName")}`,
    description: tEvents("description"),
    alternates: createLocalizedAlternates(locale, "/events"),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tEvents = await getTranslations({ locale, namespace: "eventsPage" });

  return (
    <div className="flex flex-col">
      <div className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 md:space-y-28">
          {/* Section 1: Upcoming Events Hub */}
          <section className="space-y-12">
            <SectionHeading
              as="h1"
              eyebrow={tEvents("eyebrow")}
              title={tEvents("upcomingTitle")}
              description={tEvents("description")}
            />
            <EventsListingView events={events} />
          </section>

          {/* Section 2: Historical Timeline */}
          <section className="space-y-12 pt-12 border-t border-border">
            <SectionHeading
              eyebrow="2004 – Present"
              title={tEvents("pastTitle")}
              description={tEvents("pastDescription")}
            />
            <YearTimeline events={events} startYear={2004} endYear={2027} defaultYear={2026} />
          </section>
        </div>
      </div>

      <ContactCTA />
    </div>
  );
}
