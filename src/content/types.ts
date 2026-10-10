export interface Localized<T> {
  th: T;
  en: T;
  de?: T;
  zh?: T;
  ar?: T;
}

export type EventType = "seminar" | "summit" | "roadshow" | "workshop";

export interface Event {
  slug: string;
  title: Localized<string>;
  type: EventType;
  date: string; // ISO string e.g. "2026-11-20T09:00:00Z"
  venue: Localized<string>;
  client: string;
  summary: Localized<string>;
  registerUrl?: string;
  status: "upcoming" | "past";
  cover?: string;
}

export type ClientIndustry = "tech" | "enterprise" | "government" | "consumer";

export interface Client {
  name: string;
  logo?: string;
  industry: ClientIndustry;
}

export interface CaseStudyResult {
  label: Localized<string>;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: number;
  eventType: EventType;
  challenge: Localized<string>;
  whatWeDid: Localized<string>;
  results: CaseStudyResult[];
  gallery: string[];
  featured: boolean;
}

export interface Service {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  items: Localized<string[]>;
}

export interface SiteSocialLinks {
  line: string;
  facebook: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

export interface SiteContactInfo {
  phone: string;
  email: string;
}

export interface SiteConfig {
  companyName: Localized<string>;
  foundedYear: number;
  address: Localized<string>;
  social: SiteSocialLinks;
  contact: SiteContactInfo;
}
