"use client";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

type Variant = "midnight" | "terminal" | "goblin";

const LABELS: Record<string, string> = {
  midnight: "Midnight",
  terminal: "Terminal",
  goblin: "Goblin Mode",
};

/**
 * Copies a shareable link to the CURRENTLY active theme, e.g.
 *   https://karthikrajan.info/?theme=goblin
 * Whoever opens it lands directly in that themed version.
 */
export default function ShareTheme({ variant }: { variant: Variant }) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  async function share() {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const link = `${origin}/?theme=${theme}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Karthik Rajan — ${LABELS[theme] ?? theme}`,
          url: link,
        });
        return;
      }
      await navigator.clipboard.writeText(link);
    } catch {
      // user dismissed the share sheet, or clipboard blocked — fall through
      try {
        await navigator.clipboard.writeText(link);
      } catch {
        /* no-op */
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const label = copied ? "Link copied ✓" : "Share this look";

  if (variant === "terminal") {
    return (
      <button
        onClick={share}
        style={{
          fontFamily:
            'var(--font-mono), "JetBrains Mono", "SF Mono", Menlo, monospace',
          background: "transparent",
          border: "1px solid #1a3a2a",
          color: copied ? "#00ff41" : "#86efac",
          fontSize: 12,
          padding: "5px 12px",
          borderRadius: 4,
          cursor: "pointer",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {copied ? "$ copied ✓" : "$ share --link"}
      </button>
    );
  }

  if (variant === "goblin") {
    return (
      <button
        onClick={share}
        style={{
          fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", system-ui, sans-serif',
          background: copied
            ? "#22c55e"
            : "linear-gradient(90deg,#ff2d95,#ffd400,#00d4ff)",
          border: "3px solid #111",
          color: "#111",
          fontSize: 15,
          fontWeight: 800,
          padding: "8px 18px",
          borderRadius: 999,
          cursor: "pointer",
          boxShadow: "3px 3px 0 #111",
          transform: "rotate(-1.5deg)",
          transition: "transform 0.12s ease",
          whiteSpace: "nowrap",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "rotate(-1.5deg) translate(2px,2px)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "rotate(-1.5deg)")}
      >
        {copied ? "yoinked! 📋✨" : "📢 share the chaos"}
      </button>
    );
  }

  // midnight
  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium
        bg-white/[0.06] border border-white/[0.12] text-white/70
        hover:bg-white/[0.1] hover:text-white hover:border-white/25 transition-all duration-200"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {label}
    </button>
  );
}
