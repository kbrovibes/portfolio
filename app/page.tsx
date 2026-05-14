"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import MidnightTheme from "@/components/themes/midnight";
import TerminalTheme from "@/components/themes/terminal";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main>
      {!mounted ? <MidnightTheme /> : theme === "terminal" ? <TerminalTheme /> : <MidnightTheme />}
    </main>
  );
}
