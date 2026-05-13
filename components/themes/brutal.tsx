"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS, TECH_GROUPS } from "@/lib/portfolio-data";

const BG = "#f0f0e8";
const TEXT = "#0a0a0a";
const RED = "#ff2a20";
const YELLOW = "#ffd600";
const BORDER = "2.5px solid #0a0a0a";
const SHADOW = "4px 4px 0 #0a0a0a";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
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

// ── Nav ───────────────────────────────────────────────────────────────────────

function BrutalNav() {
  return (
    <nav style={{ background: TEXT, borderBottom: BORDER, position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: RED, fontWeight: 900, fontSize: 22, letterSpacing: "-1px" }}>KR.</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", opacity: 0.6 }} aria-label="LinkedIn"><LinkedInIcon size={16} /></a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", opacity: 0.6 }} aria-label="GitHub"><GitHubIcon size={16} /></a>
          <a href={`mailto:${PERSONAL.email}`} style={{ color: "#fff", opacity: 0.6 }} aria-label="Email"><Mail size={16} /></a>
          <div style={{ transform: "scale(0.9)", filter: "invert(1)" }}>
            <ThemeSelector />
          </div>
          <a href={`mailto:${PERSONAL.email}`}
            style={{ background: RED, color: "#fff", fontWeight: 700, fontSize: 12, padding: "6px 16px", border: "2px solid #fff", borderRadius: 0, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function BrutalHero() {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 60, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto", position: "relative" }}>
      <motion.div variants={reveal} initial="hidden" animate="visible">
        <div style={{ fontSize: "clamp(72px, 12vw, 140px)", fontWeight: 900, lineHeight: 0.88, color: TEXT, letterSpacing: "-4px", textTransform: "uppercase" }}>
          {PERSONAL.firstName}
        </div>
        <div style={{ fontSize: "clamp(72px, 12vw, 140px)", fontWeight: 900, lineHeight: 0.88, color: TEXT, letterSpacing: "-4px", textTransform: "uppercase", marginBottom: 24 }}>
          {PERSONAL.lastName}
        </div>
        <div style={{ height: 6, background: RED, marginBottom: 20, width: "100%" }} />
        <p style={{ fontWeight: 900, fontSize: "clamp(14px, 2vw, 20px)", textTransform: "uppercase", letterSpacing: "0.05em", color: TEXT, marginBottom: 32 }}>
          {PERSONAL.title} @ {PERSONAL.company}
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={stagger} initial="hidden" animate="visible"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: BORDER, boxShadow: SHADOW }}>
        {HERO_STATS.map(({ value, label }) => (
          <motion.div key={label} variants={reveal}
            style={{ borderRight: BORDER, padding: "24px 16px", textAlign: "center", borderRadius: 0, background: BG }}>
            <div style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: TEXT, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginTop: 4 }}>{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function BrutalCareer() {
  return (
    <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", fontSize: 240, fontWeight: 900, color: TEXT, opacity: 0.04, top: -60, right: 0, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>15</div>
      <h2 style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: TEXT, borderBottom: `3px solid ${TEXT}`, paddingBottom: 8, marginBottom: 32 }}>CAREER</h2>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TIMELINE.map((item, i) => (
          <motion.div key={item.id} variants={reveal}
            style={{ borderLeft: `5px solid ${item.current ? RED : TEXT}`, paddingLeft: 20, paddingTop: 12, paddingBottom: 12, background: BG }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginBottom: 4 }}>{item.period}</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: TEXT, marginBottom: 2 }}>{item.company}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: item.current ? RED : "#333", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.03em" }}>{item.role}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {item.highlights.map((h, j) => (
                <li key={j} style={{ fontSize: 13, color: "#333", marginBottom: 3, display: "flex", gap: 8 }}>
                  <span style={{ color: item.current ? RED : TEXT, flexShrink: 0 }}>—</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <motion.div variants={reveal}
          style={{ borderLeft: `5px solid #999`, paddingLeft: 20, paddingTop: 12, paddingBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#999", marginBottom: 4 }}>{EDUCATION.period}</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: TEXT, marginBottom: 2 }}>{EDUCATION.school}</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#333", marginBottom: 4 }}>{EDUCATION.degree}</p>
          <p style={{ fontSize: 13, color: "#555" }}>{EDUCATION.detail}</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function BrutalProjects() {
  return (
    <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: TEXT, borderBottom: `3px solid ${TEXT}`, paddingBottom: 8, marginBottom: 32 }}>PROJECTS / AI</h2>
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {PROJECTS.map((p) => (
          <motion.div key={p.id} variants={reveal}
            style={{ border: BORDER, boxShadow: SHADOW, padding: "24px", borderRadius: 0, background: BG, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: TEXT, textTransform: "uppercase" }}>{p.title}</h3>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ color: TEXT, border: `2px solid ${TEXT}`, padding: 4, display: "flex", alignItems: "center" }}>
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
            <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tags.map((t) => (
                <span key={t} style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", border: `1.5px solid ${TEXT}`, padding: "2px 8px", borderRadius: 0, background: YELLOW }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ── Tech ──────────────────────────────────────────────────────────────────────

function BrutalTech() {
  return (
    <motion.section variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: TEXT, borderBottom: `3px solid ${TEXT}`, paddingBottom: 8, marginBottom: 32 }}>TECH STACK</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {TECH_GROUPS.map(({ label, items }) => (
          <div key={label} style={{ border: BORDER, padding: "16px 20px", borderRadius: 0, background: BG }}>
            <p style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: "#555", marginBottom: 12 }}>{label}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map((item) => (
                <span key={item} style={{ fontSize: 11, fontWeight: 700, border: `1.5px solid ${TEXT}`, padding: "3px 8px", borderRadius: 0, background: "#fff" }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function BrutalFooter() {
  return (
    <footer style={{ background: TEXT, color: "#fff", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div>
          <p style={{ fontWeight: 900, fontSize: 28, color: RED, marginBottom: 4, letterSpacing: "-1px" }}>KR.</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Karthik Rajan · Snoqualmie, WA</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Building something interesting? Let&apos;s talk.</p>
          <a href={`mailto:${PERSONAL.email}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 24px", textDecoration: "none", border: "2px solid #fff", borderRadius: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <Mail size={14} />
            {PERSONAL.email}
          </a>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.2)", padding: 10, display: "flex", alignItems: "center" }} aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.5)", border: "1.5px solid rgba(255,255,255,0.2)", padding: 10, display: "flex", alignItems: "center" }} aria-label="GitHub">
            <GitHubIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function BrutalTheme() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT }}>
      <BrutalNav />
      <div style={{ paddingTop: 56 }}>
        <BrutalHero />
        <BrutalCareer />
        <BrutalProjects />
        <BrutalTech />
        <BrutalFooter />
      </div>
    </div>
  );
}
