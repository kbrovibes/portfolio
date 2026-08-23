"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS, TECH_GROUPS, HUB_URL } from "@/lib/portfolio-data";

const BG = "#020818";
const TEAL = "#00c9a7";
const PURPLE = "#845ef7";
const PINK = "#ff9ff3";
const BLUE = "#54a0ff";

const gentle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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

const eraBorder: Record<string, string> = {
  meta: TEAL,
  "neptune-sdm2": BLUE,
  "neptune-sdm1": BLUE,
  "neptune-sde": BLUE,
  yahoo: PURPLE,
};

const eraDot: Record<string, string> = {
  meta: TEAL,
  "neptune-sdm2": BLUE,
  "neptune-sdm1": BLUE,
  "neptune-sde": BLUE,
  yahoo: PURPLE,
};

// ── Nav ───────────────────────────────────────────────────────────────────────

function AuroraNav() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(2,8,24,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid rgba(132,94,247,0.3)` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 900, fontSize: 18, background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KR.</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }} aria-label="LinkedIn"><LinkedInIcon size={16} /></a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }} aria-label="GitHub"><GitHubIcon size={16} /></a>
          <a href={`mailto:${PERSONAL.email}`} style={{ color: "rgba(255,255,255,0.4)" }} aria-label="Email"><Mail size={16} /></a>
          <div style={{ transform: "scale(0.9)" }}>
            <ThemeSelector />
          </div>
          <a href={`mailto:${PERSONAL.email}`}
            style={{ background: `linear-gradient(135deg, ${TEAL}20, ${PURPLE}20)`, border: `1px solid ${PURPLE}40`, color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 12, padding: "6px 16px", borderRadius: 999, textDecoration: "none" }}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function AuroraHero() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={gentle} style={{ marginBottom: 20 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${TEAL}40`, padding: "6px 16px", borderRadius: 999, fontSize: 12, color: TEAL, background: `${TEAL}10` }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL, display: "inline-block" }} />
            Engineering Manager · Meta · Blob Storage
          </span>
        </motion.div>

        <motion.h1 variants={gentle} style={{ fontSize: "clamp(56px, 9vw, 108px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-3px", marginBottom: 24 }}>
          <span style={{ display: "block", background: `linear-gradient(135deg, ${TEAL}, ${PURPLE}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {PERSONAL.firstName}
          </span>
          <span style={{ display: "block", background: `linear-gradient(135deg, ${PURPLE}, ${PINK}, ${BLUE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {PERSONAL.lastName}
          </span>
        </motion.h1>

        <motion.p variants={gentle} style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 540, lineHeight: 1.8, marginBottom: 40 }}>
          Currently at{" "}
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Meta Blob Storage</span>
          , building petabyte-scale infrastructure. Previously{" "}
          <span style={{ color: "rgba(255,255,255,0.85)" }}>14 years at Amazon Neptune</span>.
        </motion.p>

        <motion.div variants={gentle} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 560, marginBottom: 44 }}>
          {HERO_STATS.map(({ value, label }, i) => {
            const colors = [TEAL, PURPLE, PINK, BLUE];
            const c = colors[i % colors.length];
            return (
              <div key={label} style={{ background: "rgba(255,255,255,0.035)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `2px solid ${c}`, padding: "16px 12px", textAlign: "center", borderRadius: 8 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{value}</div>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{label}</div>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={gentle} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#journey" style={{ background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`, color: "#fff", fontWeight: 700, fontSize: 13, padding: "12px 28px", borderRadius: 999, textDecoration: "none" }}>
            Explore My Work
          </a>
          <a href={`mailto:${PERSONAL.email}`} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 13, padding: "12px 28px", borderRadius: 999, textDecoration: "none" }}>
            Say Hello
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function AuroraCareer() {
  return (
    <motion.section id="journey" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={gentle} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: TEAL, marginBottom: 8 }}>Journey</p>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "rgba(255,255,255,0.9)" }}>15 years building at hyperscale</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 8, maxWidth: 480 }}>From Yahoo! Bangalore to Amazon to Meta — always deep in distributed systems.</p>
      </motion.div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 5, top: 16, bottom: 80, width: 2, background: `linear-gradient(to bottom, ${TEAL}, ${PURPLE} 50%, ${PINK})`, opacity: 0.4 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 36 }}>
          {TIMELINE.map((item) => {
            const bc = eraBorder[item.id] ?? BLUE;
            const dc = eraDot[item.id] ?? BLUE;
            return (
              <motion.div key={item.id} variants={gentle} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -36, top: 20, width: 12, height: 12, borderRadius: "50%", background: dc, boxShadow: item.current ? `0 0 0 3px ${dc}30, 0 0 12px ${dc}40` : "none", border: `2px solid ${BG}` }} />
                <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `2px solid ${bc}`, borderRadius: 12, padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4, fontFamily: "monospace" }}>{item.period}</p>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 2 }}>{item.role}</h3>
                      <p style={{ fontSize: 13, color: bc }}>{item.company} · <span style={{ color: "rgba(255,255,255,0.35)" }}>{item.location}</span></p>
                    </div>
                    {item.current && (
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: TEAL, border: `1px solid ${TEAL}40`, padding: "2px 8px", borderRadius: 999 }}>
                        NOW
                      </span>
                    )}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0" }}>
                    {item.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4, display: "flex", gap: 8 }}>
                        <span style={{ color: bc, flexShrink: 0 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
          {/* Education */}
          <motion.div variants={gentle} style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: -36, top: 20, width: 12, height: 12, borderRadius: "50%", background: PINK, border: `2px solid ${BG}` }} />
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `2px solid ${PINK}60`, borderRadius: 12, padding: "20px 24px" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 4, fontFamily: "monospace" }}>{EDUCATION.period}</p>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>{EDUCATION.degree}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{EDUCATION.school} · {EDUCATION.detail}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function AuroraProjects() {
  const projectAuroraColors = [TEAL, PINK, "#ffd166", PURPLE];
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={gentle} style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: PURPLE, marginBottom: 8 }}>Creations</p>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "rgba(255,255,255,0.9)" }}>AI-native projects</h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {PROJECTS.map((p, i) => {
          const c = projectAuroraColors[i % projectAuroraColors.length];
          return (
            <motion.div key={p.id} variants={gentle}
              style={{ background: `linear-gradient(135deg, ${c}08, ${BG})`, border: `1px solid ${c}20`, borderRadius: 16, padding: "24px", backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: c }}>{p.title}</h3>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {p.app && (
                    <a href={p.app} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} app`}
                      style={{ color: c, border: `1px solid ${c}40`, padding: 4, borderRadius: 6, display: "flex" }}>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  <a href={p.page} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} project page`}
                    style={{ color: c, border: `1px solid ${c}40`, padding: 4, borderRadius: 6, display: "flex" }}>
                    <FileText size={14} />
                  </a>
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source on GitHub`}
                    style={{ color: c, border: `1px solid ${c}40`, padding: 4, borderRadius: 6, display: "flex" }}>
                    <GitHubIcon size={14} />
                  </a>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 16 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, border: `1px solid ${c}30`, padding: "2px 10px", borderRadius: 999, color: c, background: `${c}08` }}>{t}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
        <motion.a href={HUB_URL} target="_blank" rel="noopener noreferrer" aria-label="See all projects" variants={gentle}
          style={{ background: `linear-gradient(135deg, ${PURPLE}10, ${BG})`, border: `1px solid ${PURPLE}30`, borderRadius: 16, padding: "24px", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8, textAlign: "center", textDecoration: "none" }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: PURPLE }}>See every project</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>The whole shelf — app, page, source</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: PURPLE }}>
            kbrovibes.github.io <ArrowUpRight size={12} />
          </span>
        </motion.a>
      </div>
    </motion.section>
  );
}

// ── Tech ──────────────────────────────────────────────────────────────────────

function AuroraTech() {
  const techColors = [TEAL, BLUE, PURPLE, PINK];
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1100, margin: "0 auto" }}>
      <motion.div variants={gentle} style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: BLUE, marginBottom: 8 }}>Expertise</p>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,0.9)" }}>Tech Stack</h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {TECH_GROUPS.map(({ label, items }, i) => {
          const c = techColors[i % techColors.length];
          return (
            <motion.div key={label} variants={gentle}
              style={{ background: "rgba(255,255,255,0.035)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `2px solid ${c}`, borderRadius: 10, padding: "16px 20px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c, marginBottom: 12 }}>{label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map((item) => (
                  <span key={item} style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 4, background: `${c}08` }}>{item}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function AuroraFooter() {
  return (
    <footer style={{ position: "relative" }}>
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${TEAL}60, ${PURPLE}60, ${PINK}60, transparent)`, marginBottom: 0 }} />
      <div style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <p style={{ fontWeight: 900, fontSize: 24, background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 4 }}>KR.</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Karthik Rajan · Snoqualmie, WA</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Building something interesting? Let&apos;s talk.</p>
            <a href={`mailto:${PERSONAL.email}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${TEAL}, ${PURPLE})`, color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 24px", borderRadius: 999, textDecoration: "none" }}>
              <Mail size={14} />
              {PERSONAL.email}
            </a>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", padding: 10, borderRadius: 10, display: "flex", background: "rgba(255,255,255,0.04)" }} aria-label="LinkedIn">
              <LinkedInIcon size={16} />
            </a>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", padding: 10, borderRadius: 10, display: "flex", background: "rgba(255,255,255,0.04)" }} aria-label="GitHub">
              <GitHubIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function AuroraTheme() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Star field */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "60px 60px" }}
      />
      {/* Aurora band */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "40vh", pointerEvents: "none", zIndex: 0,
        background: `linear-gradient(135deg, ${TEAL}, ${PURPLE}, ${PINK}, ${BLUE}, ${TEAL})`,
        backgroundSize: "400% 400%",
        animation: "aurora-shift 12s ease infinite",
        filter: "blur(80px)",
        opacity: 0.35 }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <AuroraNav />
        <div style={{ paddingTop: 56 }}>
          <AuroraHero />
          <AuroraCareer />
          <AuroraProjects />
          <AuroraTech />
          <AuroraFooter />
        </div>
      </div>
    </div>
  );
}
