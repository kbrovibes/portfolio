"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: bgOpacity.get() > 0
          ? `rgba(10,10,18,${bgOpacity.get()})`
          : "transparent",
      }}
    >
      {/* Re-render when opacity changes */}
      <motion.div style={{ opacity: 1 }} className="hidden" />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between
        border-b border-white/[0.04]">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm font-semibold tracking-wide text-white/80"
        >
          KR<span className="text-violet-400">.</span>
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-5"
        >
          <a
            href="https://www.linkedin.com/in/k4rthikr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/90 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={16} />
          </a>
          <a
            href="https://github.com/kbrovibes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/90 transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href="mailto:k4rthikr@gmail.com"
            className="text-white/40 hover:text-white/90 transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <ThemeSelector />
          <a
            href="mailto:k4rthikr@gmail.com"
            className="ml-2 px-4 py-1.5 rounded-full text-xs font-semibold
              bg-white/[0.06] border border-white/[0.1] text-white/70
              hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-violet-300
              transition-all duration-200"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </motion.nav>
  );
}
