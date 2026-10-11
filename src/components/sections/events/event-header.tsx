import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Calendar, MapPin, Building } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Event } from "@/content/types";
import { EventTypeBadge } from "@/components/brand/event-type-badge";
import { Countdown } from "@/components/brand/countdown";
import { AddToCalendar } from "@/components/brand/add-to-calendar";

export interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";
  const t = useTranslations("eventsPage");

  const title = event.title[locale] || event.title.en || event.title.th;
  const venue = event.venue[locale] || event.venue.en || event.venue.th;
  const summary = event.summary[locale] || event.summary.en || event.summary.th;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="space-y-8">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
        <span>{t("backToEvents")}</span>
      </Link>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <EventTypeBadge type={event.type} />
          <span className="text-muted-foreground/60 select-none">/</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Building className="size-3.5 text-primary" />
            {event.client}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.15]">
          {title}
        </h1>

        <p className="text-foreground-soft font-sans text-base md:text-lg max-w-3xl leading-relaxed">
          {summary}
        </p>

        {/* Date & Location Pill Bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-surface-sunken border border-border text-sm font-mono text-foreground-soft">
          <div className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-primary shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-muted-foreground/40 hidden sm:inline">•</span>
          <div className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-primary shrink-0" />
            <span>{venue}</span>
          </div>
        </div>

        {/* Countdown & Quick Add to Calendar */}
        {event.status === "upcoming" && (
          <div className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t("kickoffCountdown")}
              </span>
              <Countdown targetDate={event.date} />
            </div>

            <div className="shrink-0">
              <AddToCalendar
                event={{
                  title,
                  summary,
                  date: event.date,
                  venue,
                  slug: event.slug,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
