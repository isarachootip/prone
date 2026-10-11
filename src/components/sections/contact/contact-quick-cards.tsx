import React from "react";
import { MessageCircle, Phone, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactQuickCardsProps {
  title: string;
  lineTitle: string;
  lineAction: string;
  phoneTitle: string;
  emailTitle: string;
}

export function ContactQuickCards({
  title,
  lineTitle,
  lineAction,
  phoneTitle,
  emailTitle,
}: ContactQuickCardsProps) {
  const lineHref = siteConfig.social.line || "#";
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`;
  const emailHref = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {/* LINE OA Card */}
        <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-surface-sunken border border-border text-foreground flex items-center justify-center shrink-0">
              <MessageCircle className="size-5" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground">
                {lineTitle}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                @prone.network
              </p>
            </div>
          </div>
          <a
            href={lineHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full text-xs font-mono"
            )}
          >
            <span>{lineAction}</span>
            <ArrowUpRight className="size-3.5 ml-1" />
          </a>
        </div>

        {/* Direct Phone Card */}
        <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Phone className="size-5" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground">
                {phoneTitle}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {siteConfig.contact.phone}
              </p>
            </div>
          </div>
          <a
            href={phoneHref}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full text-xs font-mono"
            )}
          >
            <span>Call</span>
            <ArrowUpRight className="size-3.5 ml-1" />
          </a>
        </div>

        {/* Inquiries Mail Card */}
        <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-surface-sunken border border-border text-foreground flex items-center justify-center shrink-0">
              <Mail className="size-5" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground">
                {emailTitle}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {siteConfig.contact.email}
              </p>
            </div>
          </div>
          <a
            href={emailHref}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full text-xs font-mono"
            )}
          >
            <span>Email</span>
            <ArrowUpRight className="size-3.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
