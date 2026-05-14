"use client";

import { useState, Fragment } from "react";
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Zap, ChartLine, DollarSign, Shuffle, ChevronDown, Download, Mic, RefreshCw } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { PERSONAL, TIMELINE, EDUCATION, PROJECTS } from "@/lib/portfolio-data";

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


const EXPANSIONS: Record<string, { heading: string; body: string; highlights: string[] }> = {
  meta: {
    heading: "What I'm building at Meta",
    body: "At Meta, I lead engineering for Blob Storage — the infrastructure moving exabytes of data in and out of Meta's global systems. This means ingestion pipelines from production services, large-scale exports feeding ML training and analytics, and reliability systems that operate at a scale where even tiny error rates translate to millions of failures. There's more I'm working on that I can't describe publicly — reach out if you're curious.",
    highlights: [
      "Exabyte-scale data movement: ingestion, egress, and cross-region replication at Meta scale",
      "Reliability and throughput for storage infrastructure serving billions of users",
      "Leading a distributed engineering org across multiple sites",
      "Additional confidential infra projects — ask me",
    ],
  },
  "neptune-sdm2": {
    heading: "SDM II at Neptune · 2022–2025",
    body: "My second chapter leading Neptune was about scaling the org and shipping high-profile launches. I owned four teams — Storage, Control Plane, AWS Integrations, and Global Expansion — covering 60% of Neptune engineering. Two flagship launches defined this period: Neptune Analytics (a new graph analytics engine at AWS re:Invent 2023) and GraphRAG (co-built with the Amazon Bedrock team, shipped at re:Invent 2024). I also rebuilt our operational model — moving from a flat on-call rotation to a tiered, follow-the-sun system that significantly reduced engineer toil.",
    highlights: [
      "Neptune Analytics — new graph analytics engine, shipped at re:Invent 2023",
      "GraphRAG — co-built with Bedrock, shipped at re:Invent 2024",
      "25+ engineers across 4 global teams — 60% of Neptune org",
      "Tiered on-call + follow-the-sun operational overhaul",
    ],
  },
  "neptune-sdm1": {
    heading: "SDM I at Neptune · 2020–2022",
    body: "I took the Neptune Storage team from 1 SDE to 15 across Seattle, Vancouver, and the Bay Area. During this period Neptune expanded from a handful of regions to 22, including FedRAMP GovCloud and AWS private cloud. The work I'm most proud of: a tiered NVMe caching layer that delivered 30% query speedup and contributed ~$4M in incremental ARR, and a bulk export feature that cut full-graph S3 export times from days to under three hours.",
    highlights: [
      "Scaled team 1 → 15 SDEs across three cities in two years",
      "Neptune expanded to 22 AWS regions including GovCloud and private cloud",
      "NVMe tiered cache: 30% query speedup, +$4M ARR",
      "S3 bulk export: days → under 3 hours for full graph exports",
    ],
  },
  "neptune-sde": {
    heading: "SDE → Tech Lead · 2011–2019",
    body: "Eight years as an IC before management. I architected Neptune's Control Plane — the distributed system that provisions, monitors, and manages 30K+ Neptune instances across all global regions. I led a TLS overhaul subsequently adopted by four other AWS services. Along the way I built Neptune's core enterprise feature set from scratch: multi-tenancy, encryption at rest, authentication primitives, and the benchmarking infrastructure used to safely certify every Neptune version release.",
    highlights: [
      "Control Plane: distributed orchestration for 30K+ global Neptune instances",
      "TLS redesign adopted by 4 other AWS services post-launch",
      "Enterprise feature set built from scratch: auth, encryption, multi-tenancy",
      "Release certification infra still used for every Neptune version today",
    ],
  },
  yahoo: {
    heading: "Yahoo! Bangalore · Summer 2011",
    body: "Before Amazon, I interned at Yahoo!'s Bangalore engineering center. My project was in ad quality: building malware detection signals to catch bad ads before they served to users. Three months, fast feedback loops, and my first real taste of production systems at scale. I graduated from NIT Calicut a few weeks later, joined Amazon, and haven't looked back.",
    highlights: [
      "Malware detection signals for Yahoo!'s ad quality pipeline",
      "Ad classification features for the Bangalore ads platform",
      "First exposure to production-scale systems engineering",
    ],
  },
};

const EDU_EXPANSION = {
  heading: "NIT Calicut · 2007–2011",
  body: "I studied Computer Science and Engineering at the National Institute of Technology, Calicut — one of India's premier engineering schools. Graduated in 2011 with a CGPA of 8.47/10. In my final year, I won the Mobme Codejam 2011, a national programming competition that led directly to my placement at Amazon. Best ROI on a weekend hackathon I've ever had.",
  highlights: [
    "CGPA 8.47/10",
    "Winner, Mobme Codejam 2011 — national programming competition",
    "Direct placement into Amazon from campus",
  ],
};

// ── Impact (stats + speaking) ─────────────────────────────────────────────────

const IMPACT_STATS = [
  { value: "$100M+", label: "ARR at Neptune peak", color: "#f59e0b" },
  { value: "30K+", label: "servers managed", color: "#8B5CF6" },
  { value: "22", label: "AWS regions shipped", color: "#60a5fa" },
  { value: "25+", label: "engineers led", color: "#EC4899" },
];

const TALKS = [
  {
    year: "AWS re:Invent 2024",
    title: "GraphRAG with Amazon Neptune",
    description:
      "Co-presented with the Amazon Bedrock team — combining knowledge graphs with LLMs for production-grade RAG at enterprise scale. Shipped live on stage in Las Vegas.",
    tags: ["Amazon Bedrock", "GraphRAG", "Neptune Analytics"],
    cardClass:
      "bg-blue-500/[0.05] border-blue-500/[0.12] hover:border-blue-500/30",
    tagClass: "bg-blue-500/10 text-blue-400/80 border-blue-500/15",
    yearClass: "text-blue-400/70",
    iconClass: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    year: "AWS re:Invent 2023",
    title: "Neptune Analytics Launch",
    description:
      "Launched Neptune Analytics on stage — a purpose-built graph analytics engine with vector similarity search and petabyte-scale traversals. First time Neptune went live at the conference.",
    tags: ["Graph Analytics", "Vector Search", "Amazon Neptune"],
    cardClass:
      "bg-violet-500/[0.05] border-violet-500/[0.12] hover:border-violet-500/30",
    tagClass: "bg-violet-500/10 text-violet-400/80 border-violet-500/15",
    yearClass: "text-violet-400/70",
    iconClass: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
];

function MidnightImpact() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Stats strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20"
        >
          {IMPACT_STATS.map(({ value, label, color }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] text-center"
            >
              <p
                className="text-3xl sm:text-4xl font-black mb-1.5"
                style={{ color }}
              >
                {value}
              </p>
              <p className="text-[11px] text-white/30 uppercase tracking-[0.15em] leading-relaxed">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Speaking header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Speaking
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            On stage at{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF9900, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              re:Invent
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            Two consecutive years presenting at AWS&apos;s flagship conference —
            both times shipping products live on stage.
          </p>
        </motion.div>

        {/* Talk cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-4"
        >
          {TALKS.map((talk) => (
            <motion.div
              key={talk.year}
              variants={tileAnim}
              className={`rounded-2xl p-6 border transition-all duration-300 ${talk.cardClass}`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${talk.iconBg}`}>
                  <Mic size={18} className={talk.iconClass} />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${talk.yearClass}`}
                >
                  {talk.year}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{talk.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                {talk.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {talk.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${talk.tagClass}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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
          <a href="/karthik-rajan-resume.pdf" download
            className="text-white/40 hover:text-white/90 transition-colors" aria-label="Download Resume" title="Download Resume">
            <Download size={16} />
          </a>
          <button onClick={() => window.location.reload()} className="text-white/40 hover:text-white/90 transition-colors" aria-label="Refresh page">
            <RefreshCw size={15} />
          </button>
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

          {/* Name */}
          <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-[92px] font-black leading-[0.92] tracking-[-3px] mb-5">
            <span className="text-white">{PERSONAL.firstName}</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 55%, #3B82F6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {PERSONAL.lastName}
            </span>
          </motion.h1>

          {/* Role — below name, prominent */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-white/65">
              Engineering Manager, Blob Storage{" "}
              <span className="text-blue-400">@ Meta</span>
            </p>
          </motion.div>

          {/* 2-liner description */}
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-white/50 font-light leading-relaxed mb-2 max-w-2xl">
            Building Meta&apos;s{" "}
            <span className="text-white/80 font-medium">Data Transfer Infrastructure</span>
            {" "}— moving <span className="text-white/80 font-medium">exabytes</span> reliably, one byte at a time.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base text-white/35 font-light leading-relaxed mb-3 max-w-2xl">
            <span className="text-white/55 font-medium">15+ YOE</span>
            <span className="text-white/20"> · </span>
            <span className="text-white/55 font-medium">ex-AWS Engineering Leader</span>
            <span className="text-white/20"> · </span>
            <span className="text-white/30 italic">some things I still can&apos;t talk about</span>
          </motion.p>

          {/* Location */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm text-white/25 mb-8">
            <MapPin size={13} />
            <span>Seattle, WA</span>
          </motion.div>

          {/* Theme toggle */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="text-[11px] text-white/25 uppercase tracking-widest">View as</span>
            <ThemeToggle />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-16">
            <a href="#professional" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)" }}>
              View My Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-white/[0.06] border border-white/[0.1] text-white/70 hover:bg-white/[0.1] hover:text-white hover:border-white/20 transition-all duration-200">
              Let&apos;s vibe
            </a>
            <a href="/karthik-rajan-resume.pdf" download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm bg-white/[0.03] border border-white/[0.07] text-white/40 hover:bg-white/[0.07] hover:text-white/70 hover:border-white/14 transition-all duration-200">
              <Download size={13} />
              Resume
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-white/20">
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
  const [expanded, setExpanded] = useState<string | null>(null);

  const allEntries = [
    ...TIMELINE,
    {
      id: "edu",
      period: EDUCATION.period,
      role: EDUCATION.degree,
      company: EDUCATION.school,
      location: EDUCATION.location,
      current: false,
      highlights: [EDUCATION.detail],
    },
  ];

  const rows: Array<typeof allEntries[number][]> = [];
  for (let i = 0; i < allEntries.length; i += 3) {
    rows.push(allEntries.slice(i, i + 3));
  }

  const eduStyle = {
    dotColor: "rgba(255,255,255,0.35)",
    dotClass: "bg-white/20",
    labelColor: "text-white/50",
    bulletColor: "text-white/40",
    cardClass: "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04]",
  };

  return (
    <section id="professional" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
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
          <p className="mt-3 text-white/18 text-xs tracking-wide">Click any card to read more</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {rows.map((pair, rowIdx) => {
            const expandedIdx = pair.findIndex((e) => e.id === expanded);
            const expandedEntry = expandedIdx >= 0 ? pair[expandedIdx] : null;
            const expansion = expandedEntry
              ? expandedEntry.id === "edu"
                ? EDU_EXPANSION
                : EXPANSIONS[expandedEntry.id] ?? null
              : null;
            const expandedStyle = expandedEntry
              ? expandedEntry.id === "edu"
                ? eduStyle
                : timelineStyle[expandedEntry.id] ?? timelineStyle["neptune-sdm2"]
              : null;
            // Triangle points up to the card that opened it; col centers: 0→16.67%, 1→50%, 2→83.33%
            const trianglePositions = ["16.67%", "50%", "83.33%"];
            const triangleLeft = expandedIdx >= 0 ? trianglePositions[expandedIdx] ?? "50%" : "50%";

            return (
              <Fragment key={rowIdx}>
                {pair.map((entry) => {
                  const s = entry.id === "edu" ? eduStyle : (timelineStyle[entry.id] ?? timelineStyle["neptune-sdm2"]);
                  const isExpanded = expanded === entry.id;

                  return (
                    <motion.div
                      key={entry.id}
                      variants={slideLeft}
                      className={`relative rounded-2xl p-5 border cursor-pointer select-none transition-colors duration-300 ${s.cardClass}`}
                      style={isExpanded ? { boxShadow: `0 0 0 1px ${s.dotColor}50, 0 8px 24px ${s.dotColor}15` } : {}}
                      whileHover={{ scale: 1.012, y: -3, boxShadow: `0 12px 32px ${s.dotColor}20` }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      onClick={() => setExpanded(isExpanded ? null : entry.id)}
                    >
                      {entry.current && (
                        <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          Now
                        </span>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <div className={`relative w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dotClass}`}
                          style={entry.current ? { boxShadow: `0 0 0 3px ${s.dotColor}30` } : {}}>
                          {entry.current && (
                            <span className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ background: s.dotColor }} />
                          )}
                        </div>
                        <p className="text-[10px] text-white/25 font-mono tracking-wide">{entry.period}</p>
                      </div>

                      <h3 className="text-[15px] font-bold text-white leading-snug mb-0.5">{entry.role}</h3>
                      <p className={`text-sm font-medium mb-3 ${s.labelColor}`}>
                        {entry.company}
                        <span className="text-white/25"> · {entry.location}</span>
                      </p>

                      <ul className="space-y-1 mb-4">
                        {entry.highlights.slice(0, 2).map((h) => (
                          <li key={h} className="text-xs text-white/30 flex gap-2">
                            <span className={`${s.bulletColor} opacity-50 flex-shrink-0 mt-0.5 text-[10px]`}>▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] tracking-wide ${isExpanded ? s.labelColor : "text-white/15"} transition-colors`}>
                          {isExpanded ? "collapse" : "read more"}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <ChevronDown size={14} className={`${isExpanded ? s.labelColor : "text-white/20"} transition-colors`} />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}

                <AnimatePresence>
                  {expandedEntry && expansion && expandedStyle && (
                    <motion.div
                      key={`exp-${expandedEntry.id}`}
                      className="md:col-span-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      {/* Callout: triangle pointing up to the card that opened this */}
                      <div className="relative pt-3">
                        <div
                          className="hidden md:block absolute top-0 -translate-x-1/2"
                          style={{
                            left: triangleLeft,
                            width: 0,
                            height: 0,
                            borderLeft: "10px solid transparent",
                            borderRight: "10px solid transparent",
                            borderBottom: `10px solid ${expandedStyle.dotColor}55`,
                          }}
                        />
                        <div
                          className="rounded-2xl p-6 border"
                          style={{
                            background: `${expandedStyle.dotColor}08`,
                            borderColor: `${expandedStyle.dotColor}22`,
                            borderLeftWidth: "3px",
                            borderLeftColor: `${expandedStyle.dotColor}70`,
                          }}
                        >
                          <h4 className="text-base font-bold text-white mb-3">{expansion.heading}</h4>
                          <p className="text-sm text-white/50 leading-relaxed mb-5">{expansion.body}</p>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {expansion.highlights.map((h) => (
                              <li key={h} className="text-sm text-white/40 flex gap-2">
                                <span
                                  className="flex-shrink-0 mt-0.5 text-[10px]"
                                  style={{ color: expandedStyle.dotColor, opacity: 0.7 }}
                                >
                                  ▸
                                </span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </motion.div>
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
            Built for fun.{" "}
            <span style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Ships in prod.
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            Vibe coded on weekends. AI-native from day one — Claude at the core, not bolted on after the fact.
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
      <MidnightImpact />
      <MidnightBento />
      <MidnightFooter />
    </>
  );
}
