"use client";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import MapScreen from "./MapScreen";
import LockScreen from "./LockScreen";
import DetailSheet from "./DetailSheet";
import ChatScreen from "./ChatScreen";

const W = 370, H = 790;

export default function App() {
  const [lock, setLock] = useState(false);
  const [notif, setNotif] = useState(false);
  const [detail, setDetail] = useState(false);
  const [chat, setChat] = useState(false);
  const [scale, setScale] = useState(1);
  const taps = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delay = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
      if (tapTimer.current) clearTimeout(tapTimer.current);
      if (delay.current) clearTimeout(delay.current);
    };
  }, []);

  /** 3 taps → notification after a 4s delay · 4 taps once it is up → back to the map */
  const lockTap = () => {
    if (tapTimer.current) clearTimeout(tapTimer.current);
    taps.current += 1;
    tapTimer.current = setTimeout(() => { taps.current = 0; }, 900);
    if (!notif && taps.current >= 3) {
      taps.current = 0;
      if (delay.current) clearTimeout(delay.current);
      delay.current = setTimeout(() => setNotif(true), 4000);
    } else if (notif && taps.current >= 4) {
      taps.current = 0;
      closeAll();
    }
  };

  const closeAll = () => {
    if (delay.current) clearTimeout(delay.current);
    setLock(false);
    setNotif(false);
    setDetail(false);
  };

  const goLock = (e: MouseEvent) => {
    e.stopPropagation();
    taps.current = 0;
    if (delay.current) clearTimeout(delay.current);
    setLock(true);
    setNotif(false);
    setDetail(false);
  };

  return (
    <main style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#0d0f10", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: W, height: H, flex: "none", transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#111517" }}>
          <MapScreen onProfile={goLock} onOpenChat={(e) => { e.stopPropagation(); setChat(true); }} onSecretHold={() => { setLock(true); setNotif(false); setDetail(false); taps.current = 0; }} />
          {lock && <LockScreen notif={notif} onTap={lockTap} onOpenDetail={() => { setDetail(true); setNotif(false); setLock(false); }} />}
          {detail && <DetailSheet onClose={closeAll} />}
          {chat && <ChatScreen onClose={() => setChat(false)} />}
        </div>
      </div>
    </main>
  );
}
