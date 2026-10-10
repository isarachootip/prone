import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

interface SectionHeadingProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
  ...props
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
      {...props}
    >
      <div className={cn("space-y-2", isCenter && "max-w-2xl mx-auto")}>
        {eyebrow && <Eyebrow hasDot>{eyebrow}</Eyebrow>}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-foreground-soft text-sm sm:text-base max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className={cn("shrink-0 pt-2 md:pt-0", isCenter && "flex justify-center")}>
          {action}
        </div>
      )}
    </div>
  );
}
