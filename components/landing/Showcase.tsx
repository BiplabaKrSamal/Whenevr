"use client";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const works = [
  { src: "/assets/work-1.jpg", tag: "Landing Page",  title: "SaaS hero section rebrand" },
  { src: "/assets/work-2.jpg", tag: "Pitch Deck",    title: "Series A fundraise deck" },
  { src: "/assets/work-3.jpg", tag: "App UI",        title: "Dashboard redesign" },
  { src: "/assets/work-4.jpg", tag: "Branding",      title: "Full identity refresh" },
];

export default function Showcase() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section id="showcase" className="py-24 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Work</span>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Recent <span className="font-display font-normal">projects</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">A small sample of what we ship every week for our subscribers.</p>
        </div>

        <div ref={ref} data-revealed="false" className="reveal-up grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {works.map((w) => (
            <div key={w.title} className="group relative overflow-hidden rounded-2xl bg-card card-hover aspect-[3/4]">
              <Image src={w.src} alt={w.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="mb-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90">{w.tag}</span>
                <p className="text-sm font-semibold text-white leading-tight">{w.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
