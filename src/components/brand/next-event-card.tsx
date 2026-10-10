"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Event } from "@/content/types";
import { Eyebrow } from "./eyebrow";
import { EventTypeBadge } from "./event-type-badge";
import { Countdown } from "./countdown";
import { AddToCalendar } from "./add-to-calendar";

export interface NextEventCardProps extends React.ComponentProps<"div"> {
  event: Event;
}

export function NextEventCard({ event, className, ...props }: NextEventCardProps) {
  const t = useTranslations("events");
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";

  const title = event.title[locale] || event.title.th;
  const venue = event.venue[locale] || event.venue.th;
  const summary = event.summary[locale] || event.summary.th;

  // Format date display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Top Header: Eyebrow + Type Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Eyebrow hasDot>{t("nextOnStage")}</Eyebrow>
        <EventTypeBadge type={event.type} />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight leading-snug">
          {title}
        </h3>
        {summary && (
          <p className="text-sm text-foreground-soft line-clamp-2 leading-relaxed">
            {summary}
          </p>
        )}
      </div>

      {/* Meta: Date & Location */}
      <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground pt-1">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-4 text-primary shrink-0" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="size-4 text-primary shrink-0" />
          <span>{venue}</span>
        </div>
      </div>

      {/* Countdown Box */}
      <div className="pt-2">
        <Countdown targetDate={event.date} />
      </div>

      {/* CTA Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <Link
          href={event.registerUrl || "/contact"}
          className={cn(
            buttonVariants({ variant: "default", size: "xl" }),
            "flex-1 justify-center gap-2"
          )}
        >
          <span>{t("registerFree")}</span>
          <ArrowRight className="size-5 shrink-0" />
        </Link>
        <AddToCalendar
          event={{
            title,
            date: event.date,
            venue,
            summary,
            slug: event.slug,
          }}
          size="xl"
          variant="outline"
          className="justify-center"
        />
      </div>
    </div>
  );
}
