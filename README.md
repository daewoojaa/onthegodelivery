# ON-THE-GO DELIVERY — PWA (Next.js + TypeScript)

โปรโตไทป์หน้านำทาง + หน้า Lock Screen พร้อมการ์ดแจ้งเตือน "งานค้าง" แปลงจากไฟล์ดีไซน์ \`On The Go Delivery.dc.html\`

## รันในเครื่อง

\`\`\`bash
npm install
npm run dev      # http://localhost:3000
\`\`\`

## โครงไฟล์

- \`app/layout.tsx\` — metadata + manifest + ลงทะเบียน service worker
- \`components/App.tsx\` — state ทั้งหมด (lock / notification / detail / โหมดแก้เส้นทาง)
- \`components/MapScreen.tsx\` — หน้านำทาง, เส้นทางแดงลากแก้ได้, บับเบิล "31 นาที" ลากย้ายได้
- \`components/LockScreen.tsx\` — หน้าล็อก + wallpaper (แพ็กรูปไว้แล้วที่ \`public/bg-wallpaper.webp\`)
- \`components/NotificationCard.tsx\`, \`components/DetailSheet.tsx\` — การ์ดแจ้งเตือนและรายละเอียดงาน
- \`lib/theme.ts\` — สี, พิกัดเส้นทางเริ่มต้น, ข้อมูลงาน
- \`public/manifest.webmanifest\`, \`public/sw.js\` — ส่วน PWA (ติดตั้งได้ + แคชออฟไลน์)

## วิธีใช้งานในแอป

- หน้าแผนที่ **ไม่มีการแจ้งเตือน** — แตะค้างที่โลโก้ขาวบนการ์ดเส้นทาง = ไปหน้า Lock Screen
- แท็บ "โปรไฟล์" = ไปหน้า Lock Screen
- บนหน้าล็อก: แตะจอ **3 ครั้ง** → รอ **4 วินาที** การ์ด "งานค้าง" จึงเด้ง · แตะ **4 ครั้ง** = กลับหน้านำทาง
- แสดงเฉพาะจอแอป เต็มหน้าจอ (ไม่มีกรอบมือถือจำลอง) และสเกลพอดีทุกขนาดจอ
- ปุ่มลับในแท็บล่าง: **รายได้** = สลับภาพแผนที่ · **กล่องข้อความ** = ซ่อน/แสดงเส้นทางแดง · **ตารางจอง** = โหมดลากแก้เส้นทาง
- เส้นทางแดงและบับเบิล "31 นาที" ลากย้ายได้ และจำตำแหน่งไว้ใน localStorage

## Deploy ขึ้น Vercel ผ่าน GitHub main

\`\`\`bash
cd nextjs
git init
git add .
git commit -m "feat: ON-THE-GO DELIVERY PWA"
git branch -M main
git remote add origin git@github.com:<user>/on-the-go-delivery.git
git push -u origin main
\`\`\`

จากนั้นที่ vercel.com → Add New Project → Import repo นี้ → Framework preset: Next.js → Deploy
(ทุก push เข้า \`main\` จะ deploy production อัตโนมัติ)

## หมายเหตุ

- PWA นี้ติดตั้งบนมือถือได้ (Add to Home Screen) แต่การ์ดแจ้งเตือนเป็นการ **จำลองใน UI** ไม่ใช่ push notification ของระบบ
  หากต้องการแจ้งเตือนจริงบน Cover Screen ต้องเพิ่ม Web Push (VAPID + \`Notification\` API) หรือทำเป็นแอป Android
- ภาพแผนที่และ wallpaper ถูกแพ็กไว้ใน \`public/\` แล้ว (bg-map.webp, bg-wallpaper.webp) ไม่ต้องอัปโหลดตอนรัน
- ไอคอน PWA ใน \`public/icons/\` สร้างจากโลโก้แบบ auto — ถ้ามีไฟล์ .ai/.svg ต้นฉบับ แนะนำ export ทับ
