"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";
import { registerEventAction } from "@/actions/register-event";
import {
  createRegistrationSchema,
  type RegistrationFormData,
} from "@/lib/schemas/registration";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EventRegistrationFields } from "./event-registration-fields";
import { EventRegistrationConsent } from "./event-registration-consent";
import { EventRegistrationSuccess } from "./event-registration-success";

export interface EventRegistrationFormProps {
  eventSlug: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventSummary?: string;
}

export function EventRegistrationForm({
  eventSlug,
  eventTitle,
  eventDate,
  eventVenue,
  eventSummary,
}: EventRegistrationFormProps) {
  const t = useTranslations("registration");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(() => createRegistrationSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventSlug,
      fullName: "",
      company: "",
      jobTitle: "",
      email: "",
      phone: "",
      pdpaConsent: false as unknown as true,
    },
  });

  async function onSubmit(data: RegistrationFormData) {
    setServerError(null);
    try {
      const res = await registerEventAction({
        ...data,
        eventSlug,
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setServerError(t("errors.serverError"));
      }
    } catch {
      setServerError(t("errors.serverError"));
    }
  }

  if (isSubmitted) {
    return (
      <EventRegistrationSuccess
        eventTitle={eventTitle}
        eventDate={eventDate}
        eventVenue={eventVenue}
        eventSummary={eventSummary}
      />
    );
  }

  return (
    <Card className="bg-card border-border shadow-xs">
      <CardHeader className="space-y-2">
        <CardTitle className="font-display font-bold text-2xl text-foreground">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-foreground-soft text-sm">
          {t("subtitle")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {serverError && (
            <div className="p-3 text-xs font-mono text-destructive rounded-lg bg-destructive/10 border border-destructive/20">
              {serverError}
            </div>
          )}

          <EventRegistrationFields register={register} errors={errors} />

          <EventRegistrationConsent control={control} errors={errors} />

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
