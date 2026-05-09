"use client";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    quote: "We replaced two design agency retainers with Whenevr and got faster work, better quality, and kept $6k/month. I genuinely don't know why we waited.",
    name: "Marcus Chen",
    role: "Co-founder & CEO",
    company: "Launchpath",
    avatar: "/assets/t1.jpg",
  },
  {
    quote: "The 24-hour turnaround felt impossible to believe. On day two, I had a polished pitch deck in my inbox. It's changed how we think about shipping design.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Orbit Analytics",
    avatar: "/assets/t2.jpg",
  },
  {
    quote: "Whenevr handles everything from blog graphics to full landing pages. It's the most flexible design tool we have — and it's a person, not a plugin.",
    name: "James Osei",
    role: "Founder",
    company: "Stackr",
    avatar: "/assets/t3.jpg",
  },
  {
    quote: "We paused for a month during a slow period, then picked back up with zero friction. That flexibility alone is worth the price.",
    name: "Sofia Lindqvist",
    role: "Operations Lead",
    company: "Gridline",
    avatar: "/assets/t4.jpg",
  },
];

function Card({ quote, name, role, company, avatar, delay }: typeof testimonials[0] & { delay: number }) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <figure ref={ref} data-revealed="false" className="reveal-up" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      <div className="h-full flex flex-col rounded-3xl border border-border/60 bg-card p-7 card-hover">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-[hsl(38_95%_55%)]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
        <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/90">&ldquo;{quote}&rdquo;</blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <Image src={avatar} alt={name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-xs text-muted-foreground">{role} · {company}</div>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 max-w-lg">
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Testimonials</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            What our subscribers<br />
            <span className="font-display font-normal">actually say.</span>
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => <Card key={t.name} {...t} delay={i * 70} />)}
        </div>
      </div>
    </section>
  );
}
