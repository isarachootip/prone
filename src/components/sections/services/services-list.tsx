import React from "react";
import type { Service, CaseStudy } from "@/content/types";
import { ServiceSectionCard } from "./service-section-card";

interface ServicesListProps {
  services: Service[];
  caseStudies: CaseStudy[];
  locale: "th" | "en" | "de" | "zh" | "ar";
  itemsTitle: string;
  relatedWorkTitle: string;
}

export function ServicesList({
  services,
  caseStudies,
  locale,
  itemsTitle,
  relatedWorkTitle,
}: ServicesListProps) {
  // Mapping logic to pair relevant case studies to each service domain
  function getRelatedCaseStudies(serviceId: string): CaseStudy[] {
    switch (serviceId) {
      case "event-management":
        return caseStudies.filter((cs) =>
          ["uipath-fusion-summit-bangkok", "cohesity-resilience"].includes(cs.slug)
        );
      case "pr-media-relations":
        return caseStudies.filter((cs) =>
          ["asia-sourcing-show-press-conference", "cohesity-resilience"].includes(cs.slug)
        );
      case "marketing-campaign":
        return caseStudies.filter((cs) =>
          ["stt-gdc-bangkok", "thailand-trader-fair"].includes(cs.slug)
        );
      case "lead-generation-database":
        return caseStudies.filter((cs) =>
          ["uipath-fusion-summit-bangkok", "thailand-trader-fair"].includes(cs.slug)
        );
      case "creative-content":
        return caseStudies.filter((cs) =>
          ["benz-bkk-concert", "uipath-fusion-summit-bangkok"].includes(cs.slug)
        );
      default:
        return caseStudies.slice(0, 2);
    }
  }

  return (
    <div className="space-y-12">
      {services.map((service, index) => (
        <ServiceSectionCard
          key={service.id}
          service={service}
          index={index}
          locale={locale}
          relatedStudies={getRelatedCaseStudies(service.id)}
          itemsTitle={itemsTitle}
          relatedWorkTitle={relatedWorkTitle}
        />
      ))}
    </div>
  );
}
