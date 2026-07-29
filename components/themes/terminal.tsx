"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ShareTheme from "@/components/ShareTheme";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS, SHIPPED_PROJECTS } from "@/lib/portfolio-data";
import { BLOG_POSTS } from "@/lib/blog-data";

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono), "JetBrains Mono", "Fira Code", "SF Mono", "Menlo", monospace',
};

const GREEN = "#00ff41";    // prompt, cursor, [ACTIVE] badge
const WHITE = "#d4d4d4";    // primary output text — roles, names
const SOFT = "#86efac";     // secondary output — values, company names
const GRAY = "#6b7280";     // metadata — dates, locations, permissions
const BORDER = "#1a3a2a";   // card borders (dark green-tinted)
const BORDER_DIM = "#1a1a1a"; // subtle borders

const lineIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: "easeOut" },
  }),
};

const sectionIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function TerminalNav() {
  return (
    <div style={{ ...MONO, background: "#000", borderBottom: `1px solid ${BORDER}`, position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ color: GREEN, fontSize: 12, textDecoration: "none" }}>
          <span style={{ color: GRAY }}>[</span>kbro ~<span style={{ color: GRAY }}>]</span>
          <span style={{ color: WHITE, marginLeft: 8 }}>$ portfolio --interactive</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ color: GRAY, display: "flex", textDecoration: "none" }}
            aria-label="LinkedIn">
            <LinkedInIcon size={15} />
          </a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            style={{ color: GRAY, display: "flex", textDecoration: "none" }}
            aria-label="GitHub">
            <GitHubIcon size={15} />
          </a>
          <a href={`mailto:${PERSONAL.email}`}
            style={{ color: GRAY, display: "flex", textDecoration: "none" }}
            aria-label="Email">
            <Mail size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function TerminalHero() {
  const lines = [
    { text: `kbro:~$ cat /etc/motd`, color: GREEN },
    { text: PERSONAL.name.toUpperCase(), color: "#fff", big: true },
    { text: `  ${PERSONAL.title} @ ${PERSONAL.company}`, color: GREEN },
    { text: `  Data Transfer Infra — moving 1EB one byte at a time`, color: SOFT },
    { text: "", color: "" },
    { text: `kbro:~$ uptime`, color: GREEN },
    { text: ` up ${HERO_STATS[0].value} yrs  |  team: ${HERO_STATS[1].value} engineers  |  arr delta: ${HERO_STATS[2].value}  |  infra: ${HERO_STATS[3].value} servers`, color: SOFT },
    { text: "", color: "" },
    { text: `kbro:~$ `, color: GREEN, cursor: true },
  ];

  return (
    <section style={{ ...MONO, paddingTop: 80, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={lineIn}
            initial="hidden"
            animate="visible"
            style={{
              marginBottom: line.big ? 4 : 2,
              lineHeight: 1.5,
            }}
          >
            {line.big ? (
              <span style={{ fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 900, color: GREEN, letterSpacing: "-1px", display: "block" }}>
                {line.text}
              </span>
            ) : (
              <span style={{ fontSize: 15, color: line.color || "transparent" }}>
                {line.text}
                {line.cursor && (
                  <span style={{ display: "inline-block", width: 12, height: 22, background: GREEN, marginLeft: 2, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
                )}
              </span>
            )}
          </motion.div>
        ))}

        {/* Theme toggle */}
        <motion.div
          custom={lines.length}
          variants={lineIn}
          initial="hidden"
          animate="visible"
          style={{ marginTop: 28 }}
        >
          <div style={{ color: GREEN, fontSize: 14, marginBottom: 10 }}>
            kbro:~$ <span style={{ color: "#fff" }}>set-theme</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <ThemeToggle />
            <ShareTheme variant="terminal" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ── Leadership ────────────────────────────────────────────────────────────────

const LEADERSHIP = [
  {
    key: "founders",
    label: "engineers-as-founders",
    value: "Give each engineer their own problem space — customer context, success metric, the keys. Enable them to run squads of AI agents that multiply their output. Mini-startups inside a large org ship things large orgs can't.",
  },
  {
    key: "prototype",
    label: "prototype-land-iterate",
    value: "Ship a working v1 in days, not quarters. The prototype teaches you more than the spec. When agent-assisted dev makes prototypes nearly free, put something real in front of users first and iterate from there.",
  },
  {
    key: "compound",
    label: "teams-that-compound",
    value: "Scaled orgs from 1 to 30+ across multiple geographies — not by headcount, but by structuring work so each engineer multiplies the team's output. Metric: org velocity, not individual throughput.",
  },
  {
    key: "foundations",
    label: "foundations-not-features",
    value: "Neptune's Control Plane became the shared foundation for DocumentDB, Timestream, and MemoryDB. Good infrastructure has a multiplier effect — build the layer that lets other teams build faster.",
  },
  {
    key: "data",
    label: "data-before-opinion",
    value: "On-call redesign moved satisfaction from 50% to 90% — measured first, changed second. Region expansion became metadata-driven, zero code changes per region — designed for that scale before we needed it.",
  },
];

function TerminalLeadership() {
  return (
    <motion.section
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ ...MONO, paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}
    >
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 20 }}>kbro:~$ cat leadership.md</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {LEADERSHIP.map((item, i) => (
          <motion.div
            key={item.key}
            custom={i}
            variants={lineIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ border: `1px solid ${BORDER}`, padding: "10px 14px" }}
          >
            <p style={{ color: SOFT, fontSize: 13, marginBottom: 4 }}>
              <span style={{ color: GRAY }}>## </span>{item.label}
            </p>
            <p style={{ color: WHITE, fontSize: 13, lineHeight: 1.6 }}>
              <span style={{ color: GREEN }}>▸ </span>{item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function TerminalCareer() {
  return (
    <motion.section
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ ...MONO, paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}
    >
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 20 }}>kbro:~$ cat career.log</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TIMELINE.map((item, i) => {
          const borderColor = item.id === "meta" ? GREEN : item.id === "yahoo" ? "#a855f7" : BORDER;
          return (
            <motion.div
              key={item.id}
              custom={i}
              variants={lineIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ border: `1px solid ${borderColor}`, borderRadius: 0 }}
            >
              {/* Top border */}
              <div style={{ padding: "8px 16px", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: 12 }}>
                {item.current && (
                  <span style={{ color: GREEN, fontSize: 12, fontWeight: 700, animation: "blink 1.5s ease infinite" }}>[ACTIVE]</span>
                )}
                <span style={{ color: item.current ? GREEN : GRAY, fontSize: 13 }}>{item.period}</span>
              </div>
              {/* Content */}
              <div style={{ padding: "10px 16px" }}>
                <p style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{item.role}</p>
                <p style={{ color: borderColor, fontSize: 14, marginBottom: 8 }}>{item.company} · {item.location}</p>
                {item.highlights.map((h, j) => (
                  <p key={j} style={{ color: WHITE, fontSize: 13, marginBottom: 3 }}>
                    <span style={{ color: SOFT }}>▸ </span>{h}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
        {/* Education */}
        <motion.div variants={sectionIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1px solid ${BORDER_DIM}`, padding: "10px 16px" }}>
          <p style={{ color: GRAY, fontSize: 13, marginBottom: 2 }}>{EDUCATION.period}</p>
          <p style={{ color: WHITE, fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{EDUCATION.degree}</p>
          <p style={{ color: GRAY, fontSize: 13 }}>{EDUCATION.school} · {EDUCATION.detail}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function TerminalProjects() {
  return (
    <motion.section
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ ...MONO, paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}
    >
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 8 }}>kbro:~$ ls ~/side-projects/</p>
      <p style={{ color: GRAY, fontSize: 12, marginBottom: 16 }}># personal projects — vibe coded on free time, mostly to scratch my own itch</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PROJECTS.map((p, i) => (
          <motion.div key={p.id} custom={i} variants={lineIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: "flex", alignItems: "baseline", gap: 16, fontSize: 14 }}>
            <span style={{ color: GRAY, flexShrink: 0 }}>drwxr-xr-x</span>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                style={{ color: GREEN, fontWeight: 700, textDecoration: "none", minWidth: 120 }}>
                {p.title}/
              </a>
            ) : (
              <span style={{ color: GREEN, fontWeight: 700, minWidth: 120 }}>{p.title}/</span>
            )}
            <span style={{ color: GRAY, fontSize: 13 }}>{p.description}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Shipped Projects ──────────────────────────────────────────────────────────

function TerminalShipped() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <motion.section
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ ...MONO, paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}
    >
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 4 }}>kbro:~$ git log --oneline --shipped</p>
      <p style={{ color: GRAY, fontSize: 12, marginBottom: 16 }}># 14 years shipping at Amazon and Meta — click any commit to expand</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {SHIPPED_PROJECTS.map((p, i) => {
          const isOpen = expandedId === p.id;
          return (
            <motion.div key={p.id} custom={i} variants={lineIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div
                onClick={() => toggle(p.id)}
                style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 13, padding: "5px 0", cursor: "pointer", borderBottom: `1px solid ${BORDER_DIM}` }}
              >
                <span style={{ color: GRAY, flexShrink: 0, fontSize: 11 }}>{isOpen ? "▼" : "▶"}</span>
                <span style={{ color: GRAY, flexShrink: 0, fontSize: 11, minWidth: 56 }}>[{p.era.split(" ")[0]}]</span>
                <span style={{ color: GREEN, fontWeight: 700, minWidth: 140, flexShrink: 0 }}>{p.title}</span>
                <span style={{ color: WHITE, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.tagline}</span>
                <span style={{ color: SOFT, flexShrink: 0, fontSize: 11, marginLeft: 8 }}>{p.impact}</span>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key={`detail-${p.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "10px 16px 12px 32px", background: "#0a1a0e", borderBottom: `1px solid ${BORDER}`, borderLeft: `2px solid ${GREEN}`, margin: "0 0 4px 0" }}>
                      <p style={{ color: GRAY, fontSize: 11, marginBottom: 6 }}>{p.era} · {p.roleLabel}</p>
                      <p style={{ color: WHITE, fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>{p.body}</p>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: p.refs.length > 0 ? 8 : 0 }}>
                        {p.tags.map((tag) => (
                          <span key={tag} style={{ color: GRAY, fontSize: 10, border: `1px solid ${BORDER}`, padding: "1px 6px", borderRadius: 3 }}>{tag}</span>
                        ))}
                      </div>
                      {p.refs.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column" as const, gap: 3 }}>
                          {p.refs.map((ref) => (
                            <a key={ref.url} href={ref.url} target="_blank" rel="noopener noreferrer"
                              style={{ color: SOFT, fontSize: 12, textDecoration: "none" }}
                              onClick={(e) => e.stopPropagation()}>
                              → {ref.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ── Blog ──────────────────────────────────────────────────────────────────────

function TerminalBlog() {
  return (
    <motion.section
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ ...MONO, paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}
    >
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 4 }}>kbro:~$ ls -la ~/writing/</p>
      <p style={{ color: GRAY, fontSize: 12, marginBottom: 16 }}># things i wrote when the mood hit</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {BLOG_POSTS.map((post, i) => (
          <motion.div key={post.slug} custom={i} variants={lineIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <a href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 13 }}>
                <span style={{ color: GRAY, flexShrink: 0, fontSize: 11 }}>-rw-r--r--</span>
                <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>{post.title}</span>
                <span style={{ color: GRAY, fontSize: 11, flexShrink: 0 }}>{post.readTime}</span>
              </div>
              <p style={{ color: WHITE, fontSize: 12, marginTop: 2, paddingLeft: 24, opacity: 0.7 }}>{post.subtitle}</p>
            </a>
          </motion.div>
        ))}
      </div>
      <p style={{ color: GRAY, fontSize: 12, marginTop: 12 }}>
        → <a href="/blog" style={{ color: SOFT, textDecoration: "none" }}>cat ~/writing/index</a>
      </p>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function TerminalFooter() {
  return (
    <footer style={{ ...MONO, borderTop: `1px solid ${BORDER}`, paddingTop: 32, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 6 }}>kbro:~$ echo $CONTACT</p>
      <p style={{ color: SOFT, fontSize: 14, marginBottom: 16 }}>
        {PERSONAL.email} | linkedin.com/in/k4rthikr | github.com/kbrovibes
      </p>
      <p style={{ color: GREEN, fontSize: 15 }}>
        kbro:~$&nbsp;
        <span style={{ display: "inline-block", width: 12, height: 20, background: GREEN, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
      </p>
    </footer>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function TerminalTheme() {
  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: GREEN, ...MONO }}>
      <TerminalNav />
      <div style={{ paddingTop: 48 }}>
        <TerminalHero />
        <TerminalLeadership />
        <TerminalCareer />
        <TerminalShipped />
        <TerminalBlog />
        <TerminalProjects />
        <TerminalFooter />
      </div>
    </div>
  );
}
