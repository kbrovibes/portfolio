"use client";

import { motion, type Variants, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Mail, GraduationCap, FileText } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS, HUB_URL } from "@/lib/portfolio-data";

// ── Color constants ───────────────────────────────────────────────────────────

const C = {
  bg: "#141414",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderHover: "rgba(255,255,255,0.16)",
  orange: "#D97757",
  orangeDim: "#D9775740",
  green: "#4CAF50",
  greenDim: "#4CAF5040",
  red: "#ff6b6b",
  cyan: "#67e8f9",
  dim: "rgba(255,255,255,0.30)",
  medium: "rgba(255,255,255,0.60)",
  bright: "#ffffff",
  mono: '"SF Mono", "JetBrains Mono", "Fira Code", Menlo, monospace',
};

// ── Animation variants ────────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const sectionIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Reusable: GitHubIcon ──────────────────────────────────────────────────────

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// ── Reusable: ToolCallRow ─────────────────────────────────────────────────────

function ToolCallRow({ name, args, time }: { name: string; args: string; time: string }) {
  return (
    <div className="flex items-center gap-2 text-sm" style={{ fontFamily: C.mono }}>
      <span style={{ color: C.orange }}>⏺</span>
      <span style={{ color: C.medium }}>{name}</span>
      <span style={{ color: C.dim }}>({args})</span>
      <span className="flex-1 mx-2" style={{ borderBottom: "1px dashed rgba(255,255,255,0.1)" }} />
      <span style={{ color: C.green }}>✓</span>
      <span style={{ color: C.dim, fontSize: "11px" }}>{time}</span>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function ClaudeNav() {
  const { scrollY } = useScroll();
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setBlurred(v > 10));
  }, [scrollY]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: blurred ? "rgba(20,20,20,0.92)" : C.bg,
        backdropFilter: blurred ? "blur(12px)" : "none",
        borderBottom: `1px solid ${C.border}`,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: C.mono, fontSize: 13, color: C.medium }}>
          claude ~/karthik-portfolio{" "}
          <span style={{ color: C.orange }}>✦</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* LinkedIn */}
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.dim, display: "flex", alignItems: "center" }}
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.dim, display: "flex", alignItems: "center" }}
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <div style={{ transform: "scale(0.9)" }}>
            <ThemeSelector />
          </div>
          <a
            href={`mailto:${PERSONAL.email}`}
            style={{
              fontFamily: C.mono,
              fontSize: 11,
              color: C.bright,
              background: C.orange,
              borderRadius: 6,
              padding: "5px 12px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function ClaudeHero() {
  return (
    <section
      style={{
        paddingTop: 96,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <motion.div variants={container} initial="hidden" animate="visible">
        {/* Thinking line */}
        <motion.div variants={fadeIn} style={{ marginBottom: 16 }}>
          <span
            style={{
              fontFamily: C.mono,
              fontSize: 13,
              color: C.orange,
              fontStyle: "italic",
              animation: "cc-pulse 1.8s ease-in-out infinite",
            }}
          >
            ✻ Thinking...
          </span>
        </motion.div>

        {/* Tool call rows */}
        <motion.div variants={fadeIn} style={{ marginBottom: 6 }}>
          <ToolCallRow name="Read" args="identity.md" time="142ms" />
        </motion.div>
        <motion.div variants={fadeIn} style={{ marginBottom: 6 }}>
          <ToolCallRow name="Bash" args="whoami && cat career.json" time="87ms" />
        </motion.div>
        <motion.div variants={fadeIn} style={{ marginBottom: 16 }}>
          <ToolCallRow name="WebFetch" args="linkedin.com/in/k4rthikr" time="234ms" />
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeIn}
          style={{
            borderBottom: `1px solid ${C.border}`,
            marginBottom: 24,
          }}
        />

        {/* Claude's response prose */}
        <motion.p
          variants={fadeIn}
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.72)",
            marginBottom: 24,
            lineHeight: 1.7,
            maxWidth: 640,
          }}
        >
          Based on my analysis of the profile, here&apos;s a summary:
        </motion.p>

        {/* Identity card */}
        <motion.div
          variants={fadeIn}
          style={{
            borderRadius: 8,
            background: "rgba(217,119,87,0.06)",
            border: "1px solid rgba(217,119,87,0.2)",
            padding: "24px 28px",
            marginBottom: 28,
            maxWidth: 600,
          }}
        >
          <div
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              background: `linear-gradient(135deg, ${C.orange}, #f0a070)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 6,
            }}
          >
            {PERSONAL.name.toUpperCase()}
          </div>
          <div style={{ color: C.medium, fontSize: 15, marginBottom: 4 }}>
            {PERSONAL.title} @ {PERSONAL.company}
          </div>
          <div style={{ color: C.dim, fontSize: 13, fontFamily: C.mono }}>
            {PERSONAL.location}
          </div>
        </motion.div>

        {/* Prose description */}
        <motion.p
          variants={fadeIn}
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 640,
            lineHeight: 1.75,
            marginBottom: 28,
          }}
        >
          Karthik is a 15-year veteran of distributed systems — from Amazon Neptune (SDE to
          leading 4 teams and 60% of the org) to now Meta Blob Storage, building
          petabyte-scale infrastructure serving billions. He also builds AI-native products as
          weekend vibe projects.
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={fadeIn}
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 32,
            fontFamily: C.mono,
            fontSize: 13,
          }}
        >
          {HERO_STATS.map((stat, i) => (
            <span key={i} style={{ color: C.dim }}>
              <span style={{ color: C.bright, fontWeight: 700 }}>{stat.value}</span>{" "}
              {stat.label}
              {i < HERO_STATS.length - 1 && (
                <span style={{ marginLeft: 24, color: "rgba(255,255,255,0.15)" }}>·</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={fadeIn} style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <a
            href="#career"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 20px",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.medium,
              fontSize: 13,
              textDecoration: "none",
              fontFamily: C.mono,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = C.surfaceHover;
              (e.currentTarget as HTMLElement).style.borderColor = C.borderHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = C.surface;
              (e.currentTarget as HTMLElement).style.borderColor = C.border;
            }}
          >
            View Career <ArrowRight size={13} />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 20px",
              background: C.orange,
              borderRadius: 8,
              color: C.bright,
              fontSize: 13,
              textDecoration: "none",
              fontFamily: C.mono,
              fontWeight: 600,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <Mail size={13} /> Say Hello
          </a>
        </motion.div>

        {/* Blinking cursor */}
        <motion.div variants={fadeIn} style={{ fontFamily: C.mono, fontSize: 15, color: C.dim }}>
          &gt;{" "}
          <span style={{ color: C.medium, animation: "cc-cursor 1s step-start infinite" }}>
            █
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function ClaudeCareer() {
  return (
    <motion.section
      id="career"
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 80,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: C.mono, color: C.orange, fontSize: 14, marginBottom: 12 }}>
          &gt; /review career
        </div>
        <ToolCallRow name="Read" args="career.json" time="3ms" />
        <div
          style={{
            marginTop: 12,
            fontSize: 14,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.7,
          }}
        >
          I found {TIMELINE.length} career entries. Here&apos;s the breakdown:
        </div>
      </div>

      {/* Timeline cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {TIMELINE.map((item) => {
          const isActive = item.current;
          const barColor = isActive ? C.orange : C.dim;
          return (
            <motion.div
              key={item.id}
              variants={fadeIn}
              style={{
                display: "flex",
                gap: 16,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: "18px 20px",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.surfaceHover;
                (e.currentTarget as HTMLElement).style.borderColor = C.borderHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.surface;
                (e.currentTarget as HTMLElement).style.borderColor = C.border;
              }}
            >
              {/* Left bar */}
              <div
                style={{
                  width: 3,
                  borderRadius: 2,
                  background: barColor,
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.4,
                }}
              />
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ color: C.bright, fontWeight: 700, fontSize: 14 }}>
                    {item.company}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        fontFamily: C.mono,
                        fontSize: 10,
                        fontWeight: 700,
                        background: C.orange,
                        color: "#141414",
                        borderRadius: 4,
                        padding: "2px 7px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ACTIVE
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: C.mono,
                      fontSize: 11,
                      color: C.dim,
                      marginLeft: "auto",
                    }}
                  >
                    {item.period}
                  </span>
                </div>
                <div style={{ color: C.medium, fontSize: 13, marginBottom: 10 }}>
                  {item.role}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {item.highlights.map((h, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: 8,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.50)",
                      }}
                    >
                      <span style={{ color: "rgba(217,119,87,0.6)", flexShrink: 0 }}>▸</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Education */}
        <motion.div
          variants={fadeIn}
          style={{
            display: "flex",
            gap: 16,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              width: 3,
              borderRadius: 2,
              background: C.dim,
              flexShrink: 0,
              opacity: 0.3,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <GraduationCap size={14} color={C.dim} />
              <span style={{ color: C.medium, fontWeight: 700, fontSize: 14 }}>
                {EDUCATION.school}
              </span>
              <span
                style={{
                  fontFamily: C.mono,
                  fontSize: 11,
                  color: C.dim,
                  marginLeft: "auto",
                }}
              >
                {EDUCATION.period}
              </span>
            </div>
            <div style={{ color: C.dim, fontSize: 13, marginBottom: 4 }}>{EDUCATION.degree}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: C.mono }}>
              {EDUCATION.detail}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function ClaudeProjects() {
  return (
    <motion.section
      id="projects"
      variants={sectionIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 80,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, color: C.orange, fontSize: 14, marginBottom: 12 }}>
          &gt; /list projects --ai-native
        </div>
        <ToolCallRow name="Bash" args="ls ~/projects/" time="1ms" />
      </div>

      {/* ls-style listing */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          fontFamily: C.mono,
          fontSize: 13,
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {PROJECTS.map((p) => (
          <motion.div
            key={p.id}
            variants={fadeIn}
            style={{ display: "flex", gap: 16, alignItems: "baseline" }}
          >
            <span style={{ color: C.dim }}>drwxr-xr-x</span>
            <span style={{ color: C.orange, minWidth: 100 }}>{p.repoName}/</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>{p.description.split(".")[0]}</span>
          </motion.div>
        ))}
      </motion.div>

      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.75,
          maxWidth: 580,
          marginBottom: 28,
        }}
      >
        These projects share a common thread: Claude as the foundation, not the feature. Built
        AI-native from day one.
      </p>

      {/* Project cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "20px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = C.surfaceHover;
              (e.currentTarget as HTMLElement).style.borderColor = C.borderHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = C.surface;
              (e.currentTarget as HTMLElement).style.borderColor = C.border;
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: C.mono,
                  fontWeight: 700,
                  fontSize: 15,
                  color: C.orange,
                }}
              >
                {p.title}
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {p.description}
            </p>
            {p.tags.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: C.mono,
                      fontSize: 10,
                      color: C.dim,
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid rgba(255,255,255,0.08)`,
                      borderRadius: 4,
                      padding: "2px 7px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                fontFamily: C.mono,
                fontSize: 11,
                paddingTop: 12,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              {p.app && (
                <a
                  href={p.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.title} app`}
                  style={{ color: C.orange, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight size={12} /> app
                </a>
              )}
              <a
                href={p.page}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} project page`}
                style={{ color: C.cyan, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                <FileText size={12} /> page
              </a>
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} source on GitHub`}
                style={{ color: C.medium, display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon size={12} /> src
              </a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <ToolCallRow name="open" args="~/projects/index.html" time="1ms" />
        <a
          href={HUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="See all projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
            fontFamily: C.mono,
            fontSize: 13,
            color: C.orange,
            textDecoration: "none",
          }}
        >
          {HUB_URL} <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function ClaudeFooter() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${C.border}`,
        paddingTop: 40,
        paddingBottom: 60,
        paddingLeft: 24,
        paddingRight: 24,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ fontFamily: C.mono, color: C.orange, fontSize: 14, marginBottom: 12 }}>
        &gt; echo $CONTACT_INFO
      </div>
      <div
        style={{
          fontFamily: C.mono,
          fontSize: 13,
          color: C.dim,
          marginBottom: 6,
          paddingLeft: 8,
        }}
      >
        <div>{PERSONAL.email}</div>
        <div>linkedin.com/in/k4rthikr</div>
        <div>github.com/kbrovibes</div>
      </div>
      <div
        style={{
          fontFamily: C.mono,
          fontSize: 15,
          color: C.dim,
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        &gt;{" "}
        <span style={{ color: C.medium, animation: "cc-cursor 1s step-start infinite" }}>
          █
        </span>
      </div>
      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: 16,
          fontFamily: C.mono,
          fontSize: 11,
          color: "rgba(255,255,255,0.25)",
        }}
      >
        claude-sonnet-4-6 completed analysis in 3.2s
      </div>
    </footer>
  );
}

// ── HUD ───────────────────────────────────────────────────────────────────────

function ClaudeHUD() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        height: 36,
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: "env(safe-area-inset-bottom)",
        fontFamily: C.mono,
        fontSize: 11,
        color: "rgba(255,255,255,0.50)",
        gap: 0,
      }}
    >
      <span style={{ marginRight: 20 }}>⬡ claude-sonnet-4-6</span>
      <span style={{ color: "rgba(255,255,255,0.20)", marginRight: 20 }}>·</span>
      <span style={{ marginRight: 20 }}>⏺ 4,247 tokens</span>
      <span style={{ color: "rgba(255,255,255,0.20)", marginRight: 20 }}>·</span>
      <span style={{ marginRight: 20 }}>↑ 15 tools</span>
      <span style={{ color: "rgba(255,255,255,0.20)", marginRight: 20 }}>·</span>
      <span>⚡ auto</span>
      <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.25)" }}>esc to exit</span>
    </div>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function ClaudeCodeTheme() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.bright }}>
      <ClaudeNav />
      <div style={{ paddingTop: 48, paddingBottom: 40 }}>
        <ClaudeHero />
        <ClaudeCareer />
        <ClaudeProjects />
        <ClaudeFooter />
      </div>
      <ClaudeHUD />
    </div>
  );
}
