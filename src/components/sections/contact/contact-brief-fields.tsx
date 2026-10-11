"use client";

import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { ContactBriefFormData } from "@/lib/schemas/contact-brief";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactBriefFieldsProps {
  register: UseFormRegister<ContactBriefFormData>;
  errors: FieldErrors<ContactBriefFormData>;
}

export function ContactBriefFields({ register, errors }: ContactBriefFieldsProps) {
  const t = useTranslations("contactPage.form");

  return (
    <div className="space-y-4">
      {/* Row 1: Full Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brief-fullName" className="text-xs font-mono text-foreground">
            {t("fullName")} <span className="text-primary">*</span>
          </Label>
          <Input
            id="brief-fullName"
            placeholder={t("fullNamePlaceholder")}
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs font-mono text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="brief-company" className="text-xs font-mono text-foreground">
            {t("company")} <span className="text-primary">*</span>
          </Label>
          <Input
            id="brief-company"
            placeholder={t("companyPlaceholder")}
            aria-invalid={Boolean(errors.company)}
            {...register("company")}
          />
          {errors.company && (
            <p className="text-xs font-mono text-destructive">{errors.company.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brief-email" className="text-xs font-mono text-foreground">
            {t("email")} <span className="text-primary">*</span>
          </Label>
          <Input
            id="brief-email"
            type="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-mono text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="brief-phone" className="text-xs font-mono text-foreground">
            {t("phone")} <span className="text-primary">*</span>
          </Label>
          <Input
            id="brief-phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs font-mono text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Row 3: Event Type & Target Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brief-eventType" className="text-xs font-mono text-foreground">
            {t("eventType")} <span className="text-primary">*</span>
          </Label>
          <select
            id="brief-eventType"
            aria-invalid={Boolean(errors.eventType)}
            className="flex h-9 w-full rounded-lg border border-input bg-surface-sunken px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            {...register("eventType")}
          >
            <option value="">{t("eventTypePlaceholder")}</option>
            <option value="summit">Summit</option>
            <option value="seminar">Seminar / Conference</option>
            <option value="roadshow">Roadshow</option>
            <option value="workshop">Workshop / Roundtable</option>
            <option value="press">Press Conference & PR</option>
            <option value="other">Other</option>
          </select>
          {errors.eventType && (
            <p className="text-xs font-mono text-destructive">{errors.eventType.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="brief-targetDate" className="text-xs font-mono text-foreground">
            {t("targetDate")}
          </Label>
          <Input
            id="brief-targetDate"
            placeholder={t("targetDatePlaceholder")}
            {...register("targetDate")}
          />
        </div>
      </div>

      {/* Row 4: Budget Bracket & Estimated Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="brief-budget" className="text-xs font-mono text-foreground">
            {t("budget")}
          </Label>
          <select
            id="brief-budget"
            className="flex h-9 w-full rounded-lg border border-input bg-surface-sunken px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            {...register("budget")}
          >
            <option value="">{t("budgetPlaceholder")}</option>
            <option value="tier1">{t("budgetOptions.tier1")}</option>
            <option value="tier2">{t("budgetOptions.tier2")}</option>
            <option value="tier3">{t("budgetOptions.tier3")}</option>
            <option value="tier4">{t("budgetOptions.tier4")}</option>
            <option value="undecided">{t("budgetOptions.undecided")}</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="brief-attendees" className="text-xs font-mono text-foreground">
            {t("attendees")}
          </Label>
          <Input
            id="brief-attendees"
            placeholder={t("attendeesPlaceholder")}
            {...register("attendees")}
          />
        </div>
      </div>

      {/* Row 5: Project Details */}
      <div className="space-y-1.5">
        <Label htmlFor="brief-details" className="text-xs font-mono text-foreground">
          {t("details")}
        </Label>
        <Textarea
          id="brief-details"
          rows={4}
          placeholder={t("detailsPlaceholder")}
          {...register("details")}
        />
      </div>
    </div>
  );
}
