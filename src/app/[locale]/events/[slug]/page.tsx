import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { events, getEventBySlug } from "@/content";
import {
  EventHeader,
  EventRegistrationForm,
} from "@/components/sections/events";
import { ContactCTA } from "@/components/sections/home";
import { createLocalizedAlternates } from "@/lib/seo";
import { generateEventJsonLd, JsonLd } from "@/lib/json-ld";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const evt of events) {
      params.push({ locale, slug: evt.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const loc = locale as "th" | "en" | "de" | "zh" | "ar";
  const title = event.title[loc] || event.title.en || event.title.th;
  const summary = event.summary[loc] || event.summary.en || event.summary.th;

  return {
    title: `${title} | ${tMeta("siteName")}`,
    description: `${title} (${event.client}) — ${summary}`,
    alternates: createLocalizedAlternates(locale, `/events/${slug}`),
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = getEventBySlug(slug);
  if (!event) {
    notFound();
  }

  const loc = locale as "th" | "en" | "de" | "zh" | "ar";
  const title = event.title[loc] || event.title.en || event.title.th;
  const venue = event.venue[loc] || event.venue.en || event.venue.th;
  const summary = event.summary[loc] || event.summary.en || event.summary.th;

  return (
    <div className="flex flex-col">
      <JsonLd data={generateEventJsonLd(event, loc)} />
      <main className="py-16 md:py-24">
        <article className="max-w-4xl mx-auto px-4 md:px-8 space-y-16">
          <EventHeader event={event} />

          <section id="register" className="space-y-4">
            <EventRegistrationForm
              eventSlug={event.slug}
              eventTitle={title}
              eventDate={event.date}
              eventVenue={venue}
              eventSummary={summary}
            />
          </section>
        </article>
      </main>

      <ContactCTA />
    </div>
  );
}
