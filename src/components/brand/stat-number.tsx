import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statVariants = cva("font-mono tabular-nums font-bold tracking-tight", {
  variants: {
    size: {
      sm: "text-2xl",
      md: "text-3xl sm:text-4xl",
      lg: "text-4xl sm:text-5xl",
    },
    tone: {
      default: "text-foreground",
      brand: "text-primary",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

export interface StatNumberProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statVariants> {
  value: string;
  label: string;
}

export function StatNumber({
  value,
  label,
  size,
  tone,
  className,
  ...props
}: StatNumberProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <span className={statVariants({ size, tone })}>{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
