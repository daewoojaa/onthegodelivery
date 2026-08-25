"use client";
import { useEffect, useRef, useState } from "react";

/** User-fillable image layer: drag a file in (or tap to browse). Persists as a data URL in localStorage. */
export default function ImageDrop({ id, placeholder }: { id: string; placeholder: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("otg-img-" + id);
      if (s) setSrc(s);
    } catch {}
  }, [id]);

  const take = (file?: File | null) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const url = String(r.result);
      setSrc(url);
      try { localStorage.setItem("otg-img-" + id, url); } catch {}
    };
    r.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => input.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); take(e.dataTransfer.files?.[0]); }}
      style={{
        position: "absolute", inset: 0, cursor: "pointer",
        background: src ? "#000" : "repeating-linear-gradient(115deg,#3a3129 0 14px,#332b24 14px 28px)",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center", font: "400 12px/1.5 'Noto Sans Thai',sans-serif", color: "rgba(255,255,255,.6)" }}>
          {placeholder}
        </div>
      )}
      <input ref={input} type="file" accept="image/*" onChange={(e) => take(e.target.files?.[0])} style={{ display: "none" }} />
    </div>
  );
}
