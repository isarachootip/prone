"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy, EventType, ClientIndustry } from "@/content/types";
import { getCaseStudyIndustry } from "@/content";
import { CaseStudyCard } from "@/components/brand/case-study-card";

export interface WorkListingViewProps {
  caseStudies: CaseStudy[];
}

const eventTypeOptions: ("all" | EventType)[] = [
  "all",
  "summit",
  "seminar",
  "roadshow",
  "workshop",
];

const industryOptions: ("all" | ClientIndustry)[] = [
  "all",
  "tech",
  "enterprise",
  "consumer",
  "government",
];

export function WorkListingView({ caseStudies }: WorkListingViewProps) {
  const tWork = useTranslations("work");
  const tEventTypes = useTranslations("events.types");
  const [selectedType, setSelectedType] = useState<"all" | EventType>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<"all" | ClientIndustry>("all");

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const matchesType = selectedType === "all" || cs.eventType === selectedType;
      const industry = getCaseStudyIndustry(cs);
      const matchesIndustry = selectedIndustry === "all" || industry === selectedIndustry;
      return matchesType && matchesIndustry;
    });
  }, [caseStudies, selectedType, selectedIndustry]);

  return (
    <div className="space-y-8">
      {/* Dual Filter Controls */}
      <div className="flex flex-col gap-5 p-5 rounded-2xl bg-surface-sunken border border-border">
        {/* Filter by Event Type */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            {tWork("filterEventType")}
          </div>
          <div role="radiogroup" aria-label={tWork("filterEventType")} className="flex flex-wrap gap-2">
            {eventTypeOptions.map((opt) => {
              const active = selectedType === opt;
              const label = opt === "all" ? tWork("all") : tEventTypes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedType(opt)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-mono transition-all duration-150 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "bg-card text-foreground-soft border border-border hover:border-border-strong hover:text-foreground hover:bg-card/80"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter by Industry */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            {tWork("filterIndustry")}
          </div>
          <div role="radiogroup" aria-label={tWork("filterIndustry")} className="flex flex-wrap gap-2">
            {industryOptions.map((ind) => {
              const active = selectedIndustry === ind;
              return (
                <button
                  key={ind}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedIndustry(ind)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-mono transition-all duration-150 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "bg-card text-foreground-soft border border-border hover:border-border-strong hover:text-foreground hover:bg-card/80"
                  )}
                >
                  {tWork(`industries.${ind}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Studies Grid or Empty State */}
      {filteredCaseStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCaseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-surface-sunken border border-dashed border-border space-y-3">
          <FolderSearch className="size-10 text-muted-foreground stroke-1" />
          <p className="text-foreground-soft font-medium text-base">
            {tWork("emptyState")}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedType("all");
              setSelectedIndustry("all");
            }}
            className="text-xs font-mono text-primary hover:underline underline-offset-4 cursor-pointer"
          >
            {tWork("all")}
          </button>
        </div>
      )}
    </div>
  );
}
