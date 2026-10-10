import React from "react";
import { useTranslations } from "next-intl";
import { QrCode, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteSocialLinks } from "@/content/types";
import { SocialIcons } from "./social-icons";

export interface SocialConnectProps extends React.ComponentProps<"div"> {
  links: SiteSocialLinks;
}

export function SocialConnect({ links, className, ...props }: SocialConnectProps) {
  const t = useTranslations("lineConnect");

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-8",
        className
      )}
      {...props}
    >
      {/* LINE OA Main Hero Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-start flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-sunken border border-border text-xs font-mono text-muted-foreground">
            <span className="size-2 rounded-full bg-[#06C755]" /> {/* token-ok: LINE brand color */}
            <span>LINE Official Account</span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
            {t("title")}
          </h3>

          <p className="text-sm text-foreground-soft leading-relaxed max-w-md">
            {t("description")}
          </p>

          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href={links.line}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "gap-2 font-semibold"
              )}
            >
              <span>{t("addFriendButton")}</span>
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* QR Code Placeholder Box */}
        <div className="shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-surface-sunken">
          <div className="size-32 rounded-lg border border-dashed border-border-strong bg-card flex flex-col items-center justify-center text-muted-foreground p-3 text-center">
            <QrCode className="size-12 text-primary opacity-80" />
            <span className="text-[10px] font-mono text-muted-foreground mt-2 leading-tight">
              PR One LINE OA
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground text-center">
            {t("scanQrPrompt")}
          </span>
        </div>
      </div>

      {/* Other Channels Row */}
      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono text-muted-foreground">
          {t("otherChannels")}
        </span>
        <SocialIcons links={links} colored className="gap-3" />
      </div>
    </div>
  );
}
