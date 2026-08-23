"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS, TECH_GROUPS, HUB_URL } from "@/lib/portfolio-data";

const BG = "#08001a";
const PINK = "#FF006E";
const CYAN = "#00D4FF";
const YELLOW = "#FFE01B";
const DIM = "rgba(255,255,255,0.5)";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

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

const cardBorderByCompany: Record<string, string> = {
  meta: PINK,
  "neptune-sdm2": CYAN,
  "neptune-sdm1": CYAN,
  "neptune-sde": CYAN,
  yahoo: "#9d4edd",
};

// ── Nav ───────────────────────────────────────────────────────────────────────

function NeonNav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,0,26,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${PINK}40` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 900, fontSize: 18, color: PINK, textShadow: `0 0 10px ${PINK}` }}>KR.</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: DIM }} aria-label="LinkedIn"><LinkedInIcon size={16} /></a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ color: DIM }} aria-label="GitHub"><GitHubIcon size={16} /></a>
          <a href={`mailto:${PERSONAL.email}`} style={{ color: DIM }} aria-label="Email"><Mail size={16} /></a>
          <div style={{ transform: "scale(0.9)" }}>
            <ThemeSelector />
          </div>
          <a href={`mailto:${PERSONAL.email}`}
            style={{ background: "transparent", border: `1px solid ${PINK}`, color: PINK, fontWeight: 600, fontSize: 12, padding: "6px 16px", borderRadius: 20, textDecoration: "none", boxShadow: `0 0 8px ${PINK}40` }}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function NeonHero() {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${CYAN}60`, padding: "6px 16px", borderRadius: 999, fontSize: 12, color: CYAN, background: `${CYAN}10`, boxShadow: `0 0 12px ${CYAN}30` }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: CYAN, display: "inline-block", boxShadow: `0 0 8px ${CYAN}` }} />
            Engineering Manager · Meta · Blob Storage
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(56px, 9vw, 110px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-3px", marginBottom: 24 }}>
          <span style={{ display: "block", color: "#fff", textShadow: `0 0 10px ${PINK}, 0 0 20px ${PINK}, 0 0 40px ${PINK}, 0 0 80px ${PINK}30` }}>
            {PERSONAL.firstName}
          </span>
          <span style={{ display: "block", color: "#fff", textShadow: `0 0 10px ${PINK}, 0 0 20px ${PINK}, 0 0 40px ${PINK}, 0 0 80px ${PINK}30` }}>
            {PERSONAL.lastName}
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} style={{ fontSize: 16, color: DIM, maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
          Currently at{" "}
          <span style={{ color: "#fff" }}>Meta Blob Storage</span>
          , building petabyte-scale infrastructure. Previously{" "}
          <span style={{ color: "#fff" }}>14 years at Amazon Neptune</span>.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 560, marginBottom: 40 }}>
          {HERO_STATS.map(({ value, label }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${CYAN}30`, padding: "16px 8px", textAlign: "center", borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: YELLOW, textShadow: `0 0 10px ${YELLOW}60` }}>{value}</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#career" style={{ background: PINK, color: "#fff", fontWeight: 700, fontSize: 13, padding: "12px 28px", borderRadius: 999, textDecoration: "none", boxShadow: `0 0 20px ${PINK}60` }}>
            View My Work
          </a>
          <a href={`mailto:${PERSONAL.email}`} style={{ background: "transparent", border: `1px solid ${CYAN}60`, color: CYAN, fontWeight: 600, fontSize: 13, padding: "12px 28px", borderRadius: 999, textDecoration: "none" }}>
            Say Hello
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function NeonCareer() {
  return (
    <motion.section id="career" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: CYAN, textShadow: `0 0 10px ${CYAN}, 0 0 20px ${CYAN}60` }}>CAREER.EXE</h2>
        <p style={{ color: DIM, fontSize: 14, marginTop: 8 }}>From Yahoo! Bangalore to Amazon to Meta — always deep in distributed systems.</p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TIMELINE.map((item) => {
          const bColor = cardBorderByCompany[item.id] ?? CYAN;
          return (
            <motion.div key={item.id} variants={fadeUp}
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${bColor}40`, borderLeft: `2px solid ${bColor}`, borderRadius: 8, padding: "20px 24px", boxShadow: item.current ? `0 0 20px ${PINK}10` : `0 0 8px rgba(0,212,255,0.05)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 11, color: DIM, marginBottom: 4, fontFamily: "monospace" }}>{item.period}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{item.role}</h3>
                  <p style={{ fontSize: 13, color: bColor }}>{item.company} · <span style={{ color: DIM }}>{item.location}</span></p>
                </div>
                {item.current && (
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: PINK, border: `1px solid ${PINK}60`, padding: "2px 8px", borderRadius: 999, boxShadow: `0 0 8px ${PINK}40` }}>
                    NOW
                  </span>
                )}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0" }}>
                {item.highlights.map((h, i) => (
                  <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4, display: "flex", gap: 8 }}>
                    <span style={{ color: bColor, flexShrink: 0 }}>▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
        <motion.div variants={fadeUp}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "2px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "20px 24px" }}>
          <p style={{ fontSize: 11, color: DIM, marginBottom: 4, fontFamily: "monospace" }}>{EDUCATION.period}</p>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{EDUCATION.degree}</h3>
          <p style={{ fontSize: 13, color: DIM }}>{EDUCATION.school} · {EDUCATION.detail}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function NeonProjects() {
  const projectColors = [PINK, "#ff9ff3", YELLOW, "#845ef7"];
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: YELLOW, textShadow: `0 0 10px ${YELLOW}, 0 0 20px ${YELLOW}60` }}>PROJECTS.SH</h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {PROJECTS.map((p, i) => {
          const c = projectColors[i % projectColors.length];
          return (
            <motion.div key={p.id} variants={fadeUp}
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c}30`, borderRadius: 12, padding: "24px", transition: "box-shadow 0.3s" }}>
              <div style={{ marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: c, textShadow: `0 0 8px ${c}60` }}>{p.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: DIM, lineHeight: 1.6, marginBottom: 16 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, border: `1px solid ${c}40`, padding: "2px 10px", borderRadius: 999, color: c, background: `${c}10` }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.app && (
                  <a href={p.app} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} app`}
                    style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: BG, background: c, boxShadow: `0 0 10px ${c}90`, padding: "4px 12px", borderRadius: 999, textDecoration: "none" }}>
                    App
                  </a>
                )}
                <a href={p.page} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} project page`}
                  style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c, border: `1px solid ${c}80`, boxShadow: `0 0 6px ${c}40`, padding: "4px 12px", borderRadius: 999, textDecoration: "none" }}>
                  Page
                </a>
                <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source on GitHub`}
                  style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c, border: `1px solid ${c}80`, boxShadow: `0 0 6px ${c}40`, padding: "4px 12px", borderRadius: 999, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <GitHubIcon size={11} /> Src
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.a variants={fadeUp} href={HUB_URL} target="_blank" rel="noopener noreferrer" aria-label="See all projects"
        style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: `1px solid ${CYAN}80`, boxShadow: `0 0 16px ${CYAN}50`, borderRadius: 999, padding: "14px 24px", textDecoration: "none" }}>
        <span style={{ fontSize: 14, fontWeight: 900, color: CYAN, textShadow: `0 0 8px ${CYAN}80`, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          See all projects — kbrovibes.github.io
        </span>
        <ArrowUpRight size={16} color={CYAN} />
      </motion.a>
    </motion.section>
  );
}

// ── Tech ──────────────────────────────────────────────────────────────────────

function NeonTech() {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: CYAN, textShadow: `0 0 8px ${CYAN}60` }}>STACK.JSON</h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {TECH_GROUPS.map(({ label, items }) => (
          <motion.div key={label} variants={fadeUp}
            style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${CYAN}20`, borderRadius: 8, padding: "16px 20px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: CYAN, marginBottom: 12 }}>{label}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map((item) => (
                <span key={item} style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 4 }}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function NeonFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${PINK}30`, paddingTop: 40, paddingBottom: 40, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div>
          <p style={{ fontWeight: 900, fontSize: 24, color: PINK, marginBottom: 4, textShadow: `0 0 10px ${PINK}`, animation: "neon-flicker 4s ease infinite" }}>KR.</p>
          <p style={{ fontSize: 13, color: DIM }}>Karthik Rajan · Snoqualmie, WA</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, color: DIM, marginBottom: 12 }}>Building something interesting? Let&apos;s talk.</p>
          <a href={`mailto:${PERSONAL.email}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PINK, color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 24px", borderRadius: 999, textDecoration: "none", boxShadow: `0 0 20px ${PINK}60` }}>
            <Mail size={14} />
            {PERSONAL.email}
          </a>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ color: CYAN, border: `1px solid ${CYAN}40`, padding: 10, borderRadius: 8, display: "flex" }} aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            style={{ color: CYAN, border: `1px solid ${CYAN}40`, padding: 10, borderRadius: 8, display: "flex" }} aria-label="GitHub">
            <GitHubIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function NeonTheme() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#fff", position: "relative" }}>
      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)`,
        backgroundSize: "40px 40px" }}
      />
      {/* Scanline overlay */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
        backgroundImage: "repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)" }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <NeonNav />
        <div style={{ paddingTop: 56 }}>
          <NeonHero />
          <NeonCareer />
          <NeonProjects />
          <NeonTech />
          <NeonFooter />
        </div>
      </div>
    </div>
  );
}
