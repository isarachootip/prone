import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeading, YearTimeline } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { Event } from "@/content/types";

export interface RoadmapSectionProps extends React.ComponentProps<"section"> {
  events: Event[];
}

export function RoadmapSection({ events, className, ...props }: RoadmapSectionProps) {
  const t = useTranslations("home.sections.roadmap");

  return (
    <section
      className={cn("py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8 space-y-10", className)}
      {...props}
    >
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <YearTimeline events={events} defaultYear={2026} />
    </section>
  );
}
