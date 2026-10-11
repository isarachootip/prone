"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import {
  registrationSchema,
  type RegistrationFormData,
  type RegisterActionResult,
} from "@/lib/schemas/registration";

export async function registerEventAction(
  data: unknown
): Promise<RegisterActionResult> {
  const parsed = registrationSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Partial<Record<keyof RegistrationFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0] as keyof RegistrationFormData;
      if (path && !errors[path]) {
        errors[path] = issue.message;
      }
    }
    return { success: false, errors };
  }

  // Store in Payload CMS Registrations collection if database is configured
  if (process.env.DATABASE_URI) {
    try {
      const payload = await getPayload({ config });
      await payload.create({
        collection: "registrations",
        data: {
          eventSlug: parsed.data.eventSlug,
          fullName: parsed.data.fullName,
          company: parsed.data.company,
          jobTitle: parsed.data.jobTitle,
          email: parsed.data.email,
          phone: parsed.data.phone,
          pdpaConsent: parsed.data.pdpaConsent,
        },
      });
    } catch (err) {
      // Graceful fallback during static generation or when DB is offline
      console.warn("[Registration] Failed to persist into database:", err);
    }
  }

  return { success: true };
}
