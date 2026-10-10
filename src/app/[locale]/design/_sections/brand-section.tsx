import React from "react";
import { BrandShellShowcase } from "./brand-shell-showcase";
import { BrandEventsShowcase } from "./brand-events-showcase";

export function BrandSection() {
  return (
    <section id="brand-components" className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
          Brand Components
        </h2>
        <p className="text-sm text-foreground-soft mt-1">
          Complete living catalog of PR One bespoke brand, shell, event, and marketing components.
        </p>
      </div>

      <BrandShellShowcase />
      <BrandEventsShowcase />
    </section>
  );
}
