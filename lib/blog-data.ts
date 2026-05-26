export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  description: string;
  coverAccent: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "logging-out",
    title: "K1: Logging Out",
    subtitle: "Random trivia from the early days of Neptune that no one asked for — but you're getting anyway.",
    date: "2025-06-01",
    readTime: "8 min read",
    tags: ["Amazon", "Neptune", "Farewell", "Nostalgia"],
    description:
      "A farewell note from 14 years at Amazon. Neptune origin stories, the first commit, the re:Invent top-5 moment, and the people who made it worth every line of code.",
    coverAccent: "from-amber-600/40 via-orange-500/20 to-rose-600/30",
  },
];
