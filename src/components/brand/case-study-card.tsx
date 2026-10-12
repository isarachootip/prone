import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/content/types";
import { EventTypeBadge } from "./event-type-badge";
import { StatNumber } from "./stat-number";

export interface CaseStudyCardProps extends React.ComponentProps<typeof Card> {
  caseStudy: CaseStudy;
  priority?: boolean;
}

export function CaseStudyCard({ caseStudy, priority = false, className, ...props }: CaseStudyCardProps) {
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";
  const coverImage = caseStudy.gallery?.[0];
  const featuredResults = (caseStudy.results || []).slice(0, 2);

  return (
    <Card interactive className={cn("overflow-hidden flex flex-col justify-between h-full group/study", className)} {...props}>
      <div>
        {/* Cover Image or Fallback */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border flex items-center justify-center">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover/study:scale-105"
            />
          ) : (
            <div className="size-full flex flex-col items-center justify-center p-4 text-center select-none bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]">
              <span className="font-display font-bold text-lg text-foreground-soft tracking-wider opacity-60">
                {caseStudy.client}
              </span>
              <span className="font-mono text-xs text-muted-foreground mt-1">
                {caseStudy.year} · Case Study
              </span>
            </div>
          )}
        </div>

        <CardHeader className="space-y-3 pt-5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
              {caseStudy.client}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{caseStudy.year}</span>
              <EventTypeBadge type={caseStudy.eventType} />
            </div>
          </div>

          <h4 className="font-display font-bold text-xl text-foreground tracking-tight line-clamp-2 leading-snug group-hover/study:text-primary transition-colors">
            {caseStudy.title}
          </h4>
        </CardHeader>

        {/* Featured Key Results (Max 2) */}
        {featuredResults.length > 0 && (
          <CardContent className="pt-0 pb-4">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-surface-sunken border border-border">
              {featuredResults.map((res, i) => (
                <StatNumber
                  key={i}
                  value={res.value}
                  label={res.label[locale] || res.label.th}
                  size="md"
                  tone="brand"
                />
              ))}
            </div>
          </CardContent>
        )}
      </div>

      <CardFooter className="pt-2 pb-5 flex items-center justify-between border-t border-border text-xs font-mono text-muted-foreground">
        <Link
          href={`/work/${caseStudy.slug}`}
          className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-sans font-medium"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
