"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          {/* Left */}
          <div>
            <p className="text-2xl font-black text-white mb-1">
              KR<span className="text-violet-400">.</span>
            </p>
            <p className="text-sm text-white/30">
              Karthik Rajan · Snoqualmie, WA
            </p>
          </div>

          {/* Center – CTA */}
          <div className="text-center">
            <p className="text-white/40 text-sm mb-3">
              Building something interesting? Let&apos;s talk.
            </p>
            <a
              href="mailto:k4rthikr@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold
                text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}
            >
              <Mail size={14} />
              k4rthikr@gmail.com
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/k4rthikr/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]
                text-white/40 hover:text-white/90 hover:border-white/20
                transition-all duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href="https://github.com/kbrovibes"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]
                text-white/40 hover:text-white/90 hover:border-white/20
                transition-all duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xs text-white/15 mt-12 font-mono tracking-widest uppercase"
        >
          Built with Next.js · Tailwind CSS · Framer Motion · Deployed on Vercel
        </motion.p>
      </div>
    </footer>
  );
}
