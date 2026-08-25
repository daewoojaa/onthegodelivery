"use client";
import { useRef, useState } from "react";
import MapScreen from "./MapScreen";
import LockScreen from "./LockScreen";
import NotificationCard from "./NotificationCard";
import DetailSheet from "./DetailSheet";

export default function App() {
  const [lock, setLock] = useState(false);
  const [notif, setNotif] = useState(false);
  const [detail, setDetail] = useState(false);
  const taps = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lockTap = () => {
    if (timer.current) clearTimeout(timer.current);
    taps.current += 1;
    timer.current = setTimeout(() => { taps.current = 0; }, 900);
    if (!notif && taps.current >= 3) { taps.current = 0; setNotif(true); }
    else if (notif && taps.current >= 4) { taps.current = 0; setLock(false); setNotif(false); setDetail(false); }
  };

  const goLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    taps.current = 0;
    setLock(true);
    setNotif(false);
    setDetail(false);
  };

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "24px 16px 40px", background: "radial-gradient(1200px 700px at 50% -10%,#1b1f22 0%,#0d0f10 70%)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{ background: "#f6f5f2", borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/otg-mark.png" alt="ON-THE-GO DELIVERY" style={{ width: 46, display: "block" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ font: "600 17px/1 'Barlow Condensed',sans-serif", letterSpacing: ".26em", color: "#e8e6e1" }}>ON-THE-GO</div>
          <div style={{ font: "500 11px/1 'Barlow Condensed',sans-serif", letterSpacing: ".42em", color: "rgba(255,255,255,.55)" }}>DELIVERY</div>
        </div>
      </div>

      <div style={{ position: "relative", width: 370, height: 790, maxWidth: "100%", borderRadius: 44, overflow: "hidden", background: "#111517", boxShadow: "0 0 0 2px #2b2f33, 0 30px 70px rgba(0,0,0,.6)" }}>
        <MapScreen
          onScreenTap={() => { setNotif(true); setDetail(false); }}
          onProfile={goLock}
          onSecretTap={() => { setNotif(true); setDetail(false); }}
          onSecretHold={() => { setLock(true); setNotif(true); setDetail(false); }}
        />
        {lock && <LockScreen notif={notif} onTap={lockTap} onOpenDetail={() => { setDetail(true); setNotif(false); setLock(false); }} />}
        {!lock && notif && <NotificationCard onOpen={() => { setDetail(true); setNotif(false); }} />}
        {detail && <DetailSheet onClose={() => { setDetail(false); setNotif(false); setLock(false); }} />}
      </div>

      <div style={{ padding: "10px 14px", background: "rgba(255,255,255,.05)", border: "1px dashed rgba(245,197,24,.45)", borderRadius: 12, maxWidth: 370, font: "500 11.5px/1.5 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.6)" }}>
        แตะที่แผนที่ = การ์ดแจ้งเตือน &quot;งานค้าง&quot; เด้งขึ้น · แท็บโปรไฟล์ = หน้าล็อก (แตะจอ 3 ครั้ง = แจ้งเตือน, 4 ครั้ง = กลับ) · ปุ่มลับ: รายได้ = สลับภาพแผนที่, กล่องข้อความ = ซ่อน/แสดงเส้นทางแดง, ตารางจอง = โหมดลากแก้เส้นทาง
      </div>
    </main>
  );
}
