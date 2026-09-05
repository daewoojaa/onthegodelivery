"use client";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent as ReactPointerEvent } from "react";
import TabBar from "./TabBar";
import { JOB, ROUTE_PTS, routeD } from "@/lib/theme";

type Pt = [number, number];
const W = 370, H = 790;

export default function MapScreen({ onSecretHold, onProfile, onOpenChat }: {
  onSecretHold: () => void;
  onProfile: (e: MouseEvent) => void;
  onOpenChat: (e: MouseEvent) => void;
}) {
  const [pts, setPts] = useState<Pt[]>(ROUTE_PTS);
  const [badge, setBadge] = useState<Pt>([104, 400]);
  const [mapPhoto, setMapPhoto] = useState(true);
  const [routeOverlay, setRouteOverlay] = useState(true);
  const [routeEdit, setRouteEdit] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatHeld = useRef(false);
  const chatHold = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const p = localStorage.getItem("otg-route-pts");
      if (p) setPts(JSON.parse(p));
      const b = localStorage.getItem("otg-badge-pos");
      if (b) setBadge(JSON.parse(b));
    } catch {}
  }, []);

  /** Drag in the 370x790 design space — the whole stage is scaled, so screen px must be converted. */
  const dragNode = (i: number) => (e: ReactPointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const node = e.currentTarget as HTMLElement;
    const b = box.current!.getBoundingClientRect();
    const sx = W / b.width, sy = H / b.height;
    const nr = node.getBoundingClientRect();
    const gx = (e.clientX - (nr.left + nr.width / 2)) * sx;
    const gy = (e.clientY - (nr.top + nr.height / 2)) * sy;
    try { node.setPointerCapture(e.pointerId); } catch {}
    let latest = pts;
    const move = (ev: globalThis.PointerEvent) => {
      ev.preventDefault();
      const x = Math.max(0, Math.min(W, (ev.clientX - b.left) * sx - gx));
      const y = Math.max(0, Math.min(H, (ev.clientY - b.top) * sy - gy));
      latest = latest.map((p, j) => (j === i ? [Math.round(x), Math.round(y)] as Pt : p));
      setPts(latest);
    };
    const up = () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
      try { localStorage.setItem("otg-route-pts", JSON.stringify(latest)); } catch {}
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
  };

  const dragBadge = (e: ReactPointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const node = e.currentTarget as HTMLElement;
    const b = box.current!.getBoundingClientRect();
    const sx = W / b.width, sy = H / b.height;
    const r = node.getBoundingClientRect();
    const ox = (e.clientX - r.left) * sx, oy = (e.clientY - r.top) * sy;
    try { node.setPointerCapture(e.pointerId); } catch {}
    let latest = badge;
    const move = (ev: globalThis.PointerEvent) => {
      ev.preventDefault();
      const x = Math.round((ev.clientX - b.left) * sx - ox);
      const y = Math.round((ev.clientY - b.top) * sy - oy);
      latest = [Math.max(0, Math.min(300, x)), Math.max(0, Math.min(740, y))];
      setBadge(latest);
    };
    const up = () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
      try { localStorage.setItem("otg-badge-pos", JSON.stringify(latest)); } catch {}
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
  };

  const d = routeD(pts);
  const start = pts[0], end = pts[pts.length - 1];
  const stop = (fn: () => void) => (e: MouseEvent) => { e.stopPropagation(); fn(); };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#12171a" }}>
      <div ref={box} style={{ position: "absolute", inset: 0 }}>
        {mapPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/bg-map.webp" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "translateX(-7px)", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#14191c" }} />
        )}

        <svg viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: routeOverlay ? 1 : 0 }}>
          <path d={d} stroke="#000" strokeWidth={17} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.45} />
          <path d={d} stroke="#e11d2f" strokeWidth={11} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d={d} stroke="#ff6a75" strokeWidth={3} fill="none" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="8 26" style={{ animation: "otg-dash 1.4s linear infinite" }} />
        </svg>

        <div style={{ position: "absolute", left: start[0] - 13, top: start[1] - 13, width: 26, height: 26, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#f5c518", animation: "otg-pulse 2.2s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: 5, borderRadius: "50%", background: "#fff", border: "4px solid #f5c518" }} />
        </div>
        <div style={{ position: "absolute", left: end[0] - 12, top: end[1] - 12, width: 24, height: 24, borderRadius: "50%", background: "#e8e6e1", border: "5px solid #14191c", boxShadow: "0 0 0 2px #e8e6e1", pointerEvents: "none" }} />

        <div onPointerDown={dragBadge} style={{ position: "absolute", left: badge[0], top: badge[1], display: "flex", flexDirection: "column", alignItems: "flex-start", cursor: "grab", touchAction: "none", filter: "drop-shadow(0 8px 18px rgba(0,0,0,.55))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#e11d2f", color: "#fff", padding: "6px 11px", borderRadius: 11, font: "600 14px/1 'Noto Sans Thai',sans-serif", whiteSpace: "nowrap" }}>
            <span>{JOB.eta} นาที</span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,.4)" }} />
            <span style={{ font: "500 10.5px/1 'Noto Sans Thai',sans-serif", color: "#ffd9dd" }}>รถติดหนักมาก</span>
          </div>
          <div style={{ width: 12, height: 12, background: "#e11d2f", transform: "rotate(45deg)", margin: "-6px 0 0 16px", borderRadius: 2 }} />
        </div>

        {routeEdit && pts.map((p, i) => (
          <div key={i} onPointerDown={dragNode(i)} style={{ position: "absolute", left: p[0] - 11, top: p[1] - 11, boxSizing: "border-box", width: 22, height: 22, borderRadius: "50%", background: "rgba(245,197,24,.9)", border: "2px solid #14191c", boxShadow: "0 2px 8px rgba(0,0,0,.5)", cursor: "grab", touchAction: "none" }} />
        ))}

        {routeEdit && (
          <div style={{ position: "absolute", left: 12, bottom: 290, background: "rgba(20,25,28,.92)", border: "1px solid rgba(245,197,24,.5)", borderRadius: 10, padding: "7px 11px", font: "500 11px/1.4 'Noto Sans Thai',sans-serif", color: "#f5c518", pointerEvents: "none" }}>
            โหมดแก้เส้นทาง · ลากจุดเหลืองเพื่อดัดเส้น
          </div>
        )}
      </div>

      {/* route header card — long-press the white logo to reach the lock screen */}
      <div style={{ position: "absolute", top: 62, left: 14, right: 14, background: "rgba(17,21,24,.94)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 20, padding: "14px 16px", boxShadow: "0 14px 34px rgba(0,0,0,.55)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            onPointerDown={() => { hold.current = setTimeout(onSecretHold, 500); }}
            onPointerUp={() => { if (hold.current) clearTimeout(hold.current); }}
            onPointerLeave={() => { if (hold.current) clearTimeout(hold.current); }}
            style={{ width: 34, height: 34, borderRadius: 10, background: "#f6f5f2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none", touchAction: "none" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/otg-mark.png" alt="" style={{ width: 26, display: "block", mixBlendMode: "multiply" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", border: "2px solid #8b959a", flex: "none" }} />
              <div style={{ font: "500 14px/1.2 'Noto Sans Thai',sans-serif", color: "#e8e6e1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{JOB.origin}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 9, height: 9, borderRadius: 2, background: "#f5c518", flex: "none" }} />
              <div style={{ font: "600 14px/1.2 'Noto Sans Thai',sans-serif", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{JOB.destination}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: "none", paddingLeft: 8, borderLeft: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ font: "700 20px/1 'Barlow Condensed',sans-serif", color: "#ff6a75" }}>{JOB.eta}</div>
            <div style={{ font: "400 10px/1 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.5)" }}>นาที</div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", right: 14, top: 200, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", pointerEvents: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(17,21,24,.9)", border: "1px solid rgba(34,192,122,.45)", borderRadius: 999, padding: "6px 12px 6px 8px" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#22c07a", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d2b1d" }} />
          </div>
          <div style={{ font: "600 12px/1 'Noto Sans Thai',sans-serif", color: "#5be3a5", whiteSpace: "nowrap" }}>งานเข้าใหม่</div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 14, bottom: 238, display: "flex", alignItems: "center", gap: 8, background: "rgba(17,21,24,.92)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, padding: "7px 13px", pointerEvents: "none" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c07a" }} />
        <div style={{ font: "500 12px/1 'Noto Sans Thai',sans-serif", color: "#e8e6e1" }}>คุณออนไลน์อยู่</div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "#171c1f", borderTop: "1px solid rgba(255,255,255,.08)", borderRadius: "26px 26px 0 0", padding: "14px 18px 10px" }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,.18)", margin: "0 auto 14px" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ font: "600 17px/1.2 'Noto Sans Thai',sans-serif", color: "#fff" }}>มอเตอร์ไซค์ · {JOB.eta} นาที</div>
            <div style={{ font: "400 12px/1.5 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.5)", marginTop: 4 }}>{JOB.distanceKm} กม. · ถึงประมาณ {JOB.arriveAt} · เส้นทางเร็วที่สุดแม้รถติด</div>
          </div>
          <div style={{ background: "rgba(225,29,47,.16)", border: "1px solid rgba(225,29,47,.45)", color: "#ff8a92", padding: "6px 10px", borderRadius: 10, font: "600 11px/1.2 'Noto Sans Thai',sans-serif", textAlign: "center", flex: "none" }}>ติดหนัก<br />ทั้งเส้น</div>
        </div>
        <div style={{ display: "flex", gap: 8, margin: "14px 0 0" }}>
          <div style={{ flex: 1, background: "#f5c518", color: "#14191c", borderRadius: 14, padding: "13px 0", textAlign: "center", font: "600 15px/1 'Noto Sans Thai',sans-serif", cursor: "pointer" }}>นำทาง</div>
          <div style={{ width: 52, background: "rgba(255,255,255,.07)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", font: "500 12px/1 'Noto Sans Thai',sans-serif", color: "#e8e6e1" }}>ดู</div>
          <div style={{ width: 52, background: "rgba(255,255,255,.07)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", font: "500 12px/1 'Noto Sans Thai',sans-serif", color: "#e8e6e1" }}>แชร์</div>
        </div>
        <TabBar
          onProfile={onProfile}
          onWallet={stop(() => setMapPhoto((v) => !v))}
          onChat={(e) => { e.stopPropagation(); if (!chatHeld.current) onOpenChat(e); }}
          onChatHoldDown={(e) => { e.stopPropagation(); chatHeld.current = false; chatHold.current = setTimeout(() => { chatHeld.current = true; setRouteOverlay((v) => !v); }, 500); }}
          onChatHoldUp={(e) => { e.stopPropagation(); if (chatHold.current) clearTimeout(chatHold.current); }}
          onCalendar={stop(() => setRouteEdit((v) => !v))}
        />
      </div>
    </div>
  );
}
