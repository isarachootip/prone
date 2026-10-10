import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EventType } from "@/content/types";

export interface EventTypeBadgeProps extends React.ComponentProps<typeof Badge> {
  type: EventType;
}

const dotColorMap: Record<EventType, string> = {
  summit: "bg-brand-alt-1",
  roadshow: "bg-brand-alt-2",
  workshop: "bg-brand-alt-3",
  seminar: "bg-primary",
};

export function EventTypeBadge({
  type,
  className,
  children,
  ...props
}: EventTypeBadgeProps) {
  const t = useTranslations("events.types");

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 font-mono text-xs font-normal py-0.5 px-2.5", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full shrink-0", dotColorMap[type] || "bg-primary")}
      />
      <span>{children || t(type)}</span>
    </Badge>
  );
}
