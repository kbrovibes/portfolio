"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ChartLine, DollarSign, Shuffle } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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
    <section id="projects" className="py-28 px-6">
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
            AI Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Thinks{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              natively in AI
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            I don&apos;t bolt AI onto products. I architect from the model out —
            Claude, agents, and LLMs as the core, not the feature.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {/* ── stonkbro (2-wide) ──────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="lg:col-span-2 group relative rounded-3xl p-7 border overflow-hidden
              bg-gradient-to-br from-emerald-500/[0.07] to-transparent
              border-emerald-500/[0.15] hover:border-emerald-500/35
              transition-all duration-300"
          >
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

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
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              AI-powered options trading copilot. Live market data, PMCC scanner,
              real signals — built with Claude + Yahoo Finance. Not financial advice,
              definitely financial vibes.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Claude AI", "Supabase", "Vercel"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium
                    bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── snobaddy ──────────────────────────── */}
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
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Real-time sports club scheduling and court management. AI-assisted
              rotation and matchmaking — an engineering marvel the club didn&apos;t
              know it needed.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Supabase", "Tailwind", "Realtime"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium
                    bg-pink-500/10 text-pink-400/80 border border-pink-500/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── taxbro ──────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="group relative rounded-3xl p-7 border overflow-hidden
              bg-white/[0.02] border-white/[0.07]
              hover:border-amber-500/30 hover:bg-amber-500/[0.03]
              transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <DollarSign size={20} className="text-amber-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/60">
                Claude-powered
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">taxbro</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              AI-powered tax research assistant. Ask complex questions, get
              reasoning-backed answers. Built with Claude for workflows where
              accuracy actually matters.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Claude AI", "Next.js", "TypeScript"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium
                    bg-amber-500/10 text-amber-400/80 border border-amber-500/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── kbrovibes (2-wide) ─────────────────────────── */}
          <motion.div
            variants={tileAnim}
            className="lg:col-span-2 group relative rounded-3xl p-7 border overflow-hidden
              bg-gradient-to-br from-violet-500/[0.06] to-transparent
              border-violet-500/[0.12] hover:border-violet-500/30
              transition-all duration-300"
          >
            <div
              className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="mb-5">
              <span
                className="text-4xl font-black"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                kb
              </span>
              <span className="text-4xl font-black text-white">rovibes</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-md mb-5">
              GitHub org for weekend vibe-coding sessions. Real tools, real data,
              real AI — zero stakeholders, zero meetings. This is what happens when
              an infrastructure engineer builds product.
            </p>
            <a
              href="https://github.com/kbrovibes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold
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
