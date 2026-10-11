import React from "react";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/brand/section-heading";

interface AboutTeamProps {
  eyebrow: string;
  title: string;
  notice: string;
}

export function AboutTeam({ eyebrow, title, notice }: AboutTeamProps) {
  return (
    <section className="space-y-8">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="size-14 rounded-full bg-surface-sunken border border-border flex items-center justify-center text-muted-foreground">
          <Users className="size-7" />
        </div>
        <p className="font-mono text-sm sm:text-base text-muted-foreground max-w-lg">
          {notice}
        </p>
      </div>
    </section>
  );
}
