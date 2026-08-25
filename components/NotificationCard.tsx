"use client";
import { JOB } from "@/lib/theme";

const row = { display: "flex", alignItems: "center", gap: 8, font: "400 12px/1.2 'Noto Sans Thai',sans-serif", color: "#3d454a", whiteSpace: "nowrap" as const };
const label = { color: "rgba(20,25,28,.5)", flex: "none" as const };
const value = { fontWeight: 600, color: "#14191c", overflow: "hidden", textOverflow: "ellipsis" };

export default function NotificationCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      style={{
        position: "absolute", top: 62, left: 12, right: 12, background: "rgba(246,245,242,.97)", borderRadius: 22,
        padding: "13px 15px 11px", boxShadow: "0 18px 40px rgba(0,0,0,.55)", backdropFilter: "blur(20px)",
        cursor: "pointer", animation: "otg-drop .42s cubic-bezier(.2,1.2,.3,1) both", zIndex: 30,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "#f5c518", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/otg-mark.png" alt="" style={{ width: 26, display: "block", mixBlendMode: "multiply" }} />
        </div>
        <div style={{ flex: 1, font: "700 14px/1.2 'Noto Sans Thai',sans-serif", color: "#14191c" }}>งานค้าง</div>
        <div style={{ font: "400 11px/1 'Noto Sans Thai',sans-serif", color: "rgba(20,25,28,.45)" }}>ตอนนี้</div>
      </div>

      <div style={{ font: "600 14px/1.4 'Noto Sans Thai',sans-serif", color: "#14191c", margin: "9px 0 8px" }}>คุณมีงานจัดส่งค้าง 1 งาน</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={row}><div style={{ width: 13, height: 13, borderRadius: 4, background: "#f5c518", flex: "none" }} /><span style={label}>รับจาก</span><span style={value}>{JOB.from}</span></div>
        <div style={row}><div style={{ width: 13, height: 13, borderRadius: 4, background: "#14191c", flex: "none" }} /><span style={label}>ส่งไปที่</span><span style={value}>{JOB.to}</span></div>
        <div style={row}><div style={{ width: 13, height: 13, borderRadius: "50%", border: "2.5px solid #e11d2f", flex: "none" }} /><span style={label}>เวลาที่ต้องส่ง</span><span style={{ fontWeight: 700, color: "#e11d2f" }}>{JOB.due}</span></div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 11, paddingTop: 9, borderTop: "1px solid rgba(20,25,28,.1)", font: "500 12.5px/1 'Noto Sans Thai',sans-serif", color: "#14191c", whiteSpace: "nowrap" }}>
        <span>แตะเพื่อดูรายละเอียด</span><span style={{ color: "rgba(20,25,28,.4)" }}>›</span>
      </div>
    </div>
  );
}
