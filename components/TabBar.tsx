"use client";
import type { MouseEvent } from "react";

const dim = "rgba(255,255,255,.42)";

const Icon = ({ name, color }: { name: string; color: string }) => {
  const p = { fill: "none", stroke: color, strokeWidth: 1.9, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg width={21} height={21} viewBox="0 0 24 24">
      {name === "home" && <g {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V20h13V9.5" /><path d="M9.5 20v-5.5h5V20" /></g>}
      {name === "wallet" && <g {...p}><rect x="3" y="6.5" width="18" height="12" rx="2.5" /><path d="M3 10.5h18" /><circle cx="16.5" cy="14.5" r="1.4" fill={color} stroke="none" /></g>}
      {name === "chat" && <g {...p}><path d="M4 5.5h16v11H9l-5 4z" /><path d="M8.5 10h7" /><path d="M8.5 13h4" /></g>}
      {name === "calendar" && <g {...p}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17" /><path d="M8 3.5v3" /><path d="M16 3.5v3" /><path d="M8 13.5h3.5" /></g>}
      {name === "profile" && <g {...p}><circle cx="12" cy="9" r="3.6" /><path d="M4.8 20c1.1-3.6 3.9-5.4 7.2-5.4s6.1 1.8 7.2 5.4" /></g>}
    </svg>
  );
};

export type TabActions = {
  onProfile: (e: MouseEvent) => void;
  /** hidden toggle: swap the baked map photo */
  onWallet: (e: MouseEvent) => void;
  /** hidden toggle: show/hide the red route overlay */
  onChat: (e: MouseEvent) => void;
  /** hidden toggle: route-edit drag handles */
  onCalendar: (e: MouseEvent) => void;
};

export default function TabBar({ onProfile, onWallet, onChat, onCalendar }: TabActions) {
  const tabs = [
    { icon: "home", label: "หน้าแรก", active: true, onClick: (e: MouseEvent) => e.stopPropagation() },
    { icon: "wallet", label: "รายได้", active: false, onClick: onWallet },
    { icon: "chat", label: "กล่องข้อความ", active: false, onClick: onChat },
    { icon: "calendar", label: "ตารางจอง", active: false, onClick: onCalendar },
    { icon: "profile", label: "โปรไฟล์", active: false, onClick: onProfile },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 4px 6px", marginTop: 8, borderTop: "1px solid rgba(255,255,255,.07)" }}>
      {tabs.map((t) => {
        const color = t.active ? "#f5c518" : dim;
        return (
          <div
            key={t.label}
            onClick={t.onClick}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, font: (t.active ? 500 : 400) + " 10px/1 'Noto Sans Thai',sans-serif", color, cursor: "pointer", minWidth: 44, minHeight: 44, justifyContent: "center" }}
          >
            <Icon name={t.icon} color={color} />
            {t.label}
          </div>
        );
      })}
    </div>
  );
}
