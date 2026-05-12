"use client";

import { motion, type Variants } from "framer-motion";
import { Layers, Rocket, Users, Zap } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const TIMELINE = [
  {
    id: "meta",
    period: "Jun 2025 – Present",
    role: "Engineering Manager, Blob Storage",
    company: "Meta",
    location: "Seattle, WA",
    current: true,
    dotColor: "#60a5fa",
    dotClass: "bg-blue-400",
    labelColor: "text-blue-400",
    bulletColor: "text-blue-400",
    cardClass:
      "bg-blue-500/[0.07] border-blue-500/[0.18] hover:border-blue-500/40",
    highlights: [
      "Leading infrastructure engineering for Meta Blob Storage at petabyte scale",
      "Driving large-scale data transfer systems serving billions of users",
      "Working on confidential high-impact storage infrastructure projects",
    ],
  },
  {
    id: "neptune-sdm2",
    period: "Jul 2022 – Jun 2025",
    role: "SDM, Storage & Platform",
    company: "Amazon Neptune · AWS",
    location: "Seattle, WA",
    current: false,
    dotColor: "#f59e0b",
    dotClass: "bg-amber-400/80",
    labelColor: "text-amber-400",
    bulletColor: "text-amber-500",
    cardClass:
      "bg-white/[0.02] border-white/[0.07] hover:border-amber-500/25 hover:bg-amber-500/[0.03]",
    highlights: [
      "Managed 25+ engineers across 4 global teams — 60% of Neptune org",
      "Launched Neptune Analytics at AWS re:Invent 2023",
      "Shipped GraphRAG in partnership with Amazon Bedrock at re:Invent 2024",
      "Drove tiered oncall + follow-the-sun operational model",
    ],
  },
  {
    id: "neptune-sdm1",
    period: "Jan 2020 – Jul 2022",
    role: "SDM, Storage Layer",
    company: "Amazon Neptune · AWS",
    location: "Vancouver, BC",
    current: false,
    dotColor: "#f59e0b",
    dotClass: "bg-amber-400/80",
    labelColor: "text-amber-400",
    bulletColor: "text-amber-500",
    cardClass:
      "bg-white/[0.02] border-white/[0.07] hover:border-amber-500/25 hover:bg-amber-500/[0.03]",
    highlights: [
      "Scaled storage team 1 → 15 SDEs across Seattle, Vancouver, Bay Area",
      "Expanded Neptune to 22 AWS Regions including GovCloud & Private Cloud",
      "Shipped tiered NVMe cache — 30% query speedup, +$4M ARR",
      "Enabled full graph bulk-exports to S3: days → under 3 hours",
    ],
  },
  {
    id: "neptune-sde",
    period: "Oct 2011 – Dec 2019",
    role: "Sr. Software Engineer → Tech Lead",
    company: "Amazon · AWS",
    location: "Seattle, WA",
    current: false,
    dotColor: "#f59e0b",
    dotClass: "bg-amber-400/80",
    labelColor: "text-amber-400",
    bulletColor: "text-amber-500",
    cardClass:
      "bg-white/[0.02] border-white/[0.07] hover:border-amber-500/25 hover:bg-amber-500/[0.03]",
    highlights: [
      "Architected Neptune's Control Plane managing 30K+ global servers",
      "Led TLS redesign adopted across 4+ AWS services",
      "Designed core enterprise features: multi-tenancy, auth, encryption at rest",
      "Built benchmarking infrastructure enabling safe Neptune version certification",
    ],
  },
  {
    id: "yahoo",
    period: "Summer 2011 · 3 months",
    role: "Software Engineer Intern, Ad Quality",
    company: "Yahoo! Bangalore",
    location: "Bangalore, India",
    current: false,
    dotColor: "#a855f7",
    dotClass: "bg-purple-400/80",
    labelColor: "text-purple-400",
    bulletColor: "text-purple-400",
    cardClass:
      "bg-white/[0.02] border-white/[0.07] hover:border-purple-500/25 hover:bg-purple-500/[0.03]",
    highlights: [
      "Improved ad quality pipeline through malware detection and classification algorithms",
      "Worked on ad signal generation at Yahoo!'s Bangalore engineering center",
    ],
  },
];

const EDUCATION = {
  period: "Jun 2007 – May 2011",
  degree: "B.Tech, Computer Science & Engineering",
  school: "National Institute of Technology, Calicut",
  location: "India",
  detail: "CGPA 8.47/10 · Winner, Mobme Codejam 2011",
};

const TECH_GROUPS = [
  {
    label: "Cloud & Infra",
    icon: Layers,
    color: "violet",
    items: ["Amazon Neptune", "AWS Bedrock", "S3", "CloudWatch", "FedRAMP", "PCIDSS"],
  },
  {
    label: "Languages",
    icon: Zap,
    color: "pink",
    items: ["Java", "C++", "Python", "TypeScript", "JavaScript"],
  },
  {
    label: "Graph & Data",
    icon: Rocket,
    color: "blue",
    items: ["Gremlin", "SPARQL", "openCypher", "GraphRAG", "PostgreSQL", "Supabase"],
  },
  {
    label: "Frontend & AI",
    icon: Users,
    color: "violet",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Claude API", "Gemini"],
  },
];

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

export default function Professional() {
  return (
    <section id="professional" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
            <span
              style={{
                background: "linear-gradient(135deg, #0082fb, #8B5CF6 50%, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              at hyperscale
            </span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-xl leading-relaxed">
            From Yahoo! Bangalore to Amazon to Meta — always deep in distributed systems,
            always building infrastructure that cannot fail.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          {/* Vertical Timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative">
              {/* Gradient connecting line */}
              <div
                className="absolute top-6 bottom-20 pointer-events-none"
                style={{
                  left: "5px",
                  width: "2px",
                  background:
                    "linear-gradient(to bottom, #60a5fa, #8B5CF6 35%, #EC4899 75%, transparent)",
                  opacity: 0.55,
                }}
              />

              <div className="space-y-3">
                {TIMELINE.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={slideLeft}
                    className="relative pl-9"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-[22px] w-3 h-3 rounded-full border-2 border-[#0a0a12] ${item.dotClass}`}
                      style={
                        item.current
                          ? { boxShadow: `0 0 0 3px ${item.dotColor}30` }
                          : {}
                      }
                    >
                      {item.current && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-50"
                          style={{ background: item.dotColor }}
                        />
                      )}
                    </div>

                    {/* Card */}
                    <div
                      className={`rounded-2xl p-5 border transition-all duration-300 ${item.cardClass}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[10px] text-white/25 font-mono tracking-wide mb-1">
                            {item.period}
                          </p>
                          <h3 className="text-[15px] font-bold text-white leading-snug">
                            {item.role}
                          </h3>
                          <p className={`text-sm font-medium mt-0.5 ${item.labelColor}`}>
                            {item.company}
                            <span className="text-white/25"> · {item.location}</span>
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
                            <span className={`${item.bulletColor} opacity-60 mt-0.5 flex-shrink-0 text-[10px]`}>
                              ▸
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}

                {/* Education */}
                <motion.div variants={slideLeft} className="relative pl-9">
                  <div className="absolute left-0 top-[22px] w-3 h-3 rounded-full border-2 border-[#0a0a12] bg-white/20" />
                  <div className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300">
                    <p className="text-[10px] text-white/25 font-mono tracking-wide mb-1">
                      {EDUCATION.period}
                    </p>
                    <h3 className="text-[15px] font-bold text-white leading-snug">
                      {EDUCATION.degree}
                    </h3>
                    <p className="text-sm font-medium text-white/50 mt-0.5">
                      {EDUCATION.school} · {EDUCATION.location}
                    </p>
                    <p className="text-sm text-white/30 mt-2">{EDUCATION.detail}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-6"
            >
              Tech Stack
            </motion.p>
            {TECH_GROUPS.map(({ label, icon: Icon, color, items }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <Icon size={15} className={iconColorMap[color]} />
                  <span className="text-sm font-semibold text-white/70">{label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${colorMap[color]}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
