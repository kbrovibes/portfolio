"use client";

import { useEffect, useRef } from "react";

const THRESHOLD = 80;

export default function PullToRefresh() {
  const startY = useRef(0);
  const pulling = useRef(false);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate in PWA standalone mode
    const isPWA = window.matchMedia("(display-mode: standalone)").matches;
    if (!isPWA) return;

    const indicator = indicatorRef.current;
    if (!indicator) return;

    function onTouchStart(e: TouchEvent) {
      if (window.scrollY > 0) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }

    function onTouchMove(e: TouchEvent) {
      if (!pulling.current || !indicator) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy <= 0) return;

      const progress = Math.min(dy / THRESHOLD, 1);
      const translateY = Math.min(dy * 0.45, THRESHOLD * 0.45);

      indicator.style.opacity = String(progress);
      indicator.style.transform = `translateX(-50%) translateY(${translateY}px) rotate(${progress * 360}deg)`;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!pulling.current || !indicator) return;
      pulling.current = false;

      const dy = e.changedTouches[0].clientY - startY.current;
      if (dy >= THRESHOLD) {
        indicator.style.opacity = "1";
        indicator.style.transform = "translateX(-50%) translateY(36px) rotate(720deg)";
        setTimeout(() => window.location.reload(), 200);
      } else {
        indicator.style.opacity = "0";
        indicator.style.transform = "translateX(-50%) translateY(0px) rotate(0deg)";
      }
    }

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%) translateY(0px)",
        opacity: 0,
        zIndex: 9999,
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(10,10,18,0.85)",
        border: "1.5px solid rgba(139,92,246,0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.15s ease",
        pointerEvents: "none",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    </div>
  );
}
