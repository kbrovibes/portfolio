import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import LoggingOut from "@/app/blog/posts/logging-out";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Karthik Rajan`,
    description: post.description,
  };
}

const POST_COMPONENTS: Record<string, React.ComponentType> = {
  "logging-out": LoggingOut,
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const PostContent = POST_COMPONENTS[slug];
  if (!PostContent) notFound();

  return <PostContent />;
}
