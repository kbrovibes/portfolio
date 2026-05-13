"use client";

import { motion, type Variants } from "framer-motion";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, HERO_STATS, TIMELINE, EDUCATION, PROJECTS } from "@/lib/portfolio-data";

const MONO: React.CSSProperties = {
  fontFamily: '"Courier New", Courier, monospace',
};

const GREEN = "#00ff41";
const DIM = "#00882a";
const VERY_DIM = "#005518";

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

// ── Nav ───────────────────────────────────────────────────────────────────────

function TerminalNav() {
  return (
    <div style={{ ...MONO, background: "#000", borderBottom: `1px solid ${DIM}`, position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: GREEN, fontSize: 13 }}>
          <span style={{ color: DIM }}>[</span>karthik@meta ~<span style={{ color: DIM }}>]</span>
          <span style={{ color: "#fff", marginLeft: 8 }}>$ portfolio --interactive</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: DIM, fontSize: 12, textDecoration: "none" }}>linkedin</a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ color: DIM, fontSize: 12, textDecoration: "none" }}>github</a>
          <a href={`mailto:${PERSONAL.email}`} style={{ color: DIM, fontSize: 12, textDecoration: "none" }}>email</a>
          <div style={{ transform: "scale(0.9)" }}>
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function TerminalHero() {
  const lines = [
    { text: `karthik@meta:~$ whoami`, color: GREEN },
    { text: `> ${PERSONAL.name.toUpperCase()}`, color: "#fff", big: true },
    { text: `> ${PERSONAL.title} @ ${PERSONAL.company}`, color: GREEN },
    { text: "", color: "" },
    { text: `karthik@meta:~$ cat stats.env`, color: GREEN },
    { text: `YEARS_EXPERIENCE=${HERO_STATS[0].value}`, color: DIM },
    { text: `ENGINEERS_LED=${HERO_STATS[1].value}`, color: DIM },
    { text: `ARR_IMPACT=${HERO_STATS[2].value}`, color: DIM },
    { text: `SERVERS_MANAGED=${HERO_STATS[3].value}`, color: DIM },
    { text: "", color: "" },
    { text: `karthik@meta:~$ `, color: GREEN, cursor: true },
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
                  <span style={{ display: "inline-block", width: 12, height: 20, background: GREEN, marginLeft: 2, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
                )}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
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
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 20 }}>karthik@meta:~$ cat career.log</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TIMELINE.map((item, i) => {
          const borderColor = item.id === "meta" ? GREEN : item.id === "yahoo" ? "#a855f7" : DIM;
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
                  <span style={{ color: GREEN, fontSize: 11, fontWeight: 700, animation: "blink 1.5s ease infinite" }}>[ACTIVE]</span>
                )}
                <span style={{ color: item.current ? GREEN : DIM, fontSize: 12 }}>{item.period}</span>
              </div>
              {/* Content */}
              <div style={{ padding: "10px 16px" }}>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.role}</p>
                <p style={{ color: borderColor, fontSize: 13, marginBottom: 8 }}>{item.company} · {item.location}</p>
                {item.highlights.map((h, j) => (
                  <p key={j} style={{ color: VERY_DIM, fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: DIM }}>▸ </span>{h}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
        {/* Education */}
        <motion.div variants={sectionIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ border: `1px solid ${VERY_DIM}`, padding: "10px 16px" }}>
          <p style={{ color: DIM, fontSize: 12, marginBottom: 2 }}>{EDUCATION.period}</p>
          <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{EDUCATION.degree}</p>
          <p style={{ color: VERY_DIM, fontSize: 12 }}>{EDUCATION.school} · {EDUCATION.detail}</p>
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
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 16 }}>karthik@meta:~$ ls -la ~/projects/</p>
      <p style={{ color: VERY_DIM, fontSize: 12, marginBottom: 12 }}>total {PROJECTS.length}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PROJECTS.map((p, i) => (
          <motion.div key={p.id} custom={i} variants={lineIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: "flex", alignItems: "baseline", gap: 16, fontSize: 13 }}>
            <span style={{ color: DIM, flexShrink: 0 }}>drwxr-xr-x</span>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                style={{ color: GREEN, fontWeight: 700, textDecoration: "none", minWidth: 120 }}>
                {p.title}/
              </a>
            ) : (
              <span style={{ color: GREEN, fontWeight: 700, minWidth: 120 }}>{p.title}/</span>
            )}
            <span style={{ color: VERY_DIM, fontSize: 12 }}>{p.description}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function TerminalFooter() {
  return (
    <footer style={{ ...MONO, borderTop: `1px solid ${VERY_DIM}`, paddingTop: 32, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, maxWidth: 1100, margin: "0 auto" }}>
      <p style={{ color: GREEN, fontSize: 15, marginBottom: 6 }}>karthik@meta:~$ echo $CONTACT</p>
      <p style={{ color: DIM, fontSize: 13, marginBottom: 16 }}>
        {PERSONAL.email} | linkedin.com/in/k4rthikr | github.com/kbrovibes
      </p>
      <p style={{ color: GREEN, fontSize: 15 }}>
        karthik@meta:~$&nbsp;
        <span style={{ display: "inline-block", width: 12, height: 18, background: GREEN, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
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
        <TerminalCareer />
        <TerminalProjects />
        <TerminalFooter />
      </div>
    </div>
  );
}
