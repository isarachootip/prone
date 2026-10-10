# AGENTS.md — PR One Website

กติกาสำหรับ AI Agent ทุกตัวที่ทำงานในโปรเจกต์นี้ อ่านไฟล์นี้ให้จบก่อนเริ่มงานทุกครั้ง

## โปรเจกต์นี้คืออะไร

เว็บไซต์บริษัท PR One Network Co., Ltd. (เอเจนซี event และ PR ในกรุงเทพฯ ก่อตั้ง 2004)
กลุ่มเป้าหมายหลักคือบริษัท IT / Software ที่จัดสัมมนา, summit, roadshow
เป้าหมายของเว็บ: (1) ชวนลงทะเบียนอีเวนต์ (2) แสดงผลงานรายปีเป็น case study (3) ให้ติดต่อผ่าน LINE / Facebook / ฟอร์มได้ง่าย
หน้าตาอ้างอิง: concept หน้าแรกโทนมืดแบบ tech, สีแบรนด์ lime

## Tech stack (ห้ามเปลี่ยนหรือเพิ่ม library ใหญ่โดยไม่ถามก่อน)

- Next.js (App Router) + TypeScript (strict) + pnpm
- Tailwind CSS v4 + shadcn/ui (component อยู่ในโปรเจกต์ที่ `src/components/ui`)
- next-intl สำหรับ TH/EN (route `/th` และ `/en`, ค่าเริ่มต้น `th`)
- react-hook-form + zod สำหรับฟอร์ม
- lucide-react สำหรับไอคอน
- Playwright สำหรับ visual test

## โครงสร้างโฟลเดอร์

```
src/app/[locale]/...        หน้าเว็บ
src/app/globals.css         design tokens (ที่เดียวที่มีค่าสีได้)
src/components/ui/          primitive ของ shadcn ที่ปรับธีมแล้ว  ← ผู้ดูแล DS เป็นเจ้าของ
src/components/brand/       component เฉพาะของ PR One           ← ผู้ดูแล DS เป็นเจ้าของ
src/components/sections/    section ของหน้า ประกอบจาก ui + brand
src/content/                ข้อมูลอีเวนต์, ลูกค้า, case study (typed .ts)
src/messages/{th,en}.json   ข้อความทุกภาษา
design/                     เอกสาร token และ globals.css ต้นฉบับ
docs/PROMPTS.md             แผนงานทีละ step
```

## กติกา Design System (สำคัญที่สุด)

1. **ใช้ของที่มีก่อนเสมอ** ลำดับการเลือก: `components/brand` → `components/ui` → ถ้าไม่มีจริงๆ ให้หยุดและเสนอ component ใหม่ ห้ามสร้าง component ซ้ำกับที่มีอยู่
2. **ห้ามใส่สีเอง** ห้าม hex, `rgb()`, `oklch()`, `bg-blue-500`, `text-[#fff]` ในโค้ด ใช้ token เท่านั้น:
   - พื้น: `bg-background`, `bg-surface-sunken`, `bg-card`, `bg-popover`, `bg-muted`
   - ตัวอักษร: `text-foreground`, `text-foreground-soft`, `text-subtle-foreground`, `text-muted-foreground`
   - เส้น: `border-border`, `border-border-strong`
   - แบรนด์: `bg-primary text-primary-foreground` (lime) — ใช้กับ CTA หลักและจุดเน้นเท่านั้น ไม่เกิน 1–2 จุดต่อหน้าจอ
   - สีรอง `brand-alt-1/2/3` ใช้แยกประเภทอีเวนต์เท่านั้น
3. **`accent` ไม่ใช่สีแบรนด์** ใน shadcn `bg-accent` คือพื้นตอน hover/focus ถ้าต้องการสีแบรนด์ให้ใช้ `primary` หรือ `brand`
4. **ฟอนต์** ใช้ `font-display` (Space Grotesk) กับหัวข้อ, `font-sans` (IBM Plex Sans + Plex Sans Thai) กับเนื้อหา, `font-mono` (IBM Plex Mono) กับตัวเลข, วันที่, countdown, label ตัวเล็ก ห้ามกำหนด font-family เอง
5. **รูปทรง** การ์ด `rounded-xl`, ช่องกรอก `rounded-lg`, ปุ่ม/badge/chip `rounded-full`
6. **ห้ามแก้ `src/components/ui/*` และ `src/app/globals.css`** เว้นแต่ prompt ของ step นั้นสั่งชัดเจน ถ้าคิดว่าควรแก้ ให้เขียนข้อเสนอไว้ในรายงานท้ายงาน
7. ทุก component ใหม่ใน `brand/` ต้องเพิ่มตัวอย่างในหน้า `/design` ด้วย

## กติกาเนื้อหาและภาษา

- ห้าม hard-code ข้อความที่ผู้ใช้เห็น ทุกข้อความต้องอยู่ใน `src/messages/th.json` และ `en.json` คู่กันเสมอ
- **ห้ามแต่งข้อมูลขึ้นเอง** (ตัวเลขผลงาน, ชื่อลูกค้า, วันที่, เบอร์โทร, คำรับรอง) ถ้าไม่มีข้อมูลจริงให้ใส่ placeholder ในวงเล็บเหลี่ยม เช่น `[จำนวนอีเวนต์]`, `[DD Mon 2026]`
- ข้อมูลจริงที่ยืนยันแล้ว: ก่อตั้ง 2004; ลูกค้าตัวอย่าง Cisco, Dell, Oracle, Huawei, Lenovo, UiPath, Cohesity, NTT DATA; ที่อยู่ 206 ซอยรามอินทรา 57 แขวงท่าแร้ง เขตบางเขน กรุงเทพฯ 10220

## คุณภาพและการเข้าถึง

- Mobile-first ทดสอบที่ความกว้าง 375px, 768px, 1440px
- ใช้ semantic HTML, ทุกรูปมี `alt`, ทุกปุ่มที่มีแต่ไอคอนต้องมี `aria-label`, focus ring ต้องเห็นชัด
- รูปใช้ `next/image` เสมอ
- เคารพ `prefers-reduced-motion`
- Server Component เป็นค่าเริ่มต้น ใส่ `"use client"` เฉพาะ component ที่ต้องมี state หรือ event

## วิธีทำงาน (ทุก step)

1. อ่าน AGENTS.md และไฟล์ที่ prompt อ้างถึงก่อน
2. ทำ **เฉพาะ** ขอบเขตของ step ที่สั่ง ห้ามทำ step ถัดไปล่วงหน้า ห้าม refactor ไฟล์ที่ไม่เกี่ยว
3. ก่อนรายงานว่าเสร็จ ต้องรันและผ่านทั้งหมด:
   ```
   pnpm lint && pnpm typecheck && pnpm check:tokens && pnpm build
   ```
4. รายงานท้ายงานในรูปแบบนี้แล้ว **หยุดรอ**:
   - สิ่งที่ทำ (สั้นๆ)
   - ไฟล์ที่สร้าง / แก้ไข
   - ผลคำสั่งตรวจทั้ง 4 ตัว
   - สิ่งที่ยังค้างหรือข้อสงสัย
   - ข้อเสนอที่ต้องให้ผู้ดูแล DS ตัดสินใจ (ถ้ามี)
5. ถ้าไม่แน่ใจ ให้ถาม อย่าเดา

## สิ่งที่ห้ามทำเด็ดขาด

- ติดตั้ง UI library อื่น (MUI, Chakra, Ant, Bootstrap ฯลฯ)
- ลบหรือแก้ AGENTS.md, `.agents/`, `design/`, `docs/PROMPTS.md`, `scripts/check-tokens.mjs`
- ใส่ API key หรือข้อมูลลับในโค้ด (ใช้ `.env.local` และอัปเดต `.env.example`)
- ส่งอีเมลหรือข้อมูลฟอร์มไปบริการภายนอกจริงก่อนได้รับอนุมัติ
- ปิด lint rule หรือใส่ `token-ok` เองเพื่อให้ผ่าน (ยกเว้น prompt ของ step นั้นสั่งชัดเจน)
