"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

function Card({ post, featured, delay }: { post: typeof posts[0]; featured?: boolean; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-revealed="false" className="reveal-up" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      <Link href={`/blog/${post.slug}`}
        className={cn(
          "group flex h-full flex-col rounded-3xl overflow-hidden border border-border/60 bg-card card-hover",
          featured && "md:flex-row"
        )}>
        <div className={cn("relative overflow-hidden shrink-0", featured ? "md:w-[55%] aspect-[4/3] md:aspect-auto" : "aspect-[16/9]")}>
          <Image src={post.img} alt={post.title} fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width:768px) 100vw, 55vw" : "(max-width:640px) 100vw, 33vw"} />
        </div>
        <div className="flex flex-col justify-between p-7 flex-1">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">{post.tag}</span>
            <h3 className={cn("font-semibold leading-snug tracking-tight", featured ? "text-2xl" : "text-base")}>{post.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.desc}</p>
          </div>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.read}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Blog() {
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);
  return (
    <section id="blog" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Blog</span>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Thoughts on <span className="font-display font-normal">design.</span>
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View all posts <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="space-y-4">
          <Card post={featured} featured delay={0} />
          <div className="grid gap-4 sm:grid-cols-3">
            {rest.map((p, i) => <Card key={p.slug} post={p} delay={(i + 1) * 70} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
