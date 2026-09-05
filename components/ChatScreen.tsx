"use client";
import { useEffect, useRef, useState } from "react";

function EditableText({ id, defaultText, style }: { id: string; defaultText: string; style: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("otg-chat-" + id);
      if (saved && ref.current) ref.current.textContent = saved;
    } catch {}
  }, [id]);
  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => { try { localStorage.setItem("otg-chat-" + id, e.currentTarget.textContent || ""); } catch {} }}
      style={{ outline: "none", ...style }}
    >
      {defaultText}
    </div>
  );
}

function Bubble({ id, side, text, time, bg, color, timeColor }: {
  id: string; side: "left" | "right"; text: string; time: string; bg: string; color: string; timeColor: string;
}) {
  return (
    <div style={{
      alignSelf: side === "right" ? "flex-end" : "flex-start", maxWidth: "75%", display: "flex", alignItems: "flex-end", gap: 6,
      background: bg, color, font: "400 14px/1.5 'Noto Sans Thai',sans-serif", padding: "9px 13px",
      borderRadius: side === "right" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
    }}>
      <EditableText id={id + "-text"} defaultText={text} style={{}} />
      <EditableText id={id + "-time"} defaultText={time} style={{ fontSize: 10.5, color: timeColor, whiteSpace: "nowrap", flex: "none" }} />
    </div>
  );
}

export default function ChatScreen({ onClose }: { onClose: () => void }) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { const a = localStorage.getItem("otg-chat-avatar"); if (a) setAvatar(a); } catch {}
  }, []);

  const pickAvatar = (file?: File | null) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const url = String(r.result);
      setAvatar(url);
      try { localStorage.setItem("otg-chat-avatar", url); } catch {}
    };
    r.readAsDataURL(file);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0d10", display: "flex", flexDirection: "column", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 14px 12px", background: "#12171a", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div onClick={onClose} style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none", color: "#e8e6e1", font: "400 20px/1 sans-serif" }}>‹</div>
        <div onClick={() => input.current?.click()} style={{ width: 38, height: 38, borderRadius: "50%", flex: "none", overflow: "hidden", cursor: "pointer", background: avatar ? "transparent" : "linear-gradient(160deg,#5b6266,#2c3134)" }}>
          {avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
        <input ref={input} type="file" accept="image/*" onChange={(e) => pickAvatar(e.target.files?.[0])} style={{ display: "none" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <EditableText id="name" defaultText="Varunika T. On The Go (delivery)" style={{ font: "600 14px/1.3 'Noto Sans Thai',sans-serif", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} />
          <div style={{ font: "400 11px/1.3 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.4)" }}>ออนไลน์</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "hidden", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
        <EditableText id="date" defaultText="ส., 11 ก.ย." style={{ alignSelf: "center", background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.55)", font: "400 11px/1 'Noto Sans Thai',sans-serif", padding: "5px 12px", borderRadius: 999 }} />
        <Bubble id="m1" side="right" text="ฉันกำลังไป" time="15.32" bg="#f5c518" color="#14191c" timeColor="rgba(20,25,28,.6)" />
        <Bubble id="m2" side="left" text="อยู่ไหนแล้วคะ" time="15.48" bg="#1c2226" color="#e8e6e1" timeColor="rgba(255,255,255,.4)" />
        <Bubble id="m3" side="left" text="นี่มันเลทมาครึ่งชม. แล้วค่ะ" time="15.51" bg="#1c2226" color="#e8e6e1" timeColor="rgba(255,255,255,.4)" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#12171a", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ flex: 1, background: "#1c2226", borderRadius: 20, padding: "10px 16px", font: "400 13px/1 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.4)" }}>พิมพ์ข้อความ</div>
        <div style={{ width: 22, height: 22, flex: "none", color: "rgba(255,255,255,.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l16-7-6 16-3-7-7-2z" /></svg>
        </div>
      </div>
    </div>
  );
}
