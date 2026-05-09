"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/components/booking/BookingDialog";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Plan {
  name: string;
  monthly: number;
  annually: number;
  desc: string;
  highlight: boolean;
  badge?: string;
  custom?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Standard",
    monthly: 4995,
    annually: 3996,
    desc: "Great for early-stage startups or solo founders who need consistent design output.",
    highlight: false,
    features: [
      "One active request at a time",
      "24–48h turnaround",
      "Unlimited revisions",
      "Figma source files",
      "Pause or cancel anytime",
      "Async Loom reviews",
    ],
  },
  {
    name: "Pro",
    monthly: 7995,
    annually: 6396,
    desc: "For teams that ship fast and need design to keep pace with product.",
    highlight: true,
    badge: "Most popular",
    features: [
      "Two active requests at a time",
      "24h turnaround",
      "Unlimited revisions",
      "Figma + all source files",
      "Priority queue",
      "Pause or cancel anytime",
      "Dedicated Slack channel",
      "Monthly design review call",
    ],
  },
  {
    name: "Scale",
    monthly: 0,
    annually: 0,
    desc: "For agencies and companies that need a full design team on demand.",
    highlight: false,
    custom: true,
    features: [
      "Unlimited active requests",
      "Same-day turnaround",
      "Dedicated design team",
      "Brand system ownership",
      "Weekly syncs",
      "SLA guarantees",
      "Custom contract",
      "Invoicing options",
    ],
  },
] as const;

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { open: openBooking } = useBooking();
  const ref = useScrollReveal<HTMLDivElement>();

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <section id="pricing" className="py-24 md:py-32 bg-secondary/20">
      <div className="container">
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pricing</span>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Simple, <span className="font-display font-normal">transparent</span> pricing.
          </h2>
          <p className="max-w-md text-muted-foreground">No setup fees. No hidden costs. Pause or cancel anytime.</p>

          <div className="mt-2 flex items-center gap-3 rounded-full bg-secondary p-1 text-sm font-medium">
            {[{ v: false, l: "Monthly" }, { v: true, l: "Annual" }].map(({ v, l }) => (
              <button key={l} type="button" onClick={() => setAnnual(v)}
                className={cn(
                  "rounded-full px-5 py-2 transition-all duration-200",
                  annual === v ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}>
                {l}
                {v && <span className="ml-2 text-xs text-[hsl(var(--available))] font-semibold">–20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} data-revealed="false" className="reveal-up grid gap-4 md:grid-cols-3 items-stretch">
          {plans.map((p) => (
            <div key={p.name} className={cn(
              "relative flex flex-col rounded-3xl border p-8 card-hover",
              p.highlight
                ? "border-foreground bg-foreground text-background"
                : "border-border/60 bg-card"
            )}>
              {p.highlight && p.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--accent))] px-4 py-1 text-xs font-semibold text-white whitespace-nowrap">
                  {p.badge}
                </span>
              )}

              <div className="mb-6">
                <div className="text-sm font-semibold uppercase tracking-widest opacity-60">{p.name}</div>
                <div className="mt-3 flex items-end gap-1">
                  {p.custom ? (
                    <span className="text-5xl font-semibold tracking-tight">Custom</span>
                  ) : (
                    <>
                      <span className="text-5xl font-semibold tracking-tight">
                        {fmt(annual ? p.annually : p.monthly)}
                      </span>
                      <span className="mb-1.5 text-sm opacity-60">/mo</span>
                    </>
                  )}
                </div>
                {!p.custom && annual && (
                  <div className="mt-1 text-xs opacity-50">Billed annually · Save {fmt((p.monthly - p.annually) * 12)}/yr</div>
                )}
                <p className={cn("mt-4 text-sm leading-relaxed", p.highlight ? "opacity-75" : "text-muted-foreground")}>{p.desc}</p>
              </div>

              <ul className="mb-8 flex flex-col gap-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.highlight ? "opacity-100" : "text-[hsl(var(--available))]")} />
                    <span className={p.highlight ? "opacity-90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              <button type="button" onClick={openBooking}
                className={cn(
                  "w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-200 btn-press",
                  p.highlight
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                )}>
                {p.custom ? "Let's talk" : "Get started"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          All plans include a 7-day money-back guarantee if it's not a fit.
        </p>
      </div>
    </section>
  );
}
