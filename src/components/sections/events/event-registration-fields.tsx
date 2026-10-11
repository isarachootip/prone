"use client";

import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegistrationFormData } from "@/lib/schemas/registration";

export interface EventRegistrationFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export function EventRegistrationFields({
  register,
  errors,
}: EventRegistrationFieldsProps) {
  const t = useTranslations("registration");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">{t("fullNameLabel")}</Label>
          <Input
            id="fullName"
            placeholder={t("fullNamePlaceholder")}
            {...register("fullName")}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="text-xs font-mono text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="company">{t("companyLabel")}</Label>
          <Input
            id="company"
            placeholder={t("companyPlaceholder")}
            {...register("company")}
            aria-invalid={!!errors.company}
          />
          {errors.company && (
            <p className="text-xs font-mono text-destructive">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="jobTitle">{t("jobTitleLabel")}</Label>
          <Input
            id="jobTitle"
            placeholder={t("jobTitlePlaceholder")}
            {...register("jobTitle")}
            aria-invalid={!!errors.jobTitle}
          />
          {errors.jobTitle && (
            <p className="text-xs font-mono text-destructive">{errors.jobTitle.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">{t("phoneLabel")}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs font-mono text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs font-mono text-destructive">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
}
