"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const faqs = [
  {
    q: "What exactly counts as a design request?",
    a: "Almost anything visual: a landing page, a slide deck, a set of social graphics, an app screen, an icon set, a logo tweak, an email template. If it's a discrete design task, it qualifies. The main exception is complex motion graphics or 3D rendering, which we scope separately.",
  },
  {
    q: "How does the queue actually work?",
    a: "We work on one request at a time per subscription. Once you approve or request changes, we finalize and move to the next task. Pro subscribers get two simultaneous active requests, so delivery doubles. Everything is managed in a shared Linear board.",
  },
  {
    q: "What's your actual turnaround?",
    a: "First drafts are typically in your inbox within 24 hours of a clear brief. Complex work (full landing pages, multi-slide decks) may take 48 hours. We work Monday–Friday across US and EU time zones.",
  },
  {
    q: "Can I pause or cancel?",
    a: "Yes, anytime. Pausing freezes your billing cycle and saves unused days. Cancelling stops the next billing cycle immediately. No penalty, no questions. You keep all source files from completed work.",
  },
  {
    q: "What tools do you use?",
    a: "Figma for all UI, web, and product design. Adobe Illustrator and Photoshop for print-ready assets and retouching. Keynote and PowerPoint for pitch decks when needed. All deliverables are handed off in editable source files.",
  },
  {
    q: "Do I own the work?",
    a: "Completely. You receive full IP ownership of everything we produce for you — source files included. We retain the right to show the work in our portfolio unless you request otherwise.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Monthly plans have no minimum. You can cancel after your first month. Annual plans are billed upfront and save you 20%.",
  },
];

function Item({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-revealed="false" className="reveal-up" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      <div className={cn("rounded-2xl border border-border/60 overflow-hidden transition-colors duration-200", open ? "bg-card" : "bg-transparent hover:bg-card/60")}>
        <button type="button" onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 p-6 text-left"
          aria-expanded={open}>
          <span className="font-medium leading-snug">{q}</span>
          <span className={cn("shrink-0 grid h-7 w-7 place-items-center rounded-full border border-border/80 transition-transform duration-300", open && "rotate-0")}>
            {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </span>
        </button>
        <div className={cn("grid transition-all duration-300 ease-in-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="overflow-hidden">
            <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary/20">
      <div className="container">
        <div className="mb-14 max-w-lg">
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">FAQ</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Common <span className="font-display font-normal">questions.</span>
          </h2>
        </div>
        <div className="max-w-3xl space-y-3">
          {faqs.map((f, i) => <Item key={f.q} {...f} delay={i * 50} />)}
        </div>
      </div>
    </section>
  );
}
