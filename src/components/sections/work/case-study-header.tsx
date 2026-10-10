import React from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/content/types";
import { EventTypeBadge } from "@/components/brand/event-type-badge";
import { Badge } from "@/components/ui/badge";

export interface CaseStudyHeaderProps {
  caseStudy: CaseStudy;
}

export function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const t = useTranslations("caseStudyDetail");

  return (
    <header className="space-y-6">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
        <span>{t("backToWork")}</span>
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-primary">
            {caseStudy.client}
          </span>
          <span className="text-muted-foreground/60 select-none">/</span>
          <Badge variant="outline" className="font-mono text-xs">
            {caseStudy.year}
          </Badge>
          <EventTypeBadge type={caseStudy.eventType} />
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.15]">
          {caseStudy.title}
        </h1>
      </div>
    </header>
  );
}
