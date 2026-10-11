import React from "react";
import { Check } from "lucide-react";
import type { Service, CaseStudy } from "@/content/types";
import { CaseStudyCard } from "@/components/brand/case-study-card";
import { cn } from "@/lib/utils";

interface ServiceSectionCardProps {
  service: Service;
  index: number;
  locale: "th" | "en" | "de" | "zh" | "ar";
  relatedStudies: CaseStudy[];
  itemsTitle: string;
  relatedWorkTitle: string;
  className?: string;
}

export function ServiceSectionCard({
  service,
  index,
  locale,
  relatedStudies,
  itemsTitle,
  relatedWorkTitle,
  className,
}: ServiceSectionCardProps) {
  const serviceIndexStr = String(index + 1).padStart(2, "0");
  const title = service.title[locale] || service.title.th;
  const description = service.description[locale] || service.description.th;
  const items = service.items[locale] || service.items.th;

  return (
    <article
      id={service.id}
      className={cn(
        "rounded-2xl border border-border bg-card p-6 md:p-10 scroll-mt-24 space-y-8",
        className
      )}
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            {serviceIndexStr}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Core Service
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-foreground-soft text-base md:text-lg leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Sub-items Grid */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {itemsTitle}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-surface-sunken border border-border"
            >
              <div className="size-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3" />
              </div>
              <span className="text-sm font-medium text-foreground leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Case Studies (1-2) */}
      {relatedStudies.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-border">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {relatedWorkTitle}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedStudies.slice(0, 2).map((study) => (
              <CaseStudyCard key={study.slug} caseStudy={study} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
