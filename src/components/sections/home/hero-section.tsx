import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, NextEventCard } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { Event } from "@/content/types";

export interface HeroSectionProps extends React.ComponentProps<"section"> {
  nextEvent?: Event;
}

export function HeroSection({ nextEvent, className, ...props }: HeroSectionProps) {
  const t = useTranslations("home.hero");

  return (
    <section
      className={cn(
        "py-16 sm:py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Heading, Value Prop, CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <Eyebrow hasDot>{t("eyebrow")}</Eyebrow>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-foreground">
            <span>{t("titleLine1")}</span>
            <span className="text-primary block mt-1">{t("titleLine2")}</span>
          </h1>

          <p className="text-foreground-soft text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "xl" }),
                "gap-2 justify-center"
              )}
            >
              <span>{t("consultCta")}</span>
              <ArrowRight className="size-5 shrink-0" />
            </Link>

            <Link
              href="/events"
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "gap-2 justify-center"
              )}
            >
              <Calendar className="size-4 shrink-0 text-muted-foreground" />
              <span>{t("browseEvents")}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero NextEventCard */}
        {nextEvent && (
          <div className="lg:col-span-5 w-full">
            <NextEventCard event={nextEvent} />
          </div>
        )}
      </div>
    </section>
  );
}
