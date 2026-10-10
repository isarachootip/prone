import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { Service } from "@/content/types";

export interface ServicesSectionProps extends React.ComponentProps<"section"> {
  services: Service[];
}

export function ServicesSection({ services, className, ...props }: ServicesSectionProps) {
  const t = useTranslations("home.sections.services");
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const title = service.title[locale] || service.title.th;
          const description = service.description[locale] || service.description.th;
          const items = service.items[locale] || service.items.th;

          return (
            <Card
              key={service.id}
              interactive
              className={cn(
                "flex flex-col justify-between h-full group/service",
                index === 0 && "md:col-span-2 lg:col-span-1" // subtle hierarchy
              )}
            >
              <CardHeader className="space-y-3 pb-3">
                <span className="font-mono text-xs font-semibold text-primary">
                  0{index + 1}
                </span>
                <CardTitle className="font-display font-bold text-xl text-foreground tracking-tight group-hover/service:text-primary transition-colors">
                  {title}
                </CardTitle>
                <p className="text-sm text-foreground-soft leading-relaxed">
                  {description}
                </p>
              </CardHeader>

              <CardContent className="pt-2">
                <ul className="space-y-2 border-t border-border pt-4 text-xs font-sans text-muted-foreground">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
