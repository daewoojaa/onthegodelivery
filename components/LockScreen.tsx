"use client";
import NotificationCard from "./NotificationCard";

export default function LockScreen({ notif, onTap, onOpenDetail }: { notif: boolean; onTap: () => void; onOpenDetail: () => void }) {
  return (
    <div onClick={onTap} style={{ position: "absolute", inset: 0, zIndex: 20, cursor: "pointer" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bg-wallpaper.webp" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "translateX(-2px)", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg,rgba(20,17,14,.62),rgba(10,9,7,.9))" }} />
      <div style={{ position: "absolute", bottom: 96, left: 0, right: 0, textAlign: "center", font: "400 12px/1 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.55)", pointerEvents: "none" }}>
        ปัดเพื่อปลดล็อก
      </div>
      <div style={{ position: "absolute", bottom: 34, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 120, pointerEvents: "none" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center", font: "400 18px/1 sans-serif", color: "#fff" }}>✆</div>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.16)", display: "flex", alignItems: "center", justifyContent: "center", font: "400 16px/1 sans-serif", color: "#fff" }}>◉</div>
      </div>
      {notif && <NotificationCard onOpen={onOpenDetail} />}
    </div>
  );
}
