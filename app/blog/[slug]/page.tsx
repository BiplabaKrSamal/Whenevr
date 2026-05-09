import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/data/posts";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Whenevr`, description: post.desc };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <div className="container max-w-2xl py-20">
        <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <span className="inline-block rounded-full bg-secondary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">{post.tag}</span>
        <h1 className="text-3xl font-semibold tracking-tight leading-tight md:text-4xl">{post.title}</h1>
        <p className="mt-3 text-muted-foreground text-sm">{post.read}</p>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
          <Image src={post.img} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="mt-10 space-y-5">
          {post.content.map((para, i) => (
            <p key={i} className="text-[16px] leading-[1.75] text-foreground/85">{para}</p>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border/60 bg-card p-7">
          <p className="text-sm font-medium">Ready to ship better design faster?</p>
          <p className="mt-1 text-sm text-muted-foreground">Whenevr is a monthly design subscription that moves at your pace.</p>
          <Link href="/#pricing"
            className="mt-4 inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 transition">
            See pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
