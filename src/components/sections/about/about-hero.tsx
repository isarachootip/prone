import React from "react";
import { Eyebrow } from "@/components/brand/eyebrow";

interface AboutHeroProps {
  eyebrow: string;
  title: string;
  positioning: string;
}

export function AboutHero({ eyebrow, title, positioning }: AboutHeroProps) {
  return (
    <section className="space-y-6 max-w-4xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
        {title}
      </h1>
      <p className="text-foreground-soft text-lg sm:text-xl md:text-2xl leading-relaxed font-sans pt-2">
        {positioning}
      </p>
    </section>
  );
}
