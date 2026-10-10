"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Calendar, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface CalendarEventData {
  title: string;
  date: string; // ISO date string
  venue?: string;
  summary?: string;
  slug?: string;
}

export interface AddToCalendarProps {
  event: CalendarEventData;
  size?: "default" | "sm" | "lg" | "xl" | "xs";
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  label?: string;
}

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function AddToCalendar({
  event,
  size = "default",
  variant = "outline",
  className,
  label,
}: AddToCalendarProps) {
  const t = useTranslations("events");

  const startDate = new Date(event.date);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // default 4-hour window

  const handleDownloadIcs = () => {
    const startStr = formatIcsDate(startDate);
    const endStr = formatIcsDate(endDate);
    const stampStr = formatIcsDate(new Date());
    const uid = `${event.slug || "event"}-${startDate.getTime()}@prone.network`;

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//PR One Network//Events//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${stampStr}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${event.title.replace(/\n/g, " ")}`,
      `DESCRIPTION:${(event.summary || "").replace(/\n/g, " ")}`,
      `LOCATION:${(event.venue || "").replace(/\n/g, " ")}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug || "pr-one-event"}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getGoogleCalendarUrl = () => {
    const startStr = formatIcsDate(startDate);
    const endStr = formatIcsDate(endDate);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${startStr}/${endStr}`,
      details: event.summary || "",
      location: event.venue || "",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleGoogleCalendar = () => {
    window.open(getGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={variant} size={size} className={cn("gap-1.5", className)}>
            <Calendar className="size-4 shrink-0" />
            <span>{label || t("addToCalendar")}</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleDownloadIcs} className="gap-2 cursor-pointer">
          <Download className="size-4 text-muted-foreground" />
          <span className="text-xs">{t("downloadIcs")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGoogleCalendar} className="gap-2 cursor-pointer">
          <ExternalLink className="size-4 text-muted-foreground" />
          <span className="text-xs">{t("googleCalendar")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
