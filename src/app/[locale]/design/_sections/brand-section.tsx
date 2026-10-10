export function BrandSection() {
  return (
    <section id="brand-components" className="space-y-4">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Brand Components
      </h2>
      <div className="p-8 rounded-xl border border-dashed border-border bg-surface-sunken text-center space-y-2">
        <div className="font-mono text-sm text-primary font-semibold">
          ยังไม่มี (None yet)
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          คอมโพเนนต์เฉพาะของ PR One เช่น EventCard, StatCounter, ClientLogoMarquee, HeroSection จะถูกสร้างและจัดแสดงใน Step 8–9
        </p>
      </div>
    </section>
  );
}
