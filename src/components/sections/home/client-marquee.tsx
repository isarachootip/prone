import React from "react";
import { ClientLogoWall } from "@/components/brand";
import { cn } from "@/lib/utils";
import type { Client } from "@/content/types";

export interface ClientMarqueeProps extends React.ComponentProps<"section"> {
  clients: Client[];
}

export function ClientMarquee({ clients, className, ...props }: ClientMarqueeProps) {
  return (
    <section
      aria-label="Enterprise Technology Partners"
      className={cn("border-y border-border bg-surface-sunken/40 py-8 overflow-hidden", className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-4">
        <div className="text-center">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Trusted by World-Class Tech Leaders Since 2004
          </span>
        </div>
        <ClientLogoWall clients={clients} mode="marquee" />
      </div>
    </section>
  );
}
