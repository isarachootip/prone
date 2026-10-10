import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ContactCTAProps = React.ComponentProps<"section">;

export function ContactCTA({ className, ...props }: ContactCTAProps) {
  const t = useTranslations("home.sections.contactCta");

  return (
    <section
      className={cn(
        "bg-surface-sunken border-t border-border py-20 md:py-24 text-center relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs font-mono text-primary">
          <Sparkles className="size-3.5" />
          <span>PR One Partner Network</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
          {t("title")}
        </h2>

        <p className="text-foreground-soft text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          {t("description")}
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              "gap-2 px-8"
            )}
          >
            <span>{t("ctaButton")}</span>
            <ArrowRight className="size-5 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
