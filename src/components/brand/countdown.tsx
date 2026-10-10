"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export interface CountdownProps extends React.ComponentProps<"div"> {
  targetDate: string | Date;
  variant?: "boxes" | "inline";
}

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeParts {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({
  targetDate,
  variant = "boxes",
  className,
  ...props
}: CountdownProps) {
  const t = useTranslations("events.countdown");
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate);

    const frame = requestAnimationFrame(() => {
      setTimeLeft(calculateTimeLeft(target));
      setMounted(true);
    });

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { key: "days", label: t("days"), value: pad(timeLeft.days) },
    { key: "hours", label: t("hours"), value: pad(timeLeft.hours) },
    { key: "minutes", label: t("minutes"), value: pad(timeLeft.minutes) },
    { key: "seconds", label: t("seconds"), value: pad(timeLeft.seconds) },
  ];

  const srText = mounted
    ? t("srText", {
        days: timeLeft.days,
        hours: timeLeft.hours,
        minutes: timeLeft.minutes,
        seconds: timeLeft.seconds,
      })
    : "";

  if (variant === "inline") {
    return (
      <div
        aria-live="off"
        className={cn("inline-flex items-center gap-1 font-mono tabular-nums text-sm", className)}
        {...props}
      >
        <span className="sr-only">{srText}</span>
        <span aria-hidden="true">
          {mounted
            ? `${units[0].value}d : ${units[1].value}h : ${units[2].value}m : ${units[3].value}s`
            : "--d : --h : --m : --s"}
        </span>
      </div>
    );
  }

  return (
    <div
      aria-live="off"
      className={cn("grid grid-cols-4 gap-2 sm:gap-3 text-center", className)}
      {...props}
    >
      <span className="sr-only">{srText}</span>
      {units.map((unit) => (
        <div
          key={unit.key}
          aria-hidden="true"
          className="p-2 sm:p-3 rounded-lg border border-border bg-surface-sunken flex flex-col items-center justify-center min-w-[56px]"
        >
          <span className="font-mono tabular-nums font-bold text-lg sm:text-2xl text-foreground">
            {mounted ? unit.value : "--"}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
