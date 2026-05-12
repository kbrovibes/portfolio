"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  ChartLine,
  Home,
  Rocket,
  Shuffle,
  Trophy,
} from "lucide-react";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const tileAnim: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BentoBox() {
  return (
    <section id="interests" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Beyond the Day Job
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              full picture
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {/* ── TILE 1: Neptune (2-wide) ──────────────────── */}
          <motion.div
            variants={tileAnim}
            className="lg:col-span-2 group relative rounded-3xl p-7 border overflow-hidden
              bg-gradient-to-br from-violet-500/[0.08] to-pink-500/[0.04]
              border-violet-500/[0.18] hover:border-violet-500/40
              transition-all duration-300"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)", filter: "blur(30px)" }} />

            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-violet-500/15">
                <Rocket size={20} className="text-violet-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                AWS · 2011 – Present
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Amazon Neptune</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Fully managed graph database platform. Leading Storage, Control Plane,
              AWS Integrations & Global Expansion as SDM.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "30K+", l: "Servers" },
                { v: "$100M+", l: "ARR" },
                { v: "99.95%", l: "SLA" },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-xl p-3 bg-white/[0.04] border border-white/[0.06] text-center">
                  <p className="text-lg font-black text-white">{v}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-wide">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── TILE 2: stonkbro ──────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="group relative rounded-3xl p-7 border overflow-hidden
              bg-white/[0.02] border-white/[0.07]
              hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]
              transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <ChartLine size={20} className="text-emerald-400" />
              </div>
              <a
                href="https://stonkbro.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30
                  hover:text-emerald-400 hover:bg-emerald-500/10
                  transition-all group-hover:scale-105"
              >
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">stonkbro</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              AI-powered options trading copilot. Live market data, PMCC scanner,
              real signals — built with Claude + Yahoo Finance.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Next.js", "Claude AI", "Supabase", "Vercel"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium
                  bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── TILE 3: Badminton ─────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="group relative rounded-3xl p-7 border overflow-hidden
              bg-white/[0.02] border-white/[0.07]
              hover:border-amber-500/30 hover:bg-amber-500/[0.03]
              transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <Trophy size={20} className="text-amber-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/60">
                Doubles
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Badminton</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Doubles specialist. Monday & Thursday nights at Serve Snoqualmie
              Sports — the most over-committed hobby in the PNW.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-amber-400/70">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Mon &amp; Thu · Snoqualmie, WA
            </div>
          </motion.div>

          {/* ── TILE 4: snobaddy ──────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="group relative rounded-3xl p-7 border overflow-hidden
              bg-white/[0.02] border-white/[0.07]
              hover:border-pink-500/30 hover:bg-pink-500/[0.03]
              transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-pink-500/10">
                <Shuffle size={20} className="text-pink-400" />
              </div>
              <a
                href="https://snobaddy.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30
                  hover:text-pink-400 hover:bg-pink-500/10 transition-all"
              >
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">snobaddy</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              A digital whiteboard for the Snoqualmie badminton club. An
              engineering marvel absolutely no one asked for.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Next.js", "Supabase", "Tailwind"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium
                  bg-pink-500/10 text-pink-400/80 border border-pink-500/15">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── TILE 5: Smart Home (2-wide) ───────────────── */}
          <motion.div
            variants={tileAnim}
            className="lg:col-span-2 group relative rounded-3xl p-7 border overflow-hidden
              bg-white/[0.02] border-white/[0.07]
              hover:border-blue-500/30 hover:bg-blue-500/[0.03]
              transition-all duration-300"
          >
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <Home size={20} className="text-blue-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
                Always On
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Home</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-md">
              Home automation built with the same rigor as distributed systems.
              Because why should work have all the fun? Fully automated, always
              monitored, occasionally over-engineered.
            </p>
          </motion.div>

          {/* ── TILE 6: kbrovibes ─────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="group relative rounded-3xl p-7 border overflow-hidden
              bg-gradient-to-br from-violet-500/[0.06] to-transparent
              border-violet-500/[0.12] hover:border-violet-500/30
              transition-all duration-300"
          >
            <div className="mb-6">
              <span className="text-4xl font-black"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                kb
              </span>
              <span className="text-4xl font-black text-white">rovibes</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              GitHub org for weekend vibe-coding sessions. Real tools, real data,
              zero stakeholders.
            </p>
            <a
              href="https://github.com/kbrovibes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold
                text-violet-400 hover:text-violet-300 transition-colors"
            >
              View on GitHub <ArrowUpRight size={12} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
