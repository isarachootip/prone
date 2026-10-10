import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Download, Sparkles } from "lucide-react";

export function ButtonsSection() {
  const variants = [
    { name: "default", label: "Default (Lime)" },
    { name: "outline", label: "Outline" },
    { name: "secondary", label: "Secondary" },
    { name: "ghost", label: "Ghost" },
    { name: "destructive", label: "Destructive" },
    { name: "link", label: "Link" },
  ] as const;

  const sizes = ["xs", "sm", "default", "lg", "xl"] as const;

  return (
    <section id="buttons" className="space-y-6">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Buttons
      </h2>

      {/* Variants */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <h3 className="text-sm font-mono text-muted-foreground uppercase">
          Variants (Pill Shape)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Button key={v.name} variant={v.name}>
              {v.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <h3 className="text-sm font-mono text-muted-foreground uppercase">
          Sizes (XS to Hero XL)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Button key={s} size={s}>
              Size: {s}
            </Button>
          ))}
        </div>
      </div>

      {/* States & Icons */}
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <h3 className="text-sm font-mono text-muted-foreground uppercase">
          States & Lucide Icons
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button size="default">
            <Calendar className="size-4" />
            <span>Add to Calendar</span>
          </Button>
          <Button variant="outline" size="default">
            <span>Download Brochure</span>
            <Download className="size-4" />
          </Button>
          <Button size="xl" className="w-full sm:w-auto">
            <Sparkles className="size-5" />
            <span>Hero CTA Action</span>
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
