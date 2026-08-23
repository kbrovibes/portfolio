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

export const HUB_URL = "https://kbrovibes.github.io/";

export type Project = {
  id: string;
  title: string;
  repoName: string;
  description: string;
  /** Live, usable app. Null when the project isn't a hosted web app. */
  app: string | null;
  /** Project landing page hosted on GitHub Pages. */
  page: string;
  /** Source repository. */
  repo: string;
  tags: string[];
  color: string;
  icon: string;
  emoji: string;
};

export const PROJECTS: Project[] = [
  {
    id: "stylecheck",
    title: "Hanger Management",
    repoName: "stylecheck",
    description:
      "AI personal stylist. Catalogues every piece you own, builds a photoreal mannequin of you, and shows you wearing the outfit before you get dressed.",
    app: "https://hangermanagement.vercel.app",
    page: "https://kbrovibes.github.io/stylecheck/",
    repo: "https://github.com/kbrovibes/stylecheck",
    tags: ["Next.js 16", "Supabase", "Gemini", "Vercel"],
    color: "amber",
    icon: "Shirt",
    emoji: "\u{1F454}",
  },
  {
    id: "stonkbro",
    title: "Stonk Bro",
    repoName: "stonkbro",
    description:
      "Options-trading copilot for premium sellers. Live chains, a PMCC scanner, AI research, position tracking, and roll/close signals. Definitely not financial advice.",
    app: "https://stonkbro.vercel.app",
    page: "https://kbrovibes.github.io/stonkbro/",
    repo: "https://github.com/kbrovibes/stonkbro",
    tags: ["Next.js", "Claude AI", "Supabase", "Yahoo Finance"],
    color: "emerald",
    icon: "ChartLine",
    emoji: "\u{1F4C8}",
  },
  {
    id: "marketmath",
    title: "Market Math",
    repoName: "marketmath",
    description:
      "Fundamentals dashboard for the S&P 500. Twenty years of as-filed 10-K data, reverse DCF, transparent quality scores \u2014 every number traceable to an SEC filing.",
    app: "https://marketmath-theta.vercel.app",
    page: "https://kbrovibes.github.io/marketmath/",
    repo: "https://github.com/kbrovibes/marketmath",
    tags: ["Next.js", "Supabase", "SEC EDGAR", "Crons"],
    color: "blue",
    icon: "Calculator",
    emoji: "\u{1F4CA}",
  },
  {
    id: "opencourt",
    title: "Open Court",
    repoName: "opencourt",
    description:
      "Club badminton tournaments that don't feel like spreadsheets. Share a link, tap players into teams, and run the whole bracket from a phone at courtside.",
    app: "https://opencourt-badminton.vercel.app",
    page: "https://kbrovibes.github.io/opencourt/",
    repo: "https://github.com/kbrovibes/opencourt",
    tags: ["Next.js", "Supabase", "Realtime", "PWA"],
    color: "sky",
    icon: "Trophy",
    emoji: "\u{1F3C6}",
  },
  {
    id: "snobaddy",
    title: "Sno Baddy",
    repoName: "snobaddy",
    description:
      "A digital whiteboard for a Monday/Thursday badminton club in Snoqualmie. Sessions, check-ins, match generation, season leaderboards. Wildly over-engineered.",
    app: "https://snobaddy.vercel.app",
    page: "https://kbrovibes.github.io/snobaddy/",
    repo: "https://github.com/kbrovibes/snobaddy",
    tags: ["Next.js", "Supabase", "Tailwind", "Realtime"],
    color: "pink",
    icon: "Shuffle",
    emoji: "\u{1F3F8}",
  },
  {
    id: "wisesplit",
    title: "Wise Split",
    repoName: "wisesplit",
    description:
      "Splitwise without the paywall. Debt-graph settle-up, natural-language quick add, multi-currency, offline PWA. Pure SVG, zero tracking, free forever.",
    app: "https://kbrovibes.github.io/wisesplit/",
    page: "https://kbrovibes.github.io/wisesplit/landing/",
    repo: "https://github.com/kbrovibes/wisesplit",
    tags: ["Next.js", "Supabase", "PWA", "GitHub Pages"],
    color: "teal",
    icon: "Receipt",
    emoji: "\u{1F9FE}",
  },
  {
    id: "superhero-stories",
    title: "Superhero Stories",
    repoName: "superhero-stories",
    description:
      "482 original superhero stories across Marvel, DC, and the Avengers, as a fully static web app. No death, no tragedy \u2014 written for a seven-year-old audience.",
    app: "https://superhero-stories.vercel.app",
    page: "https://kbrovibes.github.io/superhero-stories/",
    repo: "https://github.com/kbrovibes/superhero-stories",
    tags: ["Next.js", "Static Export", "Claude AI"],
    color: "indigo",
    icon: "BookOpen",
    emoji: "\u{1F9B8}",
  },
  {
    id: "bro-toolkit",
    title: "Bro Toolkit",
    repoName: "bro-toolkit",
    description:
      "Portable Mac toolkit \u2014 Claude skills, zsh/tmux configs, and a kbro CLI. One command to set up a new machine, and one command to remove every trace.",
    app: null,
    page: "https://kbrovibes.github.io/bro-toolkit/",
    repo: "https://github.com/kbrovibes/bro-toolkit",
    tags: ["Shell", "Zsh", "Tmux", "Claude Skills"],
    color: "violet",
    icon: "Terminal",
    emoji: "\u{1F9F0}",
  },
  {
    id: "doodle-disaster",
    title: "Doodle Disaster",
    repoName: "doodle-disaster",
    description:
      "A multiplayer draw-and-guess party game. Short room codes, a live shared canvas, chat guessing, and bots to fill the room when your friends flake.",
    app: "https://doodle-disaster.vercel.app",
    page: "https://kbrovibes.github.io/doodle-disaster/",
    repo: "https://github.com/kbrovibes/doodle-disaster",
    tags: ["Next.js", "Canvas", "PWA"],
    color: "rose",
    icon: "Pencil",
    emoji: "\u{1F58D}",
  },
  {
    id: "taxbro",
    title: "Tax Bro",
    repoName: "taxbro",
    description:
      "A Claude Code assistant for US federal returns. Point it at a folder of W-2s, 1099s and receipts \u2014 it reads everything in one pass and builds a structured dashboard. Not tax advice.",
    app: null,
    page: "https://kbrovibes.github.io/taxbro/",
    repo: "https://github.com/kbrovibes/taxbro",
    tags: ["Claude Code", "TypeScript"],
    color: "amber",
    icon: "FileText",
    emoji: "\u{1F9FE}",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    repoName: "portfolio",
    description:
      "This very site. One r\u00e9sum\u00e9 dataset rendered through completely different visual themes \u2014 a polished dark portfolio, a monospace CLI, and a deliberately goofy sticker mode.",
    app: "https://karthikrajan.info",
    page: "https://kbrovibes.github.io/portfolio/",
    repo: "https://github.com/kbrovibes/portfolio",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    color: "violet",
    icon: "Palette",
    emoji: "\u{1F3A8}",
  },
];

export const TECH_GROUPS = [
  { label: "Cloud & Infra", items: ["Amazon Neptune", "AWS Bedrock", "S3", "CloudWatch", "FedRAMP", "PCIDSS"] },
  { label: "Languages", items: ["Java", "C++", "Python", "TypeScript", "JavaScript"] },
  { label: "Graph & Data", items: ["Gremlin", "SPARQL", "openCypher", "GraphRAG", "PostgreSQL", "Supabase"] },
  { label: "Frontend & AI", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Claude API", "Gemini"] },
];

export const SHIPPED_PROJECTS = [
  {
    id: "amazon-neptune",
    title: "Amazon Neptune",
    era: "2015 – 2019",
    roleLabel: "Founding SDE / Tech Lead",
    tagline: "AWS's first fully managed graph database — built the Control Plane from scratch.",
    impact: "GA at re:Invent 2017 · 30K+ servers globally",
    body: "I was the first SDE on Neptune, architecting its Control Plane using a 'powered by Aurora' design that separated graph storage from the compute layer. This pattern was later adopted to build DocumentDB and Timestream. The Control Plane I wrote manages provisioning, authentication, encryption, region expansion, and lifecycle for every Neptune instance running in production.",
    refs: [
      { label: "Amazon Neptune", url: "https://aws.amazon.com/neptune/" },
      { label: "Titan on DynamoDB (origin story)", url: "https://aws.amazon.com/blogs/big-data/building-a-graph-database-on-aws-using-amazon-dynamodb-and-titan/" },
    ],
    tags: ["Control Plane", "AWS", "Graph Database", "Founding"],
    color: "amber",
  },
  {
    id: "neptune-analytics",
    title: "Neptune Analytics",
    era: "2022 – 2023",
    roleLabel: "SDM, Storage & Control Plane",
    tagline: "New graph analytics engine — built four teams' worth of it, shipped at re:Invent 2023.",
    impact: "Launched re:Invent 2023 · GA 2024",
    body: "I led the Control Plane, ETL Storage, and Offbox Compute teams delivering Neptune Analytics. My org shipped the ground-up Control Plane, an ETL pipeline 80x faster than Neptune Database, and Blue-Green patching from Day 1 so customers could upgrade without downtime from the moment we launched.",
    refs: [
      { label: "Neptune Analytics", url: "https://aws.amazon.com/neptune/analytics/" },
      { label: "Introducing Neptune Analytics", url: "https://aws.amazon.com/blogs/database/introducing-amazon-neptune-analytics/" },
    ],
    tags: ["Graph Analytics", "re:Invent 2023", "Control Plane", "AWS"],
    color: "blue",
  },
  {
    id: "graphrag-bedrock",
    title: "GraphRAG with Amazon Bedrock",
    era: "2024",
    roleLabel: "SDM, Neptune + Bedrock",
    tagline: "Graph-powered retrieval-augmented generation — shipped live at re:Invent 2024.",
    impact: "GA · Demoed live at re:Invent 2024",
    body: "In partnership with Amazon Bedrock, my team delivered GraphRAG — replacing pure vector similarity search with structured graph traversal over Neptune knowledge graphs. Unlike KNN retrieval, GraphRAG follows entity relationships to produce causally linked, contextually richer AI responses. Announced and shipped at re:Invent 2024.",
    refs: [
      { label: "Bedrock Knowledge Bases GraphRAG (GA)", url: "https://aws.amazon.com/about-aws/whats-new/2024/12/amazon-bedrock-knowledge-bases-graph-rag-generally-available/" },
      { label: "Building with Neptune and Bedrock", url: "https://aws.amazon.com/blogs/database/build-generative-ai-applications-with-amazon-bedrock-and-amazon-neptune/" },
    ],
    tags: ["GraphRAG", "Amazon Bedrock", "GenAI", "re:Invent 2024"],
    color: "violet",
  },
  {
    id: "iam-auth-tls",
    title: "IAM Auth & TLS Overhaul",
    era: "2018 – 2019",
    roleLabel: "Tech Lead, Neptune",
    tagline: "Zero-trust authentication and hardened TLS for Neptune — adopted across AWS.",
    impact: "Architecture adopted by 4+ AWS services",
    body: "I led Neptune's IAM authentication layer and a full TLS redesign. The TLS architecture was subsequently adopted by four other AWS services. This project established the auth primitives — IAM principals, request signing, encryption at rest — that remain Neptune's security foundation across every version since.",
    refs: [
      { label: "Neptune IAM authentication", url: "https://docs.aws.amazon.com/neptune/latest/userguide/iam-auth.html" },
      { label: "Neptune encryption at rest", url: "https://docs.aws.amazon.com/neptune/latest/userguide/encrypt.html" },
    ],
    tags: ["Security", "IAM", "TLS", "Cross-service"],
    color: "emerald",
  },
  {
    id: "etl-80x",
    title: "ETL: 80x Faster Bulk Load",
    era: "2022 – 2023",
    roleLabel: "SDM, Neptune Analytics Storage",
    tagline: "New in-memory ETL model for Neptune Analytics — 10M+ records/sec.",
    impact: "80x faster than Neptune DB · 10M+ records/sec",
    body: "My team redesigned Neptune Analytics' bulk load pipeline with a new in-memory execution model running close to storage, eliminating serialization overhead. We ran data-driven experiments at each layer and achieved 10MM+ records/second end-to-end. We stopped at 10MM/s — the theoretical max was ~14MM/s, but the UX tradeoff outweighed the extra engineering cost.",
    refs: [
      { label: "Neptune Analytics import overview", url: "https://docs.aws.amazon.com/neptune-analytics/latest/userguide/importing-overview.html" },
    ],
    tags: ["ETL", "Performance", "Storage", "Bulk Load"],
    color: "pink",
  },
  {
    id: "nvme-cache",
    title: "Tiered NVMe Cache Layer",
    era: "2021 – 2022",
    roleLabel: "SDM, Neptune Storage",
    tagline: "NVMe-backed buffer pool for hot graph data — 30% query speedup.",
    impact: "30% query speedup · ~$4M incremental ARR",
    body: "A tiered NVMe cache between the in-memory buffer pool and S3-backed storage. This was a high-risk change to a component considered code-complete, requiring careful coordination across the storage and engine teams. Result: 30% query speedup on read-heavy workloads and approximately $4M in incremental ARR.",
    refs: [
      { label: "Neptune instance types", url: "https://docs.aws.amazon.com/neptune/latest/userguide/instance-types.html" },
    ],
    tags: ["NVMe", "Storage", "Performance", "$4M ARR"],
    color: "amber",
  },
  {
    id: "blue-green-patching",
    title: "Blue-Green Patching",
    era: "2023",
    roleLabel: "SDM, Neptune Analytics Platform",
    tagline: "Zero-downtime engine upgrades for Neptune Analytics, built in from Day 1.",
    impact: "Day-1 GA feature · zero breaking changes shipped post-launch",
    body: "Blue-Green patching was a Day-1 tenet for Neptune Analytics. I enforced backwards compatibility through automated breaking-change detection in dev pipelines — any PR that would break existing graphs gets caught before merge. Added a self-serve patching dashboard and weekly service health metrics so operators never need to engage engineering to understand patch state.",
    refs: [
      { label: "Neptune Analytics maintenance", url: "https://docs.aws.amazon.com/neptune-analytics/latest/userguide/maintenance.html" },
    ],
    tags: ["Zero Downtime", "DevOps", "Compliance", "Day-1"],
    color: "indigo",
  },
  {
    id: "region-expansion",
    title: "Neptune Region Expansion",
    era: "2020 – 2025",
    roleLabel: "SDM, Neptune Platform",
    tagline: "Metadata-driven expansion across 26 AWS regions — zero SME knowledge required.",
    impact: "26 regions · 500K+ ARR per 5-region batch",
    body: "I owned Neptune's Region Build Automation, moving from blackbox scripts to metadata-driven expansion where new regions launch with zero code changes. Covered commercial, FedRAMP GovCloud, Amazon Private Cloud, and China regions. By eliminating SME dependencies, we could commit to 5+ new regions per year and consistent ARR growth without scaling the team.",
    refs: [
      { label: "Neptune regional availability", url: "https://aws.amazon.com/neptune/faqs/" },
      { label: "Neptune in AWS GovCloud", url: "https://docs.aws.amazon.com/govcloud-us/latest/UserGuide/govcloud-neptune.html" },
    ],
    tags: ["Region Expansion", "GovCloud", "FedRAMP", "Revenue"],
    color: "sky",
  },
  {
    id: "oncall-transformation",
    title: "On-call Transformation",
    era: "2021 – 2023",
    roleLabel: "SDM, Neptune Org",
    tagline: "Follow-the-sun rotation rebuilt from data — satisfaction went from 50% to 90%.",
    impact: "50% to 90% eng satisfaction · 2x coverage with 20% headcount growth",
    body: "Neptune's on-call was broken: flat rotation, vague responsibilities, burnt-out SDEs. I rebuilt it from data — measuring when Sev2s actually arrived by timezone (80% in PST business hours), designing follow-the-sun shifts accordingly, adding tiered escalation so recurring issues get root-caused. Cleaned up ticket routing, rewrote SOPs, embedded oncall metrics into weekly leadership reviews.",
    refs: [],
    tags: ["Operational Excellence", "On-call", "Org Health", "Process"],
    color: "rose",
  },
  {
    id: "offbox-compute",
    title: "Offbox Compute Fleet",
    era: "2022 – 2023",
    roleLabel: "SDM, Neptune Analytics Storage",
    tagline: "Redesigned storage and log replay to unlock scalable offbox compute.",
    impact: "Unblocked Snapshot Restore, Offbox CSS, Index Rebuild",
    body: "Neptune Analytics' Offbox Compute Fleet required reopening storage and log replay logic that was considered code-complete. My team redesigned these components for offbox execution and pushed the changes through — unblocking not just Offbox Compute, but also enabling Snapshot Restore, Offbox CSS, and Index Rebuild as downstream features.",
    refs: [
      { label: "Neptune Analytics snapshots", url: "https://docs.aws.amazon.com/neptune-analytics/latest/userguide/using-snapshots.html" },
    ],
    tags: ["Distributed Systems", "Storage Engine", "Compute", "Architecture"],
    color: "teal",
  },
];
