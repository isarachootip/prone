import { setRequestLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homeDemo");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold font-display max-w-2xl">
        {t("title")}
      </h1>
      <p className="text-foreground-soft text-lg max-w-xl font-sans">
        {t("description")}
      </p>
      <div className="font-mono text-2xl font-semibold text-primary">
        {t("establishedYear")}
      </div>
      <div>
        <Button size="lg">{t("ctaButton")}</Button>
      </div>
    </main>
  );
}
