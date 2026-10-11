"use server";

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

  // TODO: Select and configure downstream storage or integration before production launch:
  // Options:
  // 1. Google Sheets API via Service Account
  // 2. CRM Webhook (HubSpot / Salesforce / Lark)
  // 3. Email Notification via transactional mailer (Resend / AWS SES)
  // Note: Data is validated strictly above and safe to forward once destination is approved.

  return { success: true };
}
