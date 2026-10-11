import { describe, it, expect } from "vitest";
import { submitBriefAction } from "@/actions/submit-brief";

describe("submitBriefAction", () => {
  it("validates and accepts complete valid brief submission", async () => {
    const payload = {
      fullName: "Alex Mercer",
      company: "Innovatech Thailand",
      email: "alex@innovatech.co.th",
      phone: "0891234567",
      eventType: "summit",
      targetDate: "Q4 2026",
      budget: "[ช่วงงบ] 1,000,000 - 2,000,000 บาท",
      attendees: "200-300",
      details: "Need hybrid stage production and executive registration portal.",
      pdpaConsent: true,
    };

    const result = await submitBriefAction(payload);
    expect(result.success).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it("rejects payload when required fields or PDPA consent are missing", async () => {
    const invalidPayload = {
      fullName: "A",
      company: "",
      email: "not-an-email",
      phone: "123",
      eventType: "",
      targetDate: "",
      budget: "",
      attendees: "",
      details: "",
      pdpaConsent: false,
    };

    const result = await submitBriefAction(invalidPayload);
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.fullName).toBeDefined();
    expect(result.errors?.company).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.phone).toBeDefined();
    expect(result.errors?.eventType).toBeDefined();
    expect(result.errors?.pdpaConsent).toBeDefined();
  });
});
