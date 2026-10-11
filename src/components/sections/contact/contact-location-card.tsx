import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactLocationCardProps {
  title: string;
  openMaps: string;
  locale: "th" | "en" | "de" | "zh" | "ar";
}

export function ContactLocationCard({
  title,
  openMaps,
  locale,
}: ContactLocationCardProps) {
  const addressText = siteConfig.address[locale] || siteConfig.address.th;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "206 Soi Ram Intra 57, Tha Raeng, Bang Khen, Bangkok 10220"
  )}`;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <MapPin className="size-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base text-foreground">
            {title}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">
            PR One Network Co., Ltd.
          </span>
        </div>
      </div>

      <p className="text-sm text-foreground-soft leading-relaxed">
        {addressText}
      </p>

      <div className="pt-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full text-xs font-mono"
          )}
        >
          <span>{openMaps}</span>
          <ArrowUpRight className="size-3.5 ml-1" />
        </a>
      </div>
    </div>
  );
}
