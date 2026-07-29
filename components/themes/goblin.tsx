"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { PERSONAL } from "@/lib/portfolio-data";
import ThemeToggle from "@/components/ThemeToggle";
import ShareTheme from "@/components/ShareTheme";

/* ── palette ─────────────────────────────────────────────────────────────── */
const INK = "#1a1030";
const CREAM = "#fff8e7";
const PINK = "#ff2d95";
const YELLOW = "#ffd400";
const CYAN = "#00d4ff";
const PURPLE = "#a855f7";
const GREEN = "#22c55e";
const ORANGE = "#ff7a00";

const FUN: React.CSSProperties = {
  fontFamily:
    '"Comic Sans MS", "Comic Neue", "Chalkboard SE", "Marker Felt", system-ui, sans-serif',
};

const sticker = (rot: number, shadow = INK): React.CSSProperties => ({
  border: `3px solid ${INK}`,
  borderRadius: 18,
  boxShadow: `6px 6px 0 ${shadow}`,
  transform: `rotate(${rot}deg)`,
  background: "#fff",
});

const pop: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: (i ?? 0) * 0.06, type: "spring", stiffness: 240, damping: 18 },
  }),
};

/* ── goofy content (the "director's cut" of the résumé) ──────────────────── */

const STATS = [
  { emoji: "🗓️", value: "15+", label: "years of confidently googling stuff", color: PINK },
  { emoji: "🧑‍💻", value: "25+", label: "engineers who laugh at my jokes (it's in their SLA)", color: CYAN },
  { emoji: "💰", value: "$100M+", label: "ARR I will absolutely take full credit for", color: GREEN },
  { emoji: "🖥️", value: "30K+", label: "servers that quietly fear me", color: PURPLE },
];

const TITLES = [
  "Professional Byte Herder",
  "Chief Vibe Officer",
  "Certified Data Plumber",
  "Senior Manager of Making Graphs Go Brrr",
];

const CAREER = [
  {
    emoji: "🐘",
    period: "Jun 2025 → today",
    role: "Engineering Manager, Blob Storage",
    company: "Meta",
    color: PINK,
    now: true,
    blurb:
      "Currently in charge of the world's biggest game of “move this byte from over here to over there.” It's an exabyte. That's a 1 with 18 zeros. I checked twice. My team keeps the plumbing from exploding while billions of people upload cat pics.",
  },
  {
    emoji: "🔮",
    period: "2022 → 2025",
    role: "Boss of 4 whole teams",
    company: "Amazon Neptune · AWS",
    color: PURPLE,
    blurb:
      "Ran 4 of Neptune's 7 teams (that's 57%, which I round up to “basically all of it”). Shipped fancy graph things at re:Invent while wearing a lanyard. Also fixed on-call so my engineers stopped crying at 3am — happiness went 50% → 90%, mostly by asking them what was wrong. Revolutionary.",
  },
  {
    emoji: "🏗️",
    period: "2020 → 2022",
    role: "Team-grower extraordinaire",
    company: "Amazon Neptune · AWS",
    color: CYAN,
    blurb:
      "Turned 1 engineer into 15 like some kind of sourdough starter. Made queries 30% faster with a cache, which earned ~$4M and exactly zero parades. Also turned “export takes several days” into “export takes an afternoon.” You're welcome, humanity.",
  },
  {
    emoji: "🧙",
    period: "2011 → 2019",
    role: "Wrote the code, became the guy",
    company: "Amazon · AWS",
    color: ORANGE,
    blurb:
      "Eight years of typing until I accidentally architected a whole database's Control Plane. Did a TLS overhaul so good that 4 other teams copied my homework. Peak IC energy. Never touched grass.",
  },
  {
    emoji: "🐣",
    period: "one summer, 2011",
    role: "Baby Intern",
    company: "Yahoo! Bangalore",
    color: GREEN,
    blurb:
      "Fought bad ads for 3 months, graduated college, immediately got a real job. The origin story. There is a Yahoo. It was a company. Ask your parents.",
  },
];

const HACKS = [
  {
    emoji: "🚀",
    title: "engineers = tiny founders",
    body:
      "Give a smart person a problem, the keys, and a fleet of AI robots, then get out of the way. Mini-startups inside a big company ship things the big company legally cannot.",
    color: PINK,
  },
  {
    emoji: "🛠️",
    title: "ship the janky v1",
    body:
      "The prototype teaches you more than the 40-page doc nobody read. Put something ugly in front of users on Tuesday. Fix it by Friday. Repeat forever.",
    color: CYAN,
  },
  {
    emoji: "📈",
    title: "data > my own opinions",
    body:
      "I redesigned on-call by actually measuring when things broke instead of vibes. Turns out 80% of the fires were during business hours. Who knew! (Data knew.)",
    color: GREEN,
  },
  {
    emoji: "🧱",
    title: "build the boring foundation",
    body:
      "The Control Plane I wrote got reused by like 3 other AWS products. Boring infrastructure is a cheat code: build the layer everyone else builds on top of.",
    color: PURPLE,
  },
];

const BANGERS = [
  { emoji: "🥇", title: "Amazon Neptune", note: "was the FIRST engineer. built the Control Plane. it runs 30K+ servers. no big deal *flips hair*" },
  { emoji: "📊", title: "Neptune Analytics", note: "shipped a whole graph engine at re:Invent 2023 with an ETL pipeline 80x faster. eighty. x." },
  { emoji: "🤖", title: "GraphRAG + Bedrock", note: "made the AI smarter by teaching it to follow the graph instead of vibing. demoed live and nothing caught fire." },
  { emoji: "🔐", title: "IAM Auth & TLS", note: "did security so hard that 4 other teams adopted it. i am basically a lock now." },
  { emoji: "⚡", title: "80x faster bulk load", note: "10 million records/sec. could've done 14M but the UX wasn't worth it. self-control: acquired." },
  { emoji: "🌍", title: "26-region expansion", note: "made launching a new region require zero code. GovCloud, China, the works. lazy → scalable pipeline." },
];

const GREMLINS = [
  { emoji: "📈", title: "stonkbro", desc: "options-trading copilot. definitely not financial advice.", url: "https://stonkbro.vercel.app" },
  { emoji: "🏸", title: "snobaddy", desc: "badminton court scheduler for my sports club.", url: "https://snobaddy.vercel.app" },
  { emoji: "🧾", title: "taxbro", desc: "asks the AI scary tax questions so i don't have to.", url: null },
  { emoji: "🦸", title: "superhero-stories", desc: "108 original superhero stories. yes, one hundred and eight.", url: "https://github.com/kbrovibes/superhero-stories" },
  { emoji: "🎨", title: "this very page", desc: "the goofy portfolio you're reading. hi.", url: "https://github.com/kbrovibes/portfolio" },
];

/* ── decorative floating blobs ───────────────────────────────────────────── */
function Blobs() {
  const blobs = [
    { c: PINK, top: "8%", left: "-6%", s: 320, d: 0 },
    { c: CYAN, top: "35%", right: "-8%", s: 360, d: 2 },
    { c: YELLOW, top: "70%", left: "-4%", s: 300, d: 4 },
    { c: PURPLE, top: "88%", right: "-6%", s: 280, d: 1 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: b.top,
            left: (b as { left?: string }).left,
            right: (b as { right?: string }).right,
            width: b.s,
            height: b.s,
            background: b.c,
            borderRadius: "50%",
            filter: "blur(70px)",
            opacity: 0.28,
            animation: `goblin-float-blob ${16 + b.d * 2}s ease-in-out ${b.d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── nav ─────────────────────────────────────────────────────────────────── */
function GoblinNav() {
  return (
    <div
      style={{
        ...FUN,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(255,248,231,0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: `3px solid ${INK}`,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none", color: INK, fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>🧌</span>
          kbro
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontSize: 22 }} aria-label="LinkedIn">💼</a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontSize: 22 }} aria-label="GitHub">🐙</a>
          <a href={`mailto:${PERSONAL.email}`} style={{ textDecoration: "none", fontSize: 22 }} aria-label="Email">✉️</a>
        </div>
      </div>
    </div>
  );
}

/* ── hero ────────────────────────────────────────────────────────────────── */
function GoblinHero() {
  const [titleIdx, setTitleIdx] = useState(0);
  return (
    <section style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "110px 20px 40px", textAlign: "center" }}>
      {/* avatar sticker — pink blob behind blends its pink background into the page */}
      <div style={{ position: "relative", width: 240, height: 240, margin: "0 auto 24px" }}>
        <div
          style={{
            position: "absolute",
            inset: -22,
            background: `radial-gradient(circle, ${PINK} 0%, ${PINK} 55%, transparent 72%)`,
            borderRadius: "50%",
            filter: "blur(14px)",
            opacity: 0.85,
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          whileHover={{ rotate: 3, scale: 1.04 }}
          style={{
            position: "relative",
            width: 240,
            height: 240,
            borderRadius: 28,
            border: `5px solid #fff`,
            outline: `4px solid ${INK}`,
            boxShadow: `8px 8px 0 ${INK}`,
            overflow: "hidden",
          }}
        >
          <Image src="/photo/goblin-avatar.png" alt="Karthik, but make it pop-art" fill sizes="240px" style={{ objectFit: "cover" }} priority />
        </motion.div>
        <div style={{ position: "absolute", top: -26, right: -10, fontSize: 40, animation: "goblin-bounce 2.4s ease-in-out infinite" }}>👑</div>
        <div style={{ position: "absolute", bottom: -14, left: -18, fontSize: 30, animation: "goblin-wiggle 2s ease-in-out infinite" }}>✨</div>
      </div>

      <motion.h1
        variants={pop}
        initial="hidden"
        animate="visible"
        style={{ fontSize: "clamp(44px, 9vw, 86px)", fontWeight: 900, color: INK, letterSpacing: "-1px", margin: "0 0 6px", lineHeight: 1 }}
      >
        KARTHIK{" "}
        <span style={{ background: `linear-gradient(90deg, ${PINK}, ${ORANGE}, ${PURPLE})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          RAJAN
        </span>
      </motion.h1>

      {/* click-to-cycle silly title */}
      <button
        onClick={() => setTitleIdx((i) => (i + 1) % TITLES.length)}
        style={{
          ...FUN,
          display: "inline-block",
          marginTop: 6,
          marginBottom: 4,
          background: YELLOW,
          border: `3px solid ${INK}`,
          borderRadius: 999,
          boxShadow: `4px 4px 0 ${INK}`,
          padding: "8px 20px",
          fontSize: "clamp(16px, 2.6vw, 22px)",
          fontWeight: 800,
          color: INK,
          cursor: "pointer",
          transform: "rotate(-1.5deg)",
        }}
        title="click me, i change"
      >
        {TITLES[titleIdx]} <span style={{ fontSize: 14, opacity: 0.6 }}>(tap me →)</span>
      </button>

      <p style={{ maxWidth: 560, margin: "16px auto 0", fontSize: 17, color: INK, opacity: 0.8, lineHeight: 1.55 }}>
        Engineering Manager at Meta. I move <b>one exabyte</b> of data around, allegedly one byte at a time.
        Spent 14 years at Amazon making graph databases go <i>brrr</i>. This is my résumé, but honest. 🫡
      </p>

      {/* controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", alignItems: "center", marginTop: 26 }}>
        <ShareTheme variant="goblin" />
        <a
          href={PERSONAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...FUN, textDecoration: "none", background: CYAN, border: `3px solid ${INK}`, borderRadius: 999, boxShadow: `3px 3px 0 ${INK}`, padding: "8px 18px", fontSize: 15, fontWeight: 800, color: INK, transform: "rotate(1.5deg)" }}
        >
          🤝 let&apos;s connect
        </a>
      </div>

      {/* theme switcher — dark card so the toggle's light text stays legible */}
      <div style={{ marginTop: 30, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10, background: INK, border: `3px solid ${INK}`, borderRadius: 16, boxShadow: `5px 5px 0 ${PINK}`, padding: "14px 18px" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", opacity: 0.75, textTransform: "uppercase", letterSpacing: 1 }}>too silly? switch it up 👇</span>
        <ThemeToggle />
      </div>
    </section>
  );
}

/* ── stats ───────────────────────────────────────────────────────────────── */
function GoblinStats() {
  return (
    <section style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "20px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={pop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ ...sticker(i % 2 ? 1.5 : -1.5), padding: "18px 16px", textAlign: "center" }}
          >
            <div style={{ fontSize: 34, marginBottom: 4 }}>{s.emoji}</div>
            <div style={{ fontSize: 38, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: INK, opacity: 0.75, marginTop: 6, lineHeight: 1.35 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── section heading helper ──────────────────────────────────────────────── */
function Heading({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <motion.h2
      variants={pop}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        ...FUN,
        display: "inline-block",
        background: bg,
        border: `3px solid ${INK}`,
        borderRadius: 14,
        boxShadow: `5px 5px 0 ${INK}`,
        padding: "8px 20px",
        fontSize: "clamp(24px, 4vw, 34px)",
        fontWeight: 900,
        color: INK,
        transform: "rotate(-1deg)",
        margin: "0 0 26px",
      }}
    >
      {children}
    </motion.h2>
  );
}

/* ── career ──────────────────────────────────────────────────────────────── */
function GoblinCareer() {
  return (
    <section style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "44px 20px" }}>
      <Heading bg={PINK}>💼 the résumé: director&apos;s cut</Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {CAREER.map((c, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={pop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            style={{ ...sticker(i % 2 ? 0.8 : -0.8), padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <div style={{ fontSize: 40, flexShrink: 0, lineHeight: 1 }}>{c.emoji}</div>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 19, fontWeight: 900, color: INK }}>{c.role}</span>
                {c.now && (
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: GREEN, border: `2px solid ${INK}`, borderRadius: 999, padding: "1px 8px", animation: "goblin-bounce 1.6s ease-in-out infinite" }}>
                    ← here now! 👋
                  </span>
                )}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: c.color, marginBottom: 8 }}>
                {c.company} · <span style={{ opacity: 0.6, color: INK }}>{c.period}</span>
              </div>
              <p style={{ fontSize: 15, color: INK, opacity: 0.85, lineHeight: 1.55, margin: 0 }}>{c.blurb}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── management hacks ────────────────────────────────────────────────────── */
function GoblinHacks() {
  return (
    <section style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "44px 20px" }}>
      <Heading bg={CYAN}>🎮 management cheat codes</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        {HACKS.map((h, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={pop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ ...sticker(i % 2 ? 1 : -1), padding: "18px", borderTop: `10px solid ${h.color}` }}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>{h.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: INK, marginBottom: 6 }}>{h.title}</div>
            <p style={{ fontSize: 14, color: INK, opacity: 0.82, lineHeight: 1.5, margin: 0 }}>{h.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── bangers (shipped) ───────────────────────────────────────────────────── */
function GoblinBangers() {
  return (
    <section style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "44px 20px" }}>
      <Heading bg={YELLOW}>🏆 certified bangers (no cap)</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {BANGERS.map((b, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={pop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ ...sticker(i % 2 ? -1 : 1), padding: "16px 18px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 30 }}>{b.emoji}</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: INK }}>{b.title}</span>
            </div>
            <p style={{ fontSize: 14, color: INK, opacity: 0.82, lineHeight: 1.5, margin: 0 }}>{b.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── weekend gremlins (side projects) ────────────────────────────────────── */
function GoblinGremlins() {
  return (
    <section style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "44px 20px" }}>
      <Heading bg={PURPLE}>🛸 weekend gremlin projects</Heading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {GREMLINS.map((g, i) => {
          const inner = (
            <>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{g.emoji}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>
                {g.title} {g.url && <span style={{ fontSize: 13, color: PINK }}>↗</span>}
              </div>
              <p style={{ fontSize: 14, color: INK, opacity: 0.8, lineHeight: 1.45, margin: "6px 0 0" }}>{g.desc}</p>
            </>
          );
          const style = { ...sticker(i % 2 ? 1.2 : -1.2), padding: "16px 18px", textDecoration: "none", display: "block" } as React.CSSProperties;
          return (
            <motion.div key={i} custom={i} variants={pop} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {g.url ? (
                <a href={g.url} target="_blank" rel="noopener noreferrer" style={style}>{inner}</a>
              ) : (
                <div style={style}>{inner}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ── footer ──────────────────────────────────────────────────────────────── */
function GoblinFooter() {
  return (
    <footer style={{ ...FUN, position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "30px 20px 60px", textAlign: "center" }}>
      <div style={{ ...sticker(-1), display: "inline-block", padding: "24px 30px", background: `linear-gradient(120deg, ${PINK}, ${ORANGE}, ${YELLOW})` }}>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", textShadow: `2px 2px 0 ${INK}`, marginBottom: 10 }}>
          ok you scrolled all the way down 🫶
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href={`mailto:${PERSONAL.email}`} style={{ textDecoration: "none", background: "#fff", border: `3px solid ${INK}`, borderRadius: 999, padding: "8px 16px", fontWeight: 800, color: INK }}>✉️ email me</a>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#fff", border: `3px solid ${INK}`, borderRadius: 999, padding: "8px 16px", fontWeight: 800, color: INK }}>💼 linkedin</a>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#fff", border: `3px solid ${INK}`, borderRadius: 999, padding: "8px 16px", fontWeight: 800, color: INK }}>🐙 github</a>
          <span style={{ display: "inline-flex" }}><ShareTheme variant="goblin" /></span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: INK, opacity: 0.55, marginTop: 20 }}>
        no engineers were harmed in the making of this résumé. 🧌 goblin mode™
      </p>
    </footer>
  );
}

/* ── export ──────────────────────────────────────────────────────────────── */
export default function GoblinTheme() {
  return (
    <div style={{ ...FUN, position: "relative", minHeight: "100vh", background: CREAM, color: INK, overflowX: "hidden" }}>
      <Blobs />
      <GoblinNav />
      <GoblinHero />
      <GoblinStats />
      <GoblinCareer />
      <GoblinHacks />
      <GoblinBangers />
      <GoblinGremlins />
      <GoblinFooter />
    </div>
  );
}
