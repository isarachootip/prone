import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { AddToCalendar } from "@/components/brand/add-to-calendar";

export interface EventRegistrationSuccessProps {
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  eventSummary?: string;
}

export function EventRegistrationSuccess({
  eventTitle,
  eventDate,
  eventVenue,
  eventSummary,
}: EventRegistrationSuccessProps) {
  const t = useTranslations("registration");

  return (
    <Card className="bg-card border-border p-8 md:p-12 text-center space-y-6">
      <div className="size-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
        <CheckCircle2 className="size-8" />
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <CardTitle className="font-display font-bold text-2xl md:text-3xl text-foreground">
          {t("success.title")}
        </CardTitle>
        <CardDescription className="text-foreground-soft font-sans text-sm md:text-base">
          {t("success.description")}
        </CardDescription>
      </div>

      <div className="pt-4 border-t border-border flex flex-col items-center gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {t("success.calendarPrompt")}
        </span>
        <AddToCalendar
          event={{
            title: eventTitle,
            summary: eventSummary,
            date: eventDate,
            venue: eventVenue,
          }}
        />
      </div>
    </Card>
  );
}
