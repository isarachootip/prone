import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/content/types";
import { SocialIcons } from "./social-icons";

interface SiteFooterProps extends React.ComponentProps<"footer"> {
  config: SiteConfig;
  currentYear?: number;
}

export function SiteFooter({
  config,
  currentYear = 2026,
  className,
  ...props
}: SiteFooterProps) {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const locale = useLocale() as "th" | "en" | "de" | "zh" | "ar";

  const companyTitle = config.companyName[locale] || config.companyName.th;
  const addressText = config.address[locale] || config.address.th;

  return (
    <footer
      className={cn("border-t border-border bg-surface-sunken text-foreground-soft py-12", className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Address */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-display font-bold text-xl tracking-tight text-foreground flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-primary inline-block" />
              <span>{companyTitle}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {addressText}
            </p>
            <div className="font-mono text-xs text-muted-foreground pt-1">
              Est. {config.foundedYear} · Bangkok, Thailand
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {tFooter("quickLinks")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="hover:text-foreground transition-colors">
                  {tNav("events")}
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-foreground transition-colors">
                  {tNav("work")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {tFooter("contactTitle")}
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="font-mono text-xs text-muted-foreground">{config.contact.phone}</div>
              <div className="font-mono text-xs text-muted-foreground">{config.contact.email}</div>
            </div>
            <div className="pt-2">
              <SocialIcons links={config.social} colored />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>
            © {currentYear} {config.companyName.en}. {tFooter("allRightsReserved")}
          </div>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-foreground transition-colors">
              {tNav("contact")}
            </Link>
            <span>·</span>
            <Link href="/design" className="hover:text-foreground transition-colors">
              Design System
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
