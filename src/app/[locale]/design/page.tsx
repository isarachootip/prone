import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { DesignToc } from "./_sections/toc";
import { ColorsSection } from "./_sections/colors-section";
import { TypographySection } from "./_sections/typography-section";
import { RadiusSection } from "./_sections/radius-section";
import { ButtonsSection } from "./_sections/buttons-section";
import { BadgesSection } from "./_sections/badges-section";
import { CardsSection } from "./_sections/cards-section";
import { FormSection } from "./_sections/form-section";
import { PrimitivesSection } from "./_sections/primitives-section";
import { BrandSection } from "./_sections/brand-section";

export const metadata: Metadata = {
  title: "PR One Design System — Living Style Guide",
  robots: {
    index: false,
    follow: false,
  },
};

const sections = [
  { id: "colors", title: "Colors" },
  { id: "typography", title: "Typography" },
  { id: "radius", title: "Radius" },
  { id: "buttons", title: "Buttons" },
  { id: "badges", title: "Badges" },
  { id: "cards", title: "Cards" },
  { id: "form", title: "Form" },
  { id: "primitives", title: "Primitives" },
  { id: "brand-components", title: "Brand Components" },
];

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-3 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
            INTERNAL TOOL
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            PR One Living Style Guide
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground">
          Design System & Component Showcase
        </h1>
        <p className="text-foreground-soft text-sm max-w-2xl leading-relaxed">
          Living reference of all design tokens, primitives, typography scales, and interactive states for PR One Network.
        </p>
      </header>

      {/* Table of Contents */}
      <DesignToc sections={sections} />

      {/* Sections */}
      <main className="space-y-16">
        <ColorsSection />
        <TypographySection />
        <RadiusSection />
        <ButtonsSection />
        <BadgesSection />
        <CardsSection />
        <FormSection />
        <PrimitivesSection />
        <BrandSection />
      </main>

      <Toaster />
    </div>
  );
}
