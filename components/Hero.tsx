"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stat: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const STATS = [
  { value: "15+", label: "Years" },
  { value: "25+", label: "Engineers" },
  { value: "$100M+", label: "ARR Impact" },
  { value: "30K+", label: "Servers" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(139,92,246,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 75%)",
        }}
      />

      {/* Animated background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "float-orb 22s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -right-20 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "float-orb-2 17s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,130,251,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "float-orb-3 14s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide
              bg-blue-500/10 border border-blue-500/20 text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Engineering Manager · Meta · Blob Storage
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl sm:text-7xl lg:text-[92px] font-black leading-[0.92] tracking-[-3px] mb-6"
          >
            <span className="text-white">Karthik</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #8B5CF6 0%, #EC4899 55%, #3B82F6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rajan
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/40 font-light leading-relaxed mb-3 max-w-2xl"
          >
            Currently at{" "}
            <span className="text-white/80 font-medium">Meta Blob Storage</span>
            {", "}building petabyte-scale infrastructure. Previously{" "}
            <span className="text-white/80 font-medium">14 years at Amazon Neptune</span>{" "}
            — SDE to leading 4 teams and{" "}
            <span className="text-white/80 font-medium">60% of the org</span>.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-sm text-white/25 mb-12"
          >
            <MapPin size={13} />
            <span>Snoqualmie, Washington</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-20">
            <a
              href="#professional"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                text-white transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, #8B5CF6, #EC4899)",
              }}
            >
              View My Work
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="mailto:k4rthikr@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm
                bg-white/[0.06] border border-white/[0.1] text-white/70
                hover:bg-white/[0.1] hover:text-white hover:border-white/20
                transition-all duration-200"
            >
              Say Hello
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden
              border border-white/[0.06] bg-white/[0.06]"
          >
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={stat}
                className="flex flex-col items-center justify-center py-5 px-4
                  bg-[#0a0a12] hover:bg-white/[0.03] transition-colors"
              >
                <span
                  className="text-2xl sm:text-3xl font-black tracking-tight mb-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5CF6, #EC4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-semibold">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center gap-3 text-white/20"
          >
            <Zap size={12} className="text-violet-500/60" />
            <span className="text-xs tracking-widest uppercase">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
