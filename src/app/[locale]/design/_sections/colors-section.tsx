"use client";

import { useEffect, useState } from "react";

interface ColorItem {
  token: string;
  cssVar: string;
  category: string;
  bgClass: string;
  textClass?: string;
  borderClass?: string;
}

const colorTokens: ColorItem[] = [
  { token: "bg-primary", cssVar: "--brand", category: "Brand", bgClass: "bg-primary", textClass: "text-primary-foreground" },
  { token: "bg-secondary", cssVar: "--secondary", category: "Brand", bgClass: "bg-secondary" },
  { token: "bg-accent", cssVar: "--accent", category: "Brand", bgClass: "bg-accent" },
  { token: "bg-destructive", cssVar: "--destructive", category: "Brand", bgClass: "bg-destructive" },
  { token: "brand-alt-1 (Summit)", cssVar: "--brand-alt-1", category: "Brand Accents", bgClass: "bg-[var(--brand-alt-1)]" },
  { token: "brand-alt-2 (Roadshow)", cssVar: "--brand-alt-2", category: "Brand Accents", bgClass: "bg-[var(--brand-alt-2)]" },
  { token: "brand-alt-3 (Workshop)", cssVar: "--brand-alt-3", category: "Brand Accents", bgClass: "bg-[var(--brand-alt-3)]" },
  { token: "bg-background", cssVar: "--background", category: "Surfaces", bgClass: "bg-background", borderClass: "border border-border" },
  { token: "bg-surface-sunken", cssVar: "--surface-sunken", category: "Surfaces", bgClass: "bg-surface-sunken" },
  { token: "bg-card", cssVar: "--card", category: "Surfaces", bgClass: "bg-card", borderClass: "border border-border" },
  { token: "bg-popover", cssVar: "--popover", category: "Surfaces", bgClass: "bg-popover", borderClass: "border border-border" },
  { token: "bg-muted", cssVar: "--muted", category: "Surfaces", bgClass: "bg-muted" },
  { token: "text-foreground", cssVar: "--foreground", category: "Typography", bgClass: "bg-card", textClass: "text-foreground" },
  { token: "text-foreground-soft", cssVar: "--foreground-soft", category: "Typography", bgClass: "bg-card", textClass: "text-foreground-soft" },
  { token: "text-subtle-foreground", cssVar: "--subtle-foreground", category: "Typography", bgClass: "bg-card", textClass: "text-subtle-foreground" },
  { token: "text-muted-foreground", cssVar: "--muted-foreground", category: "Typography", bgClass: "bg-card", textClass: "text-muted-foreground" },
  { token: "border-border", cssVar: "--border", category: "Borders & Lines", bgClass: "bg-card", borderClass: "border-2 border-border" },
  { token: "border-border-strong", cssVar: "--border-strong", category: "Borders & Lines", bgClass: "bg-card", borderClass: "border-2 border-border-strong" },
  { token: "border-input", cssVar: "--input", category: "Borders & Lines", bgClass: "bg-card", borderClass: "border-2 border-input" },
];

export function ColorsSection() {
  const [computedValues, setComputedValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const style = getComputedStyle(document.documentElement);
      const values: Record<string, string> = {};
      colorTokens.forEach(({ cssVar }) => {
        values[cssVar] = style.getPropertyValue(cssVar).trim() || "computed";
      });
      setComputedValues(values);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="colors" className="space-y-4">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Colors
      </h2>
      <p className="text-foreground-soft text-sm">
        Design tokens mapped to runtime CSS variables via <code className="font-mono text-xs">getComputedStyle</code>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {colorTokens.map((item) => (
          <div
            key={item.token}
            className="p-3 rounded-xl border border-border bg-card flex items-center gap-3"
          >
            <div
              className={`size-12 shrink-0 rounded-lg ${item.bgClass} ${item.borderClass || ""}`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-mono font-medium text-foreground truncate">
                {item.token}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-0.5">
                {computedValues[item.cssVar] || item.cssVar}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
