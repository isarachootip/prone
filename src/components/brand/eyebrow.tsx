import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.ComponentProps<"div"> {
  hasDot?: boolean;
  children: React.ReactNode;
}

export function Eyebrow({
  hasDot = false,
  children,
  className,
  ...props
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    >
      {hasDot && (
        <span
          className="size-1.5 rounded-full bg-primary inline-block shrink-0 animate-pulse"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
