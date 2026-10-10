import { Badge } from "@/components/ui/badge";

export function BadgesSection() {
  const variants = [
    { name: "default", label: "default" },
    { name: "brand", label: "brand (lime tint)" },
    { name: "secondary", label: "secondary" },
    { name: "outline", label: "outline" },
    { name: "destructive", label: "destructive" },
  ] as const;

  return (
    <section id="badges" className="space-y-4">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Badges
      </h2>
      <div className="p-5 rounded-xl border border-border bg-card space-y-4">
        <p className="text-sm text-foreground-soft">
          Badges use <code className="font-mono text-xs">font-mono</code>, pill shape (<code className="font-mono text-xs">rounded-full</code>), and lowercase text.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {variants.map((b) => (
            <Badge key={b.name} variant={b.name}>
              {b.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
