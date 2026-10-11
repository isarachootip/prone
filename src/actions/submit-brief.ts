"use server";

import {
  contactBriefSchema,
  type ContactBriefFormData,
} from "@/lib/schemas/contact-brief";

export interface SubmitBriefResult {
  success: boolean;
  errors?: Record<string, string[]>;
}

export async function submitBriefAction(
  data: ContactBriefFormData
): Promise<SubmitBriefResult> {
  const parsed = contactBriefSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return { success: false, errors };
  }

  // TODO: Downstream lead capture integrations to be enabled before production:
  // 1. Google Sheets API via Service Account for business development queue
  // 2. CRM Webhook (HubSpot / Salesforce / Lark) for automated lead assignment
  // 3. Email Alert to sales@prone.network via transactional mailer (Resend / SES)
  // Note: All payload fields are strictly validated by Zod above.

  return { success: true };
}
