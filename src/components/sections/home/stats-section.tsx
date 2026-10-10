import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeading, StatNumber } from "@/components/brand";
import { cn } from "@/lib/utils";

export type StatsSectionProps = React.ComponentProps<"section">;

export function StatsSection({ className, ...props }: StatsSectionProps) {
  const t = useTranslations("home.sections.stats");

  return (
    <section
      className={cn("bg-surface-sunken/50 border-y border-border py-16 sm:py-20", className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <SectionHeading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="pt-6 sm:pt-0 sm:px-4">
            <StatNumber
              value={t("foundedValue")}
              label={t("foundedLabel")}
              size="lg"
              tone="brand"
              className="items-center"
            />
          </div>
          <div className="pt-6 sm:pt-0 sm:px-4">
            <StatNumber
              value={t("eventsValue")}
              label={t("eventsLabel")}
              size="lg"
              tone="default"
              className="items-center"
            />
          </div>
          <div className="pt-6 sm:pt-0 sm:px-4">
            <StatNumber
              value={t("clientsValue")}
              label={t("clientsLabel")}
              size="lg"
              tone="default"
              className="items-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
