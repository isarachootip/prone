# PR One Website — Prompt Playbook สำหรับ Antigravity

แผนสร้างเว็บ PR One ใหม่ทีละขั้น ด้วย shadcn/ui + AI Agent
คัดลอก prompt ในกรอบของแต่ละ step ไปวางใน Antigravity ทีละ step เท่านั้น

---

## วิธีใช้ (อ่านก่อนเริ่ม)

**กติกา 1 step = 1 conversation**
เปิด conversation ใหม่ทุก step เพื่อไม่ให้ context เก่าทำให้ Agent สับสน ทุก prompt เขียนให้อ่านเข้าใจได้โดยไม่ต้องรู้ step ก่อนหน้า เพราะ Agent จะอ่าน AGENTS.md เองทุกครั้ง

**รอบการทำงานของแต่ละ step**

1. เปิด conversation ใหม่ เลือกโหมด **Planning**
2. วาง prompt ของ step นั้น
3. อ่าน Implementation Plan ที่ Agent เสนอ ถ้าแผนเกินขอบเขต (ทำงานของ step อื่น, ติดตั้ง library ที่ไม่ได้สั่ง) ให้สั่งแก้ก่อนอนุมัติ
4. ให้ Agent ทำงาน
5. ตรวจตาม "✅ คนตรวจ" ของ step นั้น
6. ถ้าผ่าน: commit ด้วยข้อความที่ให้ไว้ ถ้าไม่ผ่าน: ใช้ prompt **R1** (แก้ไข) ใน conversation เดิม
7. step ที่มีเครื่องหมาย 🔍 ให้เปิด conversation ใหม่แล้วใช้ prompt **R2** (รีวิว) ก่อน commit

**ตั้งค่า Antigravity ที่แนะนำ**
- ให้ Agent ขออนุมัติก่อนรันคำสั่ง terminal อย่างน้อยจนถึง Step 6
- เปิดโฟลเดอร์โปรเจกต์เป็น workspace root (ที่มี AGENTS.md) เพื่อให้ Antigravity โหลดกติกาอัตโนมัติ

**ใครทำอะไร**
- 🧑‍💻 ผู้สั่งงาน: วาง prompt, ตรวจผล, commit
- 🎨 ผู้ดูแล Design System: อนุมัติ step 3–6, 8–9 และทุก PR ที่แตะ `ui/`, `brand/`, `globals.css`

---

## Step 0 — เตรียมโฟลเดอร์ (ทำเอง ไม่ใช้ Agent)

1. สร้างโฟลเดอร์ว่าง เช่น `pr-one-web`
2. คัดลอกไฟล์ทั้งหมดจาก starter kit นี้เข้าไป:
   ```
   AGENTS.md
   .agents/rules/component-authoring.md
   .github/CODEOWNERS
   design/globals.css
   design/tokens.md
   docs/PROMPTS.md
   scripts/check-tokens.mjs
   ```
3. ติดตั้ง Node.js LTS และ pnpm (`npm i -g pnpm`)
4. แก้ `.github/CODEOWNERS` ใส่ GitHub username ของผู้ดูแล DS
5. เปิดโฟลเดอร์ใน Antigravity

---

## Step 1 — สร้างโปรเจกต์ Next.js

**เป้าหมาย:** ได้โปรเจกต์เปล่าที่ build ผ่าน พร้อมคำสั่งตรวจครบทั้ง 4 ตัว

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 1: สร้างโครงโปรเจกต์ Next.js ในโฟลเดอร์นี้

ข้อควรระวัง: โฟลเดอร์นี้มีไฟล์ของทีมอยู่แล้ว (AGENTS.md, .agents/, .github/, design/, docs/, scripts/) ห้ามลบหรือเขียนทับไฟล์เหล่านี้

สิ่งที่ต้องทำ:
1. สร้างโปรเจกต์ด้วย create-next-app เวอร์ชันล่าสุดในโฟลเดอร์ชั่วคราว `_scaffold` ด้วยตัวเลือก: TypeScript, ESLint, Tailwind CSS, App Router, src directory, import alias "@/*", pnpm
2. ย้ายไฟล์จาก `_scaffold` เข้ามาที่ root โดยไม่เขียนทับไฟล์ของทีม แล้วลบ `_scaffold`
3. เปิด TypeScript strict mode
4. เพิ่ม scripts ใน package.json:
   - "typecheck": "tsc --noEmit"
   - "check:tokens": "node scripts/check-tokens.mjs src"
   - "check": "pnpm lint && pnpm typecheck && pnpm check:tokens && pnpm build"
5. ลบเนื้อหาตัวอย่างใน src/app/page.tsx ให้เหลือแค่ <main> ที่มีข้อความ "PR One — coming soon"
6. ลบสีและสไตล์ตัวอย่างใน src/app/globals.css ให้เหลือแค่ `@import "tailwindcss";` (Step 3 จะใส่ธีมจริง)
7. สร้าง .env.example (ว่างไว้) และตรวจว่า .gitignore มี .env.local
8. git init และตั้ง branch หลักเป็น main (ยังไม่ต้อง commit)

ห้ามทำ: ติดตั้ง shadcn/ui, next-intl หรือ library อื่น (อยู่ใน step ถัดไป)

เมื่อเสร็จ: รัน `pnpm check` ให้ผ่าน แล้วรายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ**
- [ ] ไฟล์ของทีมทั้ง 7 ไฟล์ยังอยู่ครบและไม่ถูกแก้
- [ ] `pnpm dev` แล้วเปิด http://localhost:3000 เห็น "PR One — coming soon"
- [ ] `pnpm check` ผ่าน

**Commit:** `chore: scaffold Next.js project with check scripts`

---

## Step 2 — โครงสร้าง 2 ภาษา (TH/EN)

**เป้าหมาย:** ทุกหน้าอยู่ใต้ `/th` และ `/en` ตั้งแต่ต้น เพื่อไม่ต้องย้ายไฟล์ทีหลัง

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 2: ตั้งระบบ 2 ภาษาด้วย next-intl

สิ่งที่ต้องทำ:
1. ติดตั้ง next-intl และตั้งค่าตามเอกสารทางการล่าสุดของ next-intl สำหรับ App Router และเวอร์ชัน Next.js ที่ติดตั้งอยู่ (ตรวจว่าเวอร์ชันนี้ใช้ middleware.ts หรือ proxy.ts)
2. locales: ["th", "en"], defaultLocale: "th", localePrefix: "always"
3. ย้ายหน้าไปอยู่ใต้ src/app/[locale]/ (layout.tsx, page.tsx) และให้ <html lang> ตรงกับ locale
4. สร้าง src/messages/th.json และ src/messages/en.json โดยมี namespace เริ่มต้น:
   - "meta": { "siteName", "tagline" }
   - "nav": { "home", "events", "work", "services", "about", "contact" }
   - "common": { "comingSoon", "registerFree", "addToCalendar", "readMore", "contactUs" }
   ใส่คำแปลไทยและอังกฤษที่เป็นธรรมชาติ tagline ให้ใส่ "[tagline]" ไว้ก่อน
5. หน้าแรกแสดงข้อความ common.comingSoon จากไฟล์ภาษา
6. สร้าง src/i18n/navigation.ts ที่ export Link, redirect, usePathname, useRouter แบบรู้ภาษา ตามแนวทางของ next-intl
7. เข้า "/" ต้อง redirect ไป "/th"

ห้ามทำ: ติดตั้ง shadcn/ui หรือสร้าง UI ใดๆ

เมื่อเสร็จ: รัน `pnpm check` ให้ผ่าน รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ**
- [ ] เปิด `/` แล้วไป `/th` เห็นข้อความไทย
- [ ] เปิด `/en` เห็นข้อความอังกฤษ
- [ ] ไม่มีข้อความ hard-code ใน page.tsx

**Commit:** `feat(i18n): add next-intl with th/en routing`

---

## Step 3 — ติดตั้ง shadcn/ui + ธีม PR One + ฟอนต์ 🔍

**เป้าหมาย:** ธีมของแบรนด์ถูกใช้ทั้งเว็บ ก่อนจะมี component ใดๆ

```text
อ่าน AGENTS.md และ design/tokens.md ก่อนเริ่มงาน

งาน Step 3: ติดตั้ง shadcn/ui และใส่ธีม PR One

สิ่งที่ต้องทำ:
1. รัน `pnpm dlx shadcn@latest init` เลือก style ค่าเริ่มต้น, base color "neutral", ใช้ CSS variables
2. หลัง init เสร็จ ให้แทนที่เนื้อหาทั้งหมดของ src/app/globals.css ด้วยเนื้อหาจาก design/globals.css แบบคำต่อคำ (ไฟล์นี้คือ token ที่ผู้ดูแล DS อนุมัติแล้ว ห้ามดัดแปลง)
   - ถ้า init ติดตั้ง tw-animate-css มาแล้วให้ใช้ต่อ ถ้ายังไม่มีให้ติดตั้ง
3. สร้าง src/app/fonts.ts โหลดฟอนต์ด้วย next/font/google และตั้งชื่อตัวแปร CSS ให้ตรงกับที่ globals.css ใช้:
   - Space_Grotesk weights 400,500,600,700 → variable "--font-space-grotesk"
   - IBM_Plex_Sans weights 400,500,600 → variable "--font-plex-sans"
   - IBM_Plex_Sans_Thai subsets ["thai","latin"] weights 400,500,600,700 → variable "--font-plex-thai"
   - IBM_Plex_Mono weights 400,500 → variable "--font-plex-mono"
   - ทุกตัวใช้ display: "swap"
4. ใน src/app/[locale]/layout.tsx ใส่ class ของตัวแปรฟอนต์ทั้ง 4 และ class "dark" ที่ <html>
5. ติดตั้ง component พื้นฐานด้วย shadcn CLI (ยังไม่ต้องปรับแต่ง):
   button, badge, card, input, textarea, label, select, checkbox, tabs, dialog, sheet, dropdown-menu, navigation-menu, accordion, separator, tooltip, skeleton, sonner
6. ปรับหน้าแรกชั่วคราวให้แสดง: หัวข้อ h1 (font-display), ย่อหน้าไทย 1 ย่อหน้า, ตัวเลข "2004" ด้วย font-mono และปุ่ม Button 1 ปุ่ม เพื่อพิสูจน์ว่าธีมและฟอนต์ทำงาน (ข้อความผ่านไฟล์ภาษา)

ห้ามทำ: แก้ไฟล์ใน src/components/ui/ ที่ CLI สร้างมา (ปรับใน Step 4), แก้ค่าใน globals.css

เมื่อเสร็จ: รัน `pnpm check` ให้ผ่าน และแนบผลเปรียบเทียบว่า src/app/globals.css ตรงกับ design/globals.css ทุกบรรทัด (diff ว่าง) รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ** (🎨 ผู้ดูแล DS ร่วมตรวจ)
- [ ] พื้นเว็บเป็นสี `#0B0F17` และปุ่มเป็นสี lime ตัวอักษรเข้ม
- [ ] หัวข้อเป็น Space Grotesk, ภาษาไทยเป็น IBM Plex Sans Thai (ไม่ใช่ฟอนต์ระบบ), ตัวเลข 2004 เป็น mono
- [ ] `diff design/globals.css src/app/globals.css` ไม่มีความต่าง

**Commit:** `feat(ds): install shadcn/ui with PR One theme and fonts`

---

## Step 4 — ปรับ primitive ให้เป็นสไตล์ PR One 🔍

**เป้าหมาย:** ปุ่ม, badge, การ์ด, input หน้าตาตาม concept ไม่ใช่ shadcn ค่าเริ่มต้น

```text
อ่าน AGENTS.md และ design/tokens.md ก่อนเริ่มงาน

งาน Step 4: ปรับ component พื้นฐานใน src/components/ui/ ให้เป็นสไตล์ PR One (step นี้อนุญาตให้แก้ ui/)

ทิศทางของแบรนด์: เว็บโทนมืดแบบ tech event, สะอาด, คมชัด, สี lime เป็นจุดเน้นเพียงไม่กี่จุด

สิ่งที่ต้องทำ:
1. button.tsx
   - ทุกขนาดเป็น rounded-full, font-medium
   - default: bg-primary text-primary-foreground, hover สว่างขึ้นเล็กน้อย (ใช้ opacity หรือ brightness ไม่ใช่สีใหม่)
   - outline: พื้นโปร่ง border-border-strong text-foreground, hover bg-accent
   - secondary: bg-secondary text-secondary-foreground
   - ghost: hover bg-accent
   - link: text-primary underline-offset-4
   - เพิ่ม size "xl" (h-14 px-8 text-base) สำหรับ CTA ใน hero
   - transition ใช้ duration-150 และ ease-brand
2. badge.tsx: rounded-full, font-mono, ตัวพิมพ์เล็ก text-xs tracking-wide เพิ่ม variant "outline" (border-border-strong) และ "brand" (bg-primary/15 text-primary)
3. card.tsx: bg-card, border border-border, rounded-xl, ไม่มีเงา, hover ของการ์ดที่คลิกได้ให้ border-border-strong (ทำเป็น prop interactive?: boolean)
4. input.tsx, textarea.tsx, select trigger: bg-surface-sunken border-input rounded-lg, focus ring สี ring
5. tabs.tsx: TabsList แบบ pill (rounded-full bg-surface-sunken p-1), TabsTrigger ที่ active เป็น bg-card text-foreground
6. ตรวจทุกไฟล์ใน ui/ ว่าไม่มีสีนอก token

ห้ามทำ: เปลี่ยน API หรือชื่อ props เดิมของ shadcn (เพิ่มได้ ห้ามลบ), แก้ globals.css

เมื่อเสร็จ: รัน `pnpm check` ให้ผ่าน รายงานตามรูปแบบใน AGENTS.md พร้อมตารางสรุปว่าแต่ละไฟล์เปลี่ยนอะไร แล้วหยุดรอ
```

**✅ คนตรวจ** (🎨)
- [ ] ปุ่มเป็น pill, variant ครบ 5 แบบ + size xl
- [ ] การ์ดไม่มีเงา ขอบบางสี border
- [ ] ใช้ R2 รีวิวก่อน commit

**Commit:** `feat(ds): style shadcn primitives for PR One`

---

## Step 5 — หน้า /design (ตัวอย่าง design system)

**เป้าหมาย:** หน้าเดียวที่รวมทุก token และ component ให้ Agent ดูเป็นต้นแบบ และให้ผู้ดูแล DS ตรวจได้

```text
อ่าน AGENTS.md และ design/tokens.md ก่อนเริ่มงาน

งาน Step 5: สร้างหน้า /[locale]/design เป็น living style guide

สิ่งที่ต้องทำ:
1. สร้าง src/app/[locale]/design/page.tsx ตั้ง metadata robots noindex, nofollow
2. section ในหน้า (เรียงตามนี้ แต่ละ section มีหัวข้อและ anchor id):
   - Colors: swatch ทุก token ใน design/tokens.md แสดงชื่อ class และค่าสี (อ่านค่าจาก CSS variable ตอน runtime ด้วย getComputedStyle ไม่ hard-code hex)
   - Typography: h1–h4, body ไทยและอังกฤษ, font-mono, muted text
   - Radius: กล่องตัวอย่างทุกขนาด
   - Buttons: ทุก variant × ทุก size, สถานะ disabled, ปุ่มที่มีไอคอน lucide
   - Badges: ทุก variant
   - Cards: ปกติ และ interactive
   - Form: input, textarea, select, checkbox, label พร้อมสถานะ error
   - Tabs, Accordion, Dialog, Sheet, Dropdown, Tooltip, Toast (sonner), Skeleton
   - Brand components: ใส่หัวข้อไว้พร้อมข้อความ "ยังไม่มี" (Step 8–9 จะเติม)
3. มีสารบัญด้านบนลิงก์ไปแต่ละ section
4. หน้านี้เป็นภาษาอังกฤษล้วนได้ (เป็นเครื่องมือภายใน) แต่ตัวอย่าง typography ต้องมีภาษาไทย
5. แยกแต่ละ section เป็นไฟล์ใน src/app/[locale]/design/_sections/ เพื่อให้เพิ่มทีหลังง่าย

เมื่อเสร็จ: รัน `pnpm check` ให้ผ่าน รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ** (🎨)
- [ ] เปิด `/th/design` เห็นครบทุก section
- [ ] ดูที่หน้าจอมือถือ (375px) ไม่มี scroll แนวนอน

**Commit:** `feat(ds): add /design living style guide`

---

## Step 6 — ด่านตรวจอัตโนมัติ (Playwright + CI)

**เป้าหมาย:** ถ้า Agent ทำหน้าตาเพี้ยนหรือใช้สีนอก token ระบบจะจับได้เอง

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 6: ตั้ง visual regression test และ CI

สิ่งที่ต้องทำ:
1. ติดตั้ง @playwright/test และ browser chromium
2. สร้าง playwright.config.ts: ใช้ webServer รัน `pnpm build && pnpm start` ที่ port 3000, projects 2 ขนาด: mobile (375x812) และ desktop (1440x900)
3. สร้าง tests/visual/design.spec.ts: ถ่าย screenshot แต่ละ section ของ /en/design (ใช้ locator ของ section ไม่ใช่ทั้งหน้า) แล้วเทียบกับ snapshot, ปิด animation ระหว่างถ่าย
4. สร้าง tests/smoke.spec.ts: เปิด /th และ /en แล้วตรวจว่าโหลดได้ ไม่มี console error และ <html lang> ถูกต้อง
5. เพิ่ม scripts: "test:e2e", "test:visual", "test:visual:update"
6. สร้าง .github/workflows/ci.yml: บน pull_request และ push ไป main รัน pnpm install, pnpm check, และ Playwright tests (cache pnpm store)
7. สร้าง baseline snapshot ด้วย test:visual:update
8. เขียน README.md ส่วน "Development" อธิบายคำสั่งทั้งหมดเป็นภาษาไทย และระบุว่าการอัปเดต snapshot ต้องได้รับอนุมัติจากผู้ดูแล DS

ห้ามทำ: แก้ไฟล์ใน .github/CODEOWNERS

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` ให้ผ่าน รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ**
- [ ] ลองแก้สีปุ่มเล่นๆ ใน button.tsx เป็น `bg-blue-500` แล้วรัน `pnpm check:tokens` ต้องไม่ผ่าน (แล้ว revert)
- [ ] push ขึ้น GitHub แล้ว CI ทำงาน
- [ ] ตั้ง branch protection ของ main ให้ต้องผ่าน CI และต้องมี review จาก code owner

**Commit:** `ci: add playwright visual tests and CI workflow`

---

## Step 7 — โครงข้อมูลเนื้อหา

**เป้าหมาย:** แยกข้อมูลอีเวนต์, ลูกค้า, ผลงาน ออกจาก UI เพื่อให้ทีมเปลี่ยนข้อมูลได้โดยไม่แตะ component

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 7: สร้าง content model ใน src/content/

สิ่งที่ต้องทำ:
1. src/content/types.ts กำหนด type:
   - Localized<T> = { th: T; en: T }
   - EventType = "seminar" | "summit" | "roadshow" | "workshop"
   - Event: slug, title (Localized<string>), type, date (ISO string), venue (Localized<string>), client, summary (Localized<string>), registerUrl?, status ("upcoming" | "past"), cover? (path รูป)
   - Client: name, logo? (path), industry ("tech" | "enterprise" | "government" | "consumer")
   - CaseStudy: slug, title, client, year, eventType, challenge, whatWeDid, results (array ของ { label: Localized<string>; value: string }), gallery (array path), featured: boolean
   - Service: id, title, description, items (Localized<string[]>)
2. src/content/clients.ts: ลูกค้าเหล่านี้ (ชื่อจริง ยังไม่มีโลโก้): Cisco, Dell, Oracle, Huawei, Lenovo, Fujitsu, UiPath, Cohesity, NTT DATA, Infor, Tricentis, Ping Identity, Sitecore, Aruba, Westcon, STT GDC, Bosch, SCG, Malee, TIPCO
3. src/content/events.ts: อีเวนต์ upcoming 3 รายการเป็น placeholder ทั้งหมด (ชื่อ "[ชื่ออีเวนต์]", วันที่ในอนาคต, ลูกค้า "[ลูกค้า]")
4. src/content/case-studies.ts: 6 รายการจากผลงานจริงปี 2026: UiPath Fusion Summit Bangkok, Cohesity Resilience, STT GDC Bangkok, Benz BKK Concert, Thailand Trader Fair, Asia Sourcing Show Press Conference — ใส่ชื่อ, ลูกค้า, ปี, ประเภทได้ แต่ challenge / whatWeDid / results ให้เป็น placeholder "[...]" ทั้งหมด ห้ามแต่ง
5. src/content/services.ts: 5 บริการ: Event Management, PR & Media Relations, Marketing Campaign, Lead Generation & Database, Creative & Content — เขียนคำอธิบายสั้นไทย/อังกฤษได้ (เป็นข้อความการตลาด ไม่ใช่ตัวเลข)
6. src/content/site.ts: ข้อมูลบริษัท ที่อยู่ (จาก AGENTS.md), foundedYear 2004, social links เป็น placeholder "[LINE OA URL]" ฯลฯ, ช่องทางติดต่อเป็น placeholder
7. src/content/index.ts: helper getUpcomingEvents(), getEventsByYear(), getFeaturedCaseStudies(), getCaseStudy(slug)
8. เขียน unit test สั้นๆ สำหรับ helper ด้วย vitest (ติดตั้ง vitest ได้) และเพิ่ม script "test"

ห้ามทำ: สร้าง UI

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test` ให้ผ่าน รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ**
- [ ] ไม่มีตัวเลขหรือผลลัพธ์ที่แต่งขึ้น (ค้นคำว่า `[` เจอ placeholder ครบ)
- [ ] ส่งรายการ placeholder ให้ทีมการตลาดเติมข้อมูลจริง

**Commit:** `feat(content): add typed content model with placeholders`

---

## Step 8 — Brand components ชุด 1: โครงเว็บ 🔍

```text
อ่าน AGENTS.md และ .agents/rules/component-authoring.md ก่อนเริ่มงาน

งาน Step 8: สร้าง brand component ชุดโครงเว็บใน src/components/brand/

component ที่ต้องสร้าง:
1. Eyebrow: label ตัวเล็กเหนือหัวข้อ font-mono text-xs uppercase tracking-widest text-muted-foreground มีจุดสี primary ด้านหน้า (optional)
2. SectionHeading: eyebrow?, title, description?, align ("left" | "center"), action? (ReactNode ด้านขวา)
3. StatNumber: value, label, size, tone (ดูตัวอย่างใน component-authoring.md)
4. ClientLogoWall: รับ clients[], โหมด "marquee" (เลื่อนแนวนอนวนซ้ำ หยุดเมื่อ hover และเมื่อ prefers-reduced-motion) และ "grid" ถ้าไม่มีโลโก้ให้แสดงชื่อด้วย font-display text-muted-foreground
5. SocialIcons: ไอคอน LINE, Facebook, LinkedIn, YouTube, Instagram เป็น SVG inline ไฟล์นี้เป็นไฟล์เดียวที่ใช้สีแบรนด์ภายนอกได้ โดยต้องมีคอมเมนต์ `token-ok: <ชื่อแพลตฟอร์ม> brand color` ทุกบรรทัดที่มี hex
6. LanguageSwitch: pill TH | EN สลับภาษาแล้วอยู่หน้าเดิม (ใช้ navigation จาก src/i18n)
7. SiteHeader: โลโก้ (ใช้ข้อความ "PR One" font-display ไปก่อน), เมนูจาก messages nav, LanguageSwitch, ปุ่ม CTA "ติดต่อเรา" ขอบ; sticky พร้อม backdrop blur และพื้น bg-background/80; มือถือใช้ Sheet เป็นเมนู
8. SiteFooter: ข้อมูลบริษัทจาก props, ลิงก์เมนู, SocialIcons, ปีลิขสิทธิ์อัตโนมัติ

ใช้ SiteHeader และ SiteFooter ใน src/app/[locale]/layout.tsx (ส่งข้อมูลจาก src/content/site.ts ผ่าน props)
เพิ่มตัวอย่างทุก component และทุก variant ในหน้า /design section "Brand components"
ข้อความใหม่ทั้งหมดเพิ่มใน th.json และ en.json

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` (อัปเดต snapshot เฉพาะ section brand ที่เพิ่มใหม่ได้ แต่ห้ามอัปเดต snapshot ของ section เดิม) รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ** (🎨)
- [ ] เมนูมือถือเปิด-ปิดได้ กด Tab ได้ครบ
- [ ] สลับภาษาแล้วอยู่หน้าเดิม
- [ ] snapshot ของ section เดิมไม่ถูกเปลี่ยน

**Commit:** `feat(brand): add site shell components`

---

## Step 9 — Brand components ชุด 2: อีเวนต์และผลงาน 🔍

```text
อ่าน AGENTS.md และ .agents/rules/component-authoring.md ก่อนเริ่มงาน

งาน Step 9: สร้าง brand component ด้านอีเวนต์และผลงานใน src/components/brand/

component ที่ต้องสร้าง:
1. EventTypeBadge: รับ EventType แสดง badge พร้อมจุดสีตาม design/tokens.md (summit=brand-alt-1, roadshow=brand-alt-2, workshop=brand-alt-3, seminar=primary)
2. Countdown ("use client"): รับ target date แสดง วัน : ชั่วโมง : นาที : วินาที ด้วย font-mono tabular-nums, อัปเดตทุกวินาที, ไม่เกิด hydration mismatch (render ค่าแรกหลัง mount), มี aria-live="off" และข้อความเต็มสำหรับ screen reader
3. NextEventCard: การ์ดใหญ่ rounded-2xl สำหรับ hero แสดง eyebrow "Next on stage", EventTypeBadge, ชื่อ, วันที่, สถานที่, Countdown, ปุ่ม "ลงทะเบียนฟรี" (Button size xl) และ "+ ปฏิทิน" (outline)
4. EventCard: การ์ดอีเวนต์ในรายการ: วันที่แบบ mono ด้านบน, badge, ชื่อ, สถานที่, ลูกค้า, ปุ่ม 2 ปุ่มเหมือนข้างบนแต่ขนาดเล็ก, interactive
5. EventFilter ("use client"): filter chip แบบ pill เลือกประเภทอีเวนต์ได้ (ทั้งหมด / seminar / summit / roadshow / workshop) controlled ผ่าน props value/onChange
6. YearTimeline ("use client"): แถบปีแนวนอน 2004 → ปีถัดไป ปีที่มีข้อมูลกดได้ แสดงรายการอีเวนต์ของปีนั้นด้านล่าง ปีสุดท้ายแสดงการ์ด "Open slot — จองวันจัดงานของคุณ" ใช้คีย์บอร์ดลูกศรซ้ายขวาได้ (role tablist)
7. CaseStudyCard: รูปปก (next/image, ถ้าไม่มีให้เป็นกล่อง bg-muted ลายเส้นทแยง), ลูกค้า, ชื่อ, ปี, badge ประเภท, ผลลัพธ์เด่นสูงสุด 2 ค่า (StatNumber size md)
8. AddToCalendar: สร้างไฟล์ .ics ฝั่ง client จากข้อมูล Event แล้วดาวน์โหลด และมีลิงก์ Google Calendar
9. SocialConnect: การ์ด LINE OA ขนาดใหญ่ (ช่องว่างสำหรับ QR, ปุ่ม Add friend) + ลิงก์โซเชียลอื่นด้วย SocialIcons
10. NewsletterSignup: input อีเมล + ปุ่ม ตรวจด้วย zod, submit ตอนนี้ให้แสดง toast สำเร็จเท่านั้น (ยังไม่ส่งข้อมูลจริง ใส่ TODO ไว้)

เพิ่มตัวอย่างทุก component ในหน้า /design โดยใช้ข้อมูลจาก src/content
ข้อความใหม่ทั้งหมดเพิ่มใน th.json และ en.json

เมื่อเสร็จ: รัน `pnpm check`, `pnpm test`, `pnpm test:e2e` (กติกา snapshot เหมือน Step 8) รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ** (🎨)
- [ ] Countdown ไม่กระพริบตอนโหลดหน้า
- [ ] ดาวน์โหลด .ics แล้วเปิดในปฏิทินได้
- [ ] YearTimeline ใช้ลูกศรคีย์บอร์ดได้

**Commit:** `feat(brand): add event and case study components`

---

## Step 10 — หน้าแรก

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 10: ประกอบหน้าแรก /[locale] จาก component ที่มีอยู่ (ห้ามสร้าง brand component ใหม่ ถ้าขาดให้หยุดและเสนอ)

สร้าง section ใน src/components/sections/home/ ตามลำดับ:
1. HeroSection: ซ้าย = Eyebrow, h1 2 บรรทัด (คำสำคัญบรรทัดที่ 2 เป็น text-primary), คำอธิบาย, CTA 2 ปุ่ม; ขวา = NextEventCard ของอีเวนต์ที่ใกล้ที่สุด
2. ClientMarquee: ClientLogoWall โหมด marquee
3. UpcomingEventsSection: SectionHeading + EventFilter + grid EventCard (1 คอลัมน์มือถือ, 3 คอลัมน์ desktop)
4. RoadmapSection: SectionHeading "Event roadmap" + YearTimeline
5. ServicesSection: 4–5 การ์ดบริการจาก src/content/services.ts
6. FeaturedWorkSection: CaseStudyCard 3 ใบที่ featured + ลิงก์ "ดูผลงานทั้งหมด"
7. StatsSection: StatNumber แสดง "2004" (ปีก่อตั้ง), "[จำนวนอีเวนต์]", "[จำนวนแบรนด์]" — ใช้ข้อมูลจริงเฉพาะที่มี
8. ConnectSection: SocialConnect + NewsletterSignup
9. ContactCTA: แถบปิดท้ายพื้น surface-sunken หัวข้อ + ปุ่มไปหน้า contact

ข้อกำหนด:
- เว้นระยะ section เท่ากันทั้งหน้า (py-20 มือถือ, py-28 desktop) container max-w-7xl px-4 md:px-8
- สี primary ปรากฏเด่นไม่เกิน 2 จุดต่อหน้าจอ
- ตั้ง metadata ของหน้า (title, description) ทั้ง 2 ภาษาผ่าน generateMetadata

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` เพิ่ม visual test ของหน้าแรกทั้ง 2 ขนาด รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**✅ คนตรวจ**
- [ ] เทียบกับ concept หน้าแรก: ลำดับ section และอารมณ์ตรงกัน
- [ ] ดูบนมือถือจริง 1 เครื่อง

**Commit:** `feat(pages): build home page`

---

## Step 11 — หน้าผลงาน (Work)

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 11: สร้างหน้า /[locale]/work และ /[locale]/work/[slug]

1. /work: SectionHeading + filter ตามประเภทอีเวนต์และอุตสาหกรรม (ใช้ EventFilter หรือ Tabs) + grid CaseStudyCard ทั้งหมด เรียงปีใหม่ไปเก่า
2. /work/[slug]: template case study
   - หัว: ลูกค้า, ชื่อ, ปี, badge ประเภท
   - 3 บล็อก: ความท้าทาย / สิ่งที่เราทำ / ผลลัพธ์ (ผลลัพธ์ใช้ StatNumber)
   - แกลเลอรีรูป (next/image, คลิกเปิดใน Dialog ขนาดใหญ่ เลื่อนดูได้ด้วยลูกศร)
   - ส่วนท้าย: case study อื่น 2 ใบ + ContactCTA
3. ใช้ generateStaticParams ให้ทุก slug ทั้ง 2 ภาษา, notFound() เมื่อ slug ไม่มี
4. generateMetadata ต่อ case study (title, description, OG image จากรูปปก)
5. URL ต้องเป็น kebab-case สะอาด เช่น /th/work/uipath-fusion-summit-2026

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**Commit:** `feat(pages): add work listing and case study template`

---

## Step 12 — หน้าอีเวนต์และฟอร์มลงทะเบียน

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 12: สร้าง /[locale]/events และ /[locale]/events/[slug]

1. /events: อีเวนต์ upcoming (EventFilter + EventCard) และอีเวนต์ที่ผ่านมาแยกตามปี (YearTimeline)
2. /events/[slug]: รายละเอียดอีเวนต์, Countdown, AddToCalendar, ฟอร์มลงทะเบียน
3. ฟอร์มลงทะเบียน (react-hook-form + zod): ชื่อ-นามสกุล, บริษัท, ตำแหน่ง, อีเมลบริษัท, เบอร์โทร, checkbox ยินยอม PDPA (บังคับ) พร้อมลิงก์นโยบายความเป็นส่วนตัว
   - ข้อความ error ทั้ง 2 ภาษา
   - submit ผ่าน Server Action ที่ตอนนี้แค่ validate ซ้ำฝั่ง server แล้วตอบสำเร็จ ห้ามส่งข้อมูลไปที่ใดหรือบันทึกจริง ใส่ TODO ระบุว่าต้องเลือกปลายทาง (Google Sheets / CRM / email) ก่อนเปิดใช้
   - หลังส่งสำเร็จแสดงหน้าขอบคุณพร้อม AddToCalendar
4. สร้างหน้า /[locale]/privacy เป็น placeholder "[นโยบายความเป็นส่วนตัว — รอฝ่ายกฎหมาย]"

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` เพิ่ม test กรอกฟอร์มผิดแล้วเห็น error และกรอกถูกแล้วเห็นหน้าขอบคุณ รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**Commit:** `feat(pages): add events pages and registration form`

---

## Step 13 — หน้าบริการ, เกี่ยวกับเรา, ติดต่อ

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 13: สร้าง /[locale]/services, /[locale]/about, /[locale]/contact

1. /services: บริการทั้ง 5 แบบละ section พร้อมรายการย่อย และ case study ที่เกี่ยวข้อง 1–2 ใบ (ถ้ามี)
2. /about: ประวัติตั้งแต่ 2004, จุดยืน "พาร์ทเนอร์ด้านอีเวนต์สำหรับแบรนด์เทคโนโลยีและองค์กร", ClientLogoWall โหมด grid, ส่วนทีมเป็น placeholder
3. /contact:
   - ฟอร์ม brief: ชื่อ, บริษัท, อีเมล, เบอร์, ประเภทงาน (select), วันที่โดยประมาณ, งบประมาณ (select เป็นช่วง placeholder "[ช่วงงบ]"), จำนวนแขก, รายละเอียด, checkbox PDPA — Server Action แบบเดียวกับ Step 12 (ยังไม่ส่งจริง)
   - ช่องทางติดต่อด่วน: ปุ่ม LINE, โทร (tel:), อีเมล (mailto:) จาก src/content/site.ts
   - ที่อยู่ + ลิงก์ Google Maps (ลิงก์ออกไป ไม่ฝัง iframe)
4. ทุกหน้ามี generateMetadata 2 ภาษา

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**Commit:** `feat(pages): add services, about and contact pages`

---

## Step 14 — SEO และความเร็ว

```text
อ่าน AGENTS.md ก่อนเริ่มงาน

งาน Step 14: SEO และ performance

1. src/app/sitemap.ts ครอบคลุมทุกหน้าทั้ง 2 ภาษา พร้อม alternates hreflang (ยกเว้น /design)
2. src/app/robots.ts อนุญาตทั้งหมด ยกเว้น /*/design
3. metadataBase จาก env NEXT_PUBLIC_SITE_URL (เพิ่มใน .env.example)
4. ทุกหน้ามี alternates.languages th/en และ canonical
5. JSON-LD: Organization (หน้าแรก), Event (หน้าอีเวนต์), BreadcrumbList (หน้า work/[slug])
6. OG image เริ่มต้นด้วย next/og: พื้น background, ชื่อหน้า font-display, จุดสี primary
7. ตรวจรูปทั้งหมดใช้ next/image มี sizes ที่เหมาะสม, รูป hero มี priority
8. รัน Lighthouse (mobile) กับหน้าแรก, /work, /events แล้วรายงานคะแนน Performance, Accessibility, Best Practices, SEO พร้อมรายการปัญหาที่แก้แล้วและที่ยังเหลือ เป้าหมายทุกค่า ≥ 90

ห้ามทำ: ติดตั้ง analytics หรือ tracking script (รอการตัดสินใจเรื่อง PDPA และ cookie consent)

เมื่อเสร็จ: รัน `pnpm check` และ `pnpm test:e2e` รายงานตามรูปแบบใน AGENTS.md แล้วหยุดรอ
```

**Commit:** `feat(seo): add sitemap, metadata, structured data and perf fixes`

---

## Step 15 — ตรวจทั้งเว็บก่อนส่งมอบ 🔍

ใช้ conversation ใหม่ และใช้โมเดลหรือ Agent คนละตัวกับที่สร้างงานถ้าทำได้

```text
อ่าน AGENTS.md และ design/tokens.md ก่อนเริ่มงาน

งาน Step 15: ตรวจคุณภาพทั้งเว็บ (ห้ามแก้โค้ดใน step นี้ ให้รายงานอย่างเดียว)

ตรวจและรายงานเป็นตาราง (ปัญหา, ไฟล์:บรรทัด, ความรุนแรง สูง/กลาง/ต่ำ, วิธีแก้ที่เสนอ):
1. Design system: component ซ้ำซ้อน, สีหรือระยะที่ไม่สม่ำเสมอ, ที่ไหนใช้ primary เกิน 2 จุดต่อหน้าจอ
2. i18n: ข้อความที่ hard-code, key ที่มีใน th แต่ไม่มีใน en หรือกลับกัน, ข้อความอังกฤษที่หลงในหน้าไทย
3. เนื้อหา: รายการ placeholder "[...]" ทั้งหมดที่ยังเหลือ แยกตามหน้า (ส่งให้ทีมการตลาด)
4. Accessibility: heading ข้ามลำดับ, รูปไม่มี alt, ปุ่มไม่มีชื่อ, contrast, การใช้คีย์บอร์ด
5. ความปลอดภัย: ข้อมูลลับในโค้ด, Server Action ที่ไม่ validate, ลิงก์ภายนอกที่ไม่มี rel="noopener"
6. TODO ทั้งหมดในโค้ด
7. ผล `pnpm check`, `pnpm test`, `pnpm test:e2e`

ปิดท้ายด้วยรายการ "ต้องแก้ก่อนขึ้นเว็บจริง" เรียงตามความสำคัญ
```

---

## Prompt ใช้ซ้ำ

### R1 — แก้ไขงานใน step ปัจจุบัน (ใช้ใน conversation เดิม)

```text
ผลของ step นี้ยังไม่ผ่าน ปัญหาที่พบ:
- [อธิบายปัญหา 1 — ระบุหน้า/ขนาดจอ/สิ่งที่เห็น vs สิ่งที่ควรเป็น]
- [ปัญหา 2]

แก้เฉพาะปัญหาเหล่านี้ ห้ามแก้ส่วนอื่น ทำตามกติกาใน AGENTS.md
เมื่อเสร็จรัน `pnpm check` แล้วรายงานว่าแก้ไฟล์ไหน อย่างไร
```

### R2 — รีวิวก่อน commit (เปิด conversation ใหม่)

```text
อ่าน AGENTS.md, design/tokens.md และ .agents/rules/component-authoring.md

รีวิวการเปลี่ยนแปลงที่ยังไม่ commit (ดูจาก `git diff` และ `git status`) โดยไม่แก้โค้ด
ตรวจว่า:
1. ทำตรงขอบเขตของ [Step X — ชื่อ step] และไม่มีงานเกินขอบเขต
2. ทำตามกติกา design system ทุกข้อใน AGENTS.md
3. ไม่มี component ซ้ำซ้อน ไม่มีข้อความ hard-code ไม่มีข้อมูลที่แต่งขึ้น
4. accessibility และ responsive
5. คุณภาพโค้ด: type, ชื่อ, ความซับซ้อนเกินจำเป็น

รายงานเป็นรายการ: ✅ ผ่าน / ⚠️ ควรแก้ / ❌ ต้องแก้ พร้อมไฟล์:บรรทัด
```

### R3 — เพิ่ม component ใหม่ภายหลัง

```text
อ่าน AGENTS.md และ .agents/rules/component-authoring.md

ต้องการ component ใหม่: [ชื่อ] ใช้สำหรับ [ใช้ที่ไหน ทำอะไร]
ข้อมูลที่รับ: [props]
หน้าตา: [อธิบาย หรืออ้างอิง component ที่คล้ายกัน]

ขั้นแรก: ตรวจก่อนว่า component ใน brand/ หรือ ui/ ที่มีอยู่ทำสิ่งนี้ได้แล้วหรือไม่ หรือเพิ่ม variant ได้ไหม ถ้าได้ให้เสนอแทนการสร้างใหม่ แล้วหยุดรอการตัดสินใจ
ถ้าต้องสร้างใหม่จริง: สร้างใน brand/, เพิ่มตัวอย่างใน /design, เพิ่ม visual snapshot ใหม่ รัน `pnpm check` และ `pnpm test:e2e` แล้วรายงาน
```

### R4 — เมื่อ Agent ทำผิดกติกาซ้ำ

```text
หยุดก่อน คุณทำผิดกติกาใน AGENTS.md ข้อ [เลขข้อ]: [อธิบายสิ่งที่ทำผิด] ที่ [ไฟล์]
1. อ่าน AGENTS.md ส่วนนั้นอีกครั้ง
2. แก้ทุกจุดที่ผิดในงานนี้ (ค้นทั้งโปรเจกต์ ไม่ใช่แค่จุดที่บอก)
3. รัน `pnpm check`
4. บอกว่าจะป้องกันไม่ให้เกิดซ้ำอย่างไร เสนอเป็นข้อความที่ควรเพิ่มใน AGENTS.md (ห้ามแก้ AGENTS.md เอง ผู้ดูแล DS จะตัดสินใจ)
```

---

## สำหรับผู้ดูแล Design System

- เมื่อ Agent ทำผิดแบบเดิมเกิน 2 ครั้ง ให้เพิ่มกติกาใน AGENTS.md หรือ `.agents/rules/` แทนการแก้ทีละครั้ง
- ทุกการเปลี่ยน token: แก้ `design/globals.css` → คัดลอกไป `src/app/globals.css` → อัปเดต `design/tokens.md` → รัน `pnpm test:visual:update` → ตรวจ snapshot ทุกภาพก่อน approve
- AGENTS.md ถูกโหลดทุกครั้ง จึงควรสั้นและเป็นกติกาเท่านั้น รายละเอียดวิธีทำให้ไปไว้ใน `.agents/rules/` แบบ glob หรือ model_decision
