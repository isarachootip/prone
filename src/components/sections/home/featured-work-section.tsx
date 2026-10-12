import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading, CaseStudyCard } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/types";

export interface FeaturedWorkSectionProps extends React.ComponentProps<"section"> {
  caseStudies: CaseStudy[];
}

export function FeaturedWorkSection({
  caseStudies,
  className,
  ...props
}: FeaturedWorkSectionProps) {
  const t = useTranslations("home.sections.featuredWork");

  return (
    <section
      className={cn("py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8 space-y-10", className)}
      {...props}
    >
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        action={
          <Link
            href="/work"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((cs, idx) => (
          <CaseStudyCard key={cs.slug} caseStudy={cs} priority={idx === 0} />
        ))}
      </div>
    </section>
  );
}
