"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export interface NewsletterSignupProps extends React.ComponentProps<"div"> {
  layout?: "card" | "inline";
}

export function NewsletterSignup({
  layout = "card",
  className,
  ...props
}: NewsletterSignupProps) {
  const t = useTranslations("newsletter");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // TODO: Send newsletter subscription to external marketing CRM / Mailchimp / Brevo
    // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify(data) });
    console.info("Newsletter subscription received:", data.email);

    toast.success(t("successToast"));
    setIsSuccess(true);
    reset();
  };

  return (
    <div
      className={cn(
        layout === "card"
          ? "rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4"
          : "space-y-3",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h4 className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight flex items-center gap-2">
          <Mail className="size-5 text-primary shrink-0" />
          <span>{t("title")}</span>
        </h4>
        <p className="text-sm text-foreground-soft leading-relaxed max-w-lg">
          {t("description")}
        </p>
      </div>

      {isSuccess ? (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{t("successToast")}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                aria-invalid={!!errors.email}
                {...register("email")}
                className="h-10 px-3 bg-surface-sunken"
              />
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting} className="gap-1.5 shrink-0">
              <span>{t("subscribeButton")}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
          {errors.email && (
            <p className="text-xs text-destructive font-mono pt-1">
              {t("invalidEmail")}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
