import React from "react";
import { useLocale, useTranslations } from "next-intl";
import type { CaseStudy } from "@/content/types";
import { StatNumber } from "@/components/brand/stat-number";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface CaseStudyBlocksProps {
  caseStudy: CaseStudy;
}

export function CaseStudyBlocks({ caseStudy }: CaseStudyBlocksProps) {
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";
  const t = useTranslations("caseStudyDetail");

  const challengeText = caseStudy.challenge[locale] || caseStudy.challenge.en || caseStudy.challenge.th;
  const whatWeDidText = caseStudy.whatWeDid[locale] || caseStudy.whatWeDid.en || caseStudy.whatWeDid.th;
  const hasResults = caseStudy.results && caseStudy.results.length > 0;

  return (
    <div className="space-y-8">
      {/* 2 Columns: Challenge & What We Did */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Block 1: The Challenge */}
        <Card className="bg-card border-border">
          <CardHeader className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              01 / Context
            </span>
            <CardTitle className="font-display text-xl md:text-2xl text-foreground font-bold">
              {t("challengeTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-soft font-sans leading-relaxed text-sm md:text-base whitespace-pre-line">
              {challengeText}
            </p>
          </CardContent>
        </Card>

        {/* Block 2: What We Did */}
        <Card className="bg-card border-border">
          <CardHeader className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              02 / Execution
            </span>
            <CardTitle className="font-display text-xl md:text-2xl text-foreground font-bold">
              {t("whatWeDidTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground-soft font-sans leading-relaxed text-sm md:text-base whitespace-pre-line">
              {whatWeDidText}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Block 3: Measurable Results */}
      {hasResults && (
        <Card className="bg-surface-sunken border-border overflow-hidden">
          <CardHeader className="space-y-1 border-b border-border pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
              03 / Impact
            </span>
            <CardTitle className="font-display text-xl md:text-2xl text-foreground font-bold">
              {t("resultsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.results.map((res, i) => {
                const label = res.label[locale] || res.label.en || res.label.th;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-card border border-border flex flex-col justify-center"
                  >
                    <StatNumber
                      value={res.value}
                      label={label}
                      size="lg"
                      tone="brand"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
