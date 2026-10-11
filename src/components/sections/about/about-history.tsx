import React from "react";
import { Eyebrow } from "@/components/brand/eyebrow";
import { StatNumber } from "@/components/brand/stat-number";

interface AboutHistoryProps {
  eyebrow: string;
  title: string;
  text: string;
  foundedYear: number;
}

export function AboutHistory({
  eyebrow,
  title,
  text,
  foundedYear,
}: AboutHistoryProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 md:p-12 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-foreground-soft text-base sm:text-lg leading-relaxed pt-2">
            {text}
          </p>
        </div>

        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-6 rounded-xl bg-surface-sunken border border-border">
          <StatNumber
            value={String(foundedYear)}
            label="Founded in Bangkok"
            size="lg"
            tone="brand"
          />
          <div className="pt-4 border-t border-border">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
              20+
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Years of Continuous Tech Event Operations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
