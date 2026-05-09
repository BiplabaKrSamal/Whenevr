"use client";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Subscribe to a plan",
    desc: "Pick the plan that matches your pace. No contracts, no minimums — pause or cancel whenever.",
  },
  {
    n: "02",
    title: "Submit your first request",
    desc: "Drop a task into your board with a brief. Include a Loom if it helps. We start the same day.",
  },
  {
    n: "03",
    title: "Review and iterate",
    desc: "Get a draft within 24–48 hours. Give feedback over Loom or comment directly. Revisions are included.",
  },
  {
    n: "04",
    title: "Ship and repeat",
    desc: "Once you approve, we hand off source files. Then we move to the next item in your queue.",
  },
];

function Step({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-revealed="false" className="reveal-up" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      <div className="group flex gap-6 rounded-3xl border border-border/60 bg-card p-7 card-hover">
        <span className="mt-0.5 text-sm font-mono text-muted-foreground/50 shrink-0">{n}</span>
        <div>
          <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 max-w-lg">
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">How it works</span>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Fast by design,<br />
            <span className="font-display font-normal">not by accident.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We replaced meetings with async briefs and replaced slow turnarounds with a 24-hour commitment. Here's what a typical engagement looks like.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((s, i) => <Step key={s.n} {...s} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}
