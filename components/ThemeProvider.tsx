"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "midnight" | "terminal" | "goblin";

const VALID: Theme[] = ["midnight", "terminal", "goblin"];

interface Ctx { theme: Theme; setTheme: (t: Theme) => void; }
const ThemeCtx = createContext<Ctx>({ theme: "midnight", setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("midnight");

  useEffect(() => {
    // A ?theme= query param (shareable links) wins over the saved preference.
    const fromUrl = new URLSearchParams(window.location.search).get("theme") as Theme | null;
    if (fromUrl && VALID.includes(fromUrl)) {
      apply(fromUrl);
      return;
    }
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved && VALID.includes(saved)) apply(saved);
  }, []);

  function apply(t: Theme) {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
    document.documentElement.dataset.theme = t;
  }

  return <ThemeCtx.Provider value={{ theme, setTheme: apply }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
