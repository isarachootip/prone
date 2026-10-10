import React from "react";
import { useTranslations } from "next-intl";
import { SectionHeading, SocialConnect, NewsletterSignup } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { SiteSocialLinks } from "@/content/types";

export interface ConnectSectionProps extends React.ComponentProps<"section"> {
  social: SiteSocialLinks;
}

export function ConnectSection({ social, className, ...props }: ConnectSectionProps) {
  const t = useTranslations("home.sections.connect");

  return (
    <section
      className={cn("py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8 space-y-10", className)}
      {...props}
    >
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <SocialConnect links={social} className="h-full" />
        <NewsletterSignup layout="card" className="h-full" />
      </div>
    </section>
  );
}
