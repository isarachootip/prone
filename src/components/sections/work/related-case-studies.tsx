import React from "react";
import { useTranslations } from "next-intl";
import type { CaseStudy } from "@/content/types";
import { SectionHeading } from "@/components/brand/section-heading";
import { CaseStudyCard } from "@/components/brand/case-study-card";

export interface RelatedCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export function RelatedCaseStudies({ caseStudies }: RelatedCaseStudiesProps) {
  const t = useTranslations("caseStudyDetail");

  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow={t("relatedEyebrow")}
        title={t("relatedTitle")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.slug} caseStudy={cs} />
        ))}
      </div>
    </section>
  );
}
