export const PERSONAL = {
  name: "Karthik Rajan",
  firstName: "Karthik",
  lastName: "Rajan",
  title: "Engineering Manager, Storage Infra @ Meta",
  company: "Meta",
  location: "Snoqualmie, Washington",
  email: "k4rthikr@gmail.com",
  linkedin: "https://www.linkedin.com/in/k4rthikr/",
  github: "https://github.com/kbrovibes",
};

export const HERO_STATS = [
  { value: "15+", label: "Years" },
  { value: "25+", label: "Engineers" },
  { value: "$100M+", label: "ARR Impact" },
  { value: "30K+", label: "Servers" },
];

export const TIMELINE = [
  {
    id: "meta",
    period: "Jun 2025 – Present",
    role: "Engineering Manager, Blob Storage",
    company: "Meta",
    location: "Seattle, WA",
    current: true,
    narrative:
      "Leading the team building Meta's exabyte-scale data transfer infrastructure. My org owns the plumbing that moves data in and out of Meta's global systems — ingestion from production services, large-scale exports feeding ML training pipelines, and reliability systems that operate at the edge of what distributed infrastructure can do.",
    highlights: [
      "Leading infrastructure engineering for Meta Blob Storage at petabyte scale",
      "Driving large-scale data transfer systems serving billions of users",
      "Working on confidential high-impact storage infrastructure projects",
    ],
  },
  {
    id: "neptune-sdm2",
    period: "Jul 2022 – Jun 2025",
    role: "SDM, Storage & Platform",
    company: "Amazon Neptune · AWS",
    location: "Seattle, WA",
    current: false,
    narrative:
      "Led four of Neptune's seven teams through the database's highest-profile era. My org shipped Neptune Analytics at re:Invent 2023 and co-delivered GraphRAG with Amazon Bedrock at re:Invent 2024. Rebuilt the on-call model from the ground up — tiered rotation, follow-the-sun coverage — and drove engineer satisfaction from 50% to over 90%.",
    highlights: [
      "Managed 25+ engineers across 4 global teams — 60% of Neptune org",
      "Launched Neptune Analytics at AWS re:Invent 2023",
      "Shipped GraphRAG in partnership with Amazon Bedrock at re:Invent 2024",
      "Drove tiered oncall + follow-the-sun operational model",
    ],
  },
  {
    id: "neptune-sdm1",
    period: "Jan 2020 – Jul 2022",
    role: "SDM, Storage Layer",
    company: "Amazon Neptune · AWS",
    location: "Vancouver, BC",
    current: false,
    narrative:
      "Built the Neptune Storage team from one engineer to fifteen — across Seattle, Vancouver, and the Bay Area — while simultaneously scaling Neptune from 6 to 22 AWS regions. My team delivered the NVMe cache layer that drove 30% query speedup and ~$4M in incremental ARR, and cut full-graph S3 exports from days to under three hours.",
    highlights: [
      "Scaled storage team 1 → 15 SDEs across Seattle, Vancouver, Bay Area",
      "Expanded Neptune to 22 AWS Regions including GovCloud & Private Cloud",
      "Shipped tiered NVMe cache — 30% query speedup, +$4M ARR",
      "Enabled full graph bulk-exports to S3: days → under 3 hours",
    ],
  },
  {
    id: "neptune-sde",
    period: "Oct 2011 – Dec 2019",
    role: "Sr. Software Engineer → Tech Lead",
    company: "Amazon · AWS",
    location: "Seattle, WA",
    current: false,
    narrative:
      "Eight years as IC and tech lead — the foundation for everything that came after. As tech lead, I owned Neptune's Control Plane architecture, drove a TLS overhaul adopted by four other AWS services, and built the core enterprise feature set from scratch. Those systems have been in production across every Neptune version since.",
    highlights: [
      "Architected Neptune's Control Plane managing 30K+ global servers",
      "Led TLS redesign adopted across 4+ AWS services",
      "Designed core enterprise features: multi-tenancy, auth, encryption at rest",
      "Built benchmarking infrastructure enabling safe Neptune version certification",
    ],
  },
  {
    id: "yahoo",
    period: "Summer 2011 · 3 months",
    role: "Software Engineer Intern, Ad Quality",
    company: "Yahoo! Bangalore",
    location: "Bangalore, India",
    current: false,
    narrative:
      "Three months at Yahoo!'s Bangalore engineering center, working on ad quality pipelines — malware detection signals to catch bad ads before they served. First real exposure to production systems at scale. Graduated from NIT Calicut a few weeks later and joined Amazon.",
    highlights: [
      "Improved ad quality pipeline through malware detection and classification",
      "Worked on ad signal generation at Yahoo!'s Bangalore engineering center",
    ],
  },
];

export const EDUCATION = {
  period: "Jun 2007 – May 2011",
  degree: "B.Tech, Computer Science & Engineering",
  school: "National Institute of Technology, Calicut",
  location: "India",
  detail: "CGPA 8.47/10 · Winner, Mobme Codejam 2011",
};

export const PROJECTS = [
  {
    id: "stonkbro",
    title: "stonkbro",
    description:
      "AI-powered options trading copilot. Live market data, PMCC scanner, real signals — built with Claude + Yahoo Finance.",
    url: "https://stonkbro.vercel.app",
    tags: ["Next.js", "Claude AI", "Supabase", "Vercel"],
    color: "emerald",
  },
  {
    id: "snobaddy",
    title: "snobaddy",
    description:
      "Real-time sports club scheduling and court management. AI-assisted rotation and matchmaking.",
    url: "https://snobaddy.vercel.app",
    tags: ["Next.js", "Supabase", "Tailwind", "Realtime"],
    color: "pink",
  },
  {
    id: "taxbro",
    title: "taxbro",
    description:
      "AI-powered tax research assistant. Ask complex questions, get reasoning-backed answers. Built with Claude for accuracy-critical workflows.",
    url: null,
    tags: ["Claude AI", "Next.js", "TypeScript"],
    color: "amber",
  },
  {
    id: "superhero-stories",
    title: "superhero-stories",
    description:
      "108 original superhero stories across 20 heroes — fully static web app generated with AI. Marvel + DC + Avengers universes.",
    url: "https://github.com/kbrovibes/superhero-stories",
    tags: ["Claude AI", "Shell", "Static"],
    color: "indigo",
  },
  {
    id: "kbrovibes",
    title: "kbrovibes",
    description:
      "GitHub org for weekend vibe-coding sessions. Real tools, real data, real AI — zero stakeholders.",
    url: "https://github.com/kbrovibes",
    tags: [],
    color: "violet",
  },
];

export const TECH_GROUPS = [
  { label: "Cloud & Infra", items: ["Amazon Neptune", "AWS Bedrock", "S3", "CloudWatch", "FedRAMP", "PCIDSS"] },
  { label: "Languages", items: ["Java", "C++", "Python", "TypeScript", "JavaScript"] },
  { label: "Graph & Data", items: ["Gremlin", "SPARQL", "openCypher", "GraphRAG", "PostgreSQL", "Supabase"] },
  { label: "Frontend & AI", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Claude API", "Gemini"] },
];
