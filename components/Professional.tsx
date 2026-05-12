"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase, GraduationCap, Layers, Rocket, Users, Zap } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const TIMELINE = [
  {
    period: "Jul 2022 – Present",
    role: "SDM, Storage & Platform",
    company: "Amazon Neptune · AWS",
    location: "Seattle",
    current: true,
    highlights: [
      "Manages 25+ engineers across 4 global teams (60% of Neptune org)",
      "Launched Neptune Analytics at AWS re:Invent 2023",
      "Partnered with Bedrock to ship GraphRAG at re:Invent 2024",
      "Drove operational improvements: tiered oncall, follow-the-sun model",
    ],
  },
  {
    period: "Jan 2020 – Jul 2022",
    role: "SDM, Storage Layer",
    company: "Amazon Neptune · AWS",
    location: "Vancouver",
    current: false,
    highlights: [
      "Scaled team 1 → 15 SDEs across Seattle, Vancouver, Bay Area",
      "Expanded Neptune to 22 AWS Regions incl. GovCloud & Private Cloud",
      "Implemented tiered NVMe cache — 30% query speed boost, +$4M ARR",
      "Enabled full graph exports to S3 (days → under 3 hours)",
    ],
  },
  {
    period: "Oct 2011 – Dec 2019",
    role: "Sr. Software Engineer",
    company: "Amazon Neptune · AWS",
    location: "Seattle",
    current: false,
    highlights: [
      "Architected Neptune's Control Plane managing 30K+ global servers",
      "Led TLS redesign later adopted by 4 AWS services",
      "Designed core enterprise features: provisioning, auth, encryption",
      "Built flexible benchmarking infra for safe, rapid certification",
    ],
  },
];

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
            Professional
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            14 years at{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AWS scale
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {TIMELINE.map((item) => (
              <motion.div
                key={item.period}
                variants={slideLeft}
                className={`relative rounded-2xl p-6 border transition-all duration-300
                  ${item.current
                    ? "bg-violet-500/[0.06] border-violet-500/20 hover:border-violet-500/40"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04]"
                  }`}
              >
                {item.current && (
                  <span className="absolute top-5 right-5 flex items-center gap-1.5 text-[10px] font-bold
                    uppercase tracking-widest text-violet-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    Current
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-xl ${item.current ? "bg-violet-500/20" : "bg-white/[0.06]"}`}>
                    <Briefcase size={16} className={item.current ? "text-violet-400" : "text-white/40"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-white/30 font-mono mb-1">{item.period}</p>
                    <h3 className="text-lg font-bold text-white mb-0.5">{item.role}</h3>
                    <p className="text-sm text-white/50 mb-4">{item.company} · {item.location}</p>
                    <ul className="space-y-1.5">
                      {item.highlights.map((h) => (
                        <li key={h} className="text-sm text-white/40 flex gap-2">
                          <span className="text-violet-500/60 mt-0.5 flex-shrink-0">▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              variants={slideLeft}
              className="rounded-2xl p-6 border border-white/[0.06] bg-white/[0.02]
                hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-xl bg-white/[0.06]">
                  <GraduationCap size={16} className="text-white/40" />
                </div>
                <div>
                  <p className="text-[11px] text-white/30 font-mono mb-1">Jun 2007 – May 2011</p>
                  <h3 className="text-base font-bold text-white mb-0.5">
                    B.Tech, Computer Science & Engineering
                  </h3>
                  <p className="text-sm text-white/50 mb-2">
                    National Institute of Technology, Calicut · India
                  </p>
                  <p className="text-sm text-white/30">
                    CGPA 8.47/10 · Yahoo! Summer Intern · Winner, Mobme Codejam 2011
                  </p>
                </div>
              </div>
            </motion.div>
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
                className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02]
                  hover:border-white/[0.1] transition-all duration-300"
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
