---
trigger: glob
globs: src/components/**/*.tsx
description: วิธีเขียน component ของ PR One (ui, brand, sections)
---

# การเขียน component ของ PR One

ใช้เมื่อสร้างหรือแก้ไฟล์ใน `src/components/`

## รูปแบบไฟล์

- 1 component ต่อ 1 ไฟล์ ชื่อไฟล์ kebab-case (`event-card.tsx`) ชื่อ export PascalCase (`EventCard`)
- รับ `className` เสมอ และรวมด้วย `cn()` จาก `@/lib/utils` เพื่อให้ปรับระยะจากภายนอกได้
- ใช้ `cva` (class-variance-authority) เมื่อมี variant มากกว่า 1 แบบ แบบเดียวกับ `components/ui/button.tsx`
- Props ต้องมี type ชัดเจน ห้ามใช้ `any`
- ข้อความที่ผู้ใช้เห็นรับผ่าน props หรือ `useTranslations` / `getTranslations` ห้าม hard-code
- ข้อมูล (อีเวนต์, ลูกค้า) รับผ่าน props ที่มี type มาจาก `src/content/types.ts` ห้าม import ข้อมูลตรงเข้า component ใน `brand/`

## ตัวอย่างโครง

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statVariants = cva("font-mono tabular-nums", {
  variants: {
    size: { md: "text-3xl", lg: "text-5xl" },
    tone: { default: "text-foreground", brand: "text-primary" },
  },
  defaultVariants: { size: "md", tone: "default" },
});

type StatNumberProps = React.ComponentProps<"div"> &
  VariantProps<typeof statVariants> & { value: string; label: string };

export function StatNumber({ value, label, size, tone, className, ...props }: StatNumberProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <span className={statVariants({ size, tone })}>{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
```

## ลำดับชั้น

- `ui/` ไม่รู้จักธุรกิจ PR One (ปุ่ม, การ์ด, input)
- `brand/` รู้จักธุรกิจ แต่ไม่รู้จักหน้า (EventCard, YearTimeline)
- `sections/` ประกอบ `brand/` + `ui/` เป็น section ของหน้าใดหน้าหนึ่ง และเป็นที่เดียวที่ดึงข้อมูลจาก `src/content/`
- ห้าม import ย้อนทิศ (`ui` ห้าม import `brand`, `brand` ห้าม import `sections`)

## Checklist ก่อนส่ง

- [ ] ใช้ token ทั้งหมด (`pnpm check:tokens` ผ่าน)
- [ ] ดูดีที่ 375px และ 1440px
- [ ] กดด้วยคีย์บอร์ดได้ และเห็น focus ring
- [ ] เพิ่มตัวอย่างทุก variant ในหน้า `/design` แล้ว
