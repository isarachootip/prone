"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Event } from "@/content/types";
import { EventCard } from "./event-card";

export interface YearTimelineProps extends React.ComponentProps<"div"> {
  events?: Event[];
  startYear?: number;
  endYear?: number;
  defaultYear?: number;
}

export function YearTimeline({
  events = [],
  startYear = 2004,
  endYear = 2027,
  defaultYear = 2026,
  className,
  ...props
}: YearTimelineProps) {
  const t = useTranslations("events");
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Generate range from startYear to endYear
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }

  // Filter events for selected year
  const yearEvents = events.filter((e) => new Date(e.date).getFullYear() === selectedYear);
  const isOpenSlot = selectedYear === endYear;

  // Keyboard navigation for tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % years.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + years.length) % years.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = years.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const targetYear = years[nextIndex];
      setSelectedYear(targetYear);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <div className={cn("space-y-6 w-full", className)} {...props}>
      {/* Horizontal timeline bar */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Event Roadmap by Year"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-border"
      >
        {years.map((year, idx) => {
          const isSelected = selectedYear === year;
          const isLastYear = year === endYear;

          return (
            <button
              key={year}
              id={`tab-${year}`}
              role="tab"
              type="button"
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected}
              aria-controls={`panel-${year}`}
              onClick={() => setSelectedYear(year)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "px-3 py-1.5 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "bg-primary text-primary-foreground font-bold shadow-xs"
                  : isLastYear
                    ? "border border-dashed border-primary/50 text-primary hover:bg-primary/10"
                    : "text-foreground-soft hover:text-foreground hover:bg-surface-sunken"
              )}
            >
              {year} {isLastYear && "★"}
            </button>
          );
        })}
      </div>

      {/* Content for selected year */}
      <div
        id={`panel-${selectedYear}`}
        role="tabpanel"
        aria-labelledby={`tab-${selectedYear}`}
        tabIndex={0}
        className="outline-none"
      >
        {isOpenSlot ? (
          <div className="p-8 sm:p-10 rounded-2xl border border-dashed border-primary/40 bg-surface-sunken text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex size-12 rounded-full bg-primary/15 text-primary items-center justify-center mx-auto">
              <CalendarPlus className="size-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                {t("openSlotTitle")}
              </h4>
              <p className="text-sm text-foreground-soft max-w-lg mx-auto leading-relaxed">
                {t("openSlotDescription")}
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "gap-2")}
              >
                <span>{t("bookDate")}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        ) : yearEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearEvents.map((evt) => (
              <EventCard key={evt.slug} event={evt} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl border border-border bg-card text-center text-sm text-muted-foreground">
            {t("noEvents")}
          </div>
        )}
      </div>
    </div>
  );
}
