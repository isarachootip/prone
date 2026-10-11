import React from "react";
import type { Client } from "@/content/types";
import { SectionHeading } from "@/components/brand/section-heading";
import { ClientLogoWall } from "@/components/brand/client-logo-wall";

interface AboutClientsProps {
  eyebrow: string;
  title: string;
  description: string;
  clients: Client[];
}

export function AboutClients({
  eyebrow,
  title,
  description,
  clients,
}: AboutClientsProps) {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <ClientLogoWall clients={clients} mode="grid" />
    </section>
  );
}
