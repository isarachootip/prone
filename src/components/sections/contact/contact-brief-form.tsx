"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";
import { submitBriefAction } from "@/actions/submit-brief";
import {
  createContactBriefSchema,
  type ContactBriefFormData,
} from "@/lib/schemas/contact-brief";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ContactBriefFields } from "./contact-brief-fields";
import { ContactBriefConsent } from "./contact-brief-consent";
import { ContactBriefSuccess } from "./contact-brief-success";

export function ContactBriefForm() {
  const t = useTranslations("contactPage.form");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(() => createContactBriefSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactBriefFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      eventType: "",
      targetDate: "",
      budget: "",
      attendees: "",
      details: "",
      pdpaConsent: false as unknown as true,
    },
  });

  async function onSubmit(data: ContactBriefFormData) {
    setServerError(null);
    try {
      const res = await submitBriefAction(data);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setServerError(t("errors.serverError"));
      }
    } catch {
      setServerError(t("errors.serverError"));
    }
  }

  function handleReset() {
    reset();
    setIsSubmitted(false);
    setServerError(null);
  }

  if (isSubmitted) {
    return <ContactBriefSuccess onReset={handleReset} />;
  }

  return (
    <Card className="bg-card border-border shadow-xs">
      <CardHeader className="space-y-2">
        <CardTitle className="font-display font-bold text-2xl text-foreground">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-foreground-soft text-sm">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {serverError && (
            <div className="p-3 text-xs font-mono text-destructive rounded-lg bg-destructive/10 border border-destructive/20">
              {serverError}
            </div>
          )}

          <ContactBriefFields register={register} errors={errors} />

          <ContactBriefConsent control={control} errors={errors} />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                {t("submitting")}
              </>
            ) : (
              <>
                <Send className="size-3.5 mr-2" />
                {t("submitButton")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
