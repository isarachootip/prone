import Link from "next/link";

interface TocProps {
  sections: { id: string; title: string }[];
}

export function DesignToc({ sections }: TocProps) {
  return (
    <nav
      aria-label="Table of Contents"
      className="p-4 rounded-xl border border-border bg-surface-sunken"
    >
      <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
        Table of Contents
      </div>
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card text-foreground-soft hover:text-foreground hover:border-border-strong transition-colors"
          >
            {section.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
