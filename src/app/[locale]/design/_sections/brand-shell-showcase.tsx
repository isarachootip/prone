import React from "react";
import {
  Eyebrow,
  SectionHeading,
  StatNumber,
  ClientLogoWall,
  SocialIcons,
  LanguageSwitch,
} from "@/components/brand";
import { Button } from "@/components/ui/button";
import { clients } from "@/content/clients";

export function BrandShellShowcase() {
  const sampleClients = clients.slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold font-display tracking-tight text-foreground">
          Part 1: Site Shell Components
        </h3>
        <p className="text-sm text-foreground-soft mt-1">
          Components built for PR One brand identity, typography hierarchy, and site layout.
        </p>
      </div>

      {/* 1. Eyebrow */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">1. Eyebrow</span>
        <div className="flex flex-wrap items-center gap-6">
          <Eyebrow>Upcoming Enterprise Events</Eyebrow>
          <Eyebrow hasDot>Live · Registration Open</Eyebrow>
        </div>
      </div>

      {/* 2. Section Heading */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-6">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          2. SectionHeading (Left & Center)
        </span>
        <SectionHeading
          eyebrow="Portfolio & Milestones"
          title="Proven Enterprise Tech Impact"
          description="Delivering end-to-end conference production, executive roundtables, and high-conversion PR campaigns across Southeast Asia."
          action={<Button size="sm" variant="outline">View All Case Studies</Button>}
        />
        <div className="pt-4 border-t border-border">
          <SectionHeading
            align="center"
            eyebrow="Our Global Partners"
            title="Trusted by World-Class Tech Leaders"
            description="Collaborating with enterprise software, cloud infrastructure, and cybersecurity innovators since 2004."
          />
        </div>
      </div>

      {/* 3. Stat Number */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          3. StatNumber (Sizes & Tones)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <StatNumber value="2004" label="Founded in Bangkok" size="md" tone="default" />
          <StatNumber value="500+" label="Events Executed" size="lg" tone="brand" />
          <StatNumber value="98%" label="Attendee Satisfaction" size="md" tone="brand" />
          <StatNumber value="20+" label="Enterprise Clients" size="sm" tone="default" />
        </div>
      </div>

      {/* 4. Client Logo Wall */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          4. ClientLogoWall (Marquee & Grid Modes)
        </span>
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground font-mono">Mode: Marquee (Auto-scrolling)</span>
          <ClientLogoWall clients={sampleClients} mode="marquee" />
        </div>
        <div className="space-y-2 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground font-mono">Mode: Grid</span>
          <ClientLogoWall clients={sampleClients.slice(0, 5)} mode="grid" />
        </div>
      </div>

      {/* 5. Social Icons & Language Switch */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase">
          5. SocialIcons & LanguageSwitch
        </span>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono block">Muted Tone</span>
            <SocialIcons />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono block">Brand Colors</span>
            <SocialIcons colored />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono block">Language Switch</span>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
