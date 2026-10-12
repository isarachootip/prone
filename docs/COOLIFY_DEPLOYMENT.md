# คู่มือการ Deploy ขึ้นระบบจริงบน Coolify VPS (Coolify Deployment Guide)

> ระบบ PR One Network พัฒนาด้วย Next.js 16.4.0 (App Router), Payload CMS v3, และ Neon/PostgreSQL พร้อมคอนเทนเนอร์ Multi-stage Dockerfile สำหรับรันบน Coolify ได้ทันที

---

## 1. ข้อมูลภาพรวม (Overview)

- **Repository:** `https://github.com/isarachootip/prone.git` (Branch: `main`)
- **Build Pack:** `Dockerfile` (Multi-stage Node.js 22 Alpine + Standalone Output)
- **Container Port:** `3000`
- **Healthcheck Path:** `/api/health`

---

## 2. ขั้นตอนการตั้งค่าบน Coolify Dashboard (Step-by-Step)

### ขั้นตอนที่ 1: เพิ่มแอปพลิเคชันใหม่ (Add New Resource)
1. เข้าสู่ **Coolify Dashboard** ของ VPS คุณ
2. เลือก Project และ Environment ที่ต้องการ (เช่น `Production`)
3. กด **+ New Resource** → เลือก **Public Repository** หรือ **GitHub App**
4. กรอก Repository URL:
   ```text
   https://github.com/isarachootip/prone.git
   ```
5. เลือก Branch: `main`
6. ในช่อง **Build Pack** ให้เลือก: **Dockerfile** (Coolify จะตรวจพบ `Dockerfile` ที่ root ของโปรเจกต์โดยอัตโนมัติ)

---

### ขั้นตอนที่ 2: ตั้งค่าพอร์ตและ Healthcheck (Port & Healthcheck)
1. ในหน้า **General Configuration**:
   - **Ports Exposes:** `3000`
   - **Healthcheck Path:** `/api/health`
   - **Healthcheck Interval:** `30` วินาที
   - **Healthcheck Timeout:** `5` วินาที
   - **Healthcheck Retries:** `3`

---

### ขั้นตอนที่ 3: กำหนดค่าตัวแปรสภาพแวดล้อม (Environment Variables)
ไปที่แท็บ **Environment Variables** บน Coolify แล้วเพิ่มตัวแปรดังต่อไปนี้:

| ชื่อตัวแปร | ตัวอย่างค่าที่ใส่ | คำอธิบาย |
|---|---|---|
| `NODE_ENV` | `production` | โหมดรันระบบจริง |
| `PORT` | `3000` | พอร์ตของคอนเทนเนอร์ |
| `HOSTNAME` | `0.0.0.0` | Binding IP สำหรับ Docker |
| `DATABASE_URI` | `postgresql://user:password@host:5432/pronedb?sslmode=require` | URL เชื่อมต่อ PostgreSQL (ใช้ Neon Singapore หรือสร้าง PostgreSQL Container บน Coolify) |
| `PAYLOAD_SECRET` | *(สุ่มรหัสลับยาว 32+ ตัวอักษร)* | คีย์เข้ารหัส JWT สำหรับ Payload CMS แอดมิน |
| `NEXT_PUBLIC_SITE_URL` | `https://prone.network` | โดเมนหลักของเว็บไซต์ (ใช้สร้าง Sitemap, Canonical และ SEO) |
| `NEXT_PUBLIC_SERVER_URL` | `https://prone.network` | โดเมนหลักสำหรับ Payload CMS API |

> **คำแนะนำ:** สำหรับ `PAYLOAD_SECRET` สามารถสร้างได้ด้วยคำสั่ง:
> ```bash
> openssl rand -hex 32
> ```

---

### ขั้นตอนที่ 4: ตั้งค่าโดเมนและ SSL (Domains & Let's Encrypt)
1. ในช่อง **Domains**: ใส่ชื่อโดเมนจริงของคุณ เช่น `https://prone.network`
2. ชี้ DNS Record (`A` หรือ `CNAME`) ของโดเมนมายัง IP ของ VPS Coolify
3. Coolify (Traefik) จะขอใบรับรองความปลอดภัย **Let's Encrypt SSL** ให้โดยอัตโนมัติ

---

### ขั้นตอนที่ 5: สั่ง Deploy และตรวจสอบ (Deploy & Verification)
1. กดปุ่ม **Deploy** ที่มุมขวาบนของ Coolify
2. รอ Coolify ดึงโค้ด, รัน Docker multi-stage build, และสตาร์ท Container
3. ตรวจสอบการทำงาน:
   - เข้าหน้าเว็บ: `https://prone.network/th`
   - ตรวจสอบ Healthcheck: `https://prone.network/api/health` (ต้องตอบ `{"status":"ok", ...}`)
   - เข้าหลังบ้าน Admin: `https://prone.network/admin`
   - *หมายเหตุ:* หากเป็นฐานข้อมูลใหม่ เมื่อเข้า `/admin` ครั้งแรก ระบบจะแสดงหน้าสร้างบัญชี First Admin User ทันที

---

## 3. การอัปเดตอัตโนมัติ (Continuous Deployment / Webhook)

- ในแท็บ **Webhooks** บน Coolify ให้คัดลอก **Deploy Webhook URL**
- นำไปวางใน GitHub Repository → **Settings** → **Webhooks**
- เมื่อมีการ `git push` เข้า branch `main` ในอนาคต Coolify จะ build และ deploy อัปเดตให้อัตโนมัติแบบ Zero-downtime
