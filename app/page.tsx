"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import MidnightTheme from "@/components/themes/midnight";
import TerminalTheme from "@/components/themes/terminal";
import GoblinTheme from "@/components/themes/goblin";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <main><MidnightTheme /></main>;

  return (
    <main>
      {theme === "terminal" ? (
        <TerminalTheme />
      ) : theme === "goblin" ? (
        <GoblinTheme />
      ) : (
        <MidnightTheme />
      )}
    </main>
  );
}
