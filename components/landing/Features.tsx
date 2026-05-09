"use client";
import { Zap, RefreshCw, Pause, Lock, Users, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const features = [
  { icon: Zap,       title: "24-hour turnaround",   desc: "Most requests are delivered within one business day. Never wait a week for a mockup." },
  { icon: RefreshCw, title: "Unlimited revisions",   desc: "Iterate until it's right. We don't cap revisions — we cap bad design." },
  { icon: Pause,     title: "Pause anytime",         desc: "Taking a sprint off? Pause your subscription and resume when you're ready." },
  { icon: Lock,      title: "You own everything",    desc: "Full source files handed off on every delivery. No vendor lock-in." },
  { icon: Users,     title: "Async, no calls",       desc: "Drop a brief, review a Loom. No meetings unless you want them." },
  { icon: Layers,    title: "One request at a time", desc: "We stay focused on one task per turn so quality never slips." },
];

function Card({ icon: Icon, title, desc, delay }: { icon: typeof Zap; title: string; desc: string; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-revealed="false" className="reveal-up" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      <div className="h-full group rounded-3xl border border-border/60 bg-card p-7 card-hover flex flex-col gap-4">
        <div className="h-10 w-10 rounded-xl bg-secondary grid place-items-center text-foreground/70 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 max-w-lg">
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Features</span>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Everything you need,<br />
            <span className="font-display font-normal">nothing you don't.</span>
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => <Card key={f.title} {...f} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}
