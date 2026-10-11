import React from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ContactBriefSuccessProps {
  onReset: () => void;
}

export function ContactBriefSuccess({ onReset }: ContactBriefSuccessProps) {
  const t = useTranslations("contactPage.form");

  return (
    <Card className="bg-card border-border shadow-xs">
      <CardHeader className="text-center space-y-3 pt-8 pb-4">
        <div className="mx-auto size-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <CheckCircle2 className="size-8" />
        </div>
        <CardTitle className="font-display font-bold text-2xl text-foreground">
          {t("successTitle")}
        </CardTitle>
        <CardDescription className="text-foreground-soft text-base max-w-md mx-auto leading-relaxed">
          {t("successDescription")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-8 flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="rounded-full text-xs font-mono"
        >
          <RotateCcw className="size-3.5 mr-2" />
          {t("resetButton")}
        </Button>
      </CardContent>
    </Card>
  );
}
