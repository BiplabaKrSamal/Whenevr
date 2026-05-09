"use client";
const logos = [
  { name: "Linear",  svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Linear</text></svg>` },
  { name: "Vercel",  svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Vercel</text></svg>` },
  { name: "Notion",  svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Notion</text></svg>` },
  { name: "Stripe",  svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Stripe</text></svg>` },
  { name: "Figma",   svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Figma</text></svg>` },
  { name: "Loom",    svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Loom</text></svg>` },
  { name: "Framer",  svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Framer</text></svg>` },
  { name: "Webflow", svg: `<svg viewBox="0 0 80 24" fill="currentColor"><text y="18" font-size="16" font-weight="600" font-family="system-ui">Webflow</text></svg>` },
];

export default function Logos() {
  const row = [...logos, ...logos];
  return (
    <section className="border-y border-border/60 py-7">
      <div className="relative -mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max items-center gap-12 animate-marquee-slow pause-on-hover">
          {row.map((l, i) => (
            <div key={i} className="flex items-center text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 shrink-0" style={{ width: 88 }}>
              <span className="text-[15px] font-semibold tracking-tight">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
