const radiusTokens = [
  { name: "rounded-sm", px: "8px", usage: "tag เล็ก, chip ขนาดเล็ก", classStr: "rounded-sm" },
  { name: "rounded-md", px: "10px", usage: "รูปย่อ, กล่องข้อความสั้น", classStr: "rounded-md" },
  { name: "rounded-lg", px: "12px", usage: "input, select, textarea", classStr: "rounded-lg" },
  { name: "rounded-xl", px: "16px", usage: "การ์ด, กล่องเนื้อหาหลัก", classStr: "rounded-xl" },
  { name: "rounded-2xl", px: "22px", usage: "กล่อง hero, การ์ดใหญ่", classStr: "rounded-2xl" },
  { name: "rounded-full", px: "pill", usage: "ปุ่ม, badge, filter chip", classStr: "rounded-full" },
];

export function RadiusSection() {
  return (
    <section id="radius" className="space-y-4">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Radius
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {radiusTokens.map((item) => (
          <div
            key={item.name}
            className={`p-4 border border-border-strong bg-card flex flex-col justify-between h-28 ${item.classStr}`}
          >
            <div className="font-mono text-sm font-semibold text-primary">
              {item.name}
            </div>
            <div>
              <div className="font-mono text-xs text-foreground-soft">{item.px}</div>
              <div className="text-xs text-muted-foreground truncate">{item.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
