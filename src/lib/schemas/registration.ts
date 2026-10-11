import { z } from "zod";

export function createRegistrationSchema(t?: (key: string) => string) {
  return z.object({
    eventSlug: z.string().min(1, "Event is required"),
    fullName: z
      .string()
      .trim()
      .min(2, t ? t("errors.fullName") : "Please enter your full name (at least 2 characters)"),
    company: z
      .string()
      .trim()
      .min(2, t ? t("errors.company") : "Please enter your company name"),
    jobTitle: z
      .string()
      .trim()
      .min(2, t ? t("errors.jobTitle") : "Please enter your job title"),
    email: z
      .string()
      .trim()
      .email(t ? t("errors.email") : "Please enter a valid work email address"),
    phone: z
      .string()
      .trim()
      .min(9, t ? t("errors.phone") : "Please enter a valid phone number"),
    pdpaConsent: z.boolean().refine((val) => val === true, {
      message: t ? t("errors.pdpa") : "You must consent to the privacy policy",
    }),
  });
}

export const registrationSchema = createRegistrationSchema();

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface RegisterActionResult {
  success: boolean;
  errors?: Partial<Record<keyof RegistrationFormData, string>>;
}
