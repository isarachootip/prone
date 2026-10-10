"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading, EventFilter, type EventFilterValue, EventCard } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { Event } from "@/content/types";

export interface UpcomingEventsSectionProps extends React.ComponentProps<"section"> {
  events: Event[];
}

export function UpcomingEventsSection({
  events,
  className,
  ...props
}: UpcomingEventsSectionProps) {
  const t = useTranslations("home.sections.upcomingEvents");
  const [filter, setFilter] = useState<EventFilterValue>("all");

  const filteredEvents =
    filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <section
      className={cn("py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8 space-y-10", className)}
      {...props}
    >
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        action={
          <Link
            href="/events"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />

      <div className="flex items-center justify-between gap-4">
        <EventFilter value={filter} onChange={setFilter} />
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-xl border border-border bg-card text-center text-sm text-muted-foreground">
          No upcoming events found for this category.
        </div>
      )}
    </section>
  );
}
