"use client";
import { JOB } from "@/lib/theme";

const Row = ({ dot, label, value, valueColor = "#fff", round = false }: { dot: string; label: string; value: string; valueColor?: string; round?: boolean }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
    <div style={{ width: 10, height: 10, borderRadius: round ? "50%" : 3, background: dot, marginTop: 5, flex: "none" }} />
    <div>
      <div style={{ font: "400 11px/1 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.45)" }}>{label}</div>
      <div style={{ font: "600 15px/1.4 'Noto Sans Thai',sans-serif", color: valueColor }}>{value}</div>
    </div>
  </div>
);

export default function DetailSheet({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 40 }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "#171c1f", borderRadius: "26px 26px 0 0", padding: "16px 20px 26px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,.18)", margin: "0 auto 16px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
          <div style={{ background: "rgba(225,29,47,.18)", border: "1px solid rgba(225,29,47,.45)", color: "#ff8a92", padding: "4px 9px", borderRadius: 7, font: "600 11px/1 'Noto Sans Thai',sans-serif" }}>งานค้าง</div>
          <div style={{ font: "400 11px/1 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.45)" }}>รหัสงาน {JOB.code}</div>
        </div>
        <div style={{ font: "700 20px/1.3 'Noto Sans Thai',sans-serif", color: "#fff" }}>คุณมีงานจัดส่งค้าง 1 งาน</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "18px 0 0" }}>
          <Row dot="#f5c518" label="รับจาก" value={JOB.from} />
          <Row dot="#e8e6e1" label="ส่งไปที่" value={JOB.to} />
          <Row dot="#e11d2f" round label="เวลาที่ต้องส่ง" value={JOB.due + " · เลยกำหนดแล้ว"} valueColor="#ff6a75" />
        </div>
        <div style={{ display: "flex", gap: 9, marginTop: 22 }}>
          <div onClick={onClose} style={{ flex: 1, background: "#f5c518", color: "#14191c", borderRadius: 14, padding: "14px 0", textAlign: "center", font: "600 15px/1 'Noto Sans Thai',sans-serif", cursor: "pointer" }}>รับงานนี้ต่อ</div>
          <div onClick={onClose} style={{ width: 110, background: "rgba(255,255,255,.08)", color: "#e8e6e1", borderRadius: 14, padding: "14px 0", textAlign: "center", font: "500 14px/1 'Noto Sans Thai',sans-serif", cursor: "pointer" }}>ไว้ทีหลัง</div>
        </div>
      </div>
    </div>
  );
}
