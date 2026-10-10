"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { EventType } from "@/content/types";

export type EventFilterValue = "all" | EventType;

export type EventFilterProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value: EventFilterValue;
  onChange: (value: EventFilterValue) => void;
};

const filterOptions: EventFilterValue[] = [
  "all",
  "seminar",
  "summit",
  "roadshow",
  "workshop",
];

export function EventFilter({
  value,
  onChange,
  className,
  ...props
}: EventFilterProps) {
  const t = useTranslations("events.types");

  return (
    <div
      role="radiogroup"
      aria-label="Filter events by type"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {filterOptions.map((opt) => {
        const isSelected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
              isSelected
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "bg-card text-foreground-soft border border-border hover:border-border-strong hover:text-foreground hover:bg-surface-sunken"
            )}
          >
            {t(opt)}
          </button>
        );
      })}
    </div>
  );
}
