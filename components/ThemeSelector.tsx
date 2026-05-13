"use client";
import { useTheme, type Theme } from "./ThemeProvider";

const OPTIONS: { id: Theme; label: string; icon: string }[] = [
  { id: "midnight", label: "Midnight", icon: "🌙" },
  { id: "terminal", label: "Terminal", icon: "⌨️" },
  { id: "brutal", label: "Brutal", icon: "⚡" },
  { id: "neon", label: "Neon", icon: "🔮" },
  { id: "aurora", label: "Aurora", icon: "🌌" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="text-[11px] bg-white/[0.07] border border-white/[0.12] text-white/70
        rounded-full px-3 py-1.5 outline-none cursor-pointer
        hover:bg-white/[0.12] hover:text-white transition-all"
    >
      {OPTIONS.map(({ id, label, icon }) => (
        <option key={id} value={id}>{icon} {label}</option>
      ))}
    </select>
  );
}
