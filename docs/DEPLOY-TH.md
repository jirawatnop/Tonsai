# คู่มือ Deploy โปรเจกต์ Tonsai Chatbot บน Vercel (ภาษาไทย)

โปรเจกต์นี้เป็น Next.js 14 + TypeScript + Tailwind + next-intl + Google Gemini API พร้อมหน้าแชทเต็มหน้าและ Widget สำหรับฝังในเว็บหลัก

---

## 1) เตรียม GitHub Repository และ Push โค้ด

1. สร้างรีโปใหม่ที่ GitHub
   - ไปที่ https://github.com/new
   - ตั้งชื่อรีโปเช่น `tonsai-chatbot`
   - เลือก Public หรือ Private ตามต้องการ แล้วกด Create repository

2. บนเครื่องนักพัฒนา (หรือบนเซิร์ฟเวอร์ที่มีซอร์สโค้ดนี้)

```bash
cd /project/workspace/tonsai-chatbot
# เริ่ม Git และ commit แรก
git init
git add .
git commit -m "Initialize Tonsai Chatbot"

# ตั้ง remote ให้ชี้ไปรีโปที่สร้างไว้ (แทนชื่อผู้ใช้และรีโปให้ถูกต้อง)
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/tonsai-chatbot.git

git push -u origin main
```

หมายเหตุ: ถ้ายังไม่ได้ login GitHub ให้ตั้งค่า credential/SSH key ก่อนตามคู่มือ GitHub

---

## 2) สร้าง Google Gemini API Key

1. ไปที่ Google AI Studio: https://aistudio.google.com/
2. Login ด้วย Google Account
3. ไปที่เมนู API Keys > Create API key
4. คัดลอกคีย์มาเก็บไว้ (จะใช้ใน Vercel Environment Variables)

อ้างอิงไลบรารีที่ใช้: `@google/generative-ai`

---

## 3) เตรียม Environment Variables

ค่าแนะนำ:
```
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SITE_URL=https://tonsai-chatbot.vercel.app
NEXT_PUBLIC_MAIN_SITE_URL=https://tonsaielephantphuket.com
```

- `GOOGLE_GEMINI_API_KEY` ต้องมีเสมอ เพื่อให้ AI ตอบได้
- `NEXT_PUBLIC_SITE_URL` ใช้ในเอกสาร/อ้างอิงภายนอก (optional)
- `NEXT_PUBLIC_MAIN_SITE_URL` ใช้อ้างอิงเว็บหลัก (optional)

---

## 4) Deploy บน Vercel (แนะนำให้เชื่อมต่อกับ GitHub)

1. ไปที่ https://vercel.com/ และ Login
2. กดปุ่ม New Project > Import Git Repository
3. เลือกรีโป `tonsai-chatbot` ที่เพิ่งสร้าง
4. Framework Preset: เลือก Next.js (Vercel จะ detect อัตโนมัติ)
5. Environment Variables: เพิ่มค่า
   - KEY: `GOOGLE_GEMINI_API_KEY`  VALUE: ค่า API Key จากข้อ 2
   - (ถ้าต้องการ) `NEXT_PUBLIC_SITE_URL` และ `NEXT_PUBLIC_MAIN_SITE_URL`
6. กด Deploy และรอจนเสร็จ ระบบจะให้โดเมน เช่น `https://tonsai-chatbot.vercel.app`

ทดสอบ:
- เปิด `https://<your-vercel-domain>/th` (ภาษาไทย), `/en`, `/zh`
- พิมพ์ข้อความสั้น ๆ และรอดู AI ตอบ
- ลอง quick replies เช่น “มีโปรโมชั่นอะไรบ้าง?”

---

## 5) อนุญาตให้หน้า Widget ถูกแปะใน Iframe ได้

โปรเจกต์นี้ตั้ง Header เพื่ออนุญาตให้หน้า `/widget` ถูกฝังใน iframe ได้ด้วย Content-Security-Policy `frame-ancestors *` ใน `next.config.ts` แล้ว หากต้องการจำกัดเฉพาะโดเมนเว็บหลัก ให้แก้เป็น:
```
value: "frame-ancestors https://tonsaielephantphuket.com https://www.tonsaielephantphuket.com"
```

---

## 6) ฝัง Widget ลงในเว็บหลัก tonsaielephantphuket.com

วางสคริปต์นี้ใน `<head>` หรือท้าย `<body>` ของเว็บหลัก:

```html
<script src="https://<your-vercel-domain>/embed.js"></script>
<script>
  TonsaiChatbot.init({
    language: 'th', // 'en' หรือ 'zh'
    theme: 'light',
    position: 'bottom-right',
    // host: 'https://<your-vercel-domain>' // ถ้าต้องการกำหนดโดเมนชัดเจน
  });
</script>
```

Widget จะมีปุ่มสีส้มลอย และเมื่อคลิกจะเปิดหน้าต่างแชท 400x600px ที่โหลดจาก `/widget?lang=th`

ทดสอบบนเว็บจริง:
- เปิดหน้าเว็บหลัก ดูปุ่มแชทลอยมุมขวาล่าง
- คลิกเปิด-ปิด, ย่อ/ปิด ได้ตามต้องการ
- พิมพ์ข้อความทดสอบ AI และสังเกต badge แจ้งเตือนเมื่อมีข้อความใหม่

---

## 7) แนวทางตรวจสอบและแก้ปัญหา

- AI ไม่ตอบ/ตอบช้า: ตรวจสอบ Environment Variable `GOOGLE_GEMINI_API_KEY` และโควต้า API ของบัญชี Google
- ฝัง Widget แล้วไม่แสดง: ตรวจสอบว่า `<script src>` ชี้โดเมนถูกต้อง และหน้า `/widget` ถูกโหลดได้ (สถานะ 200)
- Iframe ถูกบล็อก: ปรับ header `Content-Security-Policy: frame-ancestors` ให้อนุญาตโดเมนของเว็บหลัก
- ภาษาไม่เปลี่ยน: ตรวจสอบพารามิเตอร์ `lang` ใน URL ของ `/widget?lang=th` และปุ่ม selector บนหน้าเต็ม

---

## 8) โครงสร้างไฟล์สำคัญที่เกี่ยวข้องกับ Deploy

- `vercel.json` — ตั้งค่าเวอร์ชัน (ใช้ค่าเริ่มต้น v2)
- `next.config.ts` — กำหนด headers สำหรับ `/widget` และ `/embed.js`
- `public/embed.js` — สคริปต์ฝัง Widget ในเว็บหลัก
- `.env` — เก็บ `GOOGLE_GEMINI_API_KEY` (อย่า commit)

---

## 9) คำสั่งพื้นฐานสำหรับนักพัฒนา

รันท้องถิ่น:
```
bun install
bun run dev
```

Build production:
```
bun run build
bun run start
```

---

พร้อมใช้งาน! เมื่อติดตั้งบน Vercel แล้ว สามารถส่งลิงก์โดเมนให้ทีมเว็บหลักนำไปฝัง widget ได้ทันที หากต้องการปรับ UI/การแปล/บทสนทนาเพิ่มเติม แก้ไขในไฟล์ components, messages และ lib/gemini.ts แล้ว deploy ใหม่ได้เลย
