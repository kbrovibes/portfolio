"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as "midnight" | "terminal" | "goblin")}
      className="text-[11px] bg-white/[0.07] border border-white/[0.12] text-white/70
        rounded-full px-3 py-1.5 outline-none cursor-pointer
        hover:bg-white/[0.12] hover:text-white transition-all"
    >
      <option value="midnight">🌙 Midnight</option>
      <option value="terminal">⌨️ Terminal</option>
      <option value="goblin">🧌 Goblin Mode</option>
    </select>
  );
}
