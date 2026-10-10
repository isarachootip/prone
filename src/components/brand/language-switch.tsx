"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LanguageSwitchProps = React.ComponentProps<"div">;

export function LanguageSwitch({ className, ...props }: LanguageSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const locales = [
    { code: "th", label: "TH" },
    { code: "en", label: "EN" },
  ] as const;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-surface-sunken p-0.5 border border-border text-xs font-mono font-medium",
        className
      )}
      role="group"
      aria-label="Language Selector"
      {...props}
    >
      {locales.map((item) => {
        const isActive = locale === item.code;
        return (
          <Link
            key={item.code}
            href={pathname}
            locale={item.code}
            className={cn(
              "px-2.5 py-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-card text-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
