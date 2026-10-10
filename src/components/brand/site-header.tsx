"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitch } from "./language-switch";
import { Menu } from "lucide-react";

type SiteHeaderProps = React.ComponentProps<"header">;

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: tNav("events"), href: "/events" },
    { label: tNav("work"), href: "/work" },
    { label: tNav("services"), href: "/services" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("contact"), href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-xl tracking-tight text-foreground flex items-center gap-2 group"
        >
          <span className="size-2.5 rounded-full bg-primary inline-block transition-transform group-hover:scale-125" />
          <span>PR One</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden md:flex items-center gap-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground-soft hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
          <Link
            href="/contact"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {tNav("consultCta")}
          </Link>
        </div>

        {/* Mobile Actions: Language + Hamburger Sheet */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitch />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              aria-label={tCommon("menu")}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6 space-y-6">
              <SheetHeader>
                <SheetTitle className="font-display text-lg font-bold text-foreground flex items-center gap-2 text-start">
                  <span className="size-2 rounded-full bg-primary" />
                  PR One
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile Navigation" className="flex flex-col gap-3 pt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-lg text-base font-medium text-foreground-soft hover:text-foreground hover:bg-surface-sunken transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t border-border">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}
                >
                  {tNav("consultCta")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
