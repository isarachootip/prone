"use client";

import React, { useState } from "react";
import {
  EventTypeBadge,
  Countdown,
  AddToCalendar,
  NextEventCard,
  EventCard,
  EventFilter,
  type EventFilterValue,
  YearTimeline,
  CaseStudyCard,
  SocialConnect,
  NewsletterSignup,
} from "@/components/brand";
import { events } from "@/content/events";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site";

export function BrandEventsShowcase() {
  const [filter, setFilter] = useState<EventFilterValue>("all");
  const sampleEvent = events[0];
  const sampleCaseStudy = caseStudies[0];

  const filteredEvents =
    filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <div className="space-y-10 pt-6 border-t border-border">
      <div>
        <h3 className="text-xl font-bold font-display tracking-tight text-foreground">
          Part 2: Events & Case Study Components
        </h3>
        <p className="text-sm text-foreground-soft mt-1">
          Specialized components for event registration, countdowns, timelines, and case studies.
        </p>
      </div>

      {/* 6. EventTypeBadge */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-3">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          6. EventTypeBadge (All 4 Types)
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <EventTypeBadge type="summit" />
          <EventTypeBadge type="roadshow" />
          <EventTypeBadge type="workshop" />
          <EventTypeBadge type="seminar" />
        </div>
      </div>

      {/* 7. Countdown */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          7. Countdown (Boxes & Inline Variants)
        </span>
        <div className="space-y-4 max-w-md">
          <Countdown targetDate="2026-11-15T09:00:00Z" variant="boxes" />
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground font-mono">Inline:</span>
            <Countdown targetDate="2026-11-15T09:00:00Z" variant="inline" />
          </div>
        </div>
      </div>

      {/* 7b. AddToCalendar */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-3">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          7b. AddToCalendar (Google / Apple / Outlook Dropdown)
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <AddToCalendar
            event={{
              title: sampleEvent.title.th,
              date: sampleEvent.date,
              venue: sampleEvent.venue.th,
              summary: sampleEvent.summary.th,
              slug: sampleEvent.slug,
            }}
          />
        </div>
      </div>

      {/* 8. NextEventCard (Hero) */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          8. NextEventCard (Hero Component)
        </span>
        <div className="max-w-xl">
          <NextEventCard event={sampleEvent} />
        </div>
      </div>

      {/* 9. EventFilter & EventCard Grid */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            9. EventFilter & EventCard Grid
          </span>
          <EventFilter value={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((evt) => (
            <EventCard key={evt.slug} event={evt} />
          ))}
        </div>
      </div>

      {/* 10. YearTimeline */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          10. YearTimeline (2004 → 2027 Open Slot, Keyboard Accessible)
        </span>
        <YearTimeline events={events} defaultYear={2026} />
      </div>

      {/* 11. CaseStudyCard */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          11. CaseStudyCard (Featured Results & Cover)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <CaseStudyCard caseStudy={sampleCaseStudy} />
          {caseStudies[1] && <CaseStudyCard caseStudy={caseStudies[1]} />}
        </div>
      </div>

      {/* 12. SocialConnect & NewsletterSignup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            12. SocialConnect (LINE OA & Links)
          </span>
          <SocialConnect links={siteConfig.social} />
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            13. NewsletterSignup (Zod + Toast)
          </span>
          <NewsletterSignup layout="card" />
        </div>
      </div>
    </div>
  );
}
