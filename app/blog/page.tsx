import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";

export const metadata = { title: "Blog — Whenevr", description: "Thoughts on design, process, and building lean." };

export default function BlogPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight mb-12 md:text-5xl">
          Thoughts on <span className="font-display font-normal">design.</span>
        </h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card card-hover">
              <div className="relative aspect-video overflow-hidden">
                <Image src={post.img} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw" />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <span className="inline-block rounded-full bg-secondary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">{post.tag}</span>
                <h2 className="font-semibold leading-snug tracking-tight">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.desc}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.read}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
