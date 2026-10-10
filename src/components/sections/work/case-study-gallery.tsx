"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface CaseStudyGalleryProps {
  gallery?: string[];
  title: string;
  client: string;
}

const defaultPlaceholders = [
  "/images/case-studies/keynote-hall.svg",
  "/images/case-studies/summit-stage.svg",
  "/images/case-studies/networking-lounge.svg",
  "/images/case-studies/registration-desk.svg",
];

export function CaseStudyGallery({ gallery, title, client }: CaseStudyGalleryProps) {
  const t = useTranslations("caseStudyDetail");
  const images = gallery && gallery.length > 0 ? gallery : defaultPlaceholders;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-2xl text-foreground tracking-tight">
          {t("galleryTitle")}
        </h2>
        <p className="text-sm text-muted-foreground font-mono">
          {t("gallerySubtitle")}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((imgSrc, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setIsOpen(true);
            }}
            className="group relative aspect-video w-full overflow-hidden rounded-xl bg-surface-sunken border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring outline-none"
            aria-label={`${t("galleryTitle")} ${index + 1}`}
          >
            <Image
              src={imgSrc}
              alt={`${client} - ${title} photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="size-6 text-foreground drop-shadow" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl max-w-5xl p-4 bg-background border-border">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {client} — {title} ({activeIndex + 1} / {images.length})
            </DialogTitle>
          </DialogHeader>

          {/* Active Image Canvas */}
          <div className="relative aspect-video w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-lg bg-surface-sunken border border-border">
            <Image
              src={images[activeIndex]}
              alt={`${client} - ${title} active photo`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="font-mono text-xs text-muted-foreground">
              {activeIndex + 1} / {images.length}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={handlePrev}
                aria-label={t("lightboxPrev")}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={handleNext}
                aria-label={t("lightboxNext")}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
