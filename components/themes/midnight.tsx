"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Zap, ChartLine, DollarSign, Shuffle, Layers, Rocket, Users } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS, TECH_GROUPS } from "@/lib/portfolio-data";

// ── Icons ────────────────────────────────────────────────────────────────────

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

// ── Variants ─────────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const statVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

// ── Timeline config (styling) ────────────────────────────────────────────────

const timelineStyle: Record<string, {
  dotColor: string;
  dotClass: string;
  labelColor: string;
  bulletColor: string;
  cardClass: string;
}> = {
  meta: {
    dotColor: "#60a5fa",
    dotClass: "bg-blue-400",
    labelColor: "text-blue-400",
    bulletColor: "text-blue-400",
    cardClass: "bg-blue-500/[0.07] border-blue-500/[0.18] hover:border-blue-500/40",
  },
  "neptune-sdm2": {
    dotColor: "#f59e0b",
    dotClass: "bg-amber-400/80",
    labelColor: "text-amber-400",
    bulletColor: "text-amber-500",
    cardClass: "bg-white/[0.02] border-white/[0.07] hover:border-amber-500/25 hover:bg-amber-500/[0.03]",
  },
  "neptune-sdm1": {
    dotColor: "#f59e0b",
    dotClass: "bg-amber-400/80",
    labelColor: "text-amber-400",
    bulletColor: "text-amber-500",
    cardClass: "bg-white/[0.02] border-white/[0.07] hover:border-amber-500/25 hover:bg-amber-500/[0.03]",
  },
  "neptune-sde": {
    dotColor: "#f59e0b",
    dotClass: "bg-amber-400/80",
    labelColor: "text-amber-400",
    bulletColor: "text-amber-500",
    cardClass: "bg-white/[0.02] border-white/[0.07] hover:border-amber-500/25 hover:bg-amber-500/[0.03]",
  },
  yahoo: {
    dotColor: "#a855f7",
    dotClass: "bg-purple-400/80",
    labelColor: "text-purple-400",
    bulletColor: "text-purple-400",
    cardClass: "bg-white/[0.02] border-white/[0.07] hover:border-purple-500/25 hover:bg-purple-500/[0.03]",
  },
};

const techIcons: Record<string, React.ElementType> = {
  "Cloud & Infra": Layers,
  "Languages": Zap,
  "Graph & Data": Rocket,
  "Frontend & AI": Users,
};

const techColors: Record<string, string> = {
  "Cloud & Infra": "violet",
  "Languages": "pink",
  "Graph & Data": "blue",
  "Frontend & AI": "violet",
};

const colorMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  pink: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
};

const iconColorMap: Record<string, string> = {
  violet: "text-violet-400",
  pink: "text-pink-400",
  blue: "text-blue-400",
};

// ── Nav ───────────────────────────────────────────────────────────────────────

function MidnightNav() {
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
      <motion.div style={{ opacity: 1 }} className="hidden" />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between border-b border-white/[0.04]">
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
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-white/40 hover:text-white/90 transition-colors" aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            className="text-white/40 hover:text-white/90 transition-colors" aria-label="GitHub">
            <GitHubIcon size={16} />
          </a>
          <a href={`mailto:${PERSONAL.email}`} className="text-white/40 hover:text-white/90 transition-colors" aria-label="Email">
            <Mail size={16} />
          </a>
          <ThemeSelector />
          <a href={`mailto:${PERSONAL.email}`}
            className="ml-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/[0.1] text-white/70 hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200">
            Get in touch
          </a>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function MidnightHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(139,92,246,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 75%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 65%)", filter: "blur(60px)", animation: "float-orb 22s ease-in-out infinite" }}
      />
      <div aria-hidden className="pointer-events-none absolute -bottom-60 -right-20 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 65%)", filter: "blur(80px)", animation: "float-orb-2 17s ease-in-out infinite" }}
      />
      <div aria-hidden className="pointer-events-none absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,130,251,0.12) 0%, transparent 65%)", filter: "blur(60px)", animation: "float-orb-3 14s ease-in-out infinite" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 border border-blue-500/20 text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Engineering Manager · Meta · Blob Storage
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-[92px] font-black leading-[0.92] tracking-[-3px] mb-6">
            <span className="text-white">{PERSONAL.firstName}</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 55%, #3B82F6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {PERSONAL.lastName}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/40 font-light leading-relaxed mb-3 max-w-2xl">
            Currently at{" "}
            <span className="text-white/80 font-medium">Meta Blob Storage</span>
            {", "}building petabyte-scale infrastructure. Previously{" "}
            <span className="text-white/80 font-medium">14 years at Amazon Neptune</span>{" "}
            — SDE to leading 4 teams and{" "}
            <span className="text-white/80 font-medium">60% of the org</span>.
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-white/25 mb-12">
            <MapPin size={13} />
            <span>{PERSONAL.location}</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-20">
            <a href="#professional" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>
              View My Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-white/[0.06] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white hover:border-white/20 transition-all duration-200">
              Say Hello
            </a>
          </motion.div>
          <motion.div variants={container} className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.06]">
            {HERO_STATS.map(({ value, label }) => (
              <motion.div key={label} variants={statVariant} className="flex flex-col items-center justify-center py-5 px-4 bg-[#0a0a12] hover:bg-white/[0.03] transition-colors">
                <span className="text-2xl sm:text-3xl font-black tracking-tight mb-1"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-semibold">{label}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-16 flex items-center gap-3 text-white/20">
            <Zap size={12} className="text-violet-500/60" />
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Professional ──────────────────────────────────────────────────────────────

function MidnightProfessional() {
  return (
    <section id="professional" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Career
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            15 years building{" "}
            <span style={{ background: "linear-gradient(135deg, #0082fb, #8B5CF6 50%, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              at hyperscale
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            From Yahoo! Bangalore to Amazon to Meta — always deep in distributed systems, always building infrastructure that cannot fail.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <div className="relative">
              <div className="absolute top-6 bottom-20 pointer-events-none"
                style={{ left: "5px", width: "2px", background: "linear-gradient(to bottom, #60a5fa, #8B5CF6 35%, #EC4899 75%, transparent)", opacity: 0.55 }}
              />
              <div className="space-y-3">
                {TIMELINE.map((item) => {
                  const s = timelineStyle[item.id] ?? timelineStyle["neptune-sdm2"];
                  return (
                    <motion.div key={item.id} variants={slideLeft} className="relative pl-9">
                      <div className={`absolute left-0 top-[22px] w-3 h-3 rounded-full border-2 border-[#0a0a12] ${s.dotClass}`}
                        style={item.current ? { boxShadow: `0 0 0 3px ${s.dotColor}30` } : {}}>
                        {item.current && (
                          <span className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ background: s.dotColor }} />
                        )}
                      </div>
                      <div className={`rounded-2xl p-5 border transition-all duration-300 ${s.cardClass}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-[10px] text-white/25 font-mono tracking-wide mb-1">{item.period}</p>
                            <h3 className="text-[15px] font-bold text-white leading-snug">{item.role}</h3>
                            <p className={`text-sm font-medium mt-0.5 ${s.labelColor}`}>
                              {item.company}<span className="text-white/25"> · {item.location}</span>
                            </p>
                          </div>
                          {item.current && (
                            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400 mt-1 flex-shrink-0 ml-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                              Now
                            </span>
                          )}
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {item.highlights.map((h) => (
                            <li key={h} className="text-sm text-white/35 flex gap-2">
                              <span className={`${s.bulletColor} opacity-60 mt-0.5 flex-shrink-0 text-[10px]`}>▸</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
                <motion.div variants={slideLeft} className="relative pl-9">
                  <div className="absolute left-0 top-[22px] w-3 h-3 rounded-full border-2 border-[#0a0a12] bg-white/20" />
                  <div className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300">
                    <p className="text-[10px] text-white/25 font-mono tracking-wide mb-1">{EDUCATION.period}</p>
                    <h3 className="text-[15px] font-bold text-white leading-snug">{EDUCATION.degree}</h3>
                    <p className="text-sm font-medium text-white/50 mt-0.5">{EDUCATION.school} · {EDUCATION.location}</p>
                    <p className="text-sm text-white/30 mt-2">{EDUCATION.detail}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="space-y-4">
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-6">Tech Stack</motion.p>
            {TECH_GROUPS.map(({ label, items }) => {
              const color = techColors[label] ?? "violet";
              const Icon = techIcons[label] ?? Layers;
              return (
                <motion.div key={label} variants={fadeUp} className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Icon size={15} className={iconColorMap[color]} />
                    <span className="text-sm font-semibold text-white/70">{label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${colorMap[color]}`}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── BentoBox ──────────────────────────────────────────────────────────────────

function MidnightBento() {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            AI Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Thinks{" "}
            <span style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              natively in AI
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            I don&apos;t bolt AI onto products. I architect from the model out — Claude, agents, and LLMs as the core, not the feature.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {/* stonkbro */}
          <motion.div variants={tileAnim} className="lg:col-span-2 group relative rounded-3xl p-7 border overflow-hidden bg-gradient-to-br from-emerald-500/[0.07] to-transparent border-emerald-500/[0.15] hover:border-emerald-500/35 transition-all duration-300">
            <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)", filter: "blur(30px)" }}
            />
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10"><ChartLine size={20} className="text-emerald-400" /></div>
              <a href="https://stonkbro.vercel.app" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all group-hover:scale-105">
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">stonkbro</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              AI-powered options trading copilot. Live market data, PMCC scanner, real signals — built with Claude + Yahoo Finance. Not financial advice, definitely financial vibes.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Claude AI", "Supabase", "Vercel"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* snobaddy */}
          <motion.div variants={tileAnim} className="group relative rounded-3xl p-7 border overflow-hidden bg-white/[0.02] border-white/[0.07] hover:border-pink-500/30 hover:bg-pink-500/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-pink-500/10"><Shuffle size={20} className="text-pink-400" /></div>
              <a href="https://snobaddy.vercel.app" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-pink-400 hover:bg-pink-500/10 transition-all">
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">snobaddy</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              Real-time sports club scheduling and court management. AI-assisted rotation and matchmaking — an engineering marvel the club didn&apos;t know it needed.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Supabase", "Tailwind", "Realtime"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-pink-500/10 text-pink-400/80 border border-pink-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* taxbro */}
          <motion.div variants={tileAnim} className="group relative rounded-3xl p-7 border overflow-hidden bg-white/[0.02] border-white/[0.07] hover:border-amber-500/30 hover:bg-amber-500/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10"><DollarSign size={20} className="text-amber-400" /></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/60">Claude-powered</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">taxbro</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
              AI-powered tax research assistant. Ask complex questions, get reasoning-backed answers. Built with Claude for workflows where accuracy actually matters.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Claude AI", "Next.js", "TypeScript"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/10 text-amber-400/80 border border-amber-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* kbrovibes */}
          <motion.div variants={tileAnim} className="lg:col-span-2 group relative rounded-3xl p-7 border overflow-hidden bg-gradient-to-br from-violet-500/[0.06] to-transparent border-violet-500/[0.12] hover:border-violet-500/30 transition-all duration-300">
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter: "blur(30px)" }}
            />
            <div className="mb-5">
              <span className="text-4xl font-black" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>kb</span>
              <span className="text-4xl font-black text-white">rovibes</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-md mb-5">
              GitHub org for weekend vibe-coding sessions. Real tools, real data, real AI — zero stakeholders, zero meetings. This is what happens when an infrastructure engineer builds product.
            </p>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
              View on GitHub <ArrowUpRight size={12} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function MidnightFooter() {
  return (
    <footer className="py-20 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-2xl font-black text-white mb-1">KR<span className="text-violet-400">.</span></p>
            <p className="text-sm text-white/30">Karthik Rajan · Snoqualmie, WA</p>
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm mb-3">Building something interesting? Let&apos;s talk.</p>
            <a href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>
              <Mail size={14} />
              {PERSONAL.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/90 hover:border-white/20 transition-all duration-200" aria-label="LinkedIn">
              <LinkedInIcon size={16} />
            </a>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/90 hover:border-white/20 transition-all duration-200" aria-label="GitHub">
              <GitHubIcon size={16} />
            </a>
          </div>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-xs text-white/15 mt-12 font-mono tracking-widest uppercase">
          Built with Next.js · Tailwind CSS · Framer Motion · Deployed on Vercel
        </motion.p>
      </div>
    </footer>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function MidnightTheme() {
  return (
    <>
      <MidnightNav />
      <MidnightHero />
      <MidnightProfessional />
      <MidnightBento />
      <MidnightFooter />
    </>
  );
}
