import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { caseStudies, getCaseStudy, getRelatedCaseStudies } from "@/content";
import {
  CaseStudyHeader,
  CaseStudyBlocks,
  CaseStudyGallery,
  RelatedCaseStudies,
} from "@/components/sections/work";
import { ContactCTA } from "@/components/sections/home";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const cs of caseStudies) {
      params.push({ locale, slug: cs.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const loc = locale as "th" | "en" | "de" | "zh" | "ar";
  const desc = caseStudy.challenge[loc] || caseStudy.challenge.en || caseStudy.challenge.th;
  const coverImage = caseStudy.gallery?.[0] || "/images/case-studies/keynote-hall.svg";

  return {
    title: `${caseStudy.title} (${caseStudy.client}) | ${tMeta("siteName")}`,
    description: `${caseStudy.title} - ${desc}`,
    openGraph: {
      title: `${caseStudy.title} (${caseStudy.client}) | ${tMeta("siteName")}`,
      description: desc,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 800,
          alt: caseStudy.title,
        },
      ],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) {
    notFound();
  }

  const related = getRelatedCaseStudies(caseStudy.slug, 2);

  return (
    <div className="flex flex-col">
      <main className="py-16 md:py-24">
        <article className="max-w-5xl mx-auto px-4 md:px-8 space-y-16 md:space-y-20">
          <CaseStudyHeader caseStudy={caseStudy} />
          <CaseStudyBlocks caseStudy={caseStudy} />
          <CaseStudyGallery
            gallery={caseStudy.gallery}
            title={caseStudy.title}
            client={caseStudy.client}
          />
          <RelatedCaseStudies caseStudies={related} />
        </article>
      </main>

      <ContactCTA />
    </div>
  );
}
