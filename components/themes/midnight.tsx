"use client";

import { useState, Fragment } from "react";
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Zap, ChartLine, DollarSign, Shuffle, ChevronDown, Download, RefreshCw, Users, Layers, TrendingUp, Rocket, BookOpen } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { PERSONAL, TIMELINE, EDUCATION, PROJECTS, SHIPPED_PROJECTS } from "@/lib/portfolio-data";
import { BLOG_POSTS } from "@/lib/blog-data";

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
    heading: "What my team does at Meta",
    body: "My org at Meta owns Blob Storage infrastructure — the systems moving exabytes of data in and out of Meta's global infrastructure. My engineers work on ingestion pipelines from production services, large-scale data exports that feed ML training and analytics workloads, and the reliability layer underneath it all. At the scale Meta operates, even tiny error rates translate to millions of failures — so the team builds for both correctness and throughput simultaneously. There's more I can't describe publicly — reach out if you're curious.",
    highlights: [
      "Exabyte-scale data movement: ingestion, egress, and cross-region replication at Meta scale",
      "Reliability and throughput for storage infrastructure serving billions of users",
      "Distributed engineering org spanning multiple sites",
      "Additional confidential infra projects — ask me",
    ],
  },
  "neptune-sdm2": {
    heading: "SDM II at Neptune · 2022–2025",
    body: "In my second tour leading Neptune, I owned four teams covering 60% of Neptune engineering — Storage, Control Plane, AWS Integrations, and Global Expansion. My org shipped two flagship launches: Neptune Analytics (a new graph analytics engine unveiled at re:Invent 2023) and GraphRAG (built in partnership with the Amazon Bedrock org and shipped at re:Invent 2024). I also rebuilt the on-call model from scratch — moving from a flat rotation to a tiered, follow-the-sun system. Engineer on-call satisfaction went from 50% to over 90%.",
    highlights: [
      "Neptune Analytics — new graph analytics engine, shipped at re:Invent 2023",
      "GraphRAG — built with Bedrock, shipped live at re:Invent 2024",
      "25+ engineers across 4 global teams — 60% of Neptune org",
      "Tiered on-call + follow-the-sun: satisfaction 50% → 90%",
    ],
  },
  "neptune-sdm1": {
    heading: "SDM I at Neptune · 2020–2022",
    body: "I built the Neptune Storage team from one engineer to fifteen across Seattle, Vancouver, and the Bay Area. My team expanded Neptune's regional footprint from six to 22 AWS regions, including FedRAMP GovCloud and private cloud. The two outcomes I'm most proud of: my engineers delivered a tiered NVMe caching layer that drove 30% query speedup and contributed ~$4M in incremental ARR, and a bulk export feature that cut full-graph S3 exports from days to under three hours.",
    highlights: [
      "Team scaled 1 → 15 SDEs across three cities in two years",
      "Neptune expanded to 22 AWS regions including GovCloud and private cloud",
      "NVMe tiered cache: 30% query speedup, +$4M ARR",
      "S3 bulk export: days → under 3 hours for full graph exports",
    ],
  },
  "neptune-sde": {
    heading: "SDE → Tech Lead · 2011–2019",
    body: "Eight years as IC and tech lead — the foundation for everything that came after. As tech lead I owned Neptune's Control Plane architecture, drove a TLS overhaul that was subsequently adopted by four other AWS services, and led the team that built Neptune's core enterprise feature set from scratch: multi-tenancy, encryption at rest, authentication primitives, and the release certification infrastructure. Those systems have remained in production across every Neptune version since.",
    highlights: [
      "Control Plane: distributed orchestration for 30K+ global Neptune instances",
      "TLS redesign adopted by 4 other AWS services post-launch",
      "Enterprise feature set: auth, encryption, multi-tenancy — built from scratch",
      "Release certification infra still in use for every Neptune version today",
    ],
  },
  yahoo: {
    heading: "Yahoo! Bangalore · Summer 2011",
    body: "Before Amazon, I interned at Yahoo!'s Bangalore engineering center working on ad quality pipelines — malware detection signals to catch bad ads before they served to users. Three months, tight feedback loops, first real exposure to production systems at scale. Graduated from NIT Calicut a few weeks later, joined Amazon, and the rest is what's on this page.",
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
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors duration-200"
        >
          KR<span className="text-violet-400">.</span>
        </motion.a>
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
      {/* Portrait — right-anchored ghost, all breakpoints, smaller on mobile */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-[18%] h-[45%] w-[38%] lg:top-[17%] lg:h-[65%] lg:w-[52%]"
          style={{
            maskImage: "radial-gradient(ellipse 78% 82% at 62% 34%, black 22%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.2) 72%, transparent 88%)",
            WebkitMaskImage: "radial-gradient(ellipse 78% 82% at 62% 34%, black 22%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.2) 72%, transparent 88%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photo/profile-headshot.png"
            alt=""
            className="absolute right-0 top-0 h-full w-full object-cover object-center"
            style={{ opacity: 0.7, filter: "contrast(1.25) brightness(1.15) saturate(1.1)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.06) 50%, rgba(236,72,153,0.05) 100%)", mixBlendMode: "color" }}
          />
          {/* edge softeners — top and bottom */}
          <div className="absolute inset-x-0 top-0 h-[22%]" style={{ background: "linear-gradient(to bottom, #0a0a12 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: "linear-gradient(to top, #0a0a12 0%, transparent 100%)" }} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl pr-[36%] lg:pr-0">

          {/* Name */}
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl lg:text-[92px] font-black leading-[0.92] tracking-[-3px] mb-5">
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
            <p className="text-lg sm:text-2xl font-semibold text-white/65">
              Engineering Manager, Blob Storage{" "}
              <span className="text-blue-400">@ Meta</span>
            </p>
          </motion.div>

          {/* 2-liner description */}
          <motion.p variants={fadeUp} className="text-base sm:text-xl text-white/50 font-light leading-relaxed mb-2 max-w-2xl">
            Leading the engineering teams behind Meta&apos;s{" "}
            <span className="text-white/80 font-medium">Data Transfer Infrastructure</span>
            {" "}— moving <span className="text-white/80 font-medium">exabytes</span> reliably, one byte at a time.
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm text-white/35 font-light leading-relaxed mb-3 max-w-2xl">
            <span className="text-white/55 font-medium">15+ years</span>
            <span className="text-white/20"> · </span>
            <span className="text-white/55 font-medium">ex-AWS Engineering Leader</span>
            <span className="text-white/20"> · </span>
            <span className="text-white/30 italic">I stay close to the metal — the best managers can still read the diff</span>
          </motion.p>

          {/* Location */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs text-white/25 mb-8">
            <MapPin size={13} />
            <span>Seattle, WA</span>
          </motion.div>

          {/* Theme toggle */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="text-[11px] text-white/25 uppercase tracking-widest">View as</span>
            <ThemeToggle />
          </motion.div>

          {/* CTAs — minimal two-row */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-16">
            {/* Action buttons — consistent ghost pills */}
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${PERSONAL.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-white/[0.06] border border-white/[0.12] text-white/70 hover:bg-white/[0.1] hover:text-white hover:border-white/25 transition-all duration-200">
                <Mail size={13} />
                Get in touch
              </a>
              <a href="/karthik-rajan-resume.pdf" download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-white/[0.03] border border-white/[0.08] text-white/45 hover:bg-white/[0.07] hover:text-white/70 hover:border-white/15 transition-all duration-200">
                <Download size={13} />
                Resume
              </a>
            </div>

            {/* Section nav — plain text links, no button chrome */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {[
                { href: "#professional", label: "Career" },
                { href: "#leadership", label: "How I Lead" },
                { href: "#shipped", label: "Shipped" },
                { href: "#projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
              ].map(({ href, label }) => (
                <a key={href} href={href}
                  className="text-xs text-white/30 hover:text-white/70 transition-colors duration-200 tracking-wide">
                  {label}
                </a>
              ))}
            </div>
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

// ── Strengths ─────────────────────────────────────────────────────────────────

const STRENGTHS = [
  {
    icon: Users,
    color: "#60a5fa",
    title: "Teams that compound",
    body: "I've scaled engineering orgs from 1 to 30+ across multiple geographies. Not by adding headcount — by structuring work so each engineer multiplies the team's output. The metric I optimize for is org velocity, not individual throughput.",
  },
  {
    icon: Layers,
    color: "#8B5CF6",
    title: "Foundations, not features",
    body: "I push teams toward systems that become platforms. Neptune's Control Plane became the shared foundation for DocumentDB, Timestream, and MemoryDB. Good infrastructure has a multiplier effect — I build the infrastructure that lets other teams build faster.",
  },
  {
    icon: TrendingUp,
    color: "#10b981",
    title: "Data before opinion",
    body: "Every major call has a model behind it. On-call redesign moved satisfaction from 50% to 90% — I measured it first. Region expansion became metadata-driven, zero code changes per region — I designed for that scale before we needed it.",
  },
  {
    icon: Rocket,
    color: "#f97316",
    title: "Engineers as founders",
    body: "I give each engineer their own problem space — the customer context, the success metric, and the keys. In the agent era that means enabling every person to run a squad of AI agents that multiplies their output. Mini-startups inside a large org ship things large orgs can't.",
  },
  {
    icon: RefreshCw,
    color: "#06b6d4",
    title: "Prototype. Land. Iterate.",
    body: "Ship a working v1 in days, not quarters. The prototype teaches you more than the spec. I build teams comfortable with rough edges — because when agent-assisted development makes prototypes nearly free, the winning move is to put something real in front of users first.",
  },
];

function MidnightStrengths() {
  return (
    <section id="leadership" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            What I bring
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            How I lead
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {STRENGTHS.map(({ icon: Icon, color, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl p-6 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
              style={{ borderTopColor: `${color}40`, borderTopWidth: 2 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${color}15` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="text-base font-bold text-white mb-3">{title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{body}</p>
            </motion.div>
          ))}
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
            15 years leading{" "}
            <span style={{ background: "linear-gradient(135deg, #0082fb, #8B5CF6 50%, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              at hyperscale
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            From Yahoo! Bangalore to Amazon to Meta — always deep in distributed systems, always building teams that build infrastructure that cannot fail.
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
                  const entryExp = entry.id === "edu" ? EDU_EXPANSION : EXPANSIONS[entry.id] ?? null;

                  return (
                    <Fragment key={entry.id}>
                    <motion.div
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

                      {"narrative" in entry && entry.narrative ? (
                        <p className="text-xs text-white/35 leading-relaxed mb-4 line-clamp-3">{entry.narrative as string}</p>
                      ) : (
                        <ul className="space-y-1 mb-4">
                          {entry.highlights.slice(0, 2).map((h) => (
                            <li key={h} className="text-xs text-white/30 flex gap-2">
                              <span className={`${s.bulletColor} opacity-50 flex-shrink-0 mt-0.5 text-[10px]`}>▸</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-between mt-1">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all duration-200 ${
                          isExpanded
                            ? `${s.labelColor} border-current/20 bg-white/[0.04]`
                            : "text-white/50 border-white/[0.12] hover:text-white/75 hover:border-white/25"
                        }`}>
                          {isExpanded ? "Collapse" : "Read more"}
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            style={{ display: "inline-flex" }}
                          >
                            <ChevronDown size={11} />
                          </motion.span>
                        </span>
                      </div>
                    </motion.div>

                    {/* Mobile: expand inline right below this card */}
                    <AnimatePresence>
                      {isExpanded && entryExp && (
                        <motion.div
                          key={`mob-${entry.id}`}
                          className="md:hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.32, ease: "easeOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="pt-3">
                            <div className="rounded-2xl p-5 border" style={{
                              background: `${s.dotColor}08`,
                              borderColor: `${s.dotColor}22`,
                              borderLeftWidth: "3px",
                              borderLeftColor: `${s.dotColor}70`,
                            }}>
                              <h4 className="text-sm font-bold text-white mb-2">{entryExp.heading}</h4>
                              <p className="text-xs text-white/50 leading-relaxed mb-4">{entryExp.body}</p>
                              <ul className="space-y-1.5">
                                {entryExp.highlights.map((h) => (
                                  <li key={h} className="text-xs text-white/40 flex gap-2">
                                    <span className="flex-shrink-0 mt-0.5 text-[10px]" style={{ color: s.dotColor, opacity: 0.7 }}>▸</span>
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

                <AnimatePresence>
                  {expandedEntry && expansion && expandedStyle && (
                    <motion.div
                      key={`exp-${expandedEntry.id}`}
                      className="hidden md:block md:col-span-3"
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

// ── Shipped ───────────────────────────────────────────────────────────────────

const shippedColorConfig: Record<string, { cardClass: string; accentClass: string; badgeClass: string; tagClass: string; ringClass: string; barClass: string }> = {
  amber:   { cardClass: "bg-amber-500/[0.04] border-amber-500/20 hover:border-amber-500/35",       accentClass: "text-amber-400",   badgeClass: "bg-amber-500/10 text-amber-400/80 border-amber-500/20",       tagClass: "bg-amber-500/[0.07] text-amber-400/60 border-amber-500/15",   ringClass: "ring-amber-500/30",   barClass: "bg-gradient-to-r from-amber-500/60 to-amber-400/20" },
  blue:    { cardClass: "bg-blue-500/[0.04] border-blue-500/20 hover:border-blue-500/35",           accentClass: "text-blue-400",    badgeClass: "bg-blue-500/10 text-blue-400/80 border-blue-500/20",           tagClass: "bg-blue-500/[0.07] text-blue-400/60 border-blue-500/15",       ringClass: "ring-blue-500/30",    barClass: "bg-gradient-to-r from-blue-500/60 to-blue-400/20" },
  violet:  { cardClass: "bg-violet-500/[0.04] border-violet-500/20 hover:border-violet-500/35",     accentClass: "text-violet-400",  badgeClass: "bg-violet-500/10 text-violet-400/80 border-violet-500/20",     tagClass: "bg-violet-500/[0.07] text-violet-400/60 border-violet-500/15", ringClass: "ring-violet-500/30",  barClass: "bg-gradient-to-r from-violet-500/60 to-violet-400/20" },
  emerald: { cardClass: "bg-emerald-500/[0.04] border-emerald-500/20 hover:border-emerald-500/35",   accentClass: "text-emerald-400", badgeClass: "bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20",   tagClass: "bg-emerald-500/[0.07] text-emerald-400/60 border-emerald-500/15", ringClass: "ring-emerald-500/30", barClass: "bg-gradient-to-r from-emerald-500/60 to-emerald-400/20" },
  pink:    { cardClass: "bg-pink-500/[0.04] border-pink-500/20 hover:border-pink-500/35",           accentClass: "text-pink-400",    badgeClass: "bg-pink-500/10 text-pink-400/80 border-pink-500/20",           tagClass: "bg-pink-500/[0.07] text-pink-400/60 border-pink-500/15",       ringClass: "ring-pink-500/30",    barClass: "bg-gradient-to-r from-pink-500/60 to-pink-400/20" },
  indigo:  { cardClass: "bg-indigo-500/[0.04] border-indigo-500/20 hover:border-indigo-500/35",     accentClass: "text-indigo-400",  badgeClass: "bg-indigo-500/10 text-indigo-400/80 border-indigo-500/20",     tagClass: "bg-indigo-500/[0.07] text-indigo-400/60 border-indigo-500/15", ringClass: "ring-indigo-500/30",  barClass: "bg-gradient-to-r from-indigo-500/60 to-indigo-400/20" },
  sky:     { cardClass: "bg-sky-500/[0.04] border-sky-500/20 hover:border-sky-500/35",             accentClass: "text-sky-400",     badgeClass: "bg-sky-500/10 text-sky-400/80 border-sky-500/20",             tagClass: "bg-sky-500/[0.07] text-sky-400/60 border-sky-500/15",         ringClass: "ring-sky-500/30",     barClass: "bg-gradient-to-r from-sky-500/60 to-sky-400/20" },
  rose:    { cardClass: "bg-rose-500/[0.04] border-rose-500/20 hover:border-rose-500/35",           accentClass: "text-rose-400",    badgeClass: "bg-rose-500/10 text-rose-400/80 border-rose-500/20",           tagClass: "bg-rose-500/[0.07] text-rose-400/60 border-rose-500/15",       ringClass: "ring-rose-500/30",    barClass: "bg-gradient-to-r from-rose-500/60 to-rose-400/20" },
  teal:    { cardClass: "bg-teal-500/[0.04] border-teal-500/20 hover:border-teal-500/35",           accentClass: "text-teal-400",    badgeClass: "bg-teal-500/10 text-teal-400/80 border-teal-500/20",           tagClass: "bg-teal-500/[0.07] text-teal-400/60 border-teal-500/15",       ringClass: "ring-teal-500/30",    barClass: "bg-gradient-to-r from-teal-500/60 to-teal-400/20" },
};

const SHIPPED_INITIAL = 6;

function MidnightShipped() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? SHIPPED_PROJECTS : SHIPPED_PROJECTS.slice(0, SHIPPED_INITIAL);
  const selected = SHIPPED_PROJECTS.find((p) => p.id === selectedId) ?? null;

  const handleSelect = (id: string) => setSelectedId((prev) => (prev === id ? null : id));

  return (
    <section id="shipped" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Shipped
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Projects I&apos;ve shipped
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            Fourteen years shipping at Amazon and Meta. These are the ones that moved the needle.
          </p>
          <p className="mt-2 text-white/18 text-xs tracking-wide">Click any card to read more</p>
        </motion.div>

        {/* Card grid — fixed height, no in-place expansion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project, idx) => {
            const style = shippedColorConfig[project.color] ?? shippedColorConfig.amber;
            const isSelected = selectedId === project.id;
            return (
              <Fragment key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: Math.min(idx % 3, 2) * 0.08 }}
                  className={`rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? `${style.cardClass} ring-1 ${style.ringClass}`
                      : `${style.cardClass}`
                  }`}
                  onClick={() => handleSelect(project.id)}
                >
                  <div className="p-5 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${style.badgeClass}`}>
                        {project.era}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className={`shrink-0 mt-0.5 transition-opacity duration-200 ${isSelected ? `${style.accentClass} opacity-100` : "text-white/20 opacity-60"}`}
                      />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{project.title}</h3>
                    <p className={`text-xs font-medium ${style.accentClass} mb-3`}>{project.roleLabel}</p>
                    <p className="text-sm text-white/45 leading-relaxed flex-1">{project.tagline}</p>
                    <p className={`mt-4 text-xs font-semibold ${style.accentClass} opacity-75`}>{project.impact}</p>
                  </div>
                </motion.div>

                {/* Mobile-only: inline panel right after the tapped card */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key={`mobile-panel-${project.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className={`col-span-full sm:hidden rounded-2xl border overflow-hidden ${style.cardClass}`}
                    >
                      <div className={`h-0.5 w-full ${style.barClass}`} />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${style.badgeClass} inline-block mb-2`}>{project.era}</span>
                            <h3 className="text-lg font-black text-white">{project.title}</h3>
                            <p className={`text-sm font-medium ${style.accentClass} mt-0.5`}>{project.roleLabel}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                            className="shrink-0 p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-white/70 transition-all"
                            aria-label="Close"
                          >
                            <ChevronDown size={14} />
                          </button>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-4 ${style.badgeClass}`}>
                          <Zap size={11} />
                          <span className="text-xs font-semibold">{project.impact}</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed mb-4">{project.body}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.map((tag) => (
                            <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${style.tagClass}`}>{tag}</span>
                          ))}
                        </div>
                        {project.refs.length > 0 && (
                          <div className="flex flex-col gap-1.5">
                            {project.refs.map((ref) => (
                              <a key={ref.url} href={ref.url} target="_blank" rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 text-xs ${style.accentClass} opacity-70 hover:opacity-100 transition-opacity`}>
                                <ArrowUpRight size={11} />{ref.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}
        </div>

        {/* Show more */}
        {!showAll && SHIPPED_PROJECTS.length > SHIPPED_INITIAL && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.04] border border-white/[0.08] text-white/50 hover:bg-white/[0.08] hover:text-white/80 hover:border-white/[0.15] transition-all duration-200"
            >
              <Rocket size={13} />
              See {SHIPPED_PROJECTS.length - SHIPPED_INITIAL} more projects
            </button>
          </motion.div>
        )}

        {/* Desktop inspector panel — hidden on mobile (mobile uses inline panels above) */}
        <div className="hidden sm:block">
        <AnimatePresence mode="wait">
          {selected && (() => {
            const style = shippedColorConfig[selected.color] ?? shippedColorConfig.amber;
            return (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={`mt-6 rounded-2xl border overflow-hidden ${style.cardClass}`}
              >
                {/* Colored top bar */}
                <div className={`h-0.5 w-full ${style.barClass}`} />

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${style.badgeClass}`}>
                          {selected.era}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">{selected.title}</h3>
                      <p className={`text-sm font-medium ${style.accentClass} mt-1`}>{selected.roleLabel}</p>
                    </div>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="shrink-0 p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-all"
                      aria-label="Close detail"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  {/* Impact metric */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-5 ${style.badgeClass}`}>
                    <Zap size={11} />
                    <span className="text-xs font-semibold">{selected.impact}</span>
                  </div>

                  {/* Body */}
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">{selected.body}</p>

                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {selected.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${style.tagClass}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Refs */}
                    {selected.refs.length > 0 && (
                      <div className="flex flex-col gap-1.5 sm:ml-auto shrink-0">
                        {selected.refs.map((ref) => (
                          <a
                            key={ref.url}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 text-xs ${style.accentClass} hover:opacity-100 opacity-60 transition-opacity`}
                          >
                            <ArrowUpRight size={11} />
                            {ref.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ── Blog ─────────────────────────────────────────────────────────────────────

function MidnightBlog() {
  return (
    <section id="blog" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Blog
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Things I&apos;ve written
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
            >
              <a href={`/blog/${post.slug}`} className="block group">
                <article
                  className="relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300 group-hover:border-violet-500/30"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${post.coverAccent}`} />
                  <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-white mb-1 group-hover:text-violet-200 transition-colors">{post.title}</h3>
                      <p className="text-sm text-amber-400/70 italic mb-2">{post.subtitle}</p>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{post.description}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                      <span className="text-xs text-white/25">{new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                      <span className="text-xs text-white/25">{post.readTime}</span>
                      <span className="text-sm text-violet-400/60 group-hover:text-violet-400 transition-colors font-medium mt-1">Read →</span>
                    </div>
                  </div>
                </article>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <a href="/blog" className="text-xs text-white/25 hover:text-white/50 transition-colors tracking-widest uppercase">
            View all posts →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── BentoBox ──────────────────────────────────────────────────────────────────

function MidnightBento() {
  return (
    <section id="projects" className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-3 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Side Projects
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Personal Projects
          </h2>
          <p className="mt-3 text-white/30 text-sm max-w-xl leading-relaxed">
            Vibe coded on free time — mostly to make my own life easier. Claude at the core, shipped to prod because why not.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {/* stonkbro */}
          <motion.div variants={tileAnim} className="group relative rounded-2xl p-4 border overflow-hidden bg-gradient-to-br from-emerald-500/[0.04] to-transparent border-emerald-500/[0.12] hover:border-emerald-500/25 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10"><ChartLine size={16} className="text-emerald-400" /></div>
              <a href="https://stonkbro.vercel.app" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all group-hover:scale-105">
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">stonkbro</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-3">
              AI-powered options trading copilot. Live market data, PMCC scanner, real signals — built with Claude + Yahoo Finance. Not financial advice, definitely financial vibes.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Claude AI", "Supabase", "Vercel"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* snobaddy */}
          <motion.div variants={tileAnim} className="group relative rounded-2xl p-4 border overflow-hidden bg-white/[0.02] border-white/[0.07] hover:border-pink-500/30 hover:bg-pink-500/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-xl bg-pink-500/10"><Shuffle size={16} className="text-pink-400" /></div>
              <a href="https://snobaddy.vercel.app" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-pink-400 hover:bg-pink-500/10 transition-all">
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">snobaddy</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-3">
              Real-time sports club scheduling and court management. AI-assisted rotation and matchmaking — an engineering marvel the club didn&apos;t know it needed.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js", "Supabase", "Tailwind", "Realtime"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-pink-500/10 text-pink-400/80 border border-pink-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* taxbro */}
          <motion.div variants={tileAnim} className="group relative rounded-2xl p-4 border overflow-hidden bg-white/[0.02] border-white/[0.07] hover:border-amber-500/30 hover:bg-amber-500/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-xl bg-amber-500/10"><DollarSign size={16} className="text-amber-400" /></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/60">Claude-powered</span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">taxbro</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-3">
              AI-powered tax research assistant. Ask complex questions, get reasoning-backed answers. Built with Claude for workflows where accuracy actually matters.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Claude AI", "Next.js", "TypeScript"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/10 text-amber-400/80 border border-amber-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* superhero-stories */}
          <motion.div variants={tileAnim} className="group relative rounded-2xl p-4 border overflow-hidden bg-white/[0.02] border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/[0.03] transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-xl bg-indigo-500/10"><BookOpen size={16} className="text-indigo-400" /></div>
              <a href="https://github.com/kbrovibes/superhero-stories" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] text-white/30 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                <ArrowUpRight size={14} />
              </a>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">superhero-stories</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-3">
              108 original superhero stories across 20 heroes — AI-generated, fully static. Marvel, DC, and Avengers universes. Built for my kids.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Claude AI", "Shell", "Static"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-indigo-500/10 text-indigo-400/80 border border-indigo-500/15">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* kbrovibes */}
          <motion.div variants={tileAnim} className="group relative rounded-2xl p-4 border overflow-hidden bg-white/[0.02] border-white/[0.07] hover:border-violet-500/20 transition-all duration-300">
            <div className="mb-3">
              <span className="text-base font-bold" style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>kb</span>
              <span className="text-base font-bold text-white">rovibes</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-md mb-3">
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
      <MidnightStrengths />
      <MidnightShipped />
      <MidnightBlog />
      <MidnightBento />
      <MidnightFooter />
    </>
  );
}
