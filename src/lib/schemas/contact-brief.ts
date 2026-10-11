import { z } from "zod";

export function createContactBriefSchema(t?: (key: string) => string) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, t ? t("errors.fullName") : "Name must be at least 2 characters"),
    company: z
      .string()
      .trim()
      .min(1, t ? t("errors.company") : "Company name is required"),
    email: z
      .string()
      .trim()
      .email(t ? t("errors.email") : "Invalid email address"),
    phone: z
      .string()
      .trim()
      .min(8, t ? t("errors.phone") : "Phone number must be at least 8 digits"),
    eventType: z
      .string()
      .min(1, t ? t("errors.eventType") : "Event type is required"),
    targetDate: z.string(),
    budget: z.string(),
    attendees: z.string(),
    details: z.string(),
    pdpaConsent: z.boolean().refine((val) => val === true, {
      message: t ? t("errors.pdpa") : "PDPA consent is required",
    }),
  });
}

export const contactBriefSchema = createContactBriefSchema();

export type ContactBriefFormData = z.infer<typeof contactBriefSchema>;
