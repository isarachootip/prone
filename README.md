# PR One — AI Agent Starter Kit

ชุดไฟล์เริ่มต้นสำหรับสร้างเว็บ PR One ใหม่ด้วย Next.js + shadcn/ui โดยให้ AI Agent (Antigravity) เขียนโค้ดทีละขั้น

## ในชุดนี้มีอะไร

| ไฟล์ | หน้าที่ |
|---|---|
| `AGENTS.md` | กติกาที่ Agent ต้องทำตามทุกครั้ง (Antigravity โหลดอัตโนมัติ) |
| `.agents/rules/component-authoring.md` | วิธีเขียน component โหลดเมื่อ Agent แก้ไฟล์ใน `src/components/` |
| `design/globals.css` | design tokens ต้นฉบับ (สี ฟอนต์ radius) จาก concept หน้าแรก |
| `design/tokens.md` | ตารางอธิบาย token สำหรับคนและ Agent |
| `docs/PROMPTS.md` | **Prompt ทีละ step** (Step 0–15) และ prompt ใช้ซ้ำ R1–R4 |
| `scripts/check-tokens.mjs` | สคริปต์ตรวจว่าไม่มีสีหรือฟอนต์นอก token (ทดสอบแล้ว) |
| `.github/CODEOWNERS` | กำหนดให้ผู้ดูแล DS ต้องรีวิวไฟล์สำคัญ |

## เริ่มต้น

1. คัดลอกทุกไฟล์ (รวมโฟลเดอร์ที่ขึ้นต้นด้วยจุด) ไปไว้ในโฟลเดอร์โปรเจกต์ว่าง
2. เปิด `docs/PROMPTS.md` แล้วเริ่มที่ Step 0
3. ทำทีละ step, 1 step ต่อ 1 conversation ใน Antigravity, ตรวจ ✅ แล้ว commit ก่อนไป step ถัดไป

## ข้อมูลที่ทีมต้องเตรียมระหว่างทาง

- โลโก้ PR One (SVG) และโลโก้ลูกค้า
- รายชื่ออีเวนต์ที่กำลังจะมาถึง (ชื่อ วันที่ สถานที่ ลูกค้า)
- ข้อมูล case study: ความท้าทาย สิ่งที่ทำ ผลลัพธ์เป็นตัวเลข รูปถ่าย
- LINE OA ID + QR, ลิงก์ Facebook / LinkedIn / YouTube / Instagram
- นโยบายความเป็นส่วนตัว (PDPA)
- ปลายทางของข้อมูลฟอร์ม (อีเมล / Google Sheets / CRM)

## การพัฒนา (Development)

คำสั่งที่ใช้ในการพัฒนาและทดสอบระบบ:

| คำสั่ง | คำอธิบาย |
|---|---|
| `pnpm dev` | รันเซิร์ฟเวอร์สำหรับพัฒนาที่ `http://localhost:3000` |
| `pnpm build` | คอมไพล์และสร้างโค้ดสำหรับ Production |
| `pnpm start` | รันเซิร์ฟเวอร์ Production build |
| `pnpm lint` | ตรวจสอบ syntax และ code quality ด้วย ESLint |
| `pnpm typecheck` | ตรวจสอบ type safety ด้วย TypeScript (`tsc --noEmit`) |
| `pnpm check:tokens` | ตรวจสอบว่าไม่มีสีหรือฟอนต์ที่อยู่นอกเหนือ design token |
| `pnpm check` | รันด่านตรวจทั้ง 4 ตัวรวมกัน (`lint`, `typecheck`, `check:tokens`, `build`) |
| `pnpm test:e2e` | รันการทดสอบฟังก์ชันพื้นฐาน (Smoke tests) ด้วย Playwright |
| `pnpm test:visual` | รันการทดสอบ Visual Regression เปรียบเทียบภาพแต่ละ section บน `/en/design` |
| `pnpm test:visual:update` | อัปเดตภาพ Baseline Snapshot สำหรับ Visual Regression |

> ⚠️ **คำเตือนเรื่อง Visual Regression Snapshot:**  
> การรันคำสั่ง `pnpm test:visual:update` เพื่อสร้างหรือแก้ไข Baseline Snapshot **จะต้องได้รับความเห็นชอบและอนุมัติจากผู้ดูแล Design System (DS Owner) ก่อนเสมอ** ห้ามอัปเดต snapshot เพื่อกลบความผิดพลาดของ UI โดยไม่ได้รับอนุญาต

