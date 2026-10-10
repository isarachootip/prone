import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  HeroSection,
  ClientMarquee,
  UpcomingEventsSection,
  RoadmapSection,
  ServicesSection,
  FeaturedWorkSection,
  StatsSection,
  ConnectSection,
  ContactCTA,
} from "@/components/sections/home";
import {
  getUpcomingEvents,
  getFeaturedCaseStudies,
  clients,
  services,
  siteConfig,
} from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "home.hero" });

  return {
    title: `${tMeta("siteName")} — ${tHero("titleLine1")} ${tHero("titleLine2")}`,
    description: tHero("description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Content from typed content model (src/content)
  const upcomingEvents = getUpcomingEvents(10);
  const featuredCaseStudies = getFeaturedCaseStudies(3);
  const clientList = clients;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <HeroSection nextEvent={upcomingEvents[0]} />

      {/* 2. Client Logo Wall (Marquee) */}
      <ClientMarquee clients={clientList} />

      {/* 3. Upcoming Events Section */}
      <UpcomingEventsSection events={upcomingEvents} />

      {/* 4. Roadmap Timeline */}
      <RoadmapSection events={upcomingEvents} />

      {/* 5. Services Section */}
      <ServicesSection services={services} />

      {/* 6. Featured Work Section */}
      <FeaturedWorkSection caseStudies={featuredCaseStudies} />

      {/* 7. Stats Section */}
      <StatsSection />

      {/* 8. Connect Section (LINE & Newsletter) */}
      <ConnectSection social={siteConfig.social} />

      {/* 9. Contact CTA Banner */}
      <ContactCTA />
    </div>
  );
}
