"use client";

import React from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { RegistrationFormData } from "@/lib/schemas/registration";

export interface EventRegistrationConsentProps {
  control: Control<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export function EventRegistrationConsent({
  control,
  errors,
}: EventRegistrationConsentProps) {
  const t = useTranslations("registration");

  return (
    <div className="pt-2">
      <div className="flex items-start gap-3">
        <Controller
          name="pdpaConsent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="pdpaConsent"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-0.5"
            />
          )}
        />
        <Label
          htmlFor="pdpaConsent"
          className="text-xs text-foreground-soft font-normal leading-relaxed cursor-pointer select-none"
        >
          {t("pdpaConsent")}{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 font-medium"
          >
            {t("privacyPolicyLink")}
          </Link>
        </Label>
      </div>
      {errors.pdpaConsent && (
        <p className="text-xs font-mono text-destructive mt-1.5">
          {errors.pdpaConsent.message}
        </p>
      )}
    </div>
  );
}
