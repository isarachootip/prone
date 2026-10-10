"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Event } from "@/content/types";
import { EventTypeBadge } from "./event-type-badge";
import { AddToCalendar } from "./add-to-calendar";

export interface EventCardProps extends React.ComponentProps<typeof Card> {
  event: Event;
}

export function EventCard({ event, className, ...props }: EventCardProps) {
  const t = useTranslations("events");
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";

  const title = event.title[locale] || event.title.th;
  const venue = event.venue[locale] || event.venue.th;
  const summary = event.summary[locale] || event.summary.th;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card interactive className={cn("flex flex-col justify-between h-full", className)} {...props}>
      <CardHeader className="space-y-3 pb-3">
        {/* Top: Date & EventType Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Calendar className="size-3.5 text-primary shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <EventTypeBadge type={event.type} />
        </div>

        {/* Client Tag */}
        {event.client && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-medium block">
            {event.client}
          </span>
        )}

        {/* Title */}
        <h4 className="font-display font-bold text-lg text-foreground tracking-tight line-clamp-2 leading-snug">
          {title}
        </h4>
      </CardHeader>

      <CardContent className="space-y-2 py-0 text-sm text-foreground-soft">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary shrink-0" />
          <span className="line-clamp-1">{venue}</span>
        </div>
        {summary && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
            {summary}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-4 flex items-center justify-between gap-2 border-t border-border mt-4">
        <Link
          href={event.registerUrl || `/events/${event.slug}`}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          {t("registerFree")}
        </Link>
        <AddToCalendar
          event={{
            title,
            date: event.date,
            venue,
            summary,
            slug: event.slug,
          }}
          size="sm"
          variant="outline"
        />
      </CardFooter>
    </Card>
  );
}
