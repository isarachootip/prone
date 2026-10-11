"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CalendarX } from "lucide-react";
import type { Event } from "@/content/types";
import { EventFilter, type EventFilterValue } from "@/components/brand/event-filter";
import { EventCard } from "@/components/brand/event-card";

export interface EventsListingViewProps {
  events: Event[];
}

export function EventsListingView({ events }: EventsListingViewProps) {
  const t = useTranslations("eventsPage");
  const [filter, setFilter] = useState<EventFilterValue>("all");

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => e.status === "upcoming")
      .filter((e) => filter === "all" || e.type === filter)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <EventFilter value={filter} onChange={setFilter} />
        <span className="text-xs font-mono text-muted-foreground">
          {upcomingEvents.length} {upcomingEvents.length === 1 ? "event" : "events"}
        </span>
      </div>

      {upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {upcomingEvents.map((evt) => (
            <EventCard key={evt.slug} event={evt} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-surface-sunken border border-dashed border-border space-y-3">
          <CalendarX className="size-10 text-muted-foreground stroke-1" />
          <p className="text-foreground-soft font-medium text-base">
            {t("emptyUpcoming")}
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="text-xs font-mono text-primary hover:underline underline-offset-4 cursor-pointer"
          >
            Show all
          </button>
        </div>
      )}
    </div>
  );
}
