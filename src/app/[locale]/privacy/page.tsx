import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ShieldAlert } from "lucide-react";
import { SectionHeading } from "@/components/brand/section-heading";
import { Card } from "@/components/ui/card";
import { ContactCTA } from "@/components/sections/home";

import { createLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tPrivacy = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: `${tPrivacy("title")} | ${tMeta("siteName")}`,
    description: tPrivacy("title"),
    alternates: createLocalizedAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPrivacy = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="flex flex-col">
      <main className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
          <SectionHeading
            eyebrow="Compliance & Legal"
            title={tPrivacy("title")}
          />

          <Card className="bg-surface-sunken border border-dashed border-border p-8 md:p-12 text-center space-y-4">
            <ShieldAlert className="size-12 text-primary mx-auto opacity-80" />
            <p className="font-mono text-base md:text-lg text-foreground-soft font-medium">
              {tPrivacy("notice")}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {tPrivacy("lastUpdated")}
            </p>
          </Card>
        </div>
      </main>

      <ContactCTA />
    </div>
  );
}
