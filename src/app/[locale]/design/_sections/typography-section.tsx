export function TypographySection() {
  return (
    <section id="typography" className="space-y-6">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Typography
      </h2>

      <div className="space-y-4 p-5 rounded-xl border border-border bg-card">
        <div className="space-y-2">
          <span className="font-mono text-xs text-muted-foreground">h1 — font-display</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground">
            PR One — Tech Event & PR Excellence
          </h1>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">h2 — font-display</span>
          <h2 className="text-2xl sm:text-3xl font-semibold font-display text-foreground">
            ผู้นำการจัดสัมมนาและงาน Summit เทคโนโลยีระดับประเทศ
          </h2>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">h3 — font-display</span>
          <h3 className="text-xl font-medium font-display text-foreground">
            Enterprise Solutions & Roadshow Management
          </h3>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">h4 — font-display</span>
          <h4 className="text-lg font-medium font-display text-foreground">
            บริการประชาสัมพันธ์และสร้างสรรค์ประสบการณ์อีเวนต์
          </h4>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">body (TH/EN) — font-sans</span>
          <p className="text-base text-foreground font-sans leading-relaxed">
            บริษัท พีอาร์ วัน เน็ทเวิร์ค จำกัด ก่อตั้งขึ้นในปี 2004 ให้บริการจัดอีเวนต์และประชาสัมพันธ์ครบวงจรสำหรับธุรกิจเทคโนโลยีระดับโลก
          </p>
          <p className="text-base text-foreground-soft font-sans leading-relaxed">
            PR One Network Co., Ltd. has delivered premier IT summits, seminars, and tech conferences across Southeast Asia.
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">numbers & labels — font-mono</span>
          <div className="font-mono text-xl text-primary font-semibold">
            EST. 2004 / 500+ EVENTS DELIVERED
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground">muted & subtle text</span>
          <p className="text-sm text-muted-foreground">
            ข้อมูลอ้างอิงและเงื่อนไขการให้บริการตามนโยบายความเป็นส่วนตัว (PDPA)
          </p>
          <p className="text-xs text-subtle-foreground font-mono">
            Token: text-subtle-foreground (caption, meta)
          </p>
        </div>
      </div>
    </section>
  );
}
