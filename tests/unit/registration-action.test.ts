import { describe, it, expect } from "vitest";
import { registerEventAction } from "@/actions/register-event";

describe("registerEventAction", () => {
  it("validates and accepts complete valid payload", async () => {
    const payload = {
      eventSlug: "upcoming-tech-summit-2026",
      fullName: "Jane Doe",
      company: "Acme Enterprise",
      jobTitle: "CTO",
      email: "jane.doe@acme.com",
      phone: "0812345678",
      pdpaConsent: true,
    };

    const result = await registerEventAction(payload);
    expect(result.success).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it("rejects payload when required fields or PDPA consent are missing", async () => {
    const invalidPayload = {
      eventSlug: "",
      fullName: "A",
      company: "",
      jobTitle: "",
      email: "invalid-email",
      phone: "123",
      pdpaConsent: false,
    };

    const result = await registerEventAction(invalidPayload);
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.fullName).toBeDefined();
    expect(result.errors?.company).toBeDefined();
    expect(result.errors?.jobTitle).toBeDefined();
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.phone).toBeDefined();
    expect(result.errors?.pdpaConsent).toBeDefined();
  });
});
