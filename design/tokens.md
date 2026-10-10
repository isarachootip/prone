# PR One Design Tokens

ต้นฉบับอยู่ที่ `design/globals.css` และถูกคัดลอกไปที่ `src/app/globals.css` ใน Step 2
การเปลี่ยนค่าใดๆ ต้องผ่านผู้ดูแล Design System และแก้ทั้งสองไฟล์ให้ตรงกัน

## สี

| Token (Tailwind class) | ค่า | ใช้กับ |
|---|---|---|
| `bg-background` | `#0B0F17` | พื้นหน้าเว็บ |
| `bg-surface-sunken` | `#0E1320` | แถบหรือ section ที่ต่ำกว่าพื้น |
| `bg-card` | `#121826` | การ์ด |
| `bg-popover` | `#121A2A` | dropdown, dialog, sheet |
| `bg-muted` / `bg-secondary` / `bg-accent` | `#1E2738` | ช่องรอง, skeleton, hover |
| `text-foreground` | `#EEF2F8` | ตัวอักษรหลัก (contrast 17:1) |
| `text-foreground-soft` | `#C4CCDA` | หัวข้อรอง |
| `text-subtle-foreground` | `#A3AEC2` | label, caption |
| `text-muted-foreground` | `#8C97AC` | คำอธิบาย, meta (contrast 6.5:1) |
| `border-border` | `#222C40` | เส้นขอบปกติ |
| `border-border-strong` | `#3A4766` | เส้นขอบที่ต้องเห็นชัด, hover |
| `border-input` | `#2A3550` | ช่องกรอก |
| `bg-primary` / `bg-brand` | `#C6F432` | สีแบรนด์ lime: CTA หลัก, จุดเน้น |
| `text-primary-foreground` | `#04150A` | ตัวอักษรบน lime (contrast 14.7:1) |
| `brand-alt-1` | `#4CC3FF` | ประเภทอีเวนต์: Summit |
| `brand-alt-2` | `#FF7A45` | ประเภทอีเวนต์: Roadshow |
| `brand-alt-3` | `#B79CFF` | ประเภทอีเวนต์: Workshop |
| `bg-destructive` | `#FF5C5C` | ข้อผิดพลาด |

การจับคู่สีรองกับประเภทอีเวนต์ข้างบนเป็นข้อเสนอ ผู้ดูแล DS ยืนยันหรือเปลี่ยนได้

ทุกคู่สีตัวอักษรกับพื้นผ่านเกณฑ์ WCAG AA (4.5:1) แล้ว

## ตัวอักษร

| Class | ฟอนต์ | ใช้กับ |
|---|---|---|
| `font-display` | Space Grotesk (+ IBM Plex Sans Thai) | หัวข้อ h1–h4, ตัวเลขใหญ่ใน hero |
| `font-sans` | IBM Plex Sans + IBM Plex Sans Thai | เนื้อหาทั่วไป (ค่าเริ่มต้น) |
| `font-mono` | IBM Plex Mono | วันที่, countdown, ตัวเลขสถิติ, eyebrow label |

## รูปทรง

`--radius` = 12px

| Class | ค่า | ใช้กับ |
|---|---|---|
| `rounded-sm` | 8px | tag เล็ก |
| `rounded-md` | 10px | รูปย่อ |
| `rounded-lg` | 12px | input, select |
| `rounded-xl` | 16px | การ์ด |
| `rounded-2xl` | 22px | กล่อง hero, การ์ดใหญ่ |
| `rounded-full` | pill | ปุ่ม, badge, filter chip |

## สีที่ยกเว้นได้

สีโลโก้ของแพลตฟอร์มอื่น เช่น LINE `#06C755`, Facebook `#1877F2`, LinkedIn `#0A66C2`
ให้ใส่ใน `src/components/brand/social-icons.tsx` ที่เดียว พร้อมคอมเมนต์ `token-ok: <ชื่อแบรนด์> brand color`
