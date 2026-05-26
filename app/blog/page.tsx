import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing — Karthik Rajan",
  description: "Thoughts on engineering leadership, distributed systems, and the occasional trip down memory lane.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "#0a0a12" }}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/[0.04]" style={{ background: "rgba(10,10,18,0.85)" }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>karthikrajan.dev</span>
          </Link>
          <span className="text-sm font-semibold text-white/60">
            Writing<span className="text-violet-400">.</span>
          </span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400 font-semibold mb-4 flex items-center gap-3">
            <span className="block w-8 h-px bg-violet-500/50" />
            Writing
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4">
            Things I&apos;ve written
          </h1>
          <p className="text-white/40 text-lg max-w-lg leading-relaxed">
            Engineering leadership, distributed systems, and the occasional trip down memory lane.
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article
                className="relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300 group-hover:border-violet-500/30"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {/* Gradient accent bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${post.coverAccent}`}
                />

                <div className="p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.05] text-white/40 border border-white/[0.07]"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-violet-200 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm font-medium text-amber-400/80 mb-3 italic">{post.subtitle}</p>
                  <p className="text-white/45 text-base leading-relaxed mb-6 max-w-2xl">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-white/25">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="text-sm text-violet-400/70 group-hover:text-violet-400 transition-colors font-medium">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-20 text-center text-xs text-white/15">
          More posts coming. Eventually.
        </p>
      </div>
    </main>
  );
}
