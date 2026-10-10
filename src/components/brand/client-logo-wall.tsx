import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Client } from "@/content/types";

interface ClientLogoWallProps extends React.ComponentProps<"div"> {
  clients: Client[];
  mode?: "marquee" | "grid";
}

export function ClientLogoWall({
  clients,
  mode = "marquee",
  className,
  ...props
}: ClientLogoWallProps) {
  if (mode === "grid") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4",
          className
        )}
        {...props}
      >
        {clients.map((client) => (
          <div
            key={client.name}
            className="h-20 px-4 rounded-xl border border-border bg-card flex items-center justify-center text-center font-display font-bold text-sm text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors"
          >
            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={40}
                className="max-h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span>{client.name}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Marquee mode (loop twice to ensure seamless continuous scroll)
  const duplicatedClients = [...clients, ...clients];

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full py-4 mask-fade",
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes prMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .pr-marquee-track {
          display: flex;
          width: max-content;
          animation: prMarquee 35s linear infinite;
        }
        .pr-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .pr-marquee-track {
            animation: none !important;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
      <div className="pr-marquee-track gap-4 items-center">
        {duplicatedClients.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            className="h-16 px-6 rounded-xl border border-border bg-card shrink-0 flex items-center justify-center text-center font-display font-bold text-sm text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors select-none"
          >
            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={40}
                className="max-h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span>{client.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
