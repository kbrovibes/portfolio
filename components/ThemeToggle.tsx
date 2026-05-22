"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMidnight = theme === "midnight";

  const base: React.CSSProperties = {
    padding: "4px 10px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.03em",
    transition: "all 0.2s ease",
    outline: "none",
    whiteSpace: "nowrap" as const,
  };

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.1)",
      backgroundColor: "rgba(255,255,255,0.04)",
      padding: 2,
    }}>
      <button
        onClick={() => setTheme("midnight")}
        style={{
          ...base,
          background: isMidnight ? "rgba(139,92,246,0.3)" : "transparent",
          color: isMidnight ? "#c4b5fd" : "rgba(255,255,255,0.3)",
        }}
      >
        🌙 Midnight
      </button>
      <button
        onClick={() => setTheme("terminal")}
        style={{
          ...base,
          fontFamily: !isMidnight ? '"Courier New", monospace' : "inherit",
          background: !isMidnight ? "rgba(0,255,65,0.15)" : "transparent",
          color: !isMidnight ? "#00ff41" : "rgba(255,255,255,0.3)",
        }}
      >
        &gt;_ Terminal
      </button>
    </div>
  );
}
