"use client";

import { motion } from "framer-motion";
import ThemeSelector from "@/components/ThemeSelector";
import { PERSONAL, TIMELINE, EDUCATION, PROJECTS, HUB_URL } from "@/lib/portfolio-data";

// ── Constants ─────────────────────────────────────────────────────────────────

const MONO = '"SF Mono", "JetBrains Mono", "Fira Code", Menlo, "Courier New", monospace';

const C = {
  bg: "#0d0d0d",
  line: "rgba(255,255,255,0.08)",
  orange: "#D97757",
  orangeDim: "rgba(217,119,87,0.7)",
  green: "#4ade80",
  yellow: "#fbbf24",
  text: "#d4d4d4",
  textDim: "#6b6b6b",
  textBright: "#f0f0f0",
  textVeryDim: "#444",
  prompt: "#D97757",
};

// ── Reusable components ───────────────────────────────────────────────────────

function ToolLine({
  name,
  args,
  time,
  delay = 0,
}: {
  name: string;
  args: string;
  time: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.25 }}
      style={{
        fontFamily: MONO,
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        lineHeight: "1.6",
      }}
    >
      <span style={{ color: C.orange }}>⏺</span>
      <span style={{ color: C.textBright }}>{name}</span>
      <span style={{ color: C.textDim }}>({args})</span>
      <span
        style={{
          flex: 1,
          borderBottom: "1px dotted rgba(255,255,255,0.06)",
          margin: "0 8px",
          minWidth: "20px",
        }}
      />
      <span style={{ color: C.green }}>✓</span>
      <span style={{ color: C.textVeryDim, fontSize: "11px" }}>{time}</span>
    </motion.div>
  );
}

function OutputBox({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      style={{
        marginLeft: "20px",
        marginTop: "4px",
        borderLeft: "2px solid rgba(255,255,255,0.1)",
        paddingLeft: "16px",
        fontFamily: MONO,
        fontSize: "13px",
        color: C.text,
        lineHeight: "1.7",
      }}
    >
      <div
        style={{
          color: C.textVeryDim,
          fontSize: "11px",
          marginBottom: "6px",
          userSelect: "none",
        }}
      >
        └─ Output
      </div>
      {children}
    </motion.div>
  );
}

function Prompt({ command }: { command: string }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: "13px",
        color: C.textDim,
        marginBottom: "10px",
      }}
    >
      <span style={{ color: C.orange }}>❯</span>
      <span style={{ color: C.text }}> {command}</span>
    </div>
  );
}

function OutputLine({
  children,
  dim = false,
}: {
  children: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <div style={{ color: dim ? C.textDim : C.text, lineHeight: "1.7" }}>
      {children}
    </div>
  );
}

function FlagLink({ href, label, color }: { href: string; label: string; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label.replace("--", "")} link: ${href}`}
      style={{
        color,
        textDecoration: "none",
        fontFamily: MONO,
        fontSize: "13px",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
    >
      {label}
    </a>
  );
}

function ClaudeText({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: "13px",
        color: "#b0b0b0",
        lineHeight: "1.8",
        maxWidth: "680px",
      }}
    >
      {children}
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "48px 0" }}
    />
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function CliNavWithSelector() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#0d0d0d",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        height: "44px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        paddingRight: "16px",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: "13px" }}>
        <span style={{ color: C.orange }}>claude</span>
        <span style={{ color: C.text }}> ~/karthik-portfolio </span>
        <span style={{ color: C.textDim }}>(main)</span>
        <span style={{ color: C.orange }}> ✦</span>
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ThemeSelector />
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function CliHero() {
  return (
    <section
      style={{
        paddingTop: "80px",
        paddingBottom: "64px",
        paddingLeft: "32px",
        paddingRight: "24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: "4px", fontFamily: MONO, fontSize: "11px", color: C.textVeryDim }}
      >
        claude ~/karthik-portfolio
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.25 }}
        style={{ marginBottom: "14px", marginTop: "10px" }}
      >
        <Prompt command="analyze karthik.json --verbose" />
      </motion.div>

      <div style={{ marginBottom: "8px" }}>
        <ToolLine name="Read" args="karthik/identity.md" time="142ms" delay={0.1} />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <ToolLine name="Bash" args="cat career.json" time=" 87ms" delay={0.3} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <ToolLine name="WebFetch" args="linkedin.com/in/k4rthikr" time="234ms" delay={0.5} />
      </div>

      <OutputBox delay={0.7}>
        <div style={{ whiteSpace: "pre", lineHeight: "1.7" }}>
          <span style={{ color: C.textDim }}>{"name:     "}</span>
          <span style={{ color: C.textBright }}>{"Karthik Rajan"}</span>
          {"\n"}
          <span style={{ color: C.textDim }}>{"title:    "}</span>
          <span style={{ color: C.text }}>{"Engineering Manager, Blob Storage"}</span>
          {"\n"}
          <span style={{ color: C.textDim }}>{"company:  "}</span>
          <span style={{ color: C.text }}>{"Meta"}</span>
          {"\n"}
          <span style={{ color: C.textDim }}>{"location: "}</span>
          <span style={{ color: C.text }}>{"Snoqualmie, WA"}</span>
          {"\n"}
          <span style={{ color: C.textDim }}>{"email:    "}</span>
          <span style={{ color: C.text }}>{PERSONAL.email}</span>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            margin: "8px 0",
            fontFamily: MONO,
            fontSize: "11px",
            color: C.textVeryDim,
          }}
        >
          {"─".repeat(42)}
        </div>
        <div style={{ whiteSpace: "pre", lineHeight: "1.7" }}>
          <span style={{ color: C.textDim }}>{"years:    "}</span>
          <span style={{ color: C.text }}>{"15+"}</span>
          <span style={{ color: C.textVeryDim }}>{"      "}</span>
          <span style={{ color: C.textDim }}>{"engineers:  "}</span>
          <span style={{ color: C.text }}>{"25+"}</span>
          {"\n"}
          <span style={{ color: C.textDim }}>{"arr:      "}</span>
          <span style={{ color: C.text }}>{"$100M+"}</span>
          <span style={{ color: C.textVeryDim }}>{"   "}</span>
          <span style={{ color: C.textDim }}>{"servers:    "}</span>
          <span style={{ color: C.text }}>{"30K+"}</span>
        </div>
      </OutputBox>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.3 }}
        style={{ marginTop: "24px", marginBottom: "16px" }}
      >
        <ClaudeText>
          Analysis complete. Here&apos;s my summary:
          <br />
          <br />
          Karthik Rajan is an Engineering Manager at Meta Blob Storage,
          <br />
          building petabyte-scale storage infrastructure. He spent 14
          <br />
          years at Amazon Neptune, progressing from SDE to leading 60%
          <br />
          of the org across 4 global teams.
          <br />
          <br />
          He also builds AI-native tools on weekends — Claude as the
          <br />
          core architecture, not a feature add-on.
        </ClaudeText>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.3 }}
        style={{ display: "flex", gap: "12px", marginTop: "24px", marginBottom: "24px" }}
      >
        <a
          href="#career"
          style={{
            fontFamily: MONO,
            fontSize: "13px",
            color: C.orange,
            textDecoration: "none",
            border: `1px solid ${C.orange}`,
            padding: "6px 16px",
            borderRadius: "2px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(217,119,87,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          View Career ↓
        </a>
        <a
          href={`mailto:${PERSONAL.email}`}
          style={{
            fontFamily: MONO,
            fontSize: "13px",
            color: C.textDim,
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "6px 16px",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = C.text;
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = C.textDim;
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          Say Hello
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 0.3 }}
        style={{ fontFamily: MONO, fontSize: "13px", color: C.textDim }}
      >
        <span style={{ color: C.orange }}>❯</span>{" "}
        <span style={{ animation: "cc-cursor 1s step-start infinite", color: C.text }}>
          █
        </span>
      </motion.div>
    </section>
  );
}

// ── Career ────────────────────────────────────────────────────────────────────

function CliCareer() {
  return (
    <motion.section
      id="career"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3 }}
      style={{
        paddingLeft: "32px",
        paddingRight: "24px",
        paddingBottom: "64px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Prompt command="cat career.log --all-entries" />

      <div style={{ marginBottom: "10px" }}>
        <ToolLine name="Read" args="career.log" time="  3ms" delay={0} />
      </div>

      <OutputBox delay={0.1}>
        {/* Current role */}
        <div style={{ marginBottom: "16px" }}>
          <OutputLine>
            <span
              style={{
                background: C.yellow,
                color: "#000",
                padding: "1px 6px",
                fontSize: "10px",
                fontFamily: MONO,
                marginRight: "8px",
              }}
            >
              [ACTIVE]
            </span>
            <span style={{ color: C.textBright }}>
              Engineering Manager, Blob Storage
            </span>
          </OutputLine>
          <OutputLine dim>
            {"         Meta · Seattle, WA · Jun 2025 – Present"}
          </OutputLine>
          <div style={{ marginTop: "4px" }}>
            {[
              "Leading petabyte-scale Blob Storage infrastructure",
              "Driving large-scale data transfers for billions of users",
              "Working on confidential high-impact storage projects",
            ].map((h, i) => (
              <OutputLine key={i}>
                <span style={{ color: "rgba(217,119,87,0.6)" }}>▸ </span>
                {h}
              </OutputLine>
            ))}
          </div>
        </div>

        {/* SDM Storage & Platform */}
        <div style={{ marginBottom: "16px" }}>
          <OutputLine>
            <span style={{ color: C.textBright }}>SDM, Storage &amp; Platform</span>
          </OutputLine>
          <OutputLine dim>
            {"Amazon Neptune · AWS · Seattle, WA · Jul 2022 – Jun 2025"}
          </OutputLine>
          <div style={{ marginTop: "4px" }}>
            {[
              "Managed 25+ engineers, 4 teams, 60% of Neptune org",
              "Launched Neptune Analytics at re:Invent 2023",
              "Shipped GraphRAG with Bedrock at re:Invent 2024",
              "Drove tiered oncall + follow-the-sun model",
            ].map((h, i) => (
              <OutputLine key={i}>
                <span style={{ color: "rgba(217,119,87,0.6)" }}>▸ </span>
                {h}
              </OutputLine>
            ))}
          </div>
        </div>

        {/* SDM Storage Layer */}
        <div style={{ marginBottom: "16px" }}>
          <OutputLine>
            <span style={{ color: C.textBright }}>SDM, Storage Layer</span>
          </OutputLine>
          <OutputLine dim>
            {"Amazon Neptune · AWS · Vancouver, BC · Jan 2020 – Jul 2022"}
          </OutputLine>
          <div style={{ marginTop: "4px" }}>
            {[
              "Scaled team 1 → 15 SDEs: Seattle, Vancouver, Bay Area",
              "Expanded Neptune to 22 AWS Regions",
              "NVMe cache: 30% speedup, +$4M ARR",
              "Graph exports: S3 in < 3hrs (was days)",
            ].map((h, i) => (
              <OutputLine key={i}>
                <span style={{ color: "rgba(217,119,87,0.6)" }}>▸ </span>
                {h}
              </OutputLine>
            ))}
          </div>
        </div>

        {/* Sr SDE → Tech Lead */}
        <div style={{ marginBottom: "16px" }}>
          <OutputLine>
            <span style={{ color: C.textBright }}>Sr. Software Engineer → Tech Lead</span>
          </OutputLine>
          <OutputLine dim>
            {"Amazon · AWS · Seattle, WA · Oct 2011 – Dec 2019"}
          </OutputLine>
          <div style={{ marginTop: "4px" }}>
            {[
              "Architected Control Plane for 30K+ global servers",
              "TLS redesign adopted by 4+ AWS services",
              "Multi-tenancy, auth, encryption at rest",
              "Benchmarking infra for version certification",
            ].map((h, i) => (
              <OutputLine key={i}>
                <span style={{ color: "rgba(217,119,87,0.6)" }}>▸ </span>
                {h}
              </OutputLine>
            ))}
          </div>
        </div>

        {/* Yahoo */}
        <div style={{ marginBottom: "16px" }}>
          <OutputLine>
            <span style={{ color: C.textBright }}>Software Engineer Intern, Ad Quality</span>
          </OutputLine>
          <OutputLine dim>
            {"Yahoo! Bangalore · Summer 2011 (3 months)"}
          </OutputLine>
          <div style={{ marginTop: "4px" }}>
            {[
              "Malware detection for ad quality pipeline",
              "Ad signal generation at Yahoo! Bangalore",
            ].map((h, i) => (
              <OutputLine key={i}>
                <span style={{ color: "rgba(217,119,87,0.6)" }}>▸ </span>
                {h}
              </OutputLine>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "8px",
            marginTop: "4px",
          }}
        >
          <OutputLine dim>
            {"Education: B.Tech CSE, NIT Calicut · 2007–2011"}
          </OutputLine>
          <OutputLine dim>
            {EDUCATION.detail}
          </OutputLine>
        </div>
      </OutputBox>
    </motion.section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function CliProjects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3 }}
      style={{
        paddingLeft: "32px",
        paddingRight: "24px",
        paddingBottom: "64px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Prompt command="ls ~/projects/ -la" />

      <div style={{ marginBottom: "10px" }}>
        <ToolLine name="Bash" args="ls ~/projects/ -la" time="  1ms" delay={0} />
      </div>

      <OutputBox delay={0.1}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{ marginBottom: i < PROJECTS.length - 1 ? "16px" : "0" }}>
            <OutputLine>
              <span style={{ color: C.textVeryDim }}>drwxr-xr-x </span>
              <span style={{ color: C.textBright }}>{p.repoName}/</span>
            </OutputLine>
            <OutputLine>
              <span style={{ paddingLeft: "10px", color: C.textDim }}>
                {p.description.split(".")[0]}
              </span>
            </OutputLine>
            {p.tags.length > 0 && (
              <OutputLine dim>
                <span style={{ paddingLeft: "10px" }}>
                  {p.tags.map((t) => t.toLowerCase()).join(" · ")}
                </span>
              </OutputLine>
            )}
            <div style={{ paddingLeft: "10px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {p.app && (
                <FlagLink href={p.app} label="--app" color={C.green} />
              )}
              <FlagLink href={p.page} label="--page" color={C.yellow} />
              <FlagLink href={p.repo} label="--src" color={C.orange} />
            </div>
          </div>
        ))}
      </OutputBox>

      <div style={{ marginTop: "18px" }}>
        <OutputLine>
          <span style={{ color: C.textDim }}>→ </span>
          <a
            href={HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See all projects"
            style={{ color: C.orange, textDecoration: "none", fontFamily: MONO, fontSize: "13px" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
          >
            --all-projects {HUB_URL}
          </a>
        </OutputLine>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{ marginTop: "20px" }}
      >
        <ClaudeText>
          Theme: all AI-native. Claude as the foundation, not the feature.
        </ClaudeText>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{ marginTop: "20px", fontFamily: MONO, fontSize: "13px", color: C.textDim }}
      >
        <span style={{ color: C.orange }}>❯</span>{" "}
        <span style={{ animation: "cc-cursor 1s step-start infinite", color: C.text }}>
          █
        </span>
      </motion.div>
    </motion.section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function CliFooter() {
  return (
    <footer
      style={{
        paddingLeft: "32px",
        paddingRight: "24px",
        paddingBottom: "56px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "48px",
          marginBottom: "24px",
          fontFamily: MONO,
          fontSize: "11px",
          color: C.textVeryDim,
        }}
      >
        {"─".repeat(60)}
      </div>

      <Prompt command="echo $CONTACT" />

      <div style={{ marginBottom: "10px" }}>
        <ToolLine name="Bash" args="echo $CONTACT" time="  0ms" delay={0} />
      </div>

      <OutputBox delay={0.1}>
        <div style={{ whiteSpace: "pre", lineHeight: "1.9" }}>
          <span style={{ color: C.textDim }}>{"email:    "}</span>
          <a
            href={`mailto:${PERSONAL.email}`}
            style={{
              color: C.orange,
              textDecoration: "none",
              fontFamily: MONO,
              fontSize: "13px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.textDecoration = "none")
            }
          >
            {PERSONAL.email}
          </a>
          {"\n"}
          <span style={{ color: C.textDim }}>{"linkedin: "}</span>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: C.orange,
              textDecoration: "none",
              fontFamily: MONO,
              fontSize: "13px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.textDecoration = "none")
            }
          >
            https://linkedin.com/in/k4rthikr
          </a>
          {"\n"}
          <span style={{ color: C.textDim }}>{"github:   "}</span>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: C.orange,
              textDecoration: "none",
              fontFamily: MONO,
              fontSize: "13px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.textDecoration = "none")
            }
          >
            https://github.com/kbrovibes
          </a>
        </div>
      </OutputBox>

      <div
        style={{
          marginTop: "24px",
          fontFamily: MONO,
          fontSize: "11px",
          color: C.textVeryDim,
        }}
      >
        claude-sonnet-4-6 · session complete
      </div>
    </footer>
  );
}

// ── HUD ───────────────────────────────────────────────────────────────────────

function CliHUD() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "32px",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        paddingRight: "16px",
        fontFamily: MONO,
        fontSize: "11px",
        color: C.textDim,
        zIndex: 50,
        gap: "0",
      }}
    >
      <span>
        <span style={{ color: C.orange }}>⬡</span> claude-sonnet-4-6
      </span>
      <span style={{ margin: "0 12px", color: C.textVeryDim }}>·</span>
      <span>
        <span style={{ color: C.orange }}>⏺</span> 4,247 tokens
      </span>
      <span style={{ margin: "0 12px", color: C.textVeryDim }}>·</span>
      <span>↑ 15 tools</span>
      <span style={{ margin: "0 12px", color: C.textVeryDim }}>·</span>
      <span>
        <span style={{ color: C.green }}>●</span> auto
      </span>
      <span style={{ marginLeft: "auto", color: C.textVeryDim }}>ESC to exit</span>
    </div>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function ClaudeCliTheme() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: MONO }}>
      <CliNavWithSelector />
      <div style={{ paddingTop: "44px", paddingBottom: "32px" }}>
        <CliHero />
        <SectionDivider />
        <CliCareer />
        <SectionDivider />
        <CliProjects />
        <CliFooter />
      </div>
      <CliHUD />
    </div>
  );
}
