"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import MidnightTheme from "@/components/themes/midnight";
import TerminalTheme from "@/components/themes/terminal";
import BrutalTheme from "@/components/themes/brutal";
import NeonTheme from "@/components/themes/neon";
import AuroraTheme from "@/components/themes/aurora";
import ClaudeCodeTheme from "@/components/themes/claude-code";
import ClaudeCliTheme from "@/components/themes/claude-cli";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const content = !mounted || theme === "midnight" ? <MidnightTheme /> :
    theme === "terminal" ? <TerminalTheme /> :
    theme === "brutal" ? <BrutalTheme /> :
    theme === "neon" ? <NeonTheme /> :
    theme === "claude" ? <ClaudeCodeTheme /> :
    theme === "claudecli" ? <ClaudeCliTheme /> :
    <AuroraTheme />;

  return <main>{!mounted ? <MidnightTheme /> : <>{content}</>}</main>;
}
